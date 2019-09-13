package hackernews

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/adwd/hackernews-graphql/server/models"
	cache "github.com/patrickmn/go-cache"
	"golang.org/x/sync/errgroup"
)

var (
	c = cache.New(5*time.Minute, 10*time.Minute)
)

// GetTopStories get top stories
func GetTopStories(ctx context.Context, limit *int) ([]*models.Story, error) {
	if limit == nil {
		*limit = 50
	}
	res, err := get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
	if err != nil {
		return []*models.Story{}, err
	}

	storyIds, err := models.UnmarshalTopStories(res)
	if err != nil {
		return []*models.Story{}, err
	}
	length := *limit
	if len(storyIds) < *limit {
		length = len(storyIds)
	}

	var m sync.Mutex
	stories := []*models.Story{}
	eg, ctx := errgroup.WithContext(ctx)
	for index, s := range storyIds {
		if index > length {
			break
		}
		id := s
		eg.Go(func() error {
			story, err := GetStory(ctx, int(id))
			if story != nil {
				m.Lock()
				stories = append(stories, story)
				m.Unlock()
			}
			return err
		})
	}

	if err = eg.Wait(); err != nil {
		return []*models.Story{}, err
	}

	return stories, nil
}

// GetStory get story
func GetStory(ctx context.Context, id int) (*models.Story, error) {
	res, err := get(fmt.Sprintf("https://hacker-news.firebaseio.com/v0/item/%d.json?print=pretty", id))
	if err != nil {
		return nil, err
	}

	story, err := models.UnmarshalStory(res)
	if err != nil {
		return nil, err
	}

	return &story, nil
}

// GetOGPImage gets ogp image
func GetOGPImage(url string) (*string, error) {
	res, err := get(url)
	// if failed to access to specifed URL, return emtpy not error
	if err != nil {
		empty := ""
		return &empty, nil
	}

	doc, err := goquery.NewDocumentFromReader(bytes.NewReader(res))
	if err != nil {
		return nil, err
	}

	urls := []string{}
	doc.Find(`meta[property="og:image"]`).Each(func(i int, s *goquery.Selection) {
		content, ok := s.Attr("content")
		if ok {
			urls = append(urls, content)
		}
	})

	if len(urls) < 1 {
		return nil, nil
	}

	return &urls[0], nil
}

func GetComment(ctx context.Context, id int) (*models.Comment, error) {
	res, err := get(fmt.Sprintf("https://hacker-news.firebaseio.com/v0/item/%d.json?print=pretty", id))
	if err != nil {
		return nil, err
	}

	comment, err := models.UnmarshalComment(res)
	if err != nil {
		return nil, err
	}

	return &comment, nil
}

// GetComments gets comments
func GetComments(ctx context.Context, ids []int) ([]*models.Comment, error) {
	eg, ctx := errgroup.WithContext(ctx)
	commentChan := make(chan *models.Comment, 8)

	for _, id := range ids {
		id = id
		eg.Go(func() error {
			comment, err := GetComment(ctx, id)
			if err != nil {
				return err
			}
			select {
			case commentChan <- comment:
				return nil
			case <-ctx.Done():
				return ctx.Err()
			}
		})
	}

	go func() {
		eg.Wait()
		close(commentChan)
	}()

	comments := []*models.Comment{}
	for comment := range commentChan {
		comments = append(comments, comment)
	}

	if err := eg.Wait(); err != nil {
		return []*models.Comment{}, err
	}

	return comments, nil
}

func get(url string) ([]byte, error) {
	cached, found := c.Get(url)
	if found {
		return cached.([]byte), nil
	}

	res, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	c.Set(url, body, cache.DefaultExpiration)

	return body, nil
}

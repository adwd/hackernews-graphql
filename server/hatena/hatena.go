package hatena

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/adwd/hackernews-graphql/server"
	cache "github.com/patrickmn/go-cache"
)

var (
	c = cache.New(5*time.Minute, 10*time.Minute)
)

// GetEntries get entries
func GetEntries(ctx context.Context, input *server.HatenaInput) ([]*server.HatenaEntry, error) {
	// http://sprint-life.hatenablog.com/entry/2014/01/15/203535
	_, err := get(getURL(input))
	if err != nil {
		return nil, err
	}

	return nil, nil
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

func getURL(input *server.HatenaInput) string {
	var category, listType string
	switch input.Category {
	case server.HatenaCategoryTechnology:
		category = "it"
	}

	switch input.ListType {
	case server.HatenaListTypePopular:
		listType = "hotentry"
	case server.HatenaListTypeNew:
		listType = "entrylist"
	}

	return fmt.Sprintf("http://b.hatena.ne.jp/%s/%s.rss", listType, category)
}

package server

import (
	"context"
	"strconv"

	"github.com/99designs/gqlgen/graphql"
	"github.com/adwd/hackernews-graphql/server/hackernews"
	"github.com/adwd/hackernews-graphql/server/models"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func (r *Resolver) Comment() CommentResolver {
	return &commentResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}
func (r *Resolver) Story() StoryResolver {
	return &storyResolver{r}
}

type commentResolver struct{ *Resolver }

func (r *commentResolver) ID(ctx context.Context, obj *models.Comment) (string, error) {
	return strconv.FormatInt(obj.ID, 10), nil
}
func (r *commentResolver) Kids(ctx context.Context, obj *models.Comment) ([]*models.Comment, error) {
	if obj == nil || len(obj.Kids) == 0 {
		return []*models.Comment{}, nil
	}
	ids := []int{}
	for _, id := range obj.Kids {
		ids = append(ids, int(id))
	}
	return hackernews.GetComments(ctx, ids)
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Stories(ctx context.Context, limit *int, offset *int) ([]*models.Story, error) {
	return hackernews.GetTopStories(ctx, limit, offset)
}
func (r *queryResolver) Story(ctx context.Context, id string) (*models.Story, error) {
	_id, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return nil, err
	}
	return hackernews.GetStory(ctx, int(_id))
}
func (r *queryResolver) Comment(ctx context.Context, id string) (*models.Comment, error) {
	_id, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return nil, err
	}
	return hackernews.GetComment(ctx, int(_id))
}

type storyResolver struct{ *Resolver }

func (r *storyResolver) ID(ctx context.Context, obj *models.Story) (string, error) {
	return strconv.FormatInt(obj.ID, 10), nil
}
func (r *storyResolver) OgpImage(ctx context.Context, obj *models.Story) (*string, error) {
	if obj != nil && obj.URL != "" {
		return hackernews.GetOGPImage(obj.URL)
	}
	return nil, nil
}
func (r *storyResolver) Kids(ctx context.Context, obj *models.Story) ([]*models.Comment, error) {
	// if only id is required, supress to fetch comment
	fields := graphql.CollectAllFields(ctx)
	if len(fields) == 1 && fields[0] == "id" {
		comments := []*models.Comment{}
		for _, kid := range obj.Kids {
			comments = append(comments, &models.Comment{
				ID: kid,
			})
		}

		return comments, nil
	}

	if obj == nil || len(obj.Kids) == 0 {
		return []*models.Comment{}, nil
	}
	ids := []int{}
	for _, id := range obj.Kids {
		ids = append(ids, int(id))
	}
	return hackernews.GetComments(ctx, ids)
}

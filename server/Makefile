.PHONY: build
build:
	go build -o hn-server ./server/server.go

.PHONY: run
run:
	go run ./server/server.go

.PHONY: test
test:
	go test ./...

.PHONY: gen
gen:
	go run github.com/99designs/gqlgen generate

.PHONY: quicktype
quicktype:
	npx quicktype https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty --lang go --package models -o models/top_stories.go
	npx quicktype https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty --lang go --package models -o models/story.go
	npx quicktype https://hacker-news.firebaseio.com/v0/item/2921983.json?print=pretty --lang go --package models -o models/comment.go
	go fmt ./models

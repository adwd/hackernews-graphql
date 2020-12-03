# build server
FROM golang:1.15-alpine as go-builder

WORKDIR /app

COPY server .

RUN go mod download
RUN go build -o hn-server ./server/server.go

# build frontend
FROM node:12-alpine as node-builder

WORKDIR /app

COPY ionic-app .

RUN ADBLOCK=true npm install
RUN npm run build


# executable container
FROM alpine:latest as runner

WORKDIR /app

COPY --from=go-builder /app/hn-server .
COPY --from=node-builder /app/build static

EXPOSE 8080
CMD ["./hn-server"]

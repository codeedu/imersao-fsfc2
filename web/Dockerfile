FROM golang:1.16

WORKDIR /go/src
ENV PATH="/go/bin:${PATH}"

RUN apt-get update && \
    apt-get install build-essential -y

WORKDIR /usr/src/app

COPY . .

RUN GOOS=linux go build main.go

EXPOSE 8000

CMD ["./main"]
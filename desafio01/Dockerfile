FROM golang:1.16

WORKDIR /go/src/imersao-fsfc

ADD . .

RUN GOOS=linux go build

EXPOSE 8000

CMD ./desafio01
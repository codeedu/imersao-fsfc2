package kafka

import (
	"fmt"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"log"
	"os"
)

// KafkaConsumer holds all consumer logic and settings of Apache Kafka connections/
// Also has a Message channel which is a channel where the messages are going to be pushed
type KafkaConsumer struct {
	MsgChan chan *ckafka.Message
}

// NewKafkaConsumer creates a new KafkaConsumer struct with its message channel as dependency
func NewKafkaConsumer(msgChan chan *ckafka.Message) *KafkaConsumer {
	return &KafkaConsumer{
		MsgChan: msgChan,
	}
}

// Consume consumes all message pulled from apache kafka and sent it to message channel
func (k *KafkaConsumer) Consume() {
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": os.Getenv("KafkaBootstrapServers"),
		"group.id":          os.Getenv("KafkaConsumerGroupId"),
	}
	c, err := ckafka.NewConsumer(configMap)
	if err != nil {
		log.Fatalf("error consuming kafka message:" + err.Error())
	}
	topics := []string{os.Getenv("KafkaReadTopic")}
	c.SubscribeTopics(topics, nil)
	fmt.Println("Kafka consumer has been started")
	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			k.MsgChan <- msg
		}
	}
}

package main

import "net/http"
import "encoding/json"
import "fmt"
//import "log"
//import "bufio"

import (
	"context"
	"reflect"
	"github.com/segmentio/kafka-go"
)


func KafkaWriter(x string, w *kafka.Writer) {
	
	w.WriteMessages(context.Background(),
		kafka.Message{
			Key:   []byte("Key-A"),
			Value: []byte(x),
		},
	)
}

func main() {
	resp,err := http.Get("http://stream.meetup.com/2/rsvps")
	decoder:=json.NewDecoder(resp.Body)
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{"34.73.54.57:9092"},
		Topic:   "MyTopic",
	})
	fmt.Println(reflect.TypeOf(w).String())
	if err==nil{
		for {
			var myJson interface{}
			decoder.Decode(&myJson)
			b, err:=json.MarshalIndent(myJson, "", "    ")
			if err==nil{

				fmt.Println(string(b))
				go KafkaWriter(string(b),w)
			}
		}
	}else{
		fmt.Println("Error : ")
		fmt.Println(err)
	}
}

package main

import (
	"math/rand"
	"net/http"
	"encoding/json"
	"log"
	"os"
	"context"
	"reflect"
	"github.com/segmentio/kafka-go"
)


func KafkaWriter(x string, w *kafka.Writer) {	
	w.WriteMessages(context.Background(),
		kafka.Message{
			Key:   []byte(string(rand.Intn(10))),
			Value: []byte(x),
		},
	)
}

func main() {
	resp,err := http.Get("http://stream.meetup.com/2/rsvps")
	decoder:=json.NewDecoder(resp.Body)
	//Pass localhsot:9092 for testing
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{os.Args[1]},
		Topic:   os.Args[2],
	})
	log.Println(reflect.TypeOf(w).String())
	if err==nil{
		for {
			var myJson interface{}
			decoder.Decode(&myJson)
			b, err:=json.Marshal(myJson)
			if err==nil{
				log.Println(string(b))
				go KafkaWriter(string(b),w)
			}else{
				log.Println(err)
			}
		}
	}else{
		log.Println("Error : ")
		log.Println(err)
	}
}

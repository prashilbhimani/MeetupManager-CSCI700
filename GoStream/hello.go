package main

import "net/http"
import "encoding/json"
import "log"

func main() {
	resp, err := http.Get("localhost:8080/stream")
	if err != nil {
		json.NewDecoder(resp.Body).Decode(&yourStuff)
		log.Println(string(yourStuff))
	}
}

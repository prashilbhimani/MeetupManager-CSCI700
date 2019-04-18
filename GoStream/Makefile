all: build
push: push
.PHONY: push build

TAG = 1.0.3

build: main ca-certificates.crt
	docker build -t prashilbhimani/meetupmanager .
	docker tag prashilbhimani/meetupmanager prashilbhimani/meetupmanager:$(TAG)

push: build
	docker push prashilbhimani/meetupmanager
	docker push prashilbhimani/meetupmanager:$(TAG)

main:
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main src/stream/meetupStream.go


run: 
	./main

ca-certificates.crt:
	curl --remote-name --time-cond cacert.pem https://curl.haxx.se/ca/cacert.pem
	mv cacert.pem ca-certificates.crt

clean:
	rm ca-certificates.crt
	rm main

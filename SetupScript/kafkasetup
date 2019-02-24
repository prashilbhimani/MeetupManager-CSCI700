#!/bin/bash

#Download
wget http://mirror.cogentco.com/pub/apache/kafka/1.1.0/kafka_2.12-1.1.0.tgz
#Unzip
tar -xvf kafka_2.12-1.1.0.tgz
#Create logs dir
mkdir tmp/kafka/logs -p
#Delete zip
rm kafka_2.12-1.1.0.tgz
#Got to the folder
cd kafka_2.12-1.1.0/config
#Set Broker ID
sed -i 's/broker.id=0/broker.id=$1/g' server.properties
sed -i 's/log.dirs=\/tmp\/kafka-logs/logs.dir=..\/tmp\/kafka\/logs/g' server.properties
sed -i 's/zookeeper.connect=localhost:2181/zookeeper.connect=$2/g' server.properties 
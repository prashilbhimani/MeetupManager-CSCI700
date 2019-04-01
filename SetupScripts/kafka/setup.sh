gcloud compute ssh kafka-zookeeper --command "./zookeeper-3.4.13/bin/zkServer.sh start"
gcloud compute ssh kafka-broker --command "./kafka_2.12-2.1.1/bin/kafka-server-start.sh -daemon kafka_2.12-2.1.1/config/server.properties"
#zk=$(gcloud compute instances describe kafka-zookeeper |sed -n "/networkIP\:\ /s/networkIP\:\ //p")
gcloud compute ssh kafka-broker --command "./kafka_2.12-2.1.1/bin/kafka-topics.sh --create --topic $1 --zookeeper localhost:2181 --partitions 1 --replication-factor 1"
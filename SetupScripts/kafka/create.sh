#gcloud beta compute instances create kafka-zookeeper --zone="us-east1-b" --machine-type=n1-standard-4 --subnet=default --network-tier=PREMIUM --maintenance-policy=MIGRATE   --scopes=https://www.googleapis.com/auth/cloud-platform --tags=http-server,https-server --image=debian-9-stretch-v20181011 --image-project=debian-cloud --boot-disk-size=50GB --boot-disk-type=pd-standard --boot-disk-device-name=kafka-zookeeper
gcloud beta compute instances create kafka-broker --zone="us-east1-b" --machine-type=n1-standard-4 --subnet=default --network-tier=PREMIUM --maintenance-policy=MIGRATE   --scopes=https://www.googleapis.com/auth/cloud-platform --tags=http-server,https-server --image=debian-9-stretch-v20181011 --image-project=debian-cloud --boot-disk-size=50GB --boot-disk-type=pd-standard --boot-disk-device-name=kafka-broker

# Get IP
#zk=$(gcloud compute instances describe kafka-zookeeper |sed -n "/networkIP\:\ /s/networkIP\:\ //p")
#echo $zk
#Copy to zookeeper
#gcloud compute scp  zookeeper_setup.sh kafka-zookeeper:~/
#Setup zookeeper
#gcloud compute  ssh  kafka-zookeeper --command "chmod +x zookeeper_setup.sh && ./zookeeper_setup.sh $zk"

echo "******************************************************************************"
echo "Zookeeper done"
echo "******************************************************************************"

#Copy to kafka_broker
gcloud compute scp kafka_setup.sh kafka-broker:~/
#kafka_broker setup
gcloud compute ssh kafka-broker --command "chmod +x kafka_setup.sh && ./kafka_setup.sh 1"

echo "*********************************************************\n"
echo "kafka_broker done\n"
echo "*********************************************************\n"

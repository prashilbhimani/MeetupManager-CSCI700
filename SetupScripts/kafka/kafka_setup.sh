sudo apt-get update
sudo apt-get install -y openjdk-8-jre
export JAVA_HOME='/usr/lib/jvm/java-1.8.0-openjdk-amd64'

wget https://www-us.apache.org/dist/kafka/2.1.1/kafka_2.12-2.1.1.tgz
tar -xvf kafka_2.12-2.1.1.tgz
mkdir tmp/kafka/logs -p
rm kafka_2.ls12-2.1.1.tgz
cd kafka_2.12-2.1.1/config
sed -i "s/broker.id=0/broker.id=$1/g" server.properties

sed -i 's/log.dirs=\/tmp\/kafka-logs/log.dir=\/tmp\/kafka\//g' server.properties

#sed -i "s/zookeeper.connect=localhost:2181/zookeeper.connect=$2:2181/g" server.properties

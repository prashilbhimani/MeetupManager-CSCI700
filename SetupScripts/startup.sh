##Do not run this. The commands are blocking - Check how to set them to background

gcloud compute --project "substantial-art-232723" ssh "zookeeper" --command "./zookeeper-3.4.13/bin/zkServer.sh start"
gcloud compute --project "substantial-art-232723" ssh "nimbus" --command "./apache-storm-1.2.1/bin/storm nimbus"
for i in `seq 1 $1`; do
	gcloud compute --project "substantial-art-232723" ssh "slave$i" --command "./apache-storm-1.2.1/bin/storm supervisor"
done
gcloud compute --project "substantial-art-232723" ssh "nimbus" --command "./apache-storm-1.2.1/bin/storm ui"

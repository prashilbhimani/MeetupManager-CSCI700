package stormprocessor.stormprocessor;

import org.apache.storm.LocalCluster;
import org.apache.storm.StormSubmitter;
import org.apache.storm.kafka.spout.KafkaSpout;
import org.apache.storm.kafka.spout.KafkaSpoutConfig;
import org.apache.storm.topology.TopologyBuilder;
import org.apache.storm.Config;
import org.apache.storm.mongodb.bolt.MongoInsertBolt;
import org.apache.storm.mongodb.common.mapper.MongoMapper;
import org.apache.storm.mongodb.common.mapper.SimpleMongoMapper;

public class Topology {
	public void create() {
		Config config = new Config();
		config.setNumWorkers(6);
		config.setNumAckers(6);
		config.setMaxSpoutPending(1000);
		config.setMessageTimeoutSecs(20);
		TopologyBuilder builder=getTopology();
		try {
			StormSubmitter.submitTopology("meetup-Topology", config, builder.createTopology());
		} catch (Exception e) {
			System.out.println(e);
		}
	}
	public void createLocal(){
    	LocalCluster cluster = new LocalCluster();
		Config config = new Config();
		config.setNumWorkers(4);
		config.setNumAckers(4);
		config.setMaxSpoutPending(1000);
		config.setMessageTimeoutSecs(20);
		TopologyBuilder builder=getTopology();
		cluster.submitTopology("meetup-Topology", config, builder.createTopology());

	}
	private TopologyBuilder getTopology(){
		TopologyBuilder builder = new TopologyBuilder();
		builder.setSpout("KafkaSpout", new KafkaSpout<>(KafkaSpoutConfig.builder("localhost:9092", "Meetups").setGroupId("id").build()), 1);
		builder.setBolt("JSONBolt",new JSONBolt(), 3).shuffleGrouping("KafkaSpout");

		String url = "mongodb://mongo-db:27017/testdb";
		String collectionName = "test";

		MongoMapper mongoMapper = new SimpleMongoMapper().withFields("name", "nested");
		MongoInsertBolt mongoInsertBolt = new MongoInsertBolt(url, collectionName, mongoMapper);
		builder.setBolt("MongoInsertBolt", mongoInsertBolt).shuffleGrouping("JSONBolt");
		return builder;

	}
}

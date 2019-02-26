package stormprocessor.stormprocessor;

import org.apache.storm.topology.TopologyBuilder;
import org.apache.storm.Config;
import org.apache.storm.LocalCluster;
import org.apache.storm.mongodb.bolt.MongoInsertBolt;
import org.apache.storm.mongodb.common.mapper.MongoMapper;
import org.apache.storm.mongodb.common.mapper.SimpleMongoMapper;

public class Topology {
	public void create() {
		TopologyBuilder builder = new TopologyBuilder();
		Config config = new Config();
		
		builder.setSpout("KafkaSpout", new TwitterStreamKafkaSpoutImitation(), 2);
		builder.setBolt("JSONBolt", new JSONBolt(), 3).shuffleGrouping("KafkaSpout");
		
		String url = "mongodb://127.0.0.1:27017/testdb";
    	String collectionName = "test";
    	
    	MongoMapper mongoMapper = new SimpleMongoMapper().withFields("date", "tweet_id", "trend", "message", "retweet_count");
//    	MongoMapper mongoMapper = new SimpleMongoMapper().withFields("tweet");
    	MongoInsertBolt mongoInsertBolt = new MongoInsertBolt(url, collectionName, mongoMapper);
    	builder.setBolt("MongoInsertBolt", mongoInsertBolt).shuffleGrouping("JSONBolt");
    	
    	LocalCluster cluster = new LocalCluster();
    	cluster.submitTopology("meetup-Topology", config, builder.createTopology());
	}
}

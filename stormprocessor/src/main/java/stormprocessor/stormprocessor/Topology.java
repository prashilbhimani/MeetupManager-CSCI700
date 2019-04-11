package stormprocessor.stormprocessor;
import org.apache.storm.LocalCluster;
import org.apache.storm.StormSubmitter;
import org.apache.storm.kafka.spout.KafkaSpout;
import org.apache.storm.kafka.spout.KafkaSpoutConfig;
import org.apache.storm.topology.TopologyBuilder;
import org.apache.storm.Config;
import org.apache.storm.mongodb.bolt.MongoInsertBolt;
import org.apache.storm.mongodb.common.mapper.SimpleMongoMapper;
import stormprocessor.stormprocessor.Bolts.DailyCountBolt;
import stormprocessor.stormprocessor.Bolts.JSONBolt;
import stormprocessor.stormprocessor.Bolts.MongoEventInsertBolt;

import java.io.InputStream;
import java.util.Properties;


public class Topology {
	Properties properties;
	String propertiesFile;
	public Topology(String propertiesFile){
		this.propertiesFile=propertiesFile;

	}
	public void createTopology() {
		properties=readConfigFromFile();

		Config config=getStormConfig();
		TopologyBuilder builder=getTopology();

		try {
			StormSubmitter.submitTopology("meetup-Topology", config, builder.createTopology());
		} catch (Exception e) {
			System.out.println(e);
		}
	}
	public void createLocal(){
		properties=readConfigFromFile();

		LocalCluster cluster = new LocalCluster();
		Config config = getStormConfig();
		TopologyBuilder builder=getTopology();
		cluster.submitTopology("meetup-Topology", config, builder.createTopology());

	}

	private Properties readConfigFromFile(){
		Properties properties=new Properties();
		InputStream inputStream = getClass().getResourceAsStream(propertiesFile);
		try {
			properties.load(inputStream);
		} catch (Exception e){
			System.out.println("Could not read the properties");
			e.printStackTrace();
		}
		return  properties;

	}

	private Config getStormConfig(){
		Config config = new Config();
		config.setNumWorkers(6);
		config.setNumAckers(6);
		config.setMaxSpoutPending(1000);
		config.setMessageTimeoutSecs(20);
		config.put("databaseName", properties.getProperty("mongoDatabase"));
		config.put("monogClient", properties.getProperty("mongodb"));
		return config;
	}

	private TopologyBuilder getTopology(){
		TopologyBuilder builder = new TopologyBuilder();
		String url = "mongodb://"+properties.getProperty("mongodb")+":27017/"+properties.getProperty("mongoDatabase");


		builder.setSpout("KafkaSpout", new KafkaSpout<>(KafkaSpoutConfig.builder(
				properties.getProperty("kafkabroker")+":9092", properties.getProperty("topic")).setGroupId(String.valueOf(Math.random())).build()), 1);

		builder.setBolt("JSONBolt",new JSONBolt(), 3).shuffleGrouping("KafkaSpout");


		builder.setBolt("MongoRSVPInsertBolt", new MongoInsertBolt(url, "rsvps", new SimpleMongoMapper().withFields("json"))).shuffleGrouping("JSONBolt");
		builder.setBolt("MongoEventInsertBolt", new MongoEventInsertBolt()).shuffleGrouping("JSONBolt");

		builder.setBolt("DailyCountUpdate", new DailyCountBolt()).shuffleGrouping("MongoEventInsertBolt");

		return builder;

	}
}

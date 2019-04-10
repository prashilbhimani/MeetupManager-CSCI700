package stormprocessor.stormprocessor;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.BasicOutputCollector;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseBasicBolt;

import org.apache.storm.tuple.Tuple;

import org.bson.Document;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.Map;

public class DailyCount extends BaseBasicBolt {


	private MongoCollection<Document> rsvps;
	private MongoCollection<Document> events;
	private JSONParser parser;
	private static final long serialVersionUID = 1L;

	@Override
	public void prepare(Map stormConf, TopologyContext context) {
		rsvps=MongoDatabaseFactory.getDatabaseObject((String) stormConf.get("monogClient"), (String) stormConf.get("databaseName")).getCollection("rsvps");
		events=MongoDatabaseFactory.getDatabaseObject((String) stormConf.get("monogClient"), (String) stormConf.get("databaseName")).getCollection("events");
		parser=new JSONParser();
	}

	public void execute(Tuple input, BasicOutputCollector collector) {
		JSONObject rsvp= (JSONObject)  input.getValueByField("json");
		JSONObject event= (JSONObject) rsvp.get("event");
		System.out.println(rsvp.toJSONString());

		Document result = events.find(Filters.eq("json.name",event.get("event_name"))).first();
	    if(result==null){
	    	//Insert new Json in Events DB
			Document d= new Document("event",event);
			events.insertOne(d);

		}else{
	    	//Read the JSON and update it
		}
        //System.out.println("Did this work? "+result.get("json"));
        //Document o = (Document) result.get("json");
        //System.out.println(o.get("name"));
	}

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
    }
}

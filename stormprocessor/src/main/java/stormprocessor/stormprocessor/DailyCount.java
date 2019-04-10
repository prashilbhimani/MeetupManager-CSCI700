package stormprocessor.stormprocessor;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.UpdateOptions;
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

	JSONObject getBlankBuckets(){
		JSONObject dailyBucket=new JSONObject();
		for(int i=0;i<24;i++)
			dailyBucket.put(String.valueOf(i), 0);
		return  dailyBucket;
	}
	public void execute(Tuple input, BasicOutputCollector collector) {
		JSONObject rsvp= (JSONObject)  input.getValueByField("json");
		JSONObject event= (JSONObject) rsvp.get("event");
		JSONObject group =(JSONObject) rsvp.get("group");
		event.put("groupDetails", group);


		Document result = events.find(Filters.eq("event.event_name",event.get("event_name"))).first();
	    if(result==null) {
			//Insert new Json in Events DB
			JSONObject dailyBuckets = getBlankBuckets();
			event.put("dailyCounts", dailyBuckets);
			result = new Document("event", event);
			events.insertOne(result);
		}else{
			events.replaceOne(Filters.eq("event.event_name",event.get("event_name") ), result, new UpdateOptions().upsert(true));
		}
			//Read the JSON and update it
		//System.out.println("Did this work? "+result.get("json"));
        //Document o = (Document) result.get("json");
        //System.out.println(o.get("name"));
	}

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
    }
}

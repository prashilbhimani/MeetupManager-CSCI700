package stormprocessor.stormprocessor.Bolts;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.UpdateOptions;
import org.apache.storm.shade.org.joda.time.DateTime;
import org.apache.storm.shade.org.joda.time.DateTimeZone;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.BasicOutputCollector;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseBasicBolt;

import org.apache.storm.tuple.Tuple;

import org.bson.Document;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import stormprocessor.stormprocessor.Resources.MongoDatabaseFactory;

import java.util.Map;

public class DailyCountBolt extends BaseBasicBolt {
	private MongoCollection<Document> events;
	private JSONParser parser;
	private static final long serialVersionUID = 1L;

	@Override
	public void prepare(Map stormConf, TopologyContext context) {
		events= MongoDatabaseFactory.getDatabaseObject((String) stormConf.get("monogClient"), (String) stormConf.get("databaseName")).getCollection("events");
		parser=new JSONParser();
	}

	public void execute(Tuple input, BasicOutputCollector collector) {
		JSONObject rsvp= (JSONObject)  input.getValueByField("json");
		JSONObject event= (JSONObject) rsvp.get("event");
		Document result = events.find(Filters.eq("event.event_name",event.get("event_name"))).first();
		DateTime date=new DateTime((Long) rsvp.get("mtime")*1000L, DateTimeZone.UTC); //= new SimDpleDateFormat("dd/MM/yyyy HH:mm:ss");
		int bucket= date.hourOfDay().get()*2;
		if(date.minuteOfDay().get()>30)
			bucket=bucket+1;
		int currentCount= (int) ((Document)((Document)result.get("event")).get("dailyCounts")).get(String.valueOf(bucket));
		((Document)((Document)result.get("event")).get("dailyCounts")).put(String.valueOf(bucket),currentCount+1);
		events.replaceOne(Filters.eq("event.event_name",event.get("event_name") ), result, new UpdateOptions().upsert(true));
	}

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
    }
}

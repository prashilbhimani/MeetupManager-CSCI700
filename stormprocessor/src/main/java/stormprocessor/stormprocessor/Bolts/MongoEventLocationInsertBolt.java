package stormprocessor.stormprocessor.Bolts;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.BasicOutputCollector;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseBasicBolt;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.bson.Document;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import stormprocessor.stormprocessor.Resources.MongoDatabaseFactory;

import java.util.Map;

public class MongoEventLocationInsertBolt extends BaseBasicBolt {
    private MongoCollection<Document> events;
    private MongoCollection<Document> location;
    private static final long serialVersionUID = 1L;


    JSONObject getBlankBuckets(){
        JSONObject dailyBucket=new JSONObject();
        for(int i=0;i<48;i++)
            dailyBucket.put(String.valueOf(i), 0);
        return  dailyBucket;
    }

    @Override
    public void prepare(Map stormConf, TopologyContext context) {
        events= MongoDatabaseFactory.getDatabaseObject((String) stormConf.get("monogClient"), (String) stormConf.get("databaseName")).getCollection("events");
        location= MongoDatabaseFactory.getDatabaseObject((String) stormConf.get("monogClient"), (String) stormConf.get("databaseName")).getCollection("locations");

    }

    private boolean insertEvent(JSONObject rsvp){
        JSONObject event= (JSONObject) rsvp.get("event");
        Document result = events.find(Filters.eq("event.event_name",event.get("event_name"))).first();
        if(result==null) {
            JSONObject group =(JSONObject) rsvp.get("group");
            event.put("groupDetails", group);
            JSONObject dailyBuckets = getBlankBuckets();
            event.put("dailyCounts", dailyBuckets);
            result = new Document("event", event);
            events.insertOne(result);
            return true;
        }
        return false;

    }

    private void insertLocation(JSONObject rsvp){
        Document result= location.find(Filters.and(
                Filters.eq("location.city", ((JSONObject)rsvp.get("group")).get("group_city")),
                Filters.eq("location.country", ((JSONObject)rsvp.get("group")).get("group_country")))
        ).first();
        if(result==null){
            JSONObject city=new JSONObject();
            city.put("city",((JSONObject)rsvp.get("group")).get("group_city"));
            city.put("country", ((JSONObject)rsvp.get("group")).get("group_country"));
            city.put("keywords",new JSONArray());
            result= new Document("location", city);
            location.insertOne(result);
        }
    }

    @Override
    public void execute(Tuple input, BasicOutputCollector basicOutputCollector) {
        JSONObject rsvp= (JSONObject)  input.getValueByField("json");
        boolean newEvent=insertEvent(rsvp);
        insertLocation(rsvp);

        basicOutputCollector.emit(new Values((JSONObject)input.getValueByField("json"), newEvent));
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
        outputFieldsDeclarer.declare(new Fields("json", "new_event"));
    }
}

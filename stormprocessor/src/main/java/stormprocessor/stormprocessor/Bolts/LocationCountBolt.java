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
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.bson.Document;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import stormprocessor.stormprocessor.Resources.MongoDatabaseFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class LocationCountBolt extends BaseBasicBolt {
    private MongoCollection<Document> location;


    @Override
    public void prepare(Map stormConf, TopologyContext context) {
        location= MongoDatabaseFactory.getDatabaseObject((String) stormConf.get("monogClient"), (String) stormConf.get("databaseName")).getCollection("locations");
    }

    @Override
    public void execute(Tuple input, BasicOutputCollector basicOutputCollector) {
        JSONObject rsvp= (JSONObject)  input.getValueByField("json");
        Document result= location.find(Filters.and(
                Filters.eq("location.city", ((JSONObject)rsvp.get("group")).get("group_city")),
                Filters.eq("location.country", ((JSONObject)rsvp.get("group")).get("group_country")))
        ).first();

        ArrayList<Document> currentKeyword= (ArrayList) ((Document)result.get("location")).get("keywords");
        HashMap<String, Document> keywords = new HashMap<>();
        for(Document d: currentKeyword){
            keywords.put((String) d.get("topic_name"), d);
        }

        JSONArray newKeywords = (JSONArray) ((JSONObject)rsvp.get("group")).get("group_topics");
        for(Object k: newKeywords){
            String topicName=(String) ((JSONObject)k).get("topic_name");
            if(keywords.containsKey(topicName)){
                int currentCount=(int)keywords.get(topicName).get("rsvp_count");
                keywords.get(topicName).put("rsvp_count", currentCount+1);
                if((boolean)input.getValueByField("new_event")){
                    int oldEventCount=(int)keywords.get(topicName).get("event_count");
                    keywords.get(topicName).put("event_count", oldEventCount+1);
                }
            }else{
                Document d= new Document();
                d.put("topic_name", topicName);
                d.put("rsvp_count",1);
                d.put("event_count",1);
                currentKeyword.add(d);
            }
        }
        location.findOneAndReplace(Filters.and(
                Filters.eq("location.city", ((JSONObject)rsvp.get("group")).get("group_city")),
                Filters.eq("location.country", ((JSONObject)rsvp.get("group")).get("group_country"))),result);
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
        outputFieldsDeclarer.declare(new Fields("json"));
    }
}

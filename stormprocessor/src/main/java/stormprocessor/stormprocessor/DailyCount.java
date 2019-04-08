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

import javax.print.Doc;
import java.util.List;
import java.util.Map;

public class DailyCount extends BaseBasicBolt {


	private MongoCollection<Document> db;
	private static final long serialVersionUID = 1L;

	@Override
	public void prepare(Map stormConf, TopologyContext context) {
		db= new MongoClient("localhost").getDatabase("testdb").getCollection("events");
	}

	public void execute(Tuple input, BasicOutputCollector collector) {
	    Document result = db.find(Filters.eq("json.name",1)).first();
        System.out.println("Did this work? "+result.get("json"));
        Document o = (Document) result.get("json");
        System.out.println(o.get("name"));
	}

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
    }
}

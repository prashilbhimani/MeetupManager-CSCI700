package stormprocessor.stormprocessor.Bolts;

import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.BasicOutputCollector;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseBasicBolt;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.Map;

public class JSONBolt extends BaseBasicBolt {


	private static final long serialVersionUID = 1L;
	public void execute(Tuple input, BasicOutputCollector collector) {
		try {
			JSONParser parser = new JSONParser();
			System.out.println(input.toString());
			System.out.println(input.getValue(4));
			JSONObject jsonObject = (JSONObject) parser.parse(input.getValue(4).toString());
			System.out.println(jsonObject);
			collector.emit(new Values(jsonObject));
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public void declareOutputFields(OutputFieldsDeclarer declarer) {
		declarer.declare(new Fields("json"));
	}
}

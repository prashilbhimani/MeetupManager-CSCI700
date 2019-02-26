package stormprocessor.stormprocessor;

import java.util.Map;
import java.util.Random;

import org.apache.storm.spout.SpoutOutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichSpout;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Values;
import org.apache.storm.utils.Utils;
import org.json.simple.JSONObject;

public class TwitterStreamKafkaSpoutImitation extends BaseRichSpout{
	private static final long serialVersionUID = 1L;
	SpoutOutputCollector _collector;
	int count = 0;
	Random _rand;
	public void nextTuple() {
		Utils.sleep(100);
//		String[] s = {
//			"{\"message\":\"S1\",\"date\":\"2016-10-01\",\"tweet_id\":12012,\"retweet_count\":121, \"trend\":\" #MACSelena\"}",
//			"{\"message\":\"S2\",\"date\":\"2016-10-01\",\"tweet_id\":12012,\"retweet_count\":121, \"trend\":\" #MACSelena\"}",
//			"{\"message\":\"S3\",\"date\":\"2016-10-01\",\"tweet_id\":12012,\"retweet_count\":121, \"trend\":\" #MACSelena\"}",
//			"{\"message\":\"S4\",\"date\":\"2016-10-01\",\"tweet_id\":12012,\"retweet_count\":121, \"trend\":\" #MACSelena\"}"
//		};
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("name", "mahesh");
		JSONObject nested = new JSONObject();
		nested.put("message", "123");
		jsonObject.put("nested", nested);
		_collector.emit(new Values(jsonObject));
		count++;
	}

	public void open(Map args0, TopologyContext arg1, SpoutOutputCollector collector) {
		_collector = collector;
		_rand = new Random();
	}

	public void declareOutputFields(OutputFieldsDeclarer declarer) {
		declarer.declare(new Fields("tweet"));
	}
}

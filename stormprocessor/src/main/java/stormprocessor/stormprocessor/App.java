package stormprocessor.stormprocessor;

public class App {
	public static void main(String[] args) {
		Topology topology = new Topology("/"+args[0]);
		if(args[0].equals("local.properties")){
			topology.createLocal();
		} else{
			topology.createTopology();
		}
	}
}

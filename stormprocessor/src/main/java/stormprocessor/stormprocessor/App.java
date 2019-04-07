package stormprocessor.stormprocessor;

public class App {
	public static void main(String[] args) {
		Topology topology = new Topology();
		if(args.length>2){
			topology.createLocal();
		}else{
			topology.create();
		}

	}
}

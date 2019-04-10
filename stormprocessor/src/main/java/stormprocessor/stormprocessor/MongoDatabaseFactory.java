package stormprocessor.stormprocessor;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

public class MongoDatabaseFactory {
    static MongoDatabase dbObject;
    private MongoDatabaseFactory(String mongoClient, String mongoDatabase){
        dbObject=new MongoClient(mongoClient,27017).getDatabase(mongoDatabase);
    }
    static MongoDatabase getDatabaseObject(String mongoClient, String mongoDatabase){
        if(dbObject==null){
            new MongoDatabaseFactory(mongoClient, mongoDatabase);
        }
        return dbObject;

    }
}

from pyspark.sql import SparkSession


print('hi');

# spark = SparkSession.builder.appName("someexamplename").getOrCreate()
spark = SparkSession \
    .builder \
    .appName("myApp") \
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.11:2.3.0") \
    .config("spark.mongodb.input.uri", "mongodb://35.232.57.90:27017/testdb.test") \
    .getOrCreate()

df = spark.read.format("com.mongodb.spark.sql.DefaultSource").load()
df.printSchema()

# mongo mongodb://35.232.57.90:27017/testdb
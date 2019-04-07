from pyspark.sql import SparkSession

spark = SparkSession \
    .builder \
    .appName("myApp") \
    .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/AdoptAPetDB.Agencies")\
    .getOrCreate()
df = spark.read.format("com.mongodb.spark.sql.DefaultSource").load()
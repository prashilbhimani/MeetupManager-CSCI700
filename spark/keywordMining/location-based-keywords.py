from pyspark.sql import SparkSession
from pyspark.mllib.fpm import FPGrowth
import pandas as pd
import os
import json
import pyspark.sql.types
from datetime import datetime
from pymongo import MongoClient

# try:
#     conn = MongoClient("35.225.229.89")
#     print("Connected successfully!!!")
# except:
#     print("Could not connect to MongoDB")
#
# # database
# db = conn.newdb
#
# # Created or Switched to collection names: my_gfg_collection
# collection = db.locationFrequentTags




os.environ["PYSPARK_PYTHON"]="/usr/bin/python3"

spark = SparkSession \
    .builder \
    .appName("keywords-mining") \
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.11:2.3.0") \
    .config("spark.mongodb.input.uri", "mongodb://35.225.229.89:27017/newdb.events") \
    .config("spark.mongodb.output.uri", "mongodb://35.225.229.89:27017/newdb") \
    .getOrCreate()

df = spark.read.format("com.mongodb.spark.sql.DefaultSource").load()
allGroupDetails=df.select("event.groupDetails").collect()
raw_data={}

for eachRowOfGroup in allGroupDetails:
    row=[]
    for keyword in eachRowOfGroup["groupDetails"]["group_topics"]:
        row.append(keyword["urlkey"])
    if eachRowOfGroup["groupDetails"]["group_city"] in raw_data:
        raw_data[eachRowOfGroup["groupDetails"]["group_city"]].append(row)
    else:
        raw_data[eachRowOfGroup["groupDetails"]["group_city"]]=[row]

r=[]
i=0
for city in raw_data.keys():
    if len(raw_data[city])<200:
        continue
    print("*"*40)
    print("CITY :"+ city)
    rdd=spark.sparkContext.parallelize(raw_data[city],4)
    model=FPGrowth.train(rdd, minSupport=0.10, numPartitions=2)
    result = model.freqItemsets().collect()
    for row in result:
        item= {"item": row[0], "frequency": row[1], "city": city, "date": datetime.today().strftime('%Y-%m-%d')}
        r.append(item)
    i=i+1
    if i>100:
        break
y= spark.createDataFrame(r)
y.write.format("com.mongodb.spark.sql.DefaultSource").mode("append").option("database","newdb").option("collection", "locationFrequentTags").save()

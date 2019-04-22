from pyspark.sql import SparkSession
import numpy
from pyspark.mllib.fpm import FPGrowth
import pandas


# spark = SparkSession.builder.appName("someexamplename").getOrCreate()
spark = SparkSession \
    .builder \
    .appName("keywords-mining") \
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.11:2.3.0") \
    .config("spark.mongodb.input.uri", "mongodb://35.225.229.89:27017/testdb.events") \
    .getOrCreate()

df = spark.read.format("com.mongodb.spark.sql.DefaultSource").load()
df.printSchema()
df = pd.DataFrame(columns=list('AB'))
l={}
#x=df.values.tolist()
for index, row in df.toLocalIterator():
    l[row["groupDetails"]["group_name"]]=[]
    for row1 in row["groupDetails"]["group_topics"]:
        l[row["groupDetails"]["group_name"]].append(row1)

#
# transactions = df.map(lambda line: line.strip().split(' '))
# model = FPGrowth.train(transactions, minSupport=0.2, numPartitions=10)
# result = model.freqItemsets().collect()
# for fi in result:
#     print(fi)
# mongo mongodb://35.232.57.90:27017/testdb
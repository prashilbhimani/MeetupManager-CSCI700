from pyspark.sql import SparkSession
from pyspark.mllib.fpm import FPGrowth
import pandas as pd
import os

os.environ["PYSPARK_PYTHON"]="/usr/bin/python3"
# spark = SparkSession.builder.appName("someexamplename").getOrCreate()
spark = SparkSession \
    .builder \
    .appName("keywords-mining") \
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.11:2.3.0") \
    .config("spark.mongodb.input.uri", "mongodb://35.225.229.89:27017/newdb.events") \
    .getOrCreate()

df = spark.read.format("com.mongodb.spark.sql.DefaultSource").load()
Alltopics=df.select("event.groupDetails.group_topics").collect()
# df1 = []
# for i in df.toLocalIterator():
#     l=[]
#     for j in i["event"]["groupDetails"]["group_topics"]:
#         l.append(j["urlkey"])
#     df1.append(l)
#
# x=pd.DataFrame(df1)

#y=df.filter(df["event"]["groupDetails"]["group_topics"].isNotNull)

# df1 = pd.DataFrame(columns=["Keywords"])
# main=[]
# #x=df.values.tolist()
# for index, row in df.toLocalIterator():
#     #x=row["groupDetails"]["group_name"]
#     y=row["groupDetails"]["group_topics"]
#     l=[]
#     for row1 in row["groupDetails"]["group_topics"]:
#         l.append(row1["urlkey"])
#     main.append(l)
# z=pd.DataFrame(data=main)
# y=df.rdd.mapValues(lambda row: lambda x: row["groupDetails"]["group_topics"]:
# k=y.collect()
#y=spark.sparkContext.parallelize(z.collect(),2)
#sc=SparkContext.parallelize(main[0],2).collect()
y=[]
for eachevent in Alltopics:
    for e in eachevent:
        x=[]
        for e1 in e:
            x.append(e1["urlkey"])
        y.append(x)

rdd=spark.sparkContext.parallelize(y,2)
model=FPGrowth.train(rdd, minSupport=0.05, numPartitions=1)
result = model.freqItemsets().collect()
#y1=result.toDF()

for fi in result:
    print(fi)
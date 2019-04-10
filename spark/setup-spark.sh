#!/usr/bin/env bash
git clone https://github.com/jleetutorial/python-spark-tutorial
sudo mkdir /opt/apache-spark

wget http://apache.osuosl.org/spark/spark-2.4.1/spark-2.4.1-bin-hadoop2.7.tgz
mv spark-2.4.1-bin-hadoop2.7.tgz /opt/apache-spark
sudo tar -xvzf /opt/spark-2.4.1-bin-hadoop2.7.tgz


echo >> ~/.bash_profile
echo >> ~/.bash_profile
echo "# Spark Stuff" >> ~/.bash_profile
echo "export SPARK_HOME=/opt/apache-spark/spark-2.4.1-bin-hadoop2.7" >> ~/.bash_profile
echo "export JAVA_HOME=/Library/Java/Home" >> ~/.bash_profile
echo $JAVA_HOME
echo "export PATH=$PATH:$JAVA_HOME/bin:$SPARK_HOME/bin" >> ~/.bash_profile
source ~/.bash_profile




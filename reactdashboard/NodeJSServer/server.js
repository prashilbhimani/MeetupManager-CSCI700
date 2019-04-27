const express = require("express");
const cors = require("cors");
const jsonParser = require("body-parser").json();

const mongo = require("mongodb").MongoClient;
const url = "mongodb://35.225.229.89:27017";

const port = 9001;
const app = express();
app.use(cors());

mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;

  const db = client.db("newdb");
  const events = db.collection("events");
  const rsvps = db.collection("rsvps");
  const locationFrequentTags = db.collection("locationFrequentTags");
  
  app.get("/:groupId/events", (req, res, next) => {
    const groupId = Number(req.params.groupId);
    events.find({"event.groupDetails.group_id" : groupId}).toArray((err, results) => {
      for(var i = 0; i < results.length; ++i) {
        var dailyCounts = {};
        for(var j = 0; j < 24; ++j)
          dailyCounts[j.toString()] = results[i].event.dailyCounts[(2*j).toString()] +
            results[i].event.dailyCounts[(2*j+1).toString()];
        results[i].event.dailyCounts = dailyCounts;
      }
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.status(200).send(results);
    });
  });

  app.get("/:eventId/rsvps", (req, res, next) => {
    const eventId = req.params.eventId;
    rsvps.find({"json.event.event_id" : eventId}).toArray((err, results) => {
      if(results.length == 0)
        return res.status(404).send("No RSVPs for eventId " + eventId);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.status(200).send(results);
    });
  });

  app.get("/mostfreqtags", (req, res, next) => {
    const city = req.query.city;
    locationFrequentTags.find({"city" : city, "item" : {$size : 1}}).toArray((err, results) => {
      res.status(200).send(results);
    });
  });

  app.get('/relatedtags', (req, res, next) => {
    const city = req.query.city;
    const ref_tag = req.query.ref_tag;
    locationFrequentTags.find({"city" : city, "item" : ref_tag}).toArray((err, results) => {
      var tags = new Set();
      for(var i = 0; i < results.length; ++i) {
        for(var j = 0; j < results[i].item.length; ++j)
          tags.add(results[i].item[j]);
      }
      res.status(200).send({"tags" : Array.from(tags)});
    })
  });

  app.get("/:eventId/hourbuckets", (req, res, next) => {
    const eventId = req.params.eventId;
    events.findOne({"event.event_id" : eventId}, (err, result) => { 
      var dailyCounts = {};
      for(var i = 0; i < 24; ++i)
        dailyCounts[i.toString()] = result.event.dailyCounts[(2*i).toString()] +
          result.event.dailyCounts[(2*i+1).toString()];
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.status(200).send(dailyCounts);
    });
  });

  app.get("/:eventId/rsvpcount", (req, res, next) => {
    const eventId = req.params.eventId;
    rsvps.find({"json.event.event_id" : eventId}).toArray((err, results) => {
      if(results.length == 0) {
        return events.findOne({"event.event_id" : eventId}, (err, result) => {
          if(!result) return res.status(404).send("No event found with eventId " + eventId);
          else return res.status(404).send("No RSVPs for eventId " + eventId);
        });
      }
      results.sort((x, y) => { return x.json.mtime - y.json.mtime; });
      const ONE_DAY = 24 * 60 * 60 * 1000; // ms
      const count = results.length;
      const min_mtime = results[0].json.mtime;
      const max_mtime = results[count - 1].json.mtime;
      var rsvps = {"total_count" : count};

      for(var i = min_mtime; i <= max_mtime; i += ONE_DAY)
        rsvps[Math.floor(i / ONE_DAY)] = {
          "start_time" : i,
          "end_time": i + ONE_DAY,
          "count" : 0
        };
      
      for(var i = 0; i < count; ++i) {
        const mtime = results[i].json.mtime;
        rsvps[Math.floor(mtime / ONE_DAY)].count += 1;
      }
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.status(200).send(rsvps);
    });
  });
});

app.listen(port, () => {
  console.log("CORS-enabled web server listening on port " + port);
});
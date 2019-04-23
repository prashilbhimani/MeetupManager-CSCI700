var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(cors())
const mongo = require('mongodb').MongoClient // http://mongodb.github.io/node-mongodb-native/3.1/api/
const url = 'mongodb://35.225.229.89:27017'


/*var newevent = require('./mocks/newevent.json');
var fetchEvents = require('./mocks/fetchevents.json');
var modifyevent = require('./mocks/modifyevent.json');
var annotateTweets = require('./mocks/annotatetweets.json');


app.post('/newevent', jsonParser,function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(newevent)
})

app.get('/fetchevents', function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json(fetchEvents)
  })

app.put('/:normalized_name/:type', function (req, res, next) {    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(modifyevent)
})

app.get('/tweets/:eventId', function (req, res, next) {
  let per_page = req.query.per_page;
  let page = req.query.page;
  console.log(`query params: per_page:: ${per_page} Page:: ${page}`)
  // let limit = req.query.limit;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json(annotateTweets)
})

app.post(`/annotate`, jsonParser,function(req, res, next) {
  let body = req.body;
  console.log(`body is: ${JSON.stringify(body)}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({'success': true})
});

app.get('/annotate', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(`in the server hander, ID: ${req.query.id}`)
  res.json({"tags":["initaltag1", "initaltag2", "initaltag3"]})
})*/

mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }

  const db = client.db('testdb');
  
  app.get('/testingget', function (req, res, next) {    
    const collection = db.collection('events');
    
    collection.find().count()
    .then(function(count){
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json({"count" : count})      
    }).catch( function(error) {
      console.log(error)
      return
    })      
    /*
      collection.find().limit(10).toArray((err, items) => {
      console.log(items)
    }) 
    */
  })

  app.get('/:eventId/hourbuckets', (req, res, next) => {
    const eventId = req.params.eventId;
    const collection = db.collection('events');
    collection.findOne({"event.event_id" : eventId}, (err, result) => {
      var dailyCounts = {}
      for(var i = 0; i < 24; ++i)
        dailyCounts[i.toString()] = result.event.dailyCounts[(2*i).toString()] +
          result.event.dailyCounts[(2*i+1).toString()]
      res.send(dailyCounts)
    })
  })

})

app.listen(9001, function () {
  console.log('CORS-enabled web server listening on port 9001')
})
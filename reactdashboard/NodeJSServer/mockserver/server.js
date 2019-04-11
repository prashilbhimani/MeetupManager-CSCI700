var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// var url = "mongodb://35.232.57.90:27017/";

mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error(err)
    return
  } else {
    console.log('entered else')
    const db = client.db('testdb');
    const collection = db.collection('events');
    collection.find().toArray((err, items) => {
      console.log(items)
    })    
  }
  
});

// app.get('/:normalized_name/:type', function (req, res, next) {    
//     res.json(modifyevent)
// })  


// app.listen(9001, function () {
//   console.log('CORS-enabled web server listening on port 9001')
// })
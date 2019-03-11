var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())


var newevent = require('./mocks/newevent.json');
var fetchEvents = require('./mocks/fetchevents.json');


app.post('/newevent', function (req, res, next) {
    res.json(newevent)
})

app.get('/fetchevents', function (req, res, next) {
      res.json(fetchEvents)
  })


app.listen(9001, function () {
  console.log('CORS-enabled web server listening on port 9001')
})
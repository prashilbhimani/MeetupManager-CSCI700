var express = require('express')
var cors = require('cors')
var app = express()
var newevent = require('./mocks/newevent.json')
app.use(cors())



app.post('/newevent', function (req, res, next) {
    res.json(newevent)
})

app.get('/fetchevents', function (req, res, next) {
      res.json(newevent)
  })


app.listen(9001, function () {
  console.log('CORS-enabled web server listening on port 9001')
})
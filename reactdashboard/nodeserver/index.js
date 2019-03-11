const express = require('express')
const app = express()

app.use((request, response, next) => {
  console.log("fisrt middleware")    
  next()
})fsdfds

app.use((request, response, next) => {
   console.log("second middleware")  
  request.chance = Math.random()
  next()
})

app.get('/', (request, response) => {
  console.log("in get")    
  response.json({
    chance: request.chance
  })
})

app.listen(4322)
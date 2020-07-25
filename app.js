const express = require('express')
const app = express()
const port = 3000
//  connect database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// connection error 
db.on('error', () => {
  console.log('mongodb error!')
})
// connection success
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('HELLO WORLD!')
})

app.listen(port, () => {
  console.log(`The app is listening on http://localhost:${port}.`)
})


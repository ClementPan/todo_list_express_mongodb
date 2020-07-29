const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// connection error 
db.on('error', () => {
  console.log('mongodb error!')
})

// connection success
db.once('open', () => {
  console.log('MongoDB connected!')
})

module.exports = db

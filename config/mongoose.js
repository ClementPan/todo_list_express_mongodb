const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

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

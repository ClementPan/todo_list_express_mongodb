const express = require('express')
const app = express()
const port = 3000
// set hbs
const exphbs = require('express-handlebars')

//  connect database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// require Todo
const Todo = require('./models/todo') // 載入 Todo model

// connection error 
db.on('error', () => {
  console.log('mongodb error!')
})

// connection success
db.once('open', () => {
  console.log('MongoDB connected!')
})

//set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  Todo.find()  // find all data, not specific one.
    .lean() // don't process it, Mongoose.
    .then(todos => { res.render('index', { todos: todos }) }) //use the todos data found by mongoose to bulit index.
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`The app is listening on http://localhost:${port}.`)
})


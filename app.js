// settings
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//  connect database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// require Todo
const Todo = require('./models/todo') // 載入 Todo model
const { urlencoded } = require('body-parser')

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

// set routes
app.get('/', (req, res) => {
  Todo.find()  // find all data, not specific one.
    .lean() // don't process it, Mongoose.
    .then(todos => { res.render('index', { todos: todos }) }) //use the todos data found by mongoose to bulit index.
    .catch(error => console.error(error))
})

// from index to new
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// from new to index
app.post('/todos', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name: name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`The app is listening on http://localhost:${port}.`)
})

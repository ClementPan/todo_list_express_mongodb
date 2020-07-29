// settings
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// require router
const routes = require('./routes')

//  connect database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// require Todo
const Todo = require('./models/todo') // 載入 Todo model
const { urlencoded } = require('body-parser')
const todo = require('./models/todo')

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

/////// app.use 要放在最靠近路由清單的上方。
// use method-override
app.use(methodOverride('_method'))

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// set routes
app.use(routes)

// start to listen
app.listen(port, () => {
  console.log(`The app is listening on http://localhost:${port}.`)
})

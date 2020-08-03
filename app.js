// settings
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// require routes
const routes = require('./routes')

// require mongoose DB
require('./config/mongoose')

// require Todo
const { urlencoded } = require('body-parser')
const Todo = require('./models/todo') // 載入 Todo model
const todo = require('./models/todo')

// require User
const User = require('./models/user')
const user = require('./models/user')

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

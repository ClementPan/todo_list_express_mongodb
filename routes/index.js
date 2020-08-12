// 總路由器
// require router
const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

const home = require('./modules/home')
const todos = require('./modules/todos')
// const login = require('./modules/login')

// 準備引入路由模組
router.use('/', home)
router.use('/todos', todos)
// router.use('/home', home)

// 匯出路由器
module.exports = router
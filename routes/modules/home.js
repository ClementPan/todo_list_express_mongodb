const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// set root path
router.get('/', (req, res) => {
  Todo.find()  // find all data, not specific one.
    .sort({ _id: 1 })
    .lean() // don't process it, Mongoose.
    .then(todos => { res.render('index', { todos: todos }) }) //use the todos data found by mongoose to bulit index.
    .catch(error => console.error(error))
})

module.exports = router


const Todo = require('../todo') // 載入 todo model
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 5; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('todos created.')
})
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// from index to new
router.get('/new', (req, res) => {
  return res.render('new')
})

// from new to index
router.post('/', (req, res) => {
  // const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  // 使用 insertMany([])一次建立多筆資料。
  //課程中說要 String()，不知道為什麼。但實作其實好像上不用。
  const todos = req.body.name.split(',').map(todo => ({ name: todo }))
  Todo.insertMany(todos)
    // ordinary version
    // .then(() => res.redirect('/'))

    // for version with login res.redirect('/') changed to res.redirect('home'))
    .then(() => res.redirect('/home'))
    .catch(error => console.log(error))
})

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// edit: from index(get) or detail to edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// edit: from edit(post) to index
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  // 使用 post 送入資料，放在 req.body。 {} 解構賦值
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      console.log(todo)
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// remove 
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    // orginary version
    // .then(() => res.redirect('/'))

    // for version with login res.redirect('/') changed to res.redirect('/home'))
    .then(() => res.redirect('/home'))
    .catch(error => console.log(error))
})

module.exports = router



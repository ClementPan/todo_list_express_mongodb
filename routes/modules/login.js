const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Todo = require('../../models/todo')

// // userAuth
// const userAuth = (req, res, next) => {
//   console.log('Got post, checking ID now!!!!')
//   const mainBlocker = 1
//   const loginInfo = req.body
//   User.findOne({ email: loginInfo.Email, password: loginInfo.Password })
//     .then(user => {
//       return user
//       next()
//     })
//     .catch(error => res.render('login', { error: "Username 或 Password 錯誤。", mainBlocker, loginInfo }))
// }

// // set root path: step 1
// router.get('/', (req, res) => {
//   const mainBlocker = 1
//   res.render('login', { mainBlocker })
// })

// // userAuth: step 2
// router.post('/', userAuth, (req, res, next) => {
//   console.log('autherized, go to index')
//   console.log(next())
//   res.render('loginSuccess')
//   // res.render('loginSuccess', { firstName: user.firstName })
// })

///////// version 2 under constrcution


// set root path
router.get('/', (req, res) => {
  const mainBlocker = 1
  res.render('login', { mainBlocker })
})

// original code 
router.post('/', (req, res) => {
  const mainBlocker = 1
  const loginInfo = req.body
  if ((!loginInfo.Email) || (!loginInfo.Password)) {
    res.render('login', { error: "請輸入 Username 和 Password 。", mainBlocker, loginInfo })
  }
  User.findOne({ email: loginInfo.Email, password: loginInfo.Password })
    .lean()
    .then(user => res.render('loginSuccess', { firstName: user.firstName }))
    .catch(error => res.render('login', { error: "Username 或 Password 錯誤。", mainBlocker, loginInfo }))
})

module.exports = router


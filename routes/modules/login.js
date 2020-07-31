const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// set root path
router.get('/', (req, res) => {
  const login = 1
  res.render('login', { login })
})

router.post('/', (req, res) => {
  const login = 1
  const loginInfo = req.body
  User.findOne(
    { email: loginInfo.Email, password: loginInfo.Password }
  )
    .lean()
    .then(user => res.render('loginSuccess', { firstName: user.firstName }))
    .catch(error => res.render('login', { error: "Username 或 Password 錯誤。", login }))
})

module.exports = router


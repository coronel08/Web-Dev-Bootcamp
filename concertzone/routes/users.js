const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const wrapAsync = require('../utils/wrapAsync')
// import controller for this view
const users = require('../controllers/users')

router.route('/register')
    .get( users.renderRegister)
    .post( wrapAsync(users.registerUser))


router.route('/login')
    .get( users.renderLogin)
    .post( passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser)


router.get('/logout', users.logoutUser)

module.exports = router
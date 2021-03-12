const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const wrapAsync = require('../utils/wrapAsync')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', wrapAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        // req.login, logs user in after being registered
        req.login(registeredUser, err => {
            if(err) return next(err)
            req.flash('success', 'Welcome to Yelp Camp!')
            res.redirect('/campgrounds')
        })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/register')
    }
}))

router.get('/login', async (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    // clear session in case of refresh
    delete req.session.returnTo
    res.redirect(redirectUrl)
})

router.get('/logout', (req,res) => {
    req.logout()
    req.flash('success', 'Logged out!')
    res.redirect('/campgrounds')
})

module.exports = router
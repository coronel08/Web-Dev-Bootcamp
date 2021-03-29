const User = require('../models/user')


module.exports.renderRegister =  (req, res) => {
    res.render('users/register')
}

module.exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        // req.login, logs user in after being registered
        req.login(registeredUser, err => {
            if(err) return next(err)
            req.flash('success', 'Welcome!')
            res.redirect('/venues')
        })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = async (req, res) => {
    res.render('users/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome back')
    const redirectUrl = req.session.returnTo || '/venues'
    // clear session in case of refresh
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logoutUser = (req,res) => {
    req.logout()
    req.flash('success', 'Logged out!')
    res.redirect('/venues')
}
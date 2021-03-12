module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','Please login to add New Campground')
        return res.redirect('/login')
    }
    next()
}

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// Ejsmate imported to handle ejs partials in template
const ejsMate = require('ejs-mate')
const { nextTick } = require('process')

// Import routes/paths 
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')

// error handling 
const wrapAsync = require('./utils/wrapAsync')
const ExpressError = require('./utils/ExpressError')
const campground = require('./models/campground')
module.exports.campgroundSchema

// Middleware for views engine
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// Middleware for static folder
app.use(express.static(path.join(__dirname,'public')))
// Middleware used to parse app.post path req.body 
app.use(express.urlencoded({ extended: true }))
// Middleware used methodOverride to patch and delete 
app.use(methodOverride('_method'))
// Middleware for session
const sessionConfig = {
    secret: 'thissecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
// Flash middleware
app.use(flash())
// Custom middleware for flash route/path, called in routes/campgrounds.js in .post
// Middleware always needs next so that it can chain and work
app.use((req, res, next) =>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


mongoose.connect('mongodb://root:example@localhost:27017/yelp-camp?authSource=admin',
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        // Mongoose delete settings, used in review delete path/route
        useFindAndModify:false
    })
    .then(() => {
        console.log("Connection to MongoDB worked")
    }).catch(err => {
        console.log('We have an error ', err)
})

// Route for campgrounds, prepend /campgrounds, imported from routes/campgrounds
app.use('/campgrounds', campgrounds)
// Route for reviews
app.use('/campgrounds/:id/reviews', reviews)

// Just making a response for landing page
app.get('/', (req, res) => {
    res.render('home')
})

// Middleware for 404 
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

// Middleware for error handling 
app.use((err, req, res, next) => {
    // Giving default to destructured err object
    const { statusCode = 500, message = 'E got an error' } = err
    res.status(statusCode).render('error', { err })
})

app.listen(3005, () => {
    console.log('Serving on port 3005')
})
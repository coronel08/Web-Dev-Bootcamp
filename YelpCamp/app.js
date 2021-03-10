const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
// Mongoose delete settings, used in review delete path/route
mongoose.set('useFindAndModify', false);

// Import routes/paths 
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')

// Ejsmate imported to handle ejs partials in template
const ejsMate = require('ejs-mate')
const { nextTick } = require('process')

// error handling 
const wrapAsync = require('./utils/wrapAsync')
const ExpressError = require('./utils/ExpressError')
const campground = require('./models/campground')
module.exports.campgroundSchema

// Middleware for views engine
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// app.use is middleware used to parse app.post path req.body 
app.use(express.urlencoded({ extended: true }))
// app.use is middleware used methodOverride to patch and delete 
app.use(methodOverride('_method'))

mongoose.connect('mongodb://root:example@localhost:27017/yelp-camp?authSource=admin',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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
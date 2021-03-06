const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const methodOverride = require('method-override') 

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// used to parse app.post path req.body 
app.use(express.urlencoded({ extended:true }))
// use methodOverride to patch and delete 
app.use(methodOverride('_method'))

mongoose.connect('mongodb://root:example@localhost:27017/yelp-camp?authSource=admin',
    {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
    .then(()=> {
        console.log("Connection to MongoDB worked")
    }).catch(err => {
        console.log('We have an error ', err)
})

// Just making a response for landing page
app.get('/',(req, res) => {
    res.render('home')
})

// Find all campgrounds and return a template that iterates over object
app.get('/campgrounds', async (req,res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds} )
})

// Add new campground route from form in campgrounds/new.ejs
app.get('/campgrounds/new', (req,res) => {
    res.render('campgrounds/new')
})

// Added app.use express url encoded to be able to parse req.body
app.post('/campgrounds', async (req,res) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground.id}`)
})

// Display a camgrounds detail by using id
app.get('/campgrounds/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
})

// Edit path/route form
app.get('/campgrounds/:id/edit', async (req,res) =>{
    const campground = await Campground.findById(req.params.id)
    res.render(`campgrounds/edit`, {campground})
})

// Path to accept edit information
app.put('/campgrounds/:id', async (req,res) => {
    const {id} = req.params
    // take spread of object from req.body.campground in edit.ejs form
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})

// Delete path/route
app.delete('/campgrounds/:id', async (req,res) => {
    const {id} =req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})

app.listen(3005, () => {
    console.log('Serving on port 3005')
})
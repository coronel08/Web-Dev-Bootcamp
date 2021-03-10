const express = require('express')
const router = express.Router()
// models and schema
const Campground = require('../models/campground')
const { campgroundSchema } = require('../schema')
// erro handling
const wrapAsync = require('../utils/wrapAsync')
const ExpressError = require('../utils/ExpressError')


// Joi library, error checking for adding campgrounds, validation on server side
const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

// Find all campgrounds and return a template that iterates over object
router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

// Add new campground route from form in campgrounds/new.ejs
router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

// Added app.use express url encoded to be able to parse req.body
router.post('/', validateCampground, wrapAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    req.flash('success', 'Successfully made a new campground!')
    res.redirect(`/campgrounds/${campground.id}`)
}))

// Display a camgrounds detail by using id
router.get('/:id', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    if (!campground){
        req.flash('error','Can Not find campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
}))

// Edit path/route form
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render(`campgrounds/edit`, { campground })
}))

// Path to update edit information on campground
router.put('/:id', validateCampground, wrapAsync(async (req, res) => {
    const { id } = req.params
    // take spread of object from req.body.campground in edit.ejs form
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Succesfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Delete path/route
router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
}))


module.exports = router
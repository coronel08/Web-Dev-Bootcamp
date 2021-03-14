const express = require('express')
const router = express.Router()
// models and schema
const Campground = require('../models/campground')
const { campgroundSchema } = require('../schema')
// erro handling
const wrapAsync = require('../utils/wrapAsync')
const ExpressError = require('../utils/ExpressError')
const { isLoggedIn } = require('../middleware')

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
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})

// Added app.use express url encoded to be able to parse req.body
router.post('/', isLoggedIn, validateCampground, wrapAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)
    campground.author = req.user._id
    await campground.save()
    req.flash('success', 'Successfully made a new campground!')
    res.redirect(`/campgrounds/${campground.id}`)
}))

// Display a camgrounds detail by using id
router.get('/:id', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author')
    if (!campground) {
        req.flash('error', 'Can Not find campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
}))

// Edit path/route form
router.get('/:id/edit', isLoggedIn, wrapAsync(async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground){
        req.flash('error','Cannot find that campground!')
        return res.redirect('/campgrounds')
    }
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You are not authorized to edit someone elses post!')
        return res.redirect(`/campgrounds/${id}`)
    }
    res.render(`campgrounds/edit`, { campground })
}))

// Path to update edit information on campground
router.put('/:id', isLoggedIn, validateCampground, wrapAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)){
        req.flash('error','Unauthorized action, unable to edit someone elses post')
        return res.redirect(`/campgrounds/${id}`)
    }
    // take spread of object from req.body.campground in edit.ejs form
    const campEdit = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Succesfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Delete path/route
router.delete('/:id',isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You do not have permission to delete someone elses post!')
        return res.redirect(`/campgrounds/${id}`)
    }
    await Campground.findByIdAndDelete(id)
    req.flash('success','Succesfully deleted campground!')
    res.redirect('/campgrounds')
}))


module.exports = router
const express = require('express')
const router = express.Router()
// models/schema
const Campground = require('../models/campground')
// error handling
const wrapAsync = require('../utils/wrapAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
// controller import
const campgrounds = require('../controllers/campgrounds')

// Find all campgrounds and return a template that iterates over object
router.get('/', wrapAsync(campgrounds.index))

// Add new campground form render route in views/campgrounds/new.ejs
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// Post route to create new Campground from form. 
// in App.js Added app.use express url encoded to be able to parse req.body
router.post('/', isLoggedIn, validateCampground, wrapAsync(campgrounds.createCampground))

// Display a camgrounds detail by using id
router.get('/:id', wrapAsync(campgrounds.showCampgrounds))

// Edit path/route form
router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditForm))

// Path to update edit information on campground
router.put('/:id', isLoggedIn, isAuthor, validateCampground, wrapAsync(campgrounds.editCampground))

// Delete path/route
router.delete('/:id',isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground))

module.exports = router
const express = require('express')
const router = express.Router()
// models/schema
const Campground = require('../models/campground')
// error handling
const wrapAsync = require('../utils/wrapAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
// controller import
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer')
const {storage} = require('../cloudinaryConfig')
const upload = multer({storage})


// Express has router.route that lets you chain onto paths, used instead of router.get

router.route('/')
    // Find all campgrounds and return a template that iterates over object
    .get(wrapAsync(campgrounds.index))
    // Post route to create new Campground from form. 
    // in App.js Added app.use express url encoded to be able to parse req.body
    // .post(isLoggedIn, validateCampground, wrapAsync(campgrounds.createCampground))
    .post(upload.single('campground[image]'), (req,res) => {
        res.send(req.body, req.file)
    })
    
// Add new campground form render route in views/campgrounds/new.ejs
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    // Display a camgrounds detail by using id
    .get(wrapAsync(campgrounds.showCampgrounds))
    // Path to update edit information on campground
    .put(isLoggedIn, isAuthor, validateCampground, wrapAsync(campgrounds.editCampground))
    // Delete path/route
    .delete(isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground))


// Edit path/route form
router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditForm))

module.exports = router
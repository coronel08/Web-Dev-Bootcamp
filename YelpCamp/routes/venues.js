const express = require('express')
const router = express.Router()
// error handling
const wrapAsync = require('../utils/wrapAsync')
const { isLoggedIn, isAuthor, validateVenue } = require('../middleware')
// controller import
const venues = require('../controllers/venues')
const multer = require('multer')
const {storage} = require('../cloudinaryConfig')
const upload = multer({storage})


// Express has router.route that lets you chain onto paths, used instead of router.get

router.route('/')
    // Find all and return a template that iterates over object
    .get(wrapAsync(venues.index))
    // Post route to create new from form. 
    // in App.js Added app.use express url encoded to be able to parse req.body
    .post(isLoggedIn, upload.array('venue[image]'), validateVenue, wrapAsync(venues.createVenue))

    
// Add new, form render route in views/new.ejs
router.get('/new', isLoggedIn, venues.renderNewForm)

router.route('/:id')
    // Display detail by using id
    .get(wrapAsync(venues.showVenues))
    // Path to update edit information
    .put(isLoggedIn, isAuthor, upload.array('venue[image]'), validateVenue, wrapAsync(venues.editVenue))
    // Delete path/route
    .delete(isLoggedIn, isAuthor, wrapAsync(venues.deleteVenue))


// Edit path/route form
router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(venues.renderEditForm))

module.exports = router
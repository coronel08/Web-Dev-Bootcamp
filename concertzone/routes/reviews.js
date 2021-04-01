const express = require('express')
// need to use mergeParams to be able to get review param/id when adding a new review
const router = express.Router({mergeParams:true})
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
// Error handling wrapper
const wrapAsync = require('../utils/wrapAsync')
// Controller for reviews, used in this router.
const reviews = require('../controllers/reviews')

// Path/route for posting review from show.ejs
router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview))

// delete path/route for reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview))

module.exports = router
const express = require('express')
// need to use mergeParams to be able to get review param/id when adding a new review
const router = express.Router({mergeParams:true})
// Import models and schema
const Campground = require('../models/campground')
const Review = require('../models/review')
const { reviewSchema } = require('../schema')
// Error handling wrapper
const wrapAsync = require('../utils/wrapAsync')


// Joi library, error checking for reviews
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

// Path/route for posting review from show.ejs
router.post('/', validateReview, wrapAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success','Added a review')
    res.redirect(`/campgrounds/${campground._id}`)
})
)

// delete path/route for reviews
router.delete('/:reviewId', wrapAsync(async(req,res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.flash('success','Succesfully removed a review')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router
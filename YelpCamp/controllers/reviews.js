// Import models and schema and validateReview middleware
const Campground = require('../models/campground')
const Venue = require('../models/venue')
const Review = require('../models/review')

module.exports.createReview = async(req, res) => {
    const venue = await Venue.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    venue.reviews.push(review)
    await review.save()
    await venue.save()
    req.flash('success','Added a review')
    res.redirect(`/venues/${venue._id}`)
}

module.exports.deleteReview = async(req,res) => {
    const {id, reviewId} = req.params
    await Venue.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success','Succesfully removed a review')
    res.redirect(`/venues/${id}`)
}
const { campgroundSchema, reviewSchema, venueSchema } = require('./schema')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground')
const Venue = require('./models/venue')
const Review = require('./models/review')


module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','Please login to add New Item')
        return res.redirect('/login')
    }
    next()
}

// Joi library, error checking for adding campgrounds, validation on server side
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

// Middleware to see if author doesnt match user
module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params
    const venue = await Venue.findById(id)
    if(!venue.author.equals(req.user._id)){
        req.flash('error','Unauthorized action, unable to edit someone elses post')
        return res.redirect(`/venues/${id}`)
    }
    next()
}

// Joi library, error checking for reviews
module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

// Middleware to see if author doesnt match user
module.exports.isReviewAuthor = async(req, res, next) => {
    const {id, reviewId} = req.params
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)){
        req.flash('error','Unauthorized action, unable to edit someone elses post')
        return res.redirect(`/venues/${id}`)
    }
    next()
}

module.exports.validateVenue = (req,res,next) => {
    const { error } = venueSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

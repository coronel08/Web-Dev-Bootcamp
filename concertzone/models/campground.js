const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')

const opts = {toJSON: {virtuals: true} }

const CampgroundSchema = new Schema({
    title: String,
    images: [
        {
            url:String,
            filename: String
        }
    ],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,   
    description: String,
    location: String,
    // add in author
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // Reference review.js module, one to many relationship
    // Array of object ids for reviews
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)

// Virtual Schema for organizing mapbox
CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<a href="/campgrounds/${this._id}">${this.title}</a>`
})


// Delete query middleware used to dlt reviews when campsite is dlt'ed
CampgroundSchema.post('findOneAndDelete', async function(doc){
    if (doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)
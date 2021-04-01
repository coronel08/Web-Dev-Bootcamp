// models/schema
const Venue = require('../models/venue')
const cloudinary = require('cloudinary')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({accessToken: mapBoxToken})

module.exports.index = async (req, res) => {
    const venues = await Venue.find({})
    res.render('venues/index', { venues })
}

module.exports.renderNewForm = (req, res) => {
    res.render('venues/new')
}

// Add new venue form render route in views/venues/new.ejs
module.exports.createVenue = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.venue.location,
        limit: 1
    }).send()
    const venue = new Venue(req.body.venue)
    venue.geometry = geoData.body.features[0].geometry
    venue.images = req.files.map( f => ({ url:f.path, filename:f.filename }))
    venue.author = req.user._id
    await venue.save()
    console.log(venue)
    req.flash('success', 'Successfully made a new venue!')
    res.redirect(`/venues/${venue.id}`)
}

module.exports.showVenues = async (req, res) => {
    const venue = await Venue.findById(req.params.id).populate
    ({
        path:'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if (!venue) {
        req.flash('error', 'Can Not find venue')
        return res.redirect('/venues')
    }
    res.render('venues/show', { venue })
}

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params
    const venue = await Venue.findById(id)
    if(!venue){
        req.flash('error','Cannot find that venue!')
        return res.redirect('/venues')
    }
    res.render(`venues/edit`, { venue })
}

module.exports.editVenue = async (req, res) => {
    const { id } = req.params
    // take spread of object from req.body.venue in edit.ejs form
    const venue = await Venue.findByIdAndUpdate(id, { ...req.body.venue })
    const imgs = req.files.map( f => ({ url:f.path, filename:f.filename }))
    venue.images.push(...imgs) 
    await venue.save()
    if(req.body.deleteImages){
        for (let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await venue.updateOne({$pull: {images: {filename:{$in: req.body.deleteImages }}}})
    }
    req.flash('success', 'Succesfully updated')
    res.redirect(`/venues/${venue._id}`)
}

module.exports.deleteVenue = async (req, res) => {
    const { id } = req.params
    await Venue.findByIdAndDelete(id)
    req.flash('success','Succesfully deleted!')
    res.redirect('/venues')
}
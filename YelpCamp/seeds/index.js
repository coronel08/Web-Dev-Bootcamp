const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

// Mongoose connection and catch/error 
mongoose.connect('mongodb://root:example@localhost:27017/yelp-camp?authSource=admin',
    {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

// function used to create random titles for camp, used below
const sample = array => array[Math.floor(Math.random() * array.length)]

// Delete data in Campground, and make new random data
const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i=0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
}

//  Close database connection, returns a promise since we made it async
seedDB().then(() => {
    mongoose.connection.close()
})
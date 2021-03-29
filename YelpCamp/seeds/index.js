const mongoose = require('mongoose')
const Venue = require('../models/venue')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const venues = require('./venues')


// Mongoose connection and catch/error 
mongoose.connect('mongodb://root:example@localhost:27017/concert-zone?authSource=admin',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected succesfully')
})


const makeRandomEntries = async () => {
    // function used to create random titles, used below
    const sample = array => array[Math.floor(Math.random() * array.length)]

    for (let i = 0; i < 5; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const camp = new Venue({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://source.unsplash.com/collection/4989517/1600x900',
                    filename: 'Yelp/'
                },
                {
                    url:'https://source.unsplash.com/collection/10529343/punk',
                    filename: 'Yelp/'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam voluptates asperiores! Expedita fugit laudantium voluptatem vero atque animi ab earum cum eaque facilis ipsam eius rerum, distinctio magnam consequuntur corporis aperiam laboriosam dignissimos laborum. Excepturi maiores pariatur neque et.',
            price: random1000,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            author: '606247be1f5dd391b69f72e2'
        })
        await camp.save()
    }
}

const makeEntries = async () => {
    for (let venue of venues) {
        const camp = new Venue({
            location: venue.location,
            title: venue.title,
            images: venue.images,
            description: venue.description,
            price: venue.price,
            geometry: {
                type: "Point",
                coordinates: [
                    venue.geometry.coordinates[0],
                    venue.geometry.coordinates[1]
                ]
            },
            author: '606247be1f5dd391b69f72e2'
        })
        await camp.save()
    }
}

// Delete data in Venue, and make new random data
const seedDB = async () => {
    await Venue.deleteMany({})
    await makeEntries()
    await makeRandomEntries()
}


//  Close database connection, returns a promise since we made it async
seedDB().then(() => {
    mongoose.connection.close()
    console.log('Database was seeded correctly')
})
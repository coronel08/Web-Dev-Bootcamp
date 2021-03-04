const mongoose = require('mongoose')
mongoose.connect('mongodb://root:example@localhost:27017/movieApp?authSource=admin', 
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() =>{
        console.log('Connection Open!!')
    })
    .catch(err => {
        console.log("Oh No Error!!")
        console.log(err)
    })

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model('Movie', movieSchema)
const amadeus = new Movie({title:'Amadeus', year:1986, score:9.2, rating:'R'})

// Run node and load file using command .load index.js, then able to save the movie using 
// amadeus.save

// Find all movies Movie.find().then(data => console.log(data))
// find movies with year greater than 1980, can also use findOne
Movie.find({year: {$gte: 1980}}).then(data => console.log(data))
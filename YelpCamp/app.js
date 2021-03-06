const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')

mongoose.connect('mongodb://root:example@localhost:27017/yelp-camp?authSource=admin',
    {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
    .then(()=> {
        console.log("Connection to MongoDB worked")
    }).catch(err => {
        console.log('We have an error ', err)
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req, res) => {
    res.render('home')
})

app.get('/makeCampground', async (req,res) => {
    const camp = new Campground ({
        title: 'My Backyard',
        description: 'Free camping'
    })
    await camp.save()
    res.send(camp)
})

app.listen(3005, () => {
    console.log('Serving on port 3005')
})
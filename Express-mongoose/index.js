const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose.connect('mongodb://root:example@localhost:27017/farmStand?authSource=admin',
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> {
        console.log("Connection to MongoDB worked")
    }).catch(err => {
        console.log('We have an error ', err)
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/',(req, res) => {
    res.send("This is the home page")
})

app.get('/products', async (req,res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', {products})
})

app.listen(3005, ()=> {
    console.log("Listening on port 3005")
})
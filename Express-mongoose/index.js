const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')

// set views path to static, set template engine to ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// set post.body middleware
app.use(express.urlencoded({extended:true}))
// set methodOverride so we can use Put method
app.use(methodOverride('_method'))
// create categories for new.ejs and edit.ejs loop
const categories = ['fruit', 'vegetable', 'dairy']

mongoose.connect('mongodb://root:example@localhost:27017/farmStand?authSource=admin',
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> {
        console.log("Connection to MongoDB worked")
    }).catch(err => {
        console.log('We have an error ', err)
})

app.get('/',(req, res) => {
    res.send("This is the home page")
})

// passes all products from db into the products/index.ejs
app.get('/products', async (req,res) => {
    const products = await Product.find({})
    res.render('products/index', {products})
})

// Input form for new products
app.get('/products/new', (req,res) => {
    res.render('products/new',{categories})
})

// Created POST route to submit new input items data, redirects to product id page
app.post('/products', async (req,res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct.id}`)
})

// Path for individual items passed into product.ejs
app.get('/products/:id', async(req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/id', {product})
})

// Edit path, passes products and categories into edit.ejs
app.get('/products/:id/edit', async (req,res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render(`products/edit`, {product, categories})
})

// Created PUT route accepts data from edit.ejs form, finds and updates products using id
app.put('/products/:id', async (req, res) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new:true})
    res.redirect(`/products/${product._id}`)
})

// Created PUT route accepts data from edit.ejs form, finds and updates products using id
app.delete('/products/:id', async (req, res) => {
    const {id} = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3005, ()=> {
    console.log("Listening on port 3005")
})
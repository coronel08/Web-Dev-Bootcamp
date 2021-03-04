const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose.connect('mongodb://root:example@localhost:27017/farmStand?authSource=admin',
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("Connection to MongoDB worked")
    })
    .catch(err => {
        console.log("Connection to MongoDB error", err)
})

/* Testing adding a new product into DB
const p = new Product({
    name: 'Grapefruit',
    price: 1.99,
    category: 'fruit'
})
p.save().then(p => {
    console.log(p)
}) .catch(err => {
    console.log(err)
})
*/

const seedProducts = [
    {
        name: 'Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Watermelon',
        price: 2.99,
        category: 'fruit'
    }
]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
}).catch(err => {
    console.log("Couldn't add to DB", err)
})
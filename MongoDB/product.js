const mongoose = require('mongoose')
mongoose.connect('mongodb://root:example@localhost:27017/shopApp?authSource=admin', 
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() =>{
        console.log("Connection to MongoDB worked")
    })
    .catch(err => {
        console.log('We have an error!! ', err)
    })

// Define schema / data modeling
const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    price: Number,
    onSale: {
        type: Boolean,
        default: false
    }
})

// Create and Save the new Bike
const Product = mongoose.model('Product',productSchema)
const bike = new Product({name:'Mountain Bike', price:599})
bike.save()
    .then(data =>{
        console.log('Wrote the following to Mongo', data)
    })
    .catch(err => {
        console.log('Saving error ', err)
    })


// Create a method for toggling sale, used below in Instance method 
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale
    return this.save()
}

// Create a method for adding category, never called or used
productSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat)
    return this.save()
}

// Instance Methods, could use try and catch to get error in async func
const findProduct = async() => {
    const foundProduct = await Product.findOne({name: 'Mountain Bike'})
    await foundProduct.toggleOnSale()
    console.log(foundProduct)
}

// Static Methods, live on the model and not on the instance of the model. No access to this
// Not called, updates everything {} to have on sale
productSchema.statics.fireSale = function(){
    return this.updateMany({}, {onSale: true, price:0 })
}
// Product.fireSale().then(res => console.log(res))
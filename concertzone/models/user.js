const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    email:{
        type: String,
        requiured: true,
    }
})

// Adds username and password and adds static methods to auth
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User',UserSchema)
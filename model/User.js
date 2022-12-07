const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const User = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    contactPhone: { type: String }

})

const UserModel = model('User', User)
module.exports = UserModel
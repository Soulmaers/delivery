const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const { ObjectId } = Schema;

const Advertisement = new Schema({
    shortText: { type: String, required: true },
    description: { type: String },
    images: [String],
    userId: { type: ObjectId, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    tags: [String],
    isDeleted: { type: Boolean, required: true }

})

const AdvertisementModel = model('Advertisement', Advertisement)
module.exports = AdvertisementModel
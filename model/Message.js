const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { ObjectId } = Schema;


const Message = new Schema({
    author: { type: ObjectId, required: true },
    sentAt: { type: Date, required: true },
    text: { type: String, required: true },
    readAt: Date

})

const MessagesModel = model('Message', Message)
module.exports = {
    Message,
    MessagesModel
} 
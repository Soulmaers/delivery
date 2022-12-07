const mongoose = require('mongoose')
const { Message } = require('./Message');
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const Chat = new Schema({
    users: { type: [ObjectId, ObjectId], required: true },
    createdAt: { type: Date, required: true },
    messages: [Message],

})

const ChatModel = model('Chat', Chat)
module.exports = ChatModel
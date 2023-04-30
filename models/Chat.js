const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chat: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
    }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
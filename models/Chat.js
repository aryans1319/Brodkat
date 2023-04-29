const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chat: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
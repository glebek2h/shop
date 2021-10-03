const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    comments: [{ text: String, date: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');

const linksSchema = mongoose.Schema({
    text: String,
    link: String
});

module.exports = mongoose.model('Link', linksSchema);

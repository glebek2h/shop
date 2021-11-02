const mongoose = require('mongoose');

const avatarSchema = mongoose.Schema({
    imgUrl: String,
});

module.exports = mongoose.model('Avatar', avatarSchema);

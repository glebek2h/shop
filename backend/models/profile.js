const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name: String,
    email: String,
});

module.exports = mongoose.model('Profile', profileSchema);

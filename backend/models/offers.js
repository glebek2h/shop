const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    icon: String,
});

module.exports = mongoose.model('Offer', offerSchema);

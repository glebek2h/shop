const mongoose = require('mongoose');

const promotionsSchema = mongoose.Schema({
    title: String,
    subTitle: String,
    image: String,
    link: String
});

module.exports = mongoose.model('Promotions', promotionsSchema);

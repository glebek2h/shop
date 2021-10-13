const mongoose = require('mongoose');

// this is not getting categories. I don't know what to do. Maybe something wrong with nesting objects.
const offerSchema = mongoose.Schema({
    icon: String,
    categories: {
        categoryNames: [{ name: String }],
        data: [{ productName: String, image: String, quantity: String, category: String }],
    },
    promos: [{ title: String, subTitle: String, image: String, link: String }],
});

module.exports = mongoose.model('Offer', offerSchema);

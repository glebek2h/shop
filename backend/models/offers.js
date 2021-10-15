const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    icon: String,
    categories: {
        categoryNames: [{ name: String }],
        data: [
            {
                productName: String,
                image: String,
                quantity: String,
                category: String,
            },
        ],
    },
    promos: [{ title: String, subTitle: String, image: String, link: String }],
});

module.exports = mongoose.model('Offer', offerSchema);

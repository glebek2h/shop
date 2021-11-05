const mongoose = require('mongoose');

const categoryProductsSchema = mongoose.Schema({
    categoryId: Number,
    data: [
        {
            name: String,
            description: String,
            image: String,
            price: Number,
            reviews: Number,
            brand: String,
            popular: Number,
            releaseDate: Number,
            productType: String,
            category: String,
        },
    ],
});

module.exports = mongoose.model('CategoryProducts', categoryProductsSchema);

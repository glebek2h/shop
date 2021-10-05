const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    _id: String,
    name: String,
    email: String,
});

module.exports = mongoose.model('Form', formSchema);

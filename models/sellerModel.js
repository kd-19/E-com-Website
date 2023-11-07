const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const sellerModel = mongoose.model('Seller', sellerSchema);

module.exports = sellerModel; 
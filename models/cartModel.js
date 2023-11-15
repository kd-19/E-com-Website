const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name:String,
    price:Number,
    color:String,
    category:String,
    description:String,
    image:String,
    quantity:Number,
    userId:String,
    productId:String
});

const cartModel = mongoose.model('Cart',cartSchema);

module.exports = cartModel;
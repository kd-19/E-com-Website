const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    address:String,
    email:String,
    contact:String,
    totalPrice:Number,
    userId:String
});

const orderModel = mongoose.model('Orders',orderSchema);

module.exports = orderModel;
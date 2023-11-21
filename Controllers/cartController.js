const Cart = require('../models/cartModel');

const mongoose = require('mongoose');

 exports.addCart = async (req, res) => {
    const { name, price, color, category, description, image, quantity, userId, productId } =  req.body;
  
    try {
      const cartItem = await Cart.create({
        name,
        price,
        color,
        category,
        description,
        image,
        quantity,
        userId,
        productId,
      });
  
      res.status(201).json(cartItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  exports.getCart = async (req, res) => {
    try {
      const cart = await Cart.find({});
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.getSpecificCart = async (req, res) => {
    const { userId } = req.query;
  
    try {
      const cartItems = await Cart.find({ userId });
      res.status(200).json(cartItems);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.removeCart = async (req, res) => {
    const cartItemId =  new mongoose.Types.ObjectId(req.params.cartItemId);
  
    try {
      const cartItem = await Cart.findByIdAndDelete(cartItemId);
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
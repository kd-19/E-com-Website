const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cart = require('../models/cartModel');

// Add an item to the cart
router.post('/add', async (req, res) => {
    const { name, price, color, category, description, image, quantity, userId, productId } = req.body;
  
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
  });

  router.get('/', async (req, res) => {
    try {
      const cart = await Cart.find({});
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



//Get cart items for a specific user
router.get('/get/', async (req, res) => {
    const { userId } = req.query;
  
    try {
      const cartItems = await Cart.find({ userId });
      res.status(200).json(cartItems);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

//Remove Cart item 
router.delete('/remove/:cartItemId', async (req, res) => {
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
  });


module.exports=router;
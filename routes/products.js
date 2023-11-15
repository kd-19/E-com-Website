const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Products = require('../models/productModel');


// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  const productId = new mongoose.Types.ObjectId(req.params.id);

  try {
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Add Product
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Products(req.body);
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a product by ID
router.put('/update/:id', async (req, res) => {
  const productId = new mongoose.Types.ObjectId(req.params.id);
  const updateData = req.body;

  try {
    const product = await Products.findByIdAndUpdate(productId, updateData, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product by ID
router.delete('/delete/:id', async (req, res) => {
  const productId = new mongoose.Types.ObjectId(req.params.id);

  try {
    const product = await Products.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).end(); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports=router;
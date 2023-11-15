const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Seller = require('../models/sellerModel');

router.get('/', async (req, res) => {
    try {
      const sellers = await Seller.find({});
      res.status(200).json(sellers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Seller signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try{
      const existingSeller = await Seller.findOne({ email });
      if (existingSeller) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
  
      const newSeller = await Seller.create({ name, email, password });
      res.status(201).json(newSeller);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  // Seller login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const seller = await Seller.findOne({ email });
  
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      if (seller.password !== password) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports=router;
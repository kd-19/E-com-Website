const express = require('express');
const router = express.Router();

const Users = require('../models/userModel');

router.get('/', async (req, res) => {
    try {
      const users = await Users.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// User signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try{
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
  
      const newUser = await Users.create({ name, email, password });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  // User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Users.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports=router;
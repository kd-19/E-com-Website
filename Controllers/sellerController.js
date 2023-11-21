const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

const Seller = require('../models/sellerModel');

exports.getSeller = async (req, res) => {
    try {
      const sellers = await Seller.find({});
      res.status(200).json(sellers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

 exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
  
    try{
      const existingSeller = await Seller.findOne({ email });
      if (existingSeller) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

      const hashedPassword = await bcrypt.hash(password,10);
  
      const newSeller = await Seller.create({ name, email, password:hashedPassword });

      const token = jwt.sign({_id:newSeller._id, email:newSeller.email, name:newSeller.name}, config.jwtSecret, {expiresIn:'1h'});

      res.status(201).json({newSeller, token});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


  exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const seller = await Seller.findOne({ email });
  
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }

      const isPassswordValid = bcrypt.compare(password, seller.password);
  
      if (!isPassswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = jwt.sign({_id:seller._id, email:seller.email, name:seller.name}, config.jwtSecret, {expiresIn:'1h'});
  
      res.status(200).json({ seller, token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
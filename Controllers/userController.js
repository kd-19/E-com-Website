const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const Users = require('../models/userModel');

exports.getUser = async (req, res) => {
    try {
      const users = await Users.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
  
    try{
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

      const hashedPassword = await bcrypt.hash(password,10);
  
      const newUser = await Users.create({ name, email, password:hashedPassword });

      const token = jwt.sign({_id:newUser._id, email:newUser.email, name:newUser.name}, config.jwtSecret, {expiresIn:'1h'});

      res.status(201).json({user:newUser,token});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  exports.login = async (req, res) => {

    const { email, password } = req.body;
  
    try {
      const user = await Users.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const isPassswordValid = bcrypt.compare(password, user.password);

      if (!isPassswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = jwt.sign({_id:user._id, email:user.email, name:user.name}, config.jwtSecret, {expiresIn:'1h'});
  
      res.status(200).json({ user , token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
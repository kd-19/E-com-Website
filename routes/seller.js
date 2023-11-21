const express = require('express');
const router = express.Router();

const Seller = require('../models/sellerModel');

const Control = require('../Controllers/sellerController');

router.get('/', Control.getSeller);
  

// Seller signup
router.post('/signup', Control.signUp);


  // Seller login
router.post('/login', Control.login);


module.exports=router;
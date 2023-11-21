const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cart = require('../models/cartModel');

const Control= require('../Controllers/cartController');

const authMiddleware = require('../Middlewares/authMiddleware');

// Add an item to the cart
router.post('/add',authMiddleware.verifyToken ,Control.addCart);

router.get('/' ,Control.getCart);

//Get cart items for a specific user
router.get('/get/',authMiddleware.verifyToken,Control.getSpecificCart);

//Remove Cart item 
router.delete('/remove/:cartItemId', authMiddleware.verifyToken , Control.removeCart);


module.exports=router;
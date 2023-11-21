const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Products = require('../models/productModel');

const Control = require('../Controllers/productController');
const authMiddleware = require('../Middlewares/authMiddleware');


// Get all products
router.get('/', Control.getProduct);

// Get a product by ID
router.get('/:id', Control.getProductById);

//Add Product
router.post('/add',authMiddleware.verifyToken, Control.addProduct);

// Update a product by ID
router.put('/update/:id', authMiddleware.verifyToken,Control.updateProduct);

// Delete a product by ID
router.delete('/delete/:id', authMiddleware.verifyToken,Control.deleteProduct);


module.exports=router;
const express = require('express');
const router = express.Router();

const authMiddleware = require('../Middlewares/authMiddleware');

const Orders = require('../models/orderModel');

const Control = require('../Controllers/orderController');

router.post('/', authMiddleware.verifyToken ,Control.CreateOrder);

router.get('/get', authMiddleware.verifyToken , Control.getOrder);

module.exports=router;
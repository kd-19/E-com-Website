const Orders = require('../models/orderModel');

exports.CreateOrder = async (req, res) => {
    const { address,email,contact,totalPrice,userId } = req.body;
  
    try {
      const orderData = await Orders.create({
        address,
        email,
        contact,
        totalPrice,
        userId
      });
  
      res.status(201).json(orderData);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


  exports.getOrder = async (req, res) => {
    try {
      const order = await Orders.find({});
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
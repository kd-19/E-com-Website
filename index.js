const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/users');
const sellerRouter = require('./routes/seller');
const productRouter = require('./routes/products');
const cartRotuer = require('./routes/cart');
const orderRouter = require('./routes/orders');

const app= express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/E-Com");

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/users',userRouter);
app.use('/seller',sellerRouter);
app.use('/products',productRouter);
app.use('/cart',cartRotuer);
app.use('/orders',orderRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
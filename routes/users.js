const express = require('express');
const router = express.Router();

const authMiddleware = require('../Middlewares/authMiddleware');

const Users = require('../models/userModel');

const Control = require('../Controllers/userController');


router.get('/' , Control.getUser); 

// User signup
router.post('/signup' , Control.signup);

  // User login
router.post('/login' ,Control.login);

module.exports=router;
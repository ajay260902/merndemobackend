const express = require('express');

// Controller functions
const { loginUser, signupUser, forgotPassword } = require('../controllers/userController');

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);


module.exports = router;

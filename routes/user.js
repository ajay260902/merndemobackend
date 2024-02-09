const express = require('express');

// Controller functions
const { loginUser, signupUser, forgotPassword } = require('../controllers/userController');

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// Forgot password route
router.post('/forgot-password', forgotPassword);

module.exports = router;

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // Import the cors package
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/userModel'); 
// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors()) // Use cors middleware to enable CORS

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Endpoint to handle password reset
app.post('/api/reset-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});


// routes


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

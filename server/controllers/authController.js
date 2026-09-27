const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      })
    }

    const lowerEmail = email.toLowerCase().trim()

    // Check if user exists
    const userExists = await User.findOne({ email: lowerEmail })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: lowerEmail,
      password: hashedPassword,
    })

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    })
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      })
    }

    const lowerEmail = email.toLowerCase().trim()

    // Find user by email
    const user = await User.findOne({ email: lowerEmail })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Server error: JWT configuration is missing',
      })
    }

    const tokenOptions = {}
    if (process.env.JWT_EXPIRE) {
      tokenOptions.expiresIn = process.env.JWT_EXPIRE
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, tokenOptions)

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
}

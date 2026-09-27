const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token missing',
      })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: JWT secret is missing',
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Attach user ID
    req.user = decoded.id

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid or expired',
    })
  }
}

module.exports = authMiddleware

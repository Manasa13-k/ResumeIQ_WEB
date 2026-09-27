const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')
const { uploadResume } = require('../controllers/resumeController')

// Multer error handling wrapper
const handleMulterUpload = (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload error',
      })
    }
    next()
  })
}

// POST /api/resumes/upload
router.post('/upload', authMiddleware, handleMulterUpload, uploadResume)

module.exports = router

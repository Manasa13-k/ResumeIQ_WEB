const multer = require('multer')

// Configure Memory Storage
const storage = multer.memoryStorage()

// File filter: Accept only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
    cb(null, true)
  } else {
    cb(new Error('Only PDF files are allowed'), false)
  }
}

// Multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
})

module.exports = upload

const Resume = require('../models/Resume')
const { PDFParse } = require('pdf-parse')

// @desc    Upload PDF resume & extract text
// @route   POST /api/resumes/upload
// @access  Private
const uploadResume = async (req, res) => {
  try {
    // 1. Verify authenticated user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required',
      })
    }

    // 2. Verify file uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF resume file',
      })
    }

    // 3. Verify PDF format
    const isPdfMime = req.file.mimetype === 'application/pdf'
    const isPdfExt = req.file.originalname && req.file.originalname.toLowerCase().endsWith('.pdf')
    if (!isPdfMime && !isPdfExt) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only PDF files are allowed',
      })
    }

    // 4. Parse PDF from memory buffer
    let pdfData
let parser

try {
  parser = new PDFParse({ data: req.file.buffer })
  pdfData = await parser.getText()
} catch (parseErr) {
  console.error('PDF parsing error:', parseErr)

  return res.status(400).json({
    success: false,
    message: 'Failed to parse PDF file. The file may be corrupted or password protected.',
  })
} finally {
  if (parser) {
    await parser.destroy()
  }
}

const extractedText = pdfData && pdfData.text
  ? pdfData.text.trim()
  : ''

    // 5. Verify meaningful text extraction
    if (!extractedText || extractedText.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Unable to extract text from the uploaded PDF resume. Please ensure the file contains readable text.',
      })
    }

    // 6. Save Resume record to MongoDB
    const resume = await Resume.create({
      user: req.user,
      originalName: req.file.originalname,
      extractedText,
    })

    // Create a small text preview (first 200 characters)
    const textPreview = extractedText.length > 200
      ? extractedText.substring(0, 200) + '...'
      : extractedText

    // 7. Return HTTP 201 response
    return res.status(201).json({
      success: true,
      message: 'Resume uploaded and processed successfully',
      resume: {
        id: resume._id,
        originalName: resume.originalName,
        textPreview,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while processing resume upload',
    })
  }
}

module.exports = {
  uploadResume,
}

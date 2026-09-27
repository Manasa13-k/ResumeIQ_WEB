const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { analyzeResume, getAnalysisById } = require('../controllers/analysisController')

// POST /api/analysis
router.post('/', authMiddleware, analyzeResume)

// GET /api/analysis/:id
router.get('/:id', authMiddleware, getAnalysisById)

module.exports = router

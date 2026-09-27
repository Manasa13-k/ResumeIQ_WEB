const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getDashboardData } = require('../controllers/dashboardController')

// GET /api/dashboard
router.get('/', authMiddleware, getDashboardData)

module.exports = router

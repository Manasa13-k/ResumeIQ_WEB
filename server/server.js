const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')
const analysisRoutes = require('./routes/analysisRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

const app = express()

// Connect Database
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/resumes', resumeRoutes)
app.use('/api/analysis', analysisRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ResumeIQ API is running',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`ResumeIQ Server is running on port ${PORT}`)
})

const mongoose = require('mongoose')
const Resume = require('../models/Resume')
const Analysis = require('../models/Analysis')
const geminiService = require('../services/geminiService')
const atsService = require('../services/atsService')

// @desc    Analyze resume against a job description using AI & deterministic ATS scoring
// @route   POST /api/analysis
// @access  Private
const analyzeResume = async (req, res) => {
  try {
    // 1. Verify authenticated user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required to analyze resume',
      })
    }

    const { resumeId, jobDescription } = req.body

    // 2. Validate input fields presence
    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both resumeId and jobDescription',
      })
    }

    // 3. Validate Mongoose ObjectId format for resumeId
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid resumeId format',
      })
    }

    // 4. Validate job description length and content
    const cleanJobDescription = String(jobDescription).trim()
    if (!cleanJobDescription || cleanJobDescription.length < 15) {
      return res.status(400).json({
        success: false,
        message: 'Job description is too short. Please provide a detailed job description (minimum 15 characters).',
      })
    }

    if (cleanJobDescription.length > 10000) {
      return res.status(400).json({
        success: false,
        message: 'Job description is too long. Maximum allowed length is 10,000 characters.',
      })
    }

    // 5. Find Resume belonging ONLY to the authenticated user
    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user,
    })

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found or you do not have permission to access it',
      })
    }

    // 6. Verify extracted text exists in resume
    if (!resume.extractedText || !resume.extractedText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'The selected resume does not contain extracted text for analysis.',
      })
    }

    // 7. Call Gemini AI Service for structured qualitative analysis
    const geminiAnalysis = await geminiService.analyzeResumeContent(
      resume.extractedText,
      cleanJobDescription
    )

    // 8. Calculate deterministic ATS scores
    const atsMetrics = atsService.calculateAtsScore(geminiAnalysis)

    // 9. Save Analysis record to MongoDB
    const analysis = await Analysis.create({
      user: req.user,
      resume: resume._id,
      jobDescription: cleanJobDescription,
      atsScore: atsMetrics.atsScore,
      skillMatch: atsMetrics.skillMatch,
      experienceRelevance: atsMetrics.experienceRelevance,
      educationRelevance: atsMetrics.educationRelevance,
      completeness: atsMetrics.completeness,
      keywordCoverage: atsMetrics.keywordCoverage,
      matchedSkills: geminiAnalysis.matchedSkills,
      missingSkills: geminiAnalysis.missingSkills,
      importantKeywords: geminiAnalysis.importantKeywords,
      suggestions: geminiAnalysis.suggestions,
      recruiterFeedback: geminiAnalysis.recruiterFeedback,
      interviewQuestions: geminiAnalysis.interviewQuestions,
    })

    // 10. Return HTTP 201 successful response
    return res.status(201).json({
      success: true,
      message: 'Resume analyzed successfully',
      analysis: {
        id: analysis._id,
        atsScore: analysis.atsScore,
        skillMatch: analysis.skillMatch,
        experienceRelevance: analysis.experienceRelevance,
        educationRelevance: analysis.educationRelevance,
        completeness: analysis.completeness,
        keywordCoverage: analysis.keywordCoverage,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        importantKeywords: analysis.importantKeywords,
        suggestions: analysis.suggestions,
        recruiterFeedback: analysis.recruiterFeedback,
        interviewQuestions: analysis.interviewQuestions,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during resume analysis',
    })
  }
}

// @desc    Get single analysis by ID for authenticated user
// @route   GET /api/analysis/:id
// @access  Private
const getAnalysisById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid analysis ID format',
      })
    }

    const analysis = await Analysis.findOne({
      _id: id,
      user: req.user,
    })

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis record not found',
      })
    }

    return res.status(200).json({
      success: true,
      analysis: {
        id: analysis._id,
        jobDescription: analysis.jobDescription,
        atsScore: analysis.atsScore,
        skillMatch: analysis.skillMatch,
        experienceRelevance: analysis.experienceRelevance,
        educationRelevance: analysis.educationRelevance,
        completeness: analysis.completeness,
        keywordCoverage: analysis.keywordCoverage,
        matchedSkills: analysis.matchedSkills || [],
        missingSkills: analysis.missingSkills || [],
        importantKeywords: analysis.importantKeywords || [],
        suggestions: analysis.suggestions || [],
        recruiterFeedback: analysis.recruiterFeedback || '',
        interviewQuestions: analysis.interviewQuestions || [],
        createdAt: analysis.createdAt,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching analysis details',
    })
  }
}

module.exports = {
  analyzeResume,
  getAnalysisById,
}

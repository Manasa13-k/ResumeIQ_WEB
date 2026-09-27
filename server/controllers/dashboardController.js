const Analysis = require('../models/Analysis')

// @desc    Get dashboard metrics & analyses for authenticated user
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required to access dashboard',
      })
    }

    // Query analyses belonging to authenticated user sorted latest first
    const analyses = await Analysis.find({ user: req.user })
      .sort({ createdAt: -1 })
      .exec()

    const totalAnalyses = analyses.length

    if (totalAnalyses === 0) {
      return res.status(200).json({
        success: true,
        dashboard: {
          latestAnalysis: null,
          stats: {
            totalAnalyses: 0,
            skillsMatched: 0,
            improvement: 0,
          },
          recentAnalyses: [],
        },
      })
    }

    const latest = analyses[0]
    const earliest = analyses[totalAnalyses - 1]

    // Calculate improvement
    let improvement = 0
    if (totalAnalyses > 1) {
      improvement = latest.atsScore - earliest.atsScore
    }

    const skillsMatchedCount = Array.isArray(latest.matchedSkills) ? latest.matchedSkills.length : 0

    // Format latest analysis details
    const latestAnalysis = {
      id: latest._id,
      atsScore: latest.atsScore,
      skillMatch: latest.skillMatch,
      experienceRelevance: latest.experienceRelevance,
      educationRelevance: latest.educationRelevance,
      completeness: latest.completeness,
      keywordCoverage: latest.keywordCoverage,
      matchedSkills: latest.matchedSkills || [],
      missingSkills: latest.missingSkills || [],
      importantKeywords: latest.importantKeywords || [],
      recruiterFeedback: latest.recruiterFeedback || '',
      suggestions: latest.suggestions || [],
      createdAt: latest.createdAt,
    }

    // Derive recent analyses summary list (up to 5)
    const recentAnalyses = analyses.slice(0, 5).map((item) => {
      // Derive a display label from jobDescription (first 35 chars) or fallback
      let label = 'Resume Analysis'
      if (item.jobDescription && typeof item.jobDescription === 'string') {
        const cleanDesc = item.jobDescription.trim().split('\n')[0]
        label = cleanDesc.length > 35 ? cleanDesc.substring(0, 35) + '...' : cleanDesc
      }

      return {
        id: item._id,
        label,
        atsScore: item.atsScore,
        createdAt: item.createdAt,
      }
    })

    return res.status(200).json({
      success: true,
      dashboard: {
        latestAnalysis,
        stats: {
          totalAnalyses,
          skillsMatched: skillsMatchedCount,
          improvement,
        },
        recentAnalyses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while loading dashboard data',
    })
  }
}

module.exports = {
  getDashboardData,
}

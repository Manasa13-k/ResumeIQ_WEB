/**
 * Calculates deterministic ATS Score based on weighted metrics.
 * 
 * Weights:
 * - Skill Match: 40%
 * - Experience Relevance: 20%
 * - Education Relevance: 10%
 * - Resume Completeness: 10%
 * - Keyword Coverage: 20%
 * 
 * @param {Object} metrics 
 * @returns {Object} Calculated ATS score and individual component scores
 */
const calculateAtsScore = (metrics = {}) => {
  const clamp = (val, defaultVal = 0) => {
    const num = Number(val)
    if (isNaN(num)) return defaultVal
    return Math.min(100, Math.max(0, Math.round(num)))
  }

  // Calculate skill match score from matched / required skills if available, or clamp passed value
  let skillMatchScore = 0
  const matched = Array.isArray(metrics.matchedSkills) ? metrics.matchedSkills.length : 0
  const required = Array.isArray(metrics.requiredSkills) ? metrics.requiredSkills.length : 0

  if (required > 0) {
    skillMatchScore = Math.round((matched / required) * 100)
  } else if (metrics.skillMatch !== undefined) {
    skillMatchScore = metrics.skillMatch
  } else if (matched > 0) {
    skillMatchScore = Math.min(100, matched * 20) // Default fallback estimate
  } else {
    skillMatchScore = 50
  }

  const skillMatch = clamp(skillMatchScore, 50)
  const experienceRelevance = clamp(metrics.experienceRelevance, 50)
  const educationRelevance = clamp(metrics.educationRelevance, 50)
  const completeness = clamp(metrics.completeness, 50)
  const keywordCoverage = clamp(metrics.keywordCoverage, 50)

  // Weighted ATS Formula
  const rawAtsScore =
    skillMatch * 0.40 +
    experienceRelevance * 0.20 +
    educationRelevance * 0.10 +
    completeness * 0.10 +
    keywordCoverage * 0.20

  const atsScore = clamp(Math.round(rawAtsScore), 0)

  return {
    atsScore,
    skillMatch,
    experienceRelevance,
    educationRelevance,
    completeness,
    keywordCoverage,
  }
}

module.exports = {
  calculateAtsScore,
}

const { GoogleGenerativeAI } = require('@google/generative-ai')

/**
 * Analyzes resume content against a job description using Gemini AI.
 * Returns structured metrics and feedback WITHOUT calculating the final ATS score.
 * 
 * @param {string} resumeText 
 * @param {string} jobDescription 
 * @returns {Promise<Object>} Structured analysis JSON
 */
const analyzeResumeContent = async (resumeText, jobDescription) => {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey || !apiKey.trim()) {
    throw new Error('GEMINI_API_KEY is missing or not configured in environment variables')
  }

  const genAI = new GoogleGenerativeAI(apiKey.trim())
  // Use gemini-3.8-flash model
  const model = genAI.getGenerativeModel({ model: 'gemini-3.8-flash' })

  const prompt = `
You are an expert ATS (Applicant Tracking System) parser and senior recruiter AI.
Analyze the following candidate resume text against the provided job description.

DO NOT calculate the final ATS score. Return ONLY structured metrics and insights.

Output MUST be a single raw JSON object strictly adhering to the following structure with no markdown, no prose, and no code block wrappers:

{
  "resumeSkills": ["string"],
  "requiredSkills": ["string"],
  "matchedSkills": ["string"],
  "missingSkills": ["string"],
  "skillMatch": number (0-100),
  "experienceRelevance": number (0-100),
  "educationRelevance": number (0-100),
  "completeness": number (0-100),
  "keywordCoverage": number (0-100),
  "importantKeywords": ["string"],
  "suggestions": ["string"],
  "recruiterFeedback": "string",
  "interviewQuestions": ["string"]
}

Rules:
1. All score components (skillMatch, experienceRelevance, educationRelevance, completeness, keywordCoverage) MUST be integers between 0 and 100.
2. matchedSkills: skills explicitly present in both the resume and job description.
3. missingSkills: critical skills in the job description missing from the resume.
4. suggestions: actionable recommendations to improve the resume for this role.
5. recruiterFeedback: 2-3 sentences summarizing how a recruiter views this candidate profile.
6. interviewQuestions: 3-5 tailored interview questions based on the candidate's background and role gaps.

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()

    if (!text) {
      throw new Error('Received empty response from Gemini API')
    }

    // Clean potential markdown fenced JSON wrappers (```json ... ```)
    text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim()

    let parsed
    try {
      parsed = JSON.parse(text)
    } catch (parseError) {
      // If parsing fails, try finding first '{' and last '}'
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}')
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        parsed = JSON.parse(text.substring(jsonStart, jsonEnd + 1))
      } else {
        throw new Error(`Failed to parse JSON response from AI model: ${parseError.message}`)
      }
    }

    // Helper to clamp values between 0 and 100
    const clamp = (val, defaultVal = 50) => {
      const num = Number(val)
      if (isNaN(num)) return defaultVal
      return Math.min(100, Math.max(0, Math.round(num)))
    }

    // Ensure array structure
    const ensureArray = (arr) => (Array.isArray(arr) ? arr.map((item) => String(item).trim()).filter(Boolean) : [])

    const matchedSkills = ensureArray(parsed.matchedSkills)
    const requiredSkills = ensureArray(parsed.requiredSkills)
    
    let defaultSkillMatch = 70
    if (requiredSkills.length > 0) {
      defaultSkillMatch = Math.round((matchedSkills.length / requiredSkills.length) * 100)
    }

    return {
      resumeSkills: ensureArray(parsed.resumeSkills),
      requiredSkills,
      matchedSkills,
      missingSkills: ensureArray(parsed.missingSkills),
      skillMatch: clamp(parsed.skillMatch, defaultSkillMatch),
      experienceRelevance: clamp(parsed.experienceRelevance, 70),
      educationRelevance: clamp(parsed.educationRelevance, 80),
      completeness: clamp(parsed.completeness, 85),
      keywordCoverage: clamp(parsed.keywordCoverage, 65),
      importantKeywords: ensureArray(parsed.importantKeywords),
      suggestions: ensureArray(parsed.suggestions),
      recruiterFeedback: typeof parsed.recruiterFeedback === 'string' ? parsed.recruiterFeedback.trim() : '',
      interviewQuestions: ensureArray(parsed.interviewQuestions),
    }
  } catch (err) {
    throw new Error(`Gemini AI Service Error: ${err.message}`)
  }
}

module.exports = {
  analyzeResumeContent,
}

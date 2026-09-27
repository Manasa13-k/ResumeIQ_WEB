const mongoose = require('mongoose')

const analysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  atsScore: {
    type: Number,
    required: true,
  },
  skillMatch: {
    type: Number,
    required: true,
  },
  experienceRelevance: {
    type: Number,
    required: true,
  },
  educationRelevance: {
    type: Number,
    required: true,
  },
  completeness: {
    type: Number,
    required: true,
  },
  keywordCoverage: {
    type: Number,
    required: true,
  },
  matchedSkills: {
    type: [String],
    default: [],
  },
  missingSkills: {
    type: [String],
    default: [],
  },
  importantKeywords: {
    type: [String],
    default: [],
  },
  suggestions: {
    type: [String],
    default: [],
  },
  recruiterFeedback: {
    type: String,
    default: '',
  },
  interviewQuestions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Analysis', analysisSchema)

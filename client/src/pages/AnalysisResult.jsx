import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react'
import { getAnalysisById } from '../services/api'
import {
  FileText,
  Target,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  UserCheck,
  Sparkles,
  ArrowLeft,
  Plus,
  HelpCircle,
  Lightbulb,
  ShieldAlert,
  Loader2,
  Calendar,
} from 'lucide-react'

function AnalysisResult() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) {
        setError('Analysis ID is missing')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')
        const res = await getAnalysisById(id)
        if (res.success && res.analysis) {
          setAnalysis(res.analysis)
        } else {
          setError(res.message || 'Analysis record not found')
        }
      } catch (err) {
        setError(
          err.response?.data?.message || 'Unable to retrieve analysis results.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [id])

  return (
    <div className="min-h-screen bg-[#120D18] text-[#F7F3EA] font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#120D18]/90 backdrop-blur-md border-b border-[#3A2B43]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-[#21182A] border border-[#3A2B43] flex items-center justify-center text-[#C8FF3D]">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold text-[#F7F3EA] tracking-tight">
              Resume<span className="text-[#C8FF3D]">IQ</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8AEBE] hover:text-[#F7F3EA] bg-[#21182A] hover:bg-[#2A1F36] border border-[#3A2B43] px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#B8AEBE]" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/analyze')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#120D18] bg-[#C8FF3D] hover:bg-[#d4ff66] px-4 py-2 rounded-full transition-all cursor-pointer shadow-[0_0_15px_rgba(200,255,61,0.2)]"
            >
              <Plus className="w-4 h-4 text-[#120D18]" />
              <span className="hidden sm:inline">New Analysis</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* LOADING STATE */}
        {loading && (
          <div className="space-y-8 animate-pulse">
            <div className="h-28 bg-[#21182A] rounded-2xl border border-[#3A2B43]" />
            <div className="h-64 bg-[#21182A] rounded-2xl border border-[#3A2B43]" />
            <div className="h-48 bg-[#21182A] rounded-2xl border border-[#3A2B43]" />
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="max-w-lg mx-auto bg-[#21182A] rounded-2xl border border-[#3A2B43] p-8 text-center space-y-5 shadow-2xl my-12">
            <div className="w-12 h-12 rounded-xl bg-[#1B1422] border border-[#3A2B43] text-rose-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#F7F3EA]">Analysis Not Found</h2>
            <p className="text-xs text-[#B8AEBE] leading-relaxed">{error}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8FF3D] text-[#120D18] font-bold text-xs cursor-pointer"
            >
              <span>Back to Dashboard</span>
            </button>
          </div>
        )}

        {/* SUCCESS ANALYSIS REPORT */}
        {!loading && !error && analysis && (
          <>
            {/* Header Banner */}
            <div className="bg-[#1B1422] p-6 sm:p-8 rounded-2xl border border-[#3A2B43] shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#21182A] border border-[#3A2B43] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8FF3D]" />
                    <span className="text-[11px] font-bold text-[#B9A7FF] tracking-wider uppercase">
                      AI ANALYSIS REPORT
                    </span>
                  </div>
                  <h1 className="text-2.5xl sm:text-3.5xl font-extrabold text-[#F7F3EA] tracking-tight">
                    ATS Match & Career Insights
                  </h1>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#B8AEBE]">
                  <Calendar className="w-4 h-4 text-[#B9A7FF]" />
                  <span>Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* ATS Score Radial & Component Breakdown */}
            <div className="bg-[#21182A] rounded-2xl border border-[#3A2B43] shadow-2xl p-6 sm:p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Score Gauge */}
                <div className="lg:col-span-4 bg-[#1B1422] p-6 rounded-xl border border-[#3A2B43] text-center space-y-4 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-[#B9A7FF] uppercase tracking-wider">
                    FINAL ATS SCORE
                  </span>

                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" className="stroke-[#3A2B43]" strokeWidth="8" fill="transparent" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-[#C8FF3D]"
                        strokeWidth="8"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 * (1 - analysis.atsScore / 100)}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold text-[#F7F3EA]">
                        {analysis.atsScore}%
                      </span>
                      <span className="text-[10px] font-bold text-[#C8FF3D] uppercase tracking-wider">
                        {analysis.atsScore >= 80 ? 'High Match' : analysis.atsScore >= 60 ? 'Moderate' : 'Low Match'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Components */}
                <div className="lg:col-span-8 bg-[#1B1422] p-6 rounded-xl border border-[#3A2B43] space-y-4">
                  <h3 className="text-xs font-bold text-[#B8AEBE] uppercase tracking-wider mb-2">
                    Deterministic Weight Breakdown
                  </h3>

                  <div className="space-y-3.5 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#F7F3EA]">Skill Match (40%)</span>
                        <span className="text-[#C8FF3D]">{analysis.skillMatch}%</span>
                      </div>
                      <div className="w-full bg-[#3A2B43] rounded-full h-2">
                        <div className="bg-[#C8FF3D] h-2 rounded-full" style={{ width: `${analysis.skillMatch}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#F7F3EA]">Experience Relevance (20%)</span>
                        <span className="text-[#B9A7FF]">{analysis.experienceRelevance}%</span>
                      </div>
                      <div className="w-full bg-[#3A2B43] rounded-full h-2">
                        <div className="bg-[#B9A7FF] h-2 rounded-full" style={{ width: `${analysis.experienceRelevance}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#F7F3EA]">Keyword Coverage (20%)</span>
                        <span className="text-[#B9A7FF]">{analysis.keywordCoverage}%</span>
                      </div>
                      <div className="w-full bg-[#3A2B43] rounded-full h-2">
                        <div className="bg-[#B9A7FF] h-2 rounded-full" style={{ width: `${analysis.keywordCoverage}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div>
                        <span className="text-[#B8AEBE] block text-[11px]">Education (10%)</span>
                        <span className="text-sm font-bold text-[#F7F3EA]">{analysis.educationRelevance}%</span>
                      </div>
                      <div>
                        <span className="text-[#B8AEBE] block text-[11px]">Completeness (10%)</span>
                        <span className="text-sm font-bold text-[#F7F3EA]">{analysis.completeness}%</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Matched & Missing Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-[#21182A] p-6 rounded-2xl border border-[#3A2B43] space-y-3">
                <span className="text-xs font-bold text-[#F7F3EA] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
                  Matched Skills ({analysis.matchedSkills.length})
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {analysis.matchedSkills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1B1422] border border-[#3A2B43] text-[#F7F3EA] text-xs font-medium rounded-lg">
                      <CheckCircle2 className="w-3 h-3 text-[#C8FF3D]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#21182A] p-6 rounded-2xl border border-[#3A2B43] space-y-3">
                <span className="text-xs font-bold text-[#F7F3EA] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#B9A7FF]" />
                  Missing Skills ({analysis.missingSkills.length})
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {analysis.missingSkills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1B1422] border border-[#3A2B43] text-[#B9A7FF] text-xs font-medium rounded-lg">
                      <AlertCircle className="w-3 h-3 text-[#B9A7FF]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Recruiter Feedback */}
            {analysis.recruiterFeedback && (
              <div className="bg-[#21182A] p-6 sm:p-8 rounded-2xl border border-[#3A2B43] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#B9A7FF]/10 border border-[#B9A7FF]/30 flex items-center justify-center text-[#B9A7FF] shrink-0 mt-0.5">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[#B9A7FF] uppercase tracking-wider block">
                    RECRUITER PERSPECTIVE
                  </span>
                  <p className="text-sm font-medium text-[#F7F3EA] leading-relaxed">
                    "{analysis.recruiterFeedback}"
                  </p>
                </div>
              </div>
            )}

            {/* Suggestions & Interview Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Recommendations */}
              {analysis.suggestions.length > 0 && (
                <div className="bg-[#21182A] p-6 rounded-2xl border border-[#3A2B43] space-y-4">
                  <span className="text-xs font-bold text-[#F7F3EA] flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[#C8FF3D]" />
                    Improvement Suggestions
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#B8AEBE]">
                    {analysis.suggestions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#1B1422] p-3 rounded-xl border border-[#3A2B43]">
                        <span className="text-[#C8FF3D] font-bold">•</span>
                        <span className="text-[#F7F3EA]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interview Questions */}
              {analysis.interviewQuestions.length > 0 && (
                <div className="bg-[#21182A] p-6 rounded-2xl border border-[#3A2B43] space-y-4">
                  <span className="text-xs font-bold text-[#F7F3EA] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#B9A7FF]" />
                    Targeted Interview Questions
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#B8AEBE]">
                    {analysis.interviewQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 bg-[#1B1422] p-3 rounded-xl border border-[#3A2B43]">
                        <span className="text-[#B9A7FF] font-bold">Q{idx + 1}:</span>
                        <span className="text-[#F7F3EA] font-medium">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </>
        )}

      </main>
    </div>
  )
}

export default AnalysisResult

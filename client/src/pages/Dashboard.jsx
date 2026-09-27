import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDashboard } from '../services/api'
import { getToken, removeToken } from '../services/auth'
import {
  FileText,
  Sparkles,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  UserCheck,
  LogOut,
  Menu,
  X,
  Target,
  ArrowRight,
  Plus,
  RefreshCw,
  Clock,
  ShieldAlert,
  FileQuestion,
} from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  // API State
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      setError('AUTH_REQUIRED')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const res = await getDashboard()
      if (res.success && res.dashboard) {
        setDashboardData(res.dashboard)
      } else {
        setError('UNABLE_TO_LOAD')
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('AUTH_REQUIRED')
      } else {
        setError('UNABLE_TO_LOAD')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  const latest = dashboardData?.latestAnalysis
  const stats = dashboardData?.stats
  const recentAnalyses = dashboardData?.recentAnalyses || []

  return (
    <div className="min-h-screen bg-[#120D18] text-[#F7F3EA] font-sans flex flex-col">
      
      {/* ============================================================ */}
      {/* TOP NAVIGATION BAR                                            */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-[#120D18]/90 backdrop-blur-md border-b border-[#3A2B43]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left: Brand Logo & AI Icon */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-xl bg-[#21182A] border border-[#3A2B43] flex items-center justify-center text-[#C8FF3D] shadow-inner">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold text-[#F7F3EA] tracking-tight">
                  Resume<span className="text-[#C8FF3D]">IQ</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#C8FF3D]/10 text-[#C8FF3D] border border-[#C8FF3D]/30 rounded-full tracking-wider uppercase">
                  AI
                </span>
              </div>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                  activeTab === 'dashboard' ? 'text-[#F7F3EA] font-bold' : 'text-[#B8AEBE] hover:text-[#F7F3EA]'
                }`}
              >
                <span>Dashboard</span>
                {activeTab === 'dashboard' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C8FF3D] rounded-full" />
                )}
              </button>

              <button
                onClick={() => navigate('/analyze')}
                className="text-sm font-medium text-[#B8AEBE] hover:text-[#F7F3EA] relative py-1 cursor-pointer"
              >
                <span>Resume Analysis</span>
              </button>
            </nav>

            {/* Right: User Avatar & Logout */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8AEBE] hover:text-[#F7F3EA] bg-[#21182A] hover:bg-[#2A1F36] border border-[#3A2B43] px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5 text-[#B9A7FF]" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#F7F3EA] bg-[#21182A] border border-[#3A2B43] hover:border-[#C8FF3D]/40 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#C8FF3D]" /> : <Menu className="w-6 h-6 text-[#F7F3EA]" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#3A2B43] bg-[#1B1422] px-4 pt-3 pb-6 space-y-4 shadow-2xl">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false) }}
                className="text-left text-base font-medium text-[#C8FF3D] py-1"
              >
                Dashboard
              </button>
              <button
                onClick={() => { navigate('/analyze'); setMobileMenuOpen(false) }}
                className="text-left text-base font-medium text-[#B8AEBE] py-1"
              >
                Resume Analysis
              </button>
            </nav>

            <div className="pt-4 border-t border-[#3A2B43] flex justify-between items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F7F3EA] bg-[#21182A] border border-[#3A2B43] px-3.5 py-2 rounded-xl"
              >
                <LogOut className="w-3.5 h-3.5 text-[#B9A7FF]" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/* MAIN CONTENT AREA                                             */}
      {/* ============================================================ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* LOADING SKELETON STATE */}
        {loading && (
          <div className="space-y-8 animate-pulse">
            <div className="h-32 bg-[#21182A] rounded-2xl border border-[#3A2B43]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 bg-[#21182A] rounded-2xl border border-[#3A2B43]" />
              ))}
            </div>
            <div className="h-80 bg-[#21182A] rounded-2xl border border-[#3A2B43]" />
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="max-w-lg mx-auto bg-[#21182A] rounded-2xl border border-[#3A2B43] p-8 text-center space-y-5 shadow-2xl my-12">
            <div className="w-12 h-12 rounded-xl bg-[#1B1422] border border-[#3A2B43] text-rose-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>

            {error === 'AUTH_REQUIRED' ? (
              <>
                <h2 className="text-xl font-bold text-[#F7F3EA]">Authentication Required</h2>
                <p className="text-xs text-[#B8AEBE] leading-relaxed">
                  Please log in to view your career intelligence dashboard.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8FF3D] hover:bg-[#d4ff66] text-[#120D18] font-bold text-xs transition-all"
                >
                  <span>Go to Login</span>
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#F7F3EA]">Unable to load your dashboard.</h2>
                <p className="text-xs text-[#B8AEBE] leading-relaxed">
                  We encountered an issue retrieving your latest resume analysis data. Please try again.
                </p>
                <button
                  onClick={fetchDashboardData}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#21182A] hover:bg-[#2A1F36] border border-[#3A2B43] text-[#F7F3EA] font-semibold text-xs transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C8FF3D]" />
                  <span>Try Again</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* EMPTY STATE (No analyses yet) */}
        {!loading && !error && !latest && (
          <div className="max-w-2xl mx-auto bg-[#21182A] rounded-2xl border border-[#3A2B43] p-8 sm:p-12 text-center space-y-6 shadow-2xl my-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1B1422] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center mx-auto shadow-inner">
              <FileQuestion className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-[#F7F3EA] tracking-tight">
                No resume analysis yet.
              </h2>
              <p className="text-sm text-[#B8AEBE] leading-relaxed">
                Upload your resume and compare it with a target job to get your first ATS analysis.
              </p>
            </div>

            <button
              onClick={() => navigate('/analyze')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8FF3D] hover:bg-[#d4ff66] text-[#120D18] font-bold text-sm shadow-[0_0_20px_rgba(200,255,61,0.25)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#120D18]" />
              <span>Analyze New Resume</span>
            </button>
          </div>
        )}

        {/* SUCCESS STATE WITH REAL API DATA */}
        {!loading && !error && latest && (
          <>
            {/* WELCOME BANNER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#1B1422] p-6 sm:p-8 rounded-2xl border border-[#3A2B43] shadow-xl relative overflow-hidden">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#21182A] border border-[#3A2B43] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8FF3D]" />
                  <span className="text-[11px] font-bold text-[#B9A7FF] tracking-wider uppercase">
                    CAREER INTELLIGENCE DASHBOARD
                  </span>
                </div>

                <h1 className="text-2.5xl sm:text-3.5xl font-extrabold text-[#F7F3EA] tracking-tight">
                  Welcome to <span className="text-[#C8FF3D]">ResumeIQ</span>
                </h1>

                <p className="text-sm sm:text-base text-[#B8AEBE] leading-relaxed">
                  Turn your resume into a clearer career strategy. Review your recent ATS metrics and gap analysis below.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => navigate('/analyze')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#C8FF3D] hover:bg-[#d4ff66] text-[#120D18] font-bold text-sm shadow-[0_0_20px_rgba(200,255,61,0.2)] hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#120D18]" />
                  <span>Analyze New Resume</span>
                </button>
              </div>
            </div>

            {/* SUMMARY STATS CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Latest ATS Score */}
              <div className="bg-[#21182A] p-5 rounded-2xl border border-[#3A2B43] hover:border-[#B9A7FF]/40 transition-all shadow-lg flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#B8AEBE]">Latest ATS Score</span>
                  <div className="w-8 h-8 rounded-lg bg-[#120D18] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-3.5xl font-extrabold text-[#F7F3EA] tracking-tight">
                    {latest.atsScore}%
                  </div>
                  <p className="text-xs text-[#B8AEBE] mt-1">Last analyzed resume</p>
                </div>
                <div className="pt-2 border-t border-[#3A2B43]/60 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#C8FF3D] bg-[#C8FF3D]/10 px-2.5 py-0.5 rounded-full border border-[#C8FF3D]/30">
                    {latest.atsScore >= 80 ? 'High Match' : latest.atsScore >= 60 ? 'Moderate Match' : 'Needs Optimization'}
                  </span>
                </div>
              </div>

              {/* Card 2: Resume Analyses Count */}
              <div className="bg-[#21182A] p-5 rounded-2xl border border-[#3A2B43] hover:border-[#B9A7FF]/40 transition-all shadow-lg flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#B8AEBE]">Resume Analyses</span>
                  <div className="w-8 h-8 rounded-lg bg-[#120D18] border border-[#3A2B43] text-[#B9A7FF] flex items-center justify-center">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-3.5xl font-extrabold text-[#F7F3EA] tracking-tight">
                    {stats.totalAnalyses}
                  </div>
                  <p className="text-xs text-[#B8AEBE] mt-1">Total analyses</p>
                </div>
                <div className="pt-2 border-t border-[#3A2B43]/60 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#B9A7FF] bg-[#120D18] px-2.5 py-0.5 rounded-full border border-[#3A2B43]">
                    Active Records
                  </span>
                </div>
              </div>

              {/* Card 3: Skills Matched Count */}
              <div className="bg-[#21182A] p-5 rounded-2xl border border-[#3A2B43] hover:border-[#B9A7FF]/40 transition-all shadow-lg flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#B8AEBE]">Skills Matched</span>
                  <div className="w-8 h-8 rounded-lg bg-[#120D18] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-3.5xl font-extrabold text-[#F7F3EA] tracking-tight">
                    {stats.skillsMatched}
                  </div>
                  <p className="text-xs text-[#B8AEBE] mt-1">In latest analysis</p>
                </div>
                <div className="pt-2 border-t border-[#3A2B43]/60 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#C8FF3D] bg-[#C8FF3D]/10 px-2.5 py-0.5 rounded-full border border-[#C8FF3D]/30">
                    Validated
                  </span>
                </div>
              </div>

              {/* Card 4: Improvement Growth */}
              <div className="bg-[#21182A] p-5 rounded-2xl border border-[#3A2B43] hover:border-[#B9A7FF]/40 transition-all shadow-lg flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#B8AEBE]">Improvement</span>
                  <div className="w-8 h-8 rounded-lg bg-[#120D18] border border-[#3A2B43] text-[#B9A7FF] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-3.5xl font-extrabold text-[#F7F3EA] tracking-tight">
                    {stats.improvement > 0 ? `+${stats.improvement}%` : `${stats.improvement}%`}
                  </div>
                  <p className="text-xs text-[#B8AEBE] mt-1">Since first analysis</p>
                </div>
                <div className="pt-2 border-t border-[#3A2B43]/60 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#B9A7FF] bg-[#120D18] px-2.5 py-0.5 rounded-full border border-[#3A2B43]">
                    Growth Trend
                  </span>
                </div>
              </div>

            </div>

            {/* MAIN ANALYSIS DETAILS CARD */}
            <div className="bg-[#21182A] rounded-2xl border border-[#3A2B43] shadow-2xl p-6 sm:p-8 space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#3A2B43]">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#1B1422] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center shadow-inner">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#F7F3EA]">
                      Latest ATS Analysis Report
                    </h2>
                    <p className="text-xs text-[#B8AEBE] mt-0.5">
                      Analyzed on {new Date(latest.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Overall Score & Component Progress Bars */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Radial Gauge */}
                <div className="lg:col-span-4 bg-[#1B1422] p-6 rounded-xl border border-[#3A2B43] text-center space-y-4 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-[#B9A7FF] uppercase tracking-wider">
                    OVERALL ATS MATCH
                  </span>

                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" className="stroke-[#3A2B43]" strokeWidth="8" fill="transparent" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-[#C8FF3D]"
                        strokeWidth="8"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 * (1 - latest.atsScore / 100)}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3.5xl font-extrabold text-[#F7F3EA]">
                        {latest.atsScore}%
                      </span>
                      <span className="text-[10px] font-bold text-[#C8FF3D] uppercase tracking-wider">
                        Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Progress Bars */}
                <div className="lg:col-span-8 bg-[#1B1422] p-6 rounded-xl border border-[#3A2B43] space-y-4">
                  <h3 className="text-xs font-bold text-[#B8AEBE] uppercase tracking-wider mb-2">
                    Deterministic Component Breakdown
                  </h3>

                  <div className="space-y-3.5 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#F7F3EA]">Skill Match (40%)</span>
                        <span className="text-[#C8FF3D]">{latest.skillMatch}%</span>
                      </div>
                      <div className="w-full bg-[#3A2B43] rounded-full h-2">
                        <div className="bg-[#C8FF3D] h-2 rounded-full" style={{ width: `${latest.skillMatch}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#F7F3EA]">Experience Relevance (20%)</span>
                        <span className="text-[#B9A7FF]">{latest.experienceRelevance}%</span>
                      </div>
                      <div className="w-full bg-[#3A2B43] rounded-full h-2">
                        <div className="bg-[#B9A7FF] h-2 rounded-full" style={{ width: `${latest.experienceRelevance}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#F7F3EA]">Keyword Coverage (20%)</span>
                        <span className="text-[#B9A7FF]">{latest.keywordCoverage}%</span>
                      </div>
                      <div className="w-full bg-[#3A2B43] rounded-full h-2">
                        <div className="bg-[#B9A7FF] h-2 rounded-full" style={{ width: `${latest.keywordCoverage}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div>
                        <span className="text-[#B8AEBE] block text-[11px]">Education (10%)</span>
                        <span className="text-sm font-bold text-[#F7F3EA]">{latest.educationRelevance}%</span>
                      </div>
                      <div>
                        <span className="text-[#B8AEBE] block text-[11px]">Completeness (10%)</span>
                        <span className="text-sm font-bold text-[#F7F3EA]">{latest.completeness}%</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Matched & Missing Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1B1422] p-5 rounded-xl border border-[#3A2B43] space-y-3">
                  <span className="text-xs font-bold text-[#F7F3EA] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
                    Matched Skills ({latest.matchedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {latest.matchedSkills.map((skill) => (
                      <span key={skill} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#21182A] border border-[#3A2B43] text-[#F7F3EA] text-xs font-medium rounded-lg">
                        <CheckCircle2 className="w-3 h-3 text-[#C8FF3D]" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1B1422] p-5 rounded-xl border border-[#3A2B43] space-y-3">
                  <span className="text-xs font-bold text-[#F7F3EA] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#B9A7FF]" />
                    Missing Skills ({latest.missingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {latest.missingSkills.map((skill) => (
                      <span key={skill} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#21182A] border border-[#3A2B43] text-[#B9A7FF] text-xs font-medium rounded-lg">
                        <AlertCircle className="w-3 h-3 text-[#B9A7FF]" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recruiter Feedback */}
              {latest.recruiterFeedback && (
                <div className="bg-[#120D18] p-5 rounded-xl border border-[#3A2B43] flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#B9A7FF]/10 border border-[#B9A7FF]/30 flex items-center justify-center text-[#B9A7FF] shrink-0 mt-0.5">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#B9A7FF] uppercase tracking-wider block">
                      RECRUITER PERSPECTIVE
                    </span>
                    <p className="text-sm font-medium text-[#F7F3EA] leading-relaxed">
                      "{latest.recruiterFeedback}"
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* RECENT ANALYSES LIST */}
            {recentAnalyses.length > 0 && (
              <div className="bg-[#21182A] rounded-2xl border border-[#3A2B43] shadow-xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#3A2B43]">
                  <h3 className="text-base font-bold text-[#F7F3EA]">Recent Analyses</h3>
                  <span className="text-xs text-[#B8AEBE]">{recentAnalyses.length} reports</span>
                </div>

                <div className="space-y-3">
                  {recentAnalyses.map((item) => (
                    <div key={item.id} className="bg-[#1B1422] p-4 rounded-xl border border-[#3A2B43] flex items-center justify-between gap-4 hover:border-[#B9A7FF]/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-[#B9A7FF]" />
                        <div>
                          <span className="text-sm font-bold text-[#F7F3EA] block">{item.label}</span>
                          <span className="text-xs text-[#B8AEBE]">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-extrabold text-[#C8FF3D] bg-[#C8FF3D]/10 px-2.5 py-1 rounded-full border border-[#C8FF3D]/30">
                          {item.atsScore}%
                        </span>
                        <button onClick={() => navigate('/analyze')} className="text-xs font-semibold text-[#F7F3EA] hover:text-[#C8FF3D] transition-colors cursor-pointer">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  )
}

export default Dashboard

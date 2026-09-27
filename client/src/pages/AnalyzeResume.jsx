import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadResumeFile, analyzeResume } from '../services/api'
import {
  FileText,
  Upload,
  Sparkles,
  AlertCircle,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  FileCheck,
} from 'lucide-react'

function AnalyzeResume() {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState('') // 'uploading' | 'analyzing'
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF file.')
      setSelectedFile(null)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5 MB limit. Please select a smaller PDF file.')
      setSelectedFile(null)
      return
    }

    setError('')
    setSelectedFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setError('Please select a valid PDF file.')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5 MB limit.')
        return
      }
      setError('')
      setSelectedFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      setError('Please upload a PDF resume file.')
      return
    }

    if (!jobDescription || jobDescription.trim().length < 15) {
      setError('Please enter a detailed job description (minimum 15 characters).')
      return
    }

    try {
      setLoading(true)
      setError('')

      // Step 1: Upload PDF file to /api/resumes/upload
      setLoadingStage('Uploading resume PDF...')
      const formData = new FormData()
      formData.append('resume', selectedFile)

      const uploadRes = await uploadResumeFile(formData)
      const resumeId = uploadRes?.resume?.id

      if (!resumeId) {
        throw new Error('Failed to extract text from resume. Please try uploading again.')
      }

      // Step 2: Send Analysis request to /api/analysis
      setLoadingStage('Analyzing resume against job description with AI...')
      const analysisRes = await analyzeResume({
        resumeId,
        jobDescription: jobDescription.trim(),
      })

      const analysisId = analysisRes?.analysis?.id
      if (analysisId) {
        navigate(`/analysis/${analysisId}`)
      } else {
        throw new Error('Analysis completed but record ID was missing. Please check your dashboard.')
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'An error occurred during resume analysis.'
      )
    } finally {
      setLoading(false)
      setLoadingStage('')
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB'
    const kb = bytes / 1024
    if (kb < 1024) return `${Math.round(kb)} KB`
    return `${(kb / 1024).toFixed(2)} MB`
  }

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

          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8AEBE] hover:text-[#F7F3EA] bg-[#21182A] hover:bg-[#2A1F36] border border-[#3A2B43] px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#B8AEBE]" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#21182A] border border-[#3A2B43] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C8FF3D]" />
            <span className="text-[11px] font-bold text-[#B9A7FF] tracking-wider uppercase">
              NEW ANALYSIS
            </span>
          </div>
          <h1 className="text-2.5xl sm:text-3.5xl font-extrabold text-[#F7F3EA] tracking-tight">
            Analyze Your Resume
          </h1>
          <p className="text-sm text-[#B8AEBE]">
            Upload your resume PDF and paste the target job description for instant AI ATS evaluation.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-start gap-3 text-rose-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-[#21182A] border border-[#3A2B43] rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* STEP 1: UPLOAD RESUME */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#F7F3EA] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#C8FF3D] text-[#120D18] font-extrabold text-xs flex items-center justify-center">1</span>
                <span>Upload Resume (PDF)</span>
              </label>
              <span className="text-xs text-[#B8AEBE]">PDF format · Max 5 MB</span>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                selectedFile
                  ? 'border-[#C8FF3D]/60 bg-[#C8FF3D]/5'
                  : 'border-[#3A2B43] hover:border-[#B9A7FF]/50 bg-[#1B1422]'
              }`}
            >
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#21182A] border border-[#C8FF3D]/40 text-[#C8FF3D] flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#F7F3EA] block truncate max-w-xs sm:max-w-md">
                        {selectedFile.name}
                      </span>
                      <span className="text-xs text-[#B8AEBE]">
                        {formatFileSize(selectedFile.size)} · PDF
                      </span>
                    </div>
                  </div>

                  <label
                    htmlFor="resume-upload"
                    className="px-4 py-2 rounded-xl bg-[#21182A] border border-[#3A2B43] text-xs font-semibold text-[#B9A7FF] hover:text-[#F7F3EA] cursor-pointer transition-colors"
                  >
                    Change File
                  </label>
                </div>
              ) : (
                <label htmlFor="resume-upload" className="cursor-pointer space-y-3 block">
                  <div className="w-12 h-12 rounded-xl bg-[#21182A] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center mx-auto shadow-inner">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#F7F3EA] block">
                      Click to upload or drag & drop PDF resume
                    </span>
                    <span className="text-xs text-[#B8AEBE] mt-1 block">
                      Only PDF documents up to 5 MB are supported
                    </span>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* STEP 2: JOB DESCRIPTION */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-[#F7F3EA] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#B9A7FF] text-[#120D18] font-extrabold text-xs flex items-center justify-center">2</span>
              <span>Target Job Description</span>
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => { setJobDescription(e.target.value); if (error) setError('') }}
              placeholder="Paste the target job description here (responsibilities, required skills, qualifications)..."
              rows={8}
              required
              className="w-full bg-[#1B1422] border border-[#3A2B43] focus:border-[#C8FF3D] rounded-2xl p-4 text-xs sm:text-sm text-[#F7F3EA] placeholder-[#B8AEBE]/40 outline-none leading-relaxed transition-all resize-y"
            />
          </div>

          {/* STEP 3: SUBMIT ACTION */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !selectedFile || !jobDescription.trim()}
              className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#C8FF3D] hover:bg-[#d4ff66] active:bg-[#b8f526] text-[#120D18] font-bold text-base shadow-[0_0_20px_rgba(200,255,61,0.25)] hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#120D18]" />
                  <span>{loadingStage || 'Analyzing your resume...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#120D18]" />
                  <span>Analyze Resume</span>
                </>
              )}
            </button>
          </div>

        </form>

      </main>
    </div>
  )
}

export default AnalyzeResume

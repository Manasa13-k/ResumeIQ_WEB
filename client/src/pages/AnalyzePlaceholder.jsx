import { useNavigate } from 'react'
import { Sparkles, ArrowLeft, FileText, Upload } from 'lucide-react'

function AnalyzePlaceholder() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#120D18] text-[#F7F3EA] font-sans flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-[#21182A] border border-[#3A2B43] rounded-2xl p-8 shadow-2xl text-center space-y-6">
        
        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#1B1422] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center mx-auto shadow-inner">
          <Sparkles className="w-7 h-7" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#F7F3EA] tracking-tight">
            Resume Analysis
          </h1>
          <p className="text-sm text-[#B8AEBE] leading-relaxed">
            Upload your resume and add a job description to begin.
          </p>
        </div>

        {/* Feature Mockup Box */}
        <div className="bg-[#1B1422] p-5 rounded-xl border border-[#3A2B43] space-y-3 text-left">
          <div className="flex items-center gap-3">
            <Upload className="w-4 h-4 text-[#C8FF3D]" />
            <span className="text-xs font-semibold text-[#F7F3EA]">Upload PDF Resume</span>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-[#B9A7FF]" />
            <span className="text-xs font-semibold text-[#F7F3EA]">Paste Job Description</span>
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#21182A] hover:bg-[#2A1F36] border border-[#3A2B43] hover:border-[#B9A7FF]/50 text-[#F7F3EA] font-semibold text-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#B8AEBE]" />
          <span>Back to Dashboard</span>
        </button>

      </div>
    </div>
  )
}

export default AnalyzePlaceholder

import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  UserCheck,
  FileCheck,
  ShieldCheck,
  Zap,
} from 'lucide-react'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#120D18] py-12 md:py-20 lg:py-24 text-[#F7F3EA]">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#B9A7FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[350px] h-[350px] bg-[#C8FF3D]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & CTAs */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#21182A] border border-[#3A2B43] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#C8FF3D] animate-pulse" />
              <span className="text-[#B9A7FF] uppercase tracking-wider text-[11px] font-bold">
                AI-Powered Career Intelligence
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3.5xl sm:text-4.5xl lg:text-5.5xl font-extrabold text-[#F7F3EA] tracking-tight leading-[1.12]">
              AI Resume Analyzer for{' '}
              <span className="text-[#C8FF3D] block sm:inline">
                Smarter Career Preparation
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#B8AEBE] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Analyze your resume, improve your ATS score, understand how recruiters see your profile, discover company readiness, and prepare for interviews with AI-powered insights.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C8FF3D] hover:bg-[#d4ff66] text-[#120D18] font-bold text-base shadow-[0_0_20px_rgba(200,255,61,0.25)] hover:shadow-[0_0_28px_rgba(200,255,61,0.4)] hover:scale-[1.02] transition-all cursor-pointer">
                <Sparkles className="w-5 h-5 text-[#120D18]" />
                <span>Analyse Resume</span>
              </button>

              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#21182A] hover:bg-[#2A1F36] text-[#F7F3EA] font-semibold text-base border border-[#3A2B43] hover:border-[#B9A7FF]/50 transition-all cursor-pointer">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-[#B8AEBE]" />
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#B8AEBE] font-medium border-t border-[#3A2B43]/50">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C8FF3D]" />
                <span>Instant ATS Check</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#B9A7FF]" />
                <span>Skill Gap Analysis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C8FF3D]" />
                <span>Recruiter View</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dashboard Mockup */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative bg-[#21182A] rounded-2xl shadow-2xl shadow-black/50 border border-[#3A2B43] p-5 sm:p-6 space-y-5">
              
              {/* Mockup Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#3A2B43]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1B1422] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center font-bold">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F7F3EA]">
                      Senior Software Engineer Resume
                    </h3>
                    <p className="text-xs text-[#B8AEBE]">Analysis Summary Report</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8FF3D]/10 text-[#C8FF3D] text-xs font-semibold border border-[#C8FF3D]/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Analysis Complete
                </span>
              </div>

              {/* Grid: ATS Score & Optimization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* ATS Match Score Card */}
                <div className="bg-[#1B1422] rounded-xl p-4 border border-[#3A2B43] flex flex-col justify-between space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-[#B8AEBE]">
                      ATS Match Score
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#C8FF3D] text-[#120D18] rounded-full">
                      High Match
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3.5xl font-extrabold text-[#F7F3EA]">
                      86%
                    </span>
                    <span className="text-xs text-[#C8FF3D] font-bold flex items-center">
                      <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +12%
                    </span>
                  </div>
                  <div className="w-full bg-[#3A2B43] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#C8FF3D] h-2 rounded-full shadow-[0_0_8px_rgba(200,255,61,0.5)]"
                      style={{ width: '86%' }}
                    />
                  </div>
                </div>

                {/* Resume Improvement Score Card */}
                <div className="bg-[#1B1422] rounded-xl p-4 border border-[#3A2B43] flex flex-col justify-between space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-[#B8AEBE]">
                      Optimization Potential
                    </span>
                    <TrendingUp className="w-4 h-4 text-[#B9A7FF]" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#B8AEBE]/40 line-through">
                      86%
                    </span>
                    <span className="text-3.5xl font-extrabold text-[#B9A7FF]">
                      94%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#B9A7FF]/80 font-medium leading-tight">
                    Target reachable with 2 keyword additions
                  </p>
                </div>

              </div>

              {/* Skills Analysis Card */}
              <div className="bg-[#1B1422] rounded-xl p-4 border border-[#3A2B43] space-y-3.5">
                
                {/* Matched Skills */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#F7F3EA] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C8FF3D]" />
                      Matched Skills (4)
                    </span>
                    <span className="text-[10px] font-medium text-[#C8FF3D] bg-[#C8FF3D]/10 px-2 py-0.5 rounded-full border border-[#C8FF3D]/20">
                      Good Alignment
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'Java', 'MongoDB', 'Node.js'].map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#21182A] border border-[#3A2B43] text-[#F7F3EA] text-xs font-medium rounded-lg"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#C8FF3D]" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="pt-3 border-t border-[#3A2B43]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#F7F3EA] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-[#B9A7FF]" />
                      Missing Skills (2)
                    </span>
                    <span className="text-[10px] font-medium text-[#B9A7FF] bg-[#B9A7FF]/10 px-2 py-0.5 rounded-full border border-[#B9A7FF]/20">
                      Recommended
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['AWS', 'Docker'].map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#21182A] border border-[#3A2B43] text-[#B9A7FF] text-xs font-medium rounded-lg"
                      >
                        <AlertCircle className="w-3 h-3 text-[#B9A7FF]" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Recruiter View Card */}
              <div className="bg-[#120D18] text-[#F7F3EA] rounded-xl p-4 border border-[#3A2B43] flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#B9A7FF]/10 border border-[#B9A7FF]/30 flex items-center justify-center text-[#B9A7FF]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#B9A7FF] uppercase tracking-wider block">
                      Recruiter Perspective
                    </span>
                    <span className="text-sm font-bold text-[#F7F3EA]">
                      Strong Project Experience
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block px-2.5 py-1 rounded-full bg-[#C8FF3D]/10 text-[#C8FF3D] text-xs font-semibold border border-[#C8FF3D]/30">
                  Verified
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero

import {
  FileText,
  Briefcase,
  Sparkles,
  ScanSearch,
  Wand2,
  MessageSquareText,
  TrendingUp,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'

function WhyResumeIQ() {
  const outcomes = [
    {
      id: 'understand',
      title: 'Understand',
      description: 'See how your profile matches the role you are targeting.',
      icon: ScanSearch,
      color: '#C8FF3D',
    },
    {
      id: 'improve',
      title: 'Improve',
      description: 'Find skill gaps, missing keywords, and areas to strengthen.',
      icon: Wand2,
      color: '#B9A7FF',
    },
    {
      id: 'prepare',
      title: 'Prepare',
      description: 'Turn your resume and target role into interview preparation.',
      icon: MessageSquareText,
      color: '#B9A7FF',
    },
    {
      id: 'track',
      title: 'Track',
      description: 'Monitor your analysis history and resume improvement over time.',
      icon: TrendingUp,
      color: '#C8FF3D',
    },
  ]

  return (
    <section
      id="why-resumeiq"
      className="relative bg-[#120D18] py-20 lg:py-28 text-[#F7F3EA] border-t border-[#3A2B43]/60 overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#B9A7FF]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#C8FF3D]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#21182A] border border-[#3A2B43]">
            <span className="w-2 h-2 rounded-full bg-[#C8FF3D]" />
            <span className="text-[11px] font-bold text-[#B9A7FF] tracking-wider uppercase">
              WHY RESUMEIQ
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA] tracking-tight leading-[1.15]">
            Your Resume Is More Than a <span className="text-[#C8FF3D]">Document</span>
          </h2>

          <p className="text-base sm:text-lg text-[#B8AEBE] max-w-2xl mx-auto leading-relaxed">
            ResumeIQ helps you understand where your profile fits, identify what needs improvement, prepare for interviews, and track your progress.
          </p>
        </div>

        {/* Main Two-Part Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Editorial Statement */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#B9A7FF] uppercase tracking-widest block">
                CAREER INTELLIGENCE SYSTEM
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#F7F3EA] leading-tight">
                Your resume tells your story.
              </h3>
              <p className="text-xl sm:text-2xl font-semibold text-[#C8FF3D] leading-snug">
                ResumeIQ helps you understand where that story fits.
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#B8AEBE] leading-relaxed">
              Traditional resume checkers only scan for basic keywords. ResumeIQ connects your entire career preparation cycle—evaluating job compatibility, suggesting targeted improvements, generating interview questions, and tracking your profile growth over time.
            </p>

            {/* Value Pillar Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#21182A] p-3.5 rounded-xl border border-[#3A2B43] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C8FF3D] shrink-0" />
                <span className="text-xs font-semibold text-[#F7F3EA]">Targeted Analysis</span>
              </div>
              <div className="bg-[#21182A] p-3.5 rounded-xl border border-[#3A2B43] flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B9A7FF] shrink-0" />
                <span className="text-xs font-semibold text-[#F7F3EA]">Recruiter Alignment</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Career Intelligence Visual Flow */}
          <div className="lg:col-span-7 bg-[#1B1422] rounded-2xl p-6 sm:p-8 border border-[#3A2B43] shadow-2xl relative">
            
            {/* Visual Flow Container */}
            <div className="space-y-8">
              
              {/* 1. INPUTS ROW */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#B8AEBE] uppercase tracking-wider block text-center md:text-left">
                  01. INPUT DATA
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Input 1: Resume */}
                  <div className="bg-[#21182A] p-4 rounded-xl border border-[#3A2B43] hover:border-[#B9A7FF]/40 transition-all group flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#120D18] border border-[#3A2B43] text-[#B9A7FF] flex items-center justify-center shrink-0 group-hover:border-[#B9A7FF]/60 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#F7F3EA]">Your Resume</h4>
                      <p className="text-[11px] text-[#B8AEBE] mt-0.5">
                        Skills · Experience · Education
                      </p>
                    </div>
                  </div>

                  {/* Input 2: Target Job */}
                  <div className="bg-[#21182A] p-4 rounded-xl border border-[#3A2B43] hover:border-[#C8FF3D]/40 transition-all group flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#120D18] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center shrink-0 group-hover:border-[#C8FF3D]/60 transition-colors">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#F7F3EA]">Target Job</h4>
                      <p className="text-[11px] text-[#B8AEBE] mt-0.5">
                        Skills · Requirements · Keywords
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* CONNECTING ARROWS TO CENTRAL NODE */}
              <div className="flex justify-center text-[#3A2B43]">
                <ArrowDown className="w-5 h-5 text-[#B9A7FF]/60 animate-bounce" />
              </div>

              {/* 2. CENTRAL RESUMEIQ NODE */}
              <div className="relative bg-[#21182A] rounded-xl p-5 border border-[#3A2B43] hover:border-[#C8FF3D]/50 transition-all shadow-[0_0_20px_rgba(200,255,61,0.08)] group text-center space-y-1.5 max-w-md mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#120D18] border border-[#3A2B43]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8FF3D]" />
                  <span className="text-xs font-extrabold text-[#F7F3EA] tracking-wide">
                    Resume<span className="text-[#C8FF3D]">IQ</span> Engine
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#F7F3EA]">
                  Career Intelligence Processing
                </h4>
                <p className="text-xs text-[#B8AEBE]">
                  Synthesis of candidate background against role demands
                </p>
              </div>

              {/* CONNECTING ARROWS TO OUTCOMES */}
              <div className="flex justify-center text-[#3A2B43]">
                <ArrowDown className="w-5 h-5 text-[#C8FF3D]/80" />
              </div>

              {/* 3. FOUR OUTCOMES GRID */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#B8AEBE] uppercase tracking-wider block text-center md:text-left">
                  02. ACTIONABLE OUTCOMES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {outcomes.map((outcome) => {
                    const Icon = outcome.icon
                    const isLime = outcome.color === '#C8FF3D'
                    return (
                      <div
                        key={outcome.id}
                        className="bg-[#21182A] p-4 rounded-xl border border-[#3A2B43] hover:border-[#B9A7FF]/50 transition-all duration-300 hover:-translate-y-0.5 group space-y-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#120D18] border border-[#3A2B43] flex items-center justify-center shrink-0 group-hover:border-[#C8FF3D]/40 transition-colors">
                            <Icon
                              className={`w-4 h-4 ${
                                isLime ? 'text-[#C8FF3D]' : 'text-[#B9A7FF]'
                              }`}
                            />
                          </div>
                          <h4 className="text-sm font-bold text-[#F7F3EA] group-hover:text-[#C8FF3D] transition-colors">
                            {outcome.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#B8AEBE] leading-relaxed">
                          {outcome.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default WhyResumeIQ

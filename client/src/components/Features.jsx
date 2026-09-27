import {
  Target,
  Sparkles,
  Eye,
  Building2,
  MessageSquareText,
  History,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'

function Features() {
  const standardFeatures = [
    {
      id: 'ai-suggestions',
      icon: Sparkles,
      title: 'AI Resume Suggestions',
      description:
        'Get focused recommendations to improve weak sections, missing keywords, and overall resume quality.',
      accent: 'lime',
    },
    {
      id: 'recruiter-view',
      icon: Eye,
      title: 'Recruiter View',
      description:
        'See your resume from a recruiter-oriented perspective and understand which parts of your profile stand out.',
      accent: 'lilac',
    },
    {
      id: 'company-readiness',
      icon: Building2,
      title: 'Company Readiness',
      description:
        'Understand your preparation level for a target role by comparing your current skills with the expected requirements.',
      accent: 'lilac',
    },
    {
      id: 'interview-questions',
      icon: MessageSquareText,
      title: 'AI Interview Questions',
      description:
        'Generate role-specific interview questions based on your resume and the job you are targeting.',
      accent: 'lime',
    },
  ]

  return (
    <section id="features" className="relative bg-[#120D18] py-20 lg:py-28 text-[#F7F3EA] border-t border-[#3A2B43]/60">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#B9A7FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#C8FF3D]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#21182A] border border-[#3A2B43]">
            <span className="w-2 h-2 rounded-full bg-[#C8FF3D]" />
            <span className="text-[11px] font-bold text-[#B9A7FF] tracking-wider uppercase">
              RESUME INTELLIGENCE
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA] tracking-tight leading-[1.15]">
            Everything You Need to Build a{' '}
            <span className="text-[#C8FF3D]">Stronger Resume</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#B8AEBE] max-w-2xl mx-auto leading-relaxed">
            ResumeIQ combines resume analysis, job matching, recruiter-oriented insights, and interview preparation in one place.
          </p>

        </div>

        {/* Asymmetric Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Featured Large Card: ATS Match Score (Spans 2 cols on lg screens) */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#21182A] rounded-2xl p-6 sm:p-8 border border-[#3A2B43] hover:border-[#B9A7FF]/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Side: Title & Description */}
              <div className="lg:col-span-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#1B1422] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center group-hover:border-[#C8FF3D]/50 transition-colors">
                  <Target className="w-6 h-6 text-[#C8FF3D]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#F7F3EA] mb-2 flex items-center gap-2">
                    ATS Match Score
                  </h3>
                  <p className="text-sm text-[#B8AEBE] leading-relaxed">
                    See how closely your resume matches a specific job description and identify the skills and keywords that matter most.
                  </p>
                </div>
              </div>

              {/* Right Side: Mini ATS Dashboard Mockup */}
              <div className="lg:col-span-6 bg-[#1B1422] rounded-xl p-5 border border-[#3A2B43] space-y-4 shadow-inner">
                <div className="flex justify-between items-center pb-3 border-b border-[#3A2B43]">
                  <span className="text-xs font-semibold text-[#B8AEBE] uppercase tracking-wider">
                    ATS Match Analysis
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-[#C8FF3D] text-[#120D18] rounded-full">
                    High Alignment
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-3.5xl font-extrabold text-[#C8FF3D]">
                      86%
                    </div>
                    <span className="text-xs text-[#B8AEBE] font-medium">
                      Overall Compatibility
                    </span>
                  </div>
                  <div className="text-xs text-[#C8FF3D] font-bold flex items-center bg-[#C8FF3D]/10 px-2.5 py-1 rounded-full border border-[#C8FF3D]/30">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" /> Optimal
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#3A2B43] rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#C8FF3D] h-2.5 rounded-full shadow-[0_0_10px_rgba(200,255,61,0.5)]"
                    style={{ width: '86%' }}
                  />
                </div>

                {/* Skill Tags */}
                <div className="pt-2">
                  <span className="text-[11px] font-medium text-[#B8AEBE] block mb-2">
                    Top Matched Keywords:
                  </span>
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
              </div>

            </div>
          </div>

          {/* 2. Feature 2: AI Resume Suggestions */}
          <div className="bg-[#21182A] rounded-2xl p-6 sm:p-7 border border-[#3A2B43] hover:border-[#B9A7FF]/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B1422] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center group-hover:border-[#C8FF3D]/50 transition-colors">
                <Sparkles className="w-6 h-6 text-[#C8FF3D]" />
              </div>
              <h3 className="text-xl font-bold text-[#F7F3EA]">
                AI Resume Suggestions
              </h3>
              <p className="text-sm text-[#B8AEBE] leading-relaxed">
                Get focused recommendations to improve weak sections, missing keywords, and overall resume quality.
              </p>
            </div>
            <div className="pt-6 flex items-center text-xs font-semibold text-[#B9A7FF] group-hover:text-[#C8FF3D] transition-colors">
              <span>Smart optimization</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Standard Features Loop (Features 3, 4, 5) */}
          {standardFeatures.slice(1).map((feature) => {
            const Icon = feature.icon
            const isLime = feature.accent === 'lime'
            return (
              <div
                key={feature.id}
                className="bg-[#21182A] rounded-2xl p-6 sm:p-7 border border-[#3A2B43] hover:border-[#B9A7FF]/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1B1422] border border-[#3A2B43] flex items-center justify-center group-hover:border-[#B9A7FF]/50 transition-colors">
                    <Icon className={`w-6 h-6 ${isLime ? 'text-[#C8FF3D]' : 'text-[#B9A7FF]'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#F7F3EA]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#B8AEBE] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-6 flex items-center text-xs font-semibold text-[#B8AEBE] group-hover:text-[#F7F3EA] transition-colors">
                  <span>Detailed analysis</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 text-[#B9A7FF]" />
                </div>
              </div>
            )
          })}

          {/* 6. Feature 6: Analysis History (Spans full width or 2 cols for visual balance) */}
          <div className="md:col-span-2 lg:col-span-3 bg-[#21182A] rounded-2xl p-6 sm:p-7 border border-[#3A2B43] hover:border-[#B9A7FF]/40 transition-all duration-300 hover:-translate-y-1 shadow-xl group">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="w-12 h-12 rounded-xl bg-[#1B1422] border border-[#3A2B43] text-[#B9A7FF] flex items-center justify-center group-hover:border-[#B9A7FF]/50 transition-colors shrink-0">
                  <History className="w-6 h-6 text-[#B9A7FF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#F7F3EA] mb-1">
                    Analysis History
                  </h3>
                  <p className="text-sm text-[#B8AEBE] leading-relaxed">
                    Track previous resume analyses and see how your profile improves over time across different iterations and target positions.
                  </p>
                </div>
              </div>

              {/* Small Mockup Badge */}
              <div className="w-full md:w-auto bg-[#1B1422] px-4 py-3 rounded-xl border border-[#3A2B43] flex items-center justify-between md:justify-start gap-4 shrink-0">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-[#B8AEBE] uppercase block">Score Trend</span>
                  <span className="text-sm font-extrabold text-[#F7F3EA]">v1: 72% → v3: 94%</span>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold bg-[#C8FF3D]/10 text-[#C8FF3D] rounded-full border border-[#C8FF3D]/30">
                  +22% Growth
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Features

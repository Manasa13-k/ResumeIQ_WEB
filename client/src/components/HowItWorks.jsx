import { useState } from 'react'
import {
  Upload,
  FileText,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Check,
  FileCheck,
} from 'lucide-react'

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null)

  const steps = [
    {
      number: '01',
      title: 'Upload Your Resume',
      description:
        'Upload your resume as a PDF and let ResumeIQ extract the information needed for analysis.',
      icon: Upload,
    },
    {
      number: '02',
      title: 'Add a Job Description',
      description:
        'Paste the job description for the role you are targeting so ResumeIQ can understand what the company is looking for.',
      icon: FileText,
    },
    {
      number: '03',
      title: 'AI Analyzes Your Profile',
      description:
        'ResumeIQ compares your resume with the job requirements and identifies matches, gaps, and improvement opportunities.',
      icon: BrainCircuit,
    },
    {
      number: '04',
      title: 'Get Actionable Insights',
      description:
        'View your ATS match, resume suggestions, recruiter-oriented insights, readiness information, and interview questions.',
      icon: BarChart3,
    },
  ]

  return (
    <section
      id="how-it-works"
      className="relative bg-[#120D18] py-20 lg:py-28 text-[#F7F3EA] border-t border-[#3A2B43]/60 overflow-hidden"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#C8FF3D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#B9A7FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#21182A] border border-[#3A2B43]">
            <span className="w-2 h-2 rounded-full bg-[#C8FF3D]" />
            <span className="text-[11px] font-bold text-[#B9A7FF] tracking-wider uppercase">
              HOW RESUMEIQ WORKS
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA] tracking-tight leading-[1.15]">
            From Resume to Career Insights in{' '}
            <span className="text-[#C8FF3D]">Minutes</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#B8AEBE] max-w-2xl mx-auto leading-relaxed">
            Turn your resume and a target job description into actionable insights,
            improvement suggestions, and interview preparation.
          </p>
        </div>

        {/* ============================================================ */}
        {/* TIMELINE SECTION                                              */}
        {/* ============================================================ */}

        {/* Desktop Connected Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting Horizontal Line */}
          <div className="absolute top-7 left-[10%] right-[10%] h-0.5 bg-[#3A2B43] z-0" />
          <div className="absolute top-7 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#C8FF3D]/80 via-[#B9A7FF]/80 to-[#C8FF3D]/80 z-0 opacity-40" />

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isHovered = activeStep === idx

              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  className="group flex flex-col items-center text-center space-y-4 cursor-pointer"
                >
                  {/* Step Node Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-[#21182A] border flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isHovered
                        ? 'border-[#C8FF3D] scale-110 shadow-[0_0_20px_rgba(200,255,61,0.3)] bg-[#2A1F36]'
                        : 'border-[#3A2B43] group-hover:border-[#B9A7FF]/60'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isHovered ? 'text-[#C8FF3D]' : 'text-[#B9A7FF]'
                      }`}
                    />
                  </div>

                  {/* Step Number Badge */}
                  <span
                    className={`text-xs font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border transition-colors duration-300 ${
                      isHovered
                        ? 'bg-[#C8FF3D]/10 text-[#C8FF3D] border-[#C8FF3D]/30'
                        : 'bg-[#1B1422] text-[#B9A7FF] border-[#3A2B43]'
                    }`}
                  >
                    Step {step.number}
                  </span>

                  {/* Card Content */}
                  <div className="bg-[#21182A]/80 p-5 rounded-2xl border border-[#3A2B43] group-hover:border-[#B9A7FF]/40 transition-all duration-300 group-hover:-translate-y-1 w-full space-y-2">
                    <h3 className="text-lg font-bold text-[#F7F3EA] group-hover:text-[#C8FF3D] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#B8AEBE] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Connected Timeline */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-8 border-l-2 border-[#3A2B43] ml-2 sm:ml-4">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative group pl-6 sm:pl-8">
                {/* Timeline Node Circle */}
                <div className="absolute -left-[31px] sm:-left-[35px] top-0 w-10 h-10 rounded-xl bg-[#21182A] border border-[#3A2B43] flex items-center justify-center text-[#B9A7FF] group-hover:border-[#C8FF3D] group-hover:text-[#C8FF3D] transition-colors shadow-lg">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content Box */}
                <div className="bg-[#21182A] p-5 sm:p-6 rounded-2xl border border-[#3A2B43] space-y-2 group-hover:border-[#B9A7FF]/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C8FF3D] bg-[#C8FF3D]/10 px-2 py-0.5 rounded-full border border-[#C8FF3D]/30">
                      STEP {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F7F3EA]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#B8AEBE] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ============================================================ */}
        {/* CENTRAL PRODUCT FLOW VISUAL / ARCHITECTURE PREVIEW           */}
        {/* ============================================================ */}

        <div className="pt-6">
          <div className="bg-[#1B1422] rounded-2xl p-6 sm:p-8 border border-[#3A2B43] shadow-2xl relative max-w-4xl mx-auto">
            {/* Header / Title */}
            <div className="flex items-center justify-between pb-6 border-b border-[#3A2B43] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#21182A] border border-[#3A2B43] text-[#C8FF3D] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F7F3EA]">
                    Structured Analysis Pipeline
                  </h4>
                  <p className="text-xs text-[#B8AEBE]">
                    High-level workflow demonstration
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#B9A7FF] bg-[#21182A] px-3 py-1 rounded-full border border-[#3A2B43] uppercase tracking-wider hidden sm:inline-block">
                Automated Processing
              </span>
            </div>

            {/* Workflow Pipeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              
              {/* Panel 1: Resume */}
              <div className="bg-[#21182A] p-4 rounded-xl border border-[#3A2B43] space-y-2 text-center md:text-left relative group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#B8AEBE] uppercase">
                    INPUT 01
                  </span>
                  <Check className="w-4 h-4 text-[#C8FF3D]" />
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#B9A7FF]" />
                  <span className="text-sm font-bold text-[#F7F3EA] truncate">
                    Resume.pdf
                  </span>
                </div>
                <span className="text-[11px] text-[#B8AEBE] block">
                  Parsed & Structured
                </span>
              </div>

              {/* Arrow Connector 1 */}
              <div className="hidden md:flex justify-center text-[#3A2B43] group-hover:text-[#B9A7FF]">
                <ArrowRight className="w-5 h-5 text-[#B9A7FF]/60" />
              </div>
              <div className="md:hidden flex justify-center text-[#3A2B43]">
                <ArrowDown className="w-5 h-5 text-[#B9A7FF]/60" />
              </div>

              {/* Panel 2: Job Description */}
              <div className="bg-[#21182A] p-4 rounded-xl border border-[#3A2B43] space-y-2 text-center md:text-left relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#B8AEBE] uppercase">
                    INPUT 02
                  </span>
                  <Check className="w-4 h-4 text-[#C8FF3D]" />
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#B9A7FF]" />
                  <span className="text-sm font-bold text-[#F7F3EA] truncate">
                    Job Description
                  </span>
                </div>
                <span className="text-[11px] text-[#B8AEBE] block">
                  Role Requirements
                </span>
              </div>

              {/* Arrow Connector 2 */}
              <div className="hidden md:flex justify-center text-[#3A2B43]">
                <ArrowRight className="w-5 h-5 text-[#C8FF3D]" />
              </div>
              <div className="md:hidden flex justify-center text-[#3A2B43]">
                <ArrowDown className="w-5 h-5 text-[#C8FF3D]" />
              </div>

              {/* Panel 3: AI Analysis */}
              <div className="bg-[#21182A] p-4 rounded-xl border border-[#C8FF3D]/40 space-y-2 text-center md:text-left shadow-[0_0_15px_rgba(200,255,61,0.1)]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#C8FF3D] uppercase">
                    AI ENGINE
                  </span>
                  <Sparkles className="w-4 h-4 text-[#C8FF3D]" />
                </div>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-[#C8FF3D]" />
                  <span className="text-sm font-bold text-[#F7F3EA]">
                    AI Analysis
                  </span>
                </div>
                <span className="text-[11px] text-[#C8FF3D] block font-medium">
                  Matching & Scoring
                </span>
              </div>

              {/* Arrow Connector 3 */}
              <div className="hidden md:flex justify-center text-[#3A2B43]">
                <ArrowRight className="w-5 h-5 text-[#C8FF3D]" />
              </div>
              <div className="md:hidden flex justify-center text-[#3A2B43]">
                <ArrowDown className="w-5 h-5 text-[#C8FF3D]" />
              </div>

              {/* Panel 4: ResumeIQ Insights */}
              <div className="bg-[#21182A] p-4 rounded-xl border border-[#3A2B43] space-y-2 text-center md:text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#B9A7FF] uppercase">
                    RESULTS
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#C8FF3D]">
                    ATS 86%
                  </span>
                  <span className="text-xs font-bold text-[#B9A7FF] bg-[#B9A7FF]/10 px-2 py-0.5 rounded-full border border-[#B9A7FF]/30">
                    +8% Growth
                  </span>
                </div>
                <span className="text-[11px] text-[#B8AEBE] block">
                  Actionable Insights Ready
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HowItWorks

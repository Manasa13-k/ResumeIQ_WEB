import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import WhyResumeIQ from '../components/WhyResumeIQ'
import ApiStatus from '../components/ApiStatus'

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#120D18] text-[#F7F3EA] flex flex-col font-sans relative">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <WhyResumeIQ />
      </main>
      <ApiStatus />
    </div>
  )
}

export default LandingPage

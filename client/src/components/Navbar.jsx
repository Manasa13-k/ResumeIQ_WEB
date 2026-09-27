import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Menu, X, Sparkles } from 'lucide-react'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#120D18]/90 backdrop-blur-md border-b border-[#3A2B43]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-[#21182A] border border-[#3A2B43] group-hover:border-[#C8FF3D]/50 flex items-center justify-center text-[#C8FF3D] transition-colors shadow-inner">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-[#B8AEBE] hover:text-[#F7F3EA] relative py-1 transition-colors group"
            >
              <span>Features</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8FF3D] group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#B8AEBE] hover:text-[#F7F3EA] relative py-1 transition-colors group"
            >
              <span>How It Works</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8FF3D] group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-[#B8AEBE] hover:text-[#F7F3EA] relative py-1 transition-colors group"
            >
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8FF3D] group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          {/* Desktop Action Buttons */}
<div className="hidden md:flex items-center gap-3">
  <Link
    to="/login"
    className="text-sm font-medium text-[#F7F3EA] hover:text-[#C8FF3D] hover:bg-[#21182A] px-4 py-2 rounded-xl transition-all"
  >
    Login
  </Link>

  <Link
    to="/register"
    className="text-sm font-medium text-[#F7F3EA] bg-[#21182A] hover:bg-[#2A1F36] border border-[#3A2B43] hover:border-[#B9A7FF]/50 px-4 py-2 rounded-xl transition-all"
  >
    Register
  </Link>

  <Link
    to="/analyze"
    className="inline-flex items-center gap-2 text-sm font-bold text-[#120D18] bg-[#C8FF3D] hover:bg-[#d4ff66] active:bg-[#b8f526] px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(200,255,61,0.2)] hover:shadow-[0_0_22px_rgba(200,255,61,0.4)] hover:scale-[1.02] transition-all"
  >
    <Sparkles className="w-4 h-4 text-[#120D18]" />
    <span>Analyse Resume</span>
  </Link>
</div>
          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#F7F3EA] bg-[#21182A] border border-[#3A2B43] hover:border-[#C8FF3D]/40 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#C8FF3D]" />
              ) : (
                <Menu className="w-6 h-6 text-[#F7F3EA]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#3A2B43] bg-[#1B1422] px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#B8AEBE] hover:text-[#C8FF3D] py-1 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#B8AEBE] hover:text-[#C8FF3D] py-1 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#B8AEBE] hover:text-[#C8FF3D] py-1 transition-colors"
            >
              About
            </a>
          </nav>
          
          <div className="pt-4 border-t border-[#3A2B43] flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <button className="w-full text-center text-sm font-medium text-[#F7F3EA] bg-[#21182A] border border-[#3A2B43] py-2.5 rounded-xl hover:border-[#B9A7FF]/50 transition-colors">
                Login
              </button>
              <button className="w-full text-center text-sm font-medium text-[#F7F3EA] bg-[#21182A] border border-[#3A2B43] py-2.5 rounded-xl hover:border-[#B9A7FF]/50 transition-colors">
                Register
              </button>
            </div>
            <button className="w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-[#120D18] bg-[#C8FF3D] hover:bg-[#d4ff66] py-3 rounded-full shadow-[0_0_15px_rgba(200,255,61,0.25)] transition-all">
              <Sparkles className="w-4 h-4" />
              <span>Analyse Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

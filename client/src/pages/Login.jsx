import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import { saveToken } from '../services/auth'
import { FileText, Sparkles, LogIn, AlertCircle, ArrowRight, Loader2 } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      setError('')
      const res = await loginUser(formData)

      if (res.success && res.token) {
        saveToken(res.token)
        navigate('/dashboard')
      } else {
        setError(res.message || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please verify your email and password.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#120D18] text-[#F7F3EA] font-sans flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-[#21182A] border border-[#3A2B43] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div
            className="inline-flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B1422] border border-[#3A2B43] flex items-center justify-center text-[#C8FF3D] shadow-inner">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-[#F7F3EA] tracking-tight">
              Resume<span className="text-[#C8FF3D]">IQ</span>
            </span>
          </div>

          <h1 className="text-xl font-bold text-[#F7F3EA]">Welcome Back</h1>
          <p className="text-xs text-[#B8AEBE]">
            Sign in to access your AI resume analysis dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5 flex items-start gap-3 text-rose-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-[#F7F3EA] block">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full bg-[#1B1422] border border-[#3A2B43] focus:border-[#C8FF3D] rounded-xl px-4 py-3 text-[#F7F3EA] placeholder-[#B8AEBE]/40 outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-[#F7F3EA] block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full bg-[#1B1422] border border-[#3A2B43] focus:border-[#C8FF3D] rounded-xl px-4 py-3 text-[#F7F3EA] placeholder-[#B8AEBE]/40 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#C8FF3D] hover:bg-[#d4ff66] active:bg-[#b8f526] text-[#120D18] font-bold text-sm shadow-[0_0_20px_rgba(200,255,61,0.2)] hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#120D18]" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-[#120D18]" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-[#3A2B43] text-center text-xs text-[#B8AEBE]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#C8FF3D] hover:underline font-semibold">
            Create an account
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login

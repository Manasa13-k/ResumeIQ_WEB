import { useState, useEffect } from 'react'
import { checkHealth } from '../services/api'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

function ApiStatus() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await checkHealth()
        setData(result)
      } catch (err) {
        setError(err.message || 'Failed to connect to backend server')
      } finally {
        setLoading(false)
      }
    }

    fetchHealthStatus()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-[#21182A] border border-[#3A2B43] px-3.5 py-2 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs text-[#F7F3EA] max-w-xs transition-all">
        {loading && (
          <>
            <Loader2 className="w-3.5 h-3.5 text-[#B9A7FF] animate-spin shrink-0" />
            <span className="text-[#B8AEBE] font-medium">Checking API Status...</span>
          </>
        )}

        {!loading && error && (
          <>
            <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-rose-300 font-medium truncate" title={error}>
              API Connection Error
            </span>
          </>
        )}

        {!loading && data && (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C8FF3D] shrink-0" />
            <span className="text-[#F7F3EA] font-semibold">
              {data.message || 'API Connected'}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default ApiStatus

import { useState, useEffect } from 'react'
import { checkHealth } from '../utils/api.js'
import './Header.css'

export default function Header({ activeView, onNavigate }) {
  const [apiLive, setApiLive] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function check() {
      const ok = await checkHealth()
      if (!cancelled) setApiLive(ok)
    }
    check()
    const id = setInterval(check, 30000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  const statusLabel = apiLive === null ? 'CHECKING…' : apiLive ? 'API LIVE' : 'API OFFLINE'
  const statusClass = apiLive === null ? '' : apiLive ? 'live' : 'offline'
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L3 8v12l11 6 11-6V8L14 2z"
                stroke="var(--accent)" strokeWidth="1.5" fill="none" />
              <path d="M14 2L3 8l11 6 11-6L14 2z"
                fill="var(--accent)" fillOpacity="0.12" />
              <circle cx="14" cy="14" r="3" fill="var(--accent)" fillOpacity="0.9" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">PhishNet</span>
            <span className="logo-tag">Multimodal Detector</span>
          </div>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-btn ${activeView === 'analyzer' ? 'active' : ''}`}
            onClick={() => onNavigate('analyzer')}
          >
            <span className="nav-icon">⬡</span> Analyzer
          </button>
          <button
            className={`nav-btn ${activeView === 'history' ? 'active' : ''}`}
            onClick={() => onNavigate('history')}
          >
            <span className="nav-icon">≡</span> History
          </button>
        </nav>

        <div className="header-status">
          <span className={`status-dot ${statusClass}`} />
          <span className={`status-label mono ${statusClass}`}>{statusLabel}</span>
        </div>
      </div>
    </header>
  )
}

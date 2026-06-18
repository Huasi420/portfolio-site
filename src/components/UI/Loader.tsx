import { useState, useEffect } from 'react'

const BOOT_MESSAGES = [
  "ESTABLISHING SECURE CONNECTION...",
  "PARSING HOLOGRAPHIC GEOMETRY...",
  "MOUNTING TACTILE CONCRETE MESH...",
  "SYNCHRONIZING PORKBUN DNS CONNECT...",
  "COMPILING SHADER ARRAYS...",
  "SYSTEM ONLINE // WELCOME FELIPE"
]

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const duration = 2500 // 2.5 seconds
    const intervalTime = 50
    const increment = (intervalTime / duration) * 100

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(interval)
          // Wait 300ms before starting exit animations
          setTimeout(() => {
            setIsLoaded(true)
            // Wait 1200ms for loader slices to completely slide away
            setTimeout(() => {
              setShouldRender(false)
              onComplete()
            }, 1200)
          }, 300)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!shouldRender) return null

  // Cycle boot messages based on current progress
  const msgIndex = Math.min(
    Math.floor((progress / 100) * BOOT_MESSAGES.length),
    BOOT_MESSAGES.length - 1
  )
  const activeMessage = BOOT_MESSAGES[msgIndex]

  return (
    <div className={`loader-wrapper ${isLoaded ? 'loaded' : ''}`}>
      <div className="loader-slice top-slice" />
      <div className="loader-slice bottom-slice" />
      
      <div className="loader-content">
        <div className="ascii-container">
          <div className="ascii-wrapper">
            <div className="loader-laser" />
            <pre className="ascii-logo">
{`  █████▒▓█████  ██▓     ██▓ ██▓███  ▓█████     ▄▄▄       ███▄    █ ▓█████▄  ██▀███   ▄▄▄      ▓█████▄ ▓█████ 
▓██   ▒ ▓█   ▀ ▓██▒    ▓██▒▓██░  ██▒▓█   ▀    ▒████▄     ██ ▀█   █ ▒██▀ ██▌▓██ ▒ ██▒▒████▄    ▒██▀ ██▌▓█   ▀ 
▒████ ░ ▒███   ▒██░    ▒██▒▓██░ ██▓▒▒███      ▒██  ▀█▄  ▓██  ▀█ ██▒░██   █▌▓██ ░▄█ ▒▒██  ▀█▄  ░██   █▌▒███   
░▓█▒  ░ ▒▓█  ▄ ▒██░    ░██░▒██▄█▓▒ ▒▒▓█  ▄    ░██▄▄▄▄██ ▓██▒  ▐▌██▒░▓█▄   ▌▒██▀▀█▄  ░██▄▄▄▄██ ░▓█▄   ▌▒▓█  ▄ 
░▒█░    ░▒████▒░██████▒░██░▒██▒ ░  ░░▒████▒    ▓█   ▓██▒▒██░   ▓██░░▒████▓ ░██▓ ▒██▒ ▓█   ▓██▒░▒████▓ ░▒████▒
 ▒ ░    ░░ ▒░ ░░ ▒░▓  ░░▓  ▒▓▒░ ░  ░░░ ▒░ ░    ▒▒   ▓▒█░░ ▒░   ▒ ▒  ▒▒▓  ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░ ▒▒▓  ▒ ░░ ▒░ ░
 ░       ░ ░  ░░ ░ ▒  ░ ▒ ░░▒ ░      ░ ░  ░     ▒   ▒▒ ░░ ░░   ░ ▒░ ░ ▒  ▒   ░▒ ░ ▒░  ▒   ▒▒ ░ ░ ▒  ▒  ░ ░  ░
 ░ ░       ░     ░ ░    ▒ ░░░          ░        ░   ▒      ░   ░ ░  ░ ░  ░   ░░   ░   ░   ▒    ░ ░  ░    ░   
           ░  ░    ░  ░ ░              ░  ░         ░  ░         ░    ░       ░           ░  ░   ░       ░  ░
                                                                        ░                          ░              `}
            </pre>
          </div>
        </div>
        
        <div className="loader-telemetry">
          <div className="loader-line">
            <span className="loader-status" style={{ fontFamily: 'monospace' }}>REVEALING CORE PROTOCOL</span>
            <span className="glow-text mono">{Math.floor(progress).toString().padStart(2, '0')}%</span>
          </div>
          <div className="loader-progress-bar">
            <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="loader-status-msg" style={{ fontFamily: 'monospace' }}>{activeMessage}</div>
        </div>
      </div>
    </div>
  )
}

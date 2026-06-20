import { useState, useEffect, useCallback } from 'react'
import { RadialMenu } from './components/UI/RadialMenu'
import { StartMenu } from './components/UI/StartMenu'
import './index.css'

function App() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [siteStarted, setSiteStarted] = useState(false)
  const totalSlices = 5

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle scroll hijacking for desktop navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isMobile) return // Disable scroll hijack on mobile
    if (!siteStarted) return // Block scroll if start menu is active
    if ((window as any).isScrolling) return
    (window as any).isScrolling = true
    
    setTimeout(() => {
      (window as any).isScrolling = false
    }, 700)

    if (e.deltaY > 0) {
      setActiveIndex((prev) => Math.min(prev + 1, totalSlices - 1))
    } else if (e.deltaY < 0) {
      setActiveIndex((prev) => Math.max(prev - 1, -1))
    }
  }, [totalSlices, isMobile, siteStarted])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  return (
    <div className="main-wrapper">
      {/* Start Menu Overlay */}
      {!siteStarted && (
        <StartMenu onStart={() => setSiteStarted(true)} isMobile={isMobile} />
      )}

      {siteStarted && (
        <>
          {/* Looping Beach Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/assets/yeah_but_i_wanted_the_loop_ani.mp4"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              opacity: 1.0,
              pointerEvents: 'none'
            }}
          />

          {/* Clean Header */}
          <header style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            zIndex: 100,
            fontFamily: 'var(--font-heading)'
          }}>
            <h1 style={{ 
              fontSize: '1.2rem', 
              margin: 0, 
              letterSpacing: '3px', 
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              FELIPE ANDRADE
            </h1>
          </header>

          {/* UI Layer */}
          <RadialMenu 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex} 
            isMobile={isMobile} 
          />

          {/* Technical Theme Label in bottom-left */}
          {!isMobile && activeIndex >= 0 && (
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              opacity: 0.8
            }}>
              <div className="mono" style={{ 
                fontSize: '0.75rem', 
                letterSpacing: '2px', 
                color: '#ffffff',
                textShadow: '0 1px 5px rgba(0,0,0,0.5)'
              }}>
                NODE 0{activeIndex + 1} — ACTIVE_DIAGNOSTIC
              </div>
            </div>
          )}

          {/* Position Indicator (Right Side) */}
          {!isMobile && activeIndex >= 0 && (
            <div style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.2rem',
              zIndex: 50
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {Array.from({ length: totalSlices }).map((_, i) => (
                  <div 
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: i === activeIndex ? '#00f0ff' : '#ffffff',
                      opacity: i === activeIndex ? 1 : 0.35,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: i === activeIndex ? '0 0 8px #00f0ff' : 'none'
                    }}
                  />
                ))}
              </div>
              <div className="mono" style={{ 
                fontSize: '0.8rem', 
                color: '#ffffff', 
                marginTop: '0.5rem', 
                writingMode: 'vertical-rl', 
                transform: 'rotate(180deg)',
                letterSpacing: '1px',
                textShadow: '0 1px 5px rgba(0,0,0,0.5)'
              }}>
                0{activeIndex + 1} / 0{totalSlices}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App

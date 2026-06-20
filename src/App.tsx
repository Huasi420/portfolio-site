import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { RadialMenu } from './components/UI/RadialMenu'
import { StartMenu } from './components/UI/StartMenu'
import './index.css'

function App() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [siteStarted, setSiteStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const totalSlices = 5

  // Initialize loop audio and cleanup on unmount
  useEffect(() => {
    const audio = new Audio('/assets/ambient-kingdom-beach.wav')
    audio.loop = true
    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  // Autoplay music once site has started (bypassing browser block on interaction)
  useEffect(() => {
    if (siteStarted && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Autoplay blocked:", err))
    }
  }, [siteStarted])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio failed to play:", err))
    }
  }

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
            src={isMobile ? "/assets/yeah_but_i_wanted_the_loop_ani.mp4" : "/assets/videobackground-web.mp4"}
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

          {/* Speaker Toggle Button */}
          <motion.button
            onClick={toggleMusic}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              right: '2rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid #00f0ff',
              backgroundColor: 'rgba(10, 75, 145, 0.45)',
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 100,
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              outline: 'none',
              transition: 'border-color 0.35s ease, box-shadow 0.35s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ffffff'
              e.currentTarget.style.boxShadow = '0 0 18px rgba(255, 255, 255, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#00f0ff'
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.25)'
            }}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </motion.button>
        </>
      )}
    </div>
  )
}

export default App

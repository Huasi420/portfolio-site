import { useState, useEffect, useCallback } from 'react'
import Scene from './components/3D/Scene'
import { RadialMenu } from './components/UI/RadialMenu'
import { Loader } from './components/UI/Loader'
import './index.css'

const THEME_NAMES = [
  'CINEMATIC WORLD',
  'ANALOG ARCHIVE',
  'SCI-FI LAB',
  'DREAMSCAPE',
  'CLINICAL MINIMALISM'
]

const THEME_KEYS = [
  'cinematic',
  'analog',
  'scifi',
  'dreamscape',
  'clinical'
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const totalSlices = 5

  const activeTheme = THEME_KEYS[activeIndex]

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle scroll hijacking for navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isMobile) return // Disable scroll hijack on mobile
    if (isLoading) return // Block scroll while loading
    if ((window as any).isScrolling) return
    (window as any).isScrolling = true
    
    setTimeout(() => {
      (window as any).isScrolling = false
    }, 700) // Match transition duration (500-700ms)

    if (e.deltaY > 0) {
      setActiveIndex((prev) => Math.min(prev + 1, totalSlices - 1))
    } else if (e.deltaY < 0) {
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    }
  }, [totalSlices, isLoading])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const selectTheme = (index: number) => {
    setActiveIndex(index)
    setMenuOpen(false)
  }

  return (
    <div className={`main-wrapper theme-${activeTheme}`}>
      {/* Drafting grid background */}
      <div className="background-grid" />
      <div className="scifi-hud-lines" />

      {/* 3D Background layer */}
      <Scene activeIndex={activeIndex} theme={activeTheme} isMobile={isMobile} />

      {/* Header with interactive dropdown */}
      <header style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        zIndex: 100,
        fontFamily: 'var(--font-heading)'
      }}>
        <div 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <h1 style={{ fontSize: '1rem', margin: 0, letterSpacing: '2px' }}>FELIPE ANDRADE</h1>
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '6px solid var(--accent-color)',
            transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            marginTop: '2px'
          }} />
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '1.8rem',
            right: 0,
            backgroundColor: 'var(--panel-bg)',
            border: '1px solid var(--accent-color)',
            padding: '0.5rem 0',
            width: '220px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
            zIndex: 101,
          }}>
            {THEME_NAMES.map((name, idx) => (
              <div 
                key={name}
                onClick={() => selectTheme(idx)}
                style={{
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  color: idx === activeIndex ? 'var(--accent-color)' : 'var(--text-primary)',
                  backgroundColor: idx === activeIndex ? 'rgba(0,0,0,0.05)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
                className="mono"
              >
                0{idx + 1} / {name.split(' ')[0]}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* UI Layer */}
      <RadialMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} isMobile={isMobile} activeTheme={activeTheme} />

      {/* Technical Theme Label in bottom-left */}
      {!isMobile && (
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
          <div className="mono" style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--text-secondary)' }}>
            VARIANT 0{activeIndex + 1} — {THEME_NAMES[activeIndex]}
          </div>
        </div>
      )}

      {/* Position Indicator (Right Side) */}
      {!isMobile && (
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
                  backgroundColor: i === activeIndex ? 'var(--accent-color)' : 'var(--text-secondary)',
                  opacity: i === activeIndex ? 1 : 0.35,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
          <div className="mono" style={{ 
            fontSize: '0.8rem', 
            color: 'var(--text-secondary)', 
            marginTop: '0.5rem', 
            writingMode: 'vertical-rl', 
            transform: 'rotate(180deg)',
            letterSpacing: '1px'
          }}>
            0{activeIndex + 1} / 0{totalSlices}
          </div>
        </div>
      )}

      {/* Intro Loading Screen Overlay */}
      <Loader onComplete={() => setIsLoading(false)} />
    </div>
  )
}

export default App

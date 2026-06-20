import { motion, AnimatePresence } from 'framer-motion'
import { Slice } from './Slice'
import { ContentPanel } from './ContentPanel'

const MENU_ITEMS = [
  { id: 'work', title: 'WORK', subtitle: 'SELECTED PROJECTS AND COLLABORATIONS' },
  { id: 'about', title: 'ABOUT', subtitle: 'BACKGROUND AND PHILOSOPHY' },
  { id: 'projects', title: 'PROJECTS', subtitle: 'EXPERIMENTS AND CONCEPTS' },
  { id: 'contact', title: 'CONTACT', subtitle: 'GET IN TOUCH' },
  { id: 'studio', title: 'STUDIO', subtitle: 'PROCESS AND BEHIND THE SCENES' },
]

interface RadialMenuProps {
  activeIndex: number
  setActiveIndex: (idx: number) => void
  isMobile: boolean
}

export function RadialMenu({ activeIndex, setActiveIndex, isMobile }: RadialMenuProps) {
  if (isMobile) {
    return (
      <div className="mobile-menu" style={{ 
        padding: '6rem 1.5rem 6rem 1.5rem', 
        zIndex: 10, 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        boxSizing: 'border-box'
      }}>
        {MENU_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex
          return (
            <div key={item.id} className="mobile-menu-item" style={{ marginBottom: '2rem' }}>
              <div 
                className={`mobile-title ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(isActive ? -1 : idx)}
                style={{
                  borderLeft: `3px solid ${isActive ? '#00f0ff' : 'transparent'}`,
                  paddingLeft: '1rem',
                  opacity: isActive ? 1 : 0.7,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  color: '#ffffff',
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}
              >
                <div className="mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>0{idx + 1}</div>
                <h2 style={{ fontSize: '1.8rem', margin: 0, fontFamily: 'var(--font-heading)' }}>{item.title}</h2>
              </div>
              
              {isActive && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '1.5rem',
                  backgroundColor: 'rgba(10, 75, 145, 0.45)',
                  border: '2.5px solid rgba(255, 255, 255, 0.85)',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#ffffff'
                }}>
                  <ContentPanel idx={idx} isMobile={isMobile} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Desktop Radial
  return (
    <div className="radial-container" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 10, pointerEvents: 'none' }}>
      {/* Slices (Needs pointer events enabled to click on slices) */}
      <div style={{ pointerEvents: 'auto' }}>
        {MENU_ITEMS.map((item, idx) => (
          <Slice 
            key={item.id}
            item={item} 
            idx={idx} 
            isActive={idx === activeIndex} 
            totalSlices={MENU_ITEMS.length}
            onSelect={() => setActiveIndex(idx)}
          />
        ))}
      </div>

      {/* Upright Content Panel on Right Half (needs pointer events enabled to interact with scroll/links) */}
      <div style={{ pointerEvents: 'auto' }}>
        <AnimatePresence mode="wait">
          {activeIndex >= 0 && (
            <motion.div
              key={activeIndex}
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              exit={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                top: '15vh',
                right: '8vw',
                width: '38vw',
                height: '70vh',
                backgroundColor: 'rgba(10, 75, 145, 0.45)',
                border: '2.5px solid rgba(255, 255, 255, 0.85)',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#ffffff',
                zIndex: 40,
                overflow: 'hidden'
              }}
            >
              <ContentPanel idx={activeIndex} isMobile={isMobile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

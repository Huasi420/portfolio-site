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
  activeTheme: string
}

export function RadialMenu({ activeIndex, setActiveIndex, isMobile, activeTheme }: RadialMenuProps) {
  if (isMobile) {
    return (
      <div className="mobile-menu" style={{ padding: '6rem 2rem 2rem 2rem', zIndex: 10, position: 'relative' }}>
        {MENU_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex
          return (
            <div key={item.id} className="mobile-menu-item" style={{ marginBottom: '2rem' }}>
              <div 
                className={`mobile-title ${isActive ? 'active' : ''}`}
                style={{
                  borderLeft: `3px solid ${isActive ? 'var(--accent-color)' : 'transparent'}`,
                  paddingLeft: '1rem',
                  opacity: isActive ? 1 : 0.4,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>0{idx + 1}</div>
                <h2 style={{ fontSize: '1.8rem', margin: 0, fontFamily: 'var(--font-heading)' }}>{item.title}</h2>
              </div>
              
              {isActive && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '1.5rem',
                  border: activeTheme === 'analog' ? '1px solid rgba(120, 109, 95, 0.4)' : '2px solid var(--accent-color)',
                  backgroundColor: 'var(--panel-bg)'
                }}>
                  <ContentPanel idx={idx} />
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
            theme={activeTheme}
            onSelect={() => setActiveIndex(idx)}
          />
        ))}
      </div>

      {/* Upright Content Panel on Right Half (needs pointer events enabled to interact with scroll/links) */}
      <div style={{ pointerEvents: 'auto' }}>
        <AnimatePresence mode="wait">
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
              backgroundColor: 'var(--panel-bg)',
              border: activeTheme === 'analog' 
                ? '1px solid rgba(120, 109, 95, 0.4)' 
                : '2px solid var(--accent-color)',
              zIndex: 40,
              overflow: 'hidden',
              boxShadow: activeTheme === 'analog' ? '2px 2px 15px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            {/* Paper details for Analog theme */}
            {activeTheme === 'analog' && (
              <>
                <div className="analog-tape" style={{ top: '-10px', left: '-20px', zIndex: 10 }} />
                <div className="analog-tape" style={{ bottom: '-10px', right: '-20px', transform: 'rotate(45deg)', zIndex: 10 }} />
              </>
            )}
            <ContentPanel idx={activeIndex} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

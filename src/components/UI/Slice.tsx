import { motion } from 'framer-motion'

interface SliceProps {
  item: any
  idx: number
  isActive: boolean
  totalSlices: number
  theme: string
  onSelect: () => void
}

export function Slice({ item, idx, isActive, totalSlices, theme, onSelect }: SliceProps) {
  // Base angles for slices ranging from 12 deg to 68 deg downwards
  const minAngle = 12
  const maxAngle = 68
  const step = (maxAngle - minAngle) / (totalSlices - 1)
  const angle = minAngle + (idx * step)

  // Constant SVG canvas dimensions to lock the origin point (0, 150) in coordinate space
  const svgWidth = 800
  const svgHeight = 300

  // Select dynamic fill color based on the current theme
  const getFillColor = () => {
    switch (theme) {
      case 'cinematic':
        return 'rgba(212, 122, 59, 0.08)' // Semi-transparent copper
      case 'analog':
        return 'rgba(120, 109, 95, 0.08)' // Soft ink-wash beige
      case 'scifi':
        return 'rgba(0, 240, 255, 0.03)'  // Tech cyan
      case 'dreamscape':
        return 'rgba(192, 132, 252, 0.08)' // Purple nebula
      case 'clinical':
      default:
        return 'rgba(14, 165, 160, 0.06)'  // Modernist teal
    }
  }

  // Animate the polygon path coordinates. 
  // Origin (0, 150) is locked. Active wedge is longer (750px) and taller (220px spread)
  const activePoints = `0,150 750,40 750,260`
  const inactivePoints = `0,150 500,120 500,180`

  return (
    <motion.div
      className="slice-wrapper"
      onClick={onSelect}
      style={{
        position: 'absolute',
        top: '15vh',
        left: '15vw',
        transformOrigin: '0% 0%',
        zIndex: isActive ? 10 : 2,
        cursor: 'pointer',
      }}
      animate={{
        rotate: angle, // rotates clockwise downwards
      }}
      transition={{ type: 'spring', stiffness: 55, damping: 18 }}
    >
      <div style={{ position: 'relative' }}>
        {/* Expanded SVG Wedge (Origin locked to center-left y=150) */}
        <svg 
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          style={{ 
            display: 'block',
            overflow: 'visible',
            transformOrigin: 'left center',
          }}
        >
          <motion.polygon 
            animate={{
              points: isActive ? activePoints : inactivePoints
            }}
            transition={{ type: 'spring', stiffness: 55, damping: 18 }}
            fill={getFillColor()}
            stroke="var(--accent-color)"
            strokeWidth={isActive ? '1.5' : '0.5'}
            opacity={isActive ? 1 : 0.2}
            style={{ transition: 'fill 0.4s, stroke 0.4s, opacity 0.3s' }}
          />
        </svg>

        {/* Text Label positioned inside the wedge */}
        <motion.div
          animate={{
            x: isActive ? 160 : 70,
            y: isActive ? -32 : -14, // center relative to y=150 (half of font height)
            scale: isActive ? 1.05 : 0.85,
            opacity: isActive ? 1 : 0.45
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.8rem',
            color: 'var(--text-primary)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span className="mono" style={{ fontSize: '1rem', fontWeight: 'bold' }}>0{idx + 1}</span>
          <div style={{ display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap' }}>
            <h2 style={{ 
              fontSize: isActive ? '3.5rem' : '1.8rem', 
              margin: 0, 
              lineHeight: 1,
              letterSpacing: '1px',
              fontFamily: 'var(--font-heading)'
            }}>
              {item.title}
            </h2>
            {isActive && (
              <span style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '2px', 
                marginTop: '0.4rem',
                fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap'
              }}>
                {item.subtitle}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

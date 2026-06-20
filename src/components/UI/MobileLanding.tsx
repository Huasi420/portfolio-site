import { motion } from 'framer-motion'

interface MobileLandingProps {
  onStart: () => void
}

export function MobileLanding({ onStart }: MobileLandingProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(/assets/fixed_background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {/* Animated Bouncy Logo */}
      <motion.img
        src="/assets/logo_felipe_andrade.png"
        alt="Felipe Andrade"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 110,
          damping: 12,
          duration: 0.8
        }}
        style={{
          width: '70%',
          maxWidth: '300px',
          height: 'auto',
          marginBottom: '3rem',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      />

      {/* Delayed Fade-in Start Button */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.8, // 0.8s logo + 1s delay
          duration: 1.0
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: '0.8rem 2.5rem',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: 'rgba(0, 240, 255, 0.15)',
          border: '2px solid #00f0ff',
          borderRadius: '4px',
          cursor: 'pointer',
          letterSpacing: '3px',
          fontFamily: 'var(--font-heading)',
          boxShadow: '0 0 15px rgba(0, 240, 255, 0.25)',
          textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.35)'
          e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.15)'
          e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.25)'
        }}
      >
        START
      </motion.button>
    </div>
  )
}

import { motion } from 'framer-motion'

interface StartMenuProps {
  onStart: () => void
  isMobile: boolean
}

export function StartMenu({ onStart, isMobile }: StartMenuProps) {
  const backgroundSrc = isMobile
    ? '/assets/fixed_background.png'
    : '/assets/landscape_background.png'

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden',
      backgroundColor: '#000000'
    }}>
      {/* Zooming Background Image */}
      <motion.div
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.12 }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
      />

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
          width: isMobile ? '70%' : '40%',
          maxWidth: '450px',
          height: 'auto',
          marginBottom: '3rem',
          userSelect: 'none',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
        }}
      />

      {/* Delayed Fade-in ENTER Button */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.3, // 0.8s logo + 0.5s delay
          duration: 1.0
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: '0.8rem 3rem',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: 'rgba(0, 240, 255, 0.15)',
          border: '2px solid #00f0ff',
          borderRadius: '4px',
          cursor: 'pointer',
          letterSpacing: '4px',
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
        ENTER
      </motion.button>
    </div>
  )
}

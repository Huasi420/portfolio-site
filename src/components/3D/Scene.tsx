import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { MannequinHead } from './MannequinHead'
import * as THREE from 'three'

interface SceneProps {
  activeIndex: number
  theme: string
}

// Light configurations for dynamic lerping
const LIGHT_CONFIGS = {
  cinematic: {
    ambientColor: '#ffffff', ambientIntensity: 0.15,
    keyColor: '#d47a3b', keyIntensity: 2.5,
    fillColor: '#ffffff', fillIntensity: 0.3,
    rimColor: '#d47a3b', rimIntensity: 1.5,
  },
  analog: {
    ambientColor: '#fcfbf9', ambientIntensity: 0.7,
    keyColor: '#ffffff', keyIntensity: 1.2,
    fillColor: '#fcfbf9', fillIntensity: 0.5,
    rimColor: '#ffffff', rimIntensity: 0.0,
  },
  scifi: {
    ambientColor: '#040a0c', ambientIntensity: 0.25,
    keyColor: '#00f0ff', keyIntensity: 3.0,
    fillColor: '#0ea5a0', fillIntensity: 1.0,
    rimColor: '#00f0ff', rimIntensity: 0.8,
  },
  dreamscape: {
    ambientColor: '#17122b', ambientIntensity: 0.3,
    keyColor: '#c084fc', keyIntensity: 2.2,
    fillColor: '#a78bfa', fillIntensity: 1.2,
    rimColor: '#db2777', rimIntensity: 2.5,
  },
  clinical: {
    ambientColor: '#ffffff', ambientIntensity: 0.5,
    keyColor: '#ffffff', keyIntensity: 2.0,
    fillColor: '#ffffff', fillIntensity: 0.8,
    rimColor: '#ffffff', rimIntensity: 0.5,
  }
}

function LightController({ theme }: { theme: string }) {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const keyRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.DirectionalLight>(null)
  const rimRef = useRef<THREE.PointLight>(null)

  const themeColors = useMemo(() => {
    return {
      cinematic: {
        ambient: new THREE.Color(LIGHT_CONFIGS.cinematic.ambientColor),
        key: new THREE.Color(LIGHT_CONFIGS.cinematic.keyColor),
        fill: new THREE.Color(LIGHT_CONFIGS.cinematic.fillColor),
        rim: new THREE.Color(LIGHT_CONFIGS.cinematic.rimColor),
      },
      analog: {
        ambient: new THREE.Color(LIGHT_CONFIGS.analog.ambientColor),
        key: new THREE.Color(LIGHT_CONFIGS.analog.keyColor),
        fill: new THREE.Color(LIGHT_CONFIGS.analog.fillColor),
        rim: new THREE.Color(LIGHT_CONFIGS.analog.rimColor),
      },
      scifi: {
        ambient: new THREE.Color(LIGHT_CONFIGS.scifi.ambientColor),
        key: new THREE.Color(LIGHT_CONFIGS.scifi.keyColor),
        fill: new THREE.Color(LIGHT_CONFIGS.scifi.fillColor),
        rim: new THREE.Color(LIGHT_CONFIGS.scifi.rimColor),
      },
      dreamscape: {
        ambient: new THREE.Color(LIGHT_CONFIGS.dreamscape.ambientColor),
        key: new THREE.Color(LIGHT_CONFIGS.dreamscape.keyColor),
        fill: new THREE.Color(LIGHT_CONFIGS.dreamscape.fillColor),
        rim: new THREE.Color(LIGHT_CONFIGS.dreamscape.rimColor),
      },
      clinical: {
        ambient: new THREE.Color(LIGHT_CONFIGS.clinical.ambientColor),
        key: new THREE.Color(LIGHT_CONFIGS.clinical.keyColor),
        fill: new THREE.Color(LIGHT_CONFIGS.clinical.fillColor),
        rim: new THREE.Color(LIGHT_CONFIGS.clinical.rimColor),
      }
    }
  }, [])

  useFrame(() => {
    const config = LIGHT_CONFIGS[theme as keyof typeof LIGHT_CONFIGS] || LIGHT_CONFIGS.clinical
    const colors = themeColors[theme as keyof typeof themeColors] || themeColors.clinical

    if (ambientRef.current) {
      ambientRef.current.color.lerp(colors.ambient, 0.05)
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, config.ambientIntensity, 0.05)
    }
    if (keyRef.current) {
      keyRef.current.color.lerp(colors.key, 0.05)
      keyRef.current.intensity = THREE.MathUtils.lerp(keyRef.current.intensity, config.keyIntensity, 0.05)
    }
    if (fillRef.current) {
      fillRef.current.color.lerp(colors.fill, 0.05)
      fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, config.fillIntensity, 0.05)
    }
    if (rimRef.current) {
      rimRef.current.color.lerp(colors.rim, 0.05)
      rimRef.current.intensity = THREE.MathUtils.lerp(rimRef.current.intensity, config.rimIntensity, 0.05)
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} />
      <directionalLight ref={keyRef} position={[5, 10, 5]} />
      <directionalLight ref={fillRef} position={[-5, 5, 5]} />
      <pointLight ref={rimRef} position={[0, 5, -5]} />
    </>
  )
}

export default function Scene({ activeIndex, theme }: SceneProps) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
        <LightController theme={theme} />
        
        <Environment preset="studio" />
        
        <Suspense fallback={null}>
          <MannequinHead activeIndex={activeIndex} theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  )
}

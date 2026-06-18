import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface MannequinHeadProps {
  activeIndex: number
  theme: string
  isMobile: boolean
}

const MATERIAL_CONFIGS = {
  cinematic: {
    color: '#242426',
    metalness: 0.9,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transmission: 0.0,
  },
  analog: {
    color: '#f5f3ee',
    metalness: 0.05,
    roughness: 0.85,
    clearcoat: 0.0,
    clearcoatRoughness: 0.1,
    transmission: 0.0,
  },
  scifi: {
    color: '#051014',
    metalness: 0.2,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transmission: 0.0,
  },
  dreamscape: {
    color: '#9065c3',
    metalness: 0.5,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transmission: 0.0,
  },
  clinical: {
    color: '#ffffff',
    metalness: 0.05,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transmission: 0.0,
  }
}

export function MannequinHead({ activeIndex, theme, isMobile }: MannequinHeadProps) {
  const headRef = useRef<THREE.Group>(null)
  
  // Load the GLB model
  const { scene } = useGLTF('/assets/model.glb')

  // Center and normalize size
  const { normalizedGroup, originalMeshes } = useMemo(() => {
    // Clone to prevent cross-contamination or caching issues
    const cloned = scene.clone()
    
    // Compute bounding box
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)
    
    // Center at origin and scale to target height of ~2.3 units
    const targetHeight = 2.3
    const scaleFactor = targetHeight / Math.max(size.x, size.y, size.z)
    
    const wrapper = new THREE.Group()
    cloned.position.set(-center.x, -center.y, -center.z)
    wrapper.add(cloned)
    wrapper.scale.setScalar(scaleFactor)
    
    const meshes: THREE.Mesh[] = []
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child)
      }
    })
    
    return { normalizedGroup: wrapper, cloned, originalMeshes: meshes }
  }, [scene])

  // Sci-Fi glow wireframe material
  const scifiWireframeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
  }, [])

  // Create a scifi wireframe group of the model
  const scifiWireframeGroup = useMemo(() => {
    const clonedWrapper = normalizedGroup.clone()
    clonedWrapper.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = scifiWireframeMaterial
      }
    })
    return clonedWrapper
  }, [normalizedGroup, scifiWireframeMaterial])

  // Convert standard materials to MeshPhysicalMaterial to support advanced properties (clearcoat, etc.)
  const physicalMaterials = useMemo(() => {
    const list: THREE.MeshPhysicalMaterial[] = []
    
    originalMeshes.forEach((mesh) => {
      const oldMat = mesh.material as THREE.MeshStandardMaterial
      
      const newMat = new THREE.MeshPhysicalMaterial({
        map: oldMat.map,
        normalMap: oldMat.normalMap,
        roughnessMap: oldMat.roughnessMap,
        metalnessMap: oldMat.metalnessMap,
        emissiveMap: oldMat.emissiveMap,
        emissive: oldMat.emissive ? oldMat.emissive.clone() : new THREE.Color(0x000000),
        color: oldMat.color ? oldMat.color.clone() : new THREE.Color(0xffffff),
        metalness: oldMat.metalness !== undefined ? oldMat.metalness : 1.0,
        roughness: oldMat.roughness !== undefined ? oldMat.roughness : 1.0,
        normalScale: oldMat.normalScale,
        side: THREE.DoubleSide,
      })
      
      mesh.material = newMat
      list.push(newMat)
    })
    
    return list
  }, [originalMeshes])

  // Pre-instantiated color targets for smooth lerping
  const themeColors = useMemo(() => {
    return {
      cinematic: new THREE.Color(MATERIAL_CONFIGS.cinematic.color),
      analog: new THREE.Color(MATERIAL_CONFIGS.analog.color),
      scifi: new THREE.Color(MATERIAL_CONFIGS.scifi.color),
      dreamscape: new THREE.Color(MATERIAL_CONFIGS.dreamscape.color),
      clinical: new THREE.Color(MATERIAL_CONFIGS.clinical.color),
    }
  }, [])

  useFrame((state) => {
    if (!headRef.current) return

    const time = state.clock.getElapsedTime()
    // Idle slow breathing/rotation
    const idleRotX = Math.sin(time * 0.4) * 0.03
    const idleRotY = Math.cos(time * 0.25) * 0.03

    // Top-left orientation: facing lower-right
    const targetBaseY = isMobile ? (0.2 + activeIndex * -0.04) : (0.5 + activeIndex * -0.06)
    const targetBaseZ = -0.1
    const targetBaseX = isMobile ? (0.2 + activeIndex * 0.02) : (0.45 + activeIndex * 0.02)

    // Smooth lerping of rotations
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetBaseY + idleRotY, 0.04)
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetBaseX + idleRotX, 0.04)
    headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetBaseZ, 0.04)

    // Lerp material properties smoothly in the frame loop (no shader recompilation!)
    if (physicalMaterials.length > 0) {
      const config = MATERIAL_CONFIGS[theme as keyof typeof MATERIAL_CONFIGS] || MATERIAL_CONFIGS.clinical
      const colorTarget = themeColors[theme as keyof typeof themeColors] || themeColors.clinical

      physicalMaterials.forEach((mat) => {
        // Smoothly lerp base color multiplier (blends the texture colors with the theme)
        mat.color.lerp(colorTarget, 0.05)
        
        // Smoothly lerp physical properties
        mat.metalness = THREE.MathUtils.lerp(mat.metalness, config.metalness, 0.05)
        mat.roughness = THREE.MathUtils.lerp(mat.roughness, config.roughness, 0.05)
        mat.clearcoat = THREE.MathUtils.lerp(mat.clearcoat, config.clearcoat, 0.05)
        mat.clearcoatRoughness = THREE.MathUtils.lerp(mat.clearcoatRoughness, config.clearcoatRoughness, 0.05)

        // Set dynamic emissive qualities based on theme
        if (theme === 'scifi') {
          mat.emissive.lerp(new THREE.Color('#002244'), 0.05)
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 1.5, 0.05)
        } else if (theme === 'dreamscape') {
          mat.emissive.lerp(new THREE.Color('#1a052e'), 0.05)
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 1.0, 0.05)
        } else {
          mat.emissive.lerp(new THREE.Color('#000000'), 0.05)
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.0, 0.05)
        }
      })
    }
  })

  return (
    <group 
      ref={headRef} 
      position={isMobile ? [0, 1.3, -0.5] : [-2.8, 2.3, 0]} 
      scale={isMobile ? [0.75, 0.75, 0.75] : [1.1, 1.1, 1.1]}
    >
      {/* Render the normalized model */}
      <primitive object={normalizedGroup} />

      {/* Holographic grid wireframe overlay (Sci-Fi theme only) */}
      {theme === 'scifi' && (
        <primitive object={scifiWireframeGroup} scale={[1.02, 1.02, 1.02]} />
      )}
    </group>
  )
}

useGLTF.preload('/assets/model.glb')

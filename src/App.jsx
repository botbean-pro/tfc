import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Center,
  OrbitControls,
  useGLTF,
  Environment,
} from '@react-three/drei'

import {
  LiquefyProvider,
  GlassDock,
  DockItem,
} from '@liquefy-ui/react'

import {
  SparklesIcon,
  HomeIcon,
  UserIcon,
} from '@liquefy-ui/icons'

import '@liquefy-ui/react/styles.css'
import './App.css'

const modelUrl = `${import.meta.env.BASE_URL}Light-Bulb.glb`

function Model() {
  const { scene } = useGLTF(modelUrl)

  return (
    <Center>
      <primitive object={scene} scale={40} />
    </Center>
  )
}

useGLTF.preload(modelUrl)

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      setScrollProgress(Math.min(window.scrollY / 520, 1))
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  const logoStyle = {
    left: `${50 + ((88 / window.innerWidth) * 100 - 50) * scrollProgress}%`,
    top: `${50 + ((88 / window.innerHeight) * 100 - 50) * scrollProgress}%`,
    transform: `translate(-50%, -50%) scale(${1 - scrollProgress * 0.75})`,
  }

  return (
    <LiquefyProvider theme="dark" wobbliness={0.25}>
      <div className="scene">

        <div className="brand-mark" style={logoStyle}>
          <span className="brand-mark-circle" />
          <img src="/logo.svg" alt="The Founders Club" />
        </div>

        {/* 3D MODEL */}
        <Canvas className="scene-canvas" camera={{ position: [2.2, 1.5, 2.2], fov: 38 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
          </Suspense>

          <ambientLight intensity={1.4} />
          <directionalLight position={[3, 4, 2]} intensity={2.5} />
          <pointLight position={[-2, 1, 3]} intensity={20} distance={8} />

          <Suspense fallback={null}>
            <Model />
          </Suspense>

          <OrbitControls enableDamping enableZoom={false} enablePan={false} />
        </Canvas>

        {/* LIQUEFY GLASS DOCK */}
        <div className="dock-position dark-blue-dock">
          <GlassDock>
            <DockItem icon={<HomeIcon />} label="Home" active />
            <DockItem icon={<SparklesIcon />} label="Ideas" />
            <DockItem icon={<UserIcon />} label="Profile" />
          </GlassDock>
        </div>

        <footer className="site-footer">
          <strong>The Founders Club</strong>
          <span>© 2026 The Founders Club. All rights reserved.</span>
        </footer>

      </div>
    </LiquefyProvider>
  )
}

export default App
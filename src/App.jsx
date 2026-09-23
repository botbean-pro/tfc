import { Suspense } from 'react'
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
  SettingsIcon,
  HomeIcon,
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
  return (
    <LiquefyProvider theme="dark">
      <div className="scene">

        <h1 className="scene-title">
          The
          <span>Founder&apos;s</span>
          Collective
        </h1>

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

          <OrbitControls enableDamping />
        </Canvas>

        {/* LIQUEFY GLASS DOCK */}
        <div className="dock-position dark-blue-dock">
          <GlassDock>
            <DockItem icon={<HomeIcon />} label="Home" active />
            <DockItem icon={<SparklesIcon />} label="Ideas" />
            <DockItem icon={<SettingsIcon />} label="Settings" />
          </GlassDock>
        </div>

      </div>
    </LiquefyProvider>
  )
}

export default App
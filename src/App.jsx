import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  useGLTF,
  Environment,
  Center,
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

function Model() {
  const { scene } = useGLTF(
    `${import.meta.env.BASE_URL}Light-Bulb.glb`,
  )

  return (
    <Center>
      <primitive object={scene} scale={0.014} />
    </Center>
  )
}

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
          <Environment preset="studio" />
          <ambientLight intensity={1} />

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
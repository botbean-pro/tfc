import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Environment } from '@react-three/drei'
import './App.css'

function Model() {
  const { scene } = useGLTF('/Light-Bulb.glb')

  return (
    <Center>
      <primitive object={scene} scale={0.05} />
    </Center>
  )
}

function App() {
  return (
    <div className="scene">
      <Canvas camera={{ position: [30, 20, 30], fov: 45 }}>
        <ambientLight intensity={1} />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls
          enableDamping
          minDistance={1}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}

export default App
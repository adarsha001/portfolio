// App.jsx
import React, { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Avatar } from "./components/Avatar"

export default function App() {
  const [currentAction, setCurrentAction] = useState("Idle") // default animation

  return (
    <div className="w-screen h-screen relative">
      <h1 className="bg-green-300">hello</h1>

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 1]} />
        <group position-y={-1}>
          <Avatar currentAction={currentAction} />
        </group>
        <OrbitControls /> 
      </Canvas>

      {/* UI Buttons */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 bg-black/40 p-3 rounded-lg">
        <button
          className="px-3 py-1 bg-white rounded"
          onClick={() => setCurrentAction("Idle")}
        >
          Idle
        </button>
        <button
          className="px-3 py-1 bg-white rounded"
          onClick={() => setCurrentAction("SittingLaugh")}
        >
          Sitting Laugh
        </button>
        <button
          className="px-3 py-1 bg-white rounded"
          onClick={() => setCurrentAction("Bow")}
        >
          Bow
        </button>
      </div>
    </div>
  )
}

// App.jsx
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Cube() {
  const cubeRef = useRef();

  useEffect(() => {
    if (!cubeRef.current) return;

    // Animate cube position based on scroll
    gsap.to(cubeRef.current.position, {
      y: 5,            // move cube up
      x: 3,            // move cube right
      scrollTrigger: {
        trigger: "#trigger-section", // element to pin / track
        start: "top top",            // when top hits viewport top
        end: "bottom bottom",        // scroll range
        scrub: true,                 // smooth link to scroll
      },
    });

    // You can also animate rotation
    gsap.to(cubeRef.current.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: "#trigger-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Test() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Cube />
        <OrbitControls />
      </Canvas>

      {/* Scroll sections */}
      <div style={{ height: "100vh", background: "#111", color: "white" }}>
        <h1 style={{ padding: 50 }}>Scroll down 👇</h1>
      </div>
      <div id="trigger-section" style={{ height: "200vh", background: "#222" }}>
        <h2 style={{ padding: 50 }}>Cube moves & rotates while you scroll</h2>
      </div>
      <div style={{ height: "100vh", background: "#333", color: "white" }}>
        <h2 style={{ padding: 50 }}>End of scroll animation</h2>
      </div>
    </>
  );
}

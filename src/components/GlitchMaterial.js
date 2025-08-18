// GlitchMaterial.js
import { shaderMaterial } from "@react-three/drei"
import * as THREE from "three"

// Simple green-tinted glitch shader
const GlitchMaterial = shaderMaterial(
  { time: 0 }, // uniforms
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    varying vec2 vUv;

    // random function
    float random(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      // glitch lines
      float glitch = step(0.8, random(vec2(vUv.y * 50.0, time * 5.0)));

      vec3 baseColor = vec3(0.9, 0.9, 0.9);  // normal white
      vec3 glitchColor = vec3(0.0, 1.0, 0.0); // green glitch

      vec3 finalColor = mix(baseColor, glitchColor, glitch);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

export default GlitchMaterial

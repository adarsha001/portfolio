// App.jsx
import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Avatar } from "./components/Avatar";
import gsap from "gsap";

// Enhanced Matrix Rain with MERN stack symbols
function MatrixRain() {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "MERN{}<>()=[];'./*-+ReactNodeMongoExpressJS";
    const techIcons = [];
    const chars = [...letters.split(""), ...techIcons];
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).map(() => 1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    gsap.ticker.add(draw);

    return () => gsap.ticker.remove(draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
}

function CameraAnimation() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(4, 7, 10);

    gsap.to(camera.position, {
      duration: 2,
      z: 3,
      y: 0,
      x: 0,
      ease: "power2.inOut",
    });
  }, [camera]);

  return null;
}

// Enhanced Floating Label with tech stack
function FloatingLabel() {
  return (
    <Html position={[0, 2.5, 0.6]} center>
      <div className="px-6 py-3 bg-black/70 text-green-400 z-50 rounded-lg text-xl font-bold shadow-lg border border-green-400/30 text-center">
        <div className="text-2xl mb-1">Adarsha</div>
        <div className="text-sm font-mono">MERN Stack Developer</div>
        <div className="flex justify-center gap-3 mt-2 text-xs">
          <span className="bg-green-400/20 px-2 py-1 rounded">MongoDB</span>
          <span className="bg-green-400/20 px-2 py-1 rounded">Express</span>
          <span className="bg-green-400/20 px-2 py-1 rounded">React</span>
          <span className="bg-green-400/20 px-2 py-1 rounded">Node.js</span>
        </div>
      </div>
    </Html>
  );
}

// Tech stack floating around the avatar
function FloatingTechIcons() {
  const icons = [
    { name: "React", emoji: "⚛️", position: [1.5, 1, 0.5] },
    { name: "Node", emoji: "🖥️", position: [-1.5, 1.2, 0.5] },
    { name: "Mongo", emoji: "📊", position: [0.5, 1.5, -1] },
    { name: "Express", emoji: "🚀", position: [-0.5, 1, -1.5] },
  ];

  return (
    <>
      {icons.map((icon, index) => (
        <Html key={index} position={icon.position} center>
          <div className="text-2xl z-10 animate-float" style={{ zIndex:10,
            animationDelay: `${index * 0.5}s`,
            filter: "drop-shadow(0 0 8px rgba(0, 255, 0, 0.7))"
          }}>
            {icon.emoji}
          </div>
        </Html>
      ))}
    </>
  );
}
function CameraController({ currentAction }) {
  const { camera } = useThree();

  useEffect(() => {
    if (currentAction === "SittingLaugh") {
      gsap.to(camera.position, {
        duration: 1,
        z: 5,
        y: 2,
        x: -2,
        ease: "power2.inOut",
      });
    } else if (currentAction === "Bow") {
      gsap.to(camera.position, {
        duration: 1,
        z: 6,
        y: 1,
        x: 0,
        ease: "power2.inOut",
      });
    } else if (currentAction === "kick") {
      gsap.to(camera.position, {
        duration: 1,
        z: 5,
        y: 1.5,
        x: 2,
        ease: "power2.inOut",
      });
    } else {
      // Return to default position
      gsap.to(camera.position, {
        duration: 1,
        z: 3,
        y: 0,
        x: 0,
        ease: "power2.inOut",
      });
    }
  }, [currentAction, camera]);

  return null;
}

export default function App() {
  const [currentAction, setCurrentAction] = useState("Idle");
  const [showProjects, setShowProjects] = useState(false);

  // MERN stack projects data
 const projects = [
  { 
    name: "SurveyVoice", 
    tech: "MERN,Tailwind CSS web speech APi", 
    url: "https://surveyvoice.vercel.app/",
    description: "Interactive survey platform with real-time analytics"
  },
  { 
    name: "SP Properties", 
    tech: "MERN, Tailwind CSS ", 
    url: "https://sppropertiesbengaluru.com/",
    description: "Real estate property showcase website"
  },

];
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* 3D Scene */}
      <Canvas className="absolute top-0 left-0 w-full h-full z-10">
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 1]} color="#0F0" intensity={2} />
        <pointLight position={[0, 2, 2]} color="#0F0" intensity={0.3} />

        <group position-y={-1}>
          <Avatar
            currentAction={currentAction}
            onClick={() => setCurrentAction("Idle")}
          />
          <FloatingLabel />
          <FloatingTechIcons />
        </group>

        <OrbitControls enableZoom={true} enablePan={true} />
        <CameraAnimation />
          <CameraController currentAction={currentAction} /> 
      </Canvas>

      {/* UI Buttons */}
      <div className="absolute  gap-2 top-2 left-1/2 -translate-x-1/2 flex bg-black/70 p-4 rounded-lg z-20 border border-green-400/30">
      <button
          className="px-4 py-2 bg-green-400/20 text-green-400 rounded hover:bg-green-400/30 transition"
          onClick={() => setShowProjects(!showProjects)}
        >
          {showProjects ? "Hide Projects" : "Show Projects"}
        </button>
        <button
          className="px-4 py-2 bg-green-400/20 text-green-400 rounded hover:bg-green-400/30 transition"
          onClick={() => setCurrentAction("SittingLaugh")}
        >
          SittingLaugh
        </button>
        <button
          className="px-4 py-2 bg-green-400/20 text-green-400 rounded hover:bg-green-400/30 transition"
          onClick={() => setCurrentAction("Bow")}
        >
          Bow
        </button>
        <button
          className="px-4 py-2 bg-green-400/20 text-green-400 rounded hover:bg-green-400/30 transition"
          onClick={() => setCurrentAction("kick")}
        >
          kick
        </button>
   
   
      </div>

      {/* Projects Panel */}
      
       {showProjects && ( <div className="absolute top-5 right-5 bg-black/80 p-4 rounded-lg z-20 border border-green-400/30 w-72 backdrop-blur-sm">
  <h3 className="text-green-400 font-bold mb-3 text-lg flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
    </svg>
    MERN Projects
  </h3>
  <ul className="space-y-3">
    {projects.map((project, index) => (
      <li key={index} className="group">
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block p-2 rounded hover:bg-green-400/10 transition-colors"
        >
          <div className="font-medium text-white group-hover:text-green-400 flex items-center gap-2">
            {project.name}
            {project.url !== "#" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            )}
          </div>
          <div className="text-green-300 text-xs mb-1">{project.tech}</div>
          <div className="text-gray-300 text-xs">{project.description}</div>
        </a>
      </li>
    ))}
  </ul>
</div>)}

      {/* Add some global styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
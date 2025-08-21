// App.jsx
import React, { useState, useEffect,useRef } from "react";
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

    const letters = "アァイィウヴエオカガキギクグケゲコゴサザシジスズセゼソゾABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
      className="absolute top-0 left-0 w-full h-full z-0 matrix-canvas"
    />
  );
}

// Enhanced Floating Label with tech stack - Updated with GSAP transition effects
function FloatingLabel({ isTransitioning, currentPage }) {
  const labelRef = useRef();
  
  useEffect(() => {
    if (isTransitioning && currentPage === "home" && labelRef.current) {
      // GSAP animation for scale up and forward movement
      gsap.to(labelRef.current, {
        duration: 2.2,
        scale: 6,
        z: 500,
        opacity: 0,
        ease: "power2.inOut",
        transformOrigin: "center center",
        onStart: () => {
          // Add glow effect
          labelRef.current.style.boxShadow = "0 0 30px rgba(0, 255, 0, 0.5)";
        },
        onComplete: () => {
          // Reset styles after animation
          labelRef.current.style.boxShadow = "";
        }
      });
    }
  }, [isTransitioning, currentPage]);

  return (
    <Html position={[0, 2.5, 0.6]} center>
      <div 
        ref={labelRef}
        className="px-6 py-3 bg-black/70 text-green-400 z-50 rounded-lg text-xl font-bold shadow-lg border border-green-400/30 text-center floating-label"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)'
        }}
      >
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

function CameraController({ currentAction, isZoomingOut }) {
  const { camera } = useThree();

  useEffect(() => {
    if (isZoomingOut) {
      // Zoom out animation
      gsap.to(camera.position, {
        duration: 1.5,
        z: 15,
        y: 3,
        x: 0,
        ease: "power2.inOut",
      });
      
      // Return to normal after delay
      gsap.to(camera.position, {
        delay: 2,
        duration: 1.5,
        z: 3,
        y: 0,
        x: 0,
        ease: "power2.inOut",
      });
    } else if (currentAction === "SittingLaugh") {
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
        z: -5,
        y: -1.5,
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
  }, [currentAction, camera, isZoomingOut]);

  return null;
}
export default function App() {
  const [currentAction, setCurrentAction] = useState("Idle");
  const [showProjects, setShowProjects] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const [flashIntensity, setFlashIntensity] = useState(0);
  const [activeSection, setActiveSection] = useState(0); // Track which section is active
  const secondPageRef = useRef(null);

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

  // Sections for the second page
  const sections = [
    {
      title: "About Me",
      content: "I'm a passionate MERN stack developer with expertise in building modern web applications.",
      avatarPosition: [0, -3, 0],
      avatarAction: "Idle"
    },
    {
      title: "My Skills",
      content: "React, Node.js, MongoDB, Express, JavaScript, Three.js, and more...",
      avatarPosition: [1, -3, -1],
      avatarAction: "SittingLaugh"
    },
    {
      title: "Experience",
      content: "5+ years of experience in web development with various startups and enterprises.",
      avatarPosition: [-1, -3, 1],
      avatarAction: "Bow"
    },
    {
      title: "Contact",
      content: "Get in touch with me for collaborations or project discussions.",
      avatarPosition: [0, -3, 2],
      avatarAction: "kick"
    }
  ];

  // Function to navigate to second page
  const goToSecondPage = () => {
    if (isTransitioning || currentPage === "second") return;
    
    setIsTransitioning(true);
    setIsZoomingOut(true);
    
    // Play special animation
    setCurrentAction("flip");
    
    // After zoom out completes, trigger the white flash and page transition
    setTimeout(() => {
      // Create white flash effect exactly at the moment of transition
      gsap.to({}, {
        duration: 0.2,
        onStart: () => setFlashIntensity(1),
        onComplete: () => {
          // Transition to black background
          gsap.to(".matrix-canvas", {
            duration: 0.1,
            opacity: 0,
            onComplete: () => {
              setCurrentAction("Idle");
              setCurrentPage("second");
              setIsTransitioning(false);
              
              // Fade out the white flash after page transition is complete
              gsap.to({}, {
                duration: 0.2,
                onUpdate: () => setFlashIntensity(prev => Math.max(0, prev - 0.02)),
                onComplete: () => setFlashIntensity(0)
              });
            }
          });
        }
      });
    }, 1500);
  };

  // Function to return to home page
  const goToHomePage = () => {
    if (isTransitioning || currentPage === "home") return;
    
    setIsTransitioning(true);
    
    // Create white flash effect exactly at the moment of transition
    gsap.to({}, {
      duration: 0.3,
      onStart: () => setFlashIntensity(0.8),
      onComplete: () => {
        // Transition back to matrix background
        gsap.to(".matrix-canvas", {
          duration: 1.5,
          opacity: 1,
          onComplete: () => {
            setCurrentPage("home");
            setIsTransitioning(false);
            setCurrentAction("Idle");
            setIsZoomingOut(true)
            // Fade out the white flash after page transition is complete
            gsap.to({}, {
              duration: 0.5,
              onUpdate: () => setFlashIntensity(prev => Math.max(0, prev - 0.03)),
              onComplete: () => setFlashIntensity(0)
            });
          }
        });
      }
    });
  };

  // Handle scroll for second page sections
  useEffect(() => {
    if (currentPage !== "second") return;

    const handleScroll = () => {
      const scrollContainer = secondPageRef.current;
      if (!scrollContainer) return;

      const scrollPosition = scrollContainer.scrollTop;
      const sectionHeight = scrollContainer.clientHeight;
      const currentSection = Math.floor(scrollPosition / sectionHeight);

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        
        // Update avatar position and action based on the current section
        if (sections[currentSection]) {
          setCurrentAction(sections[currentSection].avatarAction);
        }
      }
    };

    const scrollContainer = secondPageRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [currentPage, activeSection]);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Black overlay for transition */}
      <div 
        className={`absolute top-0 left-0 w-full h-full z-5 transition-opacity duration-1000 ${
          currentPage === "second" ? "bg-black" : "bg-transparent"
        }`}
      />

      {/* White flash overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-25 pointer-events-none"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${flashIntensity})`,
          transition: "background-color 0.1s ease-out"
        }}
      />

      {/* 3D Scene */}
      <Canvas className="absolute top-0 left-0 w-full h-full z-10">
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 1]} color="#0F0" intensity={2} />
        <pointLight position={[0, 2, 2]} color="#0F0" intensity={0.3} />

        <group position={currentPage === "second" ? sections[activeSection]?.avatarPosition || [0, -3, 0] : [0, -1, 0]}>
          <Avatar
            currentAction={currentAction}
            onClick={() => setCurrentAction("Idle")}
          />
          {currentPage === "home" && (
            <>
              <FloatingLabel isTransitioning={isTransitioning} currentPage={currentPage} />
              <FloatingTechIcons />
            </>
          )}
        </group>

        <OrbitControls enableDamping={false} enableZoom={true} enablePan={true} />

        <CameraController currentAction={currentAction} isZoomingOut={isZoomingOut} /> 
      </Canvas>

      {/* UI Buttons */}
      <div className="absolute gap-2 top-2 left-1/2 -translate-x-1/2 flex bg-black/70 p-4 rounded-lg z-20 border border-green-400/30">
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
<<<<<<< HEAD
          Laugh
=======
          laugh
>>>>>>> 5eb3242cbe0a9868eeda80def5200d2adde9e97f
        </button>
        <button
          className="px-4 py-2 bg-green-400/20 text-green-400 rounded hover:bg-green-400/30 transition"
          onClick={() => setCurrentAction("Bow")}
        >
          Kon'nichiwa
        </button>
        <button
          className="px-4 py-2 bg-green-400/20 text-green-400 rounded hover:bg-green-400/30 transition"
          onClick={() => setCurrentAction("kick")}
        >
          Break Matrix
        </button>
        
        {/* Navigation Button */}
        <button
          className="px-4 py-2 bg-blue-400/20 text-blue-400 rounded hover:bg-blue-400/30 transition"
          onClick={currentPage === "home" ? goToSecondPage : goToHomePage}
          disabled={isTransitioning}
        >
          {currentPage === "home" ? "Go to Portfolio" : "Return Home"}
        </button>
      </div>

      {/* Projects Panel */}
      {showProjects && (
        <div className="absolute top-5 right-5 bg-black/80 p-4 rounded-lg z-20 border border-green-400/30 w-72 backdrop-blur-sm">
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
        </div>
      )}

      {/* Second Page Content with Scrollable Sections */}
      {currentPage === "second" && (
        <div 
          ref={secondPageRef}
          className="absolute top-0 left-0 w-full h-full z-15 overflow-y-auto scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="h-screen flex flex-col justify-center items-center px-10 text-center"
              style={{ 
                opacity: activeSection === index ? 1 : 0.3,
                transition: 'opacity 0.5s ease'
              }}
            >
              <h2 className="text-4xl font-bold text-green-400 mb-6">{section.title}</h2>
              <p className="text-xl text-gray-300 max-w-2xl">{section.content}</p>
              
              {/* Section indicator */}
              <div className="fixed right-10 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                {sections.map((_, i) => (
                  <button
                    key={i}
                    className={`w-4 h-4 rounded-full border border-green-400 transition-all ${
                      activeSection === i ? 'bg-green-400 scale-125' : 'bg-transparent'
                    }`}
                    onClick={() => {
                      secondPageRef.current.scrollTo({
                        top: i * window.innerHeight,
                        behavior: 'smooth'
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add some global styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .matrix-canvas {
          transition: opacity 1.5s ease-in-out;
        }
        
        /* Hide scrollbar for second page but keep functionality */
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
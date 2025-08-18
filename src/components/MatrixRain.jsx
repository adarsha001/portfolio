import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to display
    const letters = "アァイィウヴエオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const lettersArr = letters.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize; // number of columns
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1; // start at row 1
    }

    const draw = () => {
      // Fade the background
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // green text
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = lettersArr[Math.floor(Math.random() * lettersArr.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Use GSAP ticker instead of setInterval
    gsap.ticker.add(draw);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(draw);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-black"
    />
  );
};

export default MatrixRain;

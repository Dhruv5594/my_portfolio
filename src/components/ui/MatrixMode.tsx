"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Terminal } from "lucide-react";

export function MatrixMode() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Listen for custom event from terminal or Konami code
  useEffect(() => {
    const handleToggle = () => setActive((prev) => !prev);
    window.addEventListener("toggle-matrix-mode", handleToggle);

    // Konami code: ↑ ↑ ↓ ↓ ← → ← → b a
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === konamiSequence[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
          setActive((prev) => !prev);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("toggle-matrix-mode", handleToggle);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Matrix rain canvas animation loop
  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01DHRUVPATEL_REACT_NODE_MONGO_PYTHON_AI_ML_CSPIT_BTECH_2028_100+DSA_NPTEL_ELITE_";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#A78BFA"; // Soft glowing violet
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating control bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#0c0c16]/90 border border-violet-500/40 shadow-[0_0_30px_rgba(124,58,237,0.5)] text-xs font-mono text-violet-300 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-violet-400 animate-spin" />
          <span>CYBER MATRIX MODE ACTIVE</span>
          <button
            type="button"
            onClick={() => setActive(false)}
            className="ml-2 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Exit Matrix Mode"
          >
            <X size={12} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

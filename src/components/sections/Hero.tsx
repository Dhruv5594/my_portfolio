"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { personal, socialLinks } from "@/data/portfolio";
import dynamic from "next/dynamic";

// Lazy load the 3D scene (avoids SSR issues with WebGL)
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

// Animated word cycle
function RoleCycler() {
  const roles = personal.taglines;
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const letterRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    let current = 0;

    const setText = (text: string) => {
      if (!containerRef.current) return;
      containerRef.current.textContent = text;
    };

    const cycle = () => {
      current = (current + 1) % roles.length;
      // Fade out
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.transform = "translateY(-8px)";
      }
      setTimeout(() => {
        setText(roles[current]);
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
          containerRef.current.style.transform = "translateY(0)";
        }
      }, 300);
    };

    const interval = setInterval(cycle, 2800);
    return () => clearInterval(interval);
  }, [roles]);

  return (
    <span
      ref={containerRef}
      className="text-violet-400 inline-block transition-all duration-300"
      style={{ opacity: 1, transform: "translateY(0)" }}
    >
      {roles[0]}
    </span>
  );
}

// Staggered text reveal for "Hi, I'm Dhruv Patel"
const titleWords = ["Hi,", "I'm", "Dhruv", "Patel"];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0F]"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── Left: Text Content ─────────────────────────────── */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-900/30 border border-violet-700/40 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs font-mono text-violet-300">Available for opportunities</span>
            </motion.div>

            {/* Main headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              {titleWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-4 text-white"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Role cycler */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6 }}
              className="font-display text-2xl sm:text-3xl font-semibold text-white/70"
            >
              Aspiring <RoleCycler />
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-white/50 text-lg leading-relaxed max-w-md"
            >
              {personal.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group relative px-7 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={personal.resume}
                download="Dhruv_Patel_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 border border-white/20 hover:border-violet-500/60 text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-violet-900/20"
              >
                Download Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex items-center gap-1"
            >
              {[
                { href: personal.github, icon: FaGithub, label: "GitHub" },
                { href: personal.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
                { href: `mailto:${personal.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-white/40 hover:text-violet-400 hover:bg-violet-900/20 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D Scene ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="order-1 lg:order-2 relative h-[340px] sm:h-[420px] lg:h-[560px]"
          >
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-violet-600/8 rounded-3xl blur-3xl" />
            <HeroScene />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-xs font-mono text-white/20 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-white/25" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

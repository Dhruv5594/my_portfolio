"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { MapPin, GraduationCap, Code2 } from "lucide-react";
import { personal, stats } from "@/data/portfolio";
import { useInView, useCounter } from "@/hooks/useInteractions";

// Animated stat counter card
function StatCard({ label, value }: { label: string; value: number }) {
  const { ref, inView } = useInView();
  const count = useCounter(value, 1800, inView);
  const isYear = value > 1000;

  return (
    <div ref={ref} className="text-center p-4 bg-white/3 border border-white/8 rounded-2xl">
      <div className="font-display text-3xl font-bold text-white tabular-nums">
        {isYear ? (inView ? value : "----") : (
          <>
            {count}
            <span className="text-violet-400">+</span>
          </>
        )}
      </div>
      <div className="mt-1 text-xs text-white/50 font-medium">{label}</div>
    </div>
  );
}

export function AboutSection() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-violet-700/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">About Me</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            The Story So Far
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* ── Left: Story text ───────────────────────────────── */}
          <motion.div
            ref={sectionRef}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.p variants={childVariants} className="text-white/70 text-lg leading-relaxed">
              I'm <span className="text-white font-semibold">Dhruvkumar Patel</span>, a 3rd-year
              Information Technology student at{" "}
              <span className="text-violet-400 font-semibold">CSPIT — Chandubhai S. Patel
              Institute of Technology</span>, Anand, Gujarat.
            </motion.p>
            <motion.p variants={childVariants} className="text-white/60 leading-relaxed">
              I'm a Software Developer with hands-on experience in programming, DSA, and
              full-stack development. I love problem-solving and building reliable software
              — from designing systems on paper to shipping them in production.
            </motion.p>
            <motion.p variants={childVariants} className="text-white/60 leading-relaxed">
              I've built full-stack solutions like <span className="text-white/80 font-medium">FarmEase</span>, event ticketing platforms like <span className="text-white/80 font-medium">EventHub</span>, and intelligent systems like <span className="text-white/80 font-medium">MediScan AI</span>, while
              actively practicing competitive programming with 100+ DSA problems solved.
              Always exploring, always building.
            </motion.p>

            {/* Quick info pills */}
            <motion.div variants={childVariants} className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: MapPin, text: "Anand, Gujarat" },
                { icon: GraduationCap, text: "CSPIT, 2028" },
                { icon: Code2, text: "100+ Problems Solved" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white/4 border border-white/8 rounded-full text-sm text-white/60"
                >
                  <Icon size={13} className="text-violet-400 shrink-0" />
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Photo + Stats ──────────────────────────── */}
          <div className="space-y-8">
            {/* Tilt card photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: tilt.x === 0 ? "transform 0.5s ease" : "transform 0.05s",
                }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border border-violet-500/30 shadow-2xl shadow-violet-900/40 cursor-pointer"
              >
                {/* Glassmorphism frame overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none z-10 rounded-3xl" />
                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl pointer-events-none z-10" />

                {/* Placeholder avatar — replace with real photo */}
                <div className="w-full h-full bg-gradient-to-br from-violet-900/60 to-[#0A0A0F] flex items-center justify-center">
                  <span className="font-display text-7xl font-bold text-violet-400/40">D</span>
                </div>
                {/* If you have a photo, uncomment below and comment out the div above: */}
                {/* <Image src="/your-photo.jpg" alt="Dhruv Patel" fill className="object-cover" /> */}
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Brain, Code2 } from "lucide-react";
import { skills, techLogos } from "@/data/portfolio";

const iconMap = { Monitor, Server, Brain, Code2 };

// Skill bar with animated fill
function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-white/75 font-medium">{name}</span>
        <span className="font-mono text-xs text-violet-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
        />
      </div>
    </div>
  );
}

// Marquee logo strip
function TechMarquee() {
  const doubled = [...techLogos, ...techLogos];
  return (
    <div className="relative overflow-hidden py-4">
      {/* Left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-6 w-max"
      >
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="shrink-0 px-4 py-2 bg-white/4 border border-white/8 rounded-lg text-sm font-mono text-white/50 hover:text-violet-400 hover:border-violet-500/30 transition-colors cursor-default"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/6 rounded-full blur-[120px]" />
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
          <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">Skills</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            My Toolkit
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            A curated set of technologies I use to build exceptional digital experiences.
          </p>
        </motion.div>

        {/* Skill category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {skills.map((cat, catIdx) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Monitor;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1, duration: 0.6 }}
                className="group relative p-6 bg-white/[0.03] border border-white/8 hover:border-violet-500/30 rounded-2xl transition-all duration-300 hover:bg-violet-950/20 overflow-hidden"
              >
                {/* Card glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                {/* Category icon + title */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 flex items-center justify-center bg-violet-900/40 border border-violet-700/30 rounded-xl">
                    <Icon size={16} className="text-violet-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-sm">{cat.category}</h3>
                </div>

                {/* Skill bars */}
                <div className="space-y-4">
                  {cat.items.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-center text-xs font-mono text-white/25 uppercase tracking-widest mb-4">
            Technologies I work with
          </p>
          <TechMarquee />
        </motion.div>
      </div>
    </section>
  );
}

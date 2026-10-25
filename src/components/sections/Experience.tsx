"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience, education } from "@/data/portfolio";
import type { TimelineEntry } from "@/types";

const iconMap = { Briefcase, GraduationCap };

function TimelineItem({
  entry,
  index,
  isLast,
}: {
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
}) {
  const Icon = iconMap[entry.icon as keyof typeof iconMap] ?? Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, x: -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.13, duration: 0.55, ease: "easeOut" }}
      className="relative flex gap-5"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[18px] top-10 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
      )}

      {/* Icon node */}
      <div
        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border-2 z-10 mt-0.5"
        style={{ backgroundColor: `${entry.color}15`, borderColor: `${entry.color}50` }}
      >
        <Icon size={14} style={{ color: entry.color }} />
      </div>

      {/* Content card */}
      <div className="flex-1 pb-10">
        <div className="group p-5 bg-white/[0.03] border border-white/8 hover:border-violet-500/20 rounded-2xl transition-all duration-300 hover:bg-violet-950/10">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-display font-bold text-white text-base leading-snug">
                {entry.title}
              </h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: entry.color }}>
                {entry.organization}
              </p>
            </div>
            <span className="text-xs font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded-full shrink-0">
              {entry.period}
            </span>
          </div>

          {entry.location && (
            <p className="text-xs text-white/30 mb-2 font-mono">📍 {entry.location}</p>
          )}

          <p className="text-sm text-white/55 leading-relaxed">{entry.description}</p>

          {entry.skills && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {entry.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-0.5 rounded-md"
                  style={{
                    background: `${entry.color}15`,
                    color: entry.color,
                    border: `1px solid ${entry.color}30`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-700/5 rounded-full blur-[100px]" />
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
          <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">Journey</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Experience & Education
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-16">
          {/* Experience */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-white/30 uppercase tracking-widest mb-8 flex items-center gap-2"
            >
              <Briefcase size={12} className="text-violet-400" />
              Work Experience
            </motion.p>
            {experience.map((entry, i) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                index={i}
                isLast={i === experience.length - 1}
              />
            ))}
          </div>

          {/* Education */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-mono text-xs text-white/30 uppercase tracking-widest mb-8 flex items-center gap-2"
            >
              <GraduationCap size={12} className="text-cyan-400" />
              Education
            </motion.p>
            {education.map((entry, i) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                index={i}
                isLast={i === education.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

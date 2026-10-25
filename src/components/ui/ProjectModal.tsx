"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[81] bg-[#0E0E16] border border-violet-900/30 rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Hero banner */}
            <div
              className="h-48 md:h-64 shrink-0 flex items-center justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${project.color}20 0%, #0A0A0F 100%)` }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, ${project.color} 0%, transparent 70%)`,
                }}
              />
              <h2 className="relative font-display text-4xl md:text-6xl font-bold text-white/90 tracking-tight">
                {project.title}
              </h2>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Tagline + category */}
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full border"
                    style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}
                  >
                    {project.category}
                  </span>
                  <span className="text-white/50 text-sm">{project.tagline}</span>
                </div>

                {/* Long description */}
                <p className="text-white/70 leading-relaxed">{project.longDescription}</p>

                {/* Tech stack */}
                <div>
                  <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-sm px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-all"
                  >
                    <FaGithub size={16} /> View on GitHub
                  </a>
                  {project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                      style={{ background: project.color }}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

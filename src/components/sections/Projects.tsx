"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/portfolio";
import { ProjectModal } from "@/components/ui/ProjectModal";
import type { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex flex-col bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
      >
        {/* Project image area */}
        <div
          className="relative h-48 sm:h-52 flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}18 0%, #0E0E16 100%)` }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${project.color}25 0%, transparent 70%)`,
            }}
          />

          {/* Title badge in card image area */}
          <div
            className="relative font-display text-5xl font-bold opacity-10 select-none transition-all duration-500 group-hover:opacity-20 group-hover:scale-110"
            style={{ color: project.color }}
          >
            {project.title.charAt(0)}
          </div>

          {/* Category tag */}
          <span
            className="absolute top-3 left-3 text-[11px] font-mono px-2.5 py-1 rounded-full border"
            style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}12` }}
          >
            {project.category}
          </span>

          {/* Quick action buttons */}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={() => setSelected(project)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm text-white font-medium hover:bg-white/20 transition-colors"
            >
              <Eye size={14} /> Preview
            </button>
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 space-y-4">
          <div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block group/title"
              onClick={(e) => e.stopPropagation()}
              title="Open GitHub Repository"
            >
              <h3 className="font-display text-xl font-bold text-white group-hover/title:text-violet-400 transition-colors flex items-center gap-1.5">
                {project.title}
                <span className="text-xs text-white/30 group-hover/title:text-violet-400 transition-colors">↗</span>
              </h3>
            </a>
            <p className="mt-1.5 text-sm text-white/50 line-clamp-2">{project.description}</p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-md text-white/50"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs px-2.5 py-0.5 text-white/30">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>

          {/* Link buttons */}
          <div className="flex items-center gap-2 pt-1 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-lg transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={13} /> Code
            </a>
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/70 hover:text-violet-400 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-lg transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={13} /> Live
              </a>
            )}
            <button
              onClick={() => setSelected(project)}
              className="ml-auto text-xs text-violet-400/80 hover:text-violet-300 font-medium transition-colors cursor-pointer"
            >
              Details →
            </button>
          </div>
        </div>
      </motion.article>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-700/5 rounded-full blur-[150px]" />
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
          <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">Projects</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Things I've Built
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            A collection of projects that showcase my skills across the stack — from full-stack apps to AI systems.
          </p>
        </motion.div>

        {/* Project cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Dhruv5594"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-violet-400 transition-colors border border-white/10 hover:border-violet-500/30 rounded-xl px-5 py-2.5"
          >
            <FaGithub size={15} /> See all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

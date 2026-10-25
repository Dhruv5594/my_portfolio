"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { personal } from "@/data/portfolio";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo + copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="font-display text-lg font-bold text-white/80">
              Dhruv<span className="text-violet-400">.</span>
            </span>
            <span className="text-sm text-white/25">
              © 2026 Dhruv Patel. Built with Next.js & ❤️
            </span>
          </div>

          {/* Social + Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 flex items-center justify-center text-white/35 hover:text-violet-400 transition-colors"
            >
              <FaGithub size={15} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 flex items-center justify-center text-white/35 hover:text-violet-400 transition-colors"
            >
              <FaLinkedinIn size={15} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="w-8 h-8 flex items-center justify-center text-white/35 hover:text-violet-400 transition-colors"
            >
              <Mail size={16} />
            </a>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-1" />

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-1.5 text-xs text-white/35 hover:text-violet-400 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
              <span className="hidden sm:inline">Top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

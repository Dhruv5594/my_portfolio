"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, X } from "lucide-react";
import { useCommandPalette } from "@/hooks/useCommandPalette";

export function CommandPalette() {
  const { open, setOpen, query, setQuery, filtered } = useCommandPalette();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Palette modal */}
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[9991] w-full max-w-lg bg-[#12121A] border border-violet-900/40 rounded-2xl shadow-2xl shadow-violet-900/20 overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
              <Search size={16} className="text-white/40 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
              />
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/70 transition-colors">
                <X size={15} />
              </button>
            </div>

            {/* Command list */}
            <ul className="py-2 max-h-72 overflow-y-auto">
              {filtered.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-white/30">
                  No commands found
                </li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id}>
                  <button
                    onClick={cmd.action}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-violet-600/10 transition-colors text-left group"
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-md bg-white/5 text-white/40 group-hover:text-violet-400 transition-colors text-xs shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/90 truncate">{cmd.label}</p>
                      {cmd.description && (
                        <p className="text-xs text-white/40 truncate">{cmd.description}</p>
                      )}
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-violet-400 transition-colors shrink-0" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer hint */}
            <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-4 text-[11px] text-white/25">
              <span><kbd className="font-mono bg-white/5 px-1.5 py-0.5 rounded">↵</kbd> Select</span>
              <span><kbd className="font-mono bg-white/5 px-1.5 py-0.5 rounded">ESC</kbd> Close</span>
              <span><kbd className="font-mono bg-white/5 px-1.5 py-0.5 rounded">⌘K</kbd> Toggle</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

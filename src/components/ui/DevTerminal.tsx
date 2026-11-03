"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Maximize2, Minimize2, Copy, Check, Sparkles, CornerDownLeft } from "lucide-react";
import { personal, projects, skills, education, certifications, stats } from "@/data/portfolio";

type OutputLine = {
  id: string;
  type: "input" | "output" | "error" | "system" | "success";
  text?: string;
  jsx?: React.ReactNode;
};

const BANNER = `
   ____  __                     ____        __       __
  / __ \\/ /_  _______  ___   __/ __ \\____ _/ /____  / /
 / / / / __ \\/ ___/ / / / | / / /_/ / __ \`/ __/ _ \\/ / 
/ /_/ / / / / /  / /_/ /| |/ / ____/ /_/ / /_/  __/ /  
\\____/_/ /_/_/   \\__,_/ |___/_/    \\__,_/\\__/\\___/_/   
                                                       
Welcome to Dhruv's Portfolio Shell v2.4 (x86_64-pc-none)
Type 'help' to see available commands, or 'projects' to inspect code.
`;

export function DevTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<OutputLine[]>([
    { id: "banner", type: "system", text: BANNER },
  ]);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Global keyboard shortcut to toggle terminal (` or Ctrl+`)
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "`" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        // Only if not focused on another form element
        const tag = (document.activeElement?.tagName || "").toLowerCase();
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, output]);

  const copyTerminalOutput = () => {
    const textToCopy = output
      .map((line) => line.text || "")
      .filter(Boolean)
      .join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const inputLine: OutputLine = {
      id: "in_" + Date.now(),
      type: "input",
      text: `dhruv@portfolio:~$ ${trimmed}`,
    };

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let resultLines: OutputLine[] = [];

    switch (command) {
      case "help":
        resultLines = [
          {
            id: "help_" + Date.now(),
            type: "output",
            text:
              "AVAILABLE COMMANDS:\n" +
              "  about         Show Dhruv's biography, background and current status\n" +
              "  skills        List core technical proficiencies and languages\n" +
              "  projects      Display featured engineering projects & GitHub repos\n" +
              "  project <id>  Inspect specific project (farmease | eventhub | mediscan)\n" +
              "  education     View degree, university, CGPA and school scores\n" +
              "  certs         List verified certifications (NPTEL, Java, AICTE, IBM)\n" +
              "  stats         Display metrics, problems solved and experience\n" +
              "  resume        Download Dhruv's official single-page CV (PDF)\n" +
              "  contact       Show email, WhatsApp, phone and location details\n" +
              "  clear         Clear the terminal screen\n" +
              "  matrix        Toggle digital cyber rain aesthetic\n" +
              "  sudo hire     Initiate fast-track hiring protocol (Secret)\n" +
              "  exit          Close this terminal window",
          },
        ];
        break;

      case "about":
        resultLines = [
          {
            id: "about_" + Date.now(),
            type: "output",
            text:
              `NAME:     ${personal.fullName} (${personal.name})\n` +
              `ROLE:     ${personal.role} | Aspiring Full-Stack & AI Engineer\n` +
              `COLLEGE:  CSPIT — Charotar University of Science & Technology (CHARUSAT)\n` +
              `STATUS:   3rd Year B.Tech IT | Graduating Class of 2028\n` +
              `LOCATION: ${personal.location}\n` +
              `BIO:      ${personal.bio}`,
          },
        ];
        break;

      case "skills":
        const skillText = skills
          .map(
            (cat) =>
              `[${cat.category.toUpperCase()}]\n` +
              cat.items.map((s) => `  • ${s.name.padEnd(16)} [${"#".repeat(Math.floor(s.level / 10))}${".".repeat(10 - Math.floor(s.level / 10))}] ${s.level}%`).join("\n")
          )
          .join("\n\n");
        resultLines = [{ id: "skills_" + Date.now(), type: "output", text: skillText }];
        break;

      case "projects":
        const projText = projects
          .map(
            (p, idx) =>
              `${idx + 1}. ${p.title} (${p.category})\n` +
              `   Tagline: ${p.tagline}\n` +
              `   Tech:    ${p.tech.join(", ")}\n` +
              `   GitHub:  ${p.github}\n`
          )
          .join("\n");
        resultLines = [
          {
            id: "proj_" + Date.now(),
            type: "output",
            text: `FEATURED REPOSITORIES:\n\n${projText}\nTip: Type 'project farmease' or 'project eventhub' for architecture details.`,
          },
        ];
        break;

      case "project":
        const target = args[0]?.toLowerCase();
        const found = projects.find((p) => p.id.toLowerCase().includes(target || ""));
        if (found) {
          resultLines = [
            {
              id: "pdetail_" + Date.now(),
              type: "output",
              text:
                `=== ${found.title.toUpperCase()} ===\n` +
                `Category:    ${found.category}\n` +
                `Description: ${found.longDescription}\n` +
                `Stack:       ${found.tech.join(" · ")}\n` +
                `Repository:  ${found.github}`,
            },
          ];
        } else {
          resultLines = [
            {
              id: "perr_" + Date.now(),
              type: "error",
              text: `Project '${args[0] || ""}' not found. Available: farmease, eventhub, mediscan-ai`,
            },
          ];
        }
        break;

      case "education":
        const eduText = education
          .map(
            (e) =>
              `• ${e.title} (${e.period})\n` +
              `  Institution: ${e.organization}\n` +
              `  Details:     ${e.description}\n`
          )
          .join("\n");
        resultLines = [{ id: "edu_" + Date.now(), type: "output", text: eduText }];
        break;

      case "certs":
      case "certifications":
        const certText = certifications
          .map(
            (c, i) =>
              `${i + 1}. ${c.title} [${c.badge}]\n` +
              `   Issuer: ${c.issuer} (${c.date})\n` +
              `   Detail: ${c.description}\n`
          )
          .join("\n");
        resultLines = [{ id: "cert_" + Date.now(), type: "output", text: certText }];
        break;

      case "stats":
        const statText = stats.map((s) => `• ${s.label.padEnd(20)}: ${s.value}`).join("\n");
        resultLines = [{ id: "stats_" + Date.now(), type: "output", text: `CORE METRICS:\n${statText}\n• DSA Focus: 100+ LeetCode/Coding Problems Solved` }];
        break;

      case "resume":
      case "cv":
        window.open("/resume.pdf", "_blank");
        resultLines = [
          {
            id: "res_" + Date.now(),
            type: "success",
            text: "Opening Dhruv's single-page CV in a new tab... (Download triggered)",
          },
        ];
        break;

      case "contact":
        resultLines = [
          {
            id: "contact_" + Date.now(),
            type: "output",
            text:
              `Email:     ${personal.email}\n` +
              `Phone:     ${personal.phone}\n` +
              `WhatsApp:  https://wa.me/919427376141\n` +
              `GitHub:    ${personal.github}\n` +
              `LinkedIn:  ${personal.linkedin}\n` +
              `Location:  ${personal.location}`,
          },
        ];
        break;

      case "clear":
      case "cls":
        setOutput([]);
        setInput("");
        return;

      case "sudo":
        if (args.join(" ").toLowerCase() === "hire" || args.join(" ").toLowerCase() === "hire dhruv") {
          resultLines = [
            {
              id: "hire_" + Date.now(),
              type: "success",
              text:
                "🎉 [ACCESS GRANTED]: Fast-Track Hiring Protocol Initialized!\n" +
                "Dhruv Patel has received your authorization.\n" +
                "Direct line: +91 9427376141 (WhatsApp) | dhruvdhruv5594@gmail.com\n" +
                "Let's build extraordinary software together!",
            },
          ];
        } else {
          resultLines = [
            {
              id: "sudo_err_" + Date.now(),
              type: "error",
              text: `sudo: '${args.join(" ")}' command not found. Try 'sudo hire'`,
            },
          ];
        }
        break;

      case "matrix":
        window.dispatchEvent(new CustomEvent("toggle-matrix-mode"));
        resultLines = [
          {
            id: "matrix_" + Date.now(),
            type: "success",
            text: "[SYSTEM]: Cyber matrix stream toggled on the background canvas.",
          },
        ];
        break;

      case "exit":
      case "quit":
        setIsOpen(false);
        return;

      default:
        resultLines = [
          {
            id: "err_" + Date.now(),
            type: "error",
            text: `Command not found: '${trimmed}'. Type 'help' to view all available commands.`,
          },
        ];
        break;
    }

    setOutput((prev) => [...prev, inputLine, ...resultLines]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const available = ["help", "about", "skills", "projects", "education", "certs", "stats", "resume", "contact", "clear", "sudo hire", "matrix"];
      const match = available.find((c) => c.startsWith(input.trim().toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <>
      {/* ── Fixed Floating Terminal Launcher Pill ───────────────── */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          title="Open Developer Console (Press `)"
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0e0e18]/90 hover:bg-[#161626] border border-violet-500/30 hover:border-violet-400 text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all cursor-pointer"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Terminal size={14} className="text-violet-400 group-hover:text-violet-300 transition-colors" />
          <span className="font-mono text-xs text-white/80 group-hover:text-white">
            terminal <span className="text-violet-400/80">~</span>
          </span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/40 border border-white/10">
            `
          </kbd>
        </button>
      </div>

      {/* ── Terminal Window Modal ───────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={`bg-[#0a0a12]/98 border border-violet-500/30 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(124,58,237,0.2)] flex flex-col overflow-hidden transition-all duration-300 ${
                isMaximized ? "w-full h-full rounded-none" : "w-full max-w-3xl h-[560px] max-h-[90vh]"
              }`}
            >
              {/* Window Titlebar */}
              <div className="px-4 py-3 bg-[#11111e] border-b border-white/10 flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-3 h-3 rounded-full bg-rose-500 hover:brightness-110 cursor-pointer"
                      title="Close"
                    />
                    <button
                      type="button"
                      onClick={() => setIsMaximized(!isMaximized)}
                      className="w-3 h-3 rounded-full bg-amber-500 hover:brightness-110 cursor-pointer"
                      title="Minimize / Maximize"
                    />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 cursor-default" />
                  </div>
                  <div className="ml-3 flex items-center gap-1.5 font-mono text-xs text-white/60">
                    <Terminal size={13} className="text-violet-400" />
                    <span>dhruv@portfolio: ~/terminal-v2</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyTerminalOutput}
                    className="p-1 rounded text-white/40 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title="Copy Output"
                  >
                    {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="p-1 rounded text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div
                className="flex-1 overflow-y-auto p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-white/90 space-y-2.5 selection:bg-violet-600/40 selection:text-white"
                onClick={() => inputRef.current?.focus()}
              >
                {output.map((line) => {
                  if (line.type === "input") {
                    return (
                      <div key={line.id} className="text-violet-300 font-semibold flex items-center gap-1">
                        <span>{line.text}</span>
                      </div>
                    );
                  }
                  if (line.type === "system") {
                    return (
                      <pre key={line.id} className="text-violet-400/90 font-mono text-[11px] sm:text-xs leading-none whitespace-pre overflow-x-auto py-1">
                        {line.text}
                      </pre>
                    );
                  }
                  if (line.type === "error") {
                    return (
                      <div key={line.id} className="text-rose-400 whitespace-pre-wrap">
                        {line.text}
                      </div>
                    );
                  }
                  if (line.type === "success") {
                    return (
                      <div key={line.id} className="text-emerald-400 whitespace-pre-wrap font-medium">
                        {line.text}
                      </div>
                    );
                  }
                  return (
                    <div key={line.id} className="text-white/80 whitespace-pre-wrap">
                      {line.text}
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>

              {/* Quick Command Suggestions */}
              <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[11px] font-mono text-white/30 uppercase tracking-wider shrink-0">Quick:</span>
                {["help", "projects", "skills", "about", "education", "certs", "sudo hire", "clear"].map((qCmd) => (
                  <button
                    key={qCmd}
                    type="button"
                    onClick={() => {
                      executeCommand(qCmd);
                    }}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/40 text-[11px] font-mono text-white/60 hover:text-violet-200 transition-colors shrink-0 cursor-pointer"
                  >
                    {qCmd}
                  </button>
                ))}
              </div>

              {/* Command Prompt Input */}
              <div className="p-3 sm:p-4 bg-[#090910] border-t border-white/10 flex items-center gap-2 font-mono text-xs sm:text-[13px]">
                <span className="text-emerald-400 font-bold shrink-0">dhruv@portfolio</span>
                <span className="text-white/40 shrink-0">:</span>
                <span className="text-violet-400 font-bold shrink-0">~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command ('help', 'projects', 'resume')..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/20 font-mono caret-violet-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => executeCommand(input)}
                  disabled={!input.trim()}
                  className="p-1 text-white/30 hover:text-violet-300 disabled:opacity-20 cursor-pointer"
                >
                  <CornerDownLeft size={13} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

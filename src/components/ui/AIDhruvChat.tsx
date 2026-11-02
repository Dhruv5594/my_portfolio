"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  Minimize2,
  Mail,
  Code2,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { FaWhatsapp, FaGithub } from "react-icons/fa";
import { personal, projects, education, skills, certifications } from "@/data/portfolio";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actions?: { label: string; href?: string; onClick?: () => void; icon?: string }[];
};

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  sender: "bot",
  text: "Hey there! 👋 I'm **AI Dhruv**, Dhruv Patel's interactive portfolio copilot. \n\nI can answer questions about his **full-stack projects**, **AI/ML experience**, **education at CSPIT**, or why he'd be an exceptional fit for your team. What would you like to explore?",
  timestamp: "Just now",
  actions: [
    { label: "🚀 Why hire Dhruv?", onClick: () => {} },
    { label: "🌾 FarmEase Project", onClick: () => {} },
    { label: "🎫 EventHub System", onClick: () => {} },
    { label: "🩺 MediScan AI", onClick: () => {} },
  ],
};

const SUGGESTIONS = [
  "🚀 Why hire Dhruv?",
  "💻 Tech stack & skills",
  "🌾 How was FarmEase built?",
  "🎫 Explain EventHub & inventory",
  "🩺 What is MediScan AI?",
  "🎓 Education & CGPA",
  "🏆 Certifications & NPTEL",
  "📞 How can I contact Dhruv?",
];

export function AIDhruvChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadPing, setUnreadPing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadPing(false);
      setHasOpened(true);
    }
  }, [isOpen, messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadPing(false);
  };

  const generateAnswer = (query: string): { text: string; actions?: Message["actions"] } => {
    const q = query.toLowerCase();

    // 1. Why hire Dhruv
    if (q.includes("why hire") || q.includes("hire dhruv") || q.includes("strength") || q.includes("why should we hire")) {
      return {
        text: "**Here's why Dhruv is a standout addition to your software engineering team:**\n\n" +
          "• **Strong CS Fundamentals**: 100+ DSA problems solved, deep understanding of OOP, time/space complexity, and OS concepts (NPTEL Elite certified).\n" +
          "• **End-to-End Execution**: Builds full-stack applications with production-grade practices — such as atomic concurrency checks in EventHub and responsive design in FarmEase.\n" +
          "• **AI & Full-Stack Blend**: Comfortable with both modern web frameworks (React, Next.js, Node.js, Express) and AI/ML workflows (Python, TensorFlow, CNNs).\n" +
          "• **Proactive & Quick Learner**: Completed 6-week AICTE Python internship with Oasis Infobyte and certified in Java FullStack via Coursera.",
        actions: [
          { label: "📄 Download CV", href: "/resume.pdf", icon: "download" },
          { label: "💬 Connect on WhatsApp", href: "https://wa.me/919427376141", icon: "whatsapp" },
        ],
      };
    }

    // 2. FarmEase Project
    if (q.includes("farmease") || q.includes("farm") || q.includes("agriculture")) {
      return {
        text: "**🌾 FarmEase — Smart Agriculture MERN Platform**\n\n" +
          "FarmEase digitizes agricultural management for farming communities. Key engineering highlights:\n\n" +
          "• **Full-Stack MERN Architecture**: React frontend with Node.js/Express REST APIs and MongoDB.\n" +
          "• **Low-Bandwidth Optimization**: Indexed database queries and optimized payload sizes for rural internet conditions.\n" +
          "• **Features**: End-to-end crop cycle tracking, expense logs, real-time weather integration, and direct market connectivity.\n" +
          "• **Security**: JWT-based token authentication and protected API endpoints.",
        actions: [
          { label: "⭐ View on GitHub", href: "https://github.com/Dhruv5594/FarmEase", icon: "github" },
          { label: "📍 Scroll to Projects", onClick: () => scrollToSection("#projects") },
        ],
      };
    }

    // 3. EventHub Project
    if (q.includes("eventhub") || q.includes("ticket") || q.includes("booking") || q.includes("inventory")) {
      return {
        text: "**🎫 EventHub — Full-Stack Ticket Booking System**\n\n" +
          "Built for ITUE301 Advanced Web Development Frameworks using React 18, Vite, Node.js, Express, and MongoDB:\n\n" +
          "• **Race-Condition Safety**: Uses atomic `findOneAndUpdate` with `$gte: quantity` check to guarantee zero ticket overselling without requiring multi-replica transactions.\n" +
          "• **Role-Based Guards**: Protected organizer dashboard via Bearer JWT and role checking middleware.\n" +
          "• **Code Splitting**: Route guards with `React.lazy` + `Suspense` for lightning fast load times.\n" +
          "• **Testing**: Automated end-to-end API test suites using Node's built-in test runner.",
        actions: [
          { label: "⭐ EventHub Repo", href: "https://github.com/Dhruv5594/EventHub_Ticket_Booking_System", icon: "github" },
          { label: "📍 View in Projects", onClick: () => scrollToSection("#projects") },
        ],
      };
    }

    // 4. MediScan AI
    if (q.includes("mediscan") || q.includes("medical") || q.includes("cnn") || q.includes("deep learning") || q.includes("ai")) {
      return {
        text: "**🩺 MediScan AI — Diagnostic Radiology Assistant**\n\n" +
          "An intelligent deep learning medical imaging platform:\n\n" +
          "• **Computer Vision**: Leverages Convolutional Neural Networks (CNN) to detect anomalies in radiographic scans (X-rays).\n" +
          "• **Clinical Confidence**: Calculates anomaly probability scores and generates diagnostic triage summaries.\n" +
          "• **Modular Frontend**: Built with Next.js & React with an interactive AI workspace layout.",
        actions: [
          { label: "⭐ GitHub Profile", href: "https://github.com/Dhruv5594", icon: "github" },
        ],
      };
    }

    // 5. Tech Stack & Skills
    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("react") || q.includes("python")) {
      return {
        text: "**💻 Dhruv's Core Technical Skills:**\n\n" +
          "• **Languages**: JavaScript (ES6+), C, C++, Java, Python, SQL\n" +
          "• **Frontend**: React.js, Next.js (App Router), HTML5, CSS3, Tailwind CSS, Framer Motion\n" +
          "• **Backend & DB**: Node.js, Express.js, MongoDB, Mongoose, MySQL, RESTful APIs, JWT\n" +
          "• **Core CS**: Data Structures & Algorithms, OOP, Database Indexing, Git, GitHub, Vercel",
        actions: [
          { label: "📍 Inspect Skills Section", onClick: () => scrollToSection("#skills") },
        ],
      };
    }

    // 6. Education & CGPA
    if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("cgpa") || q.includes("charusat") || q.includes("cspit") || q.includes("degree")) {
      return {
        text: "**🎓 Academic Background:**\n\n" +
          "• **B.Tech in Information Technology (3rd Year)**\n" +
          "  Chandubhai S. Patel Institute of Technology (CSPIT), CHARUSAT University\n" +
          "  *Current CGPA: 6.5* | *Expected Graduation: 2028*\n\n" +
          "• **Class XII (HSC — Science)**: Chandubhai Vivekanand Vidyalaya, Halvad | GSEB — **90.0%**\n" +
          "• **Class X (SSC)**: S.P Vidyalaya, Halvad | GSEB — **85.0%**",
        actions: [
          { label: "📍 View Timeline", onClick: () => scrollToSection("#experience") },
        ],
      };
    }

    // 7. Certifications
    if (q.includes("cert") || q.includes("nptel") || q.includes("oasis") || q.includes("coursera") || q.includes("board infinity")) {
      return {
        text: "**🏆 Verified Certifications:**\n\n" +
          "1. 🏅 **Elite Operating Systems Course** — NPTEL, IIT Madras (MoE Govt. of India, 60% consolidated score)\n" +
          "2. ☕ **Java FullStack Development** — Board Infinity via Coursera (Specialization in Java, Spring, Backend)\n" +
          "3. 🏆 **Python Programming Internship** — Oasis Infobyte (6-week AICTE OIB-SIP)\n" +
          "4. ⚡ **JavaScript Programming Essentials** — IBM\n" +
          "5. 🧠 **Algorithm Design** — BITS Pilani via Coursera",
        actions: [
          { label: "📍 View Certificates", onClick: () => scrollToSection("#certifications") },
        ],
      };
    }

    // 8. Contact & Hiring
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("whatsapp") || q.includes("reach") || q.includes("interview") || q.includes("location")) {
      return {
        text: "**📬 You can connect directly with Dhruv via:**\n\n" +
          "• **Email**: `dhruvdhruv5594@gmail.com`\n" +
          "• **Phone / WhatsApp**: `+91 9427376141`\n" +
          "• **Location**: Anand / Morbi, Gujarat, India\n" +
          "• **Availability**: Open for software developer internships & technical roles!",
        actions: [
          { label: "💬 Chat on WhatsApp", href: "https://wa.me/919427376141", icon: "whatsapp" },
          { label: "✉️ Send Email", href: "mailto:dhruvdhruv5594@gmail.com", icon: "mail" },
          { label: "📍 Open Contact Form", onClick: () => scrollToSection("#contact") },
        ],
      };
    }

    // 9. Resume
    if (q.includes("resume") || q.includes("cv") || q.includes("profile")) {
      return {
        text: "You can download Dhruv's single-page resume directly below. It includes his full academic background, projects, internship at Oasis Infobyte, and verified certifications.",
        actions: [
          { label: "📄 Download Dhruv's CV", href: "/resume.pdf", icon: "download" },
        ],
      };
    }

    // Fallback friendly reply
    return {
      text: `Dhruv is a 3rd-year IT student at CSPIT (CHARUSAT) specializing in **Full-Stack Web Development (MERN, Next.js)** and **AI/ML** with 100+ DSA problems solved.\n\nCould you specify what you'd like to learn more about?`,
      actions: [
        { label: "🌾 Projects", onClick: () => handleSend("Tell me about your projects") },
        { label: "💻 Skills", onClick: () => handleSend("What are your skills?") },
        { label: "📞 Contact", onClick: () => handleSend("How can I contact Dhruv?") },
      ],
    };
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: "u_" + Date.now(),
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(query);
      const botMsg: Message = {
        id: "b_" + Date.now(),
        sender: "bot",
        text: response.text,
        timestamp: "Just now",
        actions: response.actions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      {/* ── Floating Orb Button (Bottom-Right) ───────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative flex items-center"
            >
              {/* Tooltip bubble (flashes initially) */}
              {unreadPing && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-3.5 whitespace-nowrap bg-[#12121e] border border-violet-500/40 px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.3)] hidden sm:flex items-center gap-2 pointer-events-none"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-medium text-white/90">
                    Ask <strong className="text-violet-300">AI Dhruv</strong> anything
                  </span>
                </motion.div>
              )}

              {/* Glowing Orb Button */}
              <button
                type="button"
                onClick={handleOpen}
                aria-label="Open AI Dhruv Chatbot"
                className="relative group w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(124,58,237,0.8)] transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="w-full h-full rounded-full bg-[#0B0B12] flex items-center justify-center transition-colors group-hover:bg-[#12121f]">
                  <Sparkles size={22} className="text-violet-300 group-hover:rotate-12 transition-transform duration-300" />
                </div>

                {/* Status Dot */}
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0B0B12] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Chat Modal Drawer ─────────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#0c0c16]/95 backdrop-blur-2xl border border-violet-500/25 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(124,58,237,0.2)] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-4 sm:p-4.5 border-b border-white/8 bg-gradient-to-r from-violet-950/40 via-[#111122] to-fuchsia-950/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-500 p-[1.5px] shrink-0">
                    <div className="w-full h-full rounded-full bg-[#0c0c16] flex items-center justify-center">
                      <Bot size={17} className="text-violet-300" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#0c0c16]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-sm text-white leading-none">
                        AI Dhruv
                      </h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        Copilot
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 mt-1">
                      Portfolio assistant · Instant responses
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Reset Conversation"
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    title="Minimize"
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles size={11} className="text-violet-300" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-violet-600 text-white rounded-br-xs shadow-md"
                          : "bg-white/[0.04] border border-white/8 text-white/90 rounded-bl-xs"
                      }`}
                    >
                      <div
                        className="whitespace-pre-line space-y-1.5"
                        dangerouslySetInnerHTML={{
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                            .replace(/•/g, '<span class="text-violet-400 font-bold">•</span>')
                            .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-white/10 font-mono text-[11px] text-violet-300">$1</code>'),
                        }}
                      />

                      {/* Interactive Action Buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-white/8 flex flex-wrap gap-1.5">
                          {msg.actions.map((act, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                if (act.href) {
                                  window.open(act.href, "_blank");
                                } else if (act.onClick) {
                                  act.onClick();
                                } else {
                                  handleSend(act.label);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-500/15 hover:bg-violet-500/25 border border-violet-500/30 text-violet-200 text-[11px] font-medium transition-all cursor-pointer hover:border-violet-400"
                            >
                              {act.icon === "github" && <FaGithub size={11} />}
                              {act.icon === "whatsapp" && <FaWhatsapp size={11} className="text-emerald-400" />}
                              {act.icon === "mail" && <Mail size={11} />}
                              <span>{act.label}</span>
                              {act.href && <ExternalLink size={10} className="opacity-60" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2.5 justify-start items-center">
                    <div className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center shrink-0">
                      <Sparkles size={11} className="text-violet-300 animate-spin" />
                    </div>
                    <div className="bg-white/[0.04] border border-white/8 rounded-2xl rounded-bl-xs px-3.5 py-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Pills */}
              <div className="px-3 py-2 border-t border-white/5 bg-white/[0.01]">
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {SUGGESTIONS.map((sugg, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSend(sugg)}
                      className="shrink-0 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/40 text-[10.5px] text-white/70 hover:text-violet-200 transition-all cursor-pointer whitespace-nowrap"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 border-t border-white/8 bg-[#0a0a10] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI Dhruv a question..."
                  className="flex-1 bg-white/[0.04] border border-white/10 focus:border-violet-500/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Send size={13} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

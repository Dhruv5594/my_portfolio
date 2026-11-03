"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Database,
  Layers,
  ArrowRight,
  Server,
  Zap,
  Code2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

type ArchitectureDetail = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  github: string;
  color: string;
  layers: { name: string; desc: string; tech: string }[];
  challenges: { title: string; solution: string }[];
  metrics: { label: string; value: string }[];
};

const ARCHITECTURE_DATA: Record<string, ArchitectureDetail> = {
  farmease: {
    id: "farmease",
    title: "FarmEase",
    tagline: "Smart Agriculture & Farm Management MERN Platform",
    category: "Full-Stack (MERN)",
    github: "https://github.com/Dhruv5594/FarmEase",
    color: "#10B981",
    layers: [
      {
        name: "Client Presentation",
        desc: "Responsive mobile-first interface optimized for rural farmers with quick actions.",
        tech: "React.js · Tailwind CSS · React Router",
      },
      {
        name: "API & Authentication",
        desc: "Stateless REST API gateway with Bearer JWT token verification and input sanitization.",
        tech: "Node.js · Express.js · JWT · Bcrypt",
      },
      {
        name: "Persistence & Data Layer",
        desc: "Document database with compound indexes on farmerId and cropCycle for sub-50ms lookups.",
        tech: "MongoDB · Mongoose ORM · Compound Indexing",
      },
    ],
    challenges: [
      {
        title: "Rural Low-Bandwidth Connectivity",
        solution:
          "Designed lean JSON payloads and aggressive client-side caching to ensure farmers on 2G/3G connections experience instant navigation without re-fetching static crop data.",
      },
      {
        title: "Dynamic Crop Expense Aggregation",
        solution:
          "Implemented MongoDB aggregation pipelines ($group, $sum, $project) to calculate real-time seasonal yield margins without transferring raw transaction tables to the client.",
      },
    ],
    metrics: [
      { label: "Query Speed", value: "< 45ms" },
      { label: "Network Optimization", value: "68% Leaner" },
      { label: "Auth Layer", value: "JWT + Bcrypt" },
    ],
  },
  eventhub: {
    id: "eventhub",
    title: "EventHub",
    tagline: "Ticket Booking Platform with Concurrency-Safe Inventory",
    category: "Full-Stack (MERN)",
    github: "https://github.com/Dhruv5594/EventHub_Ticket_Booking_System",
    color: "#3B82F6",
    layers: [
      {
        name: "Client & Route Guards",
        desc: "Role-based route guards separating Attendee booking flows from Organizer dashboards.",
        tech: "React 18 · Vite · React.lazy() · Suspense",
      },
      {
        name: "Atomic Booking Engine",
        desc: "Guarantees zero overselling race conditions using single-operation conditional decrements.",
        tech: "Node.js · Express.js · Atomic findOneAndUpdate",
      },
      {
        name: "Automated Test Runner",
        desc: "Comprehensive integration tests verifying health, auth rejection, inventory limits, and cancellation.",
        tech: "Node.js Native Test Runner · Native Fetch",
      },
    ],
    challenges: [
      {
        title: "Race Conditions & Ticket Overselling",
        solution:
          "Instead of prone-to-failure multi-document locks on single-instance databases, implemented atomic 'findOneAndUpdate({ _id, ticketsAvailable: { $gte: qty } }, { $inc: { ticketsAvailable: -qty } })'. This guarantees that simultaneous requests cannot book beyond remaining capacity.",
      },
      {
        title: "Role-Based Route Protection",
        solution:
          "Created modular Express middlewares (authGuard and requireRole) with strict Bearer JWT decoding, ensuring organizer CRUD operations are strictly inaccessible to regular attendees.",
      },
    ],
    metrics: [
      { label: "Overselling Rate", value: "0.00% Safe" },
      { label: "Test Coverage", value: "8/8 Suites Passed" },
      { label: "Architecture", value: "RESTful v1" },
    ],
  },
  "mediscan-ai": {
    id: "mediscan-ai",
    title: "MediScan AI",
    tagline: "Deep Learning Medical Imaging & Diagnostic Radiology Assistant",
    category: "AI & Machine Learning",
    github: "https://github.com/Dhruv5594",
    color: "#7C3AED",
    layers: [
      {
        name: "Image Preprocessing",
        desc: "Grayscale normalization, contrast enhancement, and artifact removal on radiographic X-rays.",
        tech: "Python · OpenCV · NumPy",
      },
      {
        name: "Deep Neural Inference",
        desc: "Convolutional Neural Network (CNN) extracting spatial hierarchical patterns for anomaly detection.",
        tech: "TensorFlow · Keras · Transfer Learning",
      },
      {
        name: "Clinical Workspace UI",
        desc: "Interactive diagnostic visualization displaying confidence probabilities and triage reports.",
        tech: "Next.js · React · Tailwind CSS",
      },
    ],
    challenges: [
      {
        title: "Radiographic Scan Noise & Variation",
        solution:
          "Constructed custom preprocessing pipelines with histogram equalization and data augmentation to handle varying exposure levels across hospital imaging machines.",
      },
      {
        title: "Interpretability & Confidence Scoring",
        solution:
          "Designed probabilistic thresholding to output clear confidence percentiles, helping clinicians distinguish between ambiguous artifacts and high-confidence pathological findings.",
      },
    ],
    metrics: [
      { label: "Model Architecture", value: "Custom CNN" },
      { label: "Inference Latency", value: "< 120ms" },
      { label: "Precision Target", value: "High Triage" },
    ],
  },
};

export function ProjectArchitectureModal({
  projectId,
  onClose,
}: {
  projectId: string | null;
  onClose: () => void;
}) {
  if (!projectId || !ARCHITECTURE_DATA[projectId]) return null;

  const data = ARCHITECTURE_DATA[projectId];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="w-full max-w-3xl max-h-[90vh] bg-[#0c0c16] border border-violet-500/30 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(124,58,237,0.15)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/8 bg-gradient-to-r from-violet-950/40 via-[#0e0e18] to-transparent flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"
                style={{ backgroundColor: `${data.color}25`, border: `1px solid ${data.color}50` }}
              >
                <Layers size={22} style={{ color: data.color }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl font-bold text-white">{data.title}</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                    System Architecture
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1">{data.tagline}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-white/80 scrollbar-thin scrollbar-thumb-white/10">
            {/* Metric Pills */}
            <div className="grid grid-cols-3 gap-3">
              {data.metrics.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 text-center">
                  <p className="text-xs text-white/40 mb-1">{m.label}</p>
                  <p className="font-display font-bold text-sm text-white" style={{ color: data.color }}>
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Architecture Flow Diagram */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-violet-400 mb-3 flex items-center gap-1.5">
                <Cpu size={14} /> System Architectural Flow
              </h4>
              <div className="space-y-3">
                {data.layers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/8 flex items-start gap-3.5 relative"
                  >
                    <div className="w-6 h-6 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <span className="font-semibold text-white text-sm">{layer.name}</span>
                        <span className="font-mono text-[11px] text-violet-300/80">{layer.tech}</span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{layer.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Challenges & Solutions */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                <ShieldCheck size={14} /> Core Engineering Challenges Solved
              </h4>
              <div className="space-y-3">
                {data.challenges.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/8 space-y-1.5">
                    <p className="font-semibold text-white text-xs flex items-center gap-2">
                      <Zap size={13} className="text-amber-400 shrink-0" />
                      <span>{c.title}</span>
                    </p>
                    <p className="text-xs text-white/55 leading-relaxed pl-5">{c.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/8 bg-[#080810] flex items-center justify-between">
            <span className="font-mono text-[11px] text-white/40">Verified Architecture · Production-Ready</span>
            <div className="flex items-center gap-2">
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-all shadow-md cursor-pointer"
              >
                <FaGithub size={13} />
                <span>View Source Code</span>
                <ExternalLink size={11} className="opacity-70" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

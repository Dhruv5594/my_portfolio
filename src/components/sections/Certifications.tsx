"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Calendar, CheckCircle, ZoomIn, ExternalLink } from "lucide-react";
import { certifications } from "@/data/portfolio";

export function CertificationsSection() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <section className="relative py-16 lg:py-24">
      {/* Certificate lightbox */}
      <AnimatePresence>
        {preview && (
          <>
            <motion.div
              key="cert-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setPreview(null)}
            />
            <motion.div
              key="cert-image"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed inset-8 md:inset-20 lg:inset-32 z-[91] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image src={preview} alt="Certificate" fill className="object-contain bg-white" />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/60 text-white rounded-full text-sm hover:bg-black/80 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">Achievements</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Certifications
          </h2>
          <p className="mt-3 text-white/50 text-sm">NPTEL Elite (IIT Madras) & AICTE Industry Credentials</p>
        </motion.div>

        {/* Cert cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative bg-white/[0.03] border border-white/8 hover:border-violet-500/30 rounded-2xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.1)] overflow-hidden flex flex-col"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${cert.color}12 0%, transparent 70%)` }}
              />

              {/* Certificate image preview */}
              {cert.image && (
                <div
                  className="relative h-40 overflow-hidden cursor-zoom-in border-b border-white/5 shrink-0 bg-white/[0.02]"
                  onClick={() => setPreview(cert.image!)}
                >
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* Card body */}
              <div className="relative p-5 flex flex-col flex-1">
                <div className="flex items-start gap-3 flex-1">
                  {/* Badge */}
                  <div
                    className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-xl mt-0.5"
                    style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                  >
                    {cert.badge}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-display font-bold text-white text-sm leading-snug">
                        {cert.title}
                      </h3>
                      <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: cert.color }} />
                    </div>

                    <p className="text-xs font-medium mt-0.5" style={{ color: cert.color }}>
                      {cert.issuer}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-white/30">
                      <Calendar size={10} />
                      {cert.date}
                    </div>

                    <p className="mt-2 text-xs text-white/45 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>

                {cert.verifyUrl && (
                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-white/30 font-mono">Credential ID: XD03X4UJPYDC</span>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium"
                    >
                      Verify <ExternalLink size={11} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

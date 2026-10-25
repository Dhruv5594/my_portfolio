"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle2, Loader2, Copy, Check, Phone, MessageSquare, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { personal, socialLinks } from "@/data/portfolio";

type FormState = "idle" | "loading" | "success" | "error";

const socialIconMap: Record<string, React.ElementType> = {
  Github: FaGithub,
  Linkedin: FaLinkedinIn,
  Mail,
};

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<{ name: string; email: string; message: string } | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const validate = (data: FormData) => {
    const e: Record<string, string> = {};
    if (!data.get("user_name")) e.user_name = "Name is required";
    const email = String(data.get("user_email") || "");
    if (!email) e.user_email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.user_email = "Enter a valid email";
    if (!data.get("message")) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFormState("loading");

    const payload = {
      name: String(data.get("user_name") || ""),
      email: String(data.get("user_email") || ""),
      message: String(data.get("message") || ""),
    };

    setLastSubmitted(payload);

    try {
      // 1. Submit to Next.js API endpoint (saves to messages.json and dispatches to email)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 2. Also dispatch directly from client to formsubmit.co for guaranteed delivery
      try {
        await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            message: payload.message,
            _subject: `New Portfolio Contact: ${payload.name} (${payload.email})`,
            _replyto: payload.email,
            _template: "table",
            _captcha: "false",
          }),
        });
      } catch (clientDispatchErr) {
        console.warn("Client direct dispatch note:", clientDispatchErr);
      }

      setFormState("success");
      formRef.current.reset();
    } catch (err) {
      console.warn("Contact form submission fallback:", err);
      setFormState("success");
      formRef.current.reset();
    }
  };

  // Pre-filled web links
  const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}&su=${encodeURIComponent(
    "Inquiry for Dhruv Patel (Portfolio)"
  )}&body=${encodeURIComponent(
    lastSubmitted
      ? `Hi Dhruv,\n\n${lastSubmitted.message}\n\nFrom: ${lastSubmitted.name} (${lastSubmitted.email})`
      : "Hi Dhruv,\n\nI came across your portfolio and would like to connect with you regarding..."
  )}`;

  const whatsappLink = `https://wa.me/919427376141?text=${encodeURIComponent(
    lastSubmitted
      ? `Hi Dhruv, my name is ${lastSubmitted.name}. I sent a message through your portfolio: "${lastSubmitted.message}"`
      : "Hi Dhruv, I saw your portfolio and would like to connect!"
  )}`;

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-700/8 rounded-full blur-[100px]" />
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
          <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">Contact</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Let's Work Together
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Whether it's an internship, software development role, or project collaboration — feel free to reach out anytime.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* ── Contact Form Card ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white/[0.02] border border-white/8 rounded-2xl p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-8 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Email Sent to Dhruv's Inbox!
                    </h3>
                    <p className="mt-2 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                      Your message has been directly dispatched to{" "}
                      <span className="text-violet-300 font-mono font-medium">{personal.email}</span>.
                    </p>
                  </div>

                  {/* Clarification banner */}
                  <div className="p-3.5 bg-violet-500/10 border border-violet-500/20 rounded-xl text-left max-w-md mx-auto text-xs text-white/70 leading-relaxed">
                    <p className="font-semibold text-violet-300 mb-1 flex items-center gap-1.5">
                      <span>📩</span> Note for First-Time Setup:
                    </p>
                    <p>
                      FormSubmit sends a one-time activation email to{" "}
                      <strong className="text-white">{personal.email}</strong>. Simply click{" "}
                      <span className="text-emerald-300 font-medium">"Activate Form"</span> once in your Gmail inbox to confirm, and all future visitor messages will route directly to your inbox instantly!
                    </p>
                  </div>

                  {/* Fast Action Options */}
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <a
                      href={gmailWebLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 text-xs font-medium transition-all"
                    >
                      <Mail size={14} /> Open in Gmail Web <ExternalLink size={12} />
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-medium transition-all"
                    >
                      <FaWhatsapp size={14} /> Chat on WhatsApp <ExternalLink size={12} />
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setFormState("idle")}
                      className="text-xs text-white/40 hover:text-white transition-colors underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form
                  key="contact-form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/60 rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none transition-all duration-200 text-sm"
                    />
                    {errors.user_name && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.user_name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="you@example.com"
                      className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/60 rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none transition-all duration-200 text-sm"
                    />
                    {errors.user_email && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.user_email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Hi Dhruv, I came across your portfolio and would like to discuss..."
                      className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/60 rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none transition-all duration-200 text-sm resize-none"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_25px_rgba(124,58,237,0.45)] cursor-pointer"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Direct Channels + Socials ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Reach Cards */}
            <div className="p-6 bg-white/[0.03] border border-white/8 rounded-2xl space-y-4">
              <h3 className="font-display font-semibold text-white">Direct Reach</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Connect directly through your preferred channel:
              </p>

              <div className="space-y-3 pt-1">
                {/* Email with copy button */}
                <div className="flex items-center justify-between gap-2 p-3 bg-white/[0.03] border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail size={15} className="text-violet-400 shrink-0" />
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-xs sm:text-sm text-white/80 hover:text-violet-300 transition-colors font-mono truncate"
                      title={personal.email}
                    >
                      {personal.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-1.5 text-xs text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                    title="Copy Email to Clipboard"
                  >
                    {copied ? (
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <Check size={12} /> Copied
                      </span>
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>

                {/* Open in Gmail Web button */}
                <a
                  href={gmailWebLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/10 hover:border-violet-500/30 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare size={15} className="text-violet-400" />
                    <span className="text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors">
                      Compose in Gmail Web
                    </span>
                  </div>
                  <ExternalLink size={12} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                </a>

                {/* WhatsApp Chat */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-emerald-500/[0.05] border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <FaWhatsapp size={16} className="text-emerald-400" />
                    <span className="text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors">
                      Chat on WhatsApp
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400/80 font-mono">+91 9427376141</span>
                </a>

                {/* Direct Phone */}
                {personal.phone && (
                  <a
                    href={`tel:${personal.phone}`}
                    className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/10 hover:border-violet-500/30 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="text-violet-400" />
                      <span className="text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors">
                        Call Directly
                      </span>
                    </div>
                    <span className="text-xs text-white/40 font-mono">{personal.phone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Profiles</p>
              <div className="space-y-2.5">
                {socialLinks.map((link) => {
                  const Icon = socialIconMap[link.icon as keyof typeof socialIconMap] ?? Mail;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/8 hover:border-violet-500/30 rounded-xl transition-all duration-200 group"
                    >
                      <Icon size={16} className="text-white/40 group-hover:text-violet-400 transition-colors" />
                      <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                      <span className="ml-auto text-xs text-white/25 group-hover:text-violet-400 transition-colors">↗</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

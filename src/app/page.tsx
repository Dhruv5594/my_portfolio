"use client";

import { useState, useEffect } from "react";
import { PageLoader } from "@/components/layout/PageLoader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { SkillsSection } from "@/components/sections/Skills";
import { ProjectsSection } from "@/components/sections/Projects";
import { ExperienceSection } from "@/components/sections/Experience";
import { CertificationsSection } from "@/components/sections/Certifications";
import { ContactSection } from "@/components/sections/Contact";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Lenis smooth scroll initialization
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }) as { raf: (t: number) => void; destroy: () => void };

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    return () => lenis?.destroy();
  }, []);

  return (
    <>
      {/* Page loader — shows first, then reveals the site */}
      <PageLoader onComplete={() => setLoaded(true)} />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Command palette (Ctrl+K) */}
      <CommandPalette />

      {/* Main site content */}
      <div
        className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!loaded}
      >
        {/* Noise texture overlay */}
        <div className="noise" aria-hidden="true" />

        <Navbar onOpenPalette={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }))} />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <CertificationsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}

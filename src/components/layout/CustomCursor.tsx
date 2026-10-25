"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function CustomCursor() {
  // Raw mouse position (no spring — instant)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Outer ring follows with spring lag
  const ringSpringCfg = { stiffness: 140, damping: 18, mass: 0.6 };
  const ringX = useSpring(rawX, ringSpringCfg);
  const ringY = useSpring(rawY, ringSpringCfg);

  // Dot follows instantly (tight spring = almost direct)
  const dotSpringCfg = { stiffness: 800, damping: 40, mass: 0.2 };
  const dotX = useSpring(rawX, dotSpringCfg);
  const dotY = useSpring(rawY, dotSpringCfg);

  // Hover / click state via refs (no re-render)
  const hoverRef = useRef(false);
  const clickRef = useRef(false);
  const visibleRef = useRef(false);

  // Ring size motion values (mutated directly, no state)
  const ringSize = useMotionValue(40);
  const dotSize = useMotionValue(6);
  const ringOpacity = useMotionValue(0);
  const dotOpacity = useMotionValue(0);

  useEffect(() => {
    // Only show on non-touch / pointer-fine devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (!visibleRef.current) {
        visibleRef.current = true;
        ringOpacity.set(1);
        dotOpacity.set(1);
      }
    };

    const onDown = () => {
      clickRef.current = true;
      ringSize.set(24);
      dotSize.set(14);
    };

    const onUp = () => {
      clickRef.current = false;
      ringSize.set(hoverRef.current ? 52 : 40);
      dotSize.set(hoverRef.current ? 8 : 6);
    };

    // Rebind hover targets after a small delay so DOM is ready
    const bindHover = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          hoverRef.current = true;
          ringSize.set(52);
          dotSize.set(8);
        });
        el.addEventListener("mouseleave", () => {
          hoverRef.current = false;
          ringSize.set(40);
          dotSize.set(6);
        });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    // Initial bind + rebind on route changes / new DOM
    const t = setTimeout(bindHover, 800);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      clearTimeout(t);
    };
  }, [rawX, rawY, ringSize, dotSize, ringOpacity, dotOpacity]);

  // Compute translateX/Y offsets so the element centres on the cursor
  const ringOffset = useTransform(ringSize, (s) => -(s / 2));
  const dotOffset  = useTransform(dotSize,  (s) => -(s / 2));

  return (
    <>
      {/* ── Outer tracking ring ─────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-violet-400/60 mix-blend-difference will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: ringOffset,
          translateY: ringOffset,
          width: ringSize,
          height: ringSize,
          opacity: ringOpacity,
        }}
      />

      {/* ── Inner dot ───────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-violet-400 will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: dotOffset,
          translateY: dotOffset,
          width: dotSize,
          height: dotSize,
          opacity: dotOpacity,
        }}
      />
    </>
  );
}

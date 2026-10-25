"use client";

import { useEffect, useState, useCallback } from "react";
import { navLinks } from "@/data/portfolio";

export type CommandItem = {
  id: string;
  label: string;
  description?: string;
  action: () => void;
  icon?: string;
};

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Ctrl+K / Cmd+K to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const commands: CommandItem[] = [
    ...navLinks.map((link) => ({
      id: link.href,
      label: `Go to ${link.label}`,
      description: `Navigate to the ${link.label} section`,
      icon: "ArrowRight",
      action: () => {
        const el = document.querySelector(link.href);
        el?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
    })),
    {
      id: "theme",
      label: "Toggle Theme",
      description: "Switch between dark and light mode",
      icon: "Sun",
      action: () => {
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        setOpen(false);
      },
    },
    {
      id: "github",
      label: "Open GitHub",
      description: "View source code and repositories",
      icon: "Github",
      action: () => {
        window.open("https://github.com/Dhruv5594", "_blank");
        setOpen(false);
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      !query ||
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      (c.description?.toLowerCase().includes(query.toLowerCase()) ?? false)
  );

  return { open, setOpen, query, setQuery, filtered };
}

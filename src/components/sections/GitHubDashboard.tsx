"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  Star,
  Users,
  FolderGit2,
  ExternalLink,
  Code2,
  RefreshCw,
  GitCommit,
  CheckCircle2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { personal } from "@/data/portfolio";

type GitHubProfile = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export function GitHubDashboard() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("Just now");

  const fetchGitHubData = async () => {
    setLoading(true);
    setError(false);

    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch("https://api.github.com/users/Dhruv5594"),
        fetch("https://api.github.com/users/Dhruv5594/repos?sort=updated&per_page=6"),
      ]);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
      }

      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (Array.isArray(reposData)) {
          setRepos(reposData.slice(0, 6));
        }
      }

      setLastRefreshed(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (err) {
      console.warn("GitHub API error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const languageColors: Record<string, string> = {
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    Python: "#3776AB",
    Java: "#B07219",
    "C++": "#F34B7D",
    HTML: "#E34F26",
    CSS: "#563D7C",
  };

  return (
    <section id="github" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/6 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
            <FaGithub size={13} />
            <span>REAL-TIME TELEMETRY</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Live GitHub Dashboard
          </h2>
          <p className="mt-3 text-white/50 text-sm max-w-xl mx-auto">
            Live streaming stats, active repositories, and code contributions from{" "}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 underline font-mono"
            >
              @Dhruv5594
            </a>
            .
          </p>
        </motion.div>

        {/* Top Metric Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-violet-500/30 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <FolderGit2 size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-white">
                {profile?.public_repos ?? "12+"}
              </p>
              <p className="text-xs text-white/40">Public Repositories</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-violet-500/30 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Code2 size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-white">100+</p>
              <p className="text-xs text-white/40">DSA Problems Solved</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-violet-500/30 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Star size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-white">
                {repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0) || "Active"}
              </p>
              <p className="text-xs text-white/40">Total Stars Received</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-violet-500/30 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Users size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-white">
                {profile?.followers ?? "65+"}
              </p>
              <p className="text-xs text-white/40">Network Connections</p>
            </div>
          </div>
        </motion.div>

        {/* Live Repositories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            // Skeleton loader
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-44 rounded-2xl bg-white/[0.02] border border-white/8 p-5 animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-32 h-4 bg-white/10 rounded" />
                  <div className="w-full h-3 bg-white/5 rounded" />
                  <div className="w-3/4 h-3 bg-white/5 rounded" />
                </div>
                <div className="w-20 h-3 bg-white/10 rounded" />
              </div>
            ))
          ) : repos.length > 0 ? (
            repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-violet-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FolderGit2 size={16} className="text-violet-400 shrink-0" />
                      <h4 className="font-display font-semibold text-white text-sm truncate group-hover:text-violet-300 transition-colors">
                        {repo.name}
                      </h4>
                    </div>
                    <ExternalLink size={12} className="text-white/30 group-hover:text-violet-400 shrink-0 transition-colors" />
                  </div>

                  <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
                    {repo.description || "Active software development repository by Dhruv Patel."}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: languageColors[repo.language] || "#7C3AED" }}
                      />
                      <span className="font-mono text-[11px] text-white/60">{repo.language}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 ml-auto text-[11px] font-mono">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitBranch size={11} className="text-violet-400" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            // Fallback showcase cards when GitHub API is cached or limited
            [
              {
                name: "FarmEase",
                desc: "Smart Agriculture MERN Platform with real-time crop management & weather advisory.",
                lang: "JavaScript",
                url: "https://github.com/Dhruv5594/FarmEase",
              },
              {
                name: "EventHub_Ticket_Booking_System",
                desc: "Full-stack ticket booking platform with atomic inventory safety & JWT auth guards.",
                lang: "JavaScript",
                url: "https://github.com/Dhruv5594/EventHub_Ticket_Booking_System",
              },
              {
                name: "MediScan-AI",
                desc: "Deep Learning radiology assistant leveraging CNN for radiographic anomaly detection.",
                lang: "Python",
                url: "https://github.com/Dhruv5594",
              },
            ].map((repo, i) => (
              <a
                key={i}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-violet-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white text-sm">{repo.name}</span>
                    <ExternalLink size={12} className="text-white/30" />
                  </div>
                  <p className="text-xs text-white/50">{repo.desc}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/5 text-xs text-violet-300 font-mono">
                  {repo.lang}
                </div>
              </a>
            ))
          )}
        </div>

        {/* Footer info & Refresh bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GitHub API Telemetry · Synced {lastRefreshed}</span>
          </div>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors"
          >
            <span>View Full GitHub Profile @Dhruv5594</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}

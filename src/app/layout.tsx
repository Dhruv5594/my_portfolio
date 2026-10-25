import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ── Fonts ────────────────────────────────────────────────────────────────────
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Dhruv Patel — Full-Stack Developer & AI Engineer",
  description:
    "3rd-year IT Engineering student at CHARUSAT University. Building full-stack apps, AI systems, and beautiful UIs. Open to internships and opportunities.",
  keywords: [
    "Dhruv Patel", "Full-Stack Developer", "Frontend Developer", "AI Engineer",
    "React", "Next.js", "Node.js", "Python", "CHARUSAT", "Gujarat", "India",
    "Portfolio", "Web Developer",
  ],
  authors: [{ name: "Dhruv Patel" }],
  creator: "Dhruv Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dhruvpatel.dev",
    title: "Dhruv Patel — Full-Stack Developer & AI Engineer",
    description:
      "3rd-year IT Engineering student. Building full-stack apps, AI systems, and beautiful UIs.",
    siteName: "Dhruv Patel Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dhruv Patel Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Patel — Full-Stack Developer & AI Engineer",
    description: "3rd-year IT Engineering student building full-stack apps and AI systems.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://dhruvpatel.dev"),
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0A0A0F" />
      </head>
      <body className="bg-[#0A0A0F] text-white antialiased font-sans selection:bg-violet-600/40 selection:text-white">
        {/* Theme init script — runs before React hydrates, avoids flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'light') document.documentElement.classList.remove('dark');
                else document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}

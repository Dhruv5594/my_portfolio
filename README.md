# Dhruv Patel — Personal Portfolio

A premium, fully interactive personal portfolio website built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **React Three Fiber**.

---

## ✨ Features

- 🎨 **Dark/Light theme** with localStorage persistence and zero flash
- 🚀 **Page loader** with animated progress bar (skippable)
- 🖱️ **Custom cursor** with spring physics and hover morphing (desktop only)
- ⌨️ **Command Palette** (Ctrl+K / ⌘K) — navigate sections, toggle theme
- 🌐 **Lenis smooth scroll** with spring easing
- 🔮 **React Three Fiber** 3D hero scene — wireframe icosahedron reacting to mouse
- 📜 **Framer Motion** scroll-triggered reveal animations on every section
- 🏃 **Infinite marquee** tech logo strip in Skills section
- 📬 **EmailJS** contact form with validation and success/error states
- 📱 **Fully responsive** — mobile-first, tested at 360px / 768px / 1024px / 1440px
- ♿ **Accessible** — semantic HTML, keyboard navigation, ARIA labels, focus styles
- ⚡ **Performance optimised** — lazy 3D scene, next/font, image optimisation

---

## 🗂️ Folder Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout, fonts, SEO metadata
│   ├── page.tsx          # Single-page composition
│   └── globals.css       # Design tokens, base styles
├── components/
│   ├── layout/           # Navbar, Footer, CustomCursor, PageLoader, CommandPalette
│   ├── sections/         # Hero, About, Skills, Projects, Experience, Certifications, Contact
│   ├── three/            # HeroScene.tsx (R3F 3D canvas)
│   └── ui/               # ProjectModal
├── data/
│   └── portfolio.ts      # ← EDIT ALL YOUR CONTENT HERE
├── hooks/
│   ├── useInteractions.ts
│   └── useCommandPalette.ts
├── lib/
│   └── utils.ts
└── types/
    └── index.ts
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd dhruv-portfolio
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the live site.

---

## ✏️ Customising Content

**All** your personal data lives in one file:

```
src/data/portfolio.ts
```

Edit it to update:
- Personal info, bio, email, links
- Skills (name + proficiency level)
- Projects (title, description, tech, GitHub/live links)
- Experience & Education timeline
- Certifications

---

## 📸 Adding Your Photo

1. Place your headshot at `public/photo.jpg` (any name is fine)
2. Open [`src/components/sections/About.tsx`](src/components/sections/About.tsx)
3. Find the comment `{/* If you have a photo, uncomment below */}`
4. Uncomment the `<Image>` line and set the `src` path

---

## 📄 Adding Your Resume

Place your resume PDF at:
```
public/resume.pdf
```
The "Download Resume" button in the navbar and hero will automatically use it.

---

## 📧 Setting Up the Contact Form (EmailJS)

1. Go to [emailjs.com](https://www.emailjs.com) and create a free account
2. Create a **Service** (e.g. Gmail) → copy your **Service ID**
3. Create an **Email Template** with variables: `{{user_name}}`, `{{user_email}}`, `{{message}}`
4. Copy your **Template ID** and **Public Key**
5. Open [`src/components/sections/Contact.tsx`](src/components/sections/Contact.tsx) and replace:

```ts
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
```

---

## 🌐 Deployment on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts — Vercel auto-detects Next.js
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).

**Recommended settings:**
- Framework: Next.js (auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next`

---

## 🎨 Design Customisation

### Change Accent Colour

Open `src/app/globals.css` and update:
```css
--color-accent: #7C3AED; /* violet — change to any hex */
```

Then do a global search-replace of `violet-` in Tailwind classes across components.

### Change Fonts

In `src/app/layout.tsx`, swap out `Syne` / `Inter` for any [Google Fonts](https://fonts.google.com) family.

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| 3D | React Three Fiber + Drei |
| Smooth Scroll | Lenis |
| Icons | Lucide React + React Icons |
| Email | EmailJS |
| Deployment | Vercel |

---

## 📝 License

MIT — feel free to use this as a template. If you do, a shoutout is appreciated! 🙏

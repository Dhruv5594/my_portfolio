// ============================================================
// PORTFOLIO DATA — Single source of truth
// Edit this file to update all content across the site.
// ============================================================

export const personal = {
  name: "Dhruv Patel",
  fullName: "Patel Dhruvkumar Laljibhai",
  role: "IT Engineering Student",
  taglines: [
    "Full-Stack Developer",
    "Frontend Developer",
    "AI Engineer",
  ],
  bio: "Software Developer with hands-on experience in programming, DSA, and full-stack development, skilled in problem-solving and solution design. Experienced in building reliable software solutions and independently handling development tasks from requirements to implementation.",
  email: "dhruvdhruv5594@gmail.com",
  phone: "+91 9427376141",
  github: "https://github.com/Dhruv5594",
  linkedin: "https://www.linkedin.com/in/dhruv-patel-a198a4320/",
  resume: "/resume.pdf", // Place your resume PDF in /public/resume.pdf
  avatar: "/avatar-placeholder.svg",
  location: "Anand, Gujarat",
};

export const stats = [
  { label: "Projects Built", value: 3 },
  { label: "Certifications", value: 5 },
  { label: "Problems Solved", value: 100 },
  { label: "Graduate Year", value: 2028 },
];

export const skills = [
  {
    category: "Languages",
    icon: "Code2",
    items: [
      { name: "JavaScript", level: 88 },
      { name: "C / C++", level: 80 },
      { name: "Java", level: 78 },
      { name: "Python", level: 75 },
    ],
  },
  {
    category: "Frontend",
    icon: "Monitor",
    items: [
      { name: "React.js", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "HTML5 & CSS3", level: 92 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    category: "Backend & DB",
    icon: "Server",
    items: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "MySQL", level: 72 },
    ],
  },
  {
    category: "CS Fundamentals",
    icon: "Brain",
    items: [
      { name: "DSA", level: 85 },
      { name: "OOP", level: 88 },
      { name: "Git & GitHub", level: 85 },
      { name: "Vercel / Deploy", level: 78 },
    ],
  },
];

// Flat logo cloud for the marquee strip
export const techLogos = [
  "React.js", "Next.js", "Node.js", "Express.js", "MongoDB",
  "MySQL", "JavaScript", "Java", "Spring Boot", "Angular", "C++", "Python",
  "Tailwind CSS", "HTML5", "CSS3", "Git", "GitHub", "Vercel",
];

export const projects = [
  {
    id: "farmease",
    title: "FarmEase",
    tagline: "Smart Agriculture & Farm Management MERN Platform",
    description:
      "A comprehensive full-stack MERN platform that digitizes farm management — enabling crop cycle tracking, resource scheduling, weather advisory, and direct market connectivity.",
    longDescription:
      "FarmEase is designed to tackle critical challenges faced by agricultural communities by providing a modern digital operating system for farming. Developed using MongoDB, Express.js, React, and Node.js, the system features end-to-end crop cycle tracking, expense management, real-time weather integration, and a direct marketplace connecting farmers with suppliers. Includes secure JWT authentication, responsive mobile-friendly UI, and optimized MongoDB query indexing for lightning-fast performance even on rural low-bandwidth connections.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "REST API"],
    category: "Full-Stack (MERN)",
    github: "https://github.com/Dhruv5594/FarmEase",
    live: "#",
    image: "/projects/farmease.png",
    color: "#10B981",
    featured: true,
  },
  {
    id: "mediscan-ai",
    title: "MediScan AI",
    tagline: "Deep Learning Medical Imaging & Diagnostic Assistant",
    description:
      "An intelligent diagnostic platform leveraging Deep Learning and Computer Vision to analyze medical images (X-rays and scans), providing fast, accurate anomaly detection support.",
    longDescription:
      "MediScan AI harnesses Convolutional Neural Networks (CNN) and advanced computer vision algorithms to assist medical professionals in evaluating radiographic imagery. The system provides anomaly detection on medical scans, computes clinical confidence scores, and generates structured analytical summaries to speed up diagnostic triage. Architected with a high-performance Python/Flask ML inference backend coupled with a clean, responsive React user interface.",
    tech: ["Python", "TensorFlow / Keras", "Machine Learning", "React.js", "Flask", "OpenCV", "Tailwind CSS"],
    category: "AI & Machine Learning",
    github: "https://github.com/Dhruv5594",
    live: "#",
    image: "/projects/mediscan.png",
    color: "#7C3AED",
    featured: true,
  },
  {
    id: "eventhub",
    title: "EventHub",
    tagline: "Full-Stack Event Ticketing & Protected Organizer Platform",
    description:
      "A complete event ticketing ecosystem with attendee booking flows, race-condition-safe atomic inventory management, and a role-guarded organizer dashboard.",
    longDescription:
      "EventHub is an advanced full-stack event ticketing platform built with React 18, Node.js, Express, and MongoDB. Attendees can search and browse events, book tickets, and manage their reservations. Organizers access a protected CRUD dashboard via role-based route guards (React.lazy + Suspense code splitting). The system features race-condition-safe atomic ticket reservations (findOneAndUpdate with $gte check to prevent overselling), Bearer JWT authentication, bcrypt password hashing, centralized API service architecture, and comprehensive Node.js automated test suites.",
    tech: ["React 18", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Bcrypt", "Vite", "REST API"],
    category: "Full-Stack (MERN)",
    github: "https://github.com/Dhruv5594/EventHub_Ticket_Booking_System",
    live: "#",
    image: "/projects/eventhub.png",
    color: "#3B82F6",
    featured: true,
  },
];

export const experience = [
  {
    id: "oasis-internship",
    type: "internship" as const,
    title: "Python Programming Intern",
    organization: "Oasis Infobyte",
    period: "May 2026 – Jun 2026",
    duration: "6 Weeks",
    description:
      "Completed a 6-week AICTE OIB-SIP internship in Python Programming. Strengthened Python fundamentals, coding, and problem-solving skills through practical exercises. Gained introductory knowledge of Machine Learning and AI-driven applications.",
    skills: ["Python", "Machine Learning", "Problem Solving", "AICTE OIB-SIP"],
    icon: "Briefcase",
    color: "#7C3AED",
  },
];

export const education = [
  {
    id: "cspit",
    type: "education" as const,
    title: "Bachelor of Technology (B.Tech) in IT (3rd Year)",
    organization: "CSPIT — Chandubhai S. Patel Institute of Technology",
    location: "Anand, Gujarat",
    period: "2024 – 2028 (Exp.)",
    description:
      "Currently pursuing B.Tech in Information Technology with 6.5 CGPA (3rd Year, Exp. 2028). Core focus in Data Structures & Algorithms (DSA), OOP, Web Development, and AI/ML.",
    icon: "GraduationCap",
    color: "#06B6D4",
  },
  {
    id: "hsc",
    type: "education" as const,
    title: "Class XII — HSC",
    organization: "Chandubhai Vivekanand Vidyalaya, Halvad | GSEB",
    location: "Halvad, Gujarat",
    period: "2024",
    description:
      "Completed Higher Secondary Certificate (HSC) under Gujarat Secondary and Higher Secondary Education Board (GSEB) with 90.0%.",
    icon: "GraduationCap",
    color: "#10B981",
  },
  {
    id: "ssc",
    type: "education" as const,
    title: "Class X — SSC",
    organization: "S.P Vidyalaya, Halvad | GSEB",
    location: "Halvad, Gujarat",
    period: "2022",
    description:
      "Completed Secondary School Certificate (SSC) under GSEB with 85.0%.",
    icon: "GraduationCap",
    color: "#F59E0B",
  },
];

export const certifications = [
  {
    id: "nptel-os",
    title: "Introduction to Operating Systems (Elite)",
    issuer: "NPTEL — IIT Madras (Funded by MoE, Govt. of India)",
    date: "2026",
    description: "Awarded 'ELITE' certification for successfully completing the 8-week course in Operating Systems with a consolidated score of 60%. Swayam / Skill India certified.",
    badge: "🏅",
    color: "#06B6D4",
    image: "/cert-nptel.png",
  },
  {
    id: "java-fullstack",
    title: "Java FullStack Development",
    issuer: "Board Infinity via Coursera",
    date: "2026",
    description: "Completed comprehensive Specialization covering Java Programming Fundamentals, Frontend Development (HTML, CSS, Angular), and Data Structures & Backend with Spring & Spring Boot.",
    badge: "☕",
    color: "#F59E0B",
    image: "/cert-java-fullstack.png",
    verifyUrl: "https://coursera.org/verify/specialization/XD03X4UJPYDC",
  },
  {
    id: "ibm-javascript",
    title: "JavaScript Programming Essentials",
    issuer: "IBM",
    date: "2025",
    description: "Mastered fundamental to advanced JavaScript concepts including ES6+ syntax, asynchronous programming, APIs, closures, DOM manipulation, and modern web application development.",
    badge: "⚡",
    color: "#3B82F6",
  },
  {
    id: "algorithm-design",
    title: "Algorithm Design",
    issuer: "BITS Pilani via Coursera",
    date: "2026",
    description: "Advanced study of algorithmic paradigm design, dynamic programming, divide-and-conquer, graph algorithms, greedy heuristics, and formal asymptotic runtime complexity.",
    badge: "🧠",
    color: "#8B5CF6",
  },
  {
    id: "oasis-cert",
    title: "Python Programming Internship",
    issuer: "Oasis Infobyte (AICTE OIB-SIP)",
    date: "May – Jun 2026",
    description: "Completed 6-week AICTE OIB-SIP internship in Python Programming. Strengthened Python fundamentals, coding, problem-solving, and AI/ML-driven practical applications.",
    badge: "🏆",
    color: "#7C3AED",
    image: "/cert-oasis.png",
  },
];

export const extras = [
  {
    label: "Competitive Programming",
    description: "Regularly practice DSA on coding platforms with 100+ problems solved, focusing on optimal time and space complexity.",
    icon: "Code2",
  },
  {
    label: "Languages Known",
    description: "English, Gujarati, Hindi",
    icon: "Globe",
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Dhruv5594", icon: "Github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruv-patel-a198a4320/", icon: "Linkedin" },
  { label: "Email", href: "mailto:dhruvdhruv5594@gmail.com", icon: "Mail" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

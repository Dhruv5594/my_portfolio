export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: string;
  github: string;
  live: string;
  image: string;
  color: string;
  featured: boolean;
};

export type SkillCategory = {
  category: string;
  icon: string;
  items: { name: string; level: number }[];
};

export type TimelineEntry = {
  id: string;
  type: "internship" | "education";
  title: string;
  organization: string;
  period: string;
  duration?: string;
  description: string;
  skills?: string[];
  icon: string;
  color: string;
  location?: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  badge: string;
  color: string;
  image?: string;
  verifyUrl?: string;
};

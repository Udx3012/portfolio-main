export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  startMonth: string;
  endMonth: string;
  ongoing: boolean;
  bullets: string[];
  link?: string;
  location?: string;
  summary?: string;
}

export const experienceData: Experience[] = [
  {
    id: "2",
    period: "Jun 2026 - Present",
    company: "HalftoneMotion",
    role: "Co-founder",
    startMonth: "Jun 2026",
    endMonth: "current",
    ongoing: true,
    link: "https://halftonemotion.vercel.app",
    bullets: [
      "Co-founded and scaled a motion design studio serving 30+ international partners, overseeing business strategy, client acquisition, and internal ops.",
      "Engineered a standardized end-to-end creative delivery pipeline (concept → storyboard → render → delivery) sustaining fast project turnaround times.",
      "Maintained exceptionally high client retention and satisfaction by establishing structured revision cycles and transparent client communication."
    ]
  },
  {
    id: "4",
    period: "Aug 2025",
    company: "Citadel Coworkers LLP",
    role: "Web Development Intern",
    startMonth: "Aug 2025",
    endMonth: "Aug 2025",
    ongoing: false,
    location: "Noida, India (Hybrid)",
    bullets: [
      "Rebuilt a legacy corporate web platform end-to-end into a modern, responsive, and modular site adhering to high accessibility, SEO, and best practice standards.",
      "Owned the full delivery lifecycle from UI design through frontend implementation to production deployment within a cross-functional team."
    ]
  },
  {
    id: "1",
    period: "Aug 2025 - Present",
    company: "VIPS (Vivekananda Institute of Professional Studies)",
    role: "Core Team Member - CLEIT ERP System",
    startMonth: "Aug 2025",
    endMonth: "current",
    ongoing: true,
    link: "https://cdc.cleit.in",
    bullets: [
      "Core developer contributing to CLEIT, a full-scale institutional ERP platform built by a cross-year student engineering team.",
      "Engineered and deployed core administrative modules officially adopted and actively used in production across the university."
    ]
  },
  {
    id: "3",
    period: "Aug - Dec 2024",
    company: "GeeksforGeeks",
    role: "Video Creator Intern",
    startMonth: "Aug 2024",
    endMonth: "Dec 2024",
    ongoing: false,
    location: "Delhi, India (Remote)",
    bullets: [
      "Scripted and produced high-quality technical explainer content covering Machine Learning, Data Science, Data Structures & Algorithms, and Java for developer audiences.",
      "Managed the full end-to-end video production cycle from concept through final cut and publication."
    ]
  },
  {
    id: "5",
    period: "Selected Delegate",
    company: "6th International Olympiad of Metropolises",
    role: "Delegate representing India",
    startMonth: "2021",
    endMonth: "2021",
    ongoing: false,
    location: "Moscow, Russia",
    summary: "Represented Delhi on a global stage in computer science and problem-solving competition.",
    bullets: [
      "Selected as one of only two delegates from Delhi to represent India at the global 6th International Olympiad of Metropolises in Moscow.",
      "Competed in high-level algorithmic problem solving and computer science challenges alongside top international student developers."
    ]
  }
];

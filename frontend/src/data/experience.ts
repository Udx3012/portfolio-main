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
}

export const experienceData: Experience[] = [
  {
    id: "2",
    period: "2026 - current",
    company: "HalftoneMotion",
    role: "Co-founder",
    startMonth: "Jun 2026",
    endMonth: "current",
    ongoing: true,
    link: "https://halftonemotion.vercel.app",
    bullets: [
      "Co-founded and scaling HalftoneMotion, a boutique motion design studio specializing in high-impact product ad creatives.",
      "Primarily responsible for motion graphics, After Effects composition, and Premiere Pro production for promotional campaigns."
    ]
  },
  {
    id: "4",
    period: "Aug 2025",
    company: "Citadel Coworkers LLP",
    role: "Web Developer",
    startMonth: "Aug 2025",
    endMonth: "Aug 2025",
    ongoing: false,
    bullets: [
      "Built and shipped the complete corporate website.",
      "Handled end-to-end frontend development for several major product and project landing pages."
    ]
  },
  {
    id: "1",
    period: "2025 - current",
    company: "VIPS (Vivekananda Institute of Professional Studies)",
    role: "Core Contributor - CLEIT ERP System",
    startMonth: "Jan 2025",
    endMonth: "current",
    ongoing: true,
    bullets: [
      "Core contributor to CLEIT, a full-scale ERP system built by a cross-year student team.",
      "Officially adopted by the college for active administrative and academic operations, serving as a live system rather than a side project."
    ]
  },
  {
    id: "3",
    period: "Aug - Dec 2024",
    company: "GeeksforGeeks",
    role: "Content Managing Intern",
    startMonth: "Aug 2024",
    endMonth: "Dec 2024",
    ongoing: false,
    bullets: [
      "Interned at one of India's largest developer education platforms.",
      "Managed and scheduled technical blog assignments.",
      "Scripted, filmed, and produced educational explainer videos for assigned content and pushed final edits live."
    ]
  },
  {
    id: "5",
    period: "2021-22",
    company: "6th Moscow Olympiad",
    role: "Selected Delhi Delegate",
    startMonth: "Sep 2021",
    endMonth: "Dec 2022",
    ongoing: false,
    bullets: [
      "Represented Delhi as one of only two students selected for the global 6th Moscow Olympiad in Russia during 11th grade.",
      "Collaborated on advanced math and science competitions at an international level."
    ]
  }
];

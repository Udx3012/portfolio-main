export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: string[];
  color: string;
}

export const skillsData: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    description: "Integrating Large Language Models and building intelligence layers for production systems.",
    icon: "Brain",
    skills: ["Python", "AI Agents", "Prompt Engineering", "Model Integration"],
    color: "bg-indigo-50 border-indigo-100 text-indigo-700"
  },
  {
    title: "Programming Languages",
    description: "Fluent in multiple languages for software, script, and app development.",
    icon: "Code",
    skills: ["C", "C++", "Java", "JavaScript", "TypeScript", "Dart"],
    color: "bg-slate-50 border-slate-100 text-slate-700"
  },
  {
    title: "Frontend Development",
    description: "Designing and building beautiful, responsive user interfaces.",
    icon: "Layout",
    skills: ["HTML5", "React", "Next.js", "Tailwind CSS"],
    color: "bg-rose-50 border-rose-100 text-rose-700"
  },
  {
    title: "Backend & Databases",
    description: "Crafting robust server-side systems and data persistence layers.",
    icon: "Server",
    skills: ["Node.js", "Supabase", "MongoDB"],
    color: "bg-emerald-50 border-emerald-100 text-emerald-700"
  },
  {
    title: "Design & Content Creation",
    description: "Creating premium visuals, animations, and graphic designs.",
    icon: "PenTool",
    skills: ["Photoshop", "After Effects", "Premiere Pro", "Figma"],
    color: "bg-purple-50 border-purple-100 text-purple-700"
  },
  {
    title: "Hardware & Security",
    description: "Tinkering with physical computing and exploring cybersecurity.",
    icon: "Cpu",
    skills: ["Arduino", "Ethical Hacking", "CTF Challenges"],
    color: "bg-amber-50 border-amber-100 text-amber-700"
  }
];

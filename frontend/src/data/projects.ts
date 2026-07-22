export interface Project {
  id: string;
  category: string;
  title: string;
  thumbnail: string;
  fallbackThumbnail?: string;
  description: string;
  technologies: string[];
  links: { label: string; url: string }[];
  screenshots: string[];
  fallbackScreenshots?: string[];
}

export const projectsData: Project[] = [
  {
    id: "4",
    category: "Document-Grounded Q&A (RAG)",
    title: "Cited.ai",
    thumbnail: "/assets/projects/cited-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=600&auto=format&fit=crop",
    description: "A domain-agnostic, document-grounded Question-Answering system (RAG) designed to run entirely on free-tier cloud services. It processes uploaded PDFs, indexes them into a vector store using hybrid dense-sparse search, and answers questions strictly based on the content of the documents with inline citations back to the source chunks. Features LLM-as-a-Judge verification for zero hallucinations.",
    technologies: ["FastAPI", "Next.js", "Qdrant Cloud", "Supabase Storage", "Groq API", "Hugging Face", "TypeScript", "Python"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/Udx3012/Cited.ai" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "9",
    category: "P2P Ephemeral Chat & File Sharing CLI",
    title: "fsociety",
    thumbnail: "/assets/projects/fsociety-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    description: "A secure, ephemeral, end-to-end encrypted peer-to-peer chat and instant file-streaming terminal application built in pure Rust. Features zero-upload file streaming in 64KB chunks to bypass cloud storage, ephemeral X25519 DH handshakes for perfect forward secrecy, and a cyberpunk terminal UI built with Ratatui.",
    technologies: ["Rust", "P2P Networking", "E2EE Cryptography", "Ratatui (TUI)", "WebSockets", "ChaCha20Poly1305"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/Udx3012/fsociety" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "5",
    category: "AI Social Comment Generator",
    title: "CommentSeed",
    thumbnail: "/assets/projects/commentseed-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop",
    description: "An AI-powered social comment generator for short-form video content on TikTok, Instagram, and YouTube. Produces a batch of realistic, human-sounding engagement comments across five voice archetypes (Hype, Witty, Curious, Skeptical, Wholesome) using parallel Groq API fan-out calls and custom realism post-processing to strip AI-like patterns.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Framer Motion", "Groq API"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/Udx3012/CommentSeed" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "6",
    category: "AI Content Creator Suite",
    title: "Creator Intelligence",
    thumbnail: "/assets/projects/creator-intel-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop",
    description: "The Next-Gen v2 evolution of CommentSeed into a full-spectrum AI platform for content creators. Beyond comment generation, it adds AI-powered caption writing, hook generation, creative content briefs, and platform-native tone calibration across TikTok, YouTube, Instagram, and X.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Framer Motion", "Groq API"],
    links: [
      { label: "Currently Down", url: "" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "7",
    category: "AI Creative Video Briefs",
    title: "Reframe",
    thumbnail: "/assets/projects/reframe-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=600&auto=format&fit=crop",
    description: "A creative video brief automation tool built by HalftoneMotion. Instead of manual note-taking, users paste a YouTube URL or upload a video file, and Reframe transcribes and analyzes it using Gemini and YouTube APIs, returning a comprehensive, structured creative brief instantly.",
    technologies: ["Next.js", "Gemini API", "YouTube API", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/Udx3012/Reframe" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "8",
    category: "Codebase Intelligence",
    title: "RepoGPT",
    thumbnail: "/assets/projects/repogpt-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop",
    description: "A production-grade codebase intelligence assistant that allows you to chat with any GitHub repository in real-time. Features a double-mode ingest, AST-like structure-aware code chunking to preserve context, a dual vector-store strategy (Supabase and Pinecone), and highly accurate, code-rich Gemini-powered explanations.",
    technologies: ["React 19", "Vite", "Node.js", "Express", "Google Gemini", "Supabase", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/Udx3012/RepoGPT" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "1",
    category: "A Song of Ice & Fire",
    title: "Maester",
    thumbnail: "/assets/projects/maester-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600&auto=format&fit=crop",
    description: "An AI-powered companion for the world of Game of Thrones, House of the Dragon, and A Knight of the Seven Kingdoms. Maester maps out characters, houses, and events across timelines into a structured hierarchy, paired with a conversational AI layer — so you can ask anything about anyone, in any era, and get a clear answer. Under development.",
    technologies: ["Python", "AI Agents", "Next.js", "TypeScript", "Timeline Engine", "Conversational AI"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/Udx3012/Maester" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1510172951991-856a654063f9?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "2",
    category: "Content Safety Platform",
    title: "KidSafe",
    thumbnail: "/assets/projects/kidsafe-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1478720143023-e7fccd162f9e?q=80&w=600&auto=format&fit=crop",
    description: "A content-safety platform for parents and viewers who want a quick answer before hitting play. Input any movie title and KidSafe generates a family-safety score along with a breakdown of NSFW or age-inappropriate scenes — no more scrolling through IMDb's parents' guide. Under development.",
    technologies: ["React", "Python", "Scoring Model", "Scene Tagging", "Movie API", "TypeScript"],
    links: [
      { label: "Cooking (Under Development)", url: "" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "3",
    category: "Blockchain & Cryptographic Auth",
    title: "Dwelp",
    thumbnail: "/assets/projects/notice-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop",
    description: "A cryptographic authentication and blockchain notice platform built on Polygon and Solidity. Every official campus notice gets hashed and recorded on-chain. If any circular about exams or holidays is altered or fabricated, Dwelp flags it instantly, solving the problem of fake notices.",
    technologies: ["Solidity", "Polygon", "Blockchain", "Smart Contracts", "React", "Next.js"],
    links: [
      { label: "Cooking (Under Development)", url: "" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "10",
    category: "AI Safety & Geo-Intelligence Platform",
    title: "Rakshak",
    thumbnail: "/assets/projects/rakshak-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=600&auto=format&fit=crop",
    description: "An AI-powered Smart Tourist Safety Platform engineered for Smart India Hackathon 2025. Delivers real-time intelligent threat scoring, dynamic polygon geo-fencing with low-latency perimeter breach alerts, instantaneous high-priority SOS emergency dispatch, an administrative police command dashboard, and decentralized blockchain-backed identity verification for secure, tamper-proof tourist credentials.",
    technologies: ["Flutter", "React", "Node.js", "MongoDB", "Ethereum", "TensorFlow", "Dart", "Geo-Fencing"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/Udx3012/Rakshak-Smart-Tourist-Safety-System" }
    ],
    screenshots: [],
    fallbackScreenshots: [
      "https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

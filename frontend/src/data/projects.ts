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
    description: "A citation-backed document Q&A platform built with FastAPI, Next.js, and Qdrant Cloud. Designed so every generated response strictly traces back to verifiable source passages. Combines BM25 keyword search with dense vector retrieval via Reciprocal Rank Fusion and cross-encoder reranking to capture exact technical terms and semantic meaning, paired with an automated LLM-as-a-Judge layer for factual verification.",
    technologies: ["FastAPI", "Next.js", "Qdrant Cloud", "Python", "TypeScript", "Hybrid Search", "LLM Evaluation"],
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
    title: "CipherLink",
    thumbnail: "/assets/projects/cipherlink-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    description: "An ephemeral peer-to-peer messaging and instant file-sharing platform engineered in Rust with zero server-side storage. Features X25519 Diffie-Hellman key exchange, ChaCha20-Poly1305 authenticated encryption, and RAM zeroization on session teardown to guarantee forward secrecy. Includes a high-throughput chunked file streaming pipeline and a responsive Ratatui terminal UI.",
    technologies: ["Rust", "P2P Networking", "Cryptography", "X25519", "ChaCha20Poly1305", "Ratatui (TUI)", "Async I/O"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/Udx3012/CipherLink" }
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
    description: "An AI-powered social comment generator for short-form video content on TikTok, Instagram, and YouTube. Produces realistic, human-sounding engagement comments across five voice archetypes using parallel LLM API calls and custom realism post-processing to strip AI-like text patterns.",
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
    description: "The Next-Gen evolution of CommentSeed into a full-spectrum AI platform for content creators. Integrates caption generation, hook writing, creative content briefs, and platform-native tone calibration across TikTok, YouTube, Instagram, and X.",
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
    description: "A creative video brief automation tool built by HalftoneMotion. Users paste a video link or upload media, and Reframe transcribes and analyzes content using Gemini and YouTube APIs, instantly generating a structured creative brief.",
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
    category: "Codebase Intelligence Assistant",
    title: "RepoGPT",
    thumbnail: "/assets/projects/repogpt-thumb.png",
    fallbackThumbnail: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop",
    description: "An AI-powered repository assistant enabling natural language queries across large GitHub codebases. Features an AST-aware chunking pipeline that splits code along function and class boundaries to preserve context, grounded hybrid vector search, and a background indexing worker that processes extensive source repositories without blocking the query path.",
    technologies: ["React 19", "Node.js", "Express", "Google Gemini", "Pinecone", "TypeScript", "Tailwind CSS", "AST Chunking"],
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

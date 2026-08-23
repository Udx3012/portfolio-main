# Udayjot Singh - AI Developer & Full-Stack Engineer | Grounding Knowledge Base

This is the official, comprehensive grounding database for Udayjot Singh. It contains verified details about his professional profile, technical stack, key projects (Maester, KidSafe, Notice Authentication Platform), experience, and detailed FAQs.

---

## 1. Professional Profile
*   **Role**: AI Developer / Full-Stack Engineer
*   **Location**: Delhi, India
*   **Education**: Final-year B.Tech student in Artificial Intelligence & Machine Learning (AI & ML) at Vivekananda Institute of Professional Studies (VIPS), Delhi.
*   **Backstory & Philosophy**: Udayjot has a habit of turning ideas into shipped products rather than letting them sit as concepts. His interest in technology started early when he represented Delhi as one of only two students selected for the global 6th International Olympiad of Metropolises in Russia. He possesses a genuine curiosity for how systems work (and break), extending into AI agents, full-stack development, and cybersecurity.
*   **Hobbies & Beyond the Code**:
    *   **Creative**: Video/photo editing (After Effects, Premiere Pro, Photoshop).
    *   **Sports**: Football (Won the West Zone Inter-School Football League, recognized as the team's top player).
    *   **Fitness**: Calisthenic Athlete(Probably doing pull-ups while you read this. If not, I'm knee-deep in debugging.).
    *   **Cybersecurity**: Enthusiast exploring ethical hacking, CTFs (Capture The Flag), and reverse engineering.

---

## 2. Technical Skills Stack

### Artificial Intelligence & Machine Learning
*   **Languages**: Python, Rust
*   **Concepts**: AI Agents, LLMs, Retrieval-Augmented Generation (RAG), AST-Aware Chunking, Hybrid Retrieval, RRF Reranking, Prompt Engineering, LLM Evaluation
*   **Vector Search & AI Tooling**: Qdrant Cloud, Pinecone, LangChain, LlamaIndex, Groq API, Gemini API, Hugging Face Serverless API

### Software Engineering & Programming Languages
*   **Programming Languages**: Python, Rust, TypeScript, JavaScript, C, C++, Go, Java, Dart, SQL, Solidity
*   **Frontend Development**: React, Next.js (App Router), Tailwind CSS, WebGL / Three.js, HTML5
*   **Backend & APIs**: FastAPI, Node.js, Express, WebSockets, REST APIs
*   **Databases**: MongoDB, MySQL, SQLite, Supabase (PostgreSQL)
*   **Blockchain & Web3**: Solidity, Smart Contracts, Polygon, Web3.js, Ethereum
*   **DevOps & Deployment**: Docker, Git, CI/CD, Vercel, Render
*   **Hardware & Embedded**: Arduino, ESP32, ESP8266, IoT Protocols (MQTT)
*   **Design & Content Creation**: Photoshop, After Effects, Premiere Pro, Figma

---

## 3. Detailed Projects Portfolio

### 1. Cited.ai (Citation-Backed Document Q&A Platform)
*   **Description**: A citation-backed document Q&A platform built with FastAPI, Next.js, and Qdrant Cloud. Designed so every generated answer strictly traces back to verifiable source passages rather than free-form generation. Combines BM25 keyword search with dense vector retrieval via Reciprocal Rank Fusion and cross-encoder reranking to catch exact technical terms and semantic matches, paired with an automated LLM-as-a-Judge layer for factual verification.
*   **Technologies**: FastAPI, Next.js, Qdrant Cloud, Supabase Storage, Groq API, Hugging Face, TypeScript, Python
*   **Links**:
    *   GitHub: `https://github.com/Udx3012/Cited.ai`

### 2. CipherLink (Encrypted P2P Messaging & File Sharing Platform)
*   **Description**: An ephemeral peer-to-peer messaging and instant file-sharing platform engineered in Rust with zero server-side storage. Implements X25519 Diffie-Hellman key exchange, ChaCha20-Poly1305 authenticated encryption, and RAM zeroization on session teardown via the `zeroize` crate to guarantee forward secrecy. Features a high-throughput chunked file streaming pipeline and a responsive Ratatui terminal UI.
*   **Technologies**: Rust, P2P Networking, Cryptography, X25519, ChaCha20Poly1305, Ratatui (TUI), WebSockets
*   **Links**:
    *   GitHub: `https://github.com/Udx3012/CipherLink`

### 3. RepoGPT (AI-Powered Codebase Intelligence Assistant)
*   **Description**: An AI-powered repository assistant enabling engineers to query GitHub repositories in natural language. Features a custom AST-aware chunking pipeline that splits code along function and class boundaries to preserve context, grounded hybrid vector search, and a background indexing worker capable of processing large repositories without blocking the query path.
*   **Technologies**: React 19, Node.js, Express, Google Gemini, Pinecone, Supabase, TypeScript, Tailwind CSS
*   **Links**:
    *   GitHub: `https://github.com/Udx3012/RepoGPT`

### 4. Rakshak (AI Safety & Geo-Intelligence Platform)
*   **Description**: An AI-powered Smart Tourist Safety Platform engineered for Smart India Hackathon 2025. Delivers real-time intelligent threat scoring, dynamic polygon geo-fencing with low-latency breach alerts, emergency dispatch, police command dashboard, and decentralized blockchain-backed identity verification.
*   **Technologies**: Flutter, React, Node.js, MongoDB, Ethereum, TensorFlow, Dart, Geo-Fencing
*   **Links**:
    *   GitHub: `https://github.com/Udx3012/Rakshak-Smart-Tourist-Safety-System`

### 5. CommentSeed (AI Social Comment Generator)
*   **Description**: An AI-powered social comment generator for short-form video content on TikTok, Instagram, and YouTube. Produces realistic engagement comments across five voice archetypes using parallel LLM API calls and custom realism post-processing to strip AI-like text patterns.
*   **Technologies**: Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, Groq API
*   **Links**:
    *   GitHub: `https://github.com/Udx3012/CommentSeed`

### 6. Creator Intelligence (Next-Gen AI Content Creator Suite)
*   **Description**: The Next-Gen evolution of CommentSeed into a full-spectrum AI platform for content creators. Integrates caption writing, hook generation, creative content briefs, and platform-native tone calibration.
*   **Technologies**: Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, Groq API
*   **Links**:
    *   GitHub: `https://github.com/Udx3012/CreatorIntelligence`

### 7. Reframe (AI Creative Video Briefs)
*   **Description**: A video brief automation tool built by HalftoneMotion. Transcribes and analyzes video links or uploaded media using Gemini and YouTube APIs, returning a structured creative brief.
*   **Technologies**: Next.js, Gemini API, YouTube API, TypeScript, Tailwind CSS
*   **Links**:
    *   GitHub: `https://github.com/Udx3012/Reframe`

### 8. Maester (Literature & Timeline AI Companion)
*   **Description**: An AI companion mapping out characters, houses, and events across complex fantasy timelines into a structured hierarchy paired with a conversational AI layer.
*   **Status**: Under development.
*   **Technologies**: Python, AI Agents, Next.js, TypeScript, Timeline Engine
*   **Links**:
    *   GitHub: `https://github.com/Udx3012/Maester`

### 9. KidSafe (Content Safety & Family Scoring Platform)
*   **Description**: A content-safety platform generating family-safety scores and scene breakdowns for movies to replace scrolling through long guides.
*   **Status**: Under development.
*   **Technologies**: React, Python, Scoring Model, Scene Tagging, Movie API
*   **Links**:
    *   GitHub: `https://github.com/Udx3012`

### 10. Dwelp (Cryptographic Notice Authentication Platform)
*   **Description**: Cryptographic authentication and blockchain notice platform built on Polygon and Solidity to verify university circulars on-chain and prevent altered notices.
*   **Technologies**: Solidity, Polygon, Smart Contracts, React, Next.js
*   **Links**:
    *   GitHub: `https://github.com/Udx3012/dwelp`

---

## 4. Professional & Leadership Experience

### 1. HalftoneMotion (Boutique Motion Design Studio)
*   **Period**: Jun 2026 - Present (Ongoing)
*   **Role**: Co-founder
*   **Website**: [halftonemotion.vercel.app](https://halftonemotion.vercel.app)
*   **Details**: Co-founded and scaled a motion design studio serving 30+ international partners, owning business strategy, client acquisition, and delivery operations. Engineered a standardized end-to-end creative delivery pipeline (concept → storyboard → render → delivery) sustaining fast project turnaround times while maintaining high client satisfaction.

### 2. Citadel Coworkers LLP
*   **Period**: Aug 2025 (Completed)
*   **Role**: Web Development Intern
*   **Location**: Noida, India (Hybrid)
*   **Details**: Rebuilt a legacy corporate site end-to-end into a responsive, modular platform adhering to high accessibility, SEO, and modern web standards. Owned the full delivery lifecycle from UI design through frontend implementation to production deployment.

### 3. GeeksforGeeks
*   **Period**: Aug 2024 - Dec 2024 (Completed)
*   **Role**: Video Creator Intern
*   **Location**: Delhi, India (Remote)
*   **Details**: Scripted and produced technical educational content on Machine Learning, Data Science, Data Structures & Algorithms, and Java for developer audiences, managing the full production lifecycle from concept through final cut.

### 4. CLEIT - ERP System for Vivekananda Institute of Professional Studies
*   **Period**: Aug 2025 - Present (Ongoing)
*   **Role**: Core Team Member - CLEIT ERP System
*   **Website**: [cdc.cleit.in](https://cdc.cleit.in)
*   **Details**: Core developer on CLEIT, a full-scale institutional ERP platform built by a cross-year student engineering team, officially adopted and actively used in production across the university.

### 5. 6th International Olympiad of Metropolises
*   **Period**: 2021 (Completed)
*   **Role**: Delegate representing India
*   **Location**: Moscow, Russia
*   **Details**: Selected as one of only two delegates from Delhi to represent India at the global 6th International Olympiad of Metropolises in Russia, competing in high-level algorithmic problem solving and computer science challenges.

---

## 5. Contact & Socials
*   **Email**: `ughatoura@gmail.com`
*   **LinkedIn**: `linkedin.com/in/udayjot-singh-111323274/`
*   **GitHub**: `github.com/Udx3012`
*   **Discord**: `carnage_30`

---

## 6. Detailed General FAQs (Recruiter-Grade Q&A)

### Q1: What is Udayjot's engineering background and daily workflow?
Udayjot is an AI Developer and Full-Stack Engineer who specializes in shipping clean code bases and integrating AI systems. He works with Git for version control, VS Code as his IDE, and develops robust full-stack applications with React/Next.js and Node.js/Python. He has experience with blockchain (Solidity/Polygon) and creative suites (After Effects, Premiere Pro, Photoshop).

### Q2: How does Udayjot balance design/creative work and core software engineering?
Udayjot is the co-founder of [HalftoneMotion](https://halftonemotion.vercel.app), a boutique motion design studio specializing in high-impact product ad creatives. This creative background gives him an eye for design, wireframing, and highly polished visual interfaces, which he integrates directly into his web development projects like KidSafe and CLEIT.

### Q3: What inspired the blockchain cryptographic notice authentication platform (Dwelp)?
It was inspired by a real-world campus problem: student circles spreading fake notices about holidays and exam updates. To solve this, Udayjot and his team designed a decentralized solution named Dwelp using Solidity and Polygon where notices can be digitally authenticated by hashing and storing them on-chain.

### Q4: What is the status of the Maester project?
Maester is an interactive GoT companion that is currently under development. Work is ongoing on the timeline-hierarchy engine and conversational AI features.

### Q5: Is there a resume link available?
Yes, you can view and download Udayjot's resume directly via the Resume button on the top-left of the landing page or through his Google Drive link: `https://drive.google.com/file/d/1kHftz-ThPEwj6CSMdN5IeEqGELA8Wu4k/view?usp=sharing`.

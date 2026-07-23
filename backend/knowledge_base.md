# Udayjot Singh - AI Developer & Full-Stack Engineer | Grounding Knowledge Base

This is the official, comprehensive grounding database for Udayjot Singh. It contains verified details about his professional profile, technical stack, key projects (Maester, KidSafe, Notice Authentication Platform), experience, and detailed FAQs.

---

## 1. Professional Profile
*   **Role**: AI Developer / Full-Stack Engineer
*   **Location**: Delhi, India
*   **Education**: Third-year B.Tech student in Artificial Intelligence & Machine Learning (AI & ML) at Vivekananda Institute of Professional Studies (VIPS), Delhi.
*   **Backstory & Philosophy**: Udayjot has a habit of turning ideas into shipped products rather than letting them sit as concepts. His interest in technology started early when he represented Delhi as one of only two students selected for the global 6th Moscow Olympiad in Russia. He possesses a genuine curiosity for how systems work (and break), extending into AI agents, full-stack development, and cybersecurity.
*   **Hobbies & Beyond the Code**:
    *   **Creative**: Video/photo editing (After Effects, Premiere Pro, Photoshop).
    *   **Sports**: Football (Won the West Zone Inter-School Football League, recognized as the team's top player).
    *   **Fitness**: Calisthenic Athlete(Probably doing pull-ups while you read this. If not, I'm knee-deep in debugging.).
    *   **Cybersecurity**: Enthusiast exploring ethical hacking, CTFs (Capture The Flag), and reverse engineering.

---

## 2. Technical Skills Stack

### Artificial Intelligence & Machine Learning
*   **Languages**: Python, Rust
*   **Concepts**: AI Agents, LLMs, Retrieval-Augmented Generation (RAG), Prompt Engineering, Fine-tuning, Vector Search
*   **Vector Search & AI Tooling**: Qdrant Cloud, Pinecone, LangChain, LlamaIndex, Groq API, Gemini API, Hugging Face Serverless API

### Software Engineering & Programming Languages
*   **Programming Languages**: TypeScript, JavaScript, Python, Rust, C, C++, Java, Dart, Solidity
*   **Frontend Development**: React, Next.js (App Router), Tailwind CSS, WebGL / Three.js, HTML5
*   **Backend & APIs**: FastAPI, Node.js, Express, WebSockets, REST APIs
*   **Databases**: MongoDB, Supabase (PostgreSQL)
*   **Blockchain & Web3**: Solidity, Smart Contracts, Polygon, Web3.js, Ethereum
*   **DevOps & Deployment**: Docker, Git, GitHub Actions, Vercel, Render
*   **Hardware & Embedded**: Arduino, ESP32, ESP8266, IoT Protocols (MQTT)
*   **Design & Content Creation**: Photoshop, After Effects, Premiere Pro, Figma

---

## 3. Detailed Projects Portfolio

### 1. Maester (AI-Powered Companion for Literature & Timelines)
*   **Description**: An AI-powered companion for the world of Game of Thrones, House of the Dragon, and A Knight of the Seven Kingdoms. Maester maps out characters, houses, and events across timelines into a structured hierarchy, paired with a conversational AI layer — so users can ask anything about anyone, in any era, and get a clear answer.
*   **Status**: Under development.
*   **Technologies**: Python, AI Agents, Next.js, TypeScript, Timeline Engine, Conversational AI
*   **Links**:
*       GitHub: `https://github.com/Udx3012/Maester`

### 2. KidSafe (Content-Safety & Family Scoring Platform)
*   **Description**: A content-safety platform for parents and viewers who want a quick answer before hitting play. Users input any movie title, and KidSafe generates a family-safety score along with a breakdown of NSFW or age-inappropriate scenes, avoiding the need to scroll through IMDb's lengthy guides.
*   **Status**: Under development.
*   **Technologies**: React, Python, Scoring Model, Scene Tagging, Movie API, TypeScript
*   **Links**:
*       GitHub: `https://github.com/Udx3012`

### 3. Dwelp (Cryptographic Notice Authentication & Campus Safety)
*   **Description**: A cryptographic authentication and blockchain notice platform built on Polygon and Solidity to solve a very real campus problem: fake university notices. Every official notice gets hashed and recorded on-chain. If a circular about exams or holidays is altered or fabricated, Dwelp flags it instantly.
*   **Technologies**: Solidity, Polygon, Blockchain, Smart Contracts, React, Next.js
*   **Links**:
*       GitHub: `https://github.com/Udx3012/dwelp`

### 4. Cited.ai (Document-Grounded Q&A System)
*   **Description**: A domain-agnostic, document-grounded Question-Answering system (Retrieval-Augmented Generation) designed to run entirely on free-tier cloud services. It processes uploaded PDFs, indexes them into a Qdrant Cloud vector store using hybrid dense-sparse search, and answers questions strictly based on the content of the documents with inline citations back to the source chunks. Backed by LLM-as-a-Judge verification to eliminate hallucinations.
*   **Technologies**: FastAPI, Next.js, Qdrant Cloud, Supabase Storage, Groq API (Llama 3.3/3.1), Hugging Face Serverless API (Embeddings & Reranking), TypeScript, Python
*   **Links**:
*       GitHub: `https://github.com/Udx3012/Cited.ai`

### 5. CommentSeed (AI-Powered Social Comment Generator)
*   **Description**: An AI-powered social comment generator for short-form video content on TikTok, Instagram, and YouTube. Given a content description or video URL, it produces a batch of realistic, human-sounding engagement comments across five voice archetypes (Hype, Witty, Curious, Skeptical, Wholesome), styled to match real platform behaviors through custom post-processing realism.
*   **Technologies**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Radix UI, Framer Motion, Groq API (Llama 3.3 70B)
*   **Links**:
*       GitHub: `https://github.com/Udx3012/CommentSeed`

### 6. Creator Intelligence (Next-Gen AI Content Creator Suite)
*   **Description**: The Next-Gen v2 evolution of CommentSeed into a full-spectrum AI platform for content creators. In addition to comment generation, it provides features like AI caption writing, hook generation, creative content briefs, and platform-native tone calibration across TikTok, YouTube, Instagram, and X.
*   **Technologies**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Radix UI, Framer Motion, Groq API
*   **Links**:
*       GitHub: `https://github.com/Udx3012/CreatorIntelligence`

### 7. Reframe (AI-Powered Creative Video Briefs)
*   **Description**: A video brief automation tool built by HalftoneMotion. Instead of manual note-taking and watching whole reference videos, clients or creators paste a YouTube URL or upload a video file, and Reframe transcribes and analyzes it using Gemini and YouTube APIs, returning a comprehensive, structured creative brief.
*   **Technologies**: Next.js, Gemini API, YouTube API, TypeScript, Tailwind CSS
*   **Links**:
*       GitHub: `https://github.com/Udx3012/Reframe`

### 8. RepoGPT (Codebase Intelligence Assistant)
*   **Description**: A production-grade codebase intelligence assistant that allows you to chat with any GitHub repository in real-time. It retrieves relevant file chunks using custom AST-like chunk boundaries (preventing out-of-context parsing) and ranks them using in-memory cosine similarity (with Pinecone fallback) before generating code-rich, grounded answers with Gemini.
*   **Technologies**: React 19, Vite, Node.js, Express, Google Gemini (text-embedding-004, gemini-flash), Supabase (PostgreSQL), TypeScript, Tailwind CSS, Framer Motion
*   **Links**:
*       GitHub: `https://github.com/Udx3012/RepoGPT`

### 9. CipherLink (Secure E2EE P2P Chat & File Streaming TUI)
*   **Description**: A secure, ephemeral, end-to-end encrypted peer-to-peer chat and instant file-sharing CLI application built in pure Rust. Uses ephemeral X25519 Diffie-Hellman handshake for perfect forward secrecy, ChaCha20Poly1305 for symmetric encryption, and streams files in 256KB chunks to bypass cloud storage. Built with a cyberpunk terminal interface using Ratatui.
*   **Technologies**: Rust, P2P, E2EE, X25519, ChaCha20Poly1305, Ratatui (TUI), WebSockets
*   **Links**:
*       GitHub: `https://github.com/Udx3012/CipherLink`

---

## 4. Professional & Leadership Experience

### 1. CLEIT - ERP System for Vivekananda Institute of Professional Studies
*   **Period**: Jan 2025 - current (Ongoing)
*   **Role**: Core Contributor & ERP Developer
*   **Details**: Core contributor to CLEIT, a full ERP system built by a cross-year student team, which has been officially adopted by VIPS.
*   **Key Contributions**: Worked on development and deployment of college ERP features, transitioning a complex student project into a live production system used actively by the university.

### 2. HalftoneMotion (Boutique Motion Design Studio)
*   **Period**: Jun 2026 - current (Ongoing)
*   **Role**: Co-founder
*   **Website**: [halftonemotion.vercel.app](https://halftonemotion.vercel.app)
*   **Details**: Co-founder of [HalftoneMotion](https://halftonemotion.vercel.app), a boutique motion design studio specializing in high-impact product ad creatives.

### 3. GeeksforGeeks
*   **Period**: Aug 2024 - Dec 2024 (Completed)
*   **Role**: Content Managing Intern (5 months)
*   **Details**: Managed blog assignments for a developer education platform, scripted and produced explainer videos, handled video editing, and coordinated final publications.

### 4. Citadel Coworkers LLP
*   **Period**: Aug 2025 (Completed)
*   **Role**: Web Developer
*   **Details**: Built and shipped the company website, handling end-to-end frontend development for several major project pages.

### 5. 6th Moscow Olympiad - Selected Delegate
*   **Period**: Sep 2021 - Dec 2022 (Completed)
*   **Details**: Selected as one of only two students representing Delhi for this global olympiad in Russia during 11th grade.

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
Yes, you can view and download Udayjot's resume directly via the Resume button on the top-left of the landing page or through his Google Drive link: `https://drive.google.com/file/d/1b7NVFObULTS2xKlK8I6n1s-pU0E6X9vL/view?usp=sharing`.

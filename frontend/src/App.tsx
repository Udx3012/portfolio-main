import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Info, Briefcase, Code2, UserPlus, User, FileText, X, ChevronLeft, ChevronRight, Sun, Moon, Film, Trophy, Dumbbell, Shield, Heart } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, type MotionValue, useAnimationFrame, animate } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { projectsData, type Project } from './data/projects';
import { skillsData } from './data/skills';
import FluidCursor from './components/FluidCursor';
import ExperienceTimeline from './components/ExperienceTimeline';
import { useTypewriterPlaceholder } from './hooks/useTypewriterPlaceholder';

type ViewState = 'landing' | 'chat';

interface ChatMessage {
  id: string;
  query: string;
  type: 'projects' | 'skills' | 'resume' | 'general' | 'me' | 'contact' | 'hobbies';
  title: string;
  ai_text?: string;
  provider?: string;
}

function MemojiAvatar({ type, className = "" }: { type: 'landing' | 'chat'; className?: string }) {
  const [hasError, setHasError] = useState(false);

  const fallbackEmoji = type === 'landing' ? '🙋🏽‍♂️' : '👨🏽‍💻';
  const imgSrc = '/assets/pfp/avatar.png';

  if (hasError) {
    return <span className={`${className} flex items-center justify-center`}>{fallbackEmoji}</span>;
  }

  return (
    <div className={`avatar-hover-scale ${className} flex items-center justify-center`}>
      <img
        src={imgSrc}
        alt={`${type} avatar`}
        className="w-full h-full object-contain animate-spin-slow"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

function ProfileImage({ className = "" }: { className?: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <img
        src="https://ui-avatars.com/api/?name=Udayjot+Singh&size=256&background=f1f5f9&color=334155"
        alt="Udayjot"
        className={className}
      />
    );
  }

  return (
    <img
      src="/assets/me/profile.png"
      alt="Udayjot"
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

interface ProjectImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

function ProjectImage({ src, fallbackSrc, alt, className = "" }: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

interface StreamingTextProps {
  text: string;
  speed?: number;
  renderText: (t: string) => React.ReactNode;
}

function StreamingText({ text, speed = 4, renderText }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (!text) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedText(text.slice(0, currentIndex));
      if (currentIndex >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <>{renderText(displayedText)}</>;
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const handleQuery = async (query: string, typeHint: string = 'general') => {
    if (viewState === 'landing') {
      setViewState('chat');
    }

    const normalizedQuery = query.toLowerCase().trim();
    const isDarkOrder = normalizedQuery.includes('dark mode') || normalizedQuery.includes('enable dark') || normalizedQuery.includes('turn on dark') || normalizedQuery.includes('go dark');
    const isLightOrder = normalizedQuery.includes('light mode') || normalizedQuery.includes('enable light') || normalizedQuery.includes('turn on light') || normalizedQuery.includes('go light');

    if (isDarkOrder || isLightOrder) {
      setIsTyping(true);
      const targetTheme = isDarkOrder ? 'dark' : 'light';
      setTheme(targetTheme);

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        query,
        type: 'general',
        title: "Query"
      };
      setChatHistory(prev => [...prev, userMsg]);
      setActiveIndex(chatHistory.length);

      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          query: query,
          type: 'general',
          title: "Theme Switch",
          ai_text: `Sure! I have switched the portfolio theme to ${targetTheme} mode.`
        };
        setChatHistory(prev => [...prev, aiMsg]);
        setActiveIndex(chatHistory.length + 1);
        setIsTyping(false);
      }, 1000);
      return;
    }

    setIsTyping(true);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      query,
      type: typeHint as any,
      title: "Query"
    };

    setChatHistory(prev => [...prev, userMsg]);
    setActiveIndex(chatHistory.length);

    try {
      // Enforce a minimum 0.6s typing animation for a realistic feel
      const minDelayPromise = new Promise(resolve => setTimeout(resolve, 600));

      const historyPayload = chatHistory.flatMap(msg => {
        const msgs = [{ role: 'user', content: msg.query }];
        if (msg.ai_text) {
          msgs.push({ role: 'assistant', content: msg.ai_text });
        }
        return msgs;
      });

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const responsePromise = fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, history: historyPayload })
      });

      const [response] = await Promise.all([responsePromise, minDelayPromise]);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`[AI Response] Generated via: ${data.provider}`);

      let responseTitle = "Response";
      if (data.intent === 'projects') responseTitle = "My Projects";
      if (data.intent === 'skills') responseTitle = "Skills & Expertise";
      if (data.intent === 'resume') responseTitle = "Professional Experience";
      if (data.intent === 'me') responseTitle = "About Me";
      if (data.intent === 'hobbies') responseTitle = "Beyond the Code";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        query: query,
        type: data.intent || 'general',
        title: responseTitle,
        ai_text: data.ai_text,
        provider: data.provider
      };

      setChatHistory(prev => [...prev, aiMsg]);
      setActiveIndex(chatHistory.length + 1);
    } catch (error) {
      console.error("Failed to fetch AI response", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        query: query,
        type: 'general',
        title: "Error",
        ai_text: "Sorry, my brain is currently offline. Please try again later."
      };
      setChatHistory(prev => [...prev, errorMsg]);
      setActiveIndex(chatHistory.length + 1);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ReactLenis root>
      <div className={`min-h-screen relative flex flex-col font-sans transition-colors duration-500 ${theme === 'dark'
        ? 'bg-black text-slate-100'
        : viewState === 'chat' ? 'bg-white text-slate-800' : 'bg-[#FDFDFD] text-slate-800'
        }`}>

        <AnimatePresence>
          {viewState === 'landing' && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
              className="fixed inset-0 z-0 pointer-events-none"
            >
              <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-500 ${theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-200/40'}`} />
              <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-500 ${theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-200/40'}`} />
              <div className={`absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full blur-[100px] transition-colors duration-500 ${theme === 'dark' ? 'bg-orange-900/5' : 'bg-orange-100/40'}`} />

            </motion.div>
          )}
        </AnimatePresence>

        <header className="fixed top-0 left-0 right-0 w-full px-6 pt-6 pb-4 flex justify-between items-start z-40 pointer-events-none">
          <AnimatePresence>
            {viewState === 'chat' && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`absolute top-0 left-0 right-0 h-40 -z-10 pointer-events-none transition-colors duration-500 ${theme === 'dark'
                  ? 'bg-gradient-to-b from-black via-black/95 to-transparent'
                  : 'bg-gradient-to-b from-white via-white/95 to-transparent'
                  }`}
              />
            )}
          </AnimatePresence>
          <div className="flex-1">
            <AnimatePresence>
              {viewState === 'landing' && (
                <motion.a
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  href="https://github.com/Udx3012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.05)] px-5 py-2.5 rounded-full text-sm font-medium transition-all pointer-events-auto ${theme === 'dark'
                    ? 'bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-800/50 text-zinc-300'
                    : 'bg-white/30 border-white/50 hover:bg-white/50 text-slate-700'
                    }`}
                >
                  <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center shadow-inner">
                    <FileText className="w-3 h-3 text-white" />
                  </div>
                  Resume <ArrowRight className="w-3 h-3 ml-1 opacity-70" />
                </motion.a>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 flex justify-center pointer-events-auto">
            <AnimatePresence>
              {viewState === 'chat' && (
                <motion.button
                  onClick={() => setViewState('landing')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                  className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl cursor-pointer bg-transparent border-0 outline-none select-none"
                >
                  <MemojiAvatar type="chat" className="w-full h-full" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 flex justify-end items-center gap-2.5 pointer-events-auto">
            <button
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className={`p-2.5 rounded-full transition-colors border border-transparent backdrop-blur-xl cursor-pointer ${theme === 'dark'
                ? 'hover:bg-white/5 hover:border-zinc-800 text-amber-400'
                : 'hover:bg-black/5 hover:border-slate-200 text-slate-655'
                }`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`p-2.5 rounded-full transition-colors border border-transparent backdrop-blur-xl cursor-pointer ${theme === 'dark'
                ? 'hover:bg-white/5 hover:border-zinc-800 text-zinc-400'
                : 'hover:bg-black/5 hover:border-slate-200 text-slate-600'
                }`}
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center w-full z-10 relative">
          <AnimatePresence mode="wait">
            {viewState === 'landing' ? (
              <LandingView key="landing" onQuery={handleQuery} theme={theme} />
            ) : (
              <ChatView
                key="chat"
                history={chatHistory}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                onQuery={handleQuery}
                isTyping={isTyping}
                onSelectProject={setSelectedProject}
                theme={theme}
              />
            )}
          </AnimatePresence>
        </main>

        <InfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onContactClick={() => {
            setIsModalOpen(false);
            handleQuery("How can I contact you?", 'contact');
          }}
          theme={theme}
        />
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} theme={theme} />
      </div>
    </ReactLenis>
  );
}


function LandingView({ onQuery, theme }: { onQuery: (q: string, t: ChatMessage['type']) => void, theme?: string }) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dynamicPlaceholder = useTypewriterPlaceholder([
    "Ask me anything...",
    "Ask me about Maester...",
    "What is Udayjot's tech stack?",
    "Tell me about your experience at GeeksforGeeks...",
    "Show me your projects...",
    "How can I contact you?",
    "What are your skills?",
    "Turn on dark mode..."
  ]);

  const handleSubmit = () => {
    onQuery(input, 'general');
  };

  const prompts = [
    { icon: <User className="w-4 h-4" />, label: "Me", query: "Tell me about yourself.", type: 'me' as const, color: "text-teal-400" },
    { icon: <Briefcase className="w-4 h-4" />, label: "Projects", query: "Show me your projects.", type: 'projects' as const, color: "text-emerald-400" },
    { icon: <FileText className="w-4 h-4" />, label: "Experience", query: "Tell me about your work experience.", type: 'resume' as const, color: "text-violet-400" },
    { icon: <Code2 className="w-4 h-4" />, label: "Skills", query: "What are your skills?", type: 'skills' as const, color: "text-indigo-400" },
    { icon: <Heart className="w-4 h-4" />, label: "Hobbies", query: "What do you do beyond code?", type: 'hobbies' as const, color: "text-rose-400" },
    { icon: <UserPlus className="w-4 h-4" />, label: "Contact", query: "How can I contact you?", type: 'general' as const, color: "text-amber-400" },
  ];

  return (
    <>
      <FluidCursor />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -30, filter: 'blur(12px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center w-full max-w-3xl min-h-[calc(100vh-6rem)] px-4 pb-8"
      >
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`text-lg sm:text-xl font-serif italic mb-4 transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}
        >
          Hey, I'm Udayjot 👋
        </motion.p>

        {/* Main Title with shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`text-6xl sm:text-8xl md:text-9xl font-serif font-bold tracking-tight mb-2 text-center leading-tight pb-1 ${theme === 'dark' ? 'landing-title' : 'text-slate-900'}`}
          style={theme === 'dark' ? {
            background: 'linear-gradient(135deg, #e4e4e7 0%, #a1a1aa 40%, #e4e4e7 60%, #71717a 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } : undefined}
        >
          AI Engineer
        </motion.h1>


        {/* Avatar with glow ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
          className="relative mb-10"
        >
          <div className={`absolute -inset-2 rounded-full blur-xl opacity-40 animate-pulse ${theme === 'dark' ? 'bg-blue-500/30' : 'bg-blue-400/20'}`} />
          <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px] ${theme === 'dark'
            ? 'bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-600'
            : 'bg-gradient-to-br from-slate-300 via-slate-100 to-slate-300'
            }`}>
            <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-[#FDFDFD]'}`}>
              <MemojiAvatar type="landing" className="w-full h-full" />
            </div>
          </div>
        </motion.div>

        {/* Search Input with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full relative max-w-xl mb-10"
        >
          {/* Glow behind input on focus */}
          <div className={`absolute -inset-1 rounded-full blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-60' : 'opacity-0'} ${theme === 'dark' ? 'bg-blue-500/15' : 'bg-blue-400/10'}`} />
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={dynamicPlaceholder}
              className={`w-full backdrop-blur-2xl border rounded-full py-4 pl-7 pr-14 text-lg focus:outline-none transition-all duration-300 placeholder:transition-colors placeholder:duration-300 ${theme === 'dark'
                ? `bg-zinc-900/50 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-500 ${isFocused ? 'border-zinc-600/80 shadow-[0_0_30px_rgba(59,130,246,0.08)]' : 'shadow-[0_8px_32px_rgba(0,0,0,0.15)]'}`
                : `bg-white/50 border-slate-200/80 text-slate-800 placeholder:text-slate-400 ${isFocused ? 'border-slate-300 shadow-[0_0_30px_rgba(59,130,246,0.06)]' : 'shadow-[0_8px_32px_rgba(0,0,0,0.04)]'}`
                }`}
            />
            <button
              onClick={handleSubmit}
              className={`absolute right-2 top-2 bottom-2 aspect-square rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg cursor-pointer ${theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
                : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/25'
                }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Prompt Buttons with staggered animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.8 } }
          }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {prompts.map((p) => (
            <motion.button
              key={p.label}
              variants={{
                hidden: { opacity: 0, y: 12, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
              }}
              whileHover={{ scale: 1.06, y: -2, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
              whileTap={{ scale: 0.93 }}
              onClick={(e) => {
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;
                confetti({
                  particleCount: 30,
                  spread: 50,
                  startVelocity: 15,
                  gravity: 0.8,
                  ticks: 40,
                  origin: { x, y },
                  colors: ['#60a5fa', '#a78bfa', '#34d399', '#f472b6', '#fbbf24'],
                  scalar: 0.6,
                  shapes: ['circle'],
                  disableForReducedMotion: true,
                });
                onQuery(p.query, p.type);
              }}
              className={`flex items-center gap-2 backdrop-blur-xl border px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer ${theme === 'dark'
                ? 'bg-zinc-900/40 border-zinc-800/60 hover:bg-zinc-800/60 hover:border-zinc-700/60 text-zinc-300'
                : 'bg-white/40 border-slate-200/60 hover:bg-white/70 hover:border-slate-300/60 text-slate-600'
                }`}
            >
              <span className={p.color}>{p.icon}</span>
              {p.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}

function ChatView({
  history,
  activeIndex,
  onQuery,
  isTyping,
  onSelectProject,
  theme
}: {
  history: ChatMessage[],
  activeIndex: number,
  setActiveIndex: any,
  onQuery: any,
  isTyping: boolean,
  onSelectProject: (p: Project) => void,
  theme?: string
}) {
  const [input, setInput] = useState('');
  const activeMessage = history[activeIndex];
  const dynamicPlaceholder = useTypewriterPlaceholder([
    "Ask me anything...",
    "Ask me about Maester...",
    "What is Udayjot's tech stack?",
    "Tell me about your experience at GeeksforGeeks...",
    "Show me your projects...",
    "How can I contact you?",
    "What are your skills?",
    "Turn on dark mode..."
  ]);

  const renderChatText = (text: string) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        let cleanUrl = part;
        let trailingPunctuation = "";
        const trailingMatch = part.match(/[.,;:!?]+$/);
        if (trailingMatch) {
          cleanUrl = part.slice(0, -trailingMatch[0].length);
          trailingPunctuation = trailingMatch[0];
        }
        return (
          <span key={index}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 hover:underline break-all font-semibold"
            >
              {cleanUrl}
            </a>
            {trailingPunctuation}
          </span>
        );
      }
      return part;
    });
  };

  const handleSubmit = () => {
    onQuery(input, 'general');
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex-1 flex flex-col items-center pt-32 pb-6 px-4 relative"
    >
      <div className="w-full max-w-4xl flex-1 flex flex-col relative z-10 pb-40">

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="w-full flex justify-end mb-6"
        >
          <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-sm text-[15px] font-medium max-w-[85%] leading-relaxed">
            {activeMessage?.query}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isTyping ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full flex justify-start mb-6"
            >
              <div className={`flex items-center gap-1.5 px-5 py-4 shadow-sm rounded-2xl rounded-bl-sm w-fit transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900 border border-zinc-800/80' : 'bg-slate-100'
                }`}>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col"
            >
              {activeMessage?.type === 'me' && <MeProfile theme={theme} />}
              {activeMessage?.type === 'projects' && <ProjectsCarousel onSelectProject={onSelectProject} theme={theme} />}
              {activeMessage?.type === 'resume' && <ExperienceTimeline />}
              {activeMessage?.type === 'skills' && (
                <SkillsExpertise
                  onSelectSkill={(skill) => onQuery(`Tell me about your experience with ${skill}.`, 'skills')}
                  theme={theme}
                />
              )}
              {activeMessage?.type === 'contact' && <ContactCard theme={theme} />}
              {activeMessage?.type === 'hobbies' && <BeyondTheCode theme={theme} />}

              {activeMessage?.ai_text ? (
                <div className="w-full flex justify-start mb-6">
                  <div className={`px-6 py-4 rounded-2xl rounded-bl-sm shadow-sm text-[15px] max-w-[85%] leading-relaxed transition-colors duration-500 ${theme === 'dark'
                    ? 'bg-zinc-900 text-zinc-200 border border-zinc-800/80'
                    : 'bg-slate-100 text-slate-800 border border-slate-200/50'
                    }`}>
                    <StreamingText key={activeMessage.id} text={activeMessage.ai_text} renderText={renderChatText} />
                  </div>
                </div>
              ) : (
                activeMessage?.type !== 'me' && activeMessage?.type !== 'projects' && activeMessage?.type !== 'resume' && activeMessage?.type !== 'skills' && activeMessage?.type !== 'contact' && activeMessage?.type !== 'hobbies' && (
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full text-left mb-6">
                      <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-855'}`}>{activeMessage?.title}</h2>
                    </div>

                    <div className={`w-full h-[22rem] rounded-[2rem] border flex flex-col items-center justify-center shadow-sm mb-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800 text-zinc-400' : 'bg-slate-50/50 border-slate-200 text-slate-505'
                      }`}>
                      <Code2 className="w-8 h-8 mb-2 opacity-50" />
                      <span>[ Dynamic &lt;{activeMessage?.type} /&gt; renders here ]</span>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 flex flex-col items-center z-30"
      >
        <MagnifyingContainer>
          <MagnifyingItem><ChatPrompt icon={<User className="w-3.5 h-3.5 text-teal-600" />} label="Me" onClick={() => onQuery("Tell me about yourself.", 'me')} theme={theme} /></MagnifyingItem>
          <MagnifyingItem><ChatPrompt icon={<Briefcase className="w-3.5 h-3.5 text-emerald-600" />} label="Projects" onClick={() => onQuery("Show me your projects.", 'projects')} theme={theme} /></MagnifyingItem>
          <MagnifyingItem><ChatPrompt icon={<FileText className="w-3.5 h-3.5 text-violet-600" />} label="Experience" onClick={() => onQuery("Tell me about your work experience.", 'resume')} theme={theme} /></MagnifyingItem>
          <MagnifyingItem><ChatPrompt icon={<Code2 className="w-3.5 h-3.5 text-indigo-600" />} label="Skills" onClick={() => onQuery("What are your skills?", 'skills')} theme={theme} /></MagnifyingItem>
          <MagnifyingItem><ChatPrompt icon={<Heart className="w-3.5 h-3.5 text-rose-600" />} label="Hobbies" onClick={() => onQuery("What do you do beyond code?", 'hobbies')} theme={theme} /></MagnifyingItem>
          <MagnifyingItem><ChatPrompt icon={<UserPlus className="w-3.5 h-3.5 text-amber-600" />} label="Contact" onClick={() => onQuery("How can I contact you?", 'general')} theme={theme} /></MagnifyingItem>
        </MagnifyingContainer>

        <div className="w-full relative px-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={dynamicPlaceholder}
            className={`w-full backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)] border rounded-full py-4 pl-6 pr-14 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder-zinc-400 ${theme === 'dark'
              ? 'bg-zinc-900/40 border-zinc-800/60 text-zinc-100'
              : 'bg-white/40 border-white/60 text-slate-800'
              }`}
          />
          <button
            onClick={handleSubmit}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ChatPrompt({ icon, label, onClick, theme }: { icon: React.ReactNode, label: string, onClick: () => void, theme?: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 backdrop-blur-md border shadow-sm px-4 py-2.5 rounded-full transition-colors text-[13px] font-semibold h-full whitespace-nowrap cursor-pointer ${theme === 'dark'
        ? 'bg-zinc-900/40 border-zinc-800/60 hover:bg-zinc-800/60 text-zinc-300'
        : 'bg-white/40 border-white/60 hover:bg-white/60 text-slate-700'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function MagnifyingContainer({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex overflow-x-auto md:overflow-x-visible flex-nowrap justify-start md:justify-center gap-2 mb-4 h-[56px] md:h-[48px] items-center md:items-end pointer-events-auto w-full max-w-full px-4 md:px-0 no-scrollbar"
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<{ mouseX?: MotionValue<number> }>, { mouseX }) : child
      )}
    </motion.div>
  );
}

function MagnifyingItem({ children, mouseX }: { children: React.ReactNode, mouseX?: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  const fallbackMouseX = useMotionValue(Infinity);
  const distance = useTransform(mouseX || fallbackMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleTarget = useTransform(distance, [-150, 0, 150], [1, 1.35, 1]);
  const scale = useSpring(scaleTarget, { stiffness: 400, damping: 25 });

  const marginTarget = useTransform(distance, [-150, 0, 150], [0, 10, 0]);
  const margin = useSpring(marginTarget, { stiffness: 400, damping: 25 });

  const zIndex = useTransform(distance, [-150, 0, 150], [0, 50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, marginLeft: margin, marginRight: margin, zIndex: zIndex as any }}
      className="origin-bottom h-full relative"
    >
      {children}
    </motion.div>
  );
}

function InfoModal({ isOpen, onClose, onContactClick, theme }: { isOpen: boolean, onClose: () => void, onContactClick?: () => void, theme?: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full max-w-2xl rounded-[2rem] shadow-2xl p-8 md:p-12 overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100 border border-zinc-800/80' : 'bg-white text-slate-800'
              }`}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-50' : 'text-slate-900'}`}>Welcome to AI Portfolio</h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors cursor-pointer ${theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                  }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`space-y-6 text-lg leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-350' : 'text-slate-600'}`}>
              <div>
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}`}>What's this?</h3>
                <p>
                  I'm so excited to present my <strong>brand new AI Portfolio.</strong><br />
                  Whether you're a recruiter, a friend, family member, or just curious, feel free to ask anything you want!
                </p>
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}`}>Why?</h3>
                <p>
                  Traditional portfolios can be limiting.<br />
                  They can't adapt to every visitor's specific needs.<br />
                  My portfolio becomes <strong>exactly what you're interested in knowing about me and my work.</strong>
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center">
              <button
                onClick={onClose}
                className={`px-8 py-3.5 rounded-full font-medium hover:scale-105 transition-all mb-6 shadow-md cursor-pointer ${theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                  }`}
              >
                Start Chatting
              </button>
              <p className="text-sm text-slate-500">
                If you love it, please share it! Feedback is always welcome. <button onClick={onContactClick} className="text-blue-500 hover:underline bg-transparent border-0 p-0 cursor-pointer font-semibold outline-none inline">Contact me.</button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function MeProfile({ theme }: { theme?: string }) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
      {/* Photo */}
      <div className={`w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-[2rem] overflow-hidden shadow-sm border transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100 border-slate-200/60'
        }`}>
        <ProfileImage className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col text-left">
        <h1 className={`text-4xl font-bold mb-2 transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}`}>Udayjot Singh</h1>
        <p className={`mb-4 font-medium transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-505'}`}>AI Developer | Full-Stack Engineer <span className="mx-2">•</span> Delhi, India</p>

        <p className={`leading-relaxed mb-6 transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-700'}`}>
          Hey 👋<br />
          I'm a third-year B.Tech student in AI & ML at VIPS, Delhi, with a habit of turning ideas into shipped products rather than letting them sit as concepts. My interest in tech started early — I represented Delhi as one of two students selected for the 6th Moscow Olympiad.
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[13px] font-normal shadow-sm">AI Agents</span>
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[13px] font-normal shadow-sm">Next.js</span>
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[13px] font-normal shadow-sm">React</span>
        </div>
      </div>
    </div>
  );
}

function ProjectsCarousel({ onSelectProject, theme }: { onSelectProject: (p: Project) => void, theme?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);

  // Measure the width of one set of projects (total track width / 3)
  useEffect(() => {
    if (trackRef.current) {
      setSingleSetWidth(trackRef.current.scrollWidth / 3);
    }

    const handleResize = () => {
      if (trackRef.current) {
        setSingleSetWidth(trackRef.current.scrollWidth / 3);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Position at the start of the middle set once measured
  useEffect(() => {
    if (singleSetWidth > 0) {
      x.set(-singleSetWidth);
    }
  }, [singleSetWidth, x]);

  // Helper to wrap position within [-2 * singleSetWidth, -singleSetWidth]
  const wrapPosition = (val: number) => {
    if (singleSetWidth <= 0) return val;
    let wrapped = val;
    while (wrapped < -2 * singleSetWidth) {
      wrapped += singleSetWidth;
    }
    while (wrapped > -singleSetWidth) {
      wrapped -= singleSetWidth;
    }
    return wrapped;
  };

  // Continuous auto-rotation
  useAnimationFrame((_, delta) => {
    if (isDragging || isHovered || singleSetWidth === 0) return;

    const speed = 40; // Pixels per second (slow, elegant speed)
    const moveBy = (speed * delta) / 1000;
    const nextX = wrapPosition(x.get() - moveBy);
    x.set(nextX);
  });

  // Handle manual navigation (Chevron arrows)
  const handleChevron = (direction: 'left' | 'right') => {
    if (singleSetWidth === 0) return;
    const cardStep = 304; // w-72 (288px) + gap-4 (16px)
    const currentX = x.get();
    const targetX = direction === 'left' ? currentX + cardStep : currentX - cardStep;

    animate(x, targetX, {
      type: "spring",
      stiffness: 150,
      damping: 25,
      onComplete: () => {
        x.set(wrapPosition(x.get()));
      }
    });
  };

  // Triple projectsData to ensure endless wrapping
  const tripledProjects = [...projectsData, ...projectsData, ...projectsData];

  return (
    <div className="w-full flex flex-col items-center mb-10 relative">
      <div className="w-full text-left mb-6">
        <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>My Projects</h2>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden pt-4 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsDragging(false);
        }}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          style={{ x }}
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false);
            x.set(wrapPosition(x.get()));
          }}
          className="flex gap-4 w-max"
        >
          {tripledProjects.map((project, index) => (
            <motion.div
              key={`${project.id}-${index}`}
              onTap={() => {
                if (!isDragging) {
                  onSelectProject(project);
                }
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="shrink-0 w-72 h-96 bg-slate-900 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden shadow-lg transition-all duration-300"
              style={{ isolation: 'isolate' }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <ProjectImage
                  src={project.thumbnail}
                  fallbackSrc={project.fallbackThumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-50 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full pointer-events-none">
                <p className="text-white/80 text-sm font-medium mb-1 tracking-wide">{project.category}</p>
                <h3 className="text-white text-3xl font-bold tracking-tight">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex w-full items-center justify-end gap-3 mt-2 pr-4 sm:pr-0">
        <button
          onClick={() => handleChevron('left')}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors shadow-sm cursor-pointer ${theme === 'dark'
            ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-100 border-slate-800/80'
            : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 border-transparent'
            }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleChevron('right')}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors shadow-sm cursor-pointer ${theme === 'dark'
            ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-100 border-slate-800/80'
            : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 border-transparent'
            }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, theme }: { project: Project | null, onClose: () => void, theme?: string }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 md:p-8 pt-28 md:pt-32">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-3xl max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-10rem)] rounded-[2rem] shadow-2xl overflow-y-auto transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100 border border-zinc-800/80' : 'bg-white text-slate-800'
              }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-20 cursor-pointer ${theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-505'
                }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-12">
              <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>{project.category}</p>
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-10 transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-50' : 'text-slate-900'}`}>{project.title}</h2>

              {/* Description */}
              <div className={`rounded-2xl p-6 md:p-8 mb-10 border transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800/70' : 'bg-slate-50 border-slate-100'
                }`}>
                <p className={`leading-relaxed text-[17px] mb-8 transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-700'}`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className={`px-3 py-1.5 border rounded-md text-sm font-medium shadow-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-700'
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="mb-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  Links
                </p>
                <div className="flex flex-col gap-2">
                  {project.links.map(link => {
                    if (!link.url) {
                      return (
                        <div
                          key={link.label}
                          className={`flex items-center justify-between p-4 rounded-xl font-medium border transition-colors duration-500 ${theme === 'dark'
                            ? 'bg-zinc-900/20 border-zinc-800/40 text-zinc-400'
                            : 'bg-slate-50/50 border-slate-200/50 text-slate-500'
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            {link.label}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-between p-4 rounded-xl transition-colors group font-medium border ${theme === 'dark'
                          ? 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800 text-zinc-200'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-800'
                          }`}
                      >
                        {link.label}
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-650 transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Screenshots */}
              <div className="w-full flex flex-col gap-6">
                {project.screenshots.map((img, i) => (
                  <ProjectImage
                    key={i}
                    src={img}
                    fallbackSrc={project.fallbackScreenshots?.[i]}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className={`w-full rounded-2xl shadow-sm border object-cover ${theme === 'dark' ? 'border-zinc-800' : 'border-slate-100'
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SkillsExpertise({ onSelectSkill, theme }: { onSelectSkill?: (skill: string) => void, theme?: string }) {
  return (
    <div className="w-full flex flex-col items-start mb-12 relative z-10 pt-2">
      <div className="w-full text-left mb-6">
        <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
          }`}>Skills & Expertise</h2>
      </div>

      <div className="w-full flex flex-col gap-10">
        {skillsData.map((category) => (
          <div key={category.title} className="w-full flex flex-col items-start">
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'
              }`}>
              <span className="text-slate-500 font-mono tracking-tighter">{'</>'}</span> {category.title}
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill, sIdx) => (
                <motion.button
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, backgroundColor: theme === 'dark' ? '#27272A' : '#000000' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: sIdx * 0.05 }}
                  onClick={() => onSelectSkill?.(skill)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all cursor-pointer shadow-sm border-0 outline-none ${theme === 'dark' ? 'bg-zinc-900 text-zinc-200' : 'bg-[#1A1A1A] text-white'
                    }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactCard({ theme }: { theme?: string }) {
  const [copied, setCopied] = useState(false);
  const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/udayjot-singh-111323274/' },
    { name: 'Github', url: 'https://github.com/Udx3012' }
  ];

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText('carnage_30');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full border rounded-3xl p-6 md:p-8 mb-6 shadow-sm flex flex-col items-stretch text-left transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-100' : 'bg-[#f8f9fa] border-slate-200/60 text-slate-800'
      }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}`}>Contacts</h2>
        <span className="text-sm md:text-base text-slate-500 font-medium">@Udx3012</span>
      </div>

      <hr className={`mb-6 transition-colors duration-500 ${theme === 'dark' ? 'border-zinc-800/60' : 'border-slate-200/80'}`} />

      <a
        href="mailto:ughatoura@gmail.com"
        className="text-blue-500 hover:text-blue-600 font-normal text-lg md:text-xl mb-6 self-start transition-colors"
      >
        ughatoura@gmail.com
      </a>

      <div className="flex flex-wrap gap-2.5">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-normal tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            {social.name}
          </a>
        ))}
        <button
          onClick={handleCopyDiscord}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-normal tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer border-0 outline-none flex items-center gap-1.5"
        >
          <svg className="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
          </svg>
          {copied ? 'Copied!' : 'Discord: carnage_30'}
        </button>
      </div>
    </div>
  );
}

function BeyondTheCode({ theme }: { theme?: string }) {
  const hobbies = [
    {
      title: "Video & Photo Editing",
      category: "Creative Hub",
      icon: <Film className="w-6 h-6 text-purple-500" />,
      description: (
        <>
          Co-Founder,{" "}
          <a
            href="https://halftonemotion.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
          >
            @HalftoneMotion
          </a>{" "}
          — a boutique motion design studio specializing in high-impact product ad creatives.
        </>
      ),
      gradient: "from-purple-500/10 to-indigo-500/10 dark:from-purple-950/20 dark:to-indigo-950/20"
    },
    {
      title: "Football",
      category: "Athletics",
      icon: <Trophy className="w-6 h-6 text-amber-500" />,
      description: "Won the West Zone Inter-School Football League and recognized as the team's top player. Passionate about competitive gameplay and team synergy.",
      gradient: "from-amber-500/10 to-orange-500/10 dark:from-amber-950/20 dark:to-orange-950/20"
    },
    {
      title: "Fitness & Calisthenics",
      category: "Health & Discipline",
      icon: <Dumbbell className="w-6 h-6 text-emerald-500" />,
      description: "Dedicated to regular home workouts and bodyweight calisthenics (probably doing pull-ups or push-ups while you read this!).",
      gradient: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/20 dark:to-teal-950/20"
    },
    {
      title: "Cybersecurity",
      category: "Enthusiast",
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      description: "Actively exploring ethical hacking, Capture The Flag (CTF) challenges, and reverse engineering as a hobby alongside development.",
      gradient: "from-blue-500/10 to-cyan-500/10 dark:from-blue-950/20 dark:to-cyan-950/20"
    }
  ];

  return (
    <div className="w-full flex flex-col items-start mb-8 relative z-10 pt-2 text-left">
      <div className="w-full text-left mb-6">
        <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
          }`}>Beyond the Code</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={hobby.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-3xl p-6 shadow-sm flex flex-col items-start bg-gradient-to-br ${hobby.gradient} transition-all duration-500 ${theme === 'dark'
              ? 'border-zinc-800/80 hover:border-zinc-700/80 text-zinc-150'
              : 'border-slate-200/60 hover:border-slate-300/60 text-slate-850'
              }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2.5 rounded-2xl ${theme === 'dark' ? 'bg-zinc-950/60' : 'bg-white'
                } shadow-sm`}>
                {hobby.icon}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {hobby.category}
                </span>
                <h3 className={`text-lg font-bold transition-colors duration-500 ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'
                  }`}>
                  {hobby.title}
                </h3>
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'
              }`}>
              {hobby.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

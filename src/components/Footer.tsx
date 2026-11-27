import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Sparkles, CheckCircle2, Mail } from 'lucide-react';

// Lazy-load request modal only when user opens it
const RequestSimulationModal = React.lazy(() =>
  import('./RequestSimulationModal').then((m) => ({ default: m.RequestSimulationModal }))
);

interface FooterProps {
  isDarkMode?: boolean;
  totalSimulations?: number;
}

const CUSTOM_SIM_TITLE = 'Need a Custom Simulation?';
const CUSTOM_SIM_DESC =
  'If any specific topic, chapter, or grade-level concept is missing from any textbook or curriculum, you can get custom-tailored interactive simulations developed specifically for your educational standards and classroom requirements. Reach out to the developer directly to request and integrate new simulations into this portal.';

const FooterCustomSimCard: React.FC<{
  onOpenRequestModal: () => void;
  developerGmailLink: string;
}> = React.memo(({ onOpenRequestModal, developerGmailLink }) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedDesc, setDisplayedDesc] = useState('');
  const [typewriterPhase, setTypewriterPhase] = useState<'idle' | 'typing-title' | 'typing-desc' | 'completed'>('idle');
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsCardVisible(true);
      setTypewriterPhase('typing-title');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = !!entries[0]?.isIntersecting;
        setIsCardVisible(visible);
        if (visible) {
          setTypewriterPhase((prev) => (prev === 'idle' ? 'typing-title' : prev));
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isCardVisible) return;
    let timer: ReturnType<typeof setTimeout>;

    if (typewriterPhase === 'typing-title') {
      if (displayedTitle.length < CUSTOM_SIM_TITLE.length) {
        timer = setTimeout(() => {
          setDisplayedTitle(CUSTOM_SIM_TITLE.slice(0, displayedTitle.length + 1));
        }, 40);
      } else {
        timer = setTimeout(() => {
          setTypewriterPhase('typing-desc');
        }, 200);
      }
    } else if (typewriterPhase === 'typing-desc') {
      if (displayedDesc.length < CUSTOM_SIM_DESC.length) {
        timer = setTimeout(() => {
          setDisplayedDesc(CUSTOM_SIM_DESC.slice(0, displayedDesc.length + 1));
        }, 14);
      } else {
        setTypewriterPhase('completed');
      }
    } else if (typewriterPhase === 'completed' && !isCardHovered) {
      timer = setTimeout(() => {
        setDisplayedTitle('');
        setDisplayedDesc('');
        setTypewriterPhase('typing-title');
      }, 7000);
    }

    return () => clearTimeout(timer);
  }, [typewriterPhase, displayedTitle, displayedDesc, isCardHovered, isCardVisible]);

  return (
    <div className="w-full max-w-4xl">
      <div
        ref={cardRef}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        className="w-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 text-left shadow-xl transition-all border"
        style={{
          backgroundColor: 'rgba(30, 100, 220, 0.60)',
          borderColor: '#F5A623',
          boxShadow: '0 8px 24px rgba(30, 100, 220, 0.25)'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b" style={{ borderColor: '#2D62D1' }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs border"
              style={{
                backgroundColor: '#1B2A5C',
                borderColor: '#F5A623',
                color: '#F5A623'
              }}
            >
              <Sparkles className="w-5 h-5" style={{ color: '#F5A623' }} />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider block" style={{ color: '#F5A623' }}>
                DEVELOPER DIRECT INQUIRY &amp; CUSTOM LABS
              </span>
              <div className="grid">
                <h3 className="col-start-1 row-start-1 text-lg sm:text-xl font-black font-heading invisible select-none pointer-events-none" aria-hidden="true">
                  {CUSTOM_SIM_TITLE}
                </h3>
                <h3 className="col-start-1 row-start-1 text-lg sm:text-xl font-black font-heading text-white flex items-center" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.75)' }}>
                  <span>{displayedTitle}</span>
                  {(typewriterPhase === 'idle' || typewriterPhase === 'typing-title') && (
                    <span
                      className="inline-block w-[2.5px] h-[1.1em] ml-1 bg-[#F5A623] animate-pulse"
                      style={{ verticalAlign: '-0.1em' }}
                    />
                  )}
                </h3>
              </div>
            </div>
          </div>

          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black border self-start sm:self-auto"
            style={{
              backgroundColor: '#1B2A5C',
              color: '#F5A623',
              borderColor: '#2D62D1'
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: '#F5A623' }} />
            <span>Any Grade &bull; Any Curriculum</span>
          </span>
        </div>

        <div className="grid mb-3">
          <p className="col-start-1 row-start-1 text-xs sm:text-sm font-medium leading-relaxed invisible select-none pointer-events-none" aria-hidden="true">
            {CUSTOM_SIM_DESC}
          </p>
          <p className="col-start-1 row-start-1 text-xs sm:text-sm font-medium leading-relaxed text-white" style={{ color: '#FFFFFF', textShadow: '0 1px 3px rgba(0, 0, 0, 0.75)' }}>
            {displayedDesc}
            {(typewriterPhase === 'typing-desc' || typewriterPhase === 'completed') && (
              <span
                className="inline-block w-[2px] h-[1.15em] ml-0.5 bg-[#F5A623] animate-pulse"
                style={{ verticalAlign: '-0.15em' }}
              />
            )}
          </p>
        </div>

        <div className="mb-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm text-white font-medium shadow-xs" style={{ backgroundColor: 'rgba(27, 42, 92, 0.45)', borderColor: '#F5A623' }}>
          <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
          <span>
            Need a simulation on a topic that is not already on this website? Click &apos;Request a Simulation&apos;, fill in the form, and we will build it and add it to the website.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={onOpenRequestModal}
            className="fx-pulse-gold inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-95 cursor-pointer border"
            style={{
              backgroundColor: '#F5A623',
              color: '#1B2A5C',
              borderColor: '#E58E0A'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E58E0A')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5A623')}
            title="Open Request a Simulation Form"
          >
            <Sparkles className="w-4 h-4 text-[#1B2A5C] shrink-0" />
            <span className="text-[#1B2A5C]">Request a Simulation</span>
          </button>

          <a
            href="https://wa.me/923147603964?text=Hello%20Muhammad%20Imran%20Khan,%20I%20would%20like%20to%20request%20a%20custom%20interactive%20simulation%20for%20our%20curriculum:"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-95 cursor-pointer border text-white"
            style={{
              backgroundColor: '#25D366',
              borderColor: '#1EBE5D'
            }}
            title="Send custom simulation request on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-white shrink-0" />
            <span>Request Custom Simulation on WhatsApp</span>
          </a>

          <a
            href={developerGmailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-95 cursor-pointer border text-white"
            style={{
              backgroundColor: '#1E88E5',
              borderColor: '#1565C0'
            }}
            title="Send custom simulation inquiry via Gmail Compose"
          >
            <Mail className="w-4 h-4 text-white shrink-0" />
            <span>Send Email</span>
          </a>
        </div>
      </div>
    </div>
  );
});

export const Footer: React.FC<FooterProps> = ({ totalSimulations = 128 }) => {
  const displaySimCount = totalSimulations >= 128 ? totalSimulations : 128;
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [shouldLoadBg, setShouldLoadBg] = useState(false);

  // Lazy-load footer background photo only when approaching footer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoadBg(true);
      return;
    }

    const bgObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadBg(true);
          bgObserver.disconnect();
        }
      },
      { rootMargin: '500px 0px', threshold: 0.01 }
    );

    bgObserver.observe(el);
    return () => bgObserver.disconnect();
  }, []);

  // Scroll-triggered entrance observer (threshold 0.3): repeats when scrolling into/out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
          } else {
            setIsSectionVisible(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const developerGmailLink =
    'https://mail.google.com/mail/?view=cm&fs=1&to=mimrankhan3964@gmail.com&su=Inquiry%20from%20GEN%20Z%20Interactive%20Simulations%20Portal';

  return (
    <footer
      id="developer"
      ref={sectionRef}
      className="w-full mt-auto py-10 sm:py-16 px-4 sm:px-8 lg:px-12 shrink-0 select-none transition-all scroll-mt-28 relative border-t shadow-2xl overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '2px solid #F5A623',
        width: '100%',
        maxWidth: '100%',
        borderRadius: '0px'
      }}
    >
      {/* Developer Photo Layer: Slides in smoothly from LEFT (fade-in + translateX) on scroll */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 overflow-hidden dev-photo-anim ${isSectionVisible ? 'animate' : ''}`}
      >
        {/* Right-side developer portrait with object-fit so the face stays well framed on all screen sizes */}
        <div className="absolute inset-0 sm:left-[42%] md:left-[45%] lg:left-[46%] right-0 top-0 h-full sm:h-[520px] lg:h-[560px]">
          {shouldLoadBg && (
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-11-27_at_10.33.44_AM_36ab97e6.jpeg"
              alt="Muhammad Imran Khan — Founder and Lead Developer of Gen Z Interactive Simulations"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[28%_top] sm:object-[28%_18%] lg:object-[32%_18%] select-none pointer-events-none"
            />
          )}

          {/* Soft left & bottom fade into the white footer canvas on desktop/tablet */}
          <div
            className="absolute inset-0 pointer-events-none hidden sm:block"
            style={{
              background:
                'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.85) 11%, rgba(255, 255, 255, 0.35) 22%, rgba(255, 255, 255, 0) 36%)'
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-28 pointer-events-none hidden sm:block"
            style={{
              background:
                'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.72) 45%, rgba(255, 255, 255, 0) 100%)'
            }}
          />
        </div>

        {/* Blue curved background design matching the original developer section */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block"
          style={{ mixBlendMode: 'multiply' }}
        >
          <defs>
            <linearGradient id="devCurveTopBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#1E88E5" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#1546A8" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="devCurveAccentBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="devCurveBottomBlue" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#1E88E5" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#1546A8" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          {/* Sweeping upper-right blue wave above the desk/laptop white studio zone */}
          <path
            d="M 1030 0 C 1135 55, 1285 95, 1440 195 L 1440 0 Z"
            fill="url(#devCurveAccentBlue)"
          />
          <path
            d="M 1110 0 C 1210 52, 1320 98, 1440 165 L 1440 0 Z"
            fill="url(#devCurveTopBlue)"
          />
          {/* Sweeping lower-right blue wave framing the bottom-right footer corner */}
          <path
            d="M 960 800 C 1120 715, 1295 620, 1440 500 L 1440 800 Z"
            fill="url(#devCurveAccentBlue)"
          />
          <path
            d="M 1055 800 C 1200 725, 1335 645, 1440 555 L 1440 800 Z"
            fill="url(#devCurveBottomBlue)"
          />
        </svg>

        {/* Readability overlays preserving crisp text legibility on desktop and mobile */}
        <div
          className="absolute inset-0 pointer-events-none z-0 hidden sm:block"
          style={{
            background:
              'linear-gradient(to right, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.94) 40%, rgba(255, 255, 255, 0.28) 52%, rgba(255, 255, 255, 0) 64%)'
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-0 block sm:hidden"
          style={{
            background:
              'linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.88) 68%, rgba(255, 255, 255, 0.58) 100%)'
          }}
        />
      </div>

      {/* Full-Width Inner Content Area */}
      <div className={`w-full max-w-6xl mx-auto flex flex-col space-y-8 relative z-10 dev-text-anim ${isSectionVisible ? 'animate' : ''}`}>
        {/* Top Developer Showcase */}
        <div className="w-full md:max-w-xl lg:max-w-2xl text-left space-y-4">
          {/* 1. Monogram / Logo */}
          <div className="flex items-center justify-start bg-transparent p-0 m-0 border-0 shadow-none">
            <img
              src="/genz-logo-transparent.png?v=3"
              alt="Gen Z Interactive Simulations Official Logo"
              loading="lazy"
              decoding="async"
              className="block select-none pointer-events-none drop-shadow-sm"
              style={{ display: 'block', maxHeight: '60px', width: 'auto', objectFit: 'contain', background: 'transparent' }}
            />
          </div>

          {/* 2. Brand Title & Subtitle */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase font-heading text-slate-900 drop-shadow-2xs">
              GEN Z INTERACTIVE SIMULATIONS
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-bold tracking-wide text-amber-700">
              Digital Laboratory Portal &bull; {displaySimCount} Verified Simulations
            </p>
          </div>

          {/* 3. Developer Profile & Contacts */}
          <div className="space-y-3.5">
            <div className="space-y-1">
              <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-slate-950 tracking-tight drop-shadow-2xs">
                Muhammad Imran Khan
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-bold text-slate-800 flex flex-wrap items-center justify-start gap-x-2 gap-y-1">
                <span className="font-semibold text-slate-900">MSc Computer Science</span>
                <span className="text-slate-400 font-bold">&bull;</span>
                <span className="font-semibold text-slate-900">Software Developer &amp; Website Developer</span>
                <span className="text-slate-400 font-bold">&bull;</span>
                <span className="font-semibold text-slate-900">Founder of Gen Z Interactive Simulations</span>
              </p>
            </div>

            {/* Developer Detailed Profile Bio - 3 Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm md:text-[14px] font-normal leading-relaxed text-slate-800 text-left pt-1">
              <p>
                Muhammad Imran Khan is a highly skilled Software Developer and Website Developer with a Master&apos;s degree in Computer Science (MSc). He is the founder, creator, designer and lead developer of the Gen Z Interactive Simulations portal, a professional digital laboratory platform offering {displaySimCount} verified interactive simulations for students, teachers, schools and academies.
              </p>
              <p>
                He has strong expertise in modern web development, interactive 3D visualization, real-time physics and math engines, animation, responsive design and educational technology. Every simulation he builds is fast, colorful, visually rich and simple to use, turning difficult textbook concepts into clear, hands-on experiences that students enjoy and remember. His labs run smoothly on laptops, desktops, Chromebooks, smart boards and projectors, with true 4K fullscreen projection for classroom use.
              </p>
              <p>
                His work is aligned with the National Curriculum of Pakistan (Session 2026-27) and covers all levels, from Play Group, Nursery and Prep up to higher classes, across Mathematics, Physics, Chemistry, Biology, Earth &amp; Space, Computer Science and English Language Arts. He also develops custom simulations, educational websites and interactive learning software for any grade or curriculum, with a strong focus on quality, accuracy, simple English and student-friendly design.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Isolated Custom Simulation Request Card */}
        <FooterCustomSimCard
          onOpenRequestModal={() => setIsRequestModalOpen(true)}
          developerGmailLink={developerGmailLink}
        />

        {/* 5. Footer Bottom Copyright & Curriculum Alignment */}
        <div className="w-full max-w-4xl pt-2">
          <div className="w-full h-px mb-4 bg-slate-400/40" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-800">
            <p className="text-center sm:text-left drop-shadow-2xs">
              &copy; 2026 Gen Z Interactive Simulations. All Rights Reserved.
            </p>
            <span className="px-3.5 py-1 rounded-full text-[11px] font-bold border shadow-xs whitespace-nowrap bg-white/90 text-slate-800 border-slate-300 backdrop-blur-xs">
              Aligned with National Curriculum of Pakistan (Session 2026-27)
            </span>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Request a Simulation — loaded only on demand */}
      {isRequestModalOpen && (
        <React.Suspense fallback={null}>
          <RequestSimulationModal
            isOpen={isRequestModalOpen}
            onClose={() => setIsRequestModalOpen(false)}
          />
        </React.Suspense>
      )}
    </footer>
  );
};

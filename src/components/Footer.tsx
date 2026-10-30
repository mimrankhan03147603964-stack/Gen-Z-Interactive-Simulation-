import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
  totalSimulations?: number;
}

export const Footer: React.FC<FooterProps> = ({ totalSimulations = 109 }) => {
  const displaySimCount = totalSimulations >= 109 ? totalSimulations : 109;

  // Typewriter effect state for "Need a Custom Simulation?" and its description
  const customSimTitle = "Need a Custom Simulation?";
  const customSimDesc = "If any specific topic, chapter, or grade-level concept is missing from any textbook or curriculum, you can get custom-tailored interactive simulations developed specifically for your educational standards and classroom requirements. Reach out to the developer directly to request and integrate new simulations into this portal.";

  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedDesc, setDisplayedDesc] = useState('');
  const [typewriterPhase, setTypewriterPhase] = useState<'idle' | 'typing-title' | 'typing-desc' | 'completed'>('idle');
  const [isCardHovered, setIsCardHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) {
      setTypewriterPhase('typing-title');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTypewriterPhase((prev) => (prev === 'idle' ? 'typing-title' : prev));
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (typewriterPhase === 'typing-title') {
      if (displayedTitle.length < customSimTitle.length) {
        timer = setTimeout(() => {
          setDisplayedTitle(customSimTitle.slice(0, displayedTitle.length + 1));
        }, 40);
      } else {
        timer = setTimeout(() => {
          setTypewriterPhase('typing-desc');
        }, 200);
      }
    } else if (typewriterPhase === 'typing-desc') {
      if (displayedDesc.length < customSimDesc.length) {
        timer = setTimeout(() => {
          setDisplayedDesc(customSimDesc.slice(0, displayedDesc.length + 1));
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
  }, [typewriterPhase, displayedTitle, displayedDesc, isCardHovered]);

  return (
    <footer 
      id="developer"
      className="w-full mt-auto py-10 sm:py-16 px-4 sm:px-8 lg:px-12 shrink-0 select-none transition-all scroll-mt-28 relative border-t shadow-2xl overflow-hidden"
      style={{
        backgroundImage: "url('/assets/aistudio/WhatsApp_Image_2026-10-30_at_12.01.49_PM_dcfd610d.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderTop: '2px solid #F5A623',
        width: '100%',
        maxWidth: '100%',
        borderRadius: '0px'
      }}
    >
      {/* Light white-to-transparent overlay on the left so the developer name stays readable */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 hidden sm:block"
        style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.97) 0%, rgba(255, 255, 255, 0.90) 36%, rgba(255, 255, 255, 0.55) 58%, rgba(255, 255, 255, 0) 82%)'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0 block sm:hidden"
        style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.90) 70%, rgba(255, 255, 255, 0.6) 100%)'
        }}
      />

      {/* Full-Width Inner Content Area with No Empty Side Gaps */}
      <div className="w-full max-w-6xl mx-auto flex flex-col space-y-8 relative z-10">
        
        {/* Top Developer Showcase: Left-aligned over the light white overlay */}
        <div className="w-full md:max-w-xl lg:max-w-2xl text-center md:text-left space-y-4">
          
          {/* 1. Monogram / Logo */}
          <div className="flex items-center justify-center md:justify-start bg-transparent p-0 m-0 border-0 shadow-none">
            <img 
              src="/genz-logo-transparent.png?v=3" 
              alt="Gen Z Interactive Simulations Official Logo" 
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
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-slate-950 tracking-tight drop-shadow-2xs">
                Muhammad Imran Khan
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-bold text-slate-700 flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1">
                <span className="font-semibold text-slate-800">MSc Computer Science</span>
                <span className="text-slate-400 font-bold">&bull;</span>
                <span className="font-semibold text-slate-800">Software &amp; Web Page Developer</span>
              </p>
            </div>

            {/* Contacts & Links strictly unchanged */}
            <div className="text-xs sm:text-sm font-bold flex items-center justify-center md:justify-start flex-wrap gap-x-3 gap-y-2 pt-1">
              <span 
                className="font-black uppercase tracking-wider text-xs px-2.5 py-1 rounded-md border shadow-xs"
                style={{
                  backgroundColor: '#1546A8',
                  color: '#FFFFFF',
                  borderColor: '#2D62D1'
                }}
              >
                Contacts:
              </span>
              <a 
                href="tel:03007603964" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-xs font-mono font-black transition-all hover:scale-105 active:scale-95 border"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CBD5E1',
                  color: '#0F172A'
                }}
                title="Call 03007603964"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: '#D97706' }} />
                <span>03007603964</span>
              </a>
              <span style={{ color: '#64748B' }} className="font-black">/</span>
              <a 
                href="tel:03147603964" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-xs font-mono font-black transition-all hover:scale-105 active:scale-95 border"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CBD5E1',
                  color: '#0F172A'
                }}
                title="Call 03147603964"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: '#D97706' }} />
                <span>03147603964</span>
              </a>
              <span style={{ color: '#64748B' }} className="font-black">|</span>
              <a 
                href="https://wa.me/923147603964" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fx-pulse-whatsapp inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-black transition-all shadow-md hover:scale-105 active:scale-95 border text-white"
                style={{
                  backgroundColor: '#25D366',
                  borderColor: '#1EBE5D'
                }}
                title="Chat on WhatsApp: 03147603964"
              >
                <MessageCircle className="w-4 h-4 text-white shrink-0" />
                <span>WhatsApp: 03147603964</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. Elegant Developer Message Box: Custom Simulation Request Card */}
        <div 
          ref={cardRef}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
          className="w-full max-w-4xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 text-left shadow-xl transition-all border backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(21, 70, 168, 0.92)',
            borderColor: '#F5A623',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.35)'
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
                    {customSimTitle}
                  </h3>
                  <h3 className="col-start-1 row-start-1 text-lg sm:text-xl font-black font-heading text-white flex items-center">
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

          <div className="grid mb-4">
            <p className="col-start-1 row-start-1 text-xs sm:text-sm font-medium leading-relaxed invisible select-none pointer-events-none" aria-hidden="true">
              {customSimDesc}
            </p>
            <p className="col-start-1 row-start-1 text-xs sm:text-sm font-medium leading-relaxed" style={{ color: '#DBE4F7' }}>
              {displayedDesc}
              {(typewriterPhase === 'typing-desc' || typewriterPhase === 'completed') && (
                <span 
                  className="inline-block w-[2px] h-[1.15em] ml-0.5 bg-[#F5A623] animate-pulse"
                  style={{ verticalAlign: '-0.15em' }}
                />
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href="https://wa.me/923147603964?text=Hello%20Muhammad%20Imran%20Khan,%20I%20would%20like%20to%20request%20a%20custom%20interactive%20simulation%20for%20our%20curriculum:"
              target="_blank"
              rel="noopener noreferrer"
              className="fx-pulse-gold inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-95 cursor-pointer border"
              style={{
                backgroundColor: '#F5A623',
                color: '#1B2A5C',
                borderColor: '#E58E0A'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E58E0A')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5A623')}
              title="Send custom simulation request on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#1B2A5C] shrink-0" />
              <span className="text-[#1B2A5C]">Request Custom Simulation on WhatsApp</span>
            </a>

            <a
              href="tel:03007603964"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-2xs transition-all hover:scale-102 active:scale-95 cursor-pointer border"
              style={{
                backgroundColor: '#1B2A5C',
                color: '#F5A623',
                borderColor: '#F5A623'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1546A8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1B2A5C')}
              title="Call Developer Directly: 03007603964"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: '#F5A623' }} />
              <span className="font-black" style={{ color: '#F5A623' }}>Direct Call: 03007603964</span>
            </a>
          </div>
        </div>

        {/* 5. Footer Bottom Copyright & Curriculum Alignment */}
        <div className="w-full max-w-4xl pt-2">
          <div className="w-full h-px mb-4 bg-slate-400/40" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-800">
            <p className="text-center sm:text-left drop-shadow-2xs">
              &copy; 2026 Gen Z Interactive Simulations. All Rights Reserved.
            </p>
            <span 
              className="px-3.5 py-1 rounded-full text-[11px] font-bold border shadow-xs whitespace-nowrap bg-white/90 text-slate-800 border-slate-300 backdrop-blur-xs"
            >
              Aligned with National Curriculum of Pakistan (Session 2026-27)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

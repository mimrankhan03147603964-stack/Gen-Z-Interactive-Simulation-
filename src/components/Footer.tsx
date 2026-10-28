import React from 'react';
import { MessageCircle, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
  totalSimulations?: number;
}

export const Footer: React.FC<FooterProps> = ({ totalSimulations = 109 }) => {
  const displaySimCount = totalSimulations >= 109 ? totalSimulations : 109;

  return (
    <footer 
      id="developer"
      className="w-full mt-auto py-8 sm:py-12 px-3 sm:px-6 lg:px-8 text-center shrink-0 select-none transition-all scroll-mt-28 relative border-t shadow-lg"
      style={{
        backgroundColor: '#1B2A5C',
        borderTop: '2px solid #F5A623',
        width: '100%',
        maxWidth: '100%',
        borderRadius: '0px'
      }}
    >
      {/* Full-Width Inner Content Area with No Empty Side Gaps */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center space-y-6">
        
        {/* 1. Monogram / Logo centered directly on background - 100% Untouched */}
        <div className="flex items-center justify-center bg-transparent p-0 m-0 border-0 shadow-none">
          <img 
            src="/genz-logo-transparent.png?v=3" 
            alt="Gen Z Interactive Simulations Official Logo" 
            className="block select-none pointer-events-none"
            style={{ display: 'block', maxHeight: '64px', width: 'auto', objectFit: 'contain', background: 'transparent' }}
          />
        </div>

        {/* 2. Brand Title & Subtitle */}
        <div className="space-y-1 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase font-heading" style={{ color: '#FFFFFF' }}>
            GEN Z INTERACTIVE SIMULATIONS
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-semibold tracking-wide" style={{ color: '#F5A623' }}>
            Digital Laboratory Portal &bull; {displaySimCount} Verified Simulations
          </p>
        </div>

        {/* 3. Developer Profile & Contacts */}
        <div className="text-center space-y-2.5 w-full">
          <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed" style={{ color: '#DBE4F7' }}>
            <span className="font-heading font-black text-lg sm:text-xl md:text-2xl" style={{ color: '#FFFFFF' }}>
              Muhammad Imran Khan
            </span>
            {' '}&bull;{' '}
            <span className="font-semibold" style={{ color: '#DBE4F7' }}>MSc Computer Science</span>
            {' '}&bull;{' '}
            <span className="font-semibold" style={{ color: '#DBE4F7' }}>Software &amp; Web Page Developer</span>
          </p>

          <div className="text-xs sm:text-sm font-bold flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
            <span 
              className="font-black uppercase tracking-wider text-xs px-2.5 py-0.5 rounded-md border"
              style={{
                backgroundColor: '#1546A8',
                color: '#F5A623',
                borderColor: '#2D62D1'
              }}
            >
              Contacts:
            </span>
            <a 
              href="tel:03007603964" 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl shadow-2xs font-mono font-black transition-all hover:scale-105 active:scale-95 border"
              style={{
                backgroundColor: '#1546A8',
                borderColor: '#2D62D1',
                color: '#DBE4F7'
              }}
              title="Call 03007603964"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: '#F5A623' }} />
              <span style={{ color: '#DBE4F7' }}>03007603964</span>
            </a>
            <span style={{ color: '#42A5F5' }} className="font-black">/</span>
            <a 
              href="tel:03147603964" 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl shadow-2xs font-mono font-black transition-all hover:scale-105 active:scale-95 border"
              style={{
                backgroundColor: '#1546A8',
                borderColor: '#2D62D1',
                color: '#DBE4F7'
              }}
              title="Call 03147603964"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: '#F5A623' }} />
              <span style={{ color: '#DBE4F7' }}>03147603964</span>
            </a>
            <span style={{ color: '#42A5F5' }} className="font-black">|</span>
            <a 
              href="https://wa.me/923147603964" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl font-black transition-all shadow-md hover:scale-105 active:scale-95 border"
              style={{
                backgroundColor: '#2E9E5B',
                color: '#FFFFFF',
                borderColor: '#2E9E5B'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#238972')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2E9E5B')}
              title="Chat on WhatsApp: 03147603964"
            >
              <MessageCircle className="w-4 h-4 text-white shrink-0" />
              <span className="text-white">WhatsApp: 03147603964</span>
            </a>
          </div>
        </div>

        {/* 4. Elegant Developer Message Box: Custom Simulation Request Card */}
        <div 
          className="w-full max-w-4xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 text-left shadow-lg transition-all border"
          style={{
            backgroundColor: '#1546A8',
            borderColor: '#F5A623',
            boxShadow: '0 8px 30px rgba(21, 70, 168, 0.35)'
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
                <h3 className="text-lg sm:text-xl font-black font-heading text-white">
                  Need a Custom Simulation?
                </h3>
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

          <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4" style={{ color: '#DBE4F7' }}>
            If any specific topic, chapter, or grade-level concept is missing from any textbook or curriculum, you can get custom-tailored interactive simulations developed specifically for your educational standards and classroom requirements. Reach out to the developer directly to request and integrate new simulations into this portal.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href="https://wa.me/923147603964?text=Hello%20Muhammad%20Imran%20Khan,%20I%20would%20like%20to%20request%20a%20custom%20interactive%20simulation%20for%20our%20curriculum:"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-95 cursor-pointer border"
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
          <div className="w-full h-px mb-4" style={{ backgroundColor: '#1546A8' }} />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold" style={{ color: '#DBE4F7' }}>
            <p className="text-center sm:text-left">
              &copy; 2026 Gen Z Interactive Simulations. All Rights Reserved.
            </p>
            <span 
              className="px-3.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs whitespace-nowrap"
              style={{
                backgroundColor: '#1546A8',
                color: '#DBE4F7',
                borderColor: '#2D62D1'
              }}
            >
              Aligned with National Curriculum of Pakistan (Session 2026-27)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

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
      className="w-full mt-auto py-8 sm:py-12 px-3 sm:px-6 lg:px-8 text-center shrink-0 select-none transition-all scroll-mt-28 relative border-t-2 border-emerald-700/40 shadow-2xl"
      style={{
        backgroundColor: '#76C01D',
        width: '100%',
        maxWidth: '100%',
        borderRadius: '0px'
      }}
    >
      {/* Full-Width Inner Content Area with No Empty Side Gaps */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center space-y-6">
        
        {/* 1. Monogram / Logo centered directly on parrot-green background */}
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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase text-[#0f172a] font-heading">
            GEN Z INTERACTIVE SIMULATIONS
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-black tracking-wide text-[#0f172a]/95">
            Digital Laboratory Portal &bull; {displaySimCount} Verified Simulations
          </p>
        </div>

        {/* 3. Developer Profile & Contacts */}
        <div className="text-center space-y-2.5 w-full">
          <p className="text-base sm:text-lg md:text-xl font-bold text-[#0f172a] leading-relaxed">
            <span className="font-heading font-black text-[#0f172a] text-lg sm:text-xl md:text-2xl">
              Muhammad Imran Khan
            </span>
            {' '}&bull;{' '}
            <span className="font-extrabold text-[#0f172a]">MSc Computer Science</span>
            {' '}&bull;{' '}
            <span className="font-extrabold text-[#0f172a]">Software &amp; Web Page Developer</span>
          </p>

          <div className="text-xs sm:text-sm font-bold text-[#0f172a] flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
            <span className="font-black text-[#0f172a] uppercase tracking-wider text-xs px-2.5 py-0.5 rounded-md bg-[#0f172a]/10">
              Contacts:
            </span>
            <a 
              href="tel:03007603964" 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 hover:bg-white text-[#0f172a] border border-[#0f172a]/20 shadow-xs font-mono font-black transition-all hover:scale-105 active:scale-95"
              title="Call 03007603964"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span>03007603964</span>
            </a>
            <span className="text-[#0f172a]/60 font-black">/</span>
            <a 
              href="tel:03147603964" 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 hover:bg-white text-[#0f172a] border border-[#0f172a]/20 shadow-xs font-mono font-black transition-all hover:scale-105 active:scale-95"
              title="Call 03147603964"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span>03147603964</span>
            </a>
            <span className="text-[#0f172a]/60 font-black">|</span>
            <a 
              href="https://wa.me/923147603964" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black transition-all shadow-sm hover:scale-105 active:scale-95 border border-emerald-900/20"
              title="Chat on WhatsApp: 03147603964"
            >
              <MessageCircle className="w-4 h-4 text-slate-950 shrink-0" />
              <span>WhatsApp: 03147603964</span>
            </a>
          </div>
        </div>

        {/* 4. Elegant Developer Message Box: Custom Simulation Request */}
        <div 
          className="w-full max-w-4xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 text-left shadow-xl border-2 border-slate-900/20 bg-white/95 backdrop-blur-sm transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm border border-amber-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider text-emerald-800 block">
                  DEVELOPER DIRECT INQUIRY &amp; CUSTOM LABS
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                  Need a Custom Simulation?
                </h3>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black bg-emerald-100 text-emerald-900 border border-emerald-300 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              Any Grade &bull; Any Curriculum
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed mb-4">
            If any specific topic, chapter, or grade-level concept is missing from any textbook or curriculum, you can get custom-tailored interactive simulations developed specifically for your educational standards and classroom requirements. Reach out to the developer directly to request and integrate new simulations into this portal.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href="https://wa.me/923147603964?text=Hello%20Muhammad%20Imran%20Khan,%20I%20would%20like%20to%20request%20a%20custom%20interactive%20simulation%20for%20our%20curriculum:"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1fae53] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-95 cursor-pointer border border-emerald-800/20"
              title="Send custom simulation request on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Request Custom Simulation on WhatsApp</span>
            </a>

            <a
              href="tel:03147603964"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-102 active:scale-95 cursor-pointer"
              title="Call Developer Directly"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Direct Call: 03147603964</span>
            </a>
          </div>
        </div>

        {/* 5. Footer Bottom Copyright & Curriculum Alignment */}
        <div className="w-full max-w-4xl pt-2">
          <div className="w-full h-px mb-4 bg-[#0f172a]/20" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-[#0f172a]/90">
            <p className="text-center sm:text-left">
              &copy; 2026 Gen Z Interactive Simulations. All Rights Reserved.
            </p>
            <span className="px-3.5 py-1 rounded-full text-[11px] font-black bg-[#0f172a]/10 text-[#0f172a] border border-[#0f172a]/20 shadow-2xs whitespace-nowrap">
              Aligned with National Curriculum of Pakistan (Session 2026-27)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

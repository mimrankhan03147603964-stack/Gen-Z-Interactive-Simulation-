import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
  totalSimulations?: number;
}

export const Footer: React.FC<FooterProps> = ({ totalSimulations = 74 }) => {
  return (
    <footer 
      id="developer"
      className="w-full mt-auto pt-10 pb-8 px-4 border-t-2 border-slate-200 text-center shrink-0 select-none transition-all scroll-mt-28 relative overflow-hidden bg-white text-slate-800 shadow-md"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 relative z-10">
        
        {/* 1. Brand Monogram & Portal Header */}
        <div className="space-y-2 text-center flex flex-col items-center">
          <div 
            className="w-[200px] sm:w-[240px] h-[64px] sm:h-[72px] rounded-xl p-1.5 bg-[#240854] border-2 border-sky-400 shadow-xl overflow-hidden flex items-center justify-center transition-transform hover:scale-105"
            style={{ borderRadius: '12px' }}
          >
            <img 
              src="/genz-official-logo.png" 
              alt="Gen Z Interactive Simulations Official Logo" 
              className="w-full h-full object-contain block select-none pointer-events-none"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div className="space-y-0.5">
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-black tracking-wide uppercase text-slate-900 font-heading drop-shadow-2xs"
            >
              GEN Z INTERACTIVE SIMULATIONS
            </h2>
            <p 
              className="text-xs sm:text-sm font-black tracking-wide text-sky-600"
            >
              Digital Laboratory Portal &bull; {totalSimulations} Verified Simulations
            </p>
          </div>
        </div>

        {/* 2. Simplified, Clean, Professional Developer Details in Solid Rich Navy Card */}
        <div 
          className="w-full max-w-3xl py-5 px-6 rounded-3xl border-2 border-sky-400/60 text-center space-y-2.5 shadow-2xl text-white"
          style={{
            background: 'linear-gradient(135deg, #071530 0%, #0c2352 50%, #081a3d 100%)'
          }}
        >
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            <span className="font-heading font-black text-white text-base sm:text-lg drop-shadow-sm">Muhammad Imran Khan</span>
            {' '}&bull;{' '}
            <span className="text-cyan-300 font-bold">MSc Computer Science</span>
            {' '}&bull;{' '}
            <span className="text-amber-300 font-bold">Software &amp; Web Page Developer</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-200 flex items-center justify-center flex-wrap gap-x-2 gap-y-1 font-medium">
            <span className="text-sky-300 font-bold">Contacts:</span>
            <a 
              href="tel:03007603964" 
              className="text-white hover:text-cyan-300 hover:underline transition-colors font-mono font-black"
              title="Call 03007603964"
            >
              03007603964
            </a>
            <span className="text-sky-400">/</span>
            <a 
              href="tel:03147603964" 
              className="text-white hover:text-cyan-300 hover:underline transition-colors font-mono font-black"
              title="Call 03147603964"
            >
              03147603964
            </a>
            <span className="text-sky-400">/</span>
            <a 
              href="https://wa.me/923147603964" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-md transition-colors"
              title="WhatsApp 03147603964"
            >
              <MessageCircle className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span>WhatsApp: 03147603964</span>
            </a>
          </p>
        </div>

        {/* 3. Footer Bottom Bar with Official Curriculum Alignment */}
        <div className="w-full pt-1 space-y-2">
          <div 
            className="w-full h-px mb-3 bg-slate-200"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-slate-500">
            <p>
              &copy; 2026 Gen Z Interactive Simulations. All Rights Reserved.
            </p>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-2xs">
              Aligned with National Curriculum of Pakistan (Session 2026-27)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

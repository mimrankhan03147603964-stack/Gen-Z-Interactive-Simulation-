import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer 
      id="developer"
      className="w-full mt-auto pt-10 pb-8 px-4 border-t-2 border-blue-400/60 text-center shrink-0 select-none transition-all scroll-mt-28 relative overflow-hidden bg-[#071329] text-white shadow-2xl"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 relative z-10">
        
        {/* 1. Brand Monogram & Portal Header on Solid Navy Pedestal */}
        <div className="space-y-2 text-center flex flex-col items-center">
          <div 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-[#0f2347] border-2 border-blue-400 shadow-xl overflow-visible flex items-center justify-center transition-transform hover:scale-105"
            style={{
              boxShadow: '0 8px 24px -5px rgba(2, 132, 199, 0.4)'
            }}
          >
            <img 
              src="/genz-monogram.png" 
              alt="Gen Z Interactive Simulations Monogram Logo" 
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <div className="space-y-0.5">
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-black tracking-wide uppercase text-white font-heading drop-shadow-md"
            >
              GEN Z INTERACTIVE SIMULATIONS
            </h2>
            <p 
              className="text-xs sm:text-sm font-bold tracking-wide text-cyan-300"
            >
              Digital Laboratory Portal &bull; 74 Verified Simulations
            </p>
          </div>
        </div>

        {/* 2. Simplified, Clean, Professional Developer Details */}
        <div className="w-full max-w-3xl py-4 px-6 rounded-2xl bg-[#10244c] border-2 border-blue-400 text-center space-y-2 text-slate-100 shadow-xl">
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            <span className="font-heading font-black text-white text-base sm:text-lg">Muhammad Imran Khan</span>
            {' '}&bull;{' '}
            <span className="text-cyan-200 font-medium">MSc Computer Science</span>
            {' '}&bull;{' '}
            <span className="text-blue-200 font-medium">Software &amp; Web Page Developer</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center flex-wrap gap-x-2 gap-y-1 font-medium">
            <span className="text-slate-400 font-bold">Contacts:</span>
            <a 
              href="tel:03007603964" 
              className="text-cyan-300 hover:text-cyan-100 hover:underline transition-colors font-mono font-bold"
              title="Call 03007603964"
            >
              03007603964
            </a>
            <span className="text-slate-500">/</span>
            <a 
              href="tel:03147603964" 
              className="text-cyan-300 hover:text-cyan-100 hover:underline transition-colors font-mono font-bold"
              title="Call 03147603964"
            >
              03147603964
            </a>
            <span className="text-slate-500">/</span>
            <a 
              href="https://wa.me/923147603964" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-200 hover:underline transition-colors font-bold"
              title="WhatsApp 03147603964"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp: 03147603964</span>
            </a>
          </p>
        </div>

        {/* 3. Footer Bottom Bar with Official Curriculum Alignment */}
        <div className="w-full pt-1 space-y-2">
          <div 
            className="w-full h-px mb-3 bg-slate-800"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-slate-400">
            <p>
              &copy; 2026 Gen Z Interactive Simulations. All Rights Reserved.
            </p>
            <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 shadow-xs">
              Aligned with National Curriculum of Pakistan (Session 2026-27)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

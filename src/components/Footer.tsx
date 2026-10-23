import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
  totalSimulations?: number;
}

export const Footer: React.FC<FooterProps> = ({ totalSimulations = 74 }) => {
  return (
    <footer 
      id="developer"
      className="w-full mt-auto py-8 px-4 text-center shrink-0 select-none transition-all scroll-mt-28 relative"
    >
      {/* Unified Parrot Green Footer / Developer Container */}
      <div 
        className="max-w-4xl mx-auto rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center space-y-4 shadow-lg border border-emerald-600/30"
        style={{
          backgroundColor: '#76C01D',
          borderRadius: '16px'
        }}
      >
        {/* 1. Monogram / Logo centered directly on parrot-green background (No inner box, no border, no dark shield) */}
        <div className="flex items-center justify-center bg-transparent">
          <img 
            src="/genz-official-logo.png" 
            alt="Gen Z Interactive Simulations Official Logo" 
            className="block select-none pointer-events-none rounded-md"
            style={{ display: 'block', maxHeight: '56px', width: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* 2. Brand Title & Subtitle */}
        <div className="space-y-0.5 text-center">
          <h2 className="text-xl sm:text-2xl font-black tracking-wide uppercase text-[#0f172a] font-heading">
            GEN Z INTERACTIVE SIMULATIONS
          </h2>
          <p className="text-xs sm:text-sm font-black tracking-wide text-[#0f172a]/90">
            Digital Laboratory Portal &bull; {totalSimulations} Verified Simulations
          </p>
        </div>

        {/* 3. Developer Profile & Contacts directly on the parrot-green surface */}
        <div className="text-center space-y-2 pt-1 w-full">
          <p className="text-base sm:text-lg font-bold text-[#0f172a] leading-relaxed">
            <span className="font-heading font-black text-[#0f172a] text-lg sm:text-xl">Muhammad Imran Khan</span>
            {' '}&bull;{' '}
            <span className="font-extrabold text-[#0f172a]">MSc Computer Science</span>
            {' '}&bull;{' '}
            <span className="font-extrabold text-[#0f172a]">Software &amp; Web Page Developer</span>
          </p>

          <div className="text-sm font-bold text-[#0f172a] flex items-center justify-center flex-wrap gap-x-2 gap-y-1.5">
            <span className="font-black text-[#0f172a]">Contacts:</span>
            <a 
              href="tel:03007603964" 
              className="text-[#0f172a] hover:underline font-mono font-black"
              title="Call 03007603964"
            >
              03007603964
            </a>
            <span className="text-[#0f172a]/70 font-black">/</span>
            <a 
              href="tel:03147603964" 
              className="text-[#0f172a] hover:underline font-mono font-black"
              title="Call 03147603964"
            >
              03147603964
            </a>
            <span className="text-[#0f172a]/70 font-black">/</span>
            <a 
              href="https://wa.me/923147603964" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0f172a] hover:underline font-bold transition-colors"
              title="WhatsApp 03147603964"
            >
              <MessageCircle className="w-4 h-4 text-[#0f172a] shrink-0" />
              <span>WhatsApp: 03147603964</span>
            </a>
          </div>
        </div>

        {/* 4. Footer Bottom Details */}
        <div className="w-full pt-2">
          <div className="w-full h-px mb-3 bg-[#0f172a]/20" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold text-[#0f172a]/85">
            <p>
              &copy; 2026 Gen Z Interactive Simulations. All Rights Reserved.
            </p>
            <span className="px-3 py-1 rounded-full text-[11px] font-black bg-[#0f172a]/10 text-[#0f172a] border border-[#0f172a]/20 shadow-2xs">
              Aligned with National Curriculum of Pakistan (Session 2026-27)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

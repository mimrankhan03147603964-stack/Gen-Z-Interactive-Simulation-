import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  return (
    <footer 
      id="developer"
      className="w-full pt-10 pb-8 px-4 border-t text-center shrink-0 select-none transition-all scroll-mt-20 relative overflow-hidden"
      style={{
        backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.95)' : 'rgba(248, 250, 252, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(226, 232, 240, 0.8)',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 relative z-10">
        
        {/* 1. Brand Monogram & Portal Header */}
        <div className="space-y-2 text-center flex flex-col items-center">
          <div 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 border shadow-lg overflow-hidden flex items-center justify-center transition-transform hover:scale-105"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(12, 26, 59, 0.85)' : 'rgba(255, 255, 255, 0.92)',
              borderColor: '#38bdf8',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: '0 8px 24px rgba(2, 132, 199, 0.22)'
            }}
          >
            <img 
              src="/genz-edtech-monogram.svg" 
              alt="Gen Z EdTech Interactive Monogram Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-0.5">
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-black tracking-wide uppercase"
              style={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}
            >
              GEN Z EDTECH INTERACTIVE SIMULATION
            </h2>
            <p 
              className="text-xs sm:text-sm font-semibold tracking-wide"
              style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
            >
              Digital Laboratory Portal
            </p>
          </div>
        </div>

        {/* 2. Seamless Developer Details - Directly on the page, completely without any box, border, or container */}
        <div className="w-full flex flex-col items-center justify-center gap-2 pt-1 text-center">
          {/* Line 1: Developer Name, Degree, and Designation */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-sm sm:text-base font-semibold">
            <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              &lt;/&gt; DEVELOPED BY
            </span>
            <span 
              className="font-black text-base sm:text-lg tracking-tight"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              Muhammad Imran Khan
            </span>
            <span className="text-slate-400">•</span>
            <span 
              className="font-bold text-xs sm:text-sm"
              style={{ color: isDarkMode ? '#c084fc' : '#7e22ce' }}
            >
              MSc Computer Science
            </span>
            <span className="text-slate-400">•</span>
            <span 
              className="font-bold text-xs sm:text-sm"
              style={{ color: isDarkMode ? '#38bdf8' : '#0284c7' }}
            >
              Software &amp; Web Page Developer
            </span>
          </div>

          {/* Line 2: Contact Numbers and WhatsApp */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm pt-0.5">
            {/* Call 03007603964 */}
            <a 
              href="tel:03007603964" 
              className="inline-flex items-center gap-1.5 font-mono font-bold transition-colors hover:underline"
              style={{ color: isDarkMode ? '#34d399' : '#059669' }}
              title="Call 03007603964"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              <span>03007603964</span>
            </a>

            <span className="text-slate-400">|</span>

            {/* Call 03147603964 */}
            <a 
              href="tel:03147603964" 
              className="inline-flex items-center gap-1.5 font-mono font-bold transition-colors hover:underline"
              style={{ color: isDarkMode ? '#38bdf8' : '#0284c7' }}
              title="Call 03147603964"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-sky-500" />
              <span>03147603964</span>
            </a>

            <span className="text-slate-400">|</span>

            {/* WhatsApp Direct Chat */}
            <a 
              href="https://wa.me/923147603964" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold transition-colors hover:underline"
              style={{ color: isDarkMode ? '#4ade80' : '#16a34a' }}
              title="WhatsApp Muhammad Imran Khan"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0 text-green-500 fill-green-500/20" />
              <span>WhatsApp: 03147603964</span>
            </a>
          </div>
        </div>

        {/* 3. Footer Bottom Bar */}
        <div className="w-full pt-1">
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0' }}
          />

          <p 
            className="text-xs font-medium tracking-normal text-center"
            style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
          >
            © 2026 Gen Z EdTech Interactive Simulation. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

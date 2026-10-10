import React from 'react';
import { Phone, Code2, Sparkles, CheckCircle } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  return (
    <footer className={`w-full py-3 px-4 border-t text-center shrink-0 shadow-sm select-none transition-colors ${
      isDarkMode
        ? 'bg-gradient-to-r from-[#060e22] via-[#091738] to-[#060e22] border-blue-500/30 text-slate-200'
        : 'bg-white border-slate-200 text-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-xs font-semibold">
        <span className={`font-mono font-black px-1.5 py-0.5 rounded border ${
          isDarkMode
            ? 'text-cyan-400 bg-blue-950/80 border-cyan-400/30'
            : 'text-blue-700 bg-blue-50 border-blue-200'
        }`}>
          &lt;/&gt;
        </span>
        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Developed by:</span>
        <span className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Muhammad Imran Khan (MSc Computer Science)
        </span>
        <span className="text-blue-500 font-bold">|</span>
        <span className={`font-bold ${isDarkMode ? 'text-cyan-300' : 'text-blue-700'}`}>
          Software &amp; Web Page Developer
        </span>
        <span className="text-blue-500 font-bold">|</span>
        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Phone:</span>
        <a 
          href="tel:03007603964" 
          className={`btn-3d px-2.5 py-0.5 rounded-full border font-mono font-bold transition-all shadow-2xs ${
            isDarkMode
              ? 'bg-[#0d224d] hover:bg-blue-600 border-blue-400/40 text-cyan-300 hover:text-white'
              : 'bg-blue-50 hover:bg-blue-600 border-blue-300 text-blue-700 hover:text-white'
          }`}
        >
          03007603964
        </a>
        <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>/</span>
        <a 
          href="tel:03147603964" 
          className={`btn-3d px-2.5 py-0.5 rounded-full border font-mono font-bold transition-all shadow-2xs ${
            isDarkMode
              ? 'bg-[#0d224d] hover:bg-blue-600 border-blue-400/40 text-cyan-300 hover:text-white'
              : 'bg-blue-50 hover:bg-blue-600 border-blue-300 text-blue-700 hover:text-white'
          }`}
        >
          03147603964
        </a>
        <span className="text-blue-500 font-bold hidden md:inline">|</span>
        <span className="hidden md:inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>4K Ultra Certified</span>
        </span>
      </div>
    </footer>
  );
};

import React from 'react';
import { Phone, Code2, Sparkles, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-3 px-4 bg-gradient-to-r from-[#060e22] via-[#091738] to-[#060e22] border-t border-blue-500/30 text-center shrink-0 shadow-2xl select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-xs text-slate-200 font-semibold">
        <span className="font-mono text-cyan-400 font-black px-1.5 py-0.5 rounded bg-blue-950/80 border border-cyan-400/30">&lt;/&gt;</span>
        <span className="text-slate-300">Developed by:</span>
        <span className="text-white font-black drop-shadow-xs">Muhammad Imran Khan (MSc Computer Science)</span>
        <span className="text-blue-500 font-bold">|</span>
        <span className="text-cyan-300 font-bold">Software &amp; Web Page Developer</span>
        <span className="text-blue-500 font-bold">|</span>
        <span className="text-slate-300">Phone:</span>
        <a 
          href="tel:03007603964" 
          className="btn-3d px-2.5 py-0.5 rounded-full bg-[#0d224d] hover:bg-blue-600 border border-blue-400/40 text-cyan-300 hover:text-white font-mono font-bold transition-all shadow-xs"
        >
          03007603964
        </a>
        <span className="text-slate-500">/</span>
        <a 
          href="tel:03147603964" 
          className="btn-3d px-2.5 py-0.5 rounded-full bg-[#0d224d] hover:bg-blue-600 border border-blue-400/40 text-cyan-300 hover:text-white font-mono font-bold transition-all shadow-xs"
        >
          03147603964
        </a>
        <span className="text-blue-500 font-bold hidden md:inline">|</span>
        <span className="hidden md:inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>4K Ultra Certified</span>
        </span>
      </div>
    </footer>
  );
};

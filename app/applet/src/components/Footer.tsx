import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-3.5 px-4 bg-[#050e24] border-t border-blue-900/60 text-center shrink-0">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-blue-200/90 font-medium">
        <span className="font-mono text-cyan-400 font-black">&lt;/&gt;</span>
        <span className="text-blue-300">Developed by:</span>
        <span className="text-white font-extrabold tracking-wide">Muhammad Imran Khan (MSc Computer Science)</span>
        <span className="text-blue-600 font-bold">|</span>
        <span className="text-blue-300">Software &amp; web page developer</span>
        <span className="text-blue-600 font-bold">|</span>
        <span className="text-blue-300">Phone:</span>
        <a href="tel:03007603964" className="text-cyan-400 hover:text-cyan-300 hover:underline font-mono font-bold tracking-wider">03007603964</a>
        <span className="text-blue-600 font-bold">/</span>
        <a href="tel:03147603964" className="text-cyan-400 hover:text-cyan-300 hover:underline font-mono font-bold tracking-wider">03147603964</a>
      </div>
    </footer>
  );
};

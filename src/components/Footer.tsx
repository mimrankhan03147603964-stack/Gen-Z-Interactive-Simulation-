import React from 'react';
import { Phone, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-3.5 px-4 bg-white border-t border-slate-200 text-center shrink-0">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-700 font-semibold">
        <span className="font-mono text-blue-600 font-bold">&lt;/&gt;</span>
        <span>Developed by:</span>
        <span className="text-slate-900 font-bold">Muhammad Imran Khan (MSc Computer Science)</span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-600">Software &amp; web page developer</span>
        <span className="text-slate-400">|</span>
        <span>Phone:</span>
        <a href="tel:03007603964" className="text-blue-600 hover:underline font-mono font-bold">03007603964</a>
        <span className="text-slate-400">/</span>
        <a href="tel:03147603964" className="text-blue-600 hover:underline font-mono font-bold">03147603964</a>
      </div>
    </footer>
  );
};

import React from 'react';

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  return (
    <footer 
      id="developer"
      className="w-full py-5 px-4 border-t text-center shrink-0 shadow-sm select-none transition-colors opacity-100 scroll-mt-20"
      style={{
        backgroundColor: isDarkMode ? '#060e22' : '#ffffff',
        borderTop: isDarkMode ? '1.5px solid #1e3a8a' : '1.5px solid #cbd5e1',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-xs font-bold">
        <span 
          className="font-mono font-black px-1.5 py-0.5 rounded shadow-xs"
          style={{
            backgroundColor: isDarkMode ? '#0c224f' : '#eff6ff',
            color: isDarkMode ? '#38bdf8' : '#1d4ed8',
            borderColor: isDarkMode ? '#3b82f6' : '#93c5fd',
            borderWidth: '1.5px',
            borderStyle: 'solid'
          }}
        >
          &lt;/&gt;
        </span>
        <span style={{ color: isDarkMode ? '#e2e8f0' : '#334155' }}>Developed by:</span>
        <span 
          className="font-black"
          style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
        >
          Muhammad Imran Khan (MSc Computer Science)
        </span>
        <span style={{ color: '#2563eb', fontWeight: 900 }}>|</span>
        <span 
          className="font-black"
          style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
        >
          Software &amp; Web Page Developer
        </span>
        <span style={{ color: '#2563eb', fontWeight: 900 }}>|</span>
        <span style={{ color: isDarkMode ? '#e2e8f0' : '#334155' }}>Phone:</span>
        <a 
          href="tel:03007603964" 
          className="btn-3d px-2.5 py-0.5 rounded-full font-mono font-black transition-all shadow-2xs"
          style={{
            backgroundColor: isDarkMode ? '#0d224d' : '#eff6ff',
            borderColor: isDarkMode ? '#3b82f6' : '#93c5fd',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            color: isDarkMode ? '#38bdf8' : '#1d4ed8'
          }}
        >
          03007603964
        </a>
        <span style={{ color: isDarkMode ? '#64748b' : '#94a3b8' }}>/</span>
        <a 
          href="tel:03147603964" 
          className="btn-3d px-2.5 py-0.5 rounded-full font-mono font-black transition-all shadow-2xs"
          style={{
            backgroundColor: isDarkMode ? '#0d224d' : '#eff6ff',
            borderColor: isDarkMode ? '#3b82f6' : '#93c5fd',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            color: isDarkMode ? '#38bdf8' : '#1d4ed8'
          }}
        >
          03147603964
        </a>
      </div>
    </footer>
  );
};

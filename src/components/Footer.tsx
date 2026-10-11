import React from 'react';
import { Code2, Phone } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  return (
    <footer 
      id="developer"
      className="w-full py-8 px-4 border-t text-center shrink-0 shadow-sm select-none transition-colors opacity-100 scroll-mt-20"
      style={{
        backgroundColor: isDarkMode ? '#060e22' : '#ffffff',
        borderTop: isDarkMode ? '1.5px solid #1e3a8a' : '1.5px solid #cbd5e1',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-3">
        
        {/* Developer Badge */}
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs"
          style={{
            backgroundColor: isDarkMode ? '#0c224f' : '#eff6ff',
            color: isDarkMode ? '#38bdf8' : '#1d4ed8',
            borderColor: isDarkMode ? '#3b82f6' : '#93c5fd',
            borderWidth: '1.5px',
            borderStyle: 'solid'
          }}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Developed By</span>
        </div>

        {/* Developer Name & Qualifications - Clear, Prominent & Distinct */}
        <div className="space-y-1">
          <h3 
            className="text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
          >
            Muhammad Imran Khan{' '}
            <span 
              className="text-base sm:text-lg font-bold"
              style={{ color: isDarkMode ? '#93c5fd' : '#2563eb' }}
            >
              (MSc Computer Science)
            </span>
          </h3>
          <p 
            className="text-sm sm:text-base font-extrabold tracking-wide"
            style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
          >
            Software &amp; Web Page Developer
          </p>
        </div>

        {/* Contact Numbers */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <span 
            className="text-xs font-bold mr-1"
            style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}
          >
            Phone:
          </span>
          <a 
            href="tel:03007603964" 
            className="btn-3d inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono font-black text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            style={{
              backgroundColor: isDarkMode ? '#0d224d' : '#eff6ff',
              borderColor: isDarkMode ? '#3b82f6' : '#93c5fd',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: isDarkMode ? '#38bdf8' : '#1d4ed8'
            }}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>03007603964</span>
          </a>
          <span style={{ color: isDarkMode ? '#475569' : '#cbd5e1' }}>|</span>
          <a 
            href="tel:03147603964" 
            className="btn-3d inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono font-black text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            style={{
              backgroundColor: isDarkMode ? '#0d224d' : '#eff6ff',
              borderColor: isDarkMode ? '#3b82f6' : '#93c5fd',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: isDarkMode ? '#38bdf8' : '#1d4ed8'
            }}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>03147603964</span>
          </a>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { Phone } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  return (
    <footer 
      id="developer"
      className="w-full pt-12 pb-8 px-4 border-t text-center shrink-0 shadow-sm select-none transition-colors opacity-100 scroll-mt-20"
      style={{
        backgroundColor: isDarkMode ? '#060e22' : '#ffffff',
        borderTop: isDarkMode ? '1.5px solid #1e3a8a' : '1.5px solid #e2e8f0',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
        
        {/* 1. Header & Brand Title */}
        <div className="space-y-2 text-center">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase"
            style={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}
          >
            GEN Z EDTECH INTERACTIVE SIMULATION
          </h2>
          <p 
            className="text-sm sm:text-base font-semibold tracking-wide"
            style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
          >
            Digital Laboratory Portal
          </p>
        </div>

        {/* 2. Developer Profile Card */}
        <div 
          className="w-full max-w-xl mx-auto rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-center gap-4 transition-all shadow-sm"
          style={{
            backgroundColor: isDarkMode ? '#0c1a3b' : '#f8fafc',
            border: isDarkMode ? '1.5px solid #1e3a8a' : '1.5px solid #e2e8f0',
          }}
        >
          {/* Badge: </> DEVELOPED BY */}
          <div 
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase shadow-2xs"
            style={{
              backgroundColor: isDarkMode ? '#172554' : '#eff6ff',
              color: isDarkMode ? '#60a5fa' : '#2563eb',
              border: isDarkMode ? '1px solid #2563eb' : '1px solid #bfdbfe',
            }}
          >
            <span className="font-mono font-black">&lt;/&gt;</span>
            <span>DEVELOPED BY</span>
          </div>

          {/* Name & Degree */}
          <div className="text-center space-y-1">
            <h3 
              className="text-lg sm:text-xl md:text-2xl font-black tracking-tight"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              Muhammad Imran Khan{' '}
              <span 
                className="text-sm sm:text-base md:text-lg font-bold"
                style={{ color: isDarkMode ? '#93c5fd' : '#2563eb' }}
              >
                (MSc Computer Science)
              </span>
            </h3>

            {/* Designation */}
            <p 
              className="text-xs sm:text-sm font-semibold tracking-wide"
              style={{ color: isDarkMode ? '#38bdf8' : '#0284c7' }}
            >
              Software &amp; Web Page Developer
            </p>
          </div>

          {/* Contact Buttons: Clean pill-style clickable buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a 
              href="tel:03007603964" 
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-mono font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                borderColor: isDarkMode ? '#38bdf8' : '#cbd5e1',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: isDarkMode ? '#38bdf8' : '#1e293b',
              }}
              title="Call 03007603964"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              <span>03007603964</span>
            </a>

            <a 
              href="tel:03147603964" 
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-mono font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                borderColor: isDarkMode ? '#38bdf8' : '#cbd5e1',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: isDarkMode ? '#38bdf8' : '#1e293b',
              }}
              title="Call 03147603964"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              <span>03147603964</span>
            </a>
          </div>
        </div>

        {/* 3. Footer Bottom Bar */}
        <div className="w-full pt-2">
          {/* Subtle divider line */}
          <div 
            className="w-full h-px mb-6"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0' }}
          />

          {/* Copyright Notice */}
          <p 
            className="text-xs sm:text-sm font-medium tracking-normal text-center"
            style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
          >
            © 2026 Gen Z EdTech Interactive Simulation. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

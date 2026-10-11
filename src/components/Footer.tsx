import React from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  return (
    <footer 
      id="developer"
      className="w-full pt-14 pb-10 px-4 border-t text-center shrink-0 select-none transition-all scroll-mt-20 relative overflow-hidden"
      style={{
        backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.95)' : 'rgba(248, 250, 252, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(226, 232, 240, 0.8)',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8 relative z-10">
        
        {/* 1. Brand Monogram & Portal Header */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <div 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-2 border shadow-lg overflow-hidden flex items-center justify-center transition-transform hover:scale-105"
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
          <div className="space-y-1">
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
        </div>

        {/* 2. Developer Card with High-Tech Dark Gradient & Glassmorphism */}
        <div 
          className="w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-9 flex flex-col items-center justify-center gap-5 transition-all shadow-2xl relative overflow-hidden"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.92) 0%, rgba(10, 25, 59, 0.94) 50%, rgba(7, 16, 40, 0.96) 100%)' 
              : 'linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 249, 255, 0.94) 50%, rgba(238, 242, 255, 0.96) 100%)',
            border: isDarkMode ? '1.5px solid rgba(56, 189, 248, 0.35)' : '1.5px solid rgba(147, 197, 253, 0.75)',
            boxShadow: isDarkMode 
              ? '0 16px 50px 0 rgba(0, 0, 0, 0.65), 0 0 30px rgba(56, 189, 248, 0.15)' 
              : '0 16px 50px 0 rgba(37, 99, 235, 0.12), 0 0 30px rgba(59, 130, 246, 0.15)'
          }}
        >
          {/* Subtle Grid / Circuit Ambient Accent Lines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: isDarkMode
                ? 'radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px), radial-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px)'
                : 'radial-gradient(rgba(2, 132, 199, 0.35) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px'
            }}
          />

          {/* Top Developer Header Badge */}
          <div className="relative z-10 flex items-center justify-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-black tracking-widest uppercase shadow-sm"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.75)' : 'rgba(219, 234, 254, 0.92)',
                color: isDarkMode ? '#93c5fd' : '#1d4ed8',
                border: isDarkMode ? '1.5px solid #3b82f6' : '1.5px solid #93c5fd',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
              }}
            >
              <span className="font-mono font-black text-cyan-400">&lt;/&gt;</span>
              <span>DEVELOPED BY</span>
            </div>
          </div>

          {/* Developer Avatar Ring (Initials Monogram Avatar) */}
          <div className="relative z-10 flex flex-col items-center">
            <div 
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 border-2 shadow-2xl overflow-hidden flex items-center justify-center transition-transform hover:scale-105"
              style={{
                borderColor: '#38bdf8',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                boxShadow: isDarkMode 
                  ? '0 0 35px rgba(56, 189, 248, 0.35), inset 0 0 15px rgba(56, 189, 248, 0.2)' 
                  : '0 0 35px rgba(2, 132, 199, 0.25), inset 0 0 15px rgba(2, 132, 199, 0.15)'
              }}
            >
              <div 
                className="w-full h-full rounded-full flex flex-col items-center justify-center font-black tracking-wider text-2xl sm:text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #7c3aed 100%)',
                  color: '#ffffff',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                }}
              >
                MIK
              </div>
            </div>

            {/* Sub-badge: Lead Simulation Architect */}
            <div className="mt-2.5">
              <span 
                className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm"
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  backgroundColor: isDarkMode ? 'rgba(2, 132, 199, 0.25)' : 'rgba(224, 242, 254, 0.85)',
                  color: isDarkMode ? '#38bdf8' : '#0369a1',
                  border: isDarkMode ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(186, 230, 253, 0.9)'
                }}
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>LEAD SIMULATION ARCHITECT</span>
              </span>
            </div>
          </div>

          {/* Developer Name & Professional Credentials */}
          <div className="relative z-10 text-center space-y-2 w-full">
            <div 
              className="inline-block px-6 sm:px-8 py-2 rounded-2xl border shadow-sm transition-all"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(3, 105, 161, 0.3)' : 'rgba(224, 242, 254, 0.85)',
                borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.5)' : 'rgba(186, 230, 253, 0.95)',
                boxShadow: isDarkMode ? 'inset 0 1px 1px rgba(255, 255, 255, 0.2)' : 'inset 0 1px 1px rgba(255, 255, 255, 0.9)'
              }}
            >
              <h3 
                className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight"
                style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
              >
                Muhammad Imran Khan
              </h3>
            </div>

            {/* Academic Qualification Tag */}
            <div>
              <span 
                className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-black font-mono tracking-wide"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(124, 58, 237, 0.3)' : 'rgba(243, 232, 255, 0.95)',
                  color: isDarkMode ? '#c084fc' : '#7e22ce',
                  border: isDarkMode ? '1px solid rgba(168, 85, 247, 0.45)' : '1px solid rgba(216, 180, 254, 0.85)'
                }}
              >
                MSc Computer Science
              </span>
            </div>

            {/* Professional Role Title */}
            <p 
              className="text-xs sm:text-sm md:text-base font-bold tracking-wide pt-1"
              style={{ color: isDarkMode ? '#38bdf8' : '#0284c7' }}
            >
              Software &amp; Web Page Developer
            </p>
          </div>

          {/* Contact Actions: High-contrast buttons */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
            
            {/* Call 03007603964 */}
            <a 
              href="tel:03007603964" 
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-mono font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.94)',
                borderColor: '#10b981',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: isDarkMode ? '#34d399' : '#047857',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
              }}
              title="Call 03007603964"
            >
              <Phone className="w-4 h-4 shrink-0 text-emerald-500 fill-emerald-500/20" />
              <span>03007603964</span>
            </a>

            {/* Call 03147603964 */}
            <a 
              href="tel:03147603964" 
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-mono font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.94)',
                borderColor: '#0284c7',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: isDarkMode ? '#38bdf8' : '#0369a1',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)'
              }}
              title="Call 03147603964"
            >
              <Phone className="w-4 h-4 shrink-0 text-sky-500 fill-sky-500/20" />
              <span>03147603964</span>
            </a>

            {/* WhatsApp Direct Chat */}
            <a 
              href="https://wa.me/923147603964" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(6, 78, 59, 0.7)' : 'rgba(236, 253, 245, 0.95)',
                borderColor: '#22c55e',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: isDarkMode ? '#86efac' : '#15803d',
                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.25)'
              }}
              title="WhatsApp Muhammad Imran Khan"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-green-500 fill-green-500/20" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 3. Footer Bottom Bar */}
        <div className="w-full pt-2">
          <div 
            className="w-full h-px mb-6"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0' }}
          />

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

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { getThemeForIndex } from '../data/sequentialPalette';

interface WebsiteFeaturesProps {
  isDarkMode?: boolean;
}

export const WebsiteFeatures: React.FC<WebsiteFeaturesProps> = ({ isDarkMode = false }) => {
  const features = [
    {
      title: 'Optimized for Laptops & PCs',
      badge: 'DUAL 4K READY',
      badgeColor: '#0284c7',
      description: 'Native responsive execution on computer monitors, Chromebooks, interactive classroom smart boards, and widescreen projectors.',
      // Vibrant 3D dual-screen setup (sleek modern laptop + desktop display) with an illuminated electric blue & cyan glassmorphism glow
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="lapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="lapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="deskGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#lapGlow)" />
          {/* Desktop Monitor in background */}
          <rect x="22" y="8" width="34" height="24" rx="3.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="24.5" y="10.5" width="29" height="19" rx="2" fill="url(#screenGrad)" />
          {/* Desktop Monitor Stand */}
          <path d="M37 32 L41 32 L43 38 L35 38 Z" fill="#475569" stroke="#0ea5e9" strokeWidth="0.8" />
          <rect x="33" y="38" width="12" height="2.5" rx="1" fill="#64748b" />
          {/* Desktop screen graphics */}
          <circle cx="39" cy="20" r="5" fill="#ffffff" fillOpacity="0.85" />
          <path d="M28 25 Q34 18 40 22 T50 16" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          {/* Foreground Modern Sleek Laptop */}
          {/* Laptop Screen */}
          <rect x="8" y="22" width="30" height="20" rx="2.5" fill="url(#lapGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="10.5" y="24.5" width="25" height="15" rx="1.5" fill="#0369a1" />
          <rect x="11.5" y="25.5" width="23" height="13" rx="1" fill="url(#deskGrad)" />
          {/* Laptop screen code lines */}
          <line x1="14" y1="29" x2="26" y2="29" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="32.5" x2="31" y2="32.5" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="36" x2="22" y2="36" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" />
          {/* Laptop Base / Keyboard */}
          <path d="M5 42 L41 42 L44 48 L2 48 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
          {/* Trackpad */}
          <rect x="19" y="44" width="8" height="2.5" rx="0.6" fill="#475569" />
          {/* Glowing front light bar */}
          <line x1="12" y1="47.5" x2="34" y2="47.5" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Real-Time Physics & Math Engines',
      badge: '60 FPS LIVE',
      badgeColor: '#f59e0b',
      description: 'Continuous ray tracing, dynamic particle kinetics, harmonic Keplerian orbits, and circuit Ohm\'s law calculators running live at 60 FPS.',
      // Rich 3D gold-plated microchip processor surrounded by glowing orange/amber circuit board traces & live logic paths
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="chipGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="goldChip" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#chipGlow)" />
          {/* Circuit Board Trace Lines (Orange / Amber / Yellow) */}
          <path d="M12 16 L22 16 L22 22" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="16" r="2" fill="#fbbf24" />
          <path d="M8 32 L20 32" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="8" cy="32" r="2" fill="#fbbf24" />
          <path d="M14 48 L22 48 L22 42" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="14" cy="48" r="2" fill="#fbbf24" />
          
          <path d="M52 16 L42 16 L42 22" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="52" cy="16" r="2" fill="#fbbf24" />
          <path d="M56 32 L44 32" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="56" cy="32" r="2" fill="#fbbf24" />
          <path d="M50 48 L42 48 L42 42" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="50" cy="48" r="2" fill="#fbbf24" />

          {/* Golden Microchip Body with 3D Bevel */}
          <rect x="20" y="20" width="24" height="24" rx="4" fill="url(#goldChip)" stroke="#fef08a" strokeWidth="1.5" />
          {/* Microchip Core Ceramic */}
          <rect x="23.5" y="23.5" width="17" height="17" rx="2.5" fill="url(#coreGrad)" stroke="#fbbf24" strokeWidth="1" />
          {/* Glowing Core Logic Symbol */}
          <path d="M28 32 L32 27 L36 32 L32 37 Z" fill="#fbbf24" />
          <circle cx="32" cy="32" r="2" fill="#ffffff" />
          {/* Chip Pins Top/Bottom/Left/Right */}
          <rect x="25" y="17" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="31" y="17" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="37" y="17" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="25" y="44" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="31" y="44" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="37" y="44" width="2" height="3" fill="#fbbf24" rx="0.5" />
        </svg>
      )
    },
    {
      title: 'True 4K Fullscreen Projection',
      badge: 'CINEMA 4K UHD',
      badgeColor: '#a855f7',
      description: 'Single-click theater mode eliminates browser distractions and fills the display for high-impact classroom lectures and science demonstrations.',
      // Bold, colorful 3D Ultra HD 4K cinema projection emblem with deep purple and magenta gradient beams
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="projGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="projBeam" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#e879f9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#c026d3" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#projGlow)" />
          {/* Cinema Projection Light Cone Beams */}
          <polygon points="18,32 54,12 54,52" fill="url(#projBeam)" />
          {/* 3D Modern Projector Body */}
          <rect x="8" y="24" width="20" height="16" rx="3.5" fill="#1e1b4b" stroke="#c084fc" strokeWidth="1.5" />
          {/* Projector Glass Optical Lens */}
          <ellipse cx="28" cy="32" rx="4" ry="6" fill="url(#lensGrad)" stroke="#e879f9" strokeWidth="1.4" />
          <ellipse cx="29" cy="32" rx="1.8" ry="3" fill="#ffffff" fillOpacity="0.9" />
          {/* Projection Lens Shutter ring */}
          <rect x="25" y="28" width="2" height="8" fill="#a855f7" />
          {/* Cinema Screen Frame in background */}
          <rect x="38" y="16" width="20" height="32" rx="2" fill="#0f172a" stroke="url(#frameGrad)" strokeWidth="1.8" />
          {/* "4K" Emblem inside Cinema Screen */}
          <text x="48" y="32" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">4K</text>
          <text x="48" y="41" textAnchor="middle" dominantBaseline="middle" fill="#f472b6" fontSize="6" fontWeight="800" fontFamily="system-ui, sans-serif">UHD</text>
        </svg>
      )
    },
    {
      title: 'Multidisciplinary Curriculum & English Arts',
      badge: 'STEM + ARTS',
      badgeColor: '#10b981',
      description: 'Aligned with elementary, secondary, and higher competencies across Physics, Chemistry, Biology, Earth & Space, Math, Computer Science, and English Language Arts.',
      // Rich, colorful 3D open hardbound academic encyclopedia with layered colored bookmarks, glowing educational symbols (A, Ω, π), & emerald ribbon
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="bookGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="pagesLeft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id="pagesRight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#bookGlow)" />
          {/* Hardbound Cover Back Spine */}
          <path d="M8 44 Q32 49 56 44 L56 46 Q32 51 8 46 Z" fill="#064e3b" />
          {/* Thick Hardbound Book Open Covers */}
          <path d="M10 20 Q32 23 32 43 Q10 40 8 43 Z" fill="url(#bookCover)" stroke="#34d399" strokeWidth="1.2" />
          <path d="M54 20 Q32 23 32 43 Q54 40 56 43 Z" fill="url(#bookCover)" stroke="#34d399" strokeWidth="1.2" />
          {/* Left Pages Layer */}
          <path d="M11 19 Q31 22 31 41 Q12 38 10 40 Z" fill="url(#pagesLeft)" stroke="#cbd5e1" strokeWidth="0.8" />
          {/* Right Pages Layer */}
          <path d="M53 19 Q33 22 33 41 Q52 38 54 40 Z" fill="url(#pagesRight)" stroke="#cbd5e1" strokeWidth="0.8" />
          {/* Emerald Silk Bookmark Ribbon draping down */}
          <path d="M32 22 L32 48 L35 44 L38 48 L38 23" fill="#10b981" stroke="#059669" strokeWidth="0.8" />
          {/* Gold Layered Top Ribbon / Bookmarks */}
          <polygon points="20,15 24,15 22,20" fill="#f59e0b" />
          <polygon points="40,15 44,15 42,20" fill="#ec4899" />
          {/* Educational Glyphs Glowing: 'A' on Left Page, 'π' & 'Ω' on Right Page */}
          <text x="20" y="32" textAnchor="middle" dominantBaseline="middle" fill="#0f766e" fontSize="9" fontWeight="900" fontFamily="serif">A</text>
          <text x="44" y="28" textAnchor="middle" dominantBaseline="middle" fill="#0f766e" fontSize="9" fontWeight="900" fontFamily="serif">π</text>
          <text x="44" y="37" textAnchor="middle" dominantBaseline="middle" fill="#047857" fontSize="7" fontWeight="900" fontFamily="serif">Ω</text>
        </svg>
      )
    }
  ];

  return (
    <section 
      id="features" 
      className="w-full rounded-2xl p-6 sm:p-8 space-y-6 transition-all border shadow-lg text-white"
      style={{
        backgroundColor: '#0F172A',
        borderColor: '#334155',
        boxShadow: '0 8px 30px rgba(15, 23, 42, 0.45)'
      }}
    >
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: '#334155' }}
      >
        <div>
          <span 
            className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider inline-block mb-1.5 border font-mono"
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              borderColor: '#60A5FA'
            }}
          >
            Digital Laboratory Architecture
          </span>
          <h2 
            className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading"
          >
            Professional STEM Educational Website Capabilities
          </h2>
        </div>
        <div 
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 border shadow-2xs"
          style={{
            backgroundColor: '#1E293B',
            color: '#CBD5E1',
            borderColor: '#334155'
          }}
        >
          <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
          <span>Verified Digital Laboratory Standard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {features.map((feat, idx) => {
          const theme = getThemeForIndex(idx);

          return (
            <div 
              key={idx}
              className="p-5 sm:p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between group transition-all duration-200 hover:-translate-y-1 cursor-default select-none border"
              style={{
                backgroundColor: theme.bg,
                borderColor: theme.borderColor,
                boxShadow: theme.boxShadow
              }}
            >
              <div className="relative z-10">
                {/* Header with 3D Icon & Feature Badge - Icon SVG untouched */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 p-2 group-hover:scale-105 transition-transform border shadow-xs"
                    style={{
                      backgroundColor: theme.pedestalBg,
                      borderColor: theme.pedestalBorder
                    }}
                  >
                    {feat.renderIcon()}
                  </div>
                  <span 
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wide uppercase border shadow-2xs"
                    style={{
                      backgroundColor: theme.badgeBg,
                      color: theme.badgeText,
                      borderColor: theme.badgeBorder
                    }}
                  >
                    {feat.badge}
                  </span>
                </div>

                <h3 
                  className="text-base font-bold tracking-tight mb-2 leading-snug font-heading"
                  style={{ color: theme.titleColor }}
                >
                  {feat.title}
                </h3>
                <p 
                  className="text-xs font-normal leading-relaxed"
                  style={{ color: theme.textColor }}
                >
                  {feat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

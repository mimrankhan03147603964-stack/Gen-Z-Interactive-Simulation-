import React from 'react';

interface IconProps {
  className?: string;
  size?: number | string;
}

/**
 * Modern High-Definition Multi-Color STEM Discipline & Category Icons
 * Designed with 4K vector sharpness, vivid gradients, and transparent backgrounds.
 */

// 1. All Simulations / Multidisciplinary Hub
export const MultiStemAllIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stemGrad1" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#C084FC" />
      </linearGradient>
      <linearGradient id="stemGrad2" x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    {/* Base Layered Plate */}
    <path d="M16 3L28 9.5L16 16L4 9.5L16 3Z" fill="url(#stemGrad1)" />
    <path d="M4 14.5L16 21L28 14.5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 19.5L16 26L28 19.5" stroke="url(#stemGrad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="9.5" r="2.5" fill="#FFFFFF" />
  </svg>
);

// 2. Physics & Motion (Quantum Atom with Electric Core)
export const MultiPhysicsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="physCore" cx="16" cy="16" r="6" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#67E8F9" />
        <stop offset="60%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0284C7" />
      </radialGradient>
      <linearGradient id="physOrbit1" x1="2" y1="16" x2="30" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#818CF8" />
      </linearGradient>
      <linearGradient id="physOrbit2" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    {/* Orbit Ellipses */}
    <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(-30 16 16)" stroke="url(#physOrbit1)" strokeWidth="1.8" strokeDasharray="3 1" />
    <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(30 16 16)" stroke="url(#physOrbit2)" strokeWidth="1.8" />
    <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(90 16 16)" stroke="#0284C7" strokeWidth="1.5" />
    {/* Central Nucleus */}
    <circle cx="16" cy="16" r="4.5" fill="url(#physCore)" />
    <circle cx="14.5" cy="14.5" r="1.5" fill="#FFFFFF" />
    {/* Orbiting Electrons */}
    <circle cx="26" cy="10" r="1.8" fill="#F59E0B" />
    <circle cx="6" cy="11" r="1.8" fill="#38BDF8" />
    <circle cx="16" cy="28.5" r="1.8" fill="#10B981" />
  </svg>
);

// 3. Chemistry & Matter (Bubbling Reaction Flask)
export const MultiChemistryIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chemFluid" x1="8" y1="16" x2="24" y2="29" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E879F9" />
        <stop offset="50%" stopColor="#C026D3" />
        <stop offset="100%" stopColor="#7E22CE" />
      </linearGradient>
      <linearGradient id="chemGlass" x1="12" y1="3" x2="20" y2="29" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    {/* Flask Neck and Rim */}
    <path d="M13 4H19M14 4V11L7 24C6.2 25.5 7.3 27.5 9 27.5H23C24.7 27.5 25.8 25.5 25 24L18 11V4" stroke="url(#chemGlass)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Liquid Fill */}
    <path d="M8.5 24.5L13.5 15.5C14.5 16.5 17.5 16.5 18.5 15.5L23.5 24.5C24.2 25.8 23.2 26.5 22 26.5H10C8.8 26.5 7.8 25.8 8.5 24.5Z" fill="url(#chemFluid)" />
    {/* Bubbles */}
    <circle cx="13" cy="21" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
    <circle cx="18" cy="19" r="2" fill="#FDF4FF" fillOpacity="0.9" />
    <circle cx="15" cy="24" r="1.2" fill="#FFFFFF" fillOpacity="0.7" />
    <circle cx="16" cy="8" r="1" fill="#C084FC" />
  </svg>
);

// 4. Biology & Life (Vibrant DNA Double Helix & Living Cells)
export const MultiBiologyIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bioStrand1" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="bioStrand2" x1="28" y1="4" x2="4" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    {/* DNA Strands */}
    <path d="M8 5C11 11 21 15 24 21C27 27 24 28 24 28" stroke="url(#bioStrand1)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 5C21 11 11 15 8 21C5 27 8 28 8 28" stroke="url(#bioStrand2)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Connecting Base Pairs with Colored Nodes */}
    <line x1="10" y1="7" x2="22" y2="7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="12" x2="20" y2="12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <line x1="15" y1="16" x2="17" y2="16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="20" x2="20" y2="20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="25" x2="22" y2="25" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 5. Earth & Space (Planetary Globe & Orbital Space Horizon)
export const MultiEarthSpaceIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="earthGlobe" cx="16" cy="16" r="12" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="70%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0C4A6E" />
      </radialGradient>
      <linearGradient id="earthRing" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    {/* Globe Base */}
    <circle cx="16" cy="16" r="10" fill="url(#earthGlobe)" />
    {/* Continents */}
    <path d="M12 11C13 10 15 11 15 13C15 15 13 16 11 16C9 16 10 13 12 11Z" fill="#10B981" />
    <path d="M18 17C19 16 22 17 21 19C20 21 18 22 17 20C16 18 17 18 18 17Z" fill="#10B981" />
    <path d="M18 9C19 8 22 9 22 11C22 12 20 13 19 12Z" fill="#10B981" />
    {/* Planetary Ring */}
    <ellipse cx="16" cy="16" rx="14" ry="4.5" transform="rotate(-25 16 16)" stroke="url(#earthRing)" strokeWidth="2" />
    {/* Star Twinkle */}
    <circle cx="26" cy="6" r="1.2" fill="#FDE047" />
  </svg>
);

// 6. Mathematics & Logic (Golden Scientific Calculator & Geometric Sigma)
export const MultiMathIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mathGrad" x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#C2410C" />
      </linearGradient>
      <linearGradient id="mathScreen" x1="9" y1="7" x2="23" y2="13" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    {/* Calculator Body */}
    <rect x="6" y="4" width="20" height="24" rx="4" fill="url(#mathGrad)" stroke="#FCD34D" strokeWidth="1.5" />
    {/* Display */}
    <rect x="9" y="7" width="14" height="6" rx="1.5" fill="url(#mathScreen)" />
    <text x="21" y="11.5" fontSize="4.5" fontWeight="900" fontFamily="monospace" fill="#78350F" textAnchor="end">π=3.14</text>
    {/* Keypad Buttons */}
    <rect x="9" y="15" width="3" height="3" rx="0.8" fill="#FFFFFF" fillOpacity="0.9" />
    <rect x="14.5" y="15" width="3" height="3" rx="0.8" fill="#FFFFFF" fillOpacity="0.9" />
    <rect x="20" y="15" width="3" height="3" rx="0.8" fill="#FEF08A" />
    <rect x="9" y="20" width="3" height="3" rx="0.8" fill="#FFFFFF" fillOpacity="0.9" />
    <rect x="14.5" y="20" width="3" height="3" rx="0.8" fill="#FFFFFF" fillOpacity="0.9" />
    <rect x="20" y="20" width="3" height="3" rx="0.8" fill="#FED7AA" />
  </svg>
);

// 7. Computer Science & IT (Silicon Processor & Illuminated Terminal)
export const MultiCompSciIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="csScreen" x1="5" y1="6" x2="27" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>
      <linearGradient id="csGlow" x1="7" y1="8" x2="25" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    {/* Monitor / Laptop Screen */}
    <rect x="6" y="6" width="20" height="15" rx="2.5" fill="url(#csScreen)" stroke="#38BDF8" strokeWidth="1.5" />
    {/* Code Lines on Screen */}
    <path d="M10 11L13 13.5L10 16" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="15" y1="13.5" x2="21" y2="13.5" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="9" x2="18" y2="9" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
    {/* Laptop Base Stand */}
    <path d="M4 22L7 21H25L28 22C28.5 22.2 28.5 23 28 23H4C3.5 23 3.5 22.2 4 22Z" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
  </svg>
);

// 8. English & Grammar (Illuminated Literary Volume & Quill)
export const MultiEnglishIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bookCoverGrad" x1="4" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#4338CA" />
      </linearGradient>
    </defs>
    {/* Open Book Wings */}
    <path d="M16 8C19 6 24 6 27 7V23C24 22 19 22 16 24C13 22 8 22 5 23V7C8 6 13 6 16 8Z" fill="url(#bookCoverGrad)" stroke="#C4B5FD" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Spine line */}
    <line x1="16" y1="8" x2="16" y2="24" stroke="#E0E7FF" strokeWidth="1.5" strokeLinecap="round" />
    {/* Page Text Marks */}
    <line x1="8" y1="11" x2="13" y2="11" stroke="#E0E7FF" strokeWidth="1" strokeLinecap="round" />
    <line x1="8" y1="14" x2="13" y2="14" stroke="#E0E7FF" strokeWidth="1" strokeLinecap="round" />
    <line x1="8" y1="17" x2="12" y2="17" stroke="#E0E7FF" strokeWidth="1" strokeLinecap="round" />
    <line x1="19" y1="11" x2="24" y2="11" stroke="#E0E7FF" strokeWidth="1" strokeLinecap="round" />
    <line x1="19" y1="14" x2="24" y2="14" stroke="#E0E7FF" strokeWidth="1" strokeLinecap="round" />
    {/* Golden Bookmark Ribbon */}
    <path d="M15 8V16L16.5 14.5L18 16V8" fill="#F59E0B" />
  </svg>
);

// 9. Early Childhood Care & Education (ECCE) (Playful 3D Educational Blocks & Sparkles)
export const MultiEcceIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ecceRed" x1="4" y1="14" x2="16" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="100%" stopColor="#E11D48" />
      </linearGradient>
      <linearGradient id="ecceBlue" x1="16" y1="14" x2="28" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="ecceYellow" x1="10" y1="4" x2="22" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#EAB308" />
      </linearGradient>
    </defs>
    {/* Block A (Top) */}
    <rect x="11" y="4" width="10" height="10" rx="2" fill="url(#ecceYellow)" stroke="#FEF08A" strokeWidth="1.2" />
    <text x="16" y="11" fontSize="7" fontWeight="900" fill="#713F12" textAnchor="middle" dominantBaseline="middle">A</text>
    {/* Block B (Left) */}
    <rect x="5" y="16" width="10" height="10" rx="2" fill="url(#ecceRed)" stroke="#FECDD3" strokeWidth="1.2" />
    <text x="10" y="23" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle" dominantBaseline="middle">B</text>
    {/* Block C (Right) */}
    <rect x="17" y="16" width="10" height="10" rx="2" fill="url(#ecceBlue)" stroke="#BAE6FD" strokeWidth="1.2" />
    <text x="22" y="23" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle" dominantBaseline="middle">C</text>
  </svg>
);

// 10. Urdu & Linguistics (Emerald & Gold Calligraphy Scroll)
export const MultiUrduIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="urduGrad" x1="5" y1="5" x2="27" y2="27" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064E3B" />
      </linearGradient>
    </defs>
    {/* Parchment Medallion */}
    <circle cx="16" cy="16" r="12" fill="url(#urduGrad)" stroke="#FDE047" strokeWidth="1.5" />
    {/* Urdu Letter Ain / Nuqta Decorative Glyph */}
    <path d="M12 18C12 14 17 11 20 13C22 14.5 21 17 19 18C17 19 14 20 13 22H21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="9" r="1.5" fill="#FDE047" />
  </svg>
);

// --- Grade Level Tier Multi-Color Icons ---

// All Grades: Mortarboard with Golden Tassel
export const MultiAllGradesIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradCap" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
    {/* Cap Diamond */}
    <polygon points="16,6 28,12 16,18 4,12" fill="url(#gradCap)" stroke="#93C5FD" strokeWidth="1.5" />
    {/* Cap Skull Base */}
    <path d="M9 15V21C9 24 16 26 16 26C16 26 23 24 23 21V15" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
    {/* Golden Tassel */}
    <path d="M25 13.5V22" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="25" cy="23" r="1.5" fill="#F59E0B" />
  </svg>
);

// Primary Grades 1-5: Rainbow Explorer Star
export const MultiPrimaryIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="starGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path d="M16 3L19.5 11.5L28 12.5L21.5 18.5L23.5 27L16 22.5L8.5 27L10.5 18.5L4 12.5L12.5 11.5L16 3Z" fill="url(#starGrad)" stroke="#FEF08A" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="16" cy="15" r="3" fill="#FFFFFF" fillOpacity="0.8" />
  </svg>
);

// Middle School Grades 6-8: Precision Scientific Compass
export const MultiMiddleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="compRing" x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="12" fill="#0F172A" stroke="url(#compRing)" strokeWidth="2" />
    {/* Compass Needle (Red North, Cyan South) */}
    <polygon points="16,6 19,16 16,14 13,16" fill="#EF4444" />
    <polygon points="16,26 19,16 16,18 13,16" fill="#38BDF8" />
    <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
  </svg>
);

// Secondary / Matric: Multi-Chemical Lab Flask
export const MultiSecondaryIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="matricGrad" x1="6" y1="6" x2="26" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
    </defs>
    <path d="M12 4H20M14 4V11L7 24C6.2 25.5 7.3 27.5 9 27.5H23C24.7 27.5 25.8 25.5 25 24L18 11V4" stroke="url(#matricGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 24.5L13 17C14.5 18 17.5 18 19 17L23 24.5C23.5 25.5 22.8 26.5 21.5 26.5H10.5C9.2 26.5 8.5 25.5 9 24.5Z" fill="#818CF8" fillOpacity="0.8" />
    <circle cx="14" cy="22" r="1.5" fill="#FFFFFF" />
    <circle cx="18" cy="20" r="1.2" fill="#FFFFFF" />
  </svg>
);

// Higher Secondary / F.Sc: Cybernetic Brain Circuit
export const MultiHigherIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brainGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    {/* Left Hemisphere */}
    <path d="M14 6C10 6 7 9 7 13C7 15 8 17 9 18C7 19 6 21 7 23C8 25 11 26 14 26" stroke="url(#brainGrad)" strokeWidth="2" strokeLinecap="round" />
    {/* Right Hemisphere */}
    <path d="M18 6C22 6 25 9 25 13C25 15 24 17 23 18C25 19 26 21 25 23C24 25 21 26 18 26" stroke="url(#brainGrad)" strokeWidth="2" strokeLinecap="round" />
    {/* Synaptic Core Circuit */}
    <circle cx="16" cy="11" r="1.8" fill="#F59E0B" />
    <circle cx="16" cy="16" r="2.2" fill="#38BDF8" />
    <circle cx="16" cy="21" r="1.8" fill="#10B981" />
    <line x1="16" y1="11" x2="16" y2="21" stroke="#FFFFFF" strokeWidth="1.5" />
    <line x1="11" y1="16" x2="21" y2="16" stroke="#FFFFFF" strokeWidth="1.5" />
  </svg>
);

// --- External Resources Multi-Color 3D Icons ---

// PhET Research Simulation
export const MultiPhetIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="phetG1" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="phetG2" x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    <ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(-30 20 20)" stroke="url(#phetG1)" strokeWidth="2.5" />
    <ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(30 20 20)" stroke="url(#phetG2)" strokeWidth="2.5" />
    <ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(90 20 20)" stroke="#10B981" strokeWidth="2" />
    <circle cx="20" cy="20" r="5" fill="#38BDF8" />
    <circle cx="18" cy="18" r="2" fill="#FFFFFF" />
    <circle cx="32" cy="13" r="2.2" fill="#F59E0B" />
    <circle cx="8" cy="14" r="2.2" fill="#10B981" />
  </svg>
);

// GeoGebra Dynamic Mathematics
export const MultiGeoGebraIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ggbGrad" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="50%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#9A3412" />
      </linearGradient>
    </defs>
    {/* Elliptical Cartesian Orbit & Nodes */}
    <ellipse cx="20" cy="20" rx="16" ry="11" transform="rotate(-15 20 20)" stroke="url(#ggbGrad)" strokeWidth="2.5" strokeDasharray="5 2" />
    <circle cx="12" cy="16" r="3.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="24" cy="12" r="3.5" fill="#4ADE80" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="29" cy="25" r="3.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="16" cy="27" r="3.5" fill="#A855F7" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="4.5" fill="#EA580C" stroke="#FFFFFF" strokeWidth="1.5" />
  </svg>
);

// oPhysics Interactive Optics
export const MultiOphysicsIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ophPrism" x1="12" y1="8" x2="28" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    {/* Prism Triangle */}
    <polygon points="20,8 32,30 8,30" fill="url(#ophPrism)" stroke="#60A5FA" strokeWidth="2" strokeLinejoin="round" />
    {/* Incident White Beam */}
    <line x1="4" y1="22" x2="15" y2="20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    {/* Refracted Spectrum (Red, Green, Violet) */}
    <line x1="24" y1="19" x2="36" y2="14" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="21" x2="37" y2="20" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="23" x2="36" y2="26" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Walter Fendt Physics Models
export const MultiWalterFendtIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wfGlobe" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064E3B" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="14" fill="url(#wfGlobe)" stroke="#6EE7B7" strokeWidth="2" />
    <ellipse cx="20" cy="20" rx="14" ry="5" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="20" y1="6" x2="20" y2="34" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="20" cy="20" r="3" fill="#FBBF24" />
  </svg>
);

// Falstad Circuit Simulator
export const MultiFalstadIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="falstadChip" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="50%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#4C1D95" />
      </linearGradient>
    </defs>
    {/* Microchip Body */}
    <rect x="10" y="10" width="20" height="20" rx="4" fill="url(#falstadChip)" stroke="#C4B5FD" strokeWidth="2" />
    {/* Logic Symbol on Chip */}
    <circle cx="20" cy="20" r="4.5" fill="#F59E0B" />
    {/* Circuit Pins */}
    <line x1="14" y1="6" x2="14" y2="10" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="6" x2="20" y2="10" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="6" x2="26" y2="10" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="30" x2="14" y2="34" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="30" x2="20" y2="34" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="30" x2="26" y2="34" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="20" x2="10" y2="20" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    <line x1="30" y1="20" x2="34" y2="20" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Molecular Workbench
export const MultiMolecularIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="molGrad1" x1="6" y1="6" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="100%" stopColor="#E11D48" />
      </linearGradient>
      <linearGradient id="molGrad2" x1="20" y1="20" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    {/* Bonds */}
    <line x1="14" y1="14" x2="26" y2="26" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
    <line x1="14" y1="26" x2="26" y2="14" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
    {/* Atoms */}
    <circle cx="14" cy="14" r="6" fill="url(#molGrad1)" stroke="#FECDD3" strokeWidth="1.5" />
    <circle cx="26" cy="26" r="6" fill="url(#molGrad1)" stroke="#FECDD3" strokeWidth="1.5" />
    <circle cx="26" cy="14" r="5" fill="url(#molGrad2)" stroke="#BAE6FD" strokeWidth="1.5" />
    <circle cx="14" cy="26" r="5" fill="url(#molGrad2)" stroke="#BAE6FD" strokeWidth="1.5" />
  </svg>
);

// MyPhysicsLab 2D Engine
export const MultiMyPhysicsLabIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mplGrad" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="50%" stopColor="#0891B2" />
        <stop offset="100%" stopColor="#164E63" />
      </linearGradient>
    </defs>
    {/* Pivot */}
    <circle cx="20" cy="8" r="3" fill="#64748B" />
    {/* Dual Rod Pendulum with Arcs */}
    <line x1="20" y1="8" x2="14" y2="22" stroke="url(#mplGrad)" strokeWidth="3" strokeLinecap="round" />
    <line x1="14" y1="22" x2="27" y2="30" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    {/* Bob Weights */}
    <circle cx="14" cy="22" r="5" fill="#06B6D4" stroke="#E0F2FE" strokeWidth="1.5" />
    <circle cx="27" cy="30" r="5.5" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1.5" />
  </svg>
);

// Tinkercad Virtual Breadboard
export const MultiTinkercadIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tinkerGrad" x1="6" y1="10" x2="34" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
    </defs>
    <rect x="6" y="10" width="28" height="20" rx="3.5" fill="#F8FAFC" stroke="url(#tinkerGrad)" strokeWidth="2.5" />
    {/* Grid tie points */}
    <circle cx="12" cy="15" r="1.5" fill="#64748B" />
    <circle cx="17" cy="15" r="1.5" fill="#64748B" />
    <circle cx="23" cy="15" r="1.5" fill="#64748B" />
    <circle cx="28" cy="15" r="1.5" fill="#64748B" />
    <circle cx="12" cy="20" r="1.5" fill="#64748B" />
    <circle cx="17" cy="20" r="1.5" fill="#64748B" />
    <circle cx="23" cy="20" r="1.5" fill="#64748B" />
    <circle cx="28" cy="20" r="1.5" fill="#64748B" />
    <circle cx="12" cy="25" r="1.5" fill="#64748B" />
    <circle cx="17" cy="25" r="1.5" fill="#64748B" />
    <circle cx="23" cy="25" r="1.5" fill="#64748B" />
    <circle cx="28" cy="25" r="1.5" fill="#64748B" />
    {/* Jumper Wires */}
    <path d="M12 15C12 11 23 11 23 15" stroke="#EF4444" strokeWidth="2" fill="none" />
    <path d="M17 20C17 28 28 28 28 20" stroke="#3B82F6" strokeWidth="2" fill="none" />
  </svg>
);

// Mozaik 3D Holographic Cube
export const MultiMozaikIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mozTop" x1="10" y1="6" x2="30" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#818CF8" />
      </linearGradient>
      <linearGradient id="mozLeft" x1="8" y1="16" x2="20" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
      <linearGradient id="mozRight" x1="20" y1="16" x2="32" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#7E22CE" />
      </linearGradient>
    </defs>
    {/* 3D Isometric Cube */}
    <polygon points="20,6 32,13 20,20 8,13" fill="url(#mozTop)" stroke="#E0E7FF" strokeWidth="1.2" />
    <polygon points="8,13 20,20 20,34 8,27" fill="url(#mozLeft)" stroke="#C7D2FE" strokeWidth="1.2" />
    <polygon points="20,20 32,13 32,27 20,34" fill="url(#mozRight)" stroke="#E9D5FF" strokeWidth="1.2" />
    {/* Holographic sparkle core */}
    <circle cx="20" cy="20" r="3" fill="#FDE047" />
  </svg>
);

// Paper Maker Exam Assessment Tool
export const MultiPaperMakerIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pmPaper" x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F1F5F9" />
      </linearGradient>
      <linearGradient id="pmBadge" x1="22" y1="20" x2="34" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* Document Sheet */}
    <rect x="8" y="6" width="20" height="28" rx="2.5" fill="url(#pmPaper)" stroke="#94A3B8" strokeWidth="1.5" />
    {/* Header bar */}
    <rect x="11" y="10" width="14" height="3" rx="1" fill="#3B82F6" />
    {/* Question lines */}
    <line x1="11" y1="16" x2="22" y2="16" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="20" x2="20" y2="20" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="24" x2="18" y2="24" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="28" x2="16" y2="28" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    {/* Official Gold Seal Badge */}
    <circle cx="28" cy="26" r="6" fill="url(#pmBadge)" stroke="#FEF08A" strokeWidth="1.5" />
    <path d="M26 26L27.5 27.5L30.5 24.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Pedagogical Hub Multi-Color Icons ---

// Zero Lab Cost Electric Icon
export const MultiZeroCostIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="zeroCostGrad" x1="8" y1="4" x2="24" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="40%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    <path d="M18 3L7 16H16L14 29L25 15H16L18 3Z" fill="url(#zeroCostGrad)" stroke="#FEF08A" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="18" cy="6" r="1.5" fill="#FFFFFF" />
  </svg>
);

// Real-Time 60 FPS Microchip Engine Icon
export const MultiFpsEngineIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fpsChipGrad" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
    <rect x="7" y="7" width="18" height="18" rx="3.5" fill="url(#fpsChipGrad)" stroke="#60A5FA" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="4.5" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1.2" />
    <text x="16" y="17.5" fontSize="4" fontWeight="900" fill="#FFFFFF" textAnchor="middle">60</text>
    {/* Golden Bus pins */}
    <line x1="11" y1="4" x2="11" y2="7" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="4" x2="16" y2="7" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="21" y1="4" x2="21" y2="7" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="11" y1="25" x2="11" y2="28" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="25" x2="16" y2="28" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="21" y1="25" x2="21" y2="28" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Safe Chemical Labs Icon
export const MultiSafeLabIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="safeFlaskGrad" x1="6" y1="6" x2="26" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="50%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>
    </defs>
    <path d="M12 4H20M13.5 4V11L7.5 23.5C6.8 25 7.8 27 9.5 27H22.5C24.2 27 25.2 25 24.5 23.5L18.5 11V4" stroke="#FECDD3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 24.5L13 16.5C14 17.5 18 17.5 19 16.5L23 24.5C23.6 25.6 22.8 26.5 21.5 26.5H10.5C9.2 26.5 8.4 25.6 9 24.5Z" fill="url(#safeFlaskGrad)" />
    <circle cx="16" cy="22" r="1.8" fill="#FFFFFF" fillOpacity="0.9" />
    <circle cx="13" cy="20" r="1.2" fill="#FFFFFF" fillOpacity="0.8" />
  </svg>
);

// 100% Curriculum Aligned Gold Shield Icon
export const MultiCurriculumIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="currShield" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    <path d="M16 3L26 7.5V15C26 21.5 21.5 26.5 16 29C10.5 26.5 6 21.5 6 15V7.5L16 3Z" fill="url(#currShield)" stroke="#FEF08A" strokeWidth="1.8" strokeLinejoin="round" />
    {/* Green checkmark in center */}
    <path d="M11 16L14.5 19.5L21.5 12.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


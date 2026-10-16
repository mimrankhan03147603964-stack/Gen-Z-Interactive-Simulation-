import React from 'react';

interface TopicRealisticIconProps {
  indexNumber: string;
  simId?: string;
  className?: string;
  size?: number | string;
}

/**
 * High-definition, fully colored, topic-specific realistic visual emblems
 * for all 33 STEM interactive simulations in the Gen Z EdTech catalog.
 * Each icon features bespoke vector art, rich gradients, 3D shading, and scientific details.
 */
export const TopicRealisticIcon: React.FC<TopicRealisticIconProps> = ({
  indexNumber,
  simId,
  className = "w-10 h-10 sm:w-11 sm:h-11",
  size
}) => {
  const normIndex = indexNumber ? indexNumber.replace(/^0+/, '') : '';
  const idx = parseInt(normIndex, 10);

  const style = size ? { width: size, height: size } : undefined;

  switch (idx) {
    // 01: The Breathing Process
    case 1:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lungTrachea" x1="32" y1="6" x2="32" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="lungLeft" x1="16" y1="20" x2="28" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="60%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
            <linearGradient id="lungRight" x1="48" y1="20" x2="36" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="60%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
            <linearGradient id="diaphragmGrad" x1="10" y1="56" x2="54" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <filter id="glowAir" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Trachea / Windpipe with cartilage rings */}
          <path d="M30 6 H34 V24 H30 Z" fill="url(#lungTrachea)" />
          <line x1="29" y1="10" x2="35" y2="10" stroke="#fee2e2" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="29" y1="14" x2="35" y2="14" stroke="#fee2e2" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="29" y1="18" x2="35" y2="18" stroke="#fee2e2" strokeWidth="1.5" strokeLinecap="round" />
          {/* Main Bronchi split */}
          <path d="M32 23 L22 30 M32 23 L42 30" stroke="#fda4af" strokeWidth="3" strokeLinecap="round" />
          {/* Left Lung Lobe (Anatomical Right) */}
          <path d="M22 28 C14 28 8 36 9 46 C10 52 16 54 26 52 C27 44 26 34 22 28 Z" fill="url(#lungLeft)" />
          {/* Right Lung Lobe */}
          <path d="M42 28 C50 28 56 36 55 46 C54 52 48 54 38 52 C37 44 38 34 42 28 Z" fill="url(#lungRight)" />
          {/* Bronchial Tree network lines */}
          <path d="M22 32 Q17 38 15 44 M22 35 Q22 42 21 48 M42 32 Q47 38 49 44 M42 35 Q42 42 43 48" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          {/* Oxygen / Carbon Dioxide particle flow */}
          <circle cx="32" cy="8" r="2" fill="#38bdf8" filter="url(#glowAir)" />
          <circle cx="20" cy="42" r="1.8" fill="#67e8f9" filter="url(#glowAir)" />
          <circle cx="44" cy="42" r="1.8" fill="#38bdf8" filter="url(#glowAir)" />
          <circle cx="15" cy="47" r="1.5" fill="#f87171" />
          <circle cx="49" cy="47" r="1.5" fill="#f87171" />
          {/* Muscular Diaphragm dome below */}
          <path d="M12 55 Q32 50 52 55" stroke="url(#diaphragmGrad)" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    // 02: Atoms, Light, Sound & Pressure Lab
    case 2:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="prismGrad" x1="16" y1="12" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="laserBeam" x1="4" y1="28" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          {/* Triangular Optical Glass Prism */}
          <polygon points="32,10 12,46 52,46" fill="url(#prismGrad)" stroke="#7dd3fc" strokeWidth="1.8" strokeLinejoin="round" />
          {/* Internal reflection facet */}
          <polygon points="32,10 32,46 52,46" fill="#0284c7" fillOpacity="0.2" />
          {/* Incoming White Laser Light Beam */}
          <line x1="6" y1="36" x2="22" y2="30" stroke="url(#laserBeam)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Dispersed Rainbow Spectrum Beams */}
          <line x1="38" y1="30" x2="58" y2="20" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="33" x2="59" y2="26" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <line x1="41" y1="36" x2="60" y2="32" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="39" x2="59" y2="38" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <line x1="43" y1="42" x2="57" y2="44" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
          {/* Acoustic speaker sound waves in corner */}
          <path d="M12 52 Q18 52 20 58 M10 57 Q14 57 15 61" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Central quantum nucleus */}
          <circle cx="32" cy="32" r="3" fill="#38bdf8" />
          <circle cx="32" cy="32" r="6" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    // 03: Electricity & Circuits Simulator
    case 3:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bulbGlow" cx="32" cy="24" r="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bulbGlass" x1="20" y1="10" x2="44" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#fef08a" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="screwBase" x1="26" y1="40" x2="38" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          {/* Ambient Glow */}
          <circle cx="32" cy="24" r="22" fill="url(#bulbGlow)" />
          {/* Incandescent Glass Bulb Outline */}
          <path d="M32 8 C22 8 16 16 16 26 C16 33 22 38 24 43 H40 C42 38 48 33 48 26 C48 16 42 8 32 8 Z" fill="url(#bulbGlass)" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Glowing Coiled Filament */}
          <path d="M28 41 L28 27 L30 22 L32 25 L34 22 L36 27 L36 41" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="23" r="2.5" fill="#ffffff" />
          {/* Filament Spark Radiance rays */}
          <line x1="32" y1="2" x2="32" y2="5" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="12" x2="15" y2="15" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          <line x1="52" y1="12" x2="49" y2="15" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          <line x1="6" y1="26" x2="10" y2="26" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="26" x2="54" y2="26" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          {/* Brass Threaded Screw Base */}
          <rect x="25" y="43" width="14" height="3" rx="1" fill="url(#screwBase)" stroke="#475569" strokeWidth="0.8" />
          <rect x="26" y="46.5" width="12" height="3" rx="1" fill="url(#screwBase)" stroke="#475569" strokeWidth="0.8" />
          <rect x="27" y="50" width="10" height="3" rx="1" fill="url(#screwBase)" stroke="#475569" strokeWidth="0.8" />
          {/* Electrical Contact Point */}
          <path d="M29 53 H35 L33 56 H31 Z" fill="#334155" />
          {/* Blue Electric Spark Arcs */}
          <path d="M12 44 L16 41 L14 47 L20 44" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M52 44 L48 41 L50 47 L44 44" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // 04: Heat Transfer & Temperature Lab
    case 4:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flameOuter" x1="32" y1="58" x2="32" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="60%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <linearGradient id="flameCore" x1="32" y1="58" x2="32" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id="thermoFluid" x1="53" y1="52" x2="53" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          {/* Conduction Metal Bar across */}
          <rect x="6" y="22" width="40" height="5" rx="2.5" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
          {/* Thermal gradient across conduction bar */}
          <rect x="6" y="22" width="22" height="5" rx="2.5" fill="#f87171" opacity="0.8" />
          {/* Convection fluid pot / beaker */}
          <path d="M12 10 H36 V28 C36 32 32 34 24 34 C16 34 12 32 12 28 Z" fill="#60a5fa" fillOpacity="0.3" stroke="#93c5fd" strokeWidth="1.5" />
          {/* Convection circular arrows */}
          <path d="M20 22 C20 16 28 16 28 22 C28 28 20 28 20 22" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Bunsen Burner flame */}
          <path d="M24 58 C18 54 18 44 24 36 C30 44 30 54 24 58 Z" fill="url(#flameOuter)" />
          <path d="M24 58 C20 56 20 48 24 44 C28 48 28 56 24 58 Z" fill="url(#flameCore)" />
          {/* Burner Base */}
          <rect x="18" y="58" width="12" height="3" rx="1.5" fill="#475569" />
          {/* Precision Red Mercury Thermometer on right */}
          <rect x="51" y="8" width="5" height="38" rx="2.5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="53.5" cy="50" r="5" fill="url(#thermoFluid)" stroke="#dc2626" strokeWidth="1" />
          <rect x="52.2" y="20" width="2.6" height="28" fill="url(#thermoFluid)" />
          <line x1="56" y1="16" x2="58" y2="16" stroke="#475569" strokeWidth="1" />
          <line x1="56" y1="22" x2="58" y2="22" stroke="#475569" strokeWidth="1" />
          <line x1="56" y1="28" x2="58" y2="28" stroke="#475569" strokeWidth="1" />
          <line x1="56" y1="34" x2="58" y2="34" stroke="#475569" strokeWidth="1" />
        </svg>
      );

    // 05: Kinematics: Motion & Graphs
    case 5:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="speedoArc" x1="8" y1="36" x2="56" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <radialGradient id="speedoCenter" cx="32" cy="40" r="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>
          {/* Speedometer Instrument Dial Arc */}
          <path d="M12 44 A 24 24 0 1 1 52 44" stroke="url(#speedoArc)" strokeWidth="5.5" strokeLinecap="round" />
          {/* Tick Marks */}
          <line x1="16" y1="38" x2="20" y2="36" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="22" y1="24" x2="25" y2="28" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="32" y1="18" x2="32" y2="23" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="42" y1="24" x2="39" y2="28" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="48" y1="38" x2="44" y2="36" stroke="#ffffff" strokeWidth="1.5" />
          {/* Dial Center Boss */}
          <circle cx="32" cy="40" r="8" fill="url(#speedoCenter)" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Speed Needle Pointer tilted high (accelerating) */}
          <line x1="32" y1="40" x2="45" y2="22" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="40" r="3.5" fill="#ef4444" />
          {/* Digital Speed read-out pill & graph line */}
          <path d="M14 54 H24 L34 48 L44 54 H52" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="48" r="2.5" fill="#38bdf8" />
          <line x1="8" y1="58" x2="56" y2="58" stroke="#64748b" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    // 06: Light & Shadows Interactive Lab
    case 6:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunGlow" cx="20" cy="18" r="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
            <linearGradient id="rayBeam" x1="20" y1="18" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#facc15" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="shadowCast" x1="40" y1="48" x2="60" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Brilliant Radiant Sun */}
          <circle cx="18" cy="18" r="10" fill="url(#sunGlow)" />
          {/* Sun Rays */}
          <line x1="18" y1="4" x2="18" y2="7" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="18" y1="29" x2="18" y2="32" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="4" y1="18" x2="7" y2="18" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="29" y1="18" x2="32" y2="18" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="8" y1="8" x2="10" y2="10" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="26" y1="26" x2="28" y2="28" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
          {/* Tangent Light Rays */}
          <polygon points="18,18 36,32 58,54 18,18" fill="url(#rayBeam)" />
          {/* Opaque 3D Geometric Object (Pyramid / Cylinder) */}
          <polygon points="38,30 31,48 45,48" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
          <polygon points="38,30 45,48 48,46" fill="#1d4ed8" />
          {/* Ground Surface Line */}
          <line x1="6" y1="52" x2="60" y2="52" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />
          {/* Projected Geometric Dark Shadow on Ground */}
          <ellipse cx="50" cy="53" rx="10" ry="2.5" fill="url(#shadowCast)" />
        </svg>
      );

    // 07: Living vs Non-Living Things
    case 7:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="leafGrad" x1="14" y1="14" x2="28" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="60%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="stoneGrad" x1="36" y1="24" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="crystalFacet" x1="42" y1="20" x2="52" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* Soil Bed */}
          <path d="M6 52 Q32 48 58 52" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
          {/* Living Organism: Vibrant Sprouting Seedling */}
          <path d="M18 52 Q20 38 22 26" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
          {/* Sprout Leaves */}
          <path d="M22 26 C14 22 10 14 20 12 C24 16 23 23 22 26 Z" fill="url(#leafGrad)" stroke="#15803d" strokeWidth="1" />
          <path d="M22 26 C28 20 36 22 34 30 C28 32 24 28 22 26 Z" fill="url(#leafGrad)" stroke="#15803d" strokeWidth="1" />
          {/* Leaf Vein */}
          <path d="M16 17 Q20 18 21 24" stroke="#dcfce7" strokeWidth="1" strokeLinecap="round" />
          {/* Life sparkles */}
          <circle cx="12" cy="12" r="1.5" fill="#facc15" />
          <circle cx="28" cy="10" r="1.5" fill="#facc15" />
          {/* Non-Living Matter: Faceted Mineral Stone */}
          <polygon points="44,24 54,30 56,46 42,50 36,40" fill="url(#stoneGrad)" stroke="#1e293b" strokeWidth="1.2" />
          <polygon points="44,24 54,30 46,38" fill="url(#crystalFacet)" stroke="#0369a1" strokeWidth="1" />
          <polygon points="44,24 36,40 46,38" fill="#475569" />
          <polygon points="46,38 54,30 56,46 42,50" fill="#1e293b" opacity="0.6" />
        </svg>
      );

    // 08: Mixtures & Solutions Chemistry Lab
    case 8:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flaskLiquid" x1="16" y1="30" x2="48" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="60%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <linearGradient id="flaskGlass" x1="18" y1="10" x2="46" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Conical Erlenmeyer Flask Body */}
          <path d="M28 8 H36 V22 L52 48 C54 52 50 56 46 56 H18 C14 56 10 52 12 48 L28 22 Z" fill="url(#flaskGlass)" stroke="#a855f7" strokeWidth="1.8" />
          {/* Beaker Lip Rim */}
          <rect x="26" y="6" width="12" height="3" rx="1.5" fill="#c084fc" stroke="#7e22ce" strokeWidth="1" />
          {/* Solution Liquid Fill */}
          <path d="M24 28 L14 48 C12 52 15 54 18 54 H46 C49 54 52 52 50 48 L40 28 Z" fill="url(#flaskLiquid)" />
          {/* Liquid Meniscus curve */}
          <ellipse cx="32" cy="28" rx="8" ry="2" fill="#d8b4fe" />
          {/* Glass Stirring Rod inserted */}
          <line x1="22" y1="4" x2="38" y2="50" stroke="#f1f5f9" strokeWidth="2.5" strokeLinecap="round" />
          {/* Dissolving Solute Crystals & Solvation Rings */}
          <circle cx="28" cy="42" r="2" fill="#facc15" />
          <circle cx="36" cy="46" r="2" fill="#38bdf8" />
          <circle cx="24" cy="48" r="1.5" fill="#f43f5e" />
          <circle cx="34" cy="36" r="1.5" fill="#ffffff" />
          <circle cx="42" cy="42" r="1.8" fill="#4ade80" />
          {/* Rising bubbles */}
          <circle cx="30" cy="32" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="35" cy="22" r="1.8" fill="#ffffff" opacity="0.6" />
        </svg>
      );

    // 09: Newton's 3 Laws of Motion
    case 9:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rocketBody" x1="36" y1="8" x2="54" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="exhaustFlame" x1="34" y1="36" x2="28" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          {/* Inclined Plane Wedge for Law 1 & 2 */}
          <polygon points="6,56 32,56 6,36" fill="#475569" stroke="#334155" strokeWidth="1.5" />
          {/* Mass Cart Block on incline */}
          <rect x="12" y="38" width="10" height="7" rx="1.5" transform="rotate(-36 12 38)" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.2" />
          {/* Force Vector Arrow F = ma */}
          <path d="M18 34 L32 24 M32 24 L28 24 M32 24 L30 28" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Law 3: Action-Reaction Launch Rocket */}
          <g transform="rotate(35 44 26)">
            {/* Rocket Exhaust Plume */}
            <path d="M41 34 Q38 46 44 50 Q50 46 47 34 Z" fill="url(#exhaustFlame)" />
            {/* Rocket Hull */}
            <path d="M44 8 C40 14 38 24 38 34 H50 C50 24 48 14 44 8 Z" fill="url(#rocketBody)" stroke="#dc2626" strokeWidth="1" />
            {/* Nose Cone */}
            <path d="M44 8 C42 12 40 16 40 18 H48 C48 16 46 12 44 8 Z" fill="#ef4444" />
            {/* Porthole */}
            <circle cx="44" cy="22" r="3" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
            {/* Left and Right Fins */}
            <path d="M38 28 L32 36 H38 Z" fill="#ef4444" />
            <path d="M50 28 L56 36 H50 Z" fill="#ef4444" />
          </g>
        </svg>
      );

    // 10: Ohm's Law & Circuit Analysis
    case 10:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="triangleGrad" x1="32" y1="10" x2="32" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="resistorBody" x1="12" y1="52" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="50%" stopColor="#ffedd5" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
          </defs>
          {/* Classic V-I-R Formula Triangle */}
          <polygon points="32,8 10,42 54,42" fill="url(#triangleGrad)" stroke="#7dd3fc" strokeWidth="2" strokeLinejoin="round" />
          {/* Internal Divider Lines */}
          <line x1="21" y1="26" x2="43" y2="26" stroke="#ffffff" strokeWidth="2" />
          <line x1="32" y1="26" x2="32" y2="42" stroke="#ffffff" strokeWidth="2" />
          {/* V, I, R Typography Letters */}
          <text x="32" y="22" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">V</text>
          <text x="22" y="38" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">I</text>
          <text x="42" y="38" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">R</text>
          {/* Precision Resistor Component with Color Bands */}
          <line x1="4" y1="52" x2="16" y2="52" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="52" x2="60" y2="52" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <rect x="16" y="47" width="32" height="10" rx="4" fill="url(#resistorBody)" stroke="#c2410c" strokeWidth="1" />
          {/* Color Coding Bands */}
          <rect x="22" y="47" width="3" height="10" fill="#991b1b" />
          <rect x="29" y="47" width="3" height="10" fill="#1e293b" />
          <rect x="36" y="47" width="3" height="10" fill="#ef4444" />
          <rect x="43" y="47" width="3" height="10" fill="#eab308" />
        </svg>
      );

    // 11: Photosynthesis in Flowering Plants
    case 11:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="photoLeaf" x1="16" y1="16" x2="48" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="40%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <radialGradient id="sunRayPhoto" cx="12" cy="12" r="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
          </defs>
          {/* Glowing Sun in upper-left */}
          <circle cx="12" cy="12" r="7" fill="url(#sunRayPhoto)" />
          <line x1="18" y1="18" x2="26" y2="26" stroke="#facc15" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="12" y1="21" x2="16" y2="28" stroke="#facc15" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="21" y1="12" x2="28" y2="16" stroke="#facc15" strokeWidth="2" strokeDasharray="3 2" />
          {/* Botanical Flowering Leaf Anatomy */}
          <path d="M22 48 C16 38 18 24 38 18 C52 28 54 44 38 52 C30 56 24 54 22 48 Z" fill="url(#photoLeaf)" stroke="#166534" strokeWidth="1.8" />
          {/* Leaf Central Midrib & Lateral Veins */}
          <path d="M22 48 C28 42 34 32 38 18" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 40 Q36 38 42 42 M32 32 Q40 30 46 34 M35 24 Q42 22 48 24" stroke="#dcfce7" strokeWidth="1.2" strokeLinecap="round" />
          {/* Blue H2O droplets entering */}
          <path d="M12 40 C10 40 8 42 8 45 C8 48 12 50 12 50 C12 50 16 48 16 45 C16 42 14 40 12 40 Z" fill="#38bdf8" />
          {/* Released O2 Oxygen Molecules */}
          <circle cx="50" cy="14" r="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.2" />
          <circle cx="56" cy="20" r="2.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="50" y="17" fill="#0284c7" fontSize="5" fontWeight="900" textAnchor="middle">O₂</text>
        </svg>
      );

    // 12: Simple Machines (6 Mechanisms)
    case 12:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gearGrad" x1="16" y1="16" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="leverGrad" x1="8" y1="38" x2="56" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          {/* Mechanical Lever Beam */}
          <line x1="8" y1="42" x2="56" y2="22" stroke="url(#leverGrad)" strokeWidth="4" strokeLinecap="round" />
          {/* Fulcrum Pivot Triangle */}
          <polygon points="32,32 25,48 39,48" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="2" fill="#facc15" />
          {/* Mass block on left */}
          <rect x="8" y="32" width="8" height="8" rx="1.5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
          {/* Force effort arrow on right */}
          <path d="M54 16 L54 26 M54 26 L51 22 M54 26 L57 22" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Pulley Wheel in upper left */}
          <circle cx="16" cy="14" r="8" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <circle cx="16" cy="14" r="3" fill="#475569" />
          <path d="M8 14 H24" stroke="#94a3b8" strokeWidth="1" />
          {/* Interlocking Gear Cog in upper right */}
          <circle cx="48" cy="12" r="7" fill="url(#gearGrad)" stroke="#c2410c" strokeWidth="1" />
          <circle cx="48" cy="12" r="2.5" fill="#ffffff" />
          {/* Ground Base */}
          <line x1="12" y1="52" x2="52" y2="52" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 13: States of Matter (Solid, Liquid, Gas)
    case 13:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="iceCube" x1="8" y1="16" x2="24" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="liquidDrop" x1="26" y1="26" x2="38" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          {/* Solid: 3D Crystal Ice Cube */}
          <polygon points="16,14 26,18 20,24 10,20" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
          <polygon points="10,20 20,24 20,34 10,30" fill="url(#iceCube)" stroke="#0284c7" strokeWidth="1" />
          <polygon points="20,24 26,18 26,28 20,34" fill="#0369a1" stroke="#0284c7" strokeWidth="1" />
          {/* Transition arrow */}
          <path d="M24 30 L29 32" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
          {/* Liquid: Water Ripples & Droplet */}
          <path d="M34 26 C31 26 28 30 28 35 C28 40 34 44 34 44 C34 44 40 40 40 35 C40 30 37 26 34 26 Z" fill="url(#liquidDrop)" stroke="#0e7490" strokeWidth="1" />
          <ellipse cx="34" cy="46" rx="9" ry="2.5" fill="#38bdf8" fillOpacity="0.4" />
          {/* Gas: Expanding vapor bubbles */}
          <circle cx="48" cy="16" r="4.5" fill="#e0f2fe" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 1" />
          <circle cx="56" cy="24" r="3.5" fill="#e0f2fe" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 1" />
          <circle cx="46" cy="28" r="3" fill="#e0f2fe" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 1" />
          {/* Rising vapor trails */}
          <path d="M46 36 Q49 32 46 28 M54 38 Q51 34 54 30" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
          {/* Heat flame indicator */}
          <path d="M28 58 C26 55 26 51 28 48 C30 51 30 55 28 58 Z" fill="#ef4444" />
        </svg>
      );

    // 14: Earth & Space: Water Cycle & Day/Night
    case 14:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cloudGrad" x1="16" y1="12" x2="44" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="oceanGrad" x1="8" y1="46" x2="56" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          {/* Radiant Sun in upper-right */}
          <circle cx="50" cy="14" r="7" fill="#facc15" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Rain Cloud */}
          <path d="M18 24 C14 24 12 20 15 16 C16 12 24 10 28 14 C32 10 40 12 40 16 C44 18 44 24 38 24 Z" fill="url(#cloudGrad)" stroke="#64748b" strokeWidth="1.2" />
          {/* Precipitation rain drops */}
          <line x1="18" y1="28" x2="16" y2="34" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="28" x2="24" y2="34" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="28" x2="32" y2="34" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          {/* Water reservoir / Ocean Waves */}
          <path d="M6 48 C14 46 20 50 28 48 C36 46 44 50 58 48 V58 H6 Z" fill="url(#oceanGrad)" />
          {/* Evaporation spiral arrows rising to cloud */}
          <path d="M46 44 C44 38 48 34 46 28 M52 44 C50 38 54 34 52 28" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" />
        </svg>
      );

    // 15: Earth Rotation & Revolution Simulator
    case 15:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="earthDayNight" x1="18" y1="20" x2="46" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="45%" stopColor="#0284c7" />
              <stop offset="55%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <radialGradient id="sunCenterOrbit" cx="16" cy="18" r="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
          </defs>
          {/* Glowing central Sun */}
          <circle cx="16" cy="18" r="8" fill="url(#sunCenterOrbit)" />
          {/* Elliptical orbital path */}
          <ellipse cx="32" cy="34" rx="26" ry="18" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" fill="none" transform="rotate(-15 32 34)" />
          {/* 23.5° Tilted Axis Line */}
          <line x1="40" y1="18" x2="48" y2="50" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
          {/* Earth Globe Sphere */}
          <circle cx="44" cy="34" r="12" fill="url(#earthDayNight)" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Green Continents on illuminated side */}
          <path d="M36 30 C38 28 42 28 43 32 C41 36 37 36 36 30 Z" fill="#22c55e" />
          <path d="M38 38 C40 37 43 39 42 42 C39 42 38 40 38 38 Z" fill="#22c55e" />
          {/* Axial rotation arrow */}
          <path d="M38 22 C44 20 50 22 52 25" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
          <polygon points="53,24 53,27 50,26" fill="#facc15" />
        </svg>
      );

    // 16: Moon Phases & Lunar Orbit Simulator
    case 16:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="moonGlow" x1="12" y1="12" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <radialGradient id="crater" cx="24" cy="24" r="4" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </radialGradient>
          </defs>
          {/* Large Cratered Moon Globe */}
          <circle cx="32" cy="32" r="20" fill="url(#moonGlow)" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Lunar Dark Shadow (Crescent Phase Terminator) */}
          <path d="M32 12 A 20 20 0 0 0 32 52 A 14 20 0 0 1 32 12 Z" fill="#0f172a" fillOpacity="0.85" />
          {/* Impact Craters */}
          <circle cx="24" cy="24" r="3.5" fill="url(#crater)" stroke="#475569" strokeWidth="0.8" />
          <circle cx="20" cy="36" r="2.5" fill="url(#crater)" stroke="#475569" strokeWidth="0.8" />
          <circle cx="28" cy="42" r="3" fill="url(#crater)" stroke="#475569" strokeWidth="0.8" />
          {/* Synodic orbit ring with 8 miniature phases */}
          <ellipse cx="32" cy="32" rx="27" ry="27" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="59" cy="32" r="2.5" fill="#f8fafc" />
          <circle cx="5" cy="32" r="2.5" fill="#334155" />
          <circle cx="32" cy="5" r="2.5" fill="#94a3b8" />
          <circle cx="32" cy="59" r="2.5" fill="#94a3b8" />
        </svg>
      );

    // 17: Solar & Lunar Eclipse Simulator
    case 17:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunCorona" cx="16" cy="32" r="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="80%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>
            <linearGradient id="umbraCone" x1="32" y1="32" x2="56" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="penumbraCone" x1="16" y1="32" x2="60" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {/* Sun */}
          <circle cx="16" cy="32" r="10" fill="url(#sunCorona)" />
          {/* Penumbra Wide Shadow Cone */}
          <polygon points="16,22 56,18 56,46 16,42" fill="url(#penumbraCone)" />
          {/* Umbra Dark Central Shadow Cone */}
          <polygon points="32,29 56,31 56,33 32,35" fill="url(#umbraCone)" />
          {/* Intervening Moon (Syzygy) */}
          <circle cx="32" cy="32" r="4" fill="#1e293b" stroke="#cbd5e1" strokeWidth="0.8" />
          {/* Earth in Shadow Path */}
          <circle cx="52" cy="32" r="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
          {/* Umbra Spot on Earth */}
          <circle cx="48" cy="32" r="1.5" fill="#020617" />
          {/* Radiant Solar Corona Flash (Diamond Ring effect) */}
          <path d="M16 20 Q16 12 24 16" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="22" cy="18" r="2" fill="#ffffff" />
        </svg>
      );

    // 18: Solar System & Planetary Motion (Kepler's Laws)
    case 18:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="keplerSector" x1="20" y1="32" x2="48" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Keplerian Ellipse Orbit */}
          <ellipse cx="32" cy="32" rx="26" ry="16" stroke="#818cf8" strokeWidth="1.8" fill="none" />
          {/* Primary Focus: The Sun */}
          <circle cx="20" cy="32" r="6" fill="#facc15" stroke="#ea580c" strokeWidth="1.2" />
          {/* Secondary Empty Geometric Focus */}
          <circle cx="44" cy="32" r="1.5" fill="#a5b4fc" stroke="#6366f1" strokeWidth="0.8" />
          <line x1="42" y1="32" x2="46" y2="32" stroke="#6366f1" strokeWidth="0.8" />
          <line x1="44" y1="30" x2="44" y2="34" stroke="#6366f1" strokeWidth="0.8" />
          {/* Equal Area Sector Swept (Kepler's 2nd Law) */}
          <path d="M20 32 L8 32 A 26 16 0 0 1 12 22 Z" fill="url(#keplerSector)" stroke="#c084fc" strokeWidth="1" />
          {/* Planet Orbiting */}
          <circle cx="12" cy="22" r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
          {/* Velocity Vector Arrow at Perihelion */}
          <line x1="12" y1="22" x2="6" y2="14" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
          <polygon points="5,15 5,12 8,14" fill="#f43f5e" />
        </svg>
      );

    // 19: 3D Solar System & Planetary Orbits
    case 19:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunOrrery" cx="32" cy="32" r="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
          </defs>
          {/* Concentric Multi-Planetary Orbits */}
          <ellipse cx="32" cy="32" rx="12" ry="7" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <ellipse cx="32" cy="32" rx="18" ry="11" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <ellipse cx="32" cy="32" rx="25" ry="16" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          {/* Central Sun */}
          <circle cx="32" cy="32" r="7" fill="url(#sunOrrery)" stroke="#f59e0b" strokeWidth="1" />
          {/* Inner Planet (Mercury / Venus) */}
          <circle cx="22" cy="28" r="2" fill="#94a3b8" />
          {/* Blue Earth */}
          <circle cx="44" cy="26" r="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
          {/* Red Planet Mars */}
          <circle cx="18" cy="40" r="2.5" fill="#ef4444" />
          {/* Giant Saturn with Tilted Rings */}
          <g transform="translate(54, 38)">
            <ellipse cx="0" cy="0" rx="6" ry="2" stroke="#fde047" strokeWidth="1.5" fill="none" transform="rotate(-20)" />
            <circle cx="0" cy="0" r="3" fill="#eab308" />
          </g>
        </svg>
      );

    // 20: Interactive Periodic Table & Bohr Model
    case 20:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="periodicTile" x1="6" y1="8" x2="30" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <radialGradient id="bohrNuc" cx="44" cy="40" r="6" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
          </defs>
          {/* Periodic Table Element Card Tile */}
          <rect x="6" y="8" width="24" height="26" rx="4" fill="url(#periodicTile)" stroke="#7dd3fc" strokeWidth="1.5" />
          <text x="10" y="16" fill="#ffffff" fontSize="6" fontWeight="bold">6</text>
          <text x="18" y="25" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">C</text>
          <text x="18" y="31" fill="#e0f2fe" fontSize="4.5" fontWeight="bold" textAnchor="middle">12.011</text>
          {/* Bohr Atomic Model Concentric Electron Shells */}
          <circle cx="44" cy="38" r="7" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <circle cx="44" cy="38" r="14" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <circle cx="44" cy="38" r="20" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          {/* Atomic Nucleus */}
          <circle cx="44" cy="38" r="4" fill="url(#bohrNuc)" stroke="#ffffff" strokeWidth="0.8" />
          {/* Orbiting Quantum Electrons */}
          <circle cx="44" cy="31" r="2" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="44" cy="45" r="2" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="58" cy="38" r="2" fill="#facc15" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="30" cy="38" r="2" fill="#facc15" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="44" cy="18" r="2" fill="#4ade80" stroke="#ffffff" strokeWidth="0.8" />
        </svg>
      );

    // 21: Sound Waves, Frequency & Doppler Effect
    case 21:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="forkMetal" x1="10" y1="14" x2="26" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          {/* Acoustic Steel Tuning Fork */}
          <path d="M12 12 V28 C12 34 18 36 20 36 V52 H24 V36 C26 36 32 34 32 28 V12 H28 V28 C28 30 26 32 22 32 C18 32 16 30 16 28 V12 Z" fill="url(#forkMetal)" stroke="#334155" strokeWidth="1.2" />
          {/* High-frequency vibration arcs at prongs */}
          <path d="M8 14 Q6 20 8 26 M36 14 Q38 20 36 26" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Concentric Doppler Compressed Sound Waves */}
          <path d="M36 24 A 12 12 0 0 1 36 40" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M42 18 A 18 18 0 0 1 42 46" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M48 12 A 25 25 0 0 1 48 52" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M54 6 A 32 32 0 0 1 54 58" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    // 22: Basic Maths & Multiplication Lab
    case 22:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mathBlock1" x1="8" y1="8" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="mathBlock2" x1="22" y1="8" x2="34" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="mathBlock3" x1="8" y1="22" x2="20" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="mathBlock4" x1="22" y1="22" x2="34" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          {/* 2x2 Multiplication Area Array Matrix */}
          <rect x="8" y="8" width="12" height="12" rx="2" fill="url(#mathBlock1)" stroke="#1d4ed8" strokeWidth="1" />
          <rect x="22" y="8" width="12" height="12" rx="2" fill="url(#mathBlock2)" stroke="#047857" strokeWidth="1" />
          <rect x="8" y="22" width="12" height="12" rx="2" fill="url(#mathBlock3)" stroke="#b45309" strokeWidth="1" />
          <rect x="22" y="22" width="12" height="12" rx="2" fill="url(#mathBlock4)" stroke="#be185d" strokeWidth="1" />
          {/* Multiplication Operator Symbol × */}
          <path d="M40 14 L50 24 M50 14 L40 24" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          {/* Equals Symbol = */}
          <line x1="40" y1="38" x2="52" y2="38" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="44" x2="52" y2="44" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          {/* Result Number Pill */}
          <rect x="8" y="42" width="26" height="14" rx="4" fill="#4f46e5" stroke="#818cf8" strokeWidth="1.5" />
          <text x="21" y="52" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">12</text>
        </svg>
      );

    // 23: Interactive Geometry, Shapes & Angles
    case 23:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="protractorGrad" x1="10" y1="20" x2="54" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="triangleGradGeo" x1="16" y1="18" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          {/* 180° Protractor Arc */}
          <path d="M8 46 A 24 24 0 0 1 56 46 H8 Z" fill="url(#protractorGrad)" stroke="#0284c7" strokeWidth="1.5" />
          {/* Protractor Center Hole & Degree Ticks */}
          <circle cx="32" cy="46" r="3" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
          <line x1="32" y1="22" x2="32" y2="26" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="18" y1="30" x2="21" y2="33" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="46" y1="30" x2="43" y2="33" stroke="#0284c7" strokeWidth="1.5" />
          {/* Right Triangle Overlay */}
          <polygon points="16,46 44,46 44,18" fill="url(#triangleGradGeo)" fillOpacity="0.6" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round" />
          {/* Right Angle Square Indicator */}
          <rect x="40" y="42" width="4" height="4" fill="none" stroke="#facc15" strokeWidth="1.5" />
          {/* Pythagorean a^2 + b^2 = c^2 proof squares */}
          <rect x="44" y="24" width="8" height="8" fill="#ec4899" fillOpacity="0.5" stroke="#db2777" strokeWidth="1" />
          <rect x="24" y="46" width="8" height="8" fill="#10b981" fillOpacity="0.5" stroke="#059669" strokeWidth="1" />
        </svg>
      );

    // 24: Algebra & Equation Balancing Lab
    case 24:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="scaleBeamGrad" x1="10" y1="18" x2="54" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* Central Fulcrum Stand Pillar */}
          <rect x="30" y="16" width="4" height="38" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1" />
          <polygon points="32,14 24,56 40,56" fill="#475569" stroke="#1e293b" strokeWidth="1" />
          {/* Center Pivot Boss */}
          <circle cx="32" cy="18" r="4" fill="#facc15" stroke="#b45309" strokeWidth="1.2" />
          {/* Balanced Horizontal Beam */}
          <line x1="8" y1="18" x2="56" y2="18" stroke="url(#scaleBeamGrad)" strokeWidth="3.5" strokeLinecap="round" />
          {/* Left Pan Strings & Pan */}
          <line x1="12" y1="18" x2="8" y2="34" stroke="#94a3b8" strokeWidth="1" />
          <line x1="12" y1="18" x2="16" y2="34" stroke="#94a3b8" strokeWidth="1" />
          <path d="M6 34 Q12 38 18 34 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
          {/* Variable 'x' block on left pan */}
          <rect x="8" y="24" width="8" height="8" rx="1.5" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1" />
          <text x="12" y="30.5" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">x</text>
          {/* Right Pan Strings & Pan */}
          <line x1="52" y1="18" x2="48" y2="34" stroke="#94a3b8" strokeWidth="1" />
          <line x1="52" y1="18" x2="56" y2="34" stroke="#94a3b8" strokeWidth="1" />
          <path d="M46 34 Q52 38 58 34 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
          {/* Known weight blocks on right pan */}
          <rect x="48" y="27" width="5" height="5" rx="1" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
          <rect x="53" y="27" width="5" height="5" rx="1" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
        </svg>
      );

    // 25: Measurement, Scale & Units Lab
    case 25:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rulerWood" x1="6" y1="14" x2="58" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="scaleLcd" x1="20" y1="42" x2="44" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          {/* Calibrated Metric Ruler */}
          <rect x="6" y="10" width="52" height="14" rx="2" fill="url(#rulerWood)" stroke="#b45309" strokeWidth="1.2" />
          {/* Millimeter Ticks on Ruler */}
          <line x1="12" y1="10" x2="12" y2="18" stroke="#78350f" strokeWidth="1.5" />
          <line x1="16" y1="10" x2="16" y2="14" stroke="#78350f" strokeWidth="1" />
          <line x1="20" y1="10" x2="20" y2="14" stroke="#78350f" strokeWidth="1" />
          <line x1="24" y1="10" x2="24" y2="18" stroke="#78350f" strokeWidth="1.5" />
          <line x1="28" y1="10" x2="28" y2="14" stroke="#78350f" strokeWidth="1" />
          <line x1="32" y1="10" x2="32" y2="14" stroke="#78350f" strokeWidth="1" />
          <line x1="36" y1="10" x2="36" y2="18" stroke="#78350f" strokeWidth="1.5" />
          <line x1="40" y1="10" x2="40" y2="14" stroke="#78350f" strokeWidth="1" />
          <line x1="44" y1="10" x2="44" y2="14" stroke="#78350f" strokeWidth="1" />
          <line x1="48" y1="10" x2="48" y2="18" stroke="#78350f" strokeWidth="1.5" />
          <line x1="52" y1="10" x2="52" y2="14" stroke="#78350f" strokeWidth="1" />
          {/* Precision Digital Tare Mass Scale */}
          <rect x="14" y="32" width="36" height="24" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Scale Stainless Weighing Platter */}
          <ellipse cx="32" cy="34" rx="14" ry="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Digital LCD Screen with Mass Value */}
          <rect x="20" y="40" width="24" height="10" rx="2" fill="url(#scaleLcd)" stroke="#38bdf8" strokeWidth="1" />
          <text x="32" y="48" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">125.0g</text>
        </svg>
      );

    // 26: Computer Parts & Hardware Architecture
    case 26:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cpuDie" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="heatSpreader" x1="20" y1="20" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {/* Green/Teal PCB Motherboard substrate */}
          <rect x="10" y="10" width="44" height="44" rx="6" fill="#0f766e" stroke="#14b8a6" strokeWidth="1.8" />
          {/* Microchip Golden Connection Pins */}
          <rect x="14" y="6" width="3" height="4" fill="#facc15" />
          <rect x="22" y="6" width="3" height="4" fill="#facc15" />
          <rect x="30" y="6" width="3" height="4" fill="#facc15" />
          <rect x="38" y="6" width="3" height="4" fill="#facc15" />
          <rect x="46" y="6" width="3" height="4" fill="#facc15" />
          <rect x="14" y="54" width="3" height="4" fill="#facc15" />
          <rect x="22" y="54" width="3" height="4" fill="#facc15" />
          <rect x="30" y="54" width="3" height="4" fill="#facc15" />
          <rect x="38" y="54" width="3" height="4" fill="#facc15" />
          <rect x="46" y="54" width="3" height="4" fill="#facc15" />
          {/* CPU Heat Spreader Ceramic Package */}
          <rect x="18" y="18" width="28" height="28" rx="4" fill="url(#cpuDie)" stroke="#38bdf8" strokeWidth="1.2" />
          <rect x="22" y="22" width="20" height="20" rx="3" fill="url(#heatSpreader)" stroke="#64748b" strokeWidth="0.8" />
          {/* Silicon Core Logo & Bus traces */}
          <path d="M26 32 H38 M32 26 V38" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="32" r="3" fill="#38bdf8" />
          {/* Circuit traces radiating out */}
          <path d="M12 20 H16 M12 44 H16 M48 20 H52 M48 44 H52" stroke="#2dd4bf" strokeWidth="1.5" />
        </svg>
      );

    // 27: Keyboard Shortcuts & System Hotkeys Lab
    case 27:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="keycapGrad1" x1="8" y1="14" x2="30" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="keycapGrad2" x1="34" y1="14" x2="56" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>
          </defs>
          {/* Mechanical Keyboard Switch Backplate */}
          <rect x="6" y="12" width="52" height="40" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          {/* Left Keycap: CTRL */}
          <rect x="10" y="16" width="20" height="20" rx="4" fill="url(#keycapGrad1)" stroke="#60a5fa" strokeWidth="1.2" />
          <rect x="12" y="18" width="16" height="13" rx="2" fill="#1e40af" />
          <text x="20" y="27" fill="#ffffff" fontSize="7" fontWeight="900" textAnchor="middle">CTRL</text>
          {/* Plus Connection Symbol */}
          <text x="32" y="29" fill="#facc15" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
          {/* Right Keycap: Z / C */}
          <rect x="34" y="16" width="20" height="20" rx="4" fill="url(#keycapGrad2)" stroke="#c084fc" strokeWidth="1.2" />
          <rect x="36" y="18" width="16" height="13" rx="2" fill="#581c87" />
          <text x="44" y="27.5" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">Z</text>
          {/* Keystroke tactile glow line / spacebar */}
          <rect x="14" y="40" width="36" height="6" rx="2.5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
        </svg>
      );

    // 28: Basic Prepositions in 3D: Space, Movement & Grammar
    case 28:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cubeTop" x1="20" y1="20" x2="44" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id="cubeLeft" x1="16" y1="32" x2="32" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
            <linearGradient id="cubeRight" x1="32" y1="32" x2="48" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#be185d" />
              <stop offset="100%" stopColor="#831843" />
            </linearGradient>
            <radialGradient id="sphereBall" cx="28" cy="14" r="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
          </defs>
          {/* Isometric 3D Cube Box ("IN / ON / UNDER") */}
          <polygon points="32,20 48,28 32,36 16,28" fill="url(#cubeTop)" stroke="#fbcfe8" strokeWidth="1" />
          <polygon points="16,28 32,36 32,54 16,46" fill="url(#cubeLeft)" stroke="#f472b6" strokeWidth="1" />
          <polygon points="32,36 48,28 48,46 32,54" fill="url(#cubeRight)" stroke="#f472b6" strokeWidth="1" />
          {/* Glowing Sphere Ball positioned "ON" top */}
          <circle cx="32" cy="14" r="8" fill="url(#sphereBall)" stroke="#ffffff" strokeWidth="1.2" />
          {/* Directional 3D Movement Arrow "THROUGH / OVER" */}
          <path d="M8 20 C18 6 46 6 56 20" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 2" fill="none" />
          <polygon points="56,20 54,14 50,18" fill="#38bdf8" />
          {/* Positional Label */}
          <text x="32" y="47" fill="#ffffff" fontSize="6.5" fontWeight="900" textAnchor="middle">IN / ON</text>
        </svg>
      );

    // 29: Atoms & Molecules: Interactive Chemistry Lab
    case 29:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="oxygenSphere" cx="28" cy="24" r="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="60%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
            <radialGradient id="hydrogenSphere" cx="12" cy="44" r="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#2563eb" />
            </radialGradient>
          </defs>
          {/* Covalent Chemical Bond Cylindrical Rods (H2O Molecule) */}
          <line x1="32" y1="28" x2="16" y2="44" stroke="#94a3b8" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="32" y1="28" x2="48" y2="44" stroke="#94a3b8" strokeWidth="5.5" strokeLinecap="round" />
          {/* Left Hydrogen Atom (H) */}
          <circle cx="16" cy="44" r="9" fill="url(#hydrogenSphere)" stroke="#1d4ed8" strokeWidth="1.2" />
          <text x="16" y="47" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">H</text>
          {/* Right Hydrogen Atom (H) */}
          <circle cx="48" cy="44" r="9" fill="url(#hydrogenSphere)" stroke="#1d4ed8" strokeWidth="1.2" />
          <text x="48" y="47" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">H</text>
          {/* Central Oxygen Atom (O) */}
          <circle cx="32" cy="24" r="13" fill="url(#oxygenSphere)" stroke="#b91c1c" strokeWidth="1.5" />
          <text x="32" y="28" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">O</text>
          {/* Shared Electron Orbit Trails */}
          <ellipse cx="32" cy="34" rx="24" ry="12" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        </svg>
      );

    // 30: Early Childhood Care & Education (ECCE) Discovery Academy
    case 30:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blockA" x1="6" y1="20" x2="26" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            <linearGradient id="blockB" x1="24" y1="12" x2="44" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="blockC" x1="38" y1="24" x2="58" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* 3D Alphabet Toy Block A */}
          <rect x="8" y="26" width="18" height="18" rx="4" fill="url(#blockA)" stroke="#f43f5e" strokeWidth="1.2" />
          <text x="17" y="39" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">A</text>
          {/* 3D Alphabet Toy Block B (stacked/staggered) */}
          <rect x="23" y="12" width="18" height="18" rx="4" fill="url(#blockB)" stroke="#eab308" strokeWidth="1.2" />
          <text x="32" y="25" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">B</text>
          {/* 3D Alphabet Toy Block C */}
          <rect x="38" y="26" width="18" height="18" rx="4" fill="url(#blockC)" stroke="#0369a1" strokeWidth="1.2" />
          <text x="47" y="39" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">C</text>
          {/* Playful Reward Star Badge */}
          <polygon points="52,8 54,13 59,13 55,16 57,21 52,18 47,21 49,16 45,13 50,13" fill="#facc15" stroke="#f59e0b" strokeWidth="1" />
          {/* Colorful Montessori counting beads on string */}
          <line x1="8" y1="52" x2="56" y2="52" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="52" r="3.5" fill="#f43f5e" />
          <circle cx="28" cy="52" r="3.5" fill="#eab308" />
          <circle cx="40" cy="52" r="3.5" fill="#10b981" />
          <circle cx="52" cy="52" r="3.5" fill="#3b82f6" />
        </svg>
      );

    // 31: Genetics, DNA & Punnett Square Lab
    case 31:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dnaStrandA" x1="12" y1="8" x2="30" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="dnaStrandB" x1="30" y1="8" x2="12" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* DNA Double Helix Strands */}
          <path d="M12 8 Q24 20 12 32 Q24 44 12 56" stroke="url(#dnaStrandA)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M26 8 Q14 20 26 32 Q14 44 26 56" stroke="url(#dnaStrandB)" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Horizontal Base Pair Rungs (A-T, C-G) */}
          <line x1="14" y1="14" x2="24" y2="14" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="20" x2="20" y2="20" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="26" x2="24" y2="26" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="38" x2="24" y2="38" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="44" x2="20" y2="44" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="50" x2="24" y2="50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          {/* 2x2 Punnett Square Grid on right */}
          <rect x="36" y="16" width="22" height="22" rx="2" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <line x1="47" y1="16" x2="47" y2="38" stroke="#334155" strokeWidth="1.2" />
          <line x1="36" y1="27" x2="58" y2="27" stroke="#334155" strokeWidth="1.2" />
          {/* Allele Letters */}
          <text x="41.5" y="24" fill="#34d399" fontSize="6" fontWeight="bold">BB</text>
          <text x="52.5" y="24" fill="#93c5fd" fontSize="6" fontWeight="bold">Bb</text>
          <text x="41.5" y="35" fill="#93c5fd" fontSize="6" fontWeight="bold">Bb</text>
          <text x="52.5" y="35" fill="#f87171" fontSize="6" fontWeight="bold">bb</text>
        </svg>
      );

    // 32: Acids, Bases & pH Titration Lab
    case 32:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="phRainbow" x1="6" y1="56" x2="58" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="flaskBaseLiquid" x1="26" y1="36" x2="48" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          {/* Precision Volumetric Burette on Left */}
          <rect x="18" y="4" width="6" height="34" rx="1.5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          {/* Burette Graduated Measurement Marks */}
          <line x1="18" y1="8" x2="21" y2="8" stroke="#64748b" strokeWidth="1" />
          <line x1="18" y1="12" x2="22" y2="12" stroke="#64748b" strokeWidth="1" />
          <line x1="18" y1="16" x2="21" y2="16" stroke="#64748b" strokeWidth="1" />
          <line x1="18" y1="20" x2="22" y2="20" stroke="#64748b" strokeWidth="1" />
          <line x1="18" y1="24" x2="21" y2="24" stroke="#64748b" strokeWidth="1" />
          <line x1="18" y1="28" x2="22" y2="28" stroke="#64748b" strokeWidth="1" />
          {/* Burette Stopcock valve */}
          <circle cx="21" cy="34" r="2.5" fill="#f59e0b" />
          <line x1="16" y1="34" x2="26" y2="34" stroke="#d97706" strokeWidth="1.5" />
          {/* Dripping Titrant Droplet */}
          <circle cx="21" cy="40" r="1.5" fill="#ec4899" />
          {/* Receiving Erlenmeyer Flask */}
          <path d="M28 26 H34 V34 L46 48 C48 50 46 52 42 52 H20 C16 52 14 50 16 48 L28 34 Z" fill="url(#flaskBaseLiquid)" stroke="#a855f7" strokeWidth="1.2" />
          {/* Universal Indicator Color Transition Bar (pH 0 to 14) */}
          <rect x="8" y="56" width="48" height="4" rx="2" fill="url(#phRainbow)" />
        </svg>
      );

    // 33: Electromagnetic Induction & Faraday's Law Lab
    case 33:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="magnetNorth" x1="6" y1="18" x2="26" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id="magnetSouth" x1="6" y1="26" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="copperCoil" x1="28" y1="12" x2="56" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          {/* Red & Blue Two-Tone Bar Magnet */}
          <g transform="rotate(-20 18 22)">
            <rect x="6" y="16" width="12" height="12" rx="2" fill="url(#magnetNorth)" stroke="#991b1b" strokeWidth="1" />
            <text x="12" y="25" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">N</text>
            <rect x="18" y="16" width="12" height="12" rx="2" fill="url(#magnetSouth)" stroke="#075985" strokeWidth="1" />
            <text x="24" y="25" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">S</text>
          </g>
          {/* Solenoid Multi-Turn Copper Wire Coil */}
          <path d="M34 16 C42 12 42 32 34 32" stroke="url(#copperCoil)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M40 16 C48 12 48 32 40 32" stroke="url(#copperCoil)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M46 16 C54 12 54 32 46 32" stroke="url(#copperCoil)" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Magnetic Flux Streamlines */}
          <path d="M12 8 C26 4 44 4 56 12 M12 38 C26 42 44 42 56 34" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          {/* Galvanometer Meter connected at bottom */}
          <circle cx="44" cy="48" r="9" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="44" y="46" fill="#38bdf8" fontSize="6" fontWeight="bold" textAnchor="middle">G</text>
          {/* Galvanometer Deflecting Needle */}
          <line x1="44" y1="52" x2="48" y2="43" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    // 34: Projectile Motion & Gravitational Trajectory Lab
    case 34:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cannonGrad" x1="10" y1="45" x2="35" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="ballGrad" x1="42" y1="18" x2="52" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          {/* Ground Baseline */}
          <line x1="6" y1="54" x2="58" y2="54" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          {/* Parabolic Trajectory Dashed Curve */}
          <path d="M16 42 Q36 6 52 50" stroke="#facc15" strokeWidth="2.5" strokeDasharray="3 3" fill="none" />
          {/* Cannon Barrel */}
          <g transform="rotate(-35 16 48)">
            <rect x="14" y="42" width="22" height="10" rx="3" fill="url(#cannonGrad)" stroke="#0369a1" strokeWidth="1.2" />
          </g>
          {/* Cannon Wheel */}
          <circle cx="16" cy="48" r="9" fill="#0f172a" stroke="#00f5ff" strokeWidth="2.2" />
          <circle cx="16" cy="48" r="3" fill="#ffffff" />
          {/* Glowing Projectile Cannonball at Peak */}
          <circle cx="36" cy="18" r="5.5" fill="url(#ballGrad)" stroke="#ffffff" strokeWidth="1.5" />
          {/* Tangent Velocity Vector Arrow */}
          <line x1="36" y1="18" x2="48" y2="18" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
          <polygon points="48,15 53,18 48,21" fill="#4ade80" />
        </svg>
      );

    // 35: Chemical Reaction Kinetics & Catalysis Lab
    case 35:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="kineticsFlask" x1="20" y1="10" x2="44" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <linearGradient id="rxnFluid" x1="16" y1="36" x2="48" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>
          </defs>
          {/* Erlenmeyer Flask Outline */}
          <path d="M26 8 H38 V22 L52 50 C54 54 50 58 46 58 H18 C14 58 10 54 12 50 L26 22 Z" fill="url(#rxnFluid)" stroke="#c084fc" strokeWidth="2" strokeLinejoin="round" />
          {/* Catalyst Golden Crystal */}
          <polygon points="32,40 37,45 32,50 27,45" fill="#facc15" stroke="#ffffff" strokeWidth="1" />
          {/* Reacting Particles Colliding */}
          <circle cx="22" cy="48" r="3.5" fill="#38bdf8" stroke="#fff" strokeWidth="1" />
          <circle cx="42" cy="46" r="3.5" fill="#f43f5e" stroke="#fff" strokeWidth="1" />
          {/* Product Emergence Spark */}
          <circle cx="32" cy="32" r="4.5" fill="#34d399" stroke="#fff" strokeWidth="1.5" />
          {/* Kinetic Energy Wave / Flame */}
          <path d="M22 62 Q32 58 42 62" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // 36: Photosynthesis & Cellular Chloroplast Engine
    case 36:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            <linearGradient id="leafGrad" x1="14" y1="14" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="60%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
          </defs>
          {/* Lush Green Chloroplast Leaf */}
          <path d="M14 50 C12 30 28 12 50 14 C52 34 36 52 14 50 Z" fill="url(#leafGrad)" stroke="#86efac" strokeWidth="2" />
          {/* Leaf Vein Structure */}
          <path d="M14 50 Q32 32 50 14" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="38" x2="36" y2="40" stroke="#bbf7d0" strokeWidth="1.5" />
          <line x1="36" y1="28" x2="44" y2="30" stroke="#bbf7d0" strokeWidth="1.5" />
          {/* Radiant Solar Photon Beam */}
          <circle cx="48" cy="16" r="6" fill="url(#sunGlow)" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="42" y1="22" x2="32" y2="30" stroke="#fde047" strokeWidth="2" strokeDasharray="2 2" strokeLinecap="round" />
          {/* O2 Oxygen Bubble Emitted */}
          <circle cx="20" cy="22" r="5" fill="rgba(56,189,248,0.85)" stroke="#ffffff" strokeWidth="1.2" />
          <text x="20" y="24" fill="#ffffff" fontSize="5" fontWeight="900" textAnchor="middle">O₂</text>
        </svg>
      );

    // 37: Moon Phases, Tides & Lunar Orbit Simulator
    case 37:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="earthBlue" x1="16" y1="16" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* Starfield Dark Space */}
          <circle cx="32" cy="32" r="28" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />
          {/* Earth Body */}
          <circle cx="28" cy="32" r="14" fill="url(#earthBlue)" stroke="#7dd3fc" strokeWidth="1.5" />
          <path d="M24 24 Q30 26 32 32 Q26 38 22 34 Z" fill="#22c55e" />
          {/* Elliptical Moon Orbit Path */}
          <ellipse cx="28" cy="32" rx="22" ry="16" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Crescent / Quarter Moon in Orbit */}
          <circle cx="48" cy="24" r="6.5" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
          <path d="M48 17.5 A6.5 6.5 0 0 1 48 30.5 A4 6.5 0 0 0 48 17.5" fill="#fef08a" />
          {/* Tidal Bulge Water Vector */}
          <path d="M12 32 C12 26 15 24 18 32 C15 40 12 38 12 32 Z" fill="rgba(56,189,248,0.5)" />
        </svg>
      );

    // 38: Pythagorean Theorem & Geometric Distance Engine
    case 38:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pythOrange" x1="14" y1="14" x2="50" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          {/* Square a^2 (Vertical Left) */}
          <rect x="8" y="16" width="16" height="16" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Square b^2 (Bottom Horizontal) */}
          <rect x="24" y="32" width="22" height="22" fill="rgba(244,63,94,0.25)" stroke="#f43f5e" strokeWidth="1.5" />
          {/* Right Angle Triangle in Center */}
          <polygon points="24,32 46,32 24,16" fill="url(#pythOrange)" stroke="#fde047" strokeWidth="2" />
          {/* Right Angle Corner Pip */}
          <polyline points="24,28 28,28 28,32" stroke="#ffffff" strokeWidth="1.2" fill="none" />
          {/* Square c^2 (Rotated on Hypotenuse) */}
          <g transform="rotate(36 35 24)">
            <rect x="26" y="6" width="20" height="20" fill="rgba(34,197,94,0.28)" stroke="#22c55e" strokeWidth="1.5" />
          </g>
        </svg>
      );

    // 39: Sorting Algorithms & Computational Complexity Workbench
    case 39:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="barTeal" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>
          {/* Bar Chart Slices in Ascending Sorted Order */}
          <rect x="8" y="44" width="7" height="12" rx="1.5" fill="#14b8a6" stroke="#5eead4" strokeWidth="1" />
          <rect x="18" y="34" width="7" height="22" rx="1.5" fill="#14b8a6" stroke="#5eead4" strokeWidth="1" />
          <rect x="28" y="24" width="7" height="32" rx="1.5" fill="#f59e0b" stroke="#fde68a" strokeWidth="1" />
          <rect x="38" y="14" width="7" height="42" rx="1.5" fill="#f43f5e" stroke="#fda4af" strokeWidth="1" />
          <rect x="48" y="8" width="7" height="48" rx="1.5" fill="url(#barTeal)" stroke="#2dd4bf" strokeWidth="1" />
          {/* Ground Baseline */}
          <line x1="6" y1="58" x2="58" y2="58" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
          {/* Pivot Swapping Loop Arrow above */}
          <path d="M28 18 Q38 8 42 16" stroke="#facc15" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        </svg>
      );

    // 40: English Sentence Structure & Syntax Tree Builder
    case 40:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Root Node S */}
          <rect x="24" y="8" width="16" height="10" rx="2" fill="#6366f1" stroke="#a5b4fc" strokeWidth="1.2" />
          <text x="32" y="15" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">S</text>
          {/* Branch Lines */}
          <line x1="30" y1="18" x2="18" y2="28" stroke="#a5b4fc" strokeWidth="1.5" />
          <line x1="34" y1="18" x2="46" y2="28" stroke="#a5b4fc" strokeWidth="1.5" />
          {/* NP Node */}
          <rect x="10" y="28" width="16" height="10" rx="2" fill="#38bdf8" stroke="#7dd3fc" strokeWidth="1.2" />
          <text x="18" y="35" fill="#04102a" fontSize="6.5" fontWeight="bold" textAnchor="middle">NP</text>
          {/* VP Node */}
          <rect x="38" y="28" width="16" height="10" rx="2" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.2" />
          <text x="46" y="35" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle">VP</text>
          {/* Leaf Branches */}
          <line x1="18" y1="38" x2="14" y2="46" stroke="#a5b4fc" strokeWidth="1.2" />
          <line x1="46" y1="38" x2="42" y2="46" stroke="#a5b4fc" strokeWidth="1.2" />
          <line x1="46" y1="38" x2="52" y2="46" stroke="#a5b4fc" strokeWidth="1.2" />
          {/* Book / Leaf Foundation */}
          <path d="M10 54 Q32 50 54 54" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // 41: Vibrant Color Mixing & Geometric Sorting Playground (100% Colorful ECCE)
    case 41:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Golden Smiling Star */}
          <g transform="translate(18, 18)">
            <polygon points="14,2 17,9 25,9 18,14 21,22 14,17 7,22 10,14 3,9 11,9" fill="#ffea00" stroke="#ffffff" strokeWidth="1.5" />
          </g>
          {/* Sunny Ruby Red Smiling Circle */}
          <circle cx="44" cy="22" r="11" fill="#ff0055" stroke="#ffffff" strokeWidth="2" />
          <circle cx="41" cy="20" r="1.5" fill="#ffffff" />
          <circle cx="47" cy="20" r="1.5" fill="#ffffff" />
          <path d="M41 24 Q44 27 47 24" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          {/* Playful Ocean Blue Alphabet Block Square */}
          <rect x="10" y="34" width="18" height="18" rx="4" fill="#00d2ff" stroke="#ffffff" strokeWidth="2" />
          <text x="19" y="47" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">A</text>
          {/* Emerald Green Triangle */}
          <polygon points="46,34 56,52 36,52" fill="#00e676" stroke="#ffffff" strokeWidth="2" />
          {/* Violet Confetti Sparkles */}
          <circle cx="32" cy="38" r="3" fill="#d500f9" />
          <circle cx="56" cy="14" r="2.5" fill="#ff9100" />
        </svg>
      );

    // 42: Simple Harmonic Motion & Pendulum Conservation (Physics)
    case 42:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pivot Base */}
          <circle cx="32" cy="10" r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
          {/* Swing Arc Path */}
          <path d="M12 48 Q32 58 52 48" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.6" />
          {/* Angled String Rod */}
          <line x1="32" y1="10" x2="48" y2="44" stroke="#94a3b8" strokeWidth="2.5" />
          {/* Glowing Metallic Bob */}
          <circle cx="48" cy="44" r="9" fill="#0284c7" stroke="#67e8f9" strokeWidth="2" />
          <circle cx="45" cy="41" r="2.5" fill="#ffffff" />
          {/* Energy Vector Arrow */}
          <path d="M48 44 L56 38" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 43: Ideal Gas Laws & Kinetic Molecular Theory Engine (Chemistry)
    case 43:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cylinder Walls */}
          <path d="M14 10 V54 H50 V10" stroke="#c084fc" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Piston Head & Shaft */}
          <rect x="16" y="22" width="32" height="6" rx="1.5" fill="#a855f7" stroke="#e9d5ff" strokeWidth="1.2" />
          <line x1="32" y1="22" x2="32" y2="6" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" />
          {/* Gas Molecules */}
          <circle cx="22" cy="38" r="3" fill="#38bdf8" />
          <circle cx="34" cy="44" r="3" fill="#f43f5e" />
          <circle cx="42" cy="36" r="3" fill="#fbbf24" />
          <circle cx="28" cy="48" r="2.5" fill="#4ade80" />
          {/* Collision Trajectory Sparks */}
          <line x1="22" y1="38" x2="16" y2="35" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    // 44: Human Heart Anatomy & Double Blood Circulation (Biology)
    case 44:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="heartMyo" cx="45%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="50%" stopColor="#be123c" />
              <stop offset="85%" stopColor="#881337" />
              <stop offset="100%" stopColor="#4c0519" />
            </radialGradient>
            <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="60%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
            <linearGradient id="venaCavaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="pulmArteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>

          {/* Superior Vena Cava (Top Right Blue Vessel) */}
          <path d="M20 6 V18 C20 20 22 22 24 24" stroke="url(#venaCavaGrad)" strokeWidth="6" strokeLinecap="round" />
          
          {/* Aortic Arch (Great Central Red Arch) */}
          <path d="M28 22 C28 8 46 8 46 24" stroke="url(#aortaGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* 3 Brachiocephalic Branches on Aorta */}
          <line x1="33" y1="12" x2="31" y2="5" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="10" x2="38" y2="4" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="43" y1="12" x2="45" y2="5" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />

          {/* Pulmonary Artery Trunk (Crossover Blue) */}
          <path d="M26 24 C28 20 38 18 48 20" stroke="url(#pulmArteryGrad)" strokeWidth="5" strokeLinecap="round" />

          {/* Pulmonary Veins (Left side red return vessels) */}
          <rect x="47" y="24" width="7" height="4" rx="2" fill="#e11d48" />
          <rect x="10" y="24" width="7" height="4" rx="2" fill="#0284c7" />

          {/* Realistic Anatomical Cardiac Muscle Mass */}
          <path d="M32 20 C22 14 13 22 14 34 C15 44 24 53 30 58 C31 59 33 59 34 58 C42 52 52 44 51 32 C50 20 40 14 32 20 Z" 
            fill="url(#heartMyo)" stroke="#fda4af" strokeWidth="1.5" />

          {/* Anatomical Chamber Separations & Internal Grooves */}
          {/* Sulcus / Septum groove */}
          <path d="M30 24 Q31 38 32 57" stroke="#4c0519" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          {/* Right Ventricle / Atrium contour (Anatomical Right = Left side) */}
          <path d="M16 28 C18 36 24 38 28 36" stroke="#0284c7" strokeWidth="1.8" fill="none" opacity="0.8" />
          {/* Left Ventricle thick apex myocardium highlight */}
          <path d="M33 34 C38 42 42 48 35 55" stroke="#ffe4e6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />

          {/* Branching Coronary Arteries (Vibrant Gold/Coral Red) */}
          <path d="M30 26 Q33 34 27 42 Q25 46 28 50" stroke="#facc15" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M30 33 Q36 37 38 43" stroke="#facc15" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M28 42 Q23 44 21 47" stroke="#38bdf8" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        </svg>
      );

    // 45: Volcano Anatomy, Magma Chambers & Eruption Dynamics (Earth & Space)
    case 45:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mountain Flanks */}
          <polygon points="6,54 26,26 38,26 58,54" fill="#44403c" stroke="#78716c" strokeWidth="2" />
          {/* Central Conduit Pipe */}
          <rect x="29" y="26" width="6" height="28" fill="#ea580c" />
          {/* Sub-crustal Magma Chamber */}
          <ellipse cx="32" cy="54" rx="18" ry="7" fill="#f97316" stroke="#fef08a" strokeWidth="1.5" />
          {/* Exploding Lava Plume & Volcanic Bombs */}
          <path d="M32 26 Q24 8 20 12 Q32 2 44 12 Q40 8 32 26" fill="#ef4444" opacity="0.9" />
          <circle cx="22" cy="14" r="2.5" fill="#facc15" />
          <circle cx="42" cy="12" r="2.5" fill="#f97316" />
          <circle cx="32" cy="8" r="3" fill="#fef08a" />
        </svg>
      );

    // 46: Interactive Unit Circle & Trigonometric Functions (Mathematics)
    case 46:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cartesian Axes */}
          <line x1="6" y1="32" x2="58" y2="32" stroke="#64748b" strokeWidth="1.5" />
          <line x1="32" y1="6" x2="32" y2="58" stroke="#64748b" strokeWidth="1.5" />
          {/* Unit Circle (R = 1) */}
          <circle cx="32" cy="32" r="22" stroke="#38bdf8" strokeWidth="2" fill="none" />
          {/* Cosine Base (Blue) */}
          <line x1="32" y1="32" x2="47" y2="32" stroke="#3b82f6" strokeWidth="3" />
          {/* Sine Height (Green) */}
          <line x1="47" y1="32" x2="47" y2="16" stroke="#22c55e" strokeWidth="3" />
          {/* Radius Arm (White) */}
          <line x1="32" y1="32" x2="47" y2="16" stroke="#ffffff" strokeWidth="2" />
          {/* Circumference Coordinate Point */}
          <circle cx="47" cy="16" r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
        </svg>
      );

    // 47: Digital Logic Gates & Boolean Circuit Designer (Computer Science)
    case 47:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Input Wires */}
          <line x1="8" y1="22" x2="22" y2="22" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="8" y1="42" x2="22" y2="42" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          {/* AND Gate Body */}
          <path d="M22 14 H34 A18 18 0 0 1 34 50 H22 Z" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
          {/* Output Wire */}
          <line x1="48" y1="32" x2="56" y2="32" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Glowing Green Output LED Lamp */}
          <circle cx="56" cy="32" r="4.5" fill="#22c55e" stroke="#86efac" strokeWidth="1.5" />
          {/* 1 / 0 logic tags */}
          <text x="14" y="19" fill="#22c55e" fontSize="7" fontWeight="bold">1</text>
          <text x="14" y="49" fill="#94a3b8" fontSize="7" fontWeight="bold">0</text>
        </svg>
      );

    // 48: Parts of Speech Explorer & Grammar Quest Engine (English)
    case 48:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Open Grammar Book Pages */}
          <path d="M8 44 C18 40 32 42 32 48 C32 42 46 40 56 44 V16 C46 12 32 14 32 20 C32 14 18 12 8 16 Z" 
            fill="#312e81" stroke="#818cf8" strokeWidth="2" />
          <line x1="32" y1="20" x2="32" y2="48" stroke="#a5b4fc" strokeWidth="2" />
          {/* Word Tag Badges on Pages */}
          <rect x="12" y="24" width="14" height="6" rx="2" fill="#3b82f6" />
          <text x="14" y="29" fill="#ffffff" fontSize="5" fontWeight="bold">NOUN</text>
          <rect x="38" y="24" width="14" height="6" rx="2" fill="#10b981" />
          <text x="40" y="29" fill="#ffffff" fontSize="5" fontWeight="bold">VERB</text>
          <rect x="22" y="34" width="20" height="6" rx="2" fill="#f59e0b" />
          <text x="24" y="39" fill="#ffffff" fontSize="5" fontWeight="bold">ADJECTIVE</text>
        </svg>
      );

    // 49: Animal Kingdom & Safari Discovery Academy (Early Childhood ECCE)
    case 49:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sunny Savannah Background Hill */}
          <ellipse cx="32" cy="54" rx="26" ry="12" fill="#f59e0b" />
          {/* Safari Acacia Tree (Right) */}
          <path d="M48 50 V34" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="48" cy="30" rx="12" ry="6" fill="#16a34a" />
          {/* Friendly Smiling Cartoon Lion (Center) */}
          {/* Mane */}
          <circle cx="26" cy="32" r="16" fill="#d97706" />
          {/* Head */}
          <circle cx="26" cy="32" r="11" fill="#fbbf24" />
          {/* Eyes */}
          <circle cx="22" cy="30" r="1.8" fill="#1e293b" />
          <circle cx="30" cy="30" r="1.8" fill="#1e293b" />
          {/* Smiling Mouth */}
          <path d="M23 35 Q26 38 29 35" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Happy Confetti Star */}
          <polygon points="12,12 14,16 19,16 15,19 17,24 12,21 7,24 9,19 5,16 10,16" fill="#f43f5e" />
        </svg>
      );

    // 50: ECCE Seven Learning Areas: Teacher Conceptual Framework & Curriculum Standards (NCP 2022–23)
    case 50:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Seven Learning Areas Rainbow Spectrum Halo */}
          <path d="M8 46 A24 24 0 0 1 56 46" stroke="#1677ff" strokeWidth="3" fill="none" strokeDasharray="4 2" />
          {/* Open Pedagogical Curriculum Book */}
          <path d="M10 44 C20 40 32 42 32 48 C32 42 44 40 54 44 V18 C44 14 32 16 32 22 C32 16 20 14 10 18 Z" 
            fill="#082b57" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="32" y1="22" x2="32" y2="48" stroke="#60a5fa" strokeWidth="2" />
          {/* 7 Learning Areas Colored Dots on Pages */}
          <circle cx="18" cy="26" r="2.5" fill="#e11d48" />
          <circle cx="24" cy="31" r="2.5" fill="#7957ff" />
          <circle cx="18" cy="36" r="2.5" fill="#16b96b" />
          <circle cx="46" cy="26" r="2.5" fill="#ff9f2d" />
          <circle cx="40" cy="31" r="2.5" fill="#f04f9f" />
          <circle cx="46" cy="36" r="2.5" fill="#8559ff" />
          <circle cx="32" cy="14" r="3.5" fill="#facc15" stroke="#ffffff" strokeWidth="1" />
          {/* Golden Badge Bookmark Ribbon */}
          <path d="M30 46 L32 54 L34 46 Z" fill="#f59e0b" />
        </svg>
      );

    // 51: Wave Optics & Double-Slit Interference Lab (Physics)
    case 51:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="laserBeamGrad" x1="4" y1="32" x2="22" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="fringeGrad" x1="56" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="25%" stopColor="#10b981" />
              <stop offset="35%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="65%" stopColor="#0f172a" />
              <stop offset="75%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          {/* Laser Emitter Body */}
          <rect x="4" y="27" width="14" height="10" rx="2" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
          <polygon points="18,29 22,32 18,35" fill="#10b981" />
          <line x1="22" y1="32" x2="30" y2="32" stroke="url(#laserBeamGrad)" strokeWidth="2.5" />
          {/* Double-Slit Barrier */}
          <line x1="30" y1="10" x2="30" y2="25" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="29" x2="30" y2="35" stroke="#94a3b8" strokeWidth="3" />
          <line x1="30" y1="39" x2="30" y2="54" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          {/* Slit 1 Ripples */}
          <path d="M32 27 A8 8 0 0 1 38 22 M32 27 A16 16 0 0 1 44 18 M32 27 A24 24 0 0 1 50 14" stroke="#34d399" strokeWidth="1.2" strokeDasharray="2 2" fill="none" opacity="0.8" />
          {/* Slit 2 Ripples */}
          <path d="M32 37 A8 8 0 0 0 38 42 M32 37 A16 16 0 0 0 44 46 M32 37 A24 24 0 0 0 50 50" stroke="#34d399" strokeWidth="1.2" strokeDasharray="2 2" fill="none" opacity="0.8" />
          {/* Detector Screen Barrier */}
          <rect x="54" y="8" width="5" height="48" rx="2" fill="url(#fringeGrad)" stroke="#38bdf8" strokeWidth="1.2" />
          {/* Overlapping Central Maxima Peak */}
          <circle cx="56.5" cy="32" r="2.5" fill="#ffffff" />
        </svg>
      );

    // 52: Active vs. Passive Voice & Verb Tenses Timeline Studio (English & Grammar)
    case 52:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circular Voice Transformation Ring */}
          <path d="M16 28 C16 18 28 14 36 14 C44 14 50 18 50 26" stroke="#6366f1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <polygon points="50,26 46,21 53,22" fill="#6366f1" />
          <path d="M48 38 C48 48 36 52 28 52 C20 52 14 48 14 40" stroke="#a855f7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <polygon points="14,40 18,45 11,44" fill="#a855f7" />
          {/* Subject Badge (S) */}
          <circle cx="20" cy="22" r="7" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
          <text x="20" y="25" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">S</text>
          {/* Object Badge (O) */}
          <circle cx="44" cy="44" r="7" fill="#10b981" stroke="#a7f3d0" strokeWidth="1.5" />
          <text x="44" y="47" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">O</text>
          {/* Central Verb Box (V) */}
          <rect x="23" y="28" width="18" height="10" rx="3" fill="#312e81" stroke="#facc15" strokeWidth="1.8" />
          <text x="32" y="35" fill="#facc15" fontSize="7" fontWeight="900" textAnchor="middle">VERB</text>
        </svg>
      );

    // 53: Urdu Grammar (اردو گرامر)
    case 53:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="urduBookGrad" x1="10" y1="14" x2="54" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id="urduPageGrad" x1="16" y1="20" x2="48" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ecfdf5" />
            </linearGradient>
          </defs>
          {/* Open Book Base */}
          <path d="M8 44 C18 40 28 41 32 46 C36 41 46 40 56 44 V20 C46 16 36 17 32 22 C28 17 18 16 8 20 Z" fill="url(#urduBookGrad)" stroke="#34d399" strokeWidth="1.5" />
          {/* Inner Pages */}
          <path d="M12 40 C20 37 28 38 31 43 C34 38 42 37 52 40 V18 C42 15 34 16 31 21 C28 16 20 15 12 18 Z" fill="url(#urduPageGrad)" stroke="#a7f3d0" strokeWidth="1" />
          {/* Book Spine */}
          <line x1="31.5" y1="21" x2="31.5" y2="44" stroke="#059669" strokeWidth="1.5" />
          {/* Nastaliq text on pages */}
          <text x="21" y="32" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="'Noto Nastaliq Urdu', serif">اردو</text>
          <text x="42" y="32" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="'Noto Nastaliq Urdu', serif">گرامر</text>
          {/* Golden feather pen (Qalam) */}
          <path d="M46 12 C48 10 52 11 53 14 C51 22 41 30 38 33 L37 31 C40 28 45 19 46 12 Z" fill="#facc15" stroke="#d97706" strokeWidth="0.8" />
          <circle cx="16" cy="12" r="1.5" fill="#34d399" />
          <circle cx="50" cy="48" r="1.8" fill="#facc15" />
        </svg>
      );

    // 54: English Grammar (3D Cubes & Parts of Speech Studio)
    case 54:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cubeGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00c6ff" />
              <stop offset="100%" stopColor="#0072ff" />
            </linearGradient>
            <linearGradient id="cubeGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8e44ad" />
              <stop offset="100%" stopColor="#4a154b" />
            </linearGradient>
            <linearGradient id="cubeGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e74c3c" />
              <stop offset="100%" stopColor="#c0392b" />
            </linearGradient>
          </defs>
          {/* 3D Isometric Isometric Cube Representing Interactive 3D Architecture */}
          {/* Top Face */}
          <polygon points="32,8 52,19 32,30 12,19" fill="url(#cubeGradTop)" stroke="#ffe14d" strokeWidth="1.5" />
          {/* Left Face */}
          <polygon points="12,19 32,30 32,54 12,43" fill="url(#cubeGradLeft)" stroke="#ffe14d" strokeWidth="1.5" />
          {/* Right Face */}
          <polygon points="32,30 52,19 52,43 32,54" fill="url(#cubeGradRight)" stroke="#ffe14d" strokeWidth="1.5" />
          {/* Inner Glowing Core */}
          <circle cx="32" cy="30" r="4" fill="#ffe14d" opacity="0.9" />
          {/* English Grammar Badges on faces */}
          <text x="32" y="21" fill="#ffffff" fontSize="6" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">NOUN</text>
          <text x="22" y="39" fill="#ffe14d" fontSize="6" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">VERB</text>
          <text x="42" y="39" fill="#ffffff" fontSize="5.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">ADJ</text>
          {/* Tiny orbiting sparkle particles */}
          <circle cx="10" cy="12" r="1.5" fill="#ffe14d" />
          <circle cx="54" cy="14" r="1.8" fill="#00c6ff" />
          <circle cx="48" cy="52" r="1.5" fill="#2ecc71" />
          <circle cx="16" cy="50" r="1.5" fill="#f1c40f" />
        </svg>
      );

    // 55: Parts of Speech Lab
    case 55:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="posCard1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient id="posCard2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="posCard3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* Card 1: Noun */}
          <rect x="8" y="14" width="22" height="15" rx="3.5" fill="url(#posCard1)" stroke="#ddd6fe" strokeWidth="1.2" />
          <text x="19" y="24" fill="#ffffff" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">NOUN</text>
          {/* Card 2: Verb */}
          <rect x="34" y="14" width="22" height="15" rx="3.5" fill="url(#posCard2)" stroke="#bae6fd" strokeWidth="1.2" />
          <text x="45" y="24" fill="#ffffff" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">VERB</text>
          {/* Card 3: Adjective */}
          <rect x="8" y="35" width="22" height="15" rx="3.5" fill="url(#posCard3)" stroke="#fde68a" strokeWidth="1.2" />
          <text x="19" y="45" fill="#ffffff" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">ADJ</text>
          {/* Card 4: Adverb */}
          <rect x="34" y="35" width="22" height="15" rx="3.5" fill="#ec4899" stroke="#fbcfe8" strokeWidth="1.2" />
          <text x="45" y="45" fill="#ffffff" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">ADV</text>
          {/* Linking syntactic arc */}
          <path d="M30 21.5 C32 21.5 32 42.5 30 42.5" stroke="#facc15" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="32" cy="32" r="3" fill="#facc15" />
        </svg>
      );

    // 56: ECCE Learning World (Letters, Numbers, Urdu & Shapes)
    case 56:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ecceBlock1" x1="10" y1="14" x2="28" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff758c" />
              <stop offset="100%" stopColor="#ff4d6d" />
            </linearGradient>
            <linearGradient id="ecceBlock2" x1="34" y1="14" x2="52" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="ecceBlock3" x1="22" y1="34" x2="40" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect x="10" y="14" width="20" height="20" rx="4" fill="url(#ecceBlock1)" stroke="#ffe4e6" strokeWidth="1.5" />
          <text x="20" y="29" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">A</text>
          <rect x="34" y="14" width="20" height="20" rx="4" fill="url(#ecceBlock2)" stroke="#dbeafe" strokeWidth="1.5" />
          <text x="44" y="29" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">1</text>
          <rect x="22" y="34" width="20" height="20" rx="4" fill="url(#ecceBlock3)" stroke="#d1fae5" strokeWidth="1.5" />
          <text x="32" y="49" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">ا</text>
          <polygon points="12,48 14,43 19,43 15,40 17,35 12,38 7,35 9,40 5,43 10,43" fill="#facc15" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="50" cy="44" r="5" fill="#f43f5e" />
          <circle cx="48" cy="42" r="1.5" fill="#ffffff" />
          <circle cx="53" cy="10" r="2.5" fill="#f59e0b" />
          <circle cx="12" cy="10" r="2" fill="#38bdf8" />
        </svg>
      );

    // 57: Human Heart Anatomy & Circulation
    case 57:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          {/* Superior Vena Cava / Aorta Arches */}
          <path d="M24 10 C24 6 30 6 30 14" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M34 8 C34 4 42 4 42 14" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          {/* Main Anatomical Heart Mass */}
          <path d="M32 54 C18 42 12 32 12 24 C12 16 20 12 28 17 C32 19 32 19 32 19 C32 19 32 19 36 17 C44 12 52 16 52 24 C52 32 46 42 32 54 Z" fill="url(#heartGrad)" stroke="#fecaca" strokeWidth="1.5" />
          {/* Coronary blood vessel branches */}
          <path d="M26 26 Q32 34 30 46" stroke="#fee2e2" strokeWidth="1.5" fill="none" opacity="0.8" />
          <path d="M30 34 Q36 38 40 44" stroke="#bae6fd" strokeWidth="1.2" fill="none" opacity="0.8" />
          {/* Pulse wave overlay */}
          <path d="M16 34 L23 34 L26 27 L30 41 L34 31 L37 34 L48 34" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // 58: Structure of the Human Eye
    case 58:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="60%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#164e63" />
            </radialGradient>
            <linearGradient id="scleraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          {/* Sclera Eyeball Contour */}
          <ellipse cx="32" cy="32" rx="26" ry="17" fill="url(#scleraGrad)" stroke="#0284c7" strokeWidth="2" />
          {/* Iris */}
          <circle cx="32" cy="32" r="12" fill="url(#irisGrad)" stroke="#22d3ee" strokeWidth="1.5" />
          {/* Pupil */}
          <circle cx="32" cy="32" r="5.5" fill="#0f172a" />
          {/* Cornea Light Reflection Glint */}
          <circle cx="29" cy="29" r="2.2" fill="#ffffff" />
          <circle cx="35" cy="34" r="1.2" fill="#ffffff" opacity="0.7" />
          {/* Optical Ray Cone */}
          <path d="M8 26 L24 32 L8 38" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* Optic Nerve Stub */}
          <path d="M57 30 Q62 32 57 34" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    // 59: My ABC Book with Real Objects
    case 59:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* Open Book Base */}
          <path d="M10 46 C20 42 30 42 32 46 C34 42 44 42 54 46 V18 C44 14 34 14 32 18 C30 14 20 14 10 18 Z" fill="url(#bookCover)" stroke="#fde68a" strokeWidth="2" />
          {/* Book Spine */}
          <line x1="32" y1="18" x2="32" y2="46" stroke="#78350f" strokeWidth="1.8" />
          {/* Left Page Letters: A B C */}
          <text x="21" y="28" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">A B</text>
          <text x="21" y="39" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">C</text>
          {/* Right Page Real Object Graphic: Apple */}
          <circle cx="43" cy="28" r="6" fill="#ef4444" stroke="#fecaca" strokeWidth="1" />
          <path d="M43 22 Q45 18 43 16" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="45" cy="20" rx="2" ry="1" fill="#22c55e" />
          {/* Friendly Star */}
          <polygon points="50,12 51.5,8 55,8 52,6 53,2 50,4.5 47,2 48,6 45,8 48.5,8" fill="#facc15" />
        </svg>
      );

    // 60: Enzyme Kinetics & Substrate Catalysis
    case 60:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="enzymeBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="substrateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* Large Enzyme Molecule with Keyhole Active Site */}
          <path d="M12 28 C12 18 20 14 30 14 C32 14 34 20 38 20 C42 20 44 14 46 14 C54 14 58 22 58 34 C58 46 48 52 34 52 C20 52 12 44 12 28 Z" fill="url(#enzymeBody)" stroke="#6ee7b7" strokeWidth="2" />
          {/* Active Site Notch Detail */}
          <rect x="33" y="18" width="8" height="8" rx="2" fill="#064e3b" stroke="#34d399" strokeWidth="1" strokeDasharray="1 1" />
          {/* Substrate Key Fitting in from Top */}
          <rect x="34" y="8" width="6" height="7" rx="1.5" fill="url(#substrateGrad)" stroke="#fef08a" strokeWidth="1.2" />
          {/* Catalytic Energy Sparks */}
          <circle cx="28" cy="18" r="2" fill="#facc15" />
          <circle cx="44" cy="18" r="1.5" fill="#facc15" />
          <path d="M18 40 Q32 36 46 42" stroke="#d1fae5" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );

    // 61: Digital Logic Gates & Boolean Workbench
    case 61:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
          </defs>
          {/* Circuit Board Grid Background Lines */}
          <line x1="8" y1="24" x2="22" y2="24" stroke="#818cf8" strokeWidth="2" />
          <line x1="8" y1="40" x2="22" y2="40" stroke="#818cf8" strokeWidth="2" />
          <line x1="48" y1="32" x2="58" y2="32" stroke="#34d399" strokeWidth="2.5" />
          {/* AND/NAND Gate Body */}
          <path d="M22 16 H34 C44 16 48 24 48 32 C48 40 44 48 34 48 H22 Z" fill="url(#gateGrad)" stroke="#a5b4fc" strokeWidth="2" />
          {/* Gate Inversion Bubble (NOT bubble) */}
          <circle cx="51" cy="32" r="3" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
          {/* Output LED Node */}
          <circle cx="58" cy="32" r="2" fill="#34d399" />
          {/* Binary labels */}
          <text x="14" y="21" fill="#c7d2fe" fontSize="7" fontWeight="bold">1</text>
          <text x="14" y="47" fill="#c7d2fe" fontSize="7" fontWeight="bold">1</text>
          <text x="33" y="35" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">AND</text>
        </svg>
      );

    // 62: Photosynthesis in Flowering Plants Lab
    case 62:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>
          {/* Sun / Solar Radiation */}
          <circle cx="16" cy="16" r="6" fill="#facc15" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="22" y1="20" x2="28" y2="25" stroke="#fef08a" strokeWidth="2" strokeDasharray="1.5 1.5" />
          {/* Chloroplast Leaf Anatomy */}
          <path d="M20 50 C20 30 36 20 52 20 C52 38 42 54 20 50 Z" fill="url(#leafGrad)" stroke="#86efac" strokeWidth="2" />
          {/* Main Leaf Vein */}
          <path d="M20 50 Q34 36 52 20" stroke="#dcfce7" strokeWidth="1.8" fill="none" />
          {/* Secondary Veins */}
          <path d="M30 42 Q36 38 40 40" stroke="#dcfce7" strokeWidth="1.2" fill="none" />
          <path d="M38 34 Q44 30 48 32" stroke="#dcfce7" strokeWidth="1.2" fill="none" />
          {/* Oxygen Bubbles Released (O2) */}
          <circle cx="48" cy="14" r="3" fill="#38bdf8" fillOpacity="0.8" stroke="#bae6fd" strokeWidth="1" />
          <circle cx="56" cy="18" r="2" fill="#38bdf8" fillOpacity="0.8" stroke="#bae6fd" strokeWidth="1" />
          <text x="48" y="16.5" fill="#ffffff" fontSize="4.5" fontWeight="900" textAnchor="middle">O₂</text>
        </svg>
      );

    // 63: Solar System Celestial Orbits Simulation
    case 63:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunRadial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="80%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
          </defs>
          {/* Elliptical Planetary Orbital Rings */}
          <ellipse cx="32" cy="32" rx="26" ry="12" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
          <ellipse cx="32" cy="32" rx="19" ry="8.5" stroke="#818cf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
          <ellipse cx="32" cy="32" rx="12" ry="5.5" stroke="#fcd34d" strokeWidth="0.8" opacity="0.8" />
          {/* Glowing Central Star (Sun) */}
          <circle cx="32" cy="32" r="6.5" fill="url(#sunRadial)" stroke="#fef08a" strokeWidth="1" />
          {/* Inner Planet: Earth */}
          <circle cx="42" cy="28" r="2.5" fill="#0284c7" stroke="#7dd3fc" strokeWidth="0.8" />
          {/* Ringed Giant: Saturn */}
          <ellipse cx="14" cy="37" rx="4.5" ry="1.5" stroke="#fde68a" strokeWidth="1" transform="rotate(-15 14 37)" />
          <circle cx="14" cy="37" r="2.8" fill="#d97706" />
        </svg>
      );

    // 64: Plate Tectonics & Moon Phases
    case 64:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="crustGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="30%" stopColor="#78350f" />
              <stop offset="70%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          {/* Earth Crust Section */}
          <path d="M8 32 C18 28 28 34 32 32 C36 30 46 34 56 32 V52 H8 Z" fill="url(#crustGrad)" stroke="#fef08a" strokeWidth="1.5" />
          {/* Fault Line / Subduction Trench */}
          <path d="M30 32 L36 46" stroke="#fef08a" strokeWidth="2" strokeDasharray="2 1" />
          {/* Magma Plume Arrow */}
          <path d="M32 50 L32 40 M29 43 L32 39 L35 43" stroke="#facc15" strokeWidth="1.8" strokeLinecap="round" />
          {/* Moon Phases in the Sky */}
          <circle cx="20" cy="16" r="6" fill="#fef08a" />
          <circle cx="44" cy="16" r="6" fill="#1e293b" stroke="#fde68a" strokeWidth="1.2" />
          <path d="M44 10 A6 6 0 0 1 44 22 A3 6 0 0 0 44 10" fill="#fef08a" />
        </svg>
      );

    // 65: ECCE Discovery Academy Studio
    case 65:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ecceAcad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id="ecceAcad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* Block 1 */}
          <rect x="10" y="24" width="20" height="20" rx="4" fill="url(#ecceAcad1)" stroke="#fbcfe8" strokeWidth="1.5" />
          <text x="20" y="39" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">1</text>
          {/* Block 2 */}
          <rect x="34" y="24" width="20" height="20" rx="4" fill="url(#ecceAcad2)" stroke="#bae6fd" strokeWidth="1.5" />
          <text x="44" y="39" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">2</text>
          {/* Stacked Triangle Shape */}
          <polygon points="32,8 20,22 44,22" fill="#facc15" stroke="#fde047" strokeWidth="1.5" />
          <circle cx="32" cy="17" r="2.5" fill="#ffffff" />
          {/* Bottom Star & Heart Badge */}
          <polygon points="14,50 16,46 20,46 17,44 18,40 14,42 10,40 11,44 8,46 12,46" fill="#fbbf24" />
          <circle cx="50" cy="48" r="4" fill="#ef4444" />
        </svg>
      );

    // 66: Human Heart Simulation
    case 66:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hhGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="hhVessel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          {/* Superior Great Vessels */}
          <path d="M26 8 V18 M38 8 V18" stroke="url(#hhVessel)" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 6 Q38 4 44 14" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          {/* Muscular Heart Body */}
          <path d="M32 20 C22 14 12 24 14 36 C16 46 28 54 32 58 C36 54 48 46 50 36 C52 24 42 14 32 20 Z" fill="url(#hhGrad)" stroke="#fca5a5" strokeWidth="1.5" />
          {/* Blood Flow Vector Loop */}
          <path d="M24 32 Q20 40 26 46" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M40 32 Q44 40 38 46" stroke="#fecaca" strokeWidth="2.5" strokeLinecap="round" />
          {/* Central Septum Divider */}
          <line x1="32" y1="24" x2="32" y2="52" stroke="#7f1d1d" strokeWidth="2" strokeDasharray="3 2" />
        </svg>
      );

    // 67: Ice to Water to Steam Simulation
    case 67:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="iceCubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="waterDropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* Ice Crystal Cube (Left) */}
          <polygon points="18,34 28,29 28,42 18,47" fill="url(#iceCubeGrad)" stroke="#bae6fd" strokeWidth="1.2" />
          <polygon points="8,29 18,34 18,47 8,42" fill="#7dd3fc" stroke="#bae6fd" strokeWidth="1.2" />
          <polygon points="18,24 28,29 18,34 8,29" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.2" />
          {/* Transition Arrow 1 */}
          <path d="M29 37 L33 37" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          {/* Liquid Water Droplet (Center) */}
          <path d="M42 28 C42 28 35 37 35 42 A7 7 0 0 0 49 42 C49 37 42 28 42 28 Z" fill="url(#waterDropGrad)" stroke="#7dd3fc" strokeWidth="1.2" />
          {/* Steam Vapor Wafts (Top Right) */}
          <path d="M48 20 Q52 14 48 8" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
          <path d="M54 22 Q58 16 54 10" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
          <path d="M42 18 Q46 12 42 6" stroke="#f0f9ff" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
          {/* Base Thermal Flame Indicator */}
          <path d="M22 56 Q28 50 34 56 Q40 50 46 56" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // 68: Water Cycle Simulation
    case 68:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wcSun" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="wcWater" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          {/* Radiant Sun (Top Left) */}
          <circle cx="14" cy="14" r="8" fill="url(#wcSun)" stroke="#fde047" strokeWidth="1.2" />
          {/* Condensation Cloud (Top Right) */}
          <path d="M38 18 C38 14 44 12 47 15 C50 13 56 15 56 19 C58 20 58 24 55 25 H37 C34 25 34 20 38 18 Z" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1.2" />
          {/* Rain Droplets from Cloud */}
          <line x1="40" y1="28" x2="38" y2="33" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="46" y1="29" x2="44" y2="34" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="52" y1="28" x2="50" y2="33" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
          {/* Mountain Watershed (Right) */}
          <polygon points="32,48 48,34 60,48" fill="#475569" stroke="#64748b" strokeWidth="1.2" />
          <polygon points="44,38 48,34 52,38" fill="#ffffff" />
          {/* Ocean Reservoir & Wave (Bottom) */}
          <path d="M6 54 Q18 48 30 54 Q42 60 58 54 V60 H6 Z" fill="url(#wcWater)" />
          {/* Evaporation Ascending Vector */}
          <path d="M16 46 Q20 38 18 30" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
          <path d="M15 33 L18 29 L21 33" stroke="#bae6fd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // Default Fallback
    default:
      return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="24" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="32" cy="32" r="8" fill="#3b82f6" />
        </svg>
      );
  }
};

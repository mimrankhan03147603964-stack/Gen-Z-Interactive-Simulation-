import React, { useId } from 'react';

interface ClassIconProps {
  className?: string;
}

/**
 * Play Group / Prep: Colorful 3D Wooden ABC Toy Blocks
 */
export const PlayPrepBlocksIcon: React.FC<ClassIconProps> = ({ className = 'w-9 h-9' }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-red`} x1="18" y1="6" x2="42" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id={`${uid}-yellow`} x1="6" y1="30" x2="30" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={`${uid}-blue`} x1="34" y1="30" x2="58" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="32" cy="58" rx="25" ry="3.5" fill="#0F172A" fillOpacity="0.14" />

      {/* Bottom-Left Yellow Block ("B") */}
      <g>
        <rect x="6" y="31" width="24" height="24" rx="5" fill={`url(#${uid}-yellow)`} />
        <rect x="8.5" y="33.5" width="19" height="19" rx="3.2" fill="#FEF08A" fillOpacity="0.35" stroke="#D97706" strokeWidth="1.2" />
        <path d="M6 48 V50 C6 52.8 8.2 55 11 55 H25 C27.8 55 30 52.8 30 50 V48 C30 50.8 27.8 52.5 25 52.5 H11 C8.2 52.5 6 50.8 6 48 Z" fill="#B45309" fillOpacity="0.28" />
        <text x="18" y="47.5" textAnchor="middle" fill="#78350F" fontFamily="Plus Jakarta Sans, Inter, sans-serif" fontWeight="900" fontSize="14">B</text>
      </g>

      {/* Bottom-Right Sky Blue Block ("C") */}
      <g>
        <rect x="34" y="31" width="24" height="24" rx="5" fill={`url(#${uid}-blue)`} />
        <rect x="36.5" y="33.5" width="19" height="19" rx="3.2" fill="#BAE6FD" fillOpacity="0.3" stroke="#0369A1" strokeWidth="1.2" />
        <path d="M34 48 V50 C34 52.8 36.2 55 39 55 H53 C55.8 55 58 52.8 58 50 V48 C58 50.8 55.8 52.5 53 52.5 H39 C36.2 52.5 34 50.8 34 48 Z" fill="#075985" fillOpacity="0.3" />
        <text x="46" y="47.5" textAnchor="middle" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, Inter, sans-serif" fontWeight="900" fontSize="14">C</text>
      </g>

      {/* Top Center Coral Red Block ("A") */}
      <g>
        <rect x="20" y="6" width="24" height="24" rx="5" fill={`url(#${uid}-red)`} />
        <rect x="22.5" y="8.5" width="19" height="19" rx="3.2" fill="#FECDD3" fillOpacity="0.26" stroke="#9F1239" strokeWidth="1.2" />
        <path d="M20 23 V25 C20 27.8 22.2 30 25 30 H39 C41.8 30 44 27.8 44 25 V23 C44 25.8 41.8 27.5 39 27.5 H25 C22.2 27.5 20 25.8 20 23 Z" fill="#881337" fillOpacity="0.28" />
        <text x="32" y="22.8" textAnchor="middle" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, Inter, sans-serif" fontWeight="900" fontSize="14">A</text>
      </g>
    </svg>
  );
};

/**
 * Primary Classes (Class 1 – Class 5): Colorful School Backpack & Pencil
 */
export const PrimaryBackpackIcon: React.FC<ClassIconProps> = ({ className = 'w-9 h-9' }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-bag`} x1="12" y1="14" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={`${uid}-flap`} x1="14" y1="14" x2="44" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id={`${uid}-pocket`} x1="18" y1="35" x2="42" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id={`${uid}-pencil`} x1="46" y1="12" x2="58" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="32" cy="58" rx="23" ry="3.5" fill="#0F172A" fillOpacity="0.14" />

      {/* Top carry handle */}
      <path d="M23 16 V11 C23 8.2 25.2 6 28 6 H32 C34.8 6 37 8.2 37 11 V16" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" />

      {/* Side straps */}
      <rect x="9" y="28" width="6" height="20" rx="3" fill="#1E40AF" />
      <rect x="45" y="28" width="6" height="20" rx="3" fill="#1E40AF" />

      {/* Main backpack body */}
      <rect x="12" y="14" width="36" height="42" rx="12" fill={`url(#${uid}-bag)`} />

      {/* Top sculpted hood/flap */}
      <path d="M12 25 C12 18.5 17 14 23.5 14 H36.5 C43 14 48 18.5 48 25 V27 C48 29.5 46 31 43.5 31 H16.5 C14 31 12 29.5 12 27 V25 Z" fill={`url(#${uid}-flap)`} />

      {/* White zipper arc detail */}
      <path d="M17 26.5 C23 24 37 24 43 26.5" stroke="#DBEAFE" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2.5 2.5" />

      {/* Orange front pocket */}
      <rect x="17" y="35" width="26" height="17" rx="5.5" fill={`url(#${uid}-pocket)`} />
      <line x1="20" y1="40.5" x2="40" y2="40.5" stroke="#FED7AA" strokeWidth="1.6" strokeLinecap="round" />
      {/* Gold zipper pull */}
      <rect x="28.2" y="39" width="3.6" height="6" rx="1.5" fill="#FDE047" stroke="#B45309" strokeWidth="0.9" />

      {/* Realistic Yellow Pencil tucked on right */}
      <g transform="rotate(14 52 34)">
        {/* Pink eraser */}
        <rect x="48" y="12" width="8" height="6" rx="2" fill="#FB7185" />
        {/* Silver ferrule */}
        <rect x="48" y="17.5" width="8" height="3.5" fill="#CBD5E1" />
        {/* Yellow barrel */}
        <rect x="48" y="21" width="8" height="25" fill={`url(#${uid}-pencil)`} />
        <line x1="50.7" y1="21" x2="50.7" y2="46" stroke="#D97706" strokeWidth="0.9" strokeOpacity="0.6" />
        <line x1="53.3" y1="21" x2="53.3" y2="46" stroke="#FEF08A" strokeWidth="0.9" strokeOpacity="0.7" />
        {/* Wood cone & graphite tip */}
        <polygon points="48,46 56,46 52,54" fill="#FDE68A" />
        <polygon points="50.5,51 53.5,51 52,54" fill="#1E293B" />
      </g>
    </svg>
  );
};

/**
 * Middle Classes (Class 6 – Class 8): Earth Globe & Open Textbook
 */
export const MiddleGlobeBookIcon: React.FC<ClassIconProps> = ({ className = 'w-9 h-9' }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-ocean`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="55%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </radialGradient>
        <linearGradient id={`${uid}-land`} x1="18" y1="10" x2="46" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id={`${uid}-stand`} x1="20" y1="8" x2="48" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`${uid}-cover`} x1="8" y1="42" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="32" cy="59" rx="24" ry="3" fill="#0F172A" fillOpacity="0.14" />

      {/* Golden Meridian Arc behind globe */}
      <path
        d="M23 9 C38 4, 53 15, 50 31 C48 41, 39 47, 29 46"
        stroke={`url(#${uid}-stand)`}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="34" y1="46" x2="34" y2="52" stroke="#B45309" strokeWidth="3.2" strokeLinecap="round" />

      {/* Globe Sphere */}
      <circle cx="32" cy="26" r="17" fill={`url(#${uid}-ocean)`} />

      {/* Sculpted Continents clipped to sphere */}
      <clipPath id={`${uid}-clip`}>
        <circle cx="32" cy="26" r="17" />
      </clipPath>
      <g clipPath={`url(#${uid}-clip)`}>
        <path
          d="M17 16 C21 13, 27 14, 29 18 C31 22, 26 25, 25 29 C24 33, 28 36, 25 40 C21 41, 16 35, 15 28 Z"
          fill={`url(#${uid}-land)`}
        />
        <path
          d="M34 12 C40 12, 46 16, 47 22 C46 27, 41 29, 39 34 C37 37, 33 34, 34 29 C35 25, 31 21, 33 17 Z"
          fill={`url(#${uid}-land)`}
        />
        {/* Specular highlight */}
        <ellipse cx="25" cy="18" rx="6" ry="3.5" transform="rotate(-28 25 18)" fill="#FFFFFF" fillOpacity="0.32" />
      </g>

      {/* Open Textbook at bottom */}
      <g>
        <path d="M9 46 C9 44.5 10.5 43.5 12 43.8 L32 47.5 L52 43.8 C53.5 43.5 55 44.5 55 46 V55.5 C55 56.8 53.8 57.6 52.5 57.3 L32 54 L11.5 57.3 C10.2 57.6 9 56.8 9 55.5 Z" fill={`url(#${uid}-cover)`} />
        <path d="M11.5 44.5 L31.2 48 V54.5 L11.5 51.5 Z" fill="#FFFFFF" />
        <path d="M52.5 44.5 L32.8 48 V54.5 L52.5 51.5 Z" fill="#F1F5F9" />
        {/* Red bookmark ribbon */}
        <path d="M36 47.4 V57.5 L38.5 55.5 L41 57.5 V46.6 Z" fill="#EF4444" />
      </g>
    </svg>
  );
};

/**
 * Secondary / Matric Classes (Class 9 – Class 10): Optical Microscope & Lab Flask
 */
export const SecondaryMicroscopeIcon: React.FC<ClassIconProps> = ({ className = 'w-9 h-9' }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-body`} x1="12" y1="8" x2="40" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={`${uid}-navy`} x1="10" y1="42" x2="42" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id={`${uid}-liquid`} x1="40" y1="36" x2="58" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="32" cy="58" rx="25" ry="3.5" fill="#0F172A" fillOpacity="0.14" />

      {/* Microscope Curved Arm */}
      <path
        d="M27 19 C36 21, 39 33, 33 48"
        stroke="#64748B"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Angled Optical Tube & Eyepiece */}
      <g transform="rotate(20 22 22)">
        {/* Eyepiece cap */}
        <rect x="17" y="5" width="10" height="4.5" rx="1.8" fill="#1E293B" />
        {/* Main silver optical barrel */}
        <rect x="18" y="9" width="8" height="21" rx="2" fill={`url(#${uid}-body)`} stroke="#475569" strokeWidth="1.3" />
        {/* Blue collar band */}
        <rect x="18" y="14" width="8" height="3.5" fill="#2563EB" />
        {/* Objective lens nozzle */}
        <rect x="19.5" y="30" width="5" height="4.5" rx="1" fill="#334155" />
      </g>

      {/* Focus Dial Knob */}
      <circle cx="34.5" cy="31" r="4.8" fill="#1E3A8A" stroke="#F8FAFC" strokeWidth="1.5" />
      <circle cx="34.5" cy="31" r="1.8" fill="#F59E0B" />

      {/* Specimen Stage & Glowing Slide */}
      <rect x="10" y="39" width="22" height="3.8" rx="1.5" fill="#1E293B" />
      <rect x="13" y="36.8" width="13" height="2.4" rx="1" fill="#38BDF8" />

      {/* Microscope Weighted Base */}
      <path d="M8 54 C8 50.5 11 48 15 48 H35 C38.5 48 41 50.5 41 54 V55.5 C41 56.3 40.3 57 39.5 57 H9.5 C8.7 57 8 56.3 8 55.5 Z" fill={`url(#${uid}-navy)`} />
      <rect x="14" y="45" width="9" height="3.5" rx="1" fill="#F59E0B" />

      {/* Glowing Emerald Erlenmeyer Flask on Right */}
      <g>
        {/* Flask glass body */}
        <path
          d="M45.5 28 H51.5 V35.5 L57.8 50.5 C58.7 52.8 57 55.5 54.5 55.5 H42.5 C40 55.5 38.3 52.8 39.2 50.5 L45.5 35.5 Z"
          fill="#E0F2FE"
          fillOpacity="0.88"
          stroke="#0284C7"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Emerald chemical liquid */}
        <path
          d="M43.2 43 H53.8 L56.8 50.6 C57.3 52 56.2 53.8 54.5 53.8 H42.5 C40.8 53.8 39.7 52 40.2 50.6 Z"
          fill={`url(#${uid}-liquid)`}
        />
        {/* Flask rim */}
        <rect x="44" y="26.5" width="9" height="2.6" rx="1.3" fill="#0284C7" />
        {/* Rising reaction bubbles */}
        <circle cx="47.5" cy="48.5" r="1.4" fill="#A7F3D0" />
        <circle cx="51" cy="46" r="1.1" fill="#ECFDF5" />
        <circle cx="48.8" cy="39.5" r="1.2" fill="#34D399" />
      </g>
    </svg>
  );
};

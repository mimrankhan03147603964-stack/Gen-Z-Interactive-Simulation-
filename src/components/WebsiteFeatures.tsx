import React from 'react';
import { 
  Atom, 
  Sparkles, 
  Cpu, 
  Maximize2, 
  ShieldCheck, 
  Monitor, 
  BookOpen, 
  Zap 
} from 'lucide-react';

interface WebsiteFeaturesProps {
  isDarkMode?: boolean;
}

export const WebsiteFeatures: React.FC<WebsiteFeaturesProps> = ({ isDarkMode = false }) => {
  const features = [
    {
      icon: <Monitor className="w-6 h-6 text-blue-500" />,
      title: 'Optimized for Laptops & PCs',
      description: 'Native responsive execution on computer monitors, Chromebooks, interactive classroom smart boards, and widescreen projectors.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-amber-500" />,
      title: 'Real-Time Physics & Math Engines',
      description: 'Continuous ray tracing, dynamic particle kinetics, harmonic Keplerian orbits, and circuit Ohm\'s law calculators running live at 60 FPS.'
    },
    {
      icon: <Maximize2 className="w-6 h-6 text-rose-500" />,
      title: 'True 4K Fullscreen Projection',
      description: 'Single-click theater mode eliminates browser distractions and fills the display for high-impact classroom lectures and science demonstrations.'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-pink-500" />,
      title: 'Multidisciplinary Curriculum & English Arts',
      description: 'Aligned with elementary, secondary, and higher competencies across Physics, Chemistry, Biology, Earth & Space, Math, Computer Science, and English Language Arts.'
    }
  ];

  return (
    <section 
      id="features" 
      className="w-full rounded-2xl p-6 sm:p-8 border shadow-xl transition-all space-y-6 opacity-100"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.78)' : 'rgba(255, 255, 255, 0.82)',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.65)',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.45)' : '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4"
        style={{
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.5)'
        }}
      >
        <div>
          <span 
            className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs inline-block mb-1.5"
            style={{
              backgroundColor: isDarkMode ? 'rgba(15, 41, 99, 0.75)' : 'rgba(239, 246, 255, 0.85)',
              color: isDarkMode ? '#38bdf8' : '#1d4ed8',
              borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.45)' : 'rgba(147, 197, 253, 0.7)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            Digital Laboratory Architecture
          </span>
          <h2 
            className="text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
          >
            Professional STEM Educational Website Capabilities
          </h2>
        </div>
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black shrink-0"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.75)' : 'rgba(241, 245, 249, 0.8)',
            borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.45)' : 'rgba(148, 163, 184, 0.6)',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: isDarkMode ? '#38bdf8' : '#1d4ed8'
          }}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Verified Digital Laboratory Standard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feat, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl border transition-all btn-3d flex flex-col justify-between"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.72)' : 'rgba(248, 250, 252, 0.75)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.65)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div>
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 shadow-xs"
                style={{
                  backgroundColor: isDarkMode ? '#0c1b3d' : '#ffffff',
                  borderColor: isDarkMode ? '#3b82f6' : '#cbd5e1',
                  borderWidth: '1.5px',
                  borderStyle: 'solid'
                }}
              >
                {feat.icon}
              </div>
              <h3 
                className="text-sm font-black tracking-tight mb-1"
                style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
              >
                {feat.title}
              </h3>
              <p 
                className="text-xs font-medium leading-relaxed"
                style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
              >
                {feat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

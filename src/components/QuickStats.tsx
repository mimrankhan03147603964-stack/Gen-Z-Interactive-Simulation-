import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SimulationItem } from '../types';
import { 
  MultiStemAllIcon, 
  MultiEnglishIcon, 
  MultiPhysicsIcon, 
  MultiPrimaryIcon 
} from './ModernStemIcons';

interface QuickStatsProps {
  activeSim?: SimulationItem | null;
  totalSimulations: number;
  isDarkMode?: boolean;
}

// Reusable smooth count-up animation hook using Intersection Observer
function useCountUpOnScroll(
  target: number,
  isVisible: boolean,
  duration: number = 1800
): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Subtle cubic ease-out curve: 1 - (1 - t)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * easeOut));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, isVisible, duration]);

  return count;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  activeSim,
  totalSimulations = 86,
  isDarkMode = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState<boolean>(false);

  // Intersection Observer to trigger counter animation strictly when section scrolls into viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect(); // Animate smoothly once on scroll
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth count-up values for all 4 key metrics
  const countSimulations = useCountUpOnScroll(totalSimulations, hasEnteredViewport, 1800);
  const countDisciplines = useCountUpOnScroll(9, hasEnteredViewport, 1800);
  const countCoverage = useCountUpOnScroll(100, hasEnteredViewport, 1800);
  const countFps = useCountUpOnScroll(60, hasEnteredViewport, 1800);

  return (
    <div 
      ref={containerRef}
      id="quick-stats-counter"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full opacity-100 select-none"
    >
      
      {/* Stat Card 1: Total Simulations (Blue Theme) */}
      <div 
        className="p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group opacity-100 bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-0.5"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-[#1E88E5]"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-[#1E88E5]" 
            />
            <span>TOTAL SIMULATIONS</span>
          </div>
          
          {/* Large Prominent Counter Number (3rem - 4rem / text-5xl to text-6xl) */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span 
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#1565C0] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              {countSimulations}
            </span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1565C0]">
              STEM Labs
            </span>
          </div>

          <div 
            className="text-[11px] font-bold mt-2 flex items-center gap-1 text-[#3B4A73]"
          >
            <span>All {totalSimulations} active &amp; ready</span>
            <ArrowRight className="w-3.5 h-3.5 font-black text-[#1E88E5]" />
          </div>
        </div>
        <div 
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform border border-[#1546A8] bg-white p-2.5"
        >
          <MultiStemAllIcon className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" />
        </div>
      </div>

      {/* Stat Card 2: Core Disciplines (Dark Blue Theme) */}
      <div 
        className="p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group opacity-100 bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-0.5"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-[#1546A8]"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-[#1546A8]" 
            />
            <span>CORE DISCIPLINES</span>
          </div>

          {/* Large Prominent Counter Number */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span 
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#1546A8] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              {countDisciplines}
            </span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1546A8]">
              Subjects
            </span>
          </div>

          <div 
            className="text-[11px] font-bold mt-2 truncate max-w-[170px] text-[#3B4A73]"
          >
            {activeSim ? activeSim.subject : 'Curriculum Aligned'}
          </div>
        </div>
        <div 
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform border border-[#1B2A5C] bg-white p-2.5"
        >
          <MultiEnglishIcon className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" />
        </div>
      </div>

      {/* Stat Card 3: Interactive Standard (Red Theme) */}
      <div 
        className="p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group opacity-100 bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-0.5"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-[#E53935]"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-[#E53935]" 
            />
            <span>INTERACTIVE STANDARD</span>
          </div>

          {/* Large Prominent Counter Number */}
          <div className="flex items-baseline gap-1 mt-1.5">
            <span 
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#E53935] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              {countCoverage}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#E53935] leading-none">%</span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#E53935] ml-1">
              Active
            </span>
          </div>

          <div 
            className="text-[11px] font-bold mt-2 truncate max-w-[170px] text-[#3B4A73]"
          >
            {activeSim ? activeSim.gradeLevel : '100% Free & Hazard-Free'}
          </div>
        </div>
        <div 
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform border border-[#B71C1C] bg-white p-2.5"
        >
          <MultiPhysicsIcon className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" />
        </div>
      </div>

      {/* Stat Card 4: 3D Visual Engine & Status (Gold Theme) */}
      <div 
        className="p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group opacity-100 bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-0.5"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-[#E58E0A]"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-[#F5A623]" 
            />
            <span>VISUAL ENGINE SPEED</span>
          </div>

          {/* Large Prominent Counter Number */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span 
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#E58E0A] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              {countFps}
            </span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#E58E0A] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#F5A623]" />
              FPS / 4K
            </span>
          </div>

          <div 
            className="text-[11px] font-bold mt-2 text-[#3B4A73]"
          >
            Live HTML5 / Canvas 60 FPS
          </div>
        </div>
        <div 
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform border border-[#E58E0A] bg-white p-2.5"
        >
          <MultiPrimaryIcon className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" />
        </div>
      </div>

    </div>
  );
};

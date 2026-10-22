import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Layers, Play, Radio, Star, Rocket } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';
import { getDisciplineColor } from '../data/simTheme';

interface HeroBannerProps {
  activeSim?: SimulationItem | null;
  isDarkMode?: boolean;
  onSelectSim?: (sim: SimulationItem) => void;
}

const cleanTopicTitle = (title: string, category?: string): string => {
  let clean = title
    .replace(/\.html$/i, '')
    .replace(/_/g, ' ')
    .replace(/Cambridge\s+Scholar\s*[-–—]?\s*/gi, '')
    .trim();
  if (category !== 'Urdu & Linguistics') {
    clean = clean.replace(/[\u0600-\u06FF]+/g, '').replace(/\(\s*\)/g, '').trim();
  }
  return clean;
};

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectSim }) => {
  const [time, setTime] = useState<string>('');
  const [period, setPeriod] = useState<string>('PM');
  const [dateStr, setDateStr] = useState<string>('');

  // 2-Second Interval Timer & Fluid Right-to-Left Slide Rotator State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState<boolean>(false);

  // 100% of available simulation topics currently in the system library (74 verified labs)
  const allSimulationTopics = SIMULATIONS_LIST;

  // Digital clock widget
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = String(hours).padStart(2, '0');

      setTime(`${formattedHours}:${minutes}:${seconds}`);
      setPeriod(ampm);

      const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
      const day = String(now.getDate()).padStart(2, '0');
      const month = now.toLocaleDateString('en-US', { month: 'long' });
      const year = now.getFullYear();

      setDateStr(`${weekday}, ${day} ${month} ${year}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Strict 2-Second (2000ms) Interval with Fluid Right-to-Left Slide Transition
  useEffect(() => {
    if (isShowcaseHovered || allSimulationTopics.length <= 1) return;

    const timer = setInterval(() => {
      const target = (currentIndex + 1) % allSimulationTopics.length;
      setNextIndex(target);

      requestAnimationFrame(() => {
        setIsSliding(true);
      });

      const timeout = setTimeout(() => {
        setCurrentIndex(target);
        setNextIndex(null);
        setIsSliding(false);
      }, 450);

      return () => clearTimeout(timeout);
    }, 2000);

    return () => clearInterval(timer);
  }, [currentIndex, isShowcaseHovered, allSimulationTopics.length]);

  const currentSim = allSimulationTopics[currentIndex] || allSimulationTopics[0];
  const nextSim = nextIndex !== null ? allSimulationTopics[nextIndex] : null;

  const handleLaunchShowcase = (sim: SimulationItem) => {
    if (onSelectSim) {
      onSelectSim(sim);
    } else {
      openSimulationInNewTab(sim);
    }
  };

  const renderTopicItem = (sim: SimulationItem) => {
    if (!sim) return null;
    const cleanTitle = cleanTopicTitle(sim.title, sim.category);
    const disc = getDisciplineColor(sim.category);

    return (
      <div 
        className="w-full h-full flex items-center justify-between px-3 sm:px-6 gap-3 select-none text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${disc.base} 0%, ${disc.dark} 100%)`,
          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.4)`
        }}
      >
        {/* Specular Top Sheen */}
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-gradient-to-b from-white/40 via-transparent to-black/30" />

        <div className="flex items-center gap-3 min-w-0 flex-1 relative z-10">
          {/* Simulation Vector Icon Badge on 3D Glass Pedestal */}
          <div 
            onClick={() => handleLaunchShowcase(sim)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 p-1 cursor-pointer transition-transform hover:scale-110 bg-white/20 border border-white/40 shadow-md backdrop-blur-md"
            title={`Open ${cleanTitle} simulation in new tab`}
          >
            <TopicRealisticIcon 
              indexNumber={sim.indexNumber} 
              simId={sim.id} 
              className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-md" 
            />
          </div>

          {/* Lab Number Tag */}
          <span 
            className="font-mono text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-lg shrink-0 text-white bg-black/40 border border-white/25 shadow-md"
          >
            LAB {sim.indexNumber}
          </span>

          {/* Category Badge */}
          <span 
            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-lg shrink-0 text-white bg-white/20 border border-white/30 hidden md:inline-block shadow-2xs backdrop-blur-xs"
          >
            {disc.name}
          </span>

          {/* Topic Name */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              handleLaunchShowcase(sim);
            }}
            className="text-xs sm:text-sm md:text-base font-black truncate text-white drop-shadow-sm hover:text-amber-200 transition-colors"
            title={`Open ${cleanTitle} in new tab`}
          >
            {cleanTitle}
          </a>
        </div>

        {/* Right Direct "Launch Lab" Button with royal-blue 3D style */}
        <a
          href={getSimulationStandaloneUrl(sim)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            handleLaunchShowcase(sim);
          }}
          className="btn-tactile-3d relative z-10 shrink-0 ml-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-md hover:shadow-xl transition-all whitespace-nowrap flex items-center gap-1.5 border-b-2 border-blue-950 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0284c7 100%)',
            boxShadow: '0 6px 18px -3px rgba(30, 58, 138, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
          }}
          title={`Launch ${cleanTitle} simulation now`}
        >
          <span>Launch Lab</span>
          <Rocket className="w-3.5 h-3.5 text-amber-300 shrink-0 pointer-events-none" />
        </a>
      </div>
    );
  };

  return (
    <div className="relative group w-full space-y-4">
      
      {/* Main Modern Graphic Design Hero Card with 3D Depth & Rich Colors */}
      <div 
        className="relative w-full overflow-hidden p-6 sm:p-8 md:p-10 rounded-3xl border-2 border-blue-400/40 text-white shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #071330 0%, #0d2862 25%, #1e3a8a 50%, #1e40af 75%, #0284c7 100%)',
          boxShadow: '0 25px 60px -15px rgba(14, 30, 80, 0.65), 0 0 45px -10px rgba(2, 132, 199, 0.4), inset 0 2px 2px rgba(255, 255, 255, 0.25)'
        }}
      >
        {/* Ambient 3D Neon Radial Flares & Specular Sheen */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-white/30 via-transparent to-black/40" />

        {/* Top Row: Left Pill Badges + Right Futuristic Cockpit Clock Widget */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 relative z-10">
          
          {/* Left Pill Chip with Curriculum Alignment Tag */}
          <div className="flex items-center gap-2 flex-wrap">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-blue-400 bg-[#0f2347] shadow-md text-white"
            >
              <Sparkles className="w-4 h-4 text-amber-300 pointer-events-none shrink-0" />
              <span className="font-heading font-black text-xs sm:text-sm tracking-wide text-white drop-shadow-xs">
                GEN Z INTERACTIVE SIMULATIONS PORTAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xs">
                4K 3D
              </span>
            </div>

            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border-2 border-emerald-400 bg-[#063327] text-emerald-100 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Aligned with National Curriculum of Pakistan (Session 2026-27)
            </span>
          </div>

          {/* Right Area: Futuristic Digital Cockpit Clock Widget */}
          <div className="flex items-center gap-2 flex-wrap ml-auto sm:ml-0">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-cyan-400 bg-[#0c1c38] shadow-lg text-white"
            >
              <div className="flex items-center gap-1.5 font-mono font-black text-xs sm:text-sm text-cyan-300">
                <Clock className="w-4 h-4 text-cyan-400 animate-pulse shrink-0 pointer-events-none" />
                <span className="font-mono text-cyan-300 tracking-wider">
                  {time || '00:00:00'}
                </span>
              </div>

              <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase font-mono bg-amber-400 text-slate-950 shadow-xs">
                {period}
              </span>

              <span className="text-cyan-400 font-bold text-xs">|</span>

              <span className="font-bold whitespace-nowrap text-[11px] sm:text-xs text-blue-100">
                {dateStr || 'Loading date...'}
              </span>
            </div>
          </div>

        </div>

        {/* Main Headline & GZ Emblem Showcase */}
        <div className="relative z-10 my-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex-1">
            {/* SOLID PURE WHITE TEXT - NO BACKGROUND GRADIENT THAT CREATES A WHITE RECTANGLE */}
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              Gen Z Interactive Simulations Portal
            </h1>
            <p className="mt-2 text-sm sm:text-base font-bold text-cyan-300 tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block shrink-0" />
              <span>Professional Multidisciplinary STEM Learning Portal</span>
            </p>
            <p className="mt-3 text-xs sm:text-sm text-slate-100 max-w-2xl leading-relaxed font-semibold">
              Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, celestial mechanics, mathematics, computer science, linguistics, and early childhood care &amp; education (ECCE). Switch seamlessly across all {allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.
            </p>

            {/* 3D Action Buttons */}
            <div className="relative z-10 mt-6 flex items-center gap-3.5 flex-wrap">
              <a
                href="#catalog"
                className="btn-tactile-3d px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white shadow-xl transition-all flex items-center gap-2 cursor-pointer border-2 border-blue-300"
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0284c7 100%)',
                  boxShadow: '0 8px 24px -4px rgba(2, 132, 199, 0.6)'
                }}
              >
                <Layers className="w-4 h-4 text-white pointer-events-none" />
                <span>Explore All Labs Grid</span>
              </a>
              <a
                href="#stage"
                className="btn-tactile-3d px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white shadow-lg transition-all flex items-center gap-2 cursor-pointer border-2 border-cyan-400 bg-[#0f244a]"
              >
                <Play className="w-4 h-4 fill-current text-cyan-300 pointer-events-none" />
                <span>Interactive Stage &amp; Dedicated Tabs</span>
              </a>
            </div>
          </div>

          {/* Official GZ Monogram Emblem on Solid Navy 3D Pedestal */}
          <div className="shrink-0 flex items-center justify-center my-2 md:my-0 self-center">
            <div 
              className="relative p-3.5 sm:p-4 flex items-center justify-center transition-all duration-300 hover:scale-105 rounded-2xl border-2 border-blue-400 bg-[#0e2145] shadow-xl"
              style={{
                width: '240px',
                maxWidth: '100%',
                height: '170px',
                boxShadow: '0 12px 30px -5px rgba(2, 132, 199, 0.4)'
              }}
              title="Gen Z Interactive Simulations Official Monogram"
            >
              <img 
                src="/genz-monogram.png" 
                alt="Gen Z Interactive Simulations Official Monogram Logo" 
                className="w-full h-full max-w-full max-h-full object-contain block mx-auto select-none drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Continuous Right-to-Left Live Bulletin Ticker */}
        <div 
          className="group/ticker relative z-10 mt-6 text-xs flex items-center overflow-hidden rounded-2xl border border-blue-400/30 shadow-md"
          style={{
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(12px)'
          }}
          title="Live STEM Bulletin — Hover to pause scrolling, click any lab to open"
        >
          {/* Fixed Left Badge: Live STEM Bulletin */}
          <div 
            className="shrink-0 z-20 px-4 py-3 flex items-center gap-2 font-black uppercase tracking-wider text-[11px] text-white shadow-md"
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)'
            }}
          >
            <Radio className="w-4 h-4 animate-pulse text-amber-300 pointer-events-none" />
            <span className="whitespace-nowrap font-heading">LIVE STEM BULLETIN</span>
            <span className="hidden lg:inline text-[9px] font-normal tracking-normal text-cyan-200 opacity-90">(HOVER PAUSES)</span>
          </div>

          {/* Endless Seamless Marquee Viewport */}
          <div className="flex-1 overflow-hidden relative py-3 cursor-pointer">
            <div className="animate-marquee-infinite flex items-center">
              
              <div className="flex items-center shrink-0">
                {allSimulationTopics.map((sim) => (
                  <a 
                    key={`sim-ticker-1-${sim.id}`} 
                    href={getSimulationStandaloneUrl(sim)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center shrink-0 mr-8 hover:text-cyan-300 transition-colors text-inherit no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold mr-2 text-white font-mono shadow-xs"
                      style={{ backgroundColor: sim.accentColor }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-bold text-white mr-1.5">
                      {sim.title}
                    </span>
                    <span className="text-cyan-200/80 text-[11px] font-medium mr-2">
                      ({sim.category}) &mdash; {sim.description}
                    </span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline-block mx-2 shrink-0 pointer-events-none" />
                  </a>
                ))}
              </div>

              <div className="flex items-center shrink-0">
                {allSimulationTopics.map((sim) => (
                  <a 
                    key={`sim-ticker-2-${sim.id}`} 
                    href={getSimulationStandaloneUrl(sim)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center shrink-0 mr-8 hover:text-cyan-300 transition-colors text-inherit no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold mr-2 text-white font-mono shadow-xs"
                      style={{ backgroundColor: sim.accentColor }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-bold text-white mr-1.5">
                      {sim.title}
                    </span>
                    <span className="text-cyan-200/80 text-[11px] font-medium mr-2">
                      ({sim.category}) &mdash; {sim.description}
                    </span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline-block mx-2 shrink-0 pointer-events-none" />
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* 2-Second Rotating Showcase Item at Bottom */}
      {currentSim && (
        <div 
          className="w-full h-18 sm:h-20 rounded-2xl overflow-hidden shadow-lg relative select-none border-2 border-blue-400/40 bg-slate-900"
          onMouseEnter={() => setIsShowcaseHovered(true)}
          onMouseLeave={() => setIsShowcaseHovered(false)}
        >
          {/* Active Current Topic */}
          <div
            className="absolute inset-0 w-full h-full flex items-center"
            style={{
              transform: isSliding ? 'translateX(-100%)' : 'translateX(0%)',
              transition: isSliding ? 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              willChange: 'transform'
            }}
          >
            {renderTopicItem(currentSim)}
          </div>

          {/* Next Incoming Topic */}
          {nextSim && (
            <div
              className="absolute inset-0 w-full h-full flex items-center"
              style={{
                transform: isSliding ? 'translateX(0%)' : 'translateX(100%)',
                transition: isSliding ? 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                willChange: 'transform'
              }}
            >
              {renderTopicItem(nextSim)}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

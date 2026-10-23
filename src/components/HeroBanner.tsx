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
      
      {/* Main Modern Graphic Design Hero Card with Rich Solid Royal Blue/Navy Background & Tasteful Depth */}
      <div 
        className="relative w-full overflow-hidden p-6 sm:p-8 md:p-10 rounded-3xl border-2 border-sky-400/50 text-white shadow-[0_24px_50px_-10px_rgba(2,28,77,0.55),0_10px_25px_-5px_rgba(0,0,0,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)]"
        style={{
          background: 'linear-gradient(135deg, #071530 0%, #0c2352 40%, #0e3070 75%, #081a3d 100%)'
        }}
      >
        {/* Soft Ambient Luminous Depth Flares */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-64 h-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        {/* Top Row: Left Pill Badges + Right Futuristic Cockpit Clock Widget */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 relative z-10">
          
          {/* Left Pill Chip with Curriculum Alignment Tag (Yellow Accents) */}
          <div className="flex items-center gap-2 flex-wrap">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-yellow-400/70 bg-slate-950 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-yellow-400 pointer-events-none shrink-0 fill-yellow-400/20" />
              <span className="font-heading font-black text-xs sm:text-sm tracking-wide text-yellow-400 drop-shadow-xs">
                GEN Z INTERACTIVE SIMULATIONS PORTAL
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black font-mono bg-yellow-400/15 text-yellow-400 shadow-md border border-yellow-400/60">
                4K 3D
              </span>
            </div>

            <span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold border-2 border-yellow-400/60 bg-slate-950 text-yellow-300 shadow-xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse shrink-0 shadow-[0_0_8px_#facc15]" />
              <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
            </span>
          </div>

          {/* Right Area: Futuristic Digital Cockpit Clock Widget */}
          <div className="flex items-center gap-2 flex-wrap ml-auto sm:ml-0">
            <div 
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border-2 border-sky-400 bg-slate-950 shadow-xl text-white"
            >
              <div className="flex items-center gap-1.5 font-mono font-black text-xs sm:text-sm text-cyan-300">
                <Clock className="w-4 h-4 text-cyan-400 animate-pulse shrink-0 pointer-events-none" />
                <span className="font-mono text-cyan-300 tracking-wider text-sm sm:text-base font-black">
                  {time || '00:00:00'}
                </span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase font-mono bg-amber-400 text-slate-950 shadow-md">
                {period}
              </span>

              <span className="text-sky-400 font-bold text-xs">|</span>

              <span className="font-bold whitespace-nowrap text-[11px] sm:text-xs text-slate-100 font-mono">
                {dateStr || 'Loading date...'}
              </span>
            </div>
          </div>

        </div>

        {/* Main Headline & GZ Emblem Showcase */}
        <div className="relative z-10 my-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 w-full">
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] whitespace-normal sm:whitespace-nowrap">
              Gen Z Interactive Simulations Portal
            </h1>
            <p className="mt-2 text-sm sm:text-base font-black text-sky-300 tracking-wide flex items-center gap-2 drop-shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block shrink-0" />
              <span>Professional Multidisciplinary STEM Learning Portal</span>
            </p>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-200 max-w-3xl leading-relaxed font-normal">
              Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, celestial mechanics, mathematics, computer science, linguistics, and early childhood care &amp; education (ECCE). Switch seamlessly across all {allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.
            </p>

            {/* High-Contrast Action Buttons */}
            <div className="relative z-10 mt-6 flex items-center gap-4 flex-wrap">
              <a
                href="#catalog"
                className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-blue-500 text-white font-black px-6 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xl border-2 border-sky-200 transition-all transform active:scale-95"
              >
                <Layers className="w-4 h-4 text-white pointer-events-none" />
                <span>Explore All Labs Grid</span>
              </a>
              <a
                href="#stage"
                className="bg-slate-900 hover:bg-amber-400 text-amber-300 hover:text-slate-950 px-6 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-xl border-2 border-amber-400 transition-all transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-amber-400 group-hover:fill-slate-950 text-amber-400 pointer-events-none" />
                <span>Interactive Stage &amp; Dedicated Tabs</span>
              </a>
            </div>
          </div>

          {/* Official GZ Monogram Emblem on Solid Luminous Frame */}
          <div className="shrink-0 flex items-center justify-center my-2 md:my-0 self-center">
            <div 
              className="relative p-2 flex items-center justify-center transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden border-2 border-sky-400/90 bg-[#240854] shadow-[0_16px_36px_-6px_rgba(0,0,0,0.8),0_0_24px_rgba(56,189,248,0.35)] w-[240px] sm:w-[280px] md:w-[320px] h-[90px] sm:h-[105px] md:h-[115px]"
              style={{
                borderRadius: '16px',
              }}
              title="Gen Z Interactive Simulations Official Monogram"
            >
              <img 
                src="/genz-official-logo.png" 
                alt="Gen Z Interactive Simulations Official Monogram Logo" 
                className="w-full h-full object-contain block select-none pointer-events-none"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        {/* Continuous Right-to-Left Live Bulletin Ticker with Solid High-Contrast Styling */}
        <div 
          className="group/ticker relative z-10 mt-6 text-xs flex items-center overflow-hidden rounded-2xl border-2 border-sky-400/60 bg-slate-950 shadow-2xl"
          title="Live STEM Bulletin — Hover to pause scrolling, click any lab to open"
        >
          {/* Fixed Left Badge: Live STEM Bulletin */}
          <div 
            className="shrink-0 z-20 px-4 py-3 flex items-center gap-2 font-black uppercase tracking-wider text-[11px] text-white shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%)'
            }}
          >
            <Radio className="w-4 h-4 animate-pulse text-amber-300 pointer-events-none" />
            <span className="whitespace-nowrap font-heading">LIVE STEM BULLETIN</span>
            <span className="hidden lg:inline text-[9px] font-normal tracking-normal text-sky-100 opacity-90">(HOVER PAUSES)</span>
          </div>

          {/* Endless Seamless Marquee Viewport */}
          <div className="flex-1 overflow-hidden relative py-3 cursor-pointer bg-slate-950">
            <div className="animate-marquee-infinite flex items-center">
              
              <div className="flex items-center shrink-0">
                {allSimulationTopics.map((sim) => (
                  <a 
                    key={`sim-ticker-1-${sim.id}`} 
                    href={getSimulationStandaloneUrl(sim)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center shrink-0 mr-8 hover:text-cyan-300 transition-colors text-slate-100 no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black mr-2 text-white font-mono shadow-md border border-white/30"
                      style={{ backgroundColor: sim.accentColor }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-black text-white mr-1.5 font-heading text-xs drop-shadow-xs">
                      {sim.title}
                    </span>
                    <span className="text-sky-200 text-[11px] font-medium mr-2">
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
                    className="flex items-center shrink-0 mr-8 hover:text-cyan-300 transition-colors text-slate-100 no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black mr-2 text-white font-mono shadow-md border border-white/30"
                      style={{ backgroundColor: sim.accentColor }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-black text-white mr-1.5 font-heading text-xs drop-shadow-xs">
                      {sim.title}
                    </span>
                    <span className="text-sky-200 text-[11px] font-medium mr-2">
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

      {/* 2-Second Rotating Showcase Item at Bottom with Solid High-Contrast Styling */}
      {currentSim && (
        <div 
          className="w-full h-18 sm:h-20 rounded-2xl overflow-hidden shadow-xl relative select-none border-2 border-sky-400/60 bg-slate-900"
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

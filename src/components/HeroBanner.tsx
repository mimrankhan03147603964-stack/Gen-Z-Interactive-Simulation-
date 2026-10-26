import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Layers, Play, Pause, Radio, Star, Rocket } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';
import { getDisciplineColor } from '../data/simTheme';

interface HeroBannerProps {
  activeSim?: SimulationItem | null;
  isDarkMode?: boolean;
  onSelectSim?: (sim: SimulationItem) => void;
  onExploreLabs?: () => void;
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

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectSim, onExploreLabs }) => {
  const [time, setTime] = useState<string>('');
  const [period, setPeriod] = useState<string>('PM');
  const [dateStr, setDateStr] = useState<string>('');

  // 2-Second Interval Timer & Fluid Right-to-Left Slide Rotator State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState<boolean>(false);
  const [isTickerPaused, setIsTickerPaused] = useState<boolean>(false);

  // 100% of available simulation topics currently in the system library (86 verified labs)
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
          {/* Simulation Vector Icon Badge on Solid High-Contrast Pedestal */}
          <div 
            onClick={() => handleLaunchShowcase(sim)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 p-1 cursor-pointer transition-transform hover:scale-110 bg-slate-900 border border-slate-700 shadow-sm"
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
            className="font-mono text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-lg shrink-0 text-white bg-slate-900 border border-slate-700 shadow-sm"
          >
            LAB {sim.indexNumber}
          </span>

          {/* Category Badge */}
          <span 
            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-lg shrink-0 text-slate-200 bg-slate-900 border border-slate-700 hidden md:inline-block shadow-2xs"
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
        className="relative w-full overflow-hidden p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-700/80 text-white shadow-[0_24px_50px_-10px_rgba(2,28,77,0.55),0_10px_25px_-5px_rgba(0,0,0,0.35)]"
        style={{
          background: 'linear-gradient(135deg, #071530 0%, #0c2352 40%, #0e3070 75%, #081a3d 100%)'
        }}
      >

        {/* Top Row: Left Pill Badges + Right Futuristic Cockpit Clock Widget */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 relative z-10">
          
          {/* Left Pill Chip with Curriculum Alignment Tag */}
          <div className="flex items-center gap-2 flex-wrap">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-slate-900/90 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-300 pointer-events-none shrink-0 fill-amber-300/20" />
              <span className="font-heading font-bold text-xs sm:text-sm tracking-wide text-amber-200">
                GEN Z INTERACTIVE SIMULATIONS PORTAL
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-400/15 text-amber-300 border border-amber-400/30">
                4K 3D
              </span>
            </div>

            <span 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold border border-slate-700 bg-slate-900/90 text-slate-200 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
            </span>
          </div>

          {/* Right Area: Digital Clock Widget */}
          <div className="flex items-center gap-2 flex-wrap ml-auto sm:ml-0">
            <div 
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-slate-700 bg-slate-900/90 shadow-md text-white"
            >
              <div className="flex items-center gap-1.5 font-mono font-bold text-xs sm:text-sm text-sky-300">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 pointer-events-none" />
                <span className="font-mono text-sky-200 tracking-wider text-sm sm:text-base font-bold">
                  {time || '00:00:00'}
                </span>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {period}
              </span>

              <span className="text-slate-600 font-bold text-xs">|</span>

              <span className="font-medium whitespace-nowrap text-[11px] sm:text-xs text-slate-300 font-mono">
                {dateStr || 'Loading date...'}
              </span>
            </div>
          </div>

        </div>

        {/* Main Headline & GZ Emblem Showcase */}
        <div className="relative z-10 my-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 w-full">
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] break-words">
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
              <button
                type="button"
                onClick={() => {
                  if (onExploreLabs) {
                    onExploreLabs();
                  } else {
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md border border-blue-400/40 transition-all transform active:scale-95"
              >
                <Layers className="w-4 h-4 text-white pointer-events-none" />
                <span>Explore All Labs Grid</span>
              </button>
              <a
                href="#stage"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md border border-slate-600 transition-all transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-amber-400 text-amber-400 pointer-events-none" />
                <span>Interactive Stage &amp; Dedicated Tabs</span>
              </a>
            </div>
          </div>

          {/* Official GZ Monogram Emblem - Transparent directly on Hero Background */}
          <div className="shrink-0 flex items-center justify-center my-2 md:my-0 self-center bg-transparent p-0 m-0 border-0 shadow-none">
            <img 
              src="/genz-logo-transparent.png?v=3" 
              alt="Gen Z Interactive Simulations Official Monogram Logo" 
              className="block select-none pointer-events-none transition-transform duration-300 hover:scale-105 max-h-[75px] sm:max-h-[90px] md:max-h-[105px] w-auto object-contain"
              style={{ display: 'block', background: 'transparent' }}
            />
          </div>
        </div>

        {/* Continuous Right-to-Left Live Bulletin Ticker with Solid High-Contrast Styling & Ultra-Calm Speed */}
        <div 
          className={`group/ticker relative z-10 mt-6 text-xs flex items-center overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 shadow-xl ${isTickerPaused ? 'is-ticker-paused' : ''}`}
          title="Live STEM Bulletin — Hover to pause scrolling, click any lab to open"
        >
          {/* Fixed Left Badge: Live STEM Bulletin with Pause/Play toggle */}
          <div 
            onClick={() => setIsTickerPaused(!isTickerPaused)}
            className="shrink-0 z-20 px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] text-white shadow-md cursor-pointer select-none transition-all hover:brightness-110 active:scale-98"
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)'
            }}
            title={isTickerPaused ? 'Click to resume scrolling' : 'Click to pause scrolling'}
          >
            <Radio className="w-4 h-4 animate-pulse text-amber-300 pointer-events-none" />
            <span className="whitespace-nowrap font-heading">LIVE STEM BULLETIN</span>
            <button 
              type="button" 
              className="ml-1 px-1.5 py-0.5 rounded-md bg-black/40 text-[9px] font-mono text-cyan-200 border border-white/20 flex items-center gap-1"
            >
              {isTickerPaused ? (
                <>
                  <Play className="w-2.5 h-2.5 fill-current text-emerald-400" />
                  <span>PAUSED</span>
                </>
              ) : (
                <>
                  <Pause className="w-2.5 h-2.5 fill-current text-amber-300" />
                  <span className="hidden sm:inline">SLOW</span>
                </>
              )}
            </button>
          </div>

          {/* Endless Seamless Marquee Viewport with Calm Readability */}
          <div className="flex-1 overflow-hidden relative py-3 cursor-pointer bg-slate-950">
            <div 
              className="animate-marquee-infinite flex items-center"
              style={{
                animationPlayState: isTickerPaused ? 'paused' : undefined
              }}
            >
              
              <div className="flex items-center shrink-0">
                {allSimulationTopics.map((sim) => (
                  <a 
                    key={`sim-ticker-1-${sim.id}`} 
                    href={getSimulationStandaloneUrl(sim)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center shrink-0 mr-10 hover:text-cyan-300 transition-colors text-white no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-black mr-2.5 text-white font-mono shadow-xs border border-white/40 tracking-wider"
                      style={{ backgroundColor: sim.accentColor || '#0284c7' }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-black text-white mr-2 text-xs sm:text-sm font-sans tracking-tight">
                      {sim.title}
                    </span>
                    <span className="text-amber-300 text-xs font-bold mr-2">
                      ({sim.category})
                    </span>
                    <span className="text-slate-100 text-xs font-semibold mr-3">
                      &mdash; {sim.description}
                    </span>
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 inline-block mx-2 shrink-0 pointer-events-none" />
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
                    className="flex items-center shrink-0 mr-10 hover:text-cyan-300 transition-colors text-white no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-black mr-2.5 text-white font-mono shadow-xs border border-white/40 tracking-wider"
                      style={{ backgroundColor: sim.accentColor || '#0284c7' }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-black text-white mr-2 text-xs sm:text-sm font-sans tracking-tight">
                      {sim.title}
                    </span>
                    <span className="text-amber-300 text-xs font-bold mr-2">
                      ({sim.category})
                    </span>
                    <span className="text-slate-100 text-xs font-semibold mr-3">
                      &mdash; {sim.description}
                    </span>
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 inline-block mx-2 shrink-0 pointer-events-none" />
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
          className="w-full h-18 sm:h-20 rounded-2xl overflow-hidden shadow-lg relative select-none border border-slate-700/80 bg-slate-900"
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

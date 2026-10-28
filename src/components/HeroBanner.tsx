import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Layers, Play, Pause, Radio, Star, Rocket } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';
import { getDisciplineColor } from '../data/simTheme';
import { getThemeForIndex } from '../data/sequentialPalette';

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
    const parsedIndex = parseInt(String(sim.indexNumber), 10) || 1;
    const theme = getThemeForIndex((parsedIndex - 1) % 7);

    return (
      <div 
        className="w-full h-full flex items-center justify-between px-3 sm:px-6 gap-3 select-none relative overflow-hidden transition-colors"
        style={{
          backgroundColor: theme.bg
        }}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1 relative z-10">
          {/* Simulation Vector Icon Badge on Solid High-Contrast Pedestal */}
          <div 
            onClick={() => handleLaunchShowcase(sim)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 p-1 cursor-pointer transition-transform hover:scale-110 shadow-sm border"
            style={{
              backgroundColor: theme.pedestalBg,
              borderColor: theme.pedestalBorder
            }}
            title={`Open ${cleanTitle} simulation in new tab`}
          >
            <TopicRealisticIcon 
              indexNumber={sim.indexNumber} 
              simId={sim.id} 
              className="w-8 h-8 sm:w-9 sm:h-9" 
            />
          </div>

          {/* Lab Number Tag */}
          <span 
            className="font-mono text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-lg shrink-0 border shadow-sm"
            style={{
              backgroundColor: theme.badgeBg,
              borderColor: theme.badgeBorder,
              color: theme.badgeText
            }}
          >
            LAB {sim.indexNumber}
          </span>

          {/* Category Badge */}
          <span 
            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-lg shrink-0 hidden md:inline-block shadow-2xs border"
            style={{
              backgroundColor: theme.tagBg,
              borderColor: theme.tagBorder,
              color: theme.tagText
            }}
          >
            {sim.category}
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
            className="text-xs sm:text-sm md:text-base font-black truncate hover:underline transition-colors"
            style={{ color: theme.titleColor }}
            title={`Open ${cleanTitle} in new tab`}
          >
            {cleanTitle}
          </a>
        </div>

        {/* Right Direct "Launch Lab" Button with matching palette style */}
        <a
          href={getSimulationStandaloneUrl(sim)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            handleLaunchShowcase(sim);
          }}
          className="relative z-10 shrink-0 ml-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-xl transition-all whitespace-nowrap flex items-center gap-1.5 border cursor-pointer active:scale-95"
          style={{
            backgroundColor: theme.btnBg,
            borderColor: theme.btnBorder,
            color: theme.btnText,
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.35)'
          }}
          title={`Launch ${cleanTitle} simulation now`}
        >
          <span style={{ color: theme.btnText }}>Launch Lab</span>
          <Rocket className="w-3.5 h-3.5 shrink-0 pointer-events-none" style={{ color: theme.btnText }} />
        </a>
      </div>
    );
  };

  return (
    <div className="relative group w-full space-y-4">
      
      {/* Main Modern Educational Hero Card with Rich Midnight Navy Solid Card Background & Slate Ocean Border */}
      <div 
        className="relative w-full overflow-hidden p-6 sm:p-8 md:p-10 rounded-3xl text-white shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #1B2A5C 0%, #1546A8 100%)',
          backgroundColor: '#1B2A5C',
          border: '1.5px solid #F5A623',
          boxShadow: '0 12px 36px rgba(27, 42, 92, 0.45)'
        }}
      >

        {/* Top Row: Left Pill Badges + Right Digital Clock Widget */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 relative z-10">
          
          {/* Left Pill Chip with Curriculum Alignment Tag */}
          <div className="flex items-center gap-2 flex-wrap">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm"
              style={{
                backgroundColor: '#F5A623',
                borderColor: '#E58E0A',
                color: '#1B2A5C'
              }}
            >
              <Sparkles className="w-4 h-4 text-[#1B2A5C] pointer-events-none shrink-0" />
              <span className="font-heading font-bold text-xs sm:text-sm tracking-wide text-[#1B2A5C]">
                GEN Z INTERACTIVE SIMULATIONS PORTAL
              </span>
              <span 
                className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono"
                style={{
                  backgroundColor: '#1B2A5C',
                  color: '#FFFFFF'
                }}
              >
                4K 3D
              </span>
            </div>

            <span 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold border shadow-sm"
              style={{
                backgroundColor: '#1546A8',
                borderColor: 'rgba(221, 229, 243, 0.3)',
                color: '#DBE4F7'
              }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#F5A623' }} />
              <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
            </span>
          </div>

          {/* Right Area: Digital Futuristic Split-Flip Clock & Date Display */}
          <div className="fx-clock-root flex flex-col items-end gap-1.5 ml-auto sm:ml-0 shrink-0 select-none">
            {/* Scoped Keyframes for Digit Tick & Colon Blink */}
            <style>{`
              @keyframes fx-digit-tick {
                0% {
                  transform: translateY(-5px);
                  filter: brightness(1.75);
                }
                100% {
                  transform: translateY(0);
                  filter: brightness(1);
                }
              }
              @keyframes fx-colon-blink {
                0%, 100% {
                  opacity: 1;
                  box-shadow: 0 0 8px #38bdf8;
                }
                50% {
                  opacity: 0.2;
                  box-shadow: 0 0 2px #38bdf8;
                }
              }
              .fx-tick-anim {
                animation: fx-digit-tick 0.22s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
              }
              .fx-colon-dot {
                animation: fx-colon-blink 1s ease-in-out infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .fx-tick-anim {
                  animation: none !important;
                }
                .fx-colon-dot {
                  animation: none !important;
                  opacity: 1 !important;
                }
              }
            `}</style>

            {/* Digits Row: [H][H] : [M][M] : [S][S] [AM/PM] */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Hours Group */}
              <div className="flex items-center gap-1">
                {[time.split(':')[0]?.[0] || '1', time.split(':')[0]?.[1] || '2'].map((digit, idx) => (
                  <div
                    key={`h-${idx}`}
                    className="relative flex items-center justify-center w-[40px] h-[56px] rounded-lg overflow-hidden border shadow-sm"
                    style={{
                      background: 'linear-gradient(180deg, #0b1e3b 0%, #051022 100%)',
                      borderColor: 'rgba(56, 189, 248, 0.45)',
                      boxShadow: '0 0 10px rgba(56, 189, 248, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {/* Horizontal Split Line */}
                    <div
                      className="absolute left-0 right-0 top-1/2 pointer-events-none z-10"
                      style={{
                        height: '1px',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                      }}
                    />
                    {/* Subtle Top Specular Shine */}
                    <div
                      className="absolute inset-x-0 top-0 h-[48%] pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
                      }}
                    />
                    {/* Digit with Orbitron Font, Cyan Glow & Tick Animation */}
                    <span
                      key={digit}
                      className="fx-tick-anim relative z-0 font-bold text-[26px] leading-none"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        color: '#FFFFFF',
                        textShadow: '0 0 10px rgba(56, 189, 248, 0.85), 0 0 20px rgba(56, 189, 248, 0.45)',
                      }}
                    >
                      {digit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Colon 1 */}
              <div className="flex flex-col items-center justify-center gap-1.5 px-0.5">
                <span className="fx-colon-dot w-1.5 h-1.5 rounded-[1px] bg-[#38BDF8]" />
                <span className="fx-colon-dot w-1.5 h-1.5 rounded-[1px] bg-[#38BDF8]" />
              </div>

              {/* Minutes Group */}
              <div className="flex items-center gap-1">
                {[time.split(':')[1]?.[0] || '0', time.split(':')[1]?.[1] || '0'].map((digit, idx) => (
                  <div
                    key={`m-${idx}`}
                    className="relative flex items-center justify-center w-[40px] h-[56px] rounded-lg overflow-hidden border shadow-sm"
                    style={{
                      background: 'linear-gradient(180deg, #0b1e3b 0%, #051022 100%)',
                      borderColor: 'rgba(56, 189, 248, 0.45)',
                      boxShadow: '0 0 10px rgba(56, 189, 248, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {/* Horizontal Split Line */}
                    <div
                      className="absolute left-0 right-0 top-1/2 pointer-events-none z-10"
                      style={{
                        height: '1px',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                      }}
                    />
                    {/* Subtle Top Specular Shine */}
                    <div
                      className="absolute inset-x-0 top-0 h-[48%] pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
                      }}
                    />
                    {/* Digit with Orbitron Font, Cyan Glow & Tick Animation */}
                    <span
                      key={digit}
                      className="fx-tick-anim relative z-0 font-bold text-[26px] leading-none"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        color: '#FFFFFF',
                        textShadow: '0 0 10px rgba(56, 189, 248, 0.85), 0 0 20px rgba(56, 189, 248, 0.45)',
                      }}
                    >
                      {digit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Colon 2 */}
              <div className="flex flex-col items-center justify-center gap-1.5 px-0.5">
                <span className="fx-colon-dot w-1.5 h-1.5 rounded-[1px] bg-[#38BDF8]" />
                <span className="fx-colon-dot w-1.5 h-1.5 rounded-[1px] bg-[#38BDF8]" />
              </div>

              {/* Seconds Group (Clearly LARGER boxes, heavier digits, Amber glow & border) */}
              <div className="flex items-center gap-1">
                {[time.split(':')[2]?.[0] || '0', time.split(':')[2]?.[1] || '0'].map((digit, idx) => (
                  <div
                    key={`s-${idx}`}
                    className="relative flex items-center justify-center w-[50px] h-[68px] rounded-lg overflow-hidden border shadow-md"
                    style={{
                      background: 'linear-gradient(180deg, #162644 0%, #061124 100%)',
                      borderColor: '#F5A623',
                      boxShadow: '0 0 16px rgba(245, 166, 35, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    {/* Horizontal Split Line */}
                    <div
                      className="absolute left-0 right-0 top-1/2 pointer-events-none z-10"
                      style={{
                        height: '1px',
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        borderBottom: '1px solid rgba(245, 166, 35, 0.25)',
                      }}
                    />
                    {/* Subtle Top Specular Shine */}
                    <div
                      className="absolute inset-x-0 top-0 h-[48%] pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(245, 166, 35, 0.12) 0%, rgba(245, 166, 35, 0) 100%)',
                      }}
                    />
                    {/* Digit with Orbitron Font, Amber Glow & Tick Animation */}
                    <span
                      key={digit}
                      className="fx-tick-anim relative z-0 font-black text-[34px] leading-none"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        color: '#FFFBEB',
                        textShadow: '0 0 12px rgba(245, 166, 35, 0.95), 0 0 24px rgba(245, 166, 35, 0.55)',
                      }}
                    >
                      {digit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stacked AM/PM Badges */}
              <div className="flex flex-col gap-1 pl-1">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider transition-all"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    backgroundColor: period === 'AM' ? '#F5A623' : 'rgba(11, 30, 59, 0.6)',
                    color: period === 'AM' ? '#0F172A' : 'rgba(186, 230, 253, 0.35)',
                    border: period === 'AM' ? '1px solid #E58E0A' : '1px solid rgba(56, 189, 248, 0.2)',
                    boxShadow: period === 'AM' ? '0 0 10px rgba(245, 166, 35, 0.6)' : 'none',
                  }}
                >
                  AM
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider transition-all"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    backgroundColor: period === 'PM' ? '#F5A623' : 'rgba(11, 30, 59, 0.6)',
                    color: period === 'PM' ? '#0F172A' : 'rgba(186, 230, 253, 0.35)',
                    border: period === 'PM' ? '1px solid #E58E0A' : '1px solid rgba(56, 189, 248, 0.2)',
                    boxShadow: period === 'PM' ? '0 0 10px rgba(245, 166, 35, 0.6)' : 'none',
                  }}
                >
                  PM
                </span>
              </div>
            </div>

            {/* Date Display Box Below Digits */}
            <div
              className="flex items-center justify-center w-full px-3 py-1 rounded-md border"
              style={{
                background: 'linear-gradient(180deg, rgba(11, 30, 59, 0.75) 0%, rgba(5, 16, 34, 0.85) 100%)',
                borderColor: 'rgba(56, 189, 248, 0.3)',
                boxShadow: '0 0 8px rgba(56, 189, 248, 0.15)',
              }}
            >
              <span
                className="font-semibold text-xs sm:text-[13px] tracking-wider"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: '#BAE6FD',
                  letterSpacing: '0.06em',
                }}
              >
                {dateStr || 'Loading date...'}
              </span>
            </div>
          </div>

        </div>

        {/* Main Headline & GZ Emblem Showcase */}
        <div className="relative z-10 my-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 w-full">
          <div className="flex-1 min-w-0">
            <h1 
              className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight break-words text-white"
            >
              Gen Z Interactive Simulations Portal
            </h1>
            <p className="mt-2 text-sm sm:text-base font-black tracking-wide flex items-center gap-2" style={{ color: '#F5A623' }}>
              <span className="w-2.5 h-2.5 rounded-full animate-ping inline-block shrink-0" style={{ backgroundColor: '#F5A623' }} />
              <span>Professional Multidisciplinary STEM Learning Portal</span>
            </p>
            <p className="mt-3 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed font-normal" style={{ color: '#EEF3F9' }}>
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
                className="font-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all transform active:scale-95"
                style={{
                  backgroundColor: '#F5A623',
                  color: '#1B2A5C',
                  border: '1px solid #E58E0A'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E58E0A')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5A623')}
              >
                <Layers className="w-4 h-4 pointer-events-none text-[#1B2A5C]" />
                <span className="text-[#1B2A5C]">Explore All Labs Grid</span>
              </button>
              <a
                href="#stage"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all transform active:scale-95"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: '1px solid #42A5F5'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#42A5F5';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <Play className="w-4 h-4 pointer-events-none text-white fill-white" />
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

        {/* Continuous Right-to-Left Live Bulletin Ticker */}
        <div 
          className={`group/ticker relative z-10 mt-6 text-xs flex items-center overflow-hidden rounded-2xl border shadow-lg ${isTickerPaused ? 'is-ticker-paused' : ''}`}
          style={{
            backgroundColor: '#1546A8',
            borderColor: '#F5A623'
          }}
          title="Live STEM Bulletin — Hover to pause scrolling, click any lab to open"
        >
          {/* Fixed Left Badge: Live STEM Bulletin with Pause/Play toggle */}
          <div 
            onClick={() => setIsTickerPaused(!isTickerPaused)}
            className="shrink-0 z-20 px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] text-[#1B2A5C] shadow-xs cursor-pointer select-none transition-all hover:brightness-110 active:scale-98"
            style={{
              backgroundColor: '#F5A623'
            }}
            title={isTickerPaused ? 'Click to resume scrolling' : 'Click to pause scrolling'}
          >
            <Radio className="w-4 h-4 animate-pulse pointer-events-none text-[#1B2A5C]" />
            <span className="whitespace-nowrap font-heading text-[#1B2A5C]">LIVE STEM BULLETIN</span>
            <button 
              type="button" 
              className="ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-mono flex items-center gap-1"
              style={{
                backgroundColor: 'rgba(27, 42, 92, 0.2)',
                color: '#1B2A5C',
                border: '1px solid rgba(27, 42, 92, 0.4)'
              }}
            >
              {isTickerPaused ? (
                <>
                  <Play className="w-2.5 h-2.5 fill-current text-[#1B2A5C]" />
                  <span>PAUSED</span>
                </>
              ) : (
                <>
                  <Pause className="w-2.5 h-2.5 fill-current text-[#1B2A5C]" />
                  <span className="hidden sm:inline">SLOW</span>
                </>
              )}
            </button>
          </div>

          {/* Endless Seamless Marquee Viewport with Calm Readability */}
          <div className="flex-1 overflow-hidden relative py-3 cursor-pointer" style={{ backgroundColor: '#1546A8' }}>
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
                    className="flex items-center shrink-0 mr-10 hover:text-[#F5A623] transition-colors no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-black mr-2.5 text-white font-mono shadow-xs border border-white/40 tracking-wider"
                      style={{ backgroundColor: '#1E88E5' }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-black mr-2 text-xs sm:text-sm font-sans tracking-tight text-white">
                      {sim.title}
                    </span>
                    <span className="text-xs font-bold mr-2 text-[#F5A623]">
                      ({sim.category})
                    </span>
                    <span className="text-xs font-semibold mr-3 text-[#DBE4F7]">
                      &mdash; {sim.description}
                    </span>
                    <Star className="w-3.5 h-3.5 inline-block mx-2 shrink-0 pointer-events-none text-[#F5A623] fill-[#F5A623]" />
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
                    className="flex items-center shrink-0 mr-10 hover:text-[#60A5FA] transition-colors no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-black mr-2.5 text-white font-mono shadow-xs border border-white/40 tracking-wider"
                      style={{ backgroundColor: sim.accentColor || '#2563EB' }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-black mr-2 text-xs sm:text-sm font-sans tracking-tight text-white">
                      {sim.title}
                    </span>
                    <span className="text-xs font-bold mr-2" style={{ color: '#60A5FA' }}>
                      ({sim.category})
                    </span>
                    <span className="text-xs font-semibold mr-3" style={{ color: '#CBD5E1' }}>
                      &mdash; {sim.description}
                    </span>
                    <Star className="w-3.5 h-3.5 inline-block mx-2 shrink-0 pointer-events-none" style={{ color: '#60A5FA', fill: '#60A5FA' }} />
                  </a>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 2-Second Rotating Showcase Item at Bottom with Solid Educational Card Styling */}
      {currentSim && (
        <div 
          className="w-full h-18 sm:h-20 rounded-2xl overflow-hidden shadow-lg relative select-none"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #DDE5F3',
            boxShadow: '0 8px 24px rgba(27, 42, 92, 0.16)'
          }}
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

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Sparkles, Layers, Play, Pause, Radio, Star, Rocket } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';
import { getDisciplineColor } from '../data/simTheme';
import { getThemeForIndex } from '../data/sequentialPalette';
import sliderImg1 from '../assets/hero-slider-1.jpg';
import sliderImg2 from '../assets/hero-slider-2.jpg';
import sliderImg3 from '../assets/hero-slider-3.jpg';
import sliderImg4 from '../assets/hero-slider-4.jpg';
import sliderImg5 from '../assets/hero-slider-5.jpg';
import sliderImg6 from '../assets/hero-slider-6.jpg';
import sliderImg7 from '../assets/hero-slider-7.jpg';
import sliderImg8 from '../assets/hero-slider-8.jpg';
import sliderImg9 from '../assets/hero-slider-9.jpg';

const HERO_SLIDESHOW_IMAGES = [
  sliderImg1,
  sliderImg2,
  sliderImg3,
  sliderImg4,
  sliderImg5,
  sliderImg6,
  sliderImg7,
  sliderImg8,
  sliderImg9
];

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

  // Hero Background Continuous 9-Picture Slideshow State (5.5s timer, 1.5s cross-fade)
  const [bgSlideIndex, setBgSlideIndex] = useState<number>(0);

  // 2-Second Interval Timer & Fluid Right-to-Left Slide Rotator State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState<boolean>(false);

  // Bulletin Strip Marquee calculation: brisk, comfortable readability (~95 pixels per second)
  const tickerGroupRef = useRef<HTMLDivElement>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [tickerDuration, setTickerDuration] = useState<number>(260);

  useEffect(() => {
    const updateTickerDuration = () => {
      if (tickerGroupRef.current) {
        const width = tickerGroupRef.current.offsetWidth || tickerGroupRef.current.scrollWidth;
        if (width > 0) {
          // Base speed: 95 pixels per second (clearly moving, engaging, easy to read)
          const targetPxPerSec = 95 * speedMultiplier;
          const durationSec = Math.max(25, Math.round(width / targetPxPerSec));
          setTickerDuration(durationSec);
        }
      }
    };

    updateTickerDuration();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && tickerGroupRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateTickerDuration();
      });
      resizeObserver.observe(tickerGroupRef.current);
    }

    window.addEventListener('resize', updateTickerDuration);
    const timer = setTimeout(updateTickerDuration, 200);

    return () => {
      window.removeEventListener('resize', updateTickerDuration);
      clearTimeout(timer);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [speedMultiplier]);

  // 100% of available simulation topics currently in the system library
  const allSimulationTopics = SIMULATIONS_LIST;

  // Typewriter rotation subjects showcasing the rich multidisciplinary STEM breadth
  const stemRotations = React.useMemo(() => [
    {
      subject: 'STEM Disciplines',
      color: '#F5A623',
      description: `Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, celestial mechanics, mathematics, computer science, linguistics, and early childhood care & education (ECCE). Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Physics & Motion Mechanics',
      color: '#38BDF8',
      description: `Explore authentic interactive STEM laboratories across Newton's laws of motion, kinematics, DC motor commutators, wave optics, Hooke's law, and momentum. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Chemistry & Molecular Reactions',
      color: '#34D399',
      description: `Explore authentic interactive STEM laboratories across chemical bonding, periodic table trends, acids, bases & pH titration, Charles's gas laws, and atomic models. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Biology & Cellular Life Sciences',
      color: '#4ADE80',
      description: `Explore authentic interactive STEM laboratories across DNA genetics, human heart circulation, pulmonary breathing mechanisms, kidney nephrons, and photosynthesis. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Mathematics & Geometric Logic',
      color: '#F43F5E',
      description: `Explore authentic interactive STEM laboratories across algebra equation balancing, interactive geometry, unit circle trigonometry, and Pythagorean proofs. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Computer Science & Logic Circuits',
      color: '#818CF8',
      description: `Explore authentic interactive STEM laboratories across logic gates, binary circuits, sorting algorithm visualizers, computer hardware architectures, and digital systems. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Earth, Astronomy & Space Mechanics',
      color: '#FBBF24',
      description: `Explore authentic interactive STEM laboratories across solar system planetary orbits, Kepler's laws, lunar & solar eclipses, plate tectonics, and moon phases. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'English & Grammar Syntax Labs',
      color: '#60A5FA',
      description: `Explore authentic interactive STEM laboratories across Cambridge scholar parts of speech, syntax tree grammar, active-passive voice, and 3D prepositions. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Urdu & Linguistics (اجزائے کلام)',
      color: '#2DD4BF',
      description: `Explore authentic interactive STEM laboratories across Haroof-e-Tahajji sound lab, Ajza-e-Kalam, Sifat ki Aqsam, and comprehensive Urdu grammar modules. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Early Childhood Care & Education (ECCE)',
      color: '#FB7185',
      description: `Explore authentic interactive STEM laboratories across ECCE curriculum learning areas, ABC real 3D objects, phonics soundboards, and playful shape builders. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Electricity, Magnetism & DC Motors',
      color: '#FCD34D',
      description: `Explore authentic interactive STEM laboratories across Ohm's law, DC motor commutators, AC generators, electromagnetic induction, and interactive circuits. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Nuclear Physics & Quantum Models',
      color: '#C084FC',
      description: `Explore authentic interactive STEM laboratories across nuclear fission and fusion, half-life radioactive decay, and Rutherford-Bohr atomic models. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Thermal Physics & States of Matter',
      color: '#FB923C',
      description: `Explore authentic interactive STEM laboratories across ice to water to steam phase transitions, conduction, convection, and ideal gas laws. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    },
    {
      subject: 'Genetics, DNA & Molecular Biotechnology',
      color: '#38BDF8',
      description: `Explore authentic interactive STEM laboratories across DNA double helix structures, Punnett square inheritance, cell division, and microscopic organisms. Switch seamlessly across all ${allSimulationTopics.length} modules with single-click direct execution in 4K high fidelity.`
    }
  ], [allSimulationTopics.length]);

  // Typewriter state for "Professional Multidisciplinary [Subject] Learning Portal" and paragraph description below it
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [typedSubject, setTypedSubject] = useState<string>('');
  const [typedDesc, setTypedDesc] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const currentSlide = stemRotations[slideIndex];
    const fullSubject = currentSlide.subject;
    const fullDesc = currentSlide.description;

    let timeout: ReturnType<typeof setTimeout>;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3500);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (typedSubject.length > 0 || typedDesc.length > 0) {
        timeout = setTimeout(() => {
          setTypedDesc((prev) => prev.slice(0, Math.max(0, prev.length - 4)));
          setTypedSubject((prev) => prev.slice(0, Math.max(0, prev.length - 1)));
        }, 12);
      } else {
        setIsDeleting(false);
        setSlideIndex((prev) => (prev + 1) % stemRotations.length);
      }
      return () => clearTimeout(timeout);
    }

    // Typing phase
    const subjectDone = typedSubject.length >= fullSubject.length;
    const descDone = typedDesc.length >= fullDesc.length;

    if (subjectDone && descDone) {
      setIsPaused(true);
      return;
    }

    timeout = setTimeout(() => {
      if (!subjectDone) {
        setTypedSubject(fullSubject.slice(0, typedSubject.length + 1));
      }
      if (!descDone) {
        setTypedDesc(fullDesc.slice(0, Math.min(fullDesc.length, typedDesc.length + 2)));
      }
    }, 18);

    return () => clearTimeout(timeout);
  }, [slideIndex, typedSubject, typedDesc, isDeleting, isPaused, stemRotations]);

  // Preload all background slideshow images for instant, flicker-free cross-fading
  useEffect(() => {
    HERO_SLIDESHOW_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Continuous Automatic Slideshow: changes photo every 5.5 seconds, never stops
  useEffect(() => {
    const interval = setInterval(() => {
      setBgSlideIndex((prev) => (prev + 1) % HERO_SLIDESHOW_IMAGES.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

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
      
      {/* Main Modern Educational Hero Card with Continuous Photographic Background Slider (Full Screen Width Edge-to-Edge) */}
      <div 
        className="relative w-full overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-10 rounded-none text-white shadow-xl"
        style={{
          borderTop: '1.5px solid #F5A623',
          borderBottom: '1.5px solid #F5A623',
          boxShadow: '0 12px 36px rgba(10, 20, 50, 0.45)',
          backgroundColor: '#0A1428'
        }}
      >
        {/* Continuous Automatic Background Slideshow with 1.5s Smooth Cross-Fade */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {HERO_SLIDESHOW_IMAGES.map((src, idx) => {
            const isActive = idx === bgSlideIndex;
            return (
              <div 
                key={`hero-bg-slide-${idx}`} 
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                style={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : 1,
                  transition: 'opacity 1500ms ease-in-out',
                  willChange: 'opacity'
                }}
              >
                <img 
                  src={src} 
                  alt={`Gen Z Interactive STEM Lab Slideshow Photo ${idx + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    opacity: 1,
                    filter: 'none'
                  }}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            );
          })}
        </div>

        {/* Top Row: Left Pill Badges + Right Digital Clock Widget */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 relative z-10">
          
          {/* Left Pill Chip with Curriculum Alignment Tag - Solid darker backgrounds for high legibility */}
          <div className="reveal-left flex items-center gap-2 flex-wrap">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-md"
              style={{
                backgroundColor: '#B45309',
                borderColor: '#F59E0B',
                color: '#FFFFFF'
              }}
            >
              <Sparkles className="w-4 h-4 text-[#FDE68A] pointer-events-none shrink-0" />
              <span 
                className="font-heading font-black text-xs sm:text-sm tracking-wide text-white"
                style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}
              >
                GEN Z INTERACTIVE SIMULATIONS PORTAL
              </span>
              <span 
                className="px-2 py-0.5 rounded-full text-[10px] font-black font-mono"
                style={{
                  backgroundColor: '#0F1E42',
                  border: '1px solid #F5A623',
                  color: '#FDE68A'
                }}
              >
                4K 3D
              </span>
            </div>

            <span 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold border shadow-md"
              style={{
                backgroundColor: '#0A2558',
                borderColor: '#38BDF8',
                color: '#FFFFFF',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#F5A623', boxShadow: '0 0 6px #F5A623' }} />
              <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
            </span>
          </div>

          {/* Right Area: Digital Futuristic Split-Flip Clock & Date Display (Standard Sleek Size) */}
          <div className="reveal-right fx-clock-root flex flex-col items-end gap-1 ml-auto sm:ml-0 shrink-0 select-none">
            {/* Scoped Keyframes for Digit Tick & Colon Blink */}
            <style>{`
              @keyframes fx-digit-tick {
                0% {
                  transform: translateY(-2px);
                  filter: brightness(1.4);
                }
                100% {
                  transform: translateY(0);
                  filter: brightness(1);
                }
              }
              @keyframes fx-colon-blink {
                0%, 100% {
                  opacity: 1;
                  box-shadow: 0 0 6px #38bdf8;
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
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Hours Group */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[time.split(':')[0]?.[0] || '1', time.split(':')[0]?.[1] || '2'].map((digit, idx) => (
                  <div
                    key={`h-${idx}`}
                    className="relative flex items-center justify-center w-[22px] sm:w-[24px] h-[30px] sm:h-[34px] rounded-md overflow-hidden border shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #0b1e3b 0%, #051022 100%)',
                      borderColor: 'rgba(56, 189, 248, 0.45)',
                      boxShadow: '0 0 6px rgba(56, 189, 248, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
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
                      className="fx-tick-anim relative z-0 font-bold text-[15px] sm:text-[17px] leading-none"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        color: '#FFFFFF',
                        textShadow: '0 0 8px rgba(56, 189, 248, 0.85)',
                      }}
                    >
                      {digit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Colon 1 */}
              <div className="flex flex-col items-center justify-center gap-1 px-0.5">
                <span className="fx-colon-dot w-1 h-1 rounded-[1px] bg-[#38BDF8]" />
                <span className="fx-colon-dot w-1 h-1 rounded-[1px] bg-[#38BDF8]" />
              </div>

              {/* Minutes Group */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[time.split(':')[1]?.[0] || '0', time.split(':')[1]?.[1] || '0'].map((digit, idx) => (
                  <div
                    key={`m-${idx}`}
                    className="relative flex items-center justify-center w-[22px] sm:w-[24px] h-[30px] sm:h-[34px] rounded-md overflow-hidden border shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #0b1e3b 0%, #051022 100%)',
                      borderColor: 'rgba(56, 189, 248, 0.45)',
                      boxShadow: '0 0 6px rgba(56, 189, 248, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
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
                      className="fx-tick-anim relative z-0 font-bold text-[15px] sm:text-[17px] leading-none"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        color: '#FFFFFF',
                        textShadow: '0 0 8px rgba(56, 189, 248, 0.85)',
                      }}
                    >
                      {digit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Colon 2 */}
              <div className="flex flex-col items-center justify-center gap-1 px-0.5">
                <span className="fx-colon-dot w-1 h-1 rounded-[1px] bg-[#38BDF8]" />
                <span className="fx-colon-dot w-1 h-1 rounded-[1px] bg-[#38BDF8]" />
              </div>

              {/* Seconds Group - Proportional Standard Size */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[time.split(':')[2]?.[0] || '0', time.split(':')[2]?.[1] || '0'].map((digit, idx) => (
                  <div
                    key={`s-${idx}`}
                    className="relative flex items-center justify-center w-[22px] sm:w-[24px] h-[30px] sm:h-[34px] rounded-md overflow-hidden border shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #162644 0%, #061124 100%)',
                      borderColor: '#F5A623',
                      boxShadow: '0 0 8px rgba(245, 166, 35, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
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
                      className="fx-tick-anim relative z-0 font-bold text-[15px] sm:text-[17px] leading-none"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        color: '#FFFBEB',
                        textShadow: '0 0 8px rgba(245, 166, 35, 0.95)',
                      }}
                    >
                      {digit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stacked AM/PM Badges */}
              <div className="flex flex-col gap-0.5 pl-0.5">
                <span
                  className="px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider transition-all leading-tight"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    backgroundColor: period === 'AM' ? '#F5A623' : 'rgba(11, 30, 59, 0.6)',
                    color: period === 'AM' ? '#0F172A' : 'rgba(186, 230, 253, 0.35)',
                    border: period === 'AM' ? '1px solid #E58E0A' : '1px solid rgba(56, 189, 248, 0.2)',
                    boxShadow: period === 'AM' ? '0 0 6px rgba(245, 166, 35, 0.5)' : 'none',
                  }}
                >
                  AM
                </span>
                <span
                  className="px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider transition-all leading-tight"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    backgroundColor: period === 'PM' ? '#F5A623' : 'rgba(11, 30, 59, 0.6)',
                    color: period === 'PM' ? '#0F172A' : 'rgba(186, 230, 253, 0.35)',
                    border: period === 'PM' ? '1px solid #E58E0A' : '1px solid rgba(56, 189, 248, 0.2)',
                    boxShadow: period === 'PM' ? '0 0 6px rgba(245, 166, 35, 0.5)' : 'none',
                  }}
                >
                  PM
                </span>
              </div>
            </div>

            {/* Date Display Box Below Digits */}
            <div
              className="flex items-center justify-center w-full px-2 py-0.5 rounded-md border"
              style={{
                background: 'linear-gradient(180deg, rgba(11, 30, 59, 0.75) 0%, rgba(5, 16, 34, 0.85) 100%)',
                borderColor: 'rgba(56, 189, 248, 0.3)',
                boxShadow: '0 0 6px rgba(56, 189, 248, 0.15)',
              }}
            >
              <span
                className="font-semibold text-[11px] sm:text-xs tracking-wider"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: '#BAE6FD',
                  letterSpacing: '0.05em',
                }}
              >
                {dateStr || 'Loading date...'}
              </span>
            </div>
          </div>

        </div>

        {/* Main Headline & GZ Emblem Showcase */}
        <div className="relative z-10 my-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 w-full">
          <div 
            className="reveal-left flex-1 min-w-0 p-2 sm:p-4 md:p-5 rounded-2xl w-full max-w-none"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none'
            }}
          >
            <h1 
              className="font-heading font-black tracking-tight leading-tight text-white"
              style={{
                fontSize: 'clamp(1.5rem, 3.2vw, 2.75rem)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.95), 0 4px 12px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 0, 0, 0.65)',
                letterSpacing: '-0.01em',
                lineHeight: 1.15
              }}
            >
              Gen Z Interactive Simulations Portal
            </h1>

            {/* Subtitle & Dynamic Typewriter Subject Stream - Clean Separate Lines with Zero Overlap */}
            <div className="mt-2.5 flex flex-col gap-1.5">
              {/* Row 1: Multidisciplinary Learning Portal Label in Bright Yellow */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-ping inline-block shrink-0" style={{ backgroundColor: '#F5A623' }} />
                <span 
                  className="text-xs sm:text-sm md:text-base font-black tracking-wide uppercase"
                  style={{ 
                    color: '#FDE047', 
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.85)',
                    letterSpacing: '0.025em'
                  }}
                >
                  Professional Multidisciplinary Digital Learning Portal
                </span>
              </div>

              {/* Row 2: Dedicated Interactive Subject Stream with Typewriter Animation on its Own Line */}
              <div className="flex items-center gap-2 flex-wrap mt-0.5">
                <span 
                  className="text-xs sm:text-sm font-extrabold text-white shrink-0"
                  style={{ 
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.95)',
                    letterSpacing: '0.015em'
                  }}
                >
                  Interactive Focus:
                </span>
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-lg font-black text-xs sm:text-sm tracking-wide border shadow-md transition-colors duration-200"
                  style={{
                    backgroundColor: '#091A3E',
                    borderColor: stemRotations[slideIndex].color,
                    color: '#FFFFFF',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.95)'
                  }}
                >
                  <span className="text-white font-extrabold">{typedSubject}</span>
                  <span 
                    className="inline-block w-[2.5px] h-4 ml-1.5 animate-pulse" 
                    style={{ backgroundColor: stemRotations[slideIndex].color, boxShadow: `0 0 6px ${stemRotations[slideIndex].color}` }} 
                  />
                </span>
              </div>
            </div>

            {/* Typewriter Dynamic Educational Description matching Subject */}
            <p 
              className="mt-3.5 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed font-bold min-h-[4.5rem] sm:min-h-[3.75rem] flex items-start" 
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.95), 0 3px 8px rgba(0, 0, 0, 0.85)',
                lineHeight: '1.65',
                letterSpacing: '0.015em'
              }}
            >
              <span>
                {typedDesc}
                <span 
                  className="inline-block w-[2px] h-4 ml-1 align-middle animate-pulse" 
                  style={{ backgroundColor: stemRotations[slideIndex].color }} 
                />
              </span>
            </p>

            {/* High-Contrast Action Buttons with Solid Colours and Bold Text */}
            <div className="reveal-up relative z-10 mt-6 flex items-center gap-4 flex-wrap">
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
                className="font-black px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg transition-all active:scale-95"
                style={{
                  backgroundColor: '#F5A623',
                  color: '#0A1938',
                  border: '2px solid #D97706',
                  boxShadow: '0 4px 14px rgba(245, 166, 35, 0.4)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E58E0A')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5A623')}
              >
                <Layers className="w-4 h-4 pointer-events-none text-[#0A1938]" />
                <span className="text-[#0A1938] font-black">Explore All Labs Grid</span>
              </button>
              <a
                href="#stage"
                className="fx-pulse-blue px-6 py-3 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-lg transition-all active:scale-95"
                style={{
                  backgroundColor: '#1546A8',
                  color: '#FFFFFF',
                  border: '2px solid #3B82F6',
                  boxShadow: '0 4px 14px rgba(21, 70, 168, 0.5)',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1D4ED8';
                  e.currentTarget.style.borderColor = '#60A5FA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1546A8';
                  e.currentTarget.style.borderColor = '#3B82F6';
                }}
              >
                <Play className="w-4 h-4 pointer-events-none text-white fill-white shrink-0" />
                <span className="text-white font-black">Interactive Stage &amp; Dedicated Tabs</span>
              </a>
            </div>
          </div>

          {/* Official GZ Monogram Emblem - Transparent directly on Hero Background */}
          <div className="reveal-zoom shrink-0 flex items-center justify-center my-2 md:my-0 self-center bg-transparent p-0 m-0 border-0 shadow-none">
            <img 
              src="/genz-logo-transparent.png?v=3" 
              alt="Gen Z Interactive Simulations Official Monogram Logo" 
              className="block select-none pointer-events-none transition-transform duration-300 hover:scale-105 max-h-[85px] sm:max-h-[100px] md:max-h-[115px] w-auto object-contain"
              style={{ 
                display: 'block', 
                background: 'transparent',
                filter: 'drop-shadow(0 4px 14px rgba(0, 0, 0, 0.75))'
              }}
            />
          </div>
        </div>

        {/* Continuous Right-to-Left Live Bulletin Ticker */}
        <div 
          className="relative z-10 mt-6 text-xs flex items-center overflow-hidden rounded-2xl border shadow-lg"
          style={{
            backgroundColor: '#0B1D40',
            borderColor: '#F5A623',
            boxShadow: '0 8px 24px rgba(11, 29, 64, 0.6)'
          }}
          title="Live STEM Bulletin — Continuous Real-Time Updates"
        >
          {/* Fixed Left Badge: Live STEM Bulletin */}
          <div 
            className="shrink-0 z-20 px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] text-[#0A1938] shadow-xs select-none"
            style={{
              backgroundColor: '#F5A623'
            }}
          >
            <Radio className="w-4 h-4 animate-pulse pointer-events-none text-[#0A1938]" />
            <span className="whitespace-nowrap font-heading text-[#0A1938] font-black">LIVE STEM BULLETIN</span>
            <span 
              className="ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold flex items-center gap-1"
              style={{
                backgroundColor: 'rgba(10, 25, 56, 0.25)',
                color: '#0A1938',
                border: '1px solid rgba(10, 25, 56, 0.45)'
              }}
            >
              LIVE
            </span>
          </div>

          {/* Endless Seamless Marquee Viewport with Calm Readability */}
          <div className="flex-1 overflow-hidden relative py-3" style={{ backgroundColor: '#0B1D40' }}>
            <div 
              className="animate-marquee-infinite flex items-center"
              style={{
                willChange: 'transform',
                animationDuration: `${tickerDuration}s`,
                '--marquee-duration': `${tickerDuration}s`
              } as React.CSSProperties}
            >
              
              <div ref={tickerGroupRef} className="flex items-center shrink-0">
                {allSimulationTopics.map((sim) => (
                  <a 
                    key={`sim-ticker-1-${sim.id}`} 
                    href={getSimulationStandaloneUrl(sim)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center shrink-0 mr-8 hover:text-[#F5A623] transition-colors no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-black mr-2 text-white font-mono shadow-xs border border-white/40 tracking-wider"
                      style={{ backgroundColor: '#1D4ED8' }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span 
                      className="font-bold mr-2 text-xs sm:text-sm font-sans tracking-tight text-white whitespace-nowrap"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}
                    >
                      {sim.title}
                    </span>
                    <span 
                      className="text-xs font-bold mr-2 text-[#FDE047] whitespace-nowrap"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}
                    >
                      ({sim.category})
                    </span>
                    <Star className="w-3.5 h-3.5 inline-block mx-1.5 shrink-0 pointer-events-none text-[#F5A623] fill-[#F5A623]" />
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
                    className="flex items-center shrink-0 mr-8 hover:text-[#60A5FA] transition-colors no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-black mr-2 text-white font-mono shadow-xs border border-white/40 tracking-wider"
                      style={{ backgroundColor: sim.accentColor || '#1D4ED8' }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span 
                      className="font-bold mr-2 text-xs sm:text-sm font-sans tracking-tight text-white whitespace-nowrap"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}
                    >
                      {sim.title}
                    </span>
                    <span 
                      className="text-xs font-bold mr-2 text-[#FDE047] whitespace-nowrap"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}
                    >
                      ({sim.category})
                    </span>
                    <Star className="w-3.5 h-3.5 inline-block mx-1.5 shrink-0 pointer-events-none text-[#F5A623] fill-[#F5A623]" />
                  </a>
                ))}
              </div>

            </div>
          </div>

          {/* Speed Preset Controls on the Right */}
          <div 
            className="shrink-0 z-20 px-2 sm:px-3 py-2 sm:py-2.5 flex items-center gap-1 sm:gap-1.5 select-none" 
            style={{ 
              backgroundColor: '#071530', 
              borderLeft: '1.5px solid rgba(245, 166, 35, 0.35)' 
            }}
          >
            <span className="text-[10px] sm:text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mr-0.5 hidden xs:inline">
              Speed:
            </span>
            {[
              { label: '0.7x', mult: 0.7, title: 'Calm reading pace (0.7x)' },
              { label: '1.0x', mult: 1, title: 'Normal brisk pace (1.0x)' },
              { label: '1.4x', mult: 1.4, title: 'Fast bulletin pace (1.4x)' },
              { label: '1.8x', mult: 1.8, title: 'Super fast pace (1.8x)' }
            ].map((item) => (
              <button
                key={item.mult}
                type="button"
                onClick={() => setSpeedMultiplier(item.mult)}
                title={item.title}
                className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  speedMultiplier === item.mult
                    ? 'bg-[#F5A623] text-[#0A1938] shadow-xs font-black scale-105'
                    : 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* 2-Second Rotating Showcase Item at Bottom with Solid Educational Card Styling */}
      {currentSim && (
        <div className="px-3 sm:px-6 lg:px-8 xl:px-12">
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
        </div>
      )}

    </div>
  );
};

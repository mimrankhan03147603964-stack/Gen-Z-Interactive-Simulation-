import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Clock, 
  Sparkles, 
  Layers, 
  Play, 
  Pause, 
  Radio, 
  Star, 
  Rocket, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Cpu,
  Calendar
} from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';
import { getThemeForIndex } from '../data/sequentialPalette';
import sliderImg1 from '../assets/hero-slider-1.jpg';
import sliderImg2 from '../assets/hero-slider-2.jpg';
import sliderImg3 from '../assets/hero-slider-3.jpg';
import sliderImg4 from '../assets/hero-slider-4.jpg';

const SLIDER_IMAGES = [
  sliderImg1,
  sliderImg2,
  sliderImg3,
  sliderImg4
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
  // Clock state
  const [time, setTime] = useState<string>('');
  const [period, setPeriod] = useState<string>('PM');
  const [dateStr, setDateStr] = useState<string>('');

  // Slider State (5-second auto rotation with smooth 1s cross-fade and slight zoom-out)
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isSliderHovered, setIsSliderHovered] = useState<boolean>(false);
  const [sliderProgress, setSliderProgress] = useState<number>(0);

  // 2-Second Rotating Showcase State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState<boolean>(false);
  const [isTickerPaused, setIsTickerPaused] = useState<boolean>(false);

  // 100% of available simulation topics currently in the system library
  const allSimulationTopics = SIMULATIONS_LIST;

  // Typewriter rotation subjects showcasing the rich multidisciplinary STEM breadth
  const stemRotations = useMemo(() => [
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

  // Preload all 4 slider pictures for instantaneous zero-flicker display
  useEffect(() => {
    SLIDER_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // 5-Second Image Slider Timer & Progress Engine with Hover Pause
  useEffect(() => {
    if (isSliderHovered) return;

    const intervalStep = 50; // update progress every 50ms
    const totalDuration = 5000; // 5 seconds per slide
    const progressIncrement = (intervalStep / totalDuration) * 100;

    const interval = setInterval(() => {
      setSliderProgress((prev) => {
        if (prev + progressIncrement >= 100) {
          setCurrentSlideIndex((curr) => (curr + 1) % SLIDER_IMAGES.length);
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);

    return () => clearInterval(interval);
  }, [isSliderHovered]);

  // Keyboard navigation for slider (Left/Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
        setSliderProgress(0);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlideIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
        setSliderProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
    setSliderProgress(0);
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    setSliderProgress(0);
  };

  const goToSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    setSliderProgress(0);
  };

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

  // Strict 2-Second (2000ms) Interval with Fluid Right-to-Left Slide Transition for Bottom Showcase
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
    <div className="w-full flex flex-col relative select-none">
      
      {/* ============================================================ */}
      {/* PART 1 - IMAGE SLIDER (TOP, FULLY CLEAR, ZERO GLASS/OVERLAY) */}
      {/* ============================================================ */}
      <div 
        className="relative w-full overflow-hidden select-none group/slider"
        style={{
          height: 'clamp(300px, 46vh, 480px)',
          backgroundColor: '#0A1430'
        }}
        onMouseEnter={() => setIsSliderHovered(true)}
        onMouseLeave={() => setIsSliderHovered(false)}
      >
        {/* The 4 Clean Background Images with smooth 1s cross-fade and subtle zoom-out */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {SLIDER_IMAGES.map((imgSrc, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <div
                key={`slider-img-${idx}`}
                className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : 1,
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                <img
                  src={imgSrc}
                  alt={`Gen Z Interactive STEM Lab Showcase Photo ${idx + 1}`}
                  className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-[6000ms] ease-out"
                  style={{
                    transform: isActive ? 'scale(1.0)' : 'scale(1.045)',
                    filter: 'none'
                  }}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}
        </div>

        {/* Top-Left Corner: Digital Clock & Date Widget on semi-transparent dark container */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-5 z-20 pointer-events-auto">
          <div 
            className="flex flex-col gap-1 px-3 py-1.5 rounded-xl border shadow-lg backdrop-blur-xs select-none"
            style={{
              backgroundColor: 'rgba(10, 20, 48, 0.78)',
              borderColor: 'rgba(56, 189, 248, 0.4)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Scoped Keyframes for Digit Tick & Colon Blink */}
            <style>{`
              @keyframes fx-digit-tick {
                0% { transform: translateY(-2px); filter: brightness(1.4); }
                100% { transform: translateY(0); filter: brightness(1); }
              }
              @keyframes fx-colon-blink {
                0%, 100% { opacity: 1; box-shadow: 0 0 6px #38bdf8; }
                50% { opacity: 0.2; box-shadow: 0 0 2px #38bdf8; }
              }
              .fx-tick-anim { animation: fx-digit-tick 0.22s cubic-bezier(0.2, 0.9, 0.3, 1) forwards; }
              .fx-colon-dot { animation: fx-colon-blink 1s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) {
                .fx-tick-anim { animation: none !important; }
                .fx-colon-dot { animation: none !important; opacity: 1 !important; }
              }
            `}</style>

            {/* Digits Row: [H][H] : [M][M] : [S][S] [AM/PM] */}
            <div className="flex items-center gap-1">
              {/* Hours Group */}
              <div className="flex items-center gap-0.5">
                {[time.split(':')[0]?.[0] || '1', time.split(':')[0]?.[1] || '2'].map((digit, idx) => (
                  <div
                    key={`h-${idx}`}
                    className="relative flex items-center justify-center w-[18px] sm:w-[20px] h-[24px] sm:h-[26px] rounded overflow-hidden border shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #0b1e3b 0%, #051022 100%)',
                      borderColor: 'rgba(56, 189, 248, 0.45)',
                      boxShadow: '0 0 6px rgba(56, 189, 248, 0.2)',
                    }}
                  >
                    <span
                      key={digit}
                      className="fx-tick-anim relative z-0 font-bold text-[12px] sm:text-[13px] leading-none"
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
              <div className="flex flex-col items-center justify-center gap-0.5 px-0.5">
                <span className="fx-colon-dot w-1 h-1 rounded-[1px] bg-[#38BDF8]" />
                <span className="fx-colon-dot w-1 h-1 rounded-[1px] bg-[#38BDF8]" />
              </div>

              {/* Minutes Group */}
              <div className="flex items-center gap-0.5">
                {[time.split(':')[1]?.[0] || '0', time.split(':')[1]?.[1] || '0'].map((digit, idx) => (
                  <div
                    key={`m-${idx}`}
                    className="relative flex items-center justify-center w-[18px] sm:w-[20px] h-[24px] sm:h-[26px] rounded overflow-hidden border shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #0b1e3b 0%, #051022 100%)',
                      borderColor: 'rgba(56, 189, 248, 0.45)',
                      boxShadow: '0 0 6px rgba(56, 189, 248, 0.2)',
                    }}
                  >
                    <span
                      key={digit}
                      className="fx-tick-anim relative z-0 font-bold text-[12px] sm:text-[13px] leading-none"
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
              <div className="flex flex-col items-center justify-center gap-0.5 px-0.5">
                <span className="fx-colon-dot w-1 h-1 rounded-[1px] bg-[#38BDF8]" />
                <span className="fx-colon-dot w-1 h-1 rounded-[1px] bg-[#38BDF8]" />
              </div>

              {/* Seconds Group */}
              <div className="flex items-center gap-0.5">
                {[time.split(':')[2]?.[0] || '0', time.split(':')[2]?.[1] || '0'].map((digit, idx) => (
                  <div
                    key={`s-${idx}`}
                    className="relative flex items-center justify-center w-[18px] sm:w-[20px] h-[24px] sm:h-[26px] rounded overflow-hidden border shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #162644 0%, #061124 100%)',
                      borderColor: '#FFC233',
                      boxShadow: '0 0 6px rgba(255, 194, 51, 0.35)',
                    }}
                  >
                    <span
                      key={digit}
                      className="fx-tick-anim relative z-0 font-bold text-[12px] sm:text-[13px] leading-none"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        color: '#FFFBEB',
                        textShadow: '0 0 8px rgba(255, 194, 51, 0.95)',
                      }}
                    >
                      {digit}
                    </span>
                  </div>
                ))}
              </div>

              {/* AM/PM */}
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider font-mono ml-0.5"
                style={{
                  backgroundColor: '#FFC233',
                  color: '#0A1430'
                }}
              >
                {period}
              </span>
            </div>

            {/* Date line */}
            <span
              className="text-[10px] font-semibold tracking-wider text-[#BAE6FD]"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {dateStr || 'Loading date...'}
            </span>
          </div>
        </div>

        {/* Top-Right Corner: Slide Counter "1 / 4" */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-5 z-20 pointer-events-auto">
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-lg backdrop-blur-xs text-xs font-mono font-black"
            style={{
              backgroundColor: 'rgba(10, 20, 48, 0.82)',
              borderColor: 'rgba(255, 194, 51, 0.5)',
              color: '#FFFFFF'
            }}
          >
            <span className="text-[#FFC233]">{currentSlideIndex + 1}</span>
            <span className="text-white/60">/</span>
            <span>{SLIDER_IMAGES.length}</span>
          </div>
        </div>

        {/* Control A: Left Arrow Button (Round, semi-transparent dark, hover turns yellow) */}
        <button
          type="button"
          onClick={goToPrevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white border shadow-xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group/arrow"
          style={{
            backgroundColor: 'rgba(10, 20, 48, 0.72)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.45)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFC233';
            e.currentTarget.style.borderColor = '#FFC233';
            e.currentTarget.style.color = '#0A1430';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(10, 20, 48, 0.72)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          title="Previous slide (Left Arrow key)"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 shrink-0 transition-colors pointer-events-none" />
        </button>

        {/* Control A: Right Arrow Button (Round, semi-transparent dark, hover turns yellow) */}
        <button
          type="button"
          onClick={goToNextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white border shadow-xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group/arrow"
          style={{
            backgroundColor: 'rgba(10, 20, 48, 0.72)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.45)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFC233';
            e.currentTarget.style.borderColor = '#FFC233';
            e.currentTarget.style.color = '#0A1430';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(10, 20, 48, 0.72)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          title="Next slide (Right Arrow key)"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 shrink-0 transition-colors pointer-events-none" />
        </button>

        {/* Control B: Dot Indicators at Bottom Centre (Active is longer yellow pill) */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2 pointer-events-auto">
          {SLIDER_IMAGES.map((_, dotIdx) => {
            const isActive = dotIdx === currentSlideIndex;
            return (
              <button
                key={`dot-${dotIdx}`}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                className={`transition-all duration-300 rounded-full cursor-pointer shadow-md ${
                  isActive 
                    ? 'w-8 h-2.5 bg-[#FFC233] border border-[#E5A817]' 
                    : 'w-2.5 h-2.5 bg-white/70 hover:bg-white border border-black/20'
                }`}
                title={`Jump to photo ${dotIdx + 1}`}
                aria-label={`Jump to slide ${dotIdx + 1}`}
              />
            );
          })}
        </div>

        {/* Control D: Thin Progress Bar at Very Bottom Edge (Yellow-to-Pink Gradient) */}
        <div className="absolute bottom-0 inset-x-0 h-[3.5px] z-30 bg-black/40 overflow-hidden pointer-events-none">
          <div 
            className="h-full transition-all duration-75 ease-linear"
            style={{
              width: `${sliderProgress}%`,
              background: 'linear-gradient(90deg, #FFC233 0%, #FF4F9A 100%)',
              boxShadow: '0 0 8px rgba(255, 79, 154, 0.6)'
            }}
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* PART 2 - INFO CARD (BELOW THE SLIDER, SOLID LIGHT, OVERLAPPING) */}
      {/* ============================================================ */}
      <div 
        className="w-full relative z-30 px-3 sm:px-6 lg:px-8 xl:px-12 -mt-10 sm:-mt-12 md:-mt-[50px] pb-4"
        style={{
          background: 'linear-gradient(180deg, #0A1430 0%, #12214A 100%)'
        }}
      >
        <div 
          className="max-w-[1050px] mx-auto w-full rounded-[22px] p-5 sm:p-7 md:p-8 shadow-2xl transition-all"
          style={{
            backgroundColor: '#FFFDF6',
            borderTop: '6px solid #FFC233',
            borderLeft: '1px solid #EADFCB',
            borderRight: '1px solid #EADFCB',
            borderBottom: '1.5px solid #EADFCB',
            boxShadow: '0 16px 40px rgba(10, 20, 48, 0.22), 0 2px 8px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* 1. The Two Badges Row (with Monogram Logo) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Badge 1: GEN Z INTERACTIVE SIMULATIONS PORTAL + 4K 3D */}
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-xs"
                style={{
                  backgroundColor: '#FFC233',
                  borderColor: '#E5A817',
                  color: '#0A1430'
                }}
              >
                <Sparkles className="w-4 h-4 text-[#0A1430] pointer-events-none shrink-0" />
                <span className="font-heading font-black text-xs sm:text-sm tracking-wide text-[#0A1430]">
                  GEN Z INTERACTIVE SIMULATIONS PORTAL
                </span>
                <span 
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono"
                  style={{
                    backgroundColor: '#0A1430',
                    color: '#FFFFFF'
                  }}
                >
                  4K 3D
                </span>
              </div>

              {/* Badge 2: Aligned with National Curriculum of Pakistan (Session 2026-27) */}
              <span 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold border shadow-xs"
                style={{
                  backgroundColor: '#EBF3FF',
                  borderColor: '#B9D5FF',
                  color: '#12398C'
                }}
              >
                <span className="w-2 h-2 rounded-full shrink-0 bg-[#FFC233]" />
                <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
              </span>
            </div>

            {/* Official GEN Z Monogram Emblem Logo (High Resolution Transparent) */}
            <div className="shrink-0 hidden sm:flex items-center justify-center self-center">
              <img 
                src="/genz-logo-transparent.png?v=3" 
                alt="Gen Z Interactive Simulations Official Monogram Logo" 
                className="block select-none pointer-events-none transition-transform duration-300 hover:scale-105 max-h-[50px] w-auto object-contain"
                style={{ 
                  filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))'
                }}
              />
            </div>
          </div>

          {/* 2. Main Title */}
          <h1 
            className="font-heading font-black tracking-tight leading-tight text-[#14203F] mb-2"
            style={{
              fontSize: 'clamp(1.45rem, 2.7vw, 2.45rem)'
            }}
          >
            Gen Z Interactive Simulations Portal
          </h1>

          {/* 3. Sub Line with Dynamic Typewriter Subject */}
          <p className="text-xs sm:text-sm md:text-base font-black tracking-wide flex items-center gap-2 flex-wrap mb-3 text-[#D97706]">
            <span className="w-2.5 h-2.5 rounded-full animate-ping inline-block shrink-0 bg-[#FFC233]" />
            <span className="inline-flex items-center flex-wrap gap-1.5">
              <span className="text-[#14203F]">Professional Multidisciplinary</span>
              <span 
                className="inline-flex items-center px-2.5 py-0.5 rounded-md font-black tracking-wide border shadow-2xs transition-colors duration-200 min-h-[1.5rem]"
                style={{
                  backgroundColor: '#FFF4D6',
                  borderColor: '#FFC233',
                  color: '#B45309'
                }}
              >
                <span>{typedSubject}</span>
                <span 
                  className="inline-block w-[2px] h-4 ml-1 animate-pulse bg-[#FFC233]" 
                />
              </span>
              <span className="text-[#14203F]">Learning Portal</span>
            </span>
          </p>

          {/* 4. Full Description Paragraph (Dynamic Typewriter Rotation) */}
          <p 
            className="text-xs sm:text-sm md:text-[14.5px] max-w-4xl leading-relaxed font-semibold min-h-[3.6rem] flex items-start text-[#4B5A7D] mb-5"
          >
            <span>
              {typedDesc}
              <span 
                className="inline-block w-[2px] h-4 ml-1 align-middle animate-pulse bg-[#FFC233]" 
              />
            </span>
          </p>

          {/* 5. The Two Buttons (Solid 3D Yellow and Cyan with Lift Effect) */}
          <div className="flex items-center gap-4 flex-wrap mb-5">
            {/* Button 1: Explore All Labs Grid (Solid 3D Yellow Button) */}
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
              className="font-black px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all duration-150 select-none hover:-translate-y-0.5 active:translate-y-0.5"
              style={{
                backgroundColor: '#FFC233',
                color: '#0A1430',
                border: '2px solid #E5A817',
                boxShadow: '0 5px 0 #C98A00, 0 8px 18px rgba(255, 194, 51, 0.35)'
              }}
              title="Explore all 109 interactive STEM simulations"
            >
              <Layers className="w-4 h-4 pointer-events-none text-[#0A1430]" />
              <span className="text-[#0A1430]">Explore All Labs Grid</span>
            </button>

            {/* Button 2: Interactive Stage & Dedicated Tabs (Solid 3D Cyan Button) */}
            <a
              href="#stage"
              className="font-black px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all duration-150 select-none hover:-translate-y-0.5 active:translate-y-0.5"
              style={{
                backgroundColor: '#19B8FF',
                color: '#0A1430',
                border: '2px solid #009FE3',
                boxShadow: '0 5px 0 #0081B8, 0 8px 18px rgba(25, 184, 255, 0.35)'
              }}
              title="Launch interactive dedicated stage viewport"
            >
              <Play className="w-4 h-4 pointer-events-none text-[#0A1430] fill-[#0A1430] shrink-0" />
              <span className="text-[#0A1430]">Interactive Stage &amp; Dedicated Tabs</span>
            </a>
          </div>

          {/* 6. Facts Strip at Bottom of Card (Separated by Dashed Line) */}
          <div className="border-t-2 border-dashed border-[#E3D9C5] pt-4 mt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-bold text-[#14203F]">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#EBF3FF] border border-[#B9D5FF] flex items-center justify-center text-[#12398C] shrink-0">
                <Cpu className="w-4 h-4" />
              </span>
              <div>
                <span className="font-mono text-sm font-black text-[#0A1430]">{allSimulationTopics.length}</span>
                <span className="text-[#4B5A7D] ml-1.5">&mdash; Verified Labs</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FFF4D6] border border-[#FFC233] flex items-center justify-center text-[#B45309] shrink-0">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
              </span>
              <div>
                <span className="font-mono text-sm font-black text-[#0A1430]">4K</span>
                <span className="text-[#4B5A7D] ml-1.5">&mdash; High Fidelity</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#EBF9F1] border border-[#A7E8BD] flex items-center justify-center text-[#047857] shrink-0">
                <Calendar className="w-4 h-4" />
              </span>
              <div>
                <span className="font-mono text-sm font-black text-[#0A1430]">2026-27</span>
                <span className="text-[#4B5A7D] ml-1.5">&mdash; Curriculum Session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Right-to-Left Live Bulletin Ticker */}
        <div 
          className={`max-w-[1050px] mx-auto w-full group/ticker relative z-10 mt-5 text-xs flex items-center overflow-hidden rounded-2xl border shadow-lg ${isTickerPaused ? 'is-ticker-paused' : ''}`}
          style={{
            backgroundColor: '#1546A8',
            borderColor: '#FFC233'
          }}
          title="Live STEM Bulletin — Hover to pause scrolling, click any lab to open"
        >
          {/* Fixed Left Badge: Live STEM Bulletin with Pause/Play toggle */}
          <div 
            onClick={() => setIsTickerPaused(!isTickerPaused)}
            className="shrink-0 z-20 px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] text-[#0A1430] shadow-xs cursor-pointer select-none transition-all hover:brightness-110 active:scale-98"
            style={{
              backgroundColor: '#FFC233'
            }}
            title={isTickerPaused ? 'Click to resume scrolling' : 'Click to pause scrolling'}
          >
            <Radio className="w-4 h-4 animate-pulse pointer-events-none text-[#0A1430]" />
            <span className="whitespace-nowrap font-heading text-[#0A1430]">LIVE STEM BULLETIN</span>
            <button 
              type="button" 
              className="ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-mono flex items-center gap-1"
              style={{
                backgroundColor: 'rgba(10, 20, 48, 0.2)',
                color: '#0A1430',
                border: '1px solid rgba(10, 20, 48, 0.4)'
              }}
            >
              {isTickerPaused ? (
                <>
                  <Play className="w-2.5 h-2.5 fill-current text-[#0A1430]" />
                  <span>PAUSED</span>
                </>
              ) : (
                <>
                  <Pause className="w-2.5 h-2.5 fill-current text-[#0A1430]" />
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
                    className="flex items-center shrink-0 mr-10 hover:text-[#FFC233] transition-colors no-underline"
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
                    <span className="text-xs font-bold mr-2 text-[#FFC233]">
                      ({sim.category})
                    </span>
                    <span className="text-xs font-semibold mr-3 text-[#DBE4F7]">
                      &mdash; {sim.description}
                    </span>
                    <Star className="w-3.5 h-3.5 inline-block mx-2 shrink-0 pointer-events-none text-[#FFC233] fill-[#FFC233]" />
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

        {/* 2-Second Rotating Showcase Item at Bottom with Solid Educational Card Styling */}
        {currentSim && (
          <div className="max-w-[1050px] mx-auto w-full mt-4">
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

    </div>
  );
};

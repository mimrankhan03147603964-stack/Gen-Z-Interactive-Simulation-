import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  Home, 
  Layers, 
  BookOpen, 
  UserCheck,
  Atom,
  FlaskConical,
  Leaf,
  Globe,
  Calculator,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';

interface TopNavbarProps {
  activeSim?: SimulationItem | null;
  totalSimulations?: number;
  onToggleSidebar?: () => void;
  onResetLab?: () => void;
  onFullscreen?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onBackToCatalog?: () => void;
  onSelectCategory?: (category: string) => void;
}

interface DropdownItem {
  label: string;
  href: string;
  desc: string;
  categoryKey?: string;
  color: string;
  icon: React.ReactNode;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  totalSimulations = 86,
  onBackToCatalog,
  onSelectCategory
}) => {
  const [openDropdown, setOpenDropdown] = useState<'catalog' | 'hub' | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = useCallback((menu: 'catalog' | 'hub') => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(menu);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 240);
  }, []);

  const toggleDropdown = useCallback((menu: 'catalog' | 'hub') => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(prev => prev === menu ? null : menu);
  }, []);

  const handleItemClick = useCallback((href: string, categoryKey?: string) => {
    // 1. Close dropdown immediately
    setOpenDropdown(null);

    // 2. Filter category if specified
    if (categoryKey && onSelectCategory) {
      onSelectCategory(categoryKey);
    }

    // 3. Handle Top / Home navigation
    if (href === '#' || href === '#top') {
      if (onBackToCatalog) onBackToCatalog();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 4. Smooth scroll to target section with sticky/fixed navbar offset consideration
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [onBackToCatalog, onSelectCategory]);

  const getCategoryCount = (key?: string) => {
    if (!key || key === 'All Simulations') return SIMULATIONS_LIST.length;
    return SIMULATIONS_LIST.filter(s => s.category === key).length;
  };

  const catalogDropdownItems: DropdownItem[] = [
    { 
      label: 'All Interactive Labs', 
      href: '#catalog', 
      desc: 'Complete STEM repository with instant search', 
      categoryKey: 'All Simulations', 
      color: '#2563eb',
      icon: <Layers className="w-4 h-4 text-blue-600" />
    },
    { 
      label: 'Physics & Motion', 
      href: '#catalog', 
      desc: 'Mechanics, Optics, Waves & Doppler', 
      categoryKey: 'Physics & Motion', 
      color: '#0284c7',
      icon: <Atom className="w-4 h-4 text-sky-600" />
    },
    { 
      label: 'Chemistry & Matter', 
      href: '#catalog', 
      desc: 'Reactions, Gas Laws, Bonding & Conservation', 
      categoryKey: 'Chemistry & Matter', 
      color: '#9333ea',
      icon: <FlaskConical className="w-4 h-4 text-purple-600" />
    },
    { 
      label: 'Biology & Living Systems', 
      href: '#catalog', 
      desc: 'Genetics, Excretory, Heart & Cells', 
      categoryKey: 'Biology & Life', 
      color: '#16a34a',
      icon: <Leaf className="w-4 h-4 text-emerald-600" />
    },
    { 
      label: 'Mathematics & Logic', 
      href: '#catalog', 
      desc: 'Primary Class 1-5, Geometry & Algebra', 
      categoryKey: 'Mathematics & Logic', 
      color: '#ea580c',
      icon: <Calculator className="w-4 h-4 text-orange-600" />
    },
    { 
      label: 'Earth & Space Exploration', 
      href: '#catalog', 
      desc: 'Solar System, Tides, Eclipses & Geology', 
      categoryKey: 'Earth & Space', 
      color: '#0d9488',
      icon: <Globe className="w-4 h-4 text-teal-600" />
    },
    { 
      label: 'Computer Science & IT', 
      href: '#catalog', 
      desc: 'Logic Gates, Binary & Algorithms', 
      categoryKey: 'Computer Science & IT', 
      color: '#0e7490',
      icon: <Cpu className="w-4 h-4 text-cyan-600" />
    },
    { 
      label: 'Early Childhood (ECCE)', 
      href: '#catalog', 
      desc: 'Alphabet Phonics, Colors & Shapes', 
      categoryKey: 'Early Childhood (ECCE)', 
      color: '#db2777',
      icon: <Sparkles className="w-4 h-4 text-pink-600" />
    },
    { 
      label: 'Urdu & Linguistics', 
      href: '#catalog', 
      desc: 'Haroof-e-Tahajji, Ajza-e-Kalam & Sifat', 
      categoryKey: 'Urdu & Linguistics', 
      color: '#b91c1c',
      icon: <BookOpen className="w-4 h-4 text-rose-600" />
    },
  ];

  const hubDropdownItems: DropdownItem[] = [
    { 
      label: 'For Teachers & Educators', 
      href: '#pedagogical-hub', 
      desc: 'Smart classroom 4K demonstrations, lesson workflows & conceptual pedagogy', 
      color: '#2563eb',
      icon: <GraduationCap className="w-4 h-4 text-blue-600" />
    },
    { 
      label: 'For Students & Young Scientists', 
      href: '#pedagogical-hub', 
      desc: 'Open inquiry sandboxes, real-time physics parameters & gamified quizzes', 
      color: '#10b981',
      icon: <Sparkles className="w-4 h-4 text-emerald-600" />
    },
    { 
      label: 'National Curriculum of Pakistan', 
      href: '#features', 
      desc: 'Aligned with official Student Learning Objectives (SLOs) Session 2026-27', 
      color: '#f59e0b',
      icon: <BookOpen className="w-4 h-4 text-amber-600" />
    },
    { 
      label: 'Digital Laboratory Architecture', 
      href: '#features', 
      desc: '100% browser-based 60 FPS HTML5 Canvas computational physics engine', 
      color: '#6366f1',
      icon: <Cpu className="w-4 h-4 text-indigo-600" />
    },
  ];

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[9999] border-b border-slate-200/90 bg-white/98 backdrop-blur-md transition-all select-none shadow-xs"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div 
        className="w-full max-w-[1720px] 2xl:max-w-[1820px] mx-auto px-2 sm:px-4 lg:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap'
        }}
      >
        
        {/* Left: Official Rectangular Logo & Portal Subtitle */}
        <div 
          onClick={() => handleItemClick('#top')}
          className="flex items-center gap-2 sm:gap-2.5 shrink-0 cursor-pointer group min-w-0"
          title="Gen Z Interactive Simulations Home"
        >
          {/* GZ Monogram Logo */}
          <div 
            className="inline-flex items-center justify-center shrink-0 rounded-lg overflow-hidden border border-sky-500/80 bg-[#240854] shadow-[0_2px_4px_rgba(0,0,0,0.25)] transition-all duration-150 group-hover:scale-105"
            style={{ width: 'fit-content', height: 'auto', padding: '0px', borderRadius: '7px' }}
          >
            <img 
              src="/genz-official-logo.png" 
              alt="Gen Z Interactive Simulations Official Logo" 
              className="block select-none pointer-events-none rounded-md" 
              style={{ display: 'block', maxHeight: '34px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div className="hidden sm:block shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] lg:text-xs font-black tracking-tight text-slate-900 font-heading group-hover:text-sky-600 transition-colors whitespace-nowrap">
                DIGITAL LABORATORY PORTAL
              </span>
              <span 
                className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black text-white shadow-2xs whitespace-nowrap"
                style={{ backgroundColor: '#0284c7', border: '1px solid #0369a1', color: '#ffffff' }}
              >
                4K UHD
              </span>
            </div>
            <div className="text-[10px] lg:text-[11px] font-semibold flex items-center gap-1.5 flex-nowrap mt-0.5 whitespace-nowrap">
              <span className="font-extrabold text-blue-700">{totalSimulations} Verified Labs</span>
              <span className="hidden xl:inline text-slate-300 font-bold">&bull;</span>
              <span 
                className="hidden xl:inline-block px-1.5 py-0.2 rounded-full text-[9px] font-extrabold text-white shadow-2xs whitespace-nowrap"
                style={{ backgroundColor: '#059669', border: '1px solid #047857', color: '#ffffff' }}
              >
                NCP Aligned (Session 2026-27)
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items (Single horizontal line, flex-nowrap, no horizontal overflow) */}
        <nav 
          className="flex flex-row items-center justify-end gap-1 sm:gap-1.5 md:gap-2 shrink-0 flex-nowrap whitespace-nowrap"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexWrap: 'nowrap',
            position: 'relative'
          }}
        >
          {/* Link 1: Home */}
          <button
            type="button"
            onClick={() => handleItemClick('#top')}
            className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold text-slate-800 hover:text-sky-600 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Return to Home Portal"
          >
            <Home className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Home</span>
          </button>

          {/* Link 2: STEM Catalog ({totalSimulations}) with Comprehensive Mega-Dropdown */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('catalog')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('catalog');
              }}
              className={`inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                openDropdown === 'catalog' 
                  ? 'text-sky-700 bg-sky-50 ring-2 ring-sky-300' 
                  : 'text-slate-800 hover:text-sky-600 hover:bg-slate-100'
              }`}
              aria-expanded={openDropdown === 'catalog'}
              aria-haspopup="true"
              title="Browse Full STEM Catalog by Discipline"
            >
              <Layers className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>STEM Catalog ({totalSimulations})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openDropdown === 'catalog' ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
            </button>

            {/* Floating Dropdown Panel: Height Auto, max-height 85vh, z-index 99999, Unclipped Full View */}
            {openDropdown === 'catalog' && (
              <div 
                className="absolute left-0 sm:left-auto sm:right-0 md:left-0 top-full mt-2 w-[calc(100vw-24px)] sm:w-[540px] md:w-[620px] max-w-[640px] bg-white rounded-2xl border-2 border-slate-200/90 shadow-2xl p-3 z-[99999] transition-all"
                style={{
                  position: 'absolute',
                  top: '100%',
                  zIndex: 99999,
                  height: 'auto',
                  minHeight: 'fit-content',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.12)'
                }}
                onMouseEnter={() => handleMouseEnter('catalog')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Header with Title and All Labs Count Badge */}
                <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-600">
                      STEM Disciplines &amp; Laboratories
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                    {totalSimulations} Total Labs
                  </span>
                </div>

                {/* 2-Column Responsive Grid of All Disciplines (Clean, Spacious, Fully Clickable) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-0.5">
                  {catalogDropdownItems.map((item, idx) => {
                    const count = getCategoryCount(item.categoryKey);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item.href, item.categoryKey);
                        }}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl text-left bg-slate-50/70 hover:bg-sky-50/90 border border-slate-200/60 hover:border-sky-300 transition-all duration-150 group cursor-pointer shadow-2xs"
                      >
                        <div 
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs border border-white"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-xs sm:text-[13px] font-extrabold text-slate-800 group-hover:text-sky-700 transition-colors truncate">
                              {item.label}
                            </span>
                            <span 
                              className="text-[9px] font-bold px-1.5 py-0.2 rounded-md font-mono shrink-0 shadow-2xs"
                              style={{ backgroundColor: `${item.color}20`, color: item.color }}
                            >
                              {count}
                            </span>
                          </div>
                          <div className="text-[10.5px] text-slate-500 leading-tight mt-0.5 line-clamp-1 group-hover:text-slate-600">
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Quick Action */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-[11px]">
                  <span className="text-slate-400 font-medium">Click any discipline to instantly filter catalog</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick('#catalog', 'All Simulations');
                    }}
                    className="font-bold text-sky-600 hover:text-sky-800 underline cursor-pointer"
                  >
                    View All {totalSimulations} Labs &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Link 3: Educators & Students Hub with Dropdown Menu */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('hub')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('hub');
              }}
              className={`inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                openDropdown === 'hub' 
                  ? 'text-indigo-700 bg-indigo-50 ring-2 ring-indigo-300' 
                  : 'text-slate-800 hover:text-indigo-600 hover:bg-slate-100'
              }`}
              aria-expanded={openDropdown === 'hub'}
              aria-haspopup="true"
              title="Pedagogical Audience & Standards"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="hidden sm:inline">Educators &amp; Students Hub</span>
              <span className="sm:hidden">Hub</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openDropdown === 'hub' ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
            </button>

            {/* Floating Dropdown Panel: Height Auto, max-height 85vh, z-index 99999, Unclipped Full View */}
            {openDropdown === 'hub' && (
              <div 
                className="absolute right-0 top-full mt-2 w-[calc(100vw-24px)] sm:w-[480px] md:w-[520px] max-w-[540px] bg-white rounded-2xl border-2 border-slate-200 shadow-2xl p-3 z-[99999] transition-all"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  zIndex: 99999,
                  height: 'auto',
                  minHeight: 'fit-content',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.12)'
                }}
                onMouseEnter={() => handleMouseEnter('hub')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-600">
                      Pedagogical Audience &amp; Framework
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
                    Session 2026-27
                  </span>
                </div>

                <div className="space-y-2 p-0.5">
                  {hubDropdownItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item.href);
                      }}
                      className="w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left bg-slate-50/70 hover:bg-indigo-50/90 border border-slate-200/60 hover:border-indigo-300 transition-all duration-150 group cursor-pointer shadow-2xs"
                    >
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs border border-white"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-[13px] font-extrabold text-slate-800 group-hover:text-indigo-700 transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5 group-hover:text-slate-600">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Footer Quick Action */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-[11px]">
                  <span className="text-slate-400 font-medium">Curriculum Standards &amp; Demonstration Guide</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick('#pedagogical-hub');
                    }}
                    className="font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                  >
                    Open Pedagogical Hub &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Link 4: Developer & Contact */}
          <button
            type="button"
            onClick={() => handleItemClick('#developer')}
            className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold text-slate-800 hover:text-emerald-600 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Go to Developer & Contact Section"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="hidden md:inline">Developer &amp; Contact</span>
            <span className="md:hidden">Contact</span>
          </button>

          {/* Link 5: Explore All Labs Grid */}
          <button
            type="button"
            onClick={() => handleItemClick('#catalog', 'All Simulations')}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 hover:text-sky-800 border border-sky-200 transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
            title="Explore Full STEM Labs Catalog Grid"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Explore All Labs</span>
          </button>
        </nav>

      </div>
    </header>
  );
};

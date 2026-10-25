import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  Home, 
  Layers, 
  BookOpen, 
  UserCheck
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

export const TopNavbar: React.FC<TopNavbarProps> = ({
  totalSimulations = SIMULATIONS_LIST.length,
  onBackToCatalog,
  onSelectCategory
}) => {
  const [openDropdown, setOpenDropdown] = useState<'catalog' | 'hub' | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setIsPinned(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setIsPinned(false);
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
    if (isPinned) return; // If pinned by explicit user click, keep open
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 280);
  }, [isPinned]);

  const toggleDropdown = useCallback((menu: 'catalog' | 'hub') => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(prev => {
      if (prev === menu) {
        setIsPinned(false);
        return null;
      } else {
        setIsPinned(true); // Pinned by user click!
        return menu;
      }
    });
  }, []);

  const handleItemClick = useCallback((href: string, categoryKey?: string) => {
    // 1. Close dropdown immediately & unpin
    setOpenDropdown(null);
    setIsPinned(false);

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

  const getCategoryCount = (key: string) => {
    if (key === 'All Simulations') return SIMULATIONS_LIST.length;
    return SIMULATIONS_LIST.filter(s => s.category === key).length;
  };

  const stemDropdownItems = [
    { label: `All Interactive Labs (${SIMULATIONS_LIST.length})`, categoryKey: 'All Simulations' },
    { label: `Physics & Mechanics (${getCategoryCount('Physics & Motion')})`, categoryKey: 'Physics & Motion' },
    { label: `Chemistry & Matter (${getCategoryCount('Chemistry & Matter')})`, categoryKey: 'Chemistry & Matter' },
    { label: `Biology & Genetics (${getCategoryCount('Biology & Life')})`, categoryKey: 'Biology & Life' },
    { label: `Earth & Solar System (${getCategoryCount('Earth & Space')})`, categoryKey: 'Earth & Space' },
    { label: `Mathematics & Logic (${getCategoryCount('Mathematics & Logic')})`, categoryKey: 'Mathematics & Logic' },
    { label: `Computer Science & IT (${getCategoryCount('Computer Science & IT')})`, categoryKey: 'Computer Science & IT' },
    { label: `English & Grammar (${getCategoryCount('English & Grammar')})`, categoryKey: 'English & Grammar' },
    { label: `Early Childhood Care & Education (ECCE) (${getCategoryCount('Early Childhood (ECCE)')})`, categoryKey: 'Early Childhood (ECCE)' },
    { label: `Urdu & Linguistics (${getCategoryCount('Urdu & Linguistics')})`, categoryKey: 'Urdu & Linguistics' },
  ];

  const hubDropdownItems = [
    { label: 'For Teachers & Educators', href: '#pedagogical-hub' },
    { label: 'For Students & Learners', href: '#pedagogical-hub' },
    { label: 'Curriculum Standards & Demonstration Guide', href: '#pedagogical-hub' },
    { label: 'Academic Research & Pedagogy', href: '#pedagogical-hub' },
  ];

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[99999] border-b-2 border-slate-300 bg-white transition-all select-none shadow-sm"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 99999,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
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

          {/* Link 2: STEM Catalog ({totalSimulations}) */}
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
                  ? 'text-slate-900 bg-slate-100 ring-1 ring-slate-300' 
                  : 'text-slate-800 hover:text-sky-600 hover:bg-slate-100'
              }`}
              aria-expanded={openDropdown === 'catalog'}
              aria-haspopup="true"
              title="Browse Full STEM Catalog by Discipline"
            >
              <Layers className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>STEM Catalog ({totalSimulations})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openDropdown === 'catalog' ? 'rotate-180 text-slate-800' : 'text-slate-400'}`} />
            </button>

            {/* Lime-Green Dropdown Panel exactly matching screenshot */}
            {openDropdown === 'catalog' && (
              <div 
                className="absolute left-0 top-full pt-1.5 z-[99999]"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 99999
                }}
                onMouseEnter={() => handleMouseEnter('catalog')}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="w-[295px] sm:w-[330px] rounded-xl overflow-hidden select-none"
                  style={{
                    backgroundColor: '#86eb16',
                    border: '1.5px solid #6ec40d',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.35)',
                    maxHeight: 'calc(100vh - 75px)',
                    overflowY: 'auto'
                  }}
                >
                  {/* Dropdown Header */}
                  <div 
                    className="px-4 py-2.5 text-[11px] font-bold text-slate-900 tracking-wider uppercase"
                    style={{ borderBottom: '1px solid #6ec40d' }}
                  >
                    STEM DISCIPLINES &amp; LABORATORIES
                  </div>

                  {/* Vertical List of Disciplines */}
                  <div className="flex flex-col">
                    {stemDropdownItems.map((item, idx) => {
                      const isLast = idx === stemDropdownItems.length - 1;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick('#catalog', item.categoryKey);
                          }}
                          className="w-full text-left px-4 py-3 text-[15px] font-semibold text-slate-900 hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
                          style={{
                            borderBottom: !isLast ? '1px solid #6ec40d' : 'none'
                          }}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Link 3: Educators & Students Hub */}
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
                  ? 'text-slate-900 bg-slate-100 ring-1 ring-slate-300' 
                  : 'text-slate-800 hover:text-indigo-600 hover:bg-slate-100'
              }`}
              aria-expanded={openDropdown === 'hub'}
              aria-haspopup="true"
              title="Pedagogical Audience & Standards"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="hidden sm:inline">Educators &amp; Students Hub</span>
              <span className="sm:hidden">Hub</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openDropdown === 'hub' ? 'rotate-180 text-slate-800' : 'text-slate-400'}`} />
            </button>

            {/* Lime-Green Dropdown Panel exactly matching screenshot */}
            {openDropdown === 'hub' && (
              <div 
                className="absolute left-0 top-full pt-1.5 z-[99999]"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 99999
                }}
                onMouseEnter={() => handleMouseEnter('hub')}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="w-[320px] sm:w-[350px] rounded-xl overflow-hidden select-none"
                  style={{
                    backgroundColor: '#86eb16',
                    border: '1.5px solid #6ec40d',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.35)'
                  }}
                >
                  {/* Dropdown Header */}
                  <div 
                    className="px-4 py-2.5 text-[11px] font-bold text-slate-900 tracking-wider uppercase"
                    style={{ borderBottom: '1px solid #6ec40d' }}
                  >
                    PEDAGOGICAL AUDIENCE &amp; FRAMEWORK
                  </div>

                  {/* Vertical List of Hub Items */}
                  <div className="flex flex-col">
                    {hubDropdownItems.map((item, idx) => {
                      const isLast = idx === hubDropdownItems.length - 1;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(item.href);
                          }}
                          className="w-full text-left px-4 py-3 sm:py-3.5 text-[15px] font-semibold text-slate-900 hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
                          style={{
                            borderBottom: !isLast ? '1px solid #6ec40d' : 'none'
                          }}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
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

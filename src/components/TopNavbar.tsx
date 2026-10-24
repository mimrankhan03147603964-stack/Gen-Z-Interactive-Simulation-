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
  color?: string;
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
    }, 220);
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

  const catalogDropdownItems: DropdownItem[] = [
    { label: `All Interactive Labs (${totalSimulations})`, href: '#catalog', desc: `Browse the full ${totalSimulations}-simulation STEM catalog`, categoryKey: 'All Simulations', color: '#2563eb' },
    { label: 'Physics & Motion', href: '#catalog', desc: 'Classical mechanics, optics, gravitation & waves', categoryKey: 'Physics & Motion', color: '#0284c7' },
    { label: 'Chemistry & Matter', href: '#catalog', desc: 'Molecular structures, gas laws & reactions', categoryKey: 'Chemistry & Matter', color: '#9333ea' },
    { label: 'Biology & Living Systems', href: '#catalog', desc: 'Genetics, physiology, photosynthesis & cells', categoryKey: 'Biology & Life', color: '#16a34a' },
    { label: 'Earth & Space Exploration', href: '#catalog', desc: 'Planetary orbits, astrophysics & Earth systems', categoryKey: 'Earth & Space', color: '#0d9488' },
    { label: 'Mathematics & Logic', href: '#catalog', desc: 'Calculus, trigonometry, geometry & graphs', categoryKey: 'Mathematics & Logic', color: '#ea580c' },
    { label: 'Computer Science & IT', href: '#catalog', desc: 'Binary logic, logic gates & computer architecture', categoryKey: 'Computer Science & IT', color: '#0e7490' },
    { label: 'Early Childhood (ECCE)', href: '#catalog', desc: 'Foundational tactile STEM learning areas', categoryKey: 'Early Childhood (ECCE)', color: '#db2777' },
    { label: 'Urdu & Linguistics', href: '#catalog', desc: 'Phonetics, script & language mechanics', categoryKey: 'Urdu & Linguistics', color: '#b91c1c' },
  ];

  const hubDropdownItems: DropdownItem[] = [
    { label: 'For Teachers & Educators', href: '#pedagogical-hub', desc: 'Smart classroom & 4K projector-ready demonstrations', color: '#2563eb' },
    { label: 'For Students & Young Scientists', href: '#pedagogical-hub', desc: 'Open sandbox for self-paced scientific discovery', color: '#10b981' },
    { label: 'National Curriculum of Pakistan', href: '#features', desc: 'Aligned with official SLOs (Session 2026-27)', color: '#f59e0b' },
    { label: 'Digital Laboratory Architecture', href: '#features', desc: 'Browser-based 60 FPS computational simulation engine', color: '#6366f1' },
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

          {/* Link 2: STEM Catalog ({totalSimulations}) with Dropdown Menu */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('catalog')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('catalog')}
              className={`inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                openDropdown === 'catalog' 
                  ? 'text-sky-700 bg-sky-50 ring-2 ring-sky-300' 
                  : 'text-slate-800 hover:text-sky-600 hover:bg-slate-100'
              }`}
              aria-expanded={openDropdown === 'catalog'}
              aria-haspopup="true"
              title="Browse STEM Catalog by Discipline"
            >
              <Layers className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>STEM Catalog ({totalSimulations})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openDropdown === 'catalog' ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
            </button>

            {/* Floating Dropdown Panel (z-[10000], sits above fixed navbar and content) */}
            {openDropdown === 'catalog' && (
              <div 
                className="absolute right-0 top-full mt-1.5 w-72 sm:w-80 md:w-88 bg-white rounded-2xl border-2 border-slate-200 shadow-2xl p-2 z-[10000] transition-all"
                style={{
                  zIndex: 10000,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={() => handleMouseEnter('catalog')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-100 mb-1">
                  <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-500">
                    STEM Disciplines &amp; Catalog
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                    {totalSimulations} Labs
                  </span>
                </div>

                <div className="max-h-[380px] overflow-y-auto scrollbar-thin py-0.5 space-y-0.5">
                  {catalogDropdownItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleItemClick(item.href, item.categoryKey)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-sky-50 transition-colors group cursor-pointer border border-transparent hover:border-sky-200"
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" 
                        style={{ backgroundColor: item.color || '#0284c7' }} 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-sky-700 transition-colors flex items-center justify-between">
                          <span className="truncate">{item.label}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight truncate">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  ))}
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
              onClick={() => toggleDropdown('hub')}
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

            {/* Floating Dropdown Panel (z-[10000], sits above fixed navbar and content) */}
            {openDropdown === 'hub' && (
              <div 
                className="absolute right-0 top-full mt-1.5 w-72 sm:w-80 md:w-88 bg-white rounded-2xl border-2 border-slate-200 shadow-2xl p-2 z-[10000] transition-all"
                style={{
                  zIndex: 10000,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={() => handleMouseEnter('hub')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-100 mb-1">
                  <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-500">
                    Pedagogical Audience &amp; Framework
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                    Session 2026-27
                  </span>
                </div>

                <div className="py-1 space-y-0.5">
                  {hubDropdownItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleItemClick(item.href)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-indigo-50 transition-colors group cursor-pointer border border-transparent hover:border-indigo-200"
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" 
                        style={{ backgroundColor: item.color || '#6366f1' }} 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-indigo-700 transition-colors flex items-center justify-between">
                          <span className="truncate">{item.label}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight truncate">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  ))}
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

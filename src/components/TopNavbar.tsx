import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
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
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  totalSimulations = 74,
  onBackToCatalog
}) => {
  const [openDropdown, setOpenDropdown] = useState<'catalog' | 'hub' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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

  const handleMouseEnter = (menu: 'catalog' | 'hub') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleItemClick = (href: string) => {
    setOpenDropdown(null);
    if (href === '#' || href === '#top') {
      if (onBackToCatalog) onBackToCatalog();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const catalogDropdownItems = [
    { label: `All Interactive Labs (${totalSimulations})`, href: '#catalog', desc: 'Browse the full 74-simulation STEM catalog' },
    { label: 'Physics & Motion', href: '#catalog', desc: 'Classical mechanics, optics, gravitation & waves' },
    { label: 'Chemistry & Matter', href: '#catalog', desc: 'Molecular structures, gas laws & reactions' },
    { label: 'Biology & Living Systems', href: '#catalog', desc: 'Genetics, physiology, photosynthesis & cells' },
    { label: 'Earth & Space Exploration', href: '#catalog', desc: 'Planetary orbits, astrophysics & Earth systems' },
    { label: 'Mathematics & Logic', href: '#catalog', desc: 'Calculus, trigonometry, geometry & graphs' },
    { label: 'Computer Science & IT', href: '#catalog', desc: 'Binary logic, logic gates & computer architecture' },
    { label: 'Early Childhood (ECCE)', href: '#catalog', desc: 'Foundational tactile STEM learning areas' },
    { label: 'Urdu & Linguistics', href: '#catalog', desc: 'Phonetics, script & language mechanics' },
  ];

  const hubDropdownItems = [
    { label: 'For Teachers & Educators', href: '#pedagogical-hub', desc: 'Smart classroom & 4K projector-ready demonstrations' },
    { label: 'For Students & Young Scientists', href: '#pedagogical-hub', desc: 'Open sandbox for self-paced scientific discovery' },
    { label: 'National Curriculum of Pakistan', href: '#features', desc: 'Aligned with official SLOs (Session 2026-27)' },
    { label: 'Digital Laboratory Architecture', href: '#features', desc: 'Browser-based 60 FPS computational simulation engine' },
  ];

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-slate-200 transition-all select-none bg-white" 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50,
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="max-w-[1720px] 2xl:max-w-[1820px] mx-auto px-4 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-3 flex-nowrap">
        
        {/* Left: Official Rectangular Logo & Portal Subtitle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* GZ Monogram Logo - Exact-Fit Box Tightly Shrink-Wrapped around Logo */}
          <div 
            onClick={() => {
              if (onBackToCatalog) onBackToCatalog();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center shrink-0 rounded-lg overflow-hidden border-2 border-sky-500 bg-[#240854] shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-150 hover:scale-105 cursor-pointer"
            style={{ width: 'fit-content', height: 'auto', padding: '0px', borderRadius: '8px' }}
            title="Gen Z Interactive Simulations Home"
          >
            <img 
              src="/genz-official-logo.png" 
              alt="Gen Z Interactive Simulations Official Logo" 
              className="block select-none pointer-events-none rounded-md" 
              style={{ display: 'block', maxHeight: '38px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div className="hidden sm:block shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-tight text-slate-900 font-heading">
                DIGITAL LABORATORY PORTAL
              </span>
              <span 
                className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black text-white shadow-xs"
                style={{ backgroundColor: '#0284c7', border: '1px solid #0369a1', color: '#ffffff' }}
              >
                4K UHD
              </span>
            </div>
            <div className="text-[11px] font-semibold flex items-center gap-1.5 flex-wrap mt-0.5">
              <span className="font-extrabold text-blue-700">{totalSimulations} Verified Interactive Simulations</span>
              <span className="text-slate-400 font-bold">&bull;</span>
              <span 
                className="px-2 py-0.5 rounded-full text-[10px] font-extrabold text-white shadow-xs"
                style={{ backgroundColor: '#059669', border: '1px solid #047857', color: '#ffffff' }}
              >
                National Curriculum of Pakistan (Session 2026-27)
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items strictly in ONE single horizontal line side-by-side */}
        <nav 
          ref={navRef}
          className="flex flex-row items-center justify-end shrink-0 max-w-[calc(100vw-65px)] sm:max-w-none overflow-x-auto scrollbar-none"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Link 1: Home */}
          <button
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              if (onBackToCatalog) onBackToCatalog();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="rounded-lg font-semibold text-[#0f172a] hover:text-[#0284c7] hover:bg-slate-100 transition-colors duration-150 cursor-pointer shrink-0"
            style={{
              padding: '6px 10px',
              fontSize: '13px',
              whiteSpace: 'nowrap'
            }}
          >
            Home
          </button>

          {/* Link 2: STEM Catalog ({totalSimulations}) with Dropdown Menu */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('catalog')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setOpenDropdown(prev => prev === 'catalog' ? null : 'catalog')}
              className={`inline-flex items-center gap-1 rounded-lg font-semibold transition-colors duration-150 cursor-pointer shrink-0 ${
                openDropdown === 'catalog' 
                  ? 'text-[#0284c7] bg-slate-100' 
                  : 'text-[#0f172a] hover:text-[#0284c7] hover:bg-slate-100'
              }`}
              style={{
                padding: '6px 10px',
                fontSize: '13px',
                whiteSpace: 'nowrap'
              }}
              aria-expanded={openDropdown === 'catalog'}
            >
              <span>STEM Catalog ({totalSimulations})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'catalog' ? 'rotate-180 text-[#0284c7]' : 'text-slate-500'}`} />
            </button>

            {/* Floating Dropdown Panel */}
            {openDropdown === 'catalog' && (
              <div 
                className="absolute right-0 sm:left-0 top-full mt-1.5 w-72 sm:w-80 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-[9999] transition-all"
                style={{
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  STEM Catalog Disciplines
                </div>
                <div className="max-h-[380px] overflow-y-auto scrollbar-thin py-0.5">
                  {catalogDropdownItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(item.href);
                      }}
                      className="flex flex-col px-3.5 py-2 text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-[#111827] group-hover:text-[#0284c7] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-500 leading-tight">
                        {item.desc}
                      </span>
                    </a>
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
              onClick={() => setOpenDropdown(prev => prev === 'hub' ? null : 'hub')}
              className={`inline-flex items-center gap-1 rounded-lg font-semibold transition-colors duration-150 cursor-pointer shrink-0 ${
                openDropdown === 'hub' 
                  ? 'text-[#0284c7] bg-slate-100' 
                  : 'text-[#0f172a] hover:text-[#0284c7] hover:bg-slate-100'
              }`}
              style={{
                padding: '6px 10px',
                fontSize: '13px',
                whiteSpace: 'nowrap'
              }}
              aria-expanded={openDropdown === 'hub'}
            >
              <span>Educators &amp; Students Hub</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'hub' ? 'rotate-180 text-[#0284c7]' : 'text-slate-500'}`} />
            </button>

            {/* Floating Dropdown Panel */}
            {openDropdown === 'hub' && (
              <div 
                className="absolute right-0 sm:left-0 top-full mt-1.5 w-72 sm:w-80 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-[9999] transition-all"
                style={{
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  Pedagogical Audience &amp; Standards
                </div>
                <div className="py-0.5">
                  {hubDropdownItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(item.href);
                      }}
                      className="flex flex-col px-3.5 py-2 text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-[#111827] group-hover:text-[#0284c7] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-500 leading-tight">
                        {item.desc}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Link 4: Developer & Contact */}
          <a
            href="#developer"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick('#developer');
            }}
            className="rounded-lg font-semibold text-[#0f172a] hover:text-[#0284c7] hover:bg-slate-100 transition-colors duration-150 cursor-pointer shrink-0"
            style={{
              padding: '6px 10px',
              fontSize: '13px',
              whiteSpace: 'nowrap'
            }}
          >
            Developer &amp; Contact
          </a>

          {/* Link 5: Explore All Labs Grid */}
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick('#catalog');
            }}
            className="inline-flex items-center gap-1.5 rounded-lg font-semibold text-[#0f172a] hover:text-[#0284c7] hover:bg-slate-100 transition-colors duration-150 cursor-pointer shrink-0"
            style={{
              padding: '6px 10px',
              fontSize: '13px',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>Explore All Labs Grid</span>
          </a>
        </nav>

      </div>
    </header>
  );
};

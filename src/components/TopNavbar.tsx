import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronDown 
} from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { EXTERNAL_SIMULATION_RESOURCES } from './ExternalSimulationsHub';

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
  onNavigateToExternal?: () => void;
  onNavigateToView?: (view: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  totalSimulations = SIMULATIONS_LIST.length,
  isDarkMode = false,
  onToggleTheme,
  onBackToCatalog,
  onSelectCategory,
  onNavigateToExternal,
  onNavigateToView
}) => {
  const [openDropdown, setOpenDropdown] = useState<'simulations' | 'teachersStudents' | 'platforms' | null>(null);
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

  const handleMouseEnter = useCallback((menu: 'simulations' | 'teachersStudents' | 'platforms') => {
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

  const toggleDropdown = useCallback((menu: 'simulations' | 'teachersStudents' | 'platforms') => {
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

  const handleViewNavigation = useCallback((viewKey: string) => {
    setOpenDropdown(null);
    setIsPinned(false);
    if (onNavigateToView) {
      onNavigateToView(viewKey);
    } else if (viewKey === 'home' && onBackToCatalog) {
      onBackToCatalog();
    } else if (viewKey === 'catalog' && onSelectCategory) {
      onSelectCategory('All Simulations');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [onNavigateToView, onBackToCatalog, onSelectCategory]);

  const handleItemClick = useCallback((href: string, categoryKey?: string) => {
    // 1. Close dropdown immediately & unpin
    setOpenDropdown(null);
    setIsPinned(false);

    // 2. Filter category if specified
    if (categoryKey && onSelectCategory) {
      onSelectCategory(categoryKey);
      if (onNavigateToView) {
        onNavigateToView('catalog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // 3. Handle Top / Home navigation
    if (href === '#' || href === '#top') {
      if (onNavigateToView) {
        onNavigateToView('home');
      } else if (onBackToCatalog) {
        onBackToCatalog();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Handle Developer & Contact navigation
    if (href === '#developer') {
      if (onNavigateToView) {
        onNavigateToView('home');
      }
      setTimeout(() => {
        const el = document.getElementById('developer');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    // Handle External Simulations Hub navigation
    if (href === '#external-simulations') {
      if (onNavigateToView) {
        onNavigateToView('external-sims');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (onNavigateToExternal) {
        onNavigateToExternal();
        return;
      }
    }

    // Handle catalog navigation
    if (href === '#catalog') {
      if (onNavigateToView) {
        onNavigateToView('catalog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // 4. Smooth scroll to target section with sticky/fixed navbar offset consideration
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [onBackToCatalog, onSelectCategory, onNavigateToExternal, onNavigateToView]);

  const getCategoryCount = (key: string) => {
    if (key === 'All Simulations') return SIMULATIONS_LIST.length;
    return SIMULATIONS_LIST.filter(s => s.category === key).length;
  };

  // Menu 1: Simulations dropdown items (All 109 Labs + 9 subject disciplines)
  const simulationsDropdownItems = [
    { label: `All Simulations (${SIMULATIONS_LIST.length})`, categoryKey: 'All Simulations' },
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

  // Menu 2: Teachers & Students dropdown items (Merged Educators Hub + Portal Info, no duplicates)
  const teachersStudentsDropdownItems = [
    { label: 'For Teachers & Educators', viewKey: 'teachers' },
    { label: 'For Students & Young Scientists', viewKey: 'students' },
    { label: 'Academic Research & Pedagogy', viewKey: 'pedagogical-hub' },
    { 
      label: 'NNCP-2026', 
      href: 'https://ncc.gov.pk/Detail/NGE4MWMwY2UtY2FlMS00YWY5LTkzYWMtNDBhN2MyYzVjNDUy',
      isExternal: true 
    },
    { label: 'Portal Highlights (4 Pillars)', viewKey: 'portal-highlights' },
    { label: 'STEM Educational Website Capabilities', viewKey: 'capabilities' },
    { label: 'Portal Statistics & Metrics', viewKey: 'stats' },
  ];

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[99999] transition-all select-none shadow-md box-border"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 99999,
        backgroundColor: '#1B2A5C',
        borderBottom: '1.5px solid #F5A623',
        boxShadow: '0 4px 20px rgba(27, 42, 92, 0.45)'
      }}
    >
      <div 
        className="w-full mx-auto px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 h-14 flex items-center justify-between gap-2 sm:gap-3 flex-nowrap box-border"
        style={{
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap'
        }}
      >
        
        {/* Left: Official Rectangular Logo & Portal Subtitle - Exact original branding */}
        <div 
          onClick={() => handleItemClick('#top')}
          className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 cursor-pointer group min-w-0"
          title="Gen Z Interactive Simulations Home"
        >
          {/* GZ Monogram Logo Container */}
          <div 
            className="inline-flex items-center justify-center shrink-0 rounded-lg overflow-hidden border border-[#DDE5F3]/30 bg-transparent shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-all duration-150 group-hover:scale-105"
            style={{ width: 'fit-content', height: 'auto', padding: '0px', borderRadius: '7px' }}
          >
            <img 
              src="/genz-official-logo.png" 
              alt="Gen Z Interactive Simulations Official Logo" 
              className="block select-none pointer-events-none rounded-md h-[28px] sm:h-[30px] xl:h-[34px]" 
              style={{ display: 'block', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div className="hidden sm:block shrink min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-[10px] md:text-[10.5px] lg:text-[11px] xl:text-xs font-black tracking-tight text-white font-heading group-hover:text-[#F5A623] transition-colors whitespace-nowrap">
                DIGITAL LABORATORY PORTAL
              </span>
              <span 
                className="px-1 py-0.2 rounded-full text-[8.5px] xl:text-[9px] font-mono font-black shadow-2xs whitespace-nowrap shrink-0"
                style={{ backgroundColor: '#F5A623', border: '1px solid #E58E0A', color: '#1B2A5C' }}
              >
                4K UHD
              </span>
            </div>
            <div className="text-[9.5px] md:text-[10px] lg:text-[10.5px] xl:text-[11px] font-semibold flex items-center gap-1 sm:gap-1.5 flex-nowrap mt-0.5 whitespace-nowrap">
              <span className="font-extrabold text-[#F5A623]">{totalSimulations} Verified Labs</span>
              <span className="hidden 2xl:inline text-[#DDE5F3]/40 font-bold">&bull;</span>
              <span 
                className="hidden 2xl:inline-block px-1.5 py-0.2 rounded-full text-[9px] font-extrabold shadow-2xs whitespace-nowrap"
                style={{ backgroundColor: '#1546A8', border: '1px solid #F5A623', color: '#DBE4F7' }}
              >
                NCP Aligned (Session 2026-27)
              </span>
            </div>
          </div>
        </div>

        {/* Right Navigation: EXACTLY FIVE buttons on a single horizontal line for laptop & desktop */}
        <nav 
          className="flex flex-row items-center justify-end gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 xl:gap-4 shrink-0 flex-nowrap whitespace-nowrap min-w-0"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexWrap: 'nowrap',
            position: 'relative'
          }}
        >
          {/* Button 1: Home */}
          <button
            type="button"
            onClick={() => handleItemClick('#top')}
            className="inline-flex items-center px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1.5 text-xs sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] xl:text-sm font-bold text-white hover:text-[#F5A623] transition-colors whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 shadow-none outline-none"
            title="Return to Home Portal"
          >
            <span>Home</span>
          </button>

          {/* Button 2: Simulations (Dropdown with arrow) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('simulations')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('simulations');
              }}
              className="inline-flex items-center gap-1 px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1.5 text-xs sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] xl:text-sm font-bold text-white hover:text-[#F5A623] transition-colors whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 shadow-none outline-none"
              aria-expanded={openDropdown === 'simulations'}
              aria-haspopup="true"
              title="Browse All Simulations by Subject"
            >
              <span>Simulations</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 shrink-0 ${openDropdown === 'simulations' ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel: SIMULATIONS BY SUBJECT */}
            {openDropdown === 'simulations' && (
              <div 
                className="absolute left-0 top-full pt-1.5 z-[99999]"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 99999
                }}
                onMouseEnter={() => handleMouseEnter('simulations')}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="w-[290px] sm:w-[325px] max-w-[calc(100vw-24px)] rounded-xl overflow-hidden select-none border shadow-2xl"
                  style={{
                    backgroundColor: '#1B2A5C',
                    border: '1.5px solid #F5A623',
                    boxShadow: '0 20px 45px rgba(27, 42, 92, 0.7)',
                    maxHeight: 'calc(100vh - 75px)',
                    overflowY: 'auto'
                  }}
                >
                  {/* Dropdown Header */}
                  <div 
                    className="px-4 py-2.5 text-[11px] font-bold text-[#DBE4F7] tracking-wider uppercase text-center"
                    style={{ backgroundColor: '#1546A8', borderBottom: '1px solid #F5A623' }}
                  >
                    SIMULATIONS BY SUBJECT
                  </div>

                  {/* Vertical List of Disciplines */}
                  <div className="flex flex-col">
                    {simulationsDropdownItems.map((item, idx) => {
                      const isLast = idx === simulationsDropdownItems.length - 1;
                      const isFirst = idx === 0;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick('#catalog', item.categoryKey);
                          }}
                          className={`w-full text-center px-4 py-3 text-[13.5px] sm:text-[14px] transition-colors cursor-pointer flex items-center justify-center ${
                            isFirst 
                              ? 'font-bold text-[#F5A623] hover:bg-[#1546A8] hover:text-white' 
                              : 'font-semibold text-[#DBE4F7] hover:bg-[#1546A8] hover:text-white'
                          } active:bg-[#1B2A5C]`}
                          style={{
                            borderBottom: !isLast ? '1px solid rgba(221, 229, 243, 0.2)' : 'none'
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

          {/* Button 3: Teachers & Students (Dropdown with arrow) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('teachersStudents')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('teachersStudents');
              }}
              className="inline-flex items-center gap-1 px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1.5 text-xs sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] xl:text-sm font-bold text-white hover:text-[#F5A623] transition-colors whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 shadow-none outline-none"
              aria-expanded={openDropdown === 'teachersStudents'}
              aria-haspopup="true"
              title="Resources for Teachers and Students"
            >
              <span>Teachers &amp; Students</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 shrink-0 ${openDropdown === 'teachersStudents' ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel: TEACHING & LEARNING RESOURCES */}
            {openDropdown === 'teachersStudents' && (
              <div 
                className="absolute left-0 top-full pt-1.5 z-[99999]"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 99999
                }}
                onMouseEnter={() => handleMouseEnter('teachersStudents')}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="w-[300px] sm:w-[340px] max-w-[calc(100vw-24px)] rounded-xl overflow-hidden select-none border shadow-2xl"
                  style={{
                    backgroundColor: '#1B2A5C',
                    border: '1.5px solid #F5A623',
                    boxShadow: '0 20px 45px rgba(27, 42, 92, 0.7)',
                    maxHeight: 'calc(100vh - 75px)',
                    overflowY: 'auto'
                  }}
                >
                  {/* Dropdown Header */}
                  <div 
                    className="px-4 py-2.5 text-[11px] font-bold text-[#DBE4F7] tracking-wider uppercase text-center"
                    style={{ backgroundColor: '#1546A8', borderBottom: '1px solid #F5A623' }}
                  >
                    TEACHING &amp; LEARNING RESOURCES
                  </div>

                  {/* Vertical List of Merged Items without duplicates */}
                  <div className="flex flex-col">
                    {teachersStudentsDropdownItems.map((item, idx) => {
                      const isLast = idx === teachersStudentsDropdownItems.length - 1;
                      if (item.isExternal) {
                        return (
                          <a
                            key={idx}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsPinned(false);
                            }}
                            className="w-full text-center px-4 py-3 sm:py-3.5 text-[13.5px] sm:text-[14px] font-semibold text-[#DBE4F7] hover:bg-[#1546A8] hover:text-white active:bg-[#1B2A5C] transition-colors cursor-pointer flex items-center justify-center no-underline"
                            style={{
                              borderBottom: !isLast ? '1px solid rgba(221, 229, 243, 0.2)' : 'none'
                            }}
                          >
                            <span>{item.label}</span>
                          </a>
                        );
                      }
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.viewKey) {
                              handleViewNavigation(item.viewKey);
                            }
                          }}
                          className="w-full text-center px-4 py-3 sm:py-3.5 text-[13.5px] sm:text-[14px] font-semibold text-[#DBE4F7] hover:bg-[#1546A8] hover:text-white active:bg-[#1B2A5C] transition-colors cursor-pointer flex items-center justify-center"
                          style={{
                            borderBottom: !isLast ? '1px solid rgba(221, 229, 243, 0.2)' : 'none'
                          }}
                        >
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Button 4: Online Platforms (Dropdown with arrow) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('platforms')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('platforms');
              }}
              className="inline-flex items-center gap-1 px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1.5 text-xs sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] xl:text-sm font-bold text-white hover:text-[#F5A623] transition-colors whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 shadow-none outline-none"
              aria-expanded={openDropdown === 'platforms'}
              aria-haspopup="true"
              title="Explore Trusted Online Simulation Platforms"
            >
              <span>Online Platforms</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 shrink-0 ${openDropdown === 'platforms' ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel: EXTERNAL SIMULATION PLATFORMS */}
            {openDropdown === 'platforms' && (
              <div 
                className="absolute right-0 top-full pt-1.5 z-[99999]"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  zIndex: 99999
                }}
                onMouseEnter={() => handleMouseEnter('platforms')}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="w-[290px] sm:w-[330px] max-w-[calc(100vw-24px)] rounded-xl overflow-hidden select-none border shadow-2xl"
                  style={{
                    backgroundColor: '#1B2A5C',
                    border: '1.5px solid #F5A623',
                    boxShadow: '0 20px 45px rgba(27, 42, 92, 0.7)',
                    maxHeight: 'calc(100vh - 75px)',
                    overflowY: 'auto'
                  }}
                >
                  {/* Dropdown Header */}
                  <div 
                    className="px-4 py-2.5 text-[11px] font-bold text-[#DBE4F7] tracking-wider uppercase text-center"
                    style={{ backgroundColor: '#1546A8', borderBottom: '1px solid #F5A623' }}
                  >
                    EXTERNAL SIMULATION PLATFORMS
                  </div>

                  {/* Vertical List of External Simulation Websites */}
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewNavigation('external-sims');
                      }}
                      className="w-full text-center px-4 py-3 text-[13.5px] sm:text-[14px] font-bold text-[#F5A623] hover:bg-[#1546A8] hover:text-white active:bg-[#1B2A5C] transition-colors cursor-pointer flex items-center justify-center border-b border-[#DDE5F3]/20"
                    >
                      <span>Simulation Hub Overview</span>
                    </button>
                    {EXTERNAL_SIMULATION_RESOURCES.map((item, idx) => {
                      const isLast = idx === EXTERNAL_SIMULATION_RESOURCES.length - 1;
                      return (
                        <a
                          key={item.id}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            setOpenDropdown(null);
                            setIsPinned(false);
                          }}
                          className="w-full text-center px-4 py-3 text-[13.5px] sm:text-[14px] font-semibold text-[#DBE4F7] hover:bg-[#1546A8] hover:text-white active:bg-[#1B2A5C] transition-colors cursor-pointer no-underline block"
                          style={{
                            borderBottom: !isLast ? '1px solid rgba(221, 229, 243, 0.2)' : 'none'
                          }}
                        >
                          {item.title}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Button 5: Contact (Plain button, no dropdown, scrolls to #developer) */}
          <button
            type="button"
            onClick={() => handleItemClick('#developer')}
            className="inline-flex items-center px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1.5 text-xs sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] xl:text-sm font-bold text-white hover:text-[#F5A623] transition-colors whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 shadow-none outline-none"
            title="Go to Developer & Contact Section"
          >
            <span>Contact</span>
          </button>
        </nav>

      </div>
    </header>
  );
};

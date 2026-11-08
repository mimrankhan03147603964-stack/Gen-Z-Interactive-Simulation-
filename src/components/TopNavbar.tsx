import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronDown,
  X,
  MessageCircle,
  Mail,
  Users,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { EXTERNAL_SIMULATION_RESOURCES } from '../data/externalSimulationsData';

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
  const [openDropdown, setOpenDropdown] = useState<'simulations' | 'teachersStudents' | 'platforms' | 'contact' | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modals for Join Our Team and Share Your Feedback
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Form states for Join Team
  const [joinName, setJoinName] = useState('');
  const [joinRole, setJoinRole] = useState('Science Teacher');
  const [joinPhone, setJoinPhone] = useState('');
  const [joinInstitution, setJoinInstitution] = useState('');
  const [joinMessage, setJoinMessage] = useState('');

  // Form states for Feedback
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('Appreciation');
  const [feedbackRole, setFeedbackRole] = useState('Teacher');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleJoinWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Application to Join Team - Gen Z Interactive Simulations*\n\n` +
      `*Name:* ${joinName || 'Not specified'}\n` +
      `*Role/Expertise:* ${joinRole}\n` +
      `*Phone/WhatsApp:* ${joinPhone || 'Not specified'}\n` +
      `*Institution/Qualification:* ${joinInstitution || 'Not specified'}\n\n` +
      `*Message:* ${joinMessage || 'I would like to contribute to the project.'}`;
    window.open(`https://wa.me/923147603964?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleJoinEmail = () => {
    const subject = `Join Team Application - ${joinName || 'Candidate'}`;
    const body = `Name: ${joinName}\nRole/Expertise: ${joinRole}\nPhone: ${joinPhone}\nInstitution/Qualification: ${joinInstitution}\n\nMessage:\n${joinMessage}`;
    window.open(`mailto:mimrankhan3964@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const handleFeedbackWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*User Feedback - Gen Z Interactive Simulations*\n\n` +
      `*Name:* ${feedbackName || 'Anonymous'}\n` +
      `*Category:* ${feedbackCategory}\n` +
      `*Role:* ${feedbackRole}\n\n` +
      `*Feedback:* ${feedbackMessage || 'Great educational platform!'}`;
    window.open(`https://wa.me/923147603964?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFeedbackEmail = () => {
    const subject = `Feedback [${feedbackCategory}] - Gen Z Interactive Simulations`;
    const body = `Name: ${feedbackName || 'Anonymous'}\nCategory: ${feedbackCategory}\nRole: ${feedbackRole}\n\nFeedback:\n${feedbackMessage}`;
    window.open(`mailto:mimrankhan3964@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

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
        setIsJoinModalOpen(false);
        setIsFeedbackModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = useCallback((menu: 'simulations' | 'teachersStudents' | 'platforms' | 'contact') => {
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

  const toggleDropdown = useCallback((menu: 'simulations' | 'teachersStudents' | 'platforms' | 'contact') => {
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

  // Menu 1: Simulations dropdown items (All Labs + 9 subject disciplines)
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
        backgroundColor: '#0F1E42',
        borderBottom: '2px solid #F5A623',
        boxShadow: '0 4px 20px rgba(5, 12, 30, 0.65)'
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

          {/* Button 5: Contact (Dropdown with arrow, exact copy of Online Platforms) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('contact')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('contact');
              }}
              className="inline-flex items-center gap-1 px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1.5 text-xs sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] xl:text-sm font-bold text-white hover:text-[#F5A623] transition-colors whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 shadow-none outline-none"
              aria-expanded={openDropdown === 'contact'}
              aria-haspopup="true"
              title="Contact the Developer, Join Our Team or Share Your Feedback"
            >
              <span>Contact</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 shrink-0 ${openDropdown === 'contact' ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel: CONTACT & COMMUNITY */}
            {openDropdown === 'contact' && (
              <div 
                className="absolute right-0 top-full pt-1.5 z-[99999]"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  zIndex: 99999
                }}
                onMouseEnter={() => handleMouseEnter('contact')}
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
                  {/* Dropdown Header: Blue header bar with an orange bottom line */}
                  <div 
                    className="px-4 py-2.5 text-[11px] font-bold text-[#DBE4F7] tracking-wider uppercase text-center"
                    style={{ backgroundColor: '#1546A8', borderBottom: '1px solid #F5A623' }}
                  >
                    CONTACT & COMMUNITY
                  </div>

                  {/* Vertical List of Items */}
                  <div className="flex flex-col">
                    {/* Item 1: About the Developer (First item: orange highlight) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(null);
                        setIsPinned(false);
                        handleItemClick('#developer');
                      }}
                      className="w-full text-center px-4 py-3 text-[13.5px] sm:text-[14px] font-bold text-[#F5A623] hover:bg-[#1546A8] hover:text-white active:bg-[#1B2A5C] transition-colors cursor-pointer flex items-center justify-center border-b border-[#DDE5F3]/20"
                    >
                      <span>About the Developer</span>
                    </button>

                    {/* Item 2: Join Our Team */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(null);
                        setIsPinned(false);
                        setIsJoinModalOpen(true);
                      }}
                      className="w-full text-center px-4 py-3 text-[13.5px] sm:text-[14px] font-semibold text-[#DBE4F7] hover:bg-[#1546A8] hover:text-white active:bg-[#1B2A5C] transition-colors cursor-pointer flex items-center justify-center border-b border-[#DDE5F3]/20"
                    >
                      <span>Join Our Team</span>
                    </button>

                    {/* Item 3: Share Your Feedback */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(null);
                        setIsPinned(false);
                        setIsFeedbackModalOpen(true);
                      }}
                      className="w-full text-center px-4 py-3 text-[13.5px] sm:text-[14px] font-semibold text-[#DBE4F7] hover:bg-[#1546A8] hover:text-white active:bg-[#1B2A5C] transition-colors cursor-pointer flex items-center justify-center"
                    >
                      <span>Share Your Feedback</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

      </div>

      {/* Modal 1: Join Our Team */}
      {isJoinModalOpen && (
        <div 
          className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none"
          onClick={() => setIsJoinModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg rounded-2xl overflow-hidden border shadow-2xl relative"
            style={{
              backgroundColor: '#1B2A5C',
              border: '2px solid #F5A623',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ backgroundColor: '#1546A8', borderBottom: '1.5px solid #F5A623' }}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#F5A623]" />
                <div>
                  <h3 className="font-heading font-black text-sm sm:text-base text-white tracking-wide">
                    Join Our STEM Team
                  </h3>
                  <p className="text-[11px] text-[#DBE4F7] font-medium">
                    Gen Z Interactive Simulations Community
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsJoinModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleJoinWhatsApp} className="p-5 space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  placeholder="e.g. Dr. Ayesha Ahmed"
                  className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#0E1F42] text-white placeholder-white/40 focus:outline-none focus:border-[#F5A623] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                    Your Role / Expertise
                  </label>
                  <select
                    value={joinRole}
                    onChange={(e) => setJoinRole(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#0E1F42] text-white focus:outline-none focus:border-[#F5A623] transition-colors"
                  >
                    <option value="Science Teacher">Science Teacher</option>
                    <option value="Physics Specialist">Physics Specialist</option>
                    <option value="Chemistry Specialist">Chemistry Specialist</option>
                    <option value="Biology Specialist">Biology Specialist</option>
                    <option value="Mathematics Teacher">Mathematics Teacher</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="3D Graphic Artist">3D Graphic Artist</option>
                    <option value="Curriculum Reviewer">Curriculum Reviewer</option>
                    <option value="Volunteer Contributor">Volunteer Contributor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={joinPhone}
                    onChange={(e) => setJoinPhone(e.target.value)}
                    placeholder="e.g. +92 314 ..."
                    className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#0E1F42] text-white placeholder-white/40 focus:outline-none focus:border-[#F5A623] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                  Institution / Qualification
                </label>
                <input
                  type="text"
                  value={joinInstitution}
                  onChange={(e) => setJoinInstitution(e.target.value)}
                  placeholder="e.g. University / College / High School"
                  className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#0E1F42] text-white placeholder-white/40 focus:outline-none focus:border-[#F5A623] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                  How Would You Like to Contribute?
                </label>
                <textarea
                  rows={2}
                  value={joinMessage}
                  onChange={(e) => setJoinMessage(e.target.value)}
                  placeholder="Briefly describe your interest or suggestions..."
                  className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#0E1F42] text-white placeholder-white/40 focus:outline-none focus:border-[#F5A623] transition-colors resize-none"
                />
              </div>

              {/* Action Buttons: WhatsApp & Email */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white text-xs sm:text-sm cursor-pointer shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: '#25D366', border: '1px solid #1EBE5D' }}
                  title="Submit via WhatsApp directly to Developer"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Send on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleJoinEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white text-xs sm:text-sm cursor-pointer shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: '#1E88E5', border: '1px solid #1565C0' }}
                  title="Submit via Gmail"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Send via Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Share Your Feedback */}
      {isFeedbackModalOpen && (
        <div 
          className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none"
          onClick={() => setIsFeedbackModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg rounded-2xl overflow-hidden border shadow-2xl relative"
            style={{
              backgroundColor: '#1B2A5C',
              border: '2px solid #F5A623',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ backgroundColor: '#1546A8', borderBottom: '1.5px solid #F5A623' }}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-[#F5A623]" />
                <div>
                  <h3 className="font-heading font-black text-sm sm:text-base text-white tracking-wide">
                    Share Your Feedback
                  </h3>
                  <p className="text-[11px] text-[#DBE4F7] font-medium">
                    Help us improve interactive STEM learning
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFeedbackWhatsApp} className="p-5 space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                    Feedback Category
                  </label>
                  <select
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#0E1F42] text-white focus:outline-none focus:border-[#F5A623] transition-colors"
                  >
                    <option value="Appreciation">Appreciation</option>
                    <option value="Feature Suggestion">Feature Suggestion</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="New Lab Request">New Lab Request</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                    Your Role
                  </label>
                  <select
                    value={feedbackRole}
                    onChange={(e) => setFeedbackRole(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#0E1F42] text-white focus:outline-none focus:border-[#F5A623] transition-colors"
                  >
                    <option value="Teacher">Teacher / Educator</option>
                    <option value="Student">Student</option>
                    <option value="School Principal">School Principal / Head</option>
                    <option value="Parent">Parent</option>
                    <option value="STEM Enthusiast">STEM Enthusiast</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  placeholder="e.g. Muhammad / Anonymous"
                  className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#0E1F42] text-white placeholder-white/40 focus:outline-none focus:border-[#F5A623] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                  Your Feedback &amp; Suggestions
                </label>
                <textarea
                  rows={3}
                  required
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Tell us what you liked or how we can make the simulations better..."
                  className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#0E1F42] text-white placeholder-white/40 focus:outline-none focus:border-[#F5A623] transition-colors resize-none"
                />
              </div>

              {/* Action Buttons: WhatsApp & Email */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white text-xs sm:text-sm cursor-pointer shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: '#25D366', border: '1px solid #1EBE5D' }}
                  title="Send Feedback via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Send on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleFeedbackEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white text-xs sm:text-sm cursor-pointer shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: '#1E88E5', border: '1px solid #1565C0' }}
                  title="Send Feedback via Email"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Send via Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

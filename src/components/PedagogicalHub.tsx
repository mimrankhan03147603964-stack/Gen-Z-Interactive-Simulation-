import React, { useState } from 'react';
import { 
  GraduationCap, 
  FlaskConical, 
  Tv, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Compass, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import {
  MultiZeroCostIcon,
  MultiFpsEngineIcon,
  MultiSafeLabIcon,
  MultiCurriculumIcon,
  MultiAllGradesIcon,
  MultiMiddleIcon
} from './ModernStemIcons';
import { ScrollReveal } from './ScrollReveal';

interface PedagogicalHubProps {
  totalSimulations?: number;
  onBrowseTeacher?: () => void;
  onLaunchStudent?: () => void;
}

export const PedagogicalHub: React.FC<PedagogicalHubProps> = ({ 
  totalSimulations = 86,
  onBrowseTeacher,
  onLaunchStudent
}) => {
  const [showTeacherDetails, setShowTeacherDetails] = useState<boolean>(false);
  const [showStudentDetails, setShowStudentDetails] = useState<boolean>(false);

  return (
    <section 
      id="pedagogical-hub"
      className="w-full max-w-none relative z-10 space-y-6 scroll-mt-24 select-none"
      style={{ width: '100%', maxWidth: '100%' }}
    >
      {/* 4 Pillars Ambient Ribbon Banner */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl border shadow-lg w-full max-w-none text-[#1B2A5C]"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#DDE5F3',
          boxShadow: '0 8px 24px rgba(27, 42, 92, 0.16)'
        }}
      >
        {/* Box 1: Zero Lab Cost (--blue) */}
        <div 
          className="flex items-center gap-3.5 p-3.5 rounded-2xl shadow-sm border transition-all hover:scale-101"
          style={{
            backgroundColor: '#EEF3F9',
            borderColor: '#DDE5F3'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DDE5F3'
            }}
          >
            <MultiZeroCostIcon className="w-5 h-5 pointer-events-none" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-tight font-heading text-[#1B2A5C]">Zero Lab Cost</div>
            <div className="text-[11px] font-semibold text-[#3B4A73]">100% Free &amp; Open Access</div>
          </div>
        </div>

        {/* Box 2: Real-Time 60 FPS Engines (--dark-blue) */}
        <div 
          className="flex items-center gap-3.5 p-3.5 rounded-2xl shadow-sm border transition-all hover:scale-101"
          style={{
            backgroundColor: '#EEF3F9',
            borderColor: '#DDE5F3'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DDE5F3'
            }}
          >
            <MultiFpsEngineIcon className="w-5 h-5 pointer-events-none" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-tight font-heading text-[#1B2A5C]">Real-Time 60 FPS Engines</div>
            <div className="text-[11px] font-semibold text-[#3B4A73]">Runs 60 FPS &amp; Physics Engine</div>
          </div>
        </div>

        {/* Box 3: Safe Chemical Labs (--red) */}
        <div 
          className="flex items-center gap-3.5 p-3.5 rounded-2xl shadow-sm border transition-all hover:scale-101"
          style={{
            backgroundColor: '#EEF3F9',
            borderColor: '#DDE5F3'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DDE5F3'
            }}
          >
            <MultiSafeLabIcon className="w-5 h-5 pointer-events-none" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-tight font-heading text-[#1B2A5C]">Safe Chemical Labs</div>
            <div className="text-[11px] font-semibold text-[#3B4A73]">Virtual Hazard-Free Labs</div>
          </div>
        </div>

        {/* Box 4: 100% Curriculum Aligned (--gold) */}
        <div 
          className="flex items-center gap-3.5 p-3.5 rounded-2xl shadow-sm border transition-all hover:scale-101"
          style={{
            backgroundColor: '#EEF3F9',
            borderColor: '#DDE5F3'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DDE5F3'
            }}
          >
            <MultiCurriculumIcon className="w-5 h-5 pointer-events-none" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-tight font-heading text-[#1B2A5C]">100% Curriculum Aligned</div>
            <div className="text-[11px] font-semibold text-[#3B4A73]">Cambridge, FBISE &amp; Oxford</div>
          </div>
        </div>
      </div>

      {/* Two Prominent Audience Cards in Sequential Palette */}
      <div 
        className="w-full max-w-none grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch"
        style={{ width: '100%' }}
      >
        
        {/* CARD 1: FOR TEACHERS & EDUCATORS (--dark-blue) */}
        <ScrollReveal direction="up" distance={24} duration={500} delay={0} className="w-full h-full flex flex-col">
          <div 
            className="w-full relative overflow-hidden rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between border shadow-xl group transition-all text-[#1B2A5C] h-full flex-1"
            style={{ 
              width: '100%',
              backgroundImage: 'url(/assets/aistudio/WhatsApp_Image_2026-10-30_at_1.11.12_PM_6d9d576b.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderColor: '#DDE5F3',
              boxShadow: '0 8px 24px rgba(27, 42, 92, 0.16)'
            }}
          >
            {/* White overlay at 60% opacity */}
            <div 
              className="absolute inset-0 pointer-events-none z-0" 
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
              aria-hidden="true"
            />
          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Title & Right Pill Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shrink-0 shadow-xs"
                  style={{
                    backgroundColor: '#EEF3F9',
                    borderColor: '#DDE5F3'
                  }}
                >
                  <MultiAllGradesIcon className="w-6 h-6 pointer-events-none" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-black tracking-normal leading-snug text-[#1565C0]">
                  For Teachers &amp; Educators
                </h3>
              </div>

              <span 
                className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 sm:px-4 sm:py-1 rounded-full border shrink-0 shadow-xs"
                style={{
                  backgroundColor: '#1546A8',
                  color: '#FFFFFF',
                  borderColor: '#2D62D1'
                }}
              >
                <span>START CLASSROOM</span>
              </span>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm font-medium leading-relaxed tracking-normal text-[#3B4A73]">
              Empower lecture hall and science classrooms, with time-tested demonstrations mapped directly to Student Learning Outcomes (SLOs). Convert abstract concepts into interactive play in seconds.
            </p>

            {/* Progressive Disclosure Toggle for Key Features */}
            <div>
              <button
                type="button"
                onClick={() => setShowTeacherDetails(!showTeacherDetails)}
                className="inline-flex items-center gap-2 text-xs font-sans font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                style={{
                  backgroundColor: '#EEF3F9',
                  border: '1px solid #DDE5F3',
                  color: '#1546A8'
                }}
              >
                <span>{showTeacherDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showTeacherDetails ? 'rotate-180' : ''}`} style={{ color: '#1546A8' }} />
              </button>

              {showTeacherDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#3B4A73'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#1546A8' }} />
                    <span><strong className="font-black text-[#1B2A5C]">4K Smartboard:</strong> High visual fidelity</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#3B4A73'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#1546A8' }} />
                    <span><strong className="font-black text-[#1B2A5C]">SLO Curriculum:</strong> National Curriculum 2026-27</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#3B4A73'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#1546A8' }} />
                    <span><strong className="font-black text-[#1B2A5C]">Theory-to-Practice:</strong> Live variable tweaking</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#3B4A73'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#1546A8' }} />
                    <span><strong className="font-black text-[#1B2A5C]">Parameter Reset:</strong> Instant test repetition</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t relative z-10" style={{ borderColor: '#DDE5F3' }}>
            <button 
              type="button"
              onClick={() => {
                if (onBrowseTeacher) {
                  onBrowseTeacher();
                } else {
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-sans font-black shadow-md border transition-all cursor-pointer active:scale-95"
              style={{
                backgroundColor: '#1546A8',
                color: '#FFFFFF',
                borderColor: '#1B2A5C'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E88E5')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1546A8')}
            >
              <SlidersHorizontal className="w-4 h-4 text-white pointer-events-none shrink-0" />
              <span>Browse Teacher Catalog</span>
            </button>
          </div>
        </div>
        </ScrollReveal>

        {/* CARD 2: FOR STUDENTS & YOUNG SCIENTISTS (--blue) */}
        <ScrollReveal direction="up" distance={24} duration={500} delay={100} className="w-full h-full flex flex-col">
          <div 
            className="w-full relative overflow-hidden rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between border shadow-xl group transition-all text-[#1B2A5C] h-full flex-1"
            style={{ 
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderColor: '#DDE5F3',
              boxShadow: '0 8px 24px rgba(27, 42, 92, 0.16)'
            }}
          >
          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Title & Right Pill Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shrink-0 shadow-xs"
                  style={{
                    backgroundColor: '#EEF3F9',
                    borderColor: '#DDE5F3'
                  }}
                >
                  <MultiMiddleIcon className="w-6 h-6 pointer-events-none" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-black tracking-normal leading-snug text-[#1565C0]">
                  For Students &amp; Young Scientists
                </h3>
              </div>

              <span 
                className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 sm:px-4 sm:py-1 rounded-full border shrink-0 shadow-xs"
                style={{
                  backgroundColor: '#1E88E5',
                  color: '#FFFFFF',
                  borderColor: '#42A5F5'
                }}
              >
                <span>HANDS-ON PRACTICE</span>
              </span>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm font-medium leading-relaxed tracking-normal text-[#3B4A73]">
              Step into an open sandbox where curiosity leads investigation. Conduct experiments, test real-world physical laws, manipulate molecular atoms, and deepen intuition through play and observation.
            </p>

            {/* Progressive Disclosure Toggle for Key Features */}
            <div>
              <button
                type="button"
                onClick={() => setShowStudentDetails(!showStudentDetails)}
                className="inline-flex items-center gap-2 text-xs font-sans font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                style={{
                  backgroundColor: '#EEF3F9',
                  border: '1px solid #DDE5F3',
                  color: '#1E88E5'
                }}
              >
                <span>{showStudentDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showStudentDetails ? 'rotate-180' : ''}`} style={{ color: '#1E88E5' }} />
              </button>

              {showStudentDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#3B4A73'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#1E88E5' }} />
                    <span><strong className="font-black text-[#1B2A5C]">Zero-Risk Sandbox:</strong> No chemical hazards</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#3B4A73'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#1E88E5' }} />
                    <span><strong className="font-black text-[#1B2A5C]">Infinite Repetitions:</strong> Free circuit wiring</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#3B4A73'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#1E88E5' }} />
                    <span><strong className="font-black text-[#1B2A5C]">Parameter Control:</strong> Adjust gravity &amp; optics</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#3B4A73'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#1E88E5' }} />
                    <span><strong className="font-black text-[#1B2A5C]">Dynamic Feedback:</strong> Live trajectory plots</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t relative z-10" style={{ borderColor: '#DDE5F3' }}>
            <button 
              type="button"
              onClick={() => {
                if (onLaunchStudent) {
                  onLaunchStudent();
                } else {
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-sans font-black shadow-md border transition-all cursor-pointer active:scale-95"
              style={{
                backgroundColor: '#1E88E5',
                color: '#FFFFFF',
                borderColor: '#1546A8'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1546A8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1E88E5')}
            >
              <FlaskConical className="w-4 h-4 pointer-events-none shrink-0 text-white" />
              <span className="text-white">Launch Experiment Labs</span>
            </button>
          </div>
        </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

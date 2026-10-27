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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl border shadow-sm bg-white w-full max-w-none text-[#001D39]"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#BDD8E9'
        }}
      >
        {/* Box 1: Zero Lab Cost */}
        <div 
          className="flex items-center gap-3.5 p-3.5 rounded-2xl shadow-2xs border transition-all hover:scale-101"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#BDD8E9'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs"
            style={{
              backgroundColor: '#BDD8E9',
              borderColor: '#6EA2B3',
              color: '#0A4174'
            }}
          >
            <Zap className="w-5 h-5 pointer-events-none" style={{ color: '#0A4174' }} />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-tight font-heading" style={{ color: '#001D39' }}>Zero Lab Cost</div>
            <div className="text-[11px] font-semibold" style={{ color: '#49769F' }}>100% Free &amp; Open Access</div>
          </div>
        </div>

        {/* Box 2: Real-Time 60 FPS Engines */}
        <div 
          className="flex items-center gap-3.5 p-3.5 rounded-2xl shadow-2xs border transition-all hover:scale-101"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#BDD8E9'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs"
            style={{
              backgroundColor: '#BDD8E9',
              borderColor: '#6EA2B3',
              color: '#0A4174'
            }}
          >
            <Cpu className="w-5 h-5 pointer-events-none" style={{ color: '#0A4174' }} />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-tight font-heading" style={{ color: '#001D39' }}>Real-Time 60 FPS Engines</div>
            <div className="text-[11px] font-semibold" style={{ color: '#49769F' }}>Runs 60 FPS &amp; Physics Engine</div>
          </div>
        </div>

        {/* Box 3: Safe Chemical Labs */}
        <div 
          className="flex items-center gap-3.5 p-3.5 rounded-2xl shadow-2xs border transition-all hover:scale-101"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#BDD8E9'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs"
            style={{
              backgroundColor: '#BDD8E9',
              borderColor: '#6EA2B3',
              color: '#0A4174'
            }}
          >
            <FlaskConical className="w-5 h-5 pointer-events-none" style={{ color: '#0A4174' }} />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-tight font-heading" style={{ color: '#001D39' }}>Safe Chemical Labs</div>
            <div className="text-[11px] font-semibold" style={{ color: '#49769F' }}>Virtual Hazard-Free Labs</div>
          </div>
        </div>

        {/* Box 4: 100% Curriculum Aligned */}
        <div 
          className="flex items-center gap-3.5 p-3.5 rounded-2xl shadow-2xs border transition-all hover:scale-101"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#BDD8E9'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs"
            style={{
              backgroundColor: '#BDD8E9',
              borderColor: '#6EA2B3',
              color: '#0A4174'
            }}
          >
            <ShieldCheck className="w-5 h-5 pointer-events-none" style={{ color: '#0A4174' }} />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-tight font-heading" style={{ color: '#001D39' }}>100% Curriculum Aligned</div>
            <div className="text-[11px] font-semibold" style={{ color: '#49769F' }}>Cambridge, FBISE &amp; Oxford</div>
          </div>
        </div>
      </div>

      {/* Two Prominent Audience Cards in Clean Educational Palette */}
      <div 
        className="w-full max-w-none grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch"
        style={{ width: '100%' }}
      >
        
        {/* CARD 1: FOR TEACHERS & EDUCATORS */}
        <div 
          className="w-full relative overflow-hidden rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between border shadow-sm group transition-all"
          style={{ 
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderColor: '#BDD8E9'
          }}
        >
          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Title & Right Pill Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shrink-0 shadow-2xs"
                  style={{
                    backgroundColor: '#BDD8E9',
                    borderColor: '#6EA2B3'
                  }}
                >
                  <GraduationCap className="w-6 h-6 pointer-events-none" style={{ color: '#0A4174' }} />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-black tracking-normal leading-snug" style={{ color: '#001D39' }}>
                  For Teachers &amp; Educators
                </h3>
              </div>

              <span 
                className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 sm:px-4 sm:py-1 rounded-full border shrink-0"
                style={{
                  backgroundColor: '#BDD8E9',
                  color: '#001D39',
                  borderColor: '#6EA2B3'
                }}
              >
                <span>START CLASSROOM</span>
              </span>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm font-medium leading-relaxed tracking-normal" style={{ color: '#49769F' }}>
              Empower lecture hall and science classrooms, with time-tested demonstrations mapped directly to Student Learning Outcomes (SLOs). Convert abstract concepts into interactive play in seconds.
            </p>

            {/* Progressive Disclosure Toggle for Key Features */}
            <div>
              <button
                type="button"
                onClick={() => setShowTeacherDetails(!showTeacherDetails)}
                className="inline-flex items-center gap-2 text-xs font-sans font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #BDD8E9',
                  color: '#001D39'
                }}
              >
                <span>{showTeacherDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showTeacherDetails ? 'rotate-180' : ''}`} style={{ color: '#0A4174' }} />
              </button>

              {showTeacherDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#BDD8E9/25',
                      borderColor: '#BDD8E9',
                      color: '#49769F'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#4E8EA2' }} />
                    <span><strong className="font-black" style={{ color: '#001D39' }}>4K Smartboard:</strong> High visual fidelity</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#BDD8E9/25',
                      borderColor: '#BDD8E9',
                      color: '#49769F'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#4E8EA2' }} />
                    <span><strong className="font-black" style={{ color: '#001D39' }}>SLO Curriculum:</strong> National Curriculum 2026-27</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#BDD8E9/25',
                      borderColor: '#BDD8E9',
                      color: '#49769F'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#4E8EA2' }} />
                    <span><strong className="font-black" style={{ color: '#001D39' }}>Theory-to-Practice:</strong> Live variable tweaking</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#BDD8E9/25',
                      borderColor: '#BDD8E9',
                      color: '#49769F'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#4E8EA2' }} />
                    <span><strong className="font-black" style={{ color: '#001D39' }}>Parameter Reset:</strong> Instant test repetition</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t relative z-10" style={{ borderColor: '#BDD8E9' }}>
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
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-sans font-bold shadow-sm border transition-all cursor-pointer active:scale-95 hover:brightness-105"
              style={{
                backgroundColor: '#0A4174',
                color: '#FFFFFF',
                borderColor: '#001D39'
              }}
            >
              <SlidersHorizontal className="w-4 h-4 text-white pointer-events-none shrink-0" />
              <span>Browse Teacher Catalog</span>
            </button>
          </div>
        </div>

        {/* CARD 2: FOR STUDENTS & YOUNG SCIENTISTS */}
        <div 
          className="w-full relative overflow-hidden rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between border shadow-sm group transition-all"
          style={{ 
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderColor: '#BDD8E9'
          }}
        >
          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Title & Right Pill Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shrink-0 shadow-2xs"
                  style={{
                    backgroundColor: '#BDD8E9',
                    borderColor: '#6EA2B3'
                  }}
                >
                  <Compass className="w-6 h-6 pointer-events-none" style={{ color: '#0A4174' }} />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-black tracking-normal leading-snug" style={{ color: '#001D39' }}>
                  For Students &amp; Young Scientists
                </h3>
              </div>

              <span 
                className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 sm:px-4 sm:py-1 rounded-full border shrink-0"
                style={{
                  backgroundColor: '#BDD8E9',
                  color: '#001D39',
                  borderColor: '#6EA2B3'
                }}
              >
                <span>HANDS-ON PRACTICE</span>
              </span>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm font-medium leading-relaxed tracking-normal" style={{ color: '#49769F' }}>
              Step into an open sandbox where curiosity leads investigation. Conduct experiments, test real-world physical laws, manipulate molecular atoms, and deepen intuition through play and observation.
            </p>

            {/* Progressive Disclosure Toggle for Key Features */}
            <div>
              <button
                type="button"
                onClick={() => setShowStudentDetails(!showStudentDetails)}
                className="inline-flex items-center gap-2 text-xs font-sans font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #BDD8E9',
                  color: '#001D39'
                }}
              >
                <span>{showStudentDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showStudentDetails ? 'rotate-180' : ''}`} style={{ color: '#0A4174' }} />
              </button>

              {showStudentDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#BDD8E9/25',
                      borderColor: '#BDD8E9',
                      color: '#49769F'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#4E8EA2' }} />
                    <span><strong className="font-black" style={{ color: '#001D39' }}>Zero-Risk Sandbox:</strong> No chemical hazards</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#BDD8E9/25',
                      borderColor: '#BDD8E9',
                      color: '#49769F'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#4E8EA2' }} />
                    <span><strong className="font-black" style={{ color: '#001D39' }}>Infinite Repetitions:</strong> Free circuit wiring</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#BDD8E9/25',
                      borderColor: '#BDD8E9',
                      color: '#49769F'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#4E8EA2' }} />
                    <span><strong className="font-black" style={{ color: '#001D39' }}>Parameter Control:</strong> Adjust gravity &amp; optics</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#BDD8E9/25',
                      borderColor: '#BDD8E9',
                      color: '#49769F'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none" style={{ color: '#4E8EA2' }} />
                    <span><strong className="font-black" style={{ color: '#001D39' }}>Dynamic Feedback:</strong> Live trajectory plots</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t relative z-10" style={{ borderColor: '#BDD8E9' }}>
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
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-sans font-bold shadow-sm border transition-all cursor-pointer active:scale-95 hover:brightness-105"
              style={{
                backgroundColor: '#0A4174',
                color: '#FFFFFF',
                borderColor: '#001D39'
              }}
            >
              <FlaskConical className="w-4 h-4 pointer-events-none shrink-0" style={{ color: '#FFFFFF' }} />
              <span style={{ color: '#FFFFFF' }}>Launch Experiment Labs</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

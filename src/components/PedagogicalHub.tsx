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
      {/* 4 Pillars Ambient Ribbon Banner matching Screenshot 1 */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl border-2 border-slate-200 shadow-md bg-white w-full max-w-none text-slate-900"
      >
        {/* Box 1: Zero Lab Cost (Sky Blue #7dd3fc) */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl text-slate-900 shadow-sm border-2 border-slate-900 bg-[#7dd3fc] transition-all hover:scale-101">
          <div className="w-10 h-10 rounded-xl bg-transparent text-slate-900 flex items-center justify-center shrink-0 border-2 border-slate-900">
            <Zap className="w-5 h-5 pointer-events-none text-slate-900" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-slate-900 tracking-tight font-heading">Zero Lab Cost</div>
            <div className="text-[11px] text-slate-800 font-bold">100% Free &amp; Open Access</div>
          </div>
        </div>

        {/* Box 2: Real-Time 60 FPS Engines (Lime Green #a3e635) */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl text-slate-900 shadow-sm border-2 border-slate-900 bg-[#a3e635] transition-all hover:scale-101">
          <div className="w-10 h-10 rounded-xl bg-transparent text-slate-900 flex items-center justify-center shrink-0 border-2 border-slate-900">
            <Cpu className="w-5 h-5 pointer-events-none text-slate-900" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-slate-900 tracking-tight font-heading">Real-Time 60 FPS Engines</div>
            <div className="text-[11px] text-slate-800 font-bold">Runs 60 FPS &amp; Physics Engine</div>
          </div>
        </div>

        {/* Box 3: Safe Chemical Labs (Light Blue #93c5fd) */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl text-slate-900 shadow-sm border-2 border-slate-900 bg-[#93c5fd] transition-all hover:scale-101">
          <div className="w-10 h-10 rounded-xl bg-transparent text-slate-900 flex items-center justify-center shrink-0 border-2 border-slate-900">
            <FlaskConical className="w-5 h-5 pointer-events-none text-slate-900" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-slate-900 tracking-tight font-heading">Safe Chemical Labs</div>
            <div className="text-[11px] text-slate-800 font-bold">Virtual Hazard-Free Labs</div>
          </div>
        </div>

        {/* Box 4: 100% Curriculum Aligned (Tangerine Orange #fb923c) */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl text-slate-900 shadow-sm border-2 border-slate-900 bg-[#fb923c] transition-all hover:scale-101">
          <div className="w-10 h-10 rounded-xl bg-transparent text-slate-900 flex items-center justify-center shrink-0 border-2 border-slate-900">
            <ShieldCheck className="w-5 h-5 pointer-events-none text-slate-900" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-slate-900 tracking-tight font-heading">100% Curriculum Aligned</div>
            <div className="text-[11px] text-slate-800 font-bold">Cambridge, FBISE &amp; Oxford</div>
          </div>
        </div>
      </div>

      {/* Two Prominent Cards matching Screenshot 1 */}
      <div 
        className="w-full max-w-none grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch"
        style={{ width: '100%' }}
      >
        
        {/* CARD 1: FOR TEACHERS & EDUCATORS (Vibrant Lime Green #a3e635) */}
        <div 
          className="w-full relative overflow-hidden rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between border-2 border-slate-900 shadow-md group text-slate-900 transition-all bg-[#a3e635]"
          style={{ width: '100%' }}
        >
          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Title & Right Pill Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-transparent text-slate-900 flex items-center justify-center border-2 border-slate-900 shrink-0">
                  <GraduationCap className="w-6 h-6 text-slate-900 pointer-events-none" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-black text-slate-900 tracking-normal leading-snug">
                  For Teachers &amp; Educators
                </h3>
              </div>

              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 sm:px-4 sm:py-1 rounded-full bg-transparent text-slate-900 border-2 border-slate-900 shrink-0">
                <span>START CLASSROOM</span>
              </span>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed tracking-normal">
              Empower lecture hall and science classrooms, with time-tested demonstrations mapped directly to Student Learning Outcomes (SLOs). Convert abstract concepts into interactive play in seconds.
            </p>

            {/* Progressive Disclosure Toggle for Key Features */}
            <div>
              <button
                type="button"
                onClick={() => setShowTeacherDetails(!showTeacherDetails)}
                className="inline-flex items-center gap-2 text-xs font-sans font-black px-4 py-2 rounded-xl bg-transparent hover:bg-black/5 border-2 border-slate-900 text-slate-900 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>{showTeacherDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-4 h-4 text-slate-900 transition-transform duration-200 ${showTeacherDetails ? 'rotate-180' : ''}`} />
              </button>

              {showTeacherDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/40 border-2 border-slate-900 text-xs font-bold text-slate-900 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 pointer-events-none" />
                    <span><strong className="text-slate-950 font-black">4K Smartboard:</strong> High visual fidelity</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/40 border-2 border-slate-900 text-xs font-bold text-slate-900 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 pointer-events-none" />
                    <span><strong className="text-slate-950 font-black">SLO Curriculum:</strong> National Curriculum 2026-27</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/40 border-2 border-slate-900 text-xs font-bold text-slate-900 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 pointer-events-none" />
                    <span><strong className="text-slate-950 font-black">Theory-to-Practice:</strong> Live variable tweaking</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/40 border-2 border-slate-900 text-xs font-bold text-slate-900 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 pointer-events-none" />
                    <span><strong className="text-slate-950 font-black">Parameter Reset:</strong> Instant test repetition</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row matching Screenshot 1 */}
          <div className="mt-6 pt-4 border-t border-slate-900/30 relative z-10">
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
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-sans font-black text-slate-900 shadow-sm border-2 border-slate-900 transition-all cursor-pointer bg-transparent hover:bg-black/10 active:scale-95"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-900 pointer-events-none shrink-0" />
              <span>Browse Teacher Catalog</span>
            </button>
          </div>
        </div>

        {/* CARD 2: FOR STUDENTS & YOUNG SCIENTISTS (Vibrant Golden Yellow #facc15) */}
        <div 
          className="w-full relative overflow-hidden rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between border-2 border-slate-900 shadow-md group text-slate-900 transition-all bg-[#facc15]"
          style={{ width: '100%' }}
        >
          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Title & Right Pill Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-transparent text-slate-900 flex items-center justify-center border-2 border-slate-900 shrink-0">
                  <Compass className="w-6 h-6 text-slate-900 pointer-events-none" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-black text-slate-900 tracking-normal leading-snug">
                  For Students &amp; Young Scientists
                </h3>
              </div>

              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 sm:px-4 sm:py-1 rounded-full bg-transparent text-slate-900 border-2 border-slate-900 shrink-0">
                <span>HANDS-ON PRACTICE</span>
              </span>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed tracking-normal">
              Step into an open sandbox where curiosity leads investigation. Conduct experiments, test real-world physical laws, manipulate molecular stoms, and deepen intuition through play and observation.
            </p>

            {/* Progressive Disclosure Toggle for Key Features */}
            <div>
              <button
                type="button"
                onClick={() => setShowStudentDetails(!showStudentDetails)}
                className="inline-flex items-center gap-2 text-xs font-sans font-black px-4 py-2 rounded-xl bg-transparent hover:bg-black/5 border-2 border-slate-900 text-slate-900 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>{showStudentDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-4 h-4 text-slate-900 transition-transform duration-200 ${showStudentDetails ? 'rotate-180' : ''}`} />
              </button>

              {showStudentDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/40 border-2 border-slate-900 text-xs font-bold text-slate-900 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 pointer-events-none" />
                    <span><strong className="text-slate-950 font-black">Zero-Risk Sandbox:</strong> No chemical hazards</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/40 border-2 border-slate-900 text-xs font-bold text-slate-900 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 pointer-events-none" />
                    <span><strong className="text-slate-950 font-black">Infinite Repetitions:</strong> Free circuit wiring</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/40 border-2 border-slate-900 text-xs font-bold text-slate-900 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 pointer-events-none" />
                    <span><strong className="text-slate-950 font-black">Parameter Control:</strong> Adjust gravity &amp; optics</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/40 border-2 border-slate-900 text-xs font-bold text-slate-900 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 pointer-events-none" />
                    <span><strong className="text-slate-950 font-black">Dynamic Feedback:</strong> Live trajectory plots</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row matching Screenshot 1 */}
          <div className="mt-6 pt-4 border-t border-slate-900/30 relative z-10">
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
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-sans font-black text-slate-900 shadow-sm border-2 border-slate-900 transition-all cursor-pointer bg-transparent hover:bg-black/10 active:scale-95"
            >
              <FlaskConical className="w-4 h-4 text-slate-900 pointer-events-none shrink-0" />
              <span>Launch Experiment Labs</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

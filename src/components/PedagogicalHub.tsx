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
      {/* 4 Pillars Ambient Ribbon Banner - Each Box Completely Colored with a Different Solid Gradient */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl border-2 border-slate-200/80 shadow-lg bg-white w-full max-w-none"
      >
        {/* Box 1: Zero Lab Cost - Solid Deep Sky/Blue */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl text-white shadow-md border-2 border-sky-400/50 transition-all hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)' }}
        >
          <div className="w-11 h-11 rounded-xl bg-sky-950/90 text-cyan-300 flex items-center justify-center shrink-0 shadow-md border-2 border-cyan-400/80">
            <Zap className="w-5 h-5 pointer-events-none text-cyan-300" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight font-heading drop-shadow-xs">Zero Lab Cost</div>
            <div className="text-[11px] text-sky-100 font-bold drop-shadow-2xs">100% Free &amp; Open Access</div>
          </div>
        </div>

        {/* Box 2: Real-Time 60 FPS Engines - Solid Deep Emerald */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl text-white shadow-md border-2 border-emerald-400/50 transition-all hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%)' }}
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-950/90 text-emerald-300 flex items-center justify-center shrink-0 shadow-md border-2 border-emerald-400/80">
            <Cpu className="w-5 h-5 pointer-events-none text-emerald-300" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight font-heading drop-shadow-xs">Real-Time 60 FPS Engines</div>
            <div className="text-[11px] text-emerald-100 font-bold drop-shadow-2xs">Runs 60 FPS &amp; Physics Engine</div>
          </div>
        </div>

        {/* Box 3: Safe Chemical Labs - Solid Deep Purple */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl text-white shadow-md border-2 border-purple-400/50 transition-all hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)' }}
        >
          <div className="w-11 h-11 rounded-xl bg-purple-950/90 text-purple-300 flex items-center justify-center shrink-0 shadow-md border-2 border-purple-400/80">
            <FlaskConical className="w-5 h-5 pointer-events-none text-purple-300" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight font-heading drop-shadow-xs">Safe Chemical Labs</div>
            <div className="text-[11px] text-purple-100 font-bold drop-shadow-2xs">Virtual Hazard-Free Labs</div>
          </div>
        </div>

        {/* Box 4: 100% Curriculum Aligned - Solid Deep Amber */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl text-white shadow-md border-2 border-amber-400/50 transition-all hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #78350f 100%)' }}
        >
          <div className="w-11 h-11 rounded-xl bg-amber-950/90 text-amber-300 flex items-center justify-center shrink-0 shadow-md border-2 border-amber-400/80">
            <ShieldCheck className="w-5 h-5 pointer-events-none text-amber-300" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight font-heading drop-shadow-xs">100% Curriculum Aligned</div>
            <div className="text-[11px] text-amber-100 font-bold drop-shadow-2xs">Cambridge, FBISE &amp; Oxford</div>
          </div>
        </div>
      </div>

      {/* Two Prominent Widescreen Desktop/Laptop Cards (Strict 2-Column Side-by-Side Horizontal Grid on Laptops/Desktop across Full Screen) */}
      <div 
        className="w-full max-w-none grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch"
        style={{ width: '100%' }}
      >
        
        {/* CARD 1: FOR TEACHERS & EDUCATORS - Solid Deep Navy / Midnight Blue */}
        <div 
          className="w-full relative overflow-hidden rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between border-2 border-sky-400/60 shadow-[0_20px_50px_-10px_rgba(2,28,77,0.6)] group text-white transition-all hover:shadow-[0_24px_60px_-10px_rgba(2,28,77,0.75)] hover:border-sky-300"
          style={{
            background: 'linear-gradient(145deg, #07193b 0%, #0d2757 50%, #123773 100%)',
            width: '100%'
          }}
        >
          {/* Top Decorative Sheen */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-cyan-300 to-white opacity-85" />
          <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Title & Right Pill Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-950/90 text-cyan-300 flex items-center justify-center shadow-lg border-2 border-sky-400/80 shrink-0">
                  <GraduationCap className="w-6 h-6 text-cyan-300 pointer-events-none" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-sans font-black text-white tracking-normal leading-snug drop-shadow-sm">
                  For Teachers &amp; Educators
                </h3>
              </div>

              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-sky-950/90 text-cyan-300 border border-sky-400/70 shadow-md shrink-0">
                <span>START CLASSROOM</span>
              </span>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm text-sky-100 font-sans font-normal leading-relaxed tracking-normal">
              Empower lecture hall and science classrooms, with time-tested demonstrations mapped directly to Student Learning Outcomes (SLOs). Convert abstract concepts into interactive play in seconds.
            </p>

            {/* Progressive Disclosure Toggle for Key Features */}
            <div>
              <button
                type="button"
                onClick={() => setShowTeacherDetails(!showTeacherDetails)}
                className="inline-flex items-center gap-2 text-xs font-sans font-bold px-4 py-2 rounded-xl bg-sky-950/80 hover:bg-sky-900 border border-sky-400/60 text-cyan-200 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span>{showTeacherDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-4 h-4 text-cyan-300 transition-transform duration-200 ${showTeacherDetails ? 'rotate-180' : ''}`} />
              </button>

              {showTeacherDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900/70 border border-sky-500/30 text-xs font-sans text-sky-50 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 pointer-events-none" />
                    <span><strong className="text-white font-bold">4K Smartboard:</strong> High visual fidelity</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900/70 border border-sky-500/30 text-xs font-sans text-sky-50 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 pointer-events-none" />
                    <span><strong className="text-white font-bold">SLO Curriculum:</strong> National Curriculum 2026-27</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900/70 border border-sky-500/30 text-xs font-sans text-sky-50 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 pointer-events-none" />
                    <span><strong className="text-white font-bold">Theory-to-Practice:</strong> Live variable tweaking</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900/70 border border-sky-500/30 text-xs font-sans text-sky-50 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0 pointer-events-none" />
                    <span><strong className="text-white font-bold">Parameter Reset:</strong> Instant test repetition</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row: Prominent Button as in the screenshot */}
          <div className="mt-6 pt-3 border-t border-sky-500/30 relative z-10">
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-sans font-black text-white shadow-xl border-2 border-sky-300/60 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)'
              }}
            >
              <SlidersHorizontal className="w-4 h-4 text-white pointer-events-none" />
              <span>Browse Teacher Catalog</span>
            </button>
          </div>
        </div>

        {/* CARD 2: FOR STUDENTS & YOUNG SCIENTISTS - Solid Dark Royal Violet / Rich Amethyst */}
        <div 
          className="w-full relative overflow-hidden rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between border-2 border-purple-400/60 shadow-[0_20px_50px_-10px_rgba(59,7,100,0.6)] group text-white transition-all hover:shadow-[0_24px_60px_-10px_rgba(59,7,100,0.75)] hover:border-purple-300"
          style={{
            background: 'linear-gradient(145deg, #1d0831 0%, #300f53 50%, #471679 100%)',
            width: '100%'
          }}
        >
          {/* Top Decorative Sheen */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-400 via-pink-300 to-white opacity-85" />
          <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Title & Right Pill Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-950/90 text-pink-300 flex items-center justify-center shadow-lg border-2 border-purple-400/80 shrink-0">
                  <Compass className="w-6 h-6 text-pink-300 pointer-events-none" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-sans font-black text-white tracking-normal leading-snug drop-shadow-sm">
                  For Students &amp; Young Scientists
                </h3>
              </div>

              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-purple-950/90 text-pink-300 border border-purple-400/70 shadow-md shrink-0">
                <span>HANDS-ON PRACTICE</span>
              </span>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm text-purple-100 font-sans font-normal leading-relaxed tracking-normal">
              Step into an open sandbox where curiosity leads investigation. Conduct experiments, test real-world physical laws, manipulate molecular atoms, and deepen intuition through play and observation.
            </p>

            {/* Progressive Disclosure Toggle for Key Features */}
            <div>
              <button
                type="button"
                onClick={() => setShowStudentDetails(!showStudentDetails)}
                className="inline-flex items-center gap-2 text-xs font-sans font-bold px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-400/60 text-pink-200 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span>{showStudentDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-4 h-4 text-pink-300 transition-transform duration-200 ${showStudentDetails ? 'rotate-180' : ''}`} />
              </button>

              {showStudentDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-purple-950/70 border border-purple-500/30 text-xs font-sans text-purple-50 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 pointer-events-none" />
                    <span><strong className="text-white font-bold">Zero-Risk Sandbox:</strong> No chemical hazards</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-purple-950/70 border border-purple-500/30 text-xs font-sans text-purple-50 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 pointer-events-none" />
                    <span><strong className="text-white font-bold">Infinite Repetitions:</strong> Free circuit wiring</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-purple-950/70 border border-purple-500/30 text-xs font-sans text-purple-50 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 pointer-events-none" />
                    <span><strong className="text-white font-bold">Parameter Control:</strong> Adjust gravity &amp; optics</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-purple-950/70 border border-purple-500/30 text-xs font-sans text-purple-50 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 pointer-events-none" />
                    <span><strong className="text-white font-bold">Dynamic Feedback:</strong> Live trajectory plots</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row: Prominent Button as in the screenshot */}
          <div className="mt-6 pt-3 border-t border-purple-500/30 relative z-10">
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-sans font-black text-white shadow-xl border-2 border-pink-300/60 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #9333ea 0%, #db2777 50%, #e11d48 100%)'
              }}
            >
              <FlaskConical className="w-4 h-4 text-white pointer-events-none" />
              <span>Launch Experiment Labs</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

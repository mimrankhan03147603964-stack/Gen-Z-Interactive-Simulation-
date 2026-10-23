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
}

export const PedagogicalHub: React.FC<PedagogicalHubProps> = ({ totalSimulations = 74 }) => {
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl border-2 border-slate-200 shadow-lg bg-white w-full max-w-none"
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
            <div className="text-[11px] text-sky-100 font-bold drop-shadow-2xs">100% Free &amp; Offline Ready</div>
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
            <div className="text-[11px] text-emerald-100 font-bold drop-shadow-2xs">Fluid Particle &amp; Ray Tracing</div>
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
            <div className="text-[11px] text-purple-100 font-bold drop-shadow-2xs">Zero Hazard Virtual Acids</div>
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
            <div className="text-[11px] text-amber-100 font-bold drop-shadow-2xs">National Curriculum 2026-27</div>
          </div>
        </div>
      </div>

      {/* Two Prominent Widescreen Desktop/Laptop Cards (Strict 2-Column Side-by-Side Grid, Compact Landscape Height) */}
      <div 
        className="grid grid-cols-2 gap-5 w-full max-w-none"
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '1.25rem',
        }}
      >
        
        {/* CARD 1: FOR TEACHERS & EDUCATORS - Solid Deep Navy / Midnight Blue */}
        <div 
          className="w-full flex-1 relative overflow-hidden rounded-2xl py-3.5 px-5 sm:px-6 flex flex-col justify-between border-2 border-sky-400 shadow-xl group text-white transition-all hover:shadow-[0_20px_40px_-10px_rgba(2,28,77,0.7)]"
          style={{
            background: 'linear-gradient(145deg, #071a3d 0%, #0d2857 50%, #123774 100%)',
            width: '100%'
          }}
        >
          {/* Top Decorative Sheen */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-white opacity-80" />
          
          <div className="space-y-1.5 relative z-10">
            {/* Header: Icon, Badges & Titles in Streamlined Inline Flow */}
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-slate-950 text-cyan-300 flex items-center justify-center shadow-md border-2 border-sky-400 shrink-0">
                  <GraduationCap className="w-5 h-5 text-cyan-300 pointer-events-none" />
                </div>
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-white font-heading tracking-tight drop-shadow-sm whitespace-nowrap">
                    For Teachers &amp; Educators
                  </h3>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-950 border border-sky-400/60 text-sky-200 shadow-xs">
                    SMART CLASSROOM
                  </span>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-900 border border-blue-400/60 text-blue-200 shadow-xs">
                    DEMONSTRATION
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-black text-cyan-200 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-400/50 shadow-xs shrink-0">
                <Tv className="w-3.5 h-3.5 text-cyan-300 pointer-events-none" />
                <span>4K Projector Ready</span>
              </span>
            </div>

            <p className="text-xs text-sky-100 font-normal leading-snug">
              Empower your lecture hall and science classrooms with real-time computational demonstrations mapped directly to Student Learning Objectives (SLOs). Convert abstract chalkboard equations into tangible, interactive physical models in seconds.
            </p>

            {/* Progressive Disclosure Toggle for Key Features: Collapsed/Hidden by Default */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setShowTeacherDetails(!showTeacherDetails)}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-xl bg-sky-950/80 hover:bg-sky-900 border border-sky-400/60 text-cyan-200 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>{showTeacherDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-cyan-300 transition-transform duration-200 ${showTeacherDetails ? 'rotate-180' : ''}`} />
              </button>

              {showTeacherDetails && (
                <div className="grid grid-cols-2 gap-1.5 pt-2">
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/60 border border-sky-500/30 text-[11px] text-sky-50 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0 pointer-events-none" />
                    <span className="truncate"><strong className="text-white font-bold">4K Smartboard Execution:</strong> High visual fidelity</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/60 border border-sky-500/30 text-[11px] text-sky-50 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 pointer-events-none" />
                    <span className="truncate"><strong className="text-white font-bold">SLO Curriculum:</strong> National Curriculum (2026-27)</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/60 border border-sky-500/30 text-[11px] text-sky-50 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 pointer-events-none" />
                    <span className="truncate"><strong className="text-white font-bold">Theory-to-Practice:</strong> Live variable tweaking</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/60 border border-sky-500/30 text-[11px] text-sky-50 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0 pointer-events-none" />
                    <span className="truncate"><strong className="text-white font-bold">Parameter Reset:</strong> Instant test repetition</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row: Compact Solid Action Button */}
          <div className="mt-2.5 pt-2 border-t border-sky-500/30 flex items-center justify-between gap-2 relative z-10 flex-wrap">
            <span className="text-[11px] font-mono font-black text-cyan-200">
              {totalSimulations} Classroom-Ready Modules
            </span>
            <a 
              href="#catalog"
              className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-blue-500 text-white font-black px-4 py-1.5 rounded-xl text-xs cursor-pointer flex items-center gap-1.5 shadow-md border-2 border-sky-200 transition-all transform active:scale-95"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-white pointer-events-none" />
              <span>Browse Teacher Catalog</span>
            </a>
          </div>
        </div>

        {/* CARD 2: FOR STUDENTS & YOUNG SCIENTISTS - Solid Dark Royal Violet / Rich Amethyst */}
        <div 
          className="w-full flex-1 relative overflow-hidden rounded-2xl py-3.5 px-5 sm:px-6 flex flex-col justify-between border-2 border-purple-400 shadow-xl group text-white transition-all hover:shadow-[0_20px_40px_-10px_rgba(59,7,100,0.7)]"
          style={{
            background: 'linear-gradient(145deg, #1f0838 0%, #300f54 50%, #461678 100%)',
            width: '100%'
          }}
        >
          {/* Top Decorative Sheen */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-300 to-white opacity-80" />

          <div className="space-y-1.5 relative z-10">
            {/* Header: Icon, Badges & Titles in Streamlined Inline Flow */}
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-slate-950 text-pink-300 flex items-center justify-center shadow-md border-2 border-pink-400 shrink-0">
                  <Compass className="w-5 h-5 text-pink-300 pointer-events-none" />
                </div>
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-white font-heading tracking-tight drop-shadow-sm whitespace-nowrap">
                    For Students &amp; Young Scientists
                  </h3>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-950 border border-purple-400/60 text-purple-200 shadow-xs">
                    HANDS-ON PRACTICE
                  </span>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-950 border border-pink-400/60 text-pink-200 shadow-xs">
                    DISCOVERY
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-black text-pink-200 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-400/50 shadow-xs shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-pink-300 pointer-events-none" />
                <span>Self-Paced Discovery</span>
              </span>
            </div>

            <p className="text-xs text-purple-100 font-normal leading-snug">
              Step into an open sandbox where you are the lead investigator. Conduct risky experiments with zero danger, test extreme physical limits, see subatomic particles, and build deep intuition through play and observation.
            </p>

            {/* Progressive Disclosure Toggle for Key Features: Collapsed/Hidden by Default */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setShowStudentDetails(!showStudentDetails)}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-400/60 text-pink-200 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>{showStudentDetails ? 'Hide Key Features' : 'View Key Features (4)'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-pink-300 transition-transform duration-200 ${showStudentDetails ? 'rotate-180' : ''}`} />
              </button>

              {showStudentDetails && (
                <div className="grid grid-cols-2 gap-1.5 pt-2">
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-[11px] text-purple-50 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0 pointer-events-none" />
                    <span className="truncate"><strong className="text-white font-bold">Zero-Risk Sandbox:</strong> No chemical hazards</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-[11px] text-purple-50 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 pointer-events-none" />
                    <span className="truncate"><strong className="text-white font-bold">Infinite Repetitions:</strong> Free circuit wiring</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-[11px] text-purple-50 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 pointer-events-none" />
                    <span className="truncate"><strong className="text-white font-bold">Parameter Control:</strong> Adjust gravity &amp; optics</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-[11px] text-purple-50 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0 pointer-events-none" />
                    <span className="truncate"><strong className="text-white font-bold">Dynamic Feedback:</strong> Live trajectory plots</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row: Compact Solid Action Button */}
          <div className="mt-2.5 pt-2 border-t border-purple-500/30 flex items-center justify-between gap-2 relative z-10 flex-wrap">
            <span className="text-[11px] font-mono font-black text-pink-200">
              Interactive 60 FPS Engines
            </span>
            <a 
              href="#catalog"
              className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 hover:from-purple-400 hover:to-pink-500 text-white font-black px-4 py-1.5 rounded-xl text-xs cursor-pointer flex items-center gap-1.5 shadow-md border-2 border-pink-200 transition-all transform active:scale-95"
            >
              <FlaskConical className="w-3.5 h-3.5 text-white pointer-events-none" />
              <span>Launch Experiment Labs</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

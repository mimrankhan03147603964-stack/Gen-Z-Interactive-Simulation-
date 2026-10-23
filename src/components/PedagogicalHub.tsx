import React from 'react';
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
  SlidersHorizontal 
} from 'lucide-react';

interface PedagogicalHubProps {
  totalSimulations?: number;
}

export const PedagogicalHub: React.FC<PedagogicalHubProps> = ({ totalSimulations = 74 }) => {
  return (
    <section 
      id="pedagogical-hub"
      className="w-full relative z-10 space-y-6 scroll-mt-24 select-none"
    >
      {/* 4 Pillars Ambient Ribbon Banner - Each Box Completely Colored with a Different Solid Gradient */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl border-2 border-slate-200 shadow-lg bg-white"
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

      {/* Two Prominent Widescreen Desktop/Laptop Cards (Broader Horizontal Dimensions & Balanced Height) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 w-full">
        
        {/* PILLAR 1: FOR TEACHERS & EDUCATORS - Solid Deep Navy / Midnight Blue */}
        <div 
          className="relative overflow-hidden rounded-3xl p-6 sm:p-7 xl:p-8 flex flex-col justify-between border-2 border-sky-400 shadow-2xl group text-white transition-all hover:shadow-[0_25px_50px_-12px_rgba(2,28,77,0.7)]"
          style={{
            background: 'linear-gradient(145deg, #071a3d 0%, #0d2857 50%, #123774 100%)'
          }}
        >
          {/* Top Decorative Sheen */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-cyan-300 to-white opacity-80" />
          
          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Badges & Titles */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-13 h-13 rounded-2xl bg-slate-950 text-cyan-300 flex items-center justify-center shadow-lg border-2 border-sky-400 shrink-0">
                  <GraduationCap className="w-7 h-7 text-cyan-300 pointer-events-none" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-sky-950 border border-sky-400/60 text-sky-200 shadow-md">
                    Smart Classroom Demonstration
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight mt-1 drop-shadow-sm">
                    For Teachers &amp; Educators
                  </h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-200 bg-sky-950/80 px-3.5 py-1.5 rounded-full border border-sky-400/50 shadow-md">
                <Tv className="w-4 h-4 text-cyan-300 pointer-events-none" />
                <span>4K Projector Ready</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-sky-100 font-normal leading-relaxed">
              Empower your lecture hall and science classrooms with real-time computational demonstrations mapped directly to Student Learning Objectives (SLOs). Convert abstract chalkboard equations into tangible, interactive physical models in seconds.
            </p>

            {/* Feature Checklist - 2-Column Responsive Desktop Grid for Reduced Height & Breathing Room */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-sky-500/30 text-xs text-sky-50 font-normal leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-bold block mb-0.5">4K Smartboard Execution:</strong> Ultra-clear visual fidelity for interactive displays.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-sky-500/30 text-xs text-sky-50 font-normal leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-bold block mb-0.5">SLO Curriculum Alignment:</strong> National Curriculum (Session 2026-27).</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-sky-500/30 text-xs text-sky-50 font-normal leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-bold block mb-0.5">Theory-to-Practice:</strong> Live variable tweaking with instant graphical evidence.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-sky-500/30 text-xs text-sky-50 font-normal leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-bold block mb-0.5">Instant Parameter Reset:</strong> Reset experiments immediately without hassle.</span>
              </div>
            </div>
          </div>

          {/* Action Row: Prominent High-Contrast Solid Action Button */}
          <div className="mt-6 pt-4 border-t border-sky-500/30 flex items-center justify-between gap-3 relative z-10 flex-wrap">
            <span className="text-[11px] font-mono font-black text-cyan-200">
              {totalSimulations} Classroom-Ready Interactive Modules
            </span>
            <a 
              href="#catalog"
              className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-blue-500 text-white font-black px-6 py-3 rounded-2xl text-xs sm:text-sm cursor-pointer flex items-center gap-2 shadow-xl border-2 border-sky-200 transition-all transform active:scale-95"
            >
              <SlidersHorizontal className="w-4 h-4 text-white pointer-events-none" />
              <span>Browse Teacher Catalog</span>
            </a>
          </div>
        </div>

        {/* PILLAR 2: FOR STUDENTS & YOUNG SCIENTISTS - Solid Dark Royal Violet / Rich Amethyst */}
        <div 
          className="relative overflow-hidden rounded-3xl p-6 sm:p-7 xl:p-8 flex flex-col justify-between border-2 border-purple-400 shadow-2xl group text-white transition-all hover:shadow-[0_25px_50px_-12px_rgba(59,7,100,0.7)]"
          style={{
            background: 'linear-gradient(145deg, #1f0838 0%, #300f54 50%, #461678 100%)'
          }}
        >
          {/* Top Decorative Sheen */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-400 via-pink-300 to-white opacity-80" />

          <div className="space-y-4 relative z-10">
            {/* Header: Icon, Badges & Titles */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-13 h-13 rounded-2xl bg-slate-950 text-pink-300 flex items-center justify-center shadow-lg border-2 border-pink-400 shrink-0">
                  <Compass className="w-7 h-7 text-pink-300 pointer-events-none" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-purple-950 border border-purple-400/60 text-purple-200 shadow-md">
                    Hands-On Practical Discovery
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight mt-1 drop-shadow-sm">
                    For Students &amp; Young Scientists
                  </h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-black text-pink-200 bg-purple-950/80 px-3.5 py-1.5 rounded-full border border-purple-400/50 shadow-md">
                <Sparkles className="w-4 h-4 text-pink-300 pointer-events-none" />
                <span>Self-Paced Discovery</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-purple-100 font-normal leading-relaxed">
              Step into an open sandbox where you are the lead investigator. Conduct risky experiments with zero danger, test extreme physical limits, see subatomic particles, and build deep intuition through play and observation.
            </p>

            {/* Feature Checklist - 2-Column Responsive Desktop Grid for Reduced Height & Breathing Room */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-50 font-normal leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-bold block mb-0.5">Zero-Risk Experimentation:</strong> Safe virtual sandbox without hazardous chemicals.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-50 font-normal leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-bold block mb-0.5">Infinite Repetitions:</strong> Repeat titrations and circuit wiring freely.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-50 font-normal leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-bold block mb-0.5">Parameter Manipulation:</strong> Adjust gravity, voltage, and optics live.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-50 font-normal leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-bold block mb-0.5">Dynamic Feedback:</strong> Live oscilloscopes and trajectory plots teach visual science.</span>
              </div>
            </div>
          </div>

          {/* Action Row: Prominent High-Contrast Solid Action Button */}
          <div className="mt-6 pt-4 border-t border-purple-500/30 flex items-center justify-between gap-3 relative z-10 flex-wrap">
            <span className="text-[11px] font-mono font-black text-pink-200">
              Interactive 60 FPS Physics &amp; Chemistry
            </span>
            <a 
              href="#catalog"
              className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 hover:from-purple-400 hover:to-pink-500 text-white font-black px-6 py-3 rounded-2xl text-xs sm:text-sm cursor-pointer flex items-center gap-2 shadow-xl border-2 border-pink-200 transition-all transform active:scale-95"
            >
              <FlaskConical className="w-4 h-4 text-white pointer-events-none" />
              <span>Launch Experiment Labs</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

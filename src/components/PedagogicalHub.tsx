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
      {/* 4 Pillars Ambient Ribbon Banner in Solid Elevated Navy */}
      <div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-3xl border-2 border-blue-400 shadow-xl bg-[#10244c]"
      >
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#163261] border-2 border-blue-400/50 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Zap className="w-5 h-5 pointer-events-none" />
          </div>
          <div>
            <div className="text-xs font-black text-white tracking-tight font-heading">Zero Lab Cost</div>
            <div className="text-[11px] text-cyan-200 font-bold">100% Free &amp; Offline Ready</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#163261] border-2 border-emerald-400/50 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Cpu className="w-5 h-5 pointer-events-none" />
          </div>
          <div>
            <div className="text-xs font-black text-white tracking-tight font-heading">Real-Time 60 FPS Engines</div>
            <div className="text-[11px] text-emerald-200 font-bold">Fluid Particle &amp; Ray Tracing</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#163261] border-2 border-purple-400/50 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <FlaskConical className="w-5 h-5 pointer-events-none" />
          </div>
          <div>
            <div className="text-xs font-black text-white tracking-tight font-heading">Safe Chemical Labs</div>
            <div className="text-[11px] text-purple-200 font-bold">Zero Hazard Virtual Acids</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#163261] border-2 border-amber-400/50 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-5 h-5 pointer-events-none" />
          </div>
          <div>
            <div className="text-xs font-black text-white tracking-tight font-heading">100% Curriculum Aligned</div>
            <div className="text-[11px] text-amber-200 font-bold">National Curriculum 2026-27</div>
          </div>
        </div>
      </div>

      {/* Two Prominent Pedagogical Hub Pillars (Teachers & Students) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PILLAR 1: FOR TEACHERS & EDUCATORS */}
        <div 
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-blue-400 shadow-2xl group text-white bg-[#102752]"
        >
          {/* Top Decorative Sheen */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <GraduationCap className="w-6 h-6 pointer-events-none" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0a1836] text-cyan-300 border-2 border-blue-400">
                    Smart Classroom Demonstration
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight mt-1">
                    For Teachers &amp; Educators
                  </h3>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-cyan-100 bg-[#0a1836] px-3 py-1 rounded-full border-2 border-cyan-400 shadow-xs">
                <Tv className="w-3.5 h-3.5 text-cyan-400 pointer-events-none" />
                <span>4K Projector Ready</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              Empower your lecture hall and science classrooms with real-time computational demonstrations mapped directly to Student Learning Objectives (SLOs). Convert abstract chalkboard equations into tangible, interactive physical models in seconds.
            </p>

            {/* Feature Checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-100 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-black">4K Smartboard &amp; Projector Execution:</strong> Crystal-clear visual fidelity designed for high-resolution interactive smartboards and classroom displays.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-100 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-black">Direct SLO Curriculum Alignment:</strong> Mapped to the National Curriculum of Pakistan (Session 2026-27) for Matric &amp; F.Sc board syllabi.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-100 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-black">Effortless Theory-to-Practice:</strong> Live variable tweaking allows educators to pose &ldquo;what-if&rdquo; questions with instantaneous graphical evidence.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-100 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-black">Instant Parameter Reset:</strong> Reset experiments immediately without cleaning equipment or wasting laboratory chemicals.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-blue-400/30 flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono font-bold text-cyan-300">
              {totalSimulations} Classroom-Ready Interactive Modules
            </span>
            <a 
              href="#catalog"
              className="btn-tactile-3d px-4 py-2 rounded-xl text-xs font-black text-white shadow-lg border-2 border-white cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0284c7 100%)',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.45)'
              }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-white pointer-events-none" />
              <span>Browse Teacher Catalog</span>
            </a>
          </div>
        </div>

        {/* PILLAR 2: FOR STUDENTS & YOUNG SCIENTISTS */}
        <div 
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-purple-400 shadow-2xl group text-white bg-[#1f1442]"
        >
          {/* Top Decorative Sheen */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-400 to-amber-400" />

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Compass className="w-6 h-6 pointer-events-none" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0a1836] text-purple-300 border-2 border-purple-400">
                    Hands-On Practical Discovery
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight mt-1">
                    For Students &amp; Young Scientists
                  </h3>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-purple-100 bg-[#0a1836] px-3 py-1 rounded-full border-2 border-purple-400 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 pointer-events-none" />
                <span>Self-Paced Discovery</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              Step into an open sandbox where you are the lead investigator. Conduct risky experiments with zero danger, test extreme physical limits, see subatomic particles, and build deep intuition through play and observation.
            </p>

            {/* Feature Checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-100 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-black">Zero-Risk Virtual Experimentation:</strong> No broken glassware, hazardous fumes, or electrical shocks. Safe virtual sandbox for every student.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-100 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-black">Infinite Repetitions:</strong> Repeat titrations, projectile launches, and circuit wiring as many times as you need until concept mastery.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-100 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-black">Parameter Manipulation:</strong> Adjust gravity, voltage, lens curvature, and temperature to watch consequences unfold in real time.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-100 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 pointer-events-none" />
                <span><strong className="text-white font-black">Intuitive Real-Time Graphical Feedback:</strong> Dynamic oscilloscopes, trajectory plots, and phase diagrams teach visual science.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-purple-400/30 flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono font-bold text-purple-300">
              Interactive 60 FPS Physics &amp; Chemistry
            </span>
            <a 
              href="#catalog"
              className="btn-tactile-3d px-4 py-2 rounded-xl text-xs font-black text-white shadow-lg border-2 border-white cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #db2777 100%)',
                boxShadow: '0 4px 14px rgba(147, 51, 234, 0.45)'
              }}
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

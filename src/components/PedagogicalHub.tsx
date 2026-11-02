import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Lightbulb, 
  Compass, 
  ShieldCheck, 
  Layers, 
  Award, 
  Zap,
  GraduationCap
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
  totalSimulations = 86
}) => {
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
          className="reveal-left flex items-center gap-3.5 p-3.5 rounded-2xl shadow-sm border transition-all hover:scale-101"
          style={{
            backgroundColor: '#EEF3F9',
            borderColor: '#DDE5F3'
          }}
        >
          <div 
            className="reveal-zoom w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
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
          className="reveal-up reveal-delay-1 flex items-center gap-3.5 p-3.5 rounded-2xl shadow-sm border transition-all hover:scale-101"
          style={{
            backgroundColor: '#EEF3F9',
            borderColor: '#DDE5F3'
          }}
        >
          <div 
            className="reveal-zoom w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
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
          className="reveal-up reveal-delay-2 flex items-center gap-3.5 p-3.5 rounded-2xl shadow-sm border transition-all hover:scale-101"
          style={{
            backgroundColor: '#EEF3F9',
            borderColor: '#DDE5F3'
          }}
        >
          <div 
            className="reveal-zoom w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
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
          className="reveal-right reveal-delay-3 flex items-center gap-3.5 p-3.5 rounded-2xl shadow-sm border transition-all hover:scale-101"
          style={{
            backgroundColor: '#EEF3F9',
            borderColor: '#DDE5F3'
          }}
        >
          <div 
            className="reveal-zoom w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
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
        className="w-full max-w-none grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start"
        style={{ width: '100%' }}
      >
        
        {/* CARD 1: FOR TEACHERS & EDUCATORS (--dark-blue) */}
        <ScrollReveal direction="left" className="w-full flex flex-col">
          <div 
            className="w-full relative overflow-hidden rounded-3xl p-4 sm:p-5 flex flex-col border shadow-xl group transition-all text-[#1B2A5C]"
            style={{ 
              width: '100%',
              backgroundColor: '#EEF3F9',
              borderColor: '#DDE5F3',
              boxShadow: '0 8px 24px rgba(27, 42, 92, 0.10)'
            }}
          >
            {/* Clean Light Panel for Optimal Contrast & Clarity */}
            <div 
              className="rounded-2xl p-5 sm:p-6 md:p-7 space-y-5 relative z-10 border shadow-xs"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#DDE5F3',
                boxShadow: '0 4px 18px rgba(27, 42, 92, 0.06)'
              }}
            >
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
                  <h3 className="text-base sm:text-lg md:text-xl font-heading font-black tracking-normal leading-snug text-[#1546A8]">
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

              {/* Original Description Text */}
              <p className="text-xs sm:text-sm font-semibold leading-relaxed tracking-normal text-[#1B2A5C]">
                Empower lecture hall and science classrooms, with time-tested demonstrations mapped directly to Student Learning Outcomes (SLOs). Convert abstract concepts into interactive play in seconds.
              </p>

              {/* Static Key Features (4) - Permanently Visible and Open */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2.5">
                  <Sparkles className="w-4 h-4 text-[#1546A8] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1546A8]">
                    Key Features (4)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#1B2A5C'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none text-[#1546A8]" />
                    <span><strong className="font-black text-[#1B2A5C]">4K Smartboard:</strong> High visual fidelity</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#1B2A5C'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none text-[#1546A8]" />
                    <span><strong className="font-black text-[#1B2A5C]">SLO Curriculum:</strong> National Curriculum 2026-27</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#1B2A5C'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none text-[#1546A8]" />
                    <span><strong className="font-black text-[#1B2A5C]">Theory-to-Practice:</strong> Live variable tweaking</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#1B2A5C'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none text-[#1546A8]" />
                    <span><strong className="font-black text-[#1B2A5C]">Parameter Reset:</strong> Instant test repetition</span>
                  </div>
                </div>
              </div>

              {/* Sub-Section A: Why teachers choose this portal */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1546A8] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1546A8]">
                    Why teachers choose this portal
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Teaching complex STEM concepts in traditional classrooms often faces time limitations, broken physical apparatus, or lack of dangerous chemical reagents. This portal provides educators with dependable, interactive simulations that demonstrate intricate scientific phenomena in seconds without setup hassle. Every simulation is built with educator clarity in mind, allowing teachers to transform passive lectures into vibrant visual inquiries. By connecting their laptop to the classroom projector or smartboard, instructors can instantly show what was previously impossible to see inside a textbook. It gives educators complete command over classroom pace, visual engagement, and student attention.
                </p>
              </div>

              {/* Sub-Section B: What teachers get */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#1546A8] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1546A8]">
                    What teachers get
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Ready-made simulations mapped directly to National Curriculum of Pakistan (Session 2026-27) Student Learning Outcomes (SLOs).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Projector-friendly 4K high-fidelity visuals engineered for 65-inch to 85-inch classroom smartboards and multimedia screens.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>One-click Full Screen mode with all interactive controls, meters, and measurement labels remaining visible and sharp.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Instant single-click launch directly in any modern web browser with zero software installations, logins, or plugins.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Zero lab equipment maintenance, zero consumable chemical costs, and zero hazardous breakage risks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Comprehensive interdisciplinary library covering Physics, Chemistry, Biology, Mathematics, Computer Science, English, and Urdu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Consistent control standards across all 109 labs with standardized Reset, Pause, Parameter Sliders, and Information buttons.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Reliable, lightweight performance running smoothly on standard school desktop PCs, laptops, and Chromebooks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Real-time calculation engines that solve mathematical and physical equations at 60 FPS for authentic scientific demonstrations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Accessible digital resource links that can be shared effortlessly with students for revision and homework assignments.</span>
                  </li>
                </ul>
              </div>

              {/* Sub-Section C: How to run a lesson in 5 steps */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#1546A8] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1546A8]">
                    How to run a lesson in 5 steps
                  </h4>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1546A8] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-slate-900 block">Choose the Topic from Catalog:</strong>
                      <span>Select the matching simulation from the Grade or Subject Catalog aligned directly with today's curriculum SLO.</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1546A8] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-slate-900 block">Open the Lab in Full Screen:</strong>
                      <span>Click the Full Screen button on the multimedia projector or smartboard to remove browser chrome and focus attention.</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1546A8] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-slate-900 block">Demonstrate the Concept:</strong>
                      <span>Introduce the core physical variables, drag sliders, and spotlight live cause-and-effect relationships on screen.</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1546A8] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">4</span>
                    <div>
                      <strong className="text-slate-900 block">Let Students Try &amp; Predict:</strong>
                      <span>Invite student volunteers to adjust values, test their hypotheses, or conduct paired computer lab investigations.</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1546A8] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">5</span>
                    <div>
                      <strong className="text-slate-900 block">Wrap Up with Questions:</strong>
                      <span>Review recorded observations, check understanding through quick Q&amp;A, and summarize the theoretical law.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Section D: Classroom ideas */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#1546A8] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1546A8]">
                    Classroom ideas
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Engaging Starter Hook:</strong> Launch an intriguing simulation before opening textbooks to ignite curiosity and class debate.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Concept Demonstration:</strong> Replace chalk diagrams with live ray-tracing, moving magnetic fields, or a pulsing 3D heart.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Guided Practical Worksheets:</strong> Distribute structured observation sheets where students record live simulation data.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Targeted Pre-Exam Revision:</strong> Revisit an entire term's core practical experiments in a single session before board exams.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Collaborative Prediction Challenge:</strong> Have student groups vote on outcomes before tweaking a variable to verify who was right.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Flipped Classroom Homework:</strong> Assign students to explore an experiment at home and arrive ready to analyze results.</span>
                  </li>
                </ul>
              </div>

              {/* Sub-Section E: Time and effort saved */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1546A8] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1546A8]">
                    Time and effort saved
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Eliminates 30+ minutes of manual lab apparatus arrangement, glassware washing, and hazardous reagent storage before and after class.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Prevents canceled practical periods caused by depleted batteries, missing wires, burnt resistors, or broken optical lenses.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Enables instant repeat trials with one click, accomplishing in 5 minutes what traditionally required an entire 40-minute laboratory session.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1546A8] shrink-0 mt-0.5" />
                    <span>Provides perfectly pre-calibrated, zero-error instruments so instructional time is spent on conceptual understanding rather than fixing equipment.</span>
                  </li>
                </ul>
              </div>

              {/* Sub-Section F: Subjects and levels covered */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#1546A8] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1546A8]">
                    Subjects and levels covered
                  </h4>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <p className="leading-relaxed">
                    <strong className="text-slate-900">Elementary to Higher Secondary:</strong> Covers Early Childhood &amp; Elementary (Grades 1-5), Middle School General Science (Grades 6-8), Secondary SSC Matric (Grades 9-10), and Higher Secondary HSSC / FSc Pre-Engineering &amp; Pre-Medical (Grades 11-12).
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-slate-900">Disciplines Covered:</strong> Physics, Chemistry, Biology, Mathematics, Earth &amp; Space, Computer Science, English Language Arts, and Urdu &amp; Linguistics.
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">National Curriculum 2026-27</span>
                    <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-200">FBISE Federal Board</span>
                    <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">Cambridge IGCSE / O-Level</span>
                    <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">Oxford Syllabus</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* CARD 2: FOR STUDENTS & YOUNG SCIENTISTS (--blue) */}
        <ScrollReveal direction="right" delay={1} className="w-full flex flex-col">
          <div 
            className="w-full relative overflow-hidden rounded-3xl p-4 sm:p-5 flex flex-col border shadow-xl group transition-all text-[#1B2A5C]"
            style={{ 
              width: '100%',
              backgroundColor: '#EEF3F9',
              borderColor: '#DDE5F3',
              boxShadow: '0 8px 24px rgba(27, 42, 92, 0.10)'
            }}
          >
            {/* Clean Light Panel for Optimal Contrast & Clarity */}
            <div 
              className="rounded-2xl p-5 sm:p-6 md:p-7 space-y-5 relative z-10 border shadow-xs"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#DDE5F3',
                boxShadow: '0 4px 18px rgba(27, 42, 92, 0.06)'
              }}
            >
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
                  <h3 className="text-base sm:text-lg md:text-xl font-heading font-black tracking-normal leading-snug text-[#1546A8]">
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

              {/* Original Description Text */}
              <p className="text-xs sm:text-sm font-semibold leading-relaxed tracking-normal text-[#1B2A5C]">
                Step into an open sandbox where curiosity leads investigation. Conduct experiments, test real-world physical laws, manipulate molecular atoms, and deepen intuition through play and observation.
              </p>

              {/* Static Key Features (4) - Permanently Visible and Open */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2.5">
                  <Sparkles className="w-4 h-4 text-[#1E88E5] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1E88E5]">
                    Key Features (4)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#1B2A5C'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none text-[#1E88E5]" />
                    <span><strong className="font-black text-[#1B2A5C]">Zero-Risk Sandbox:</strong> No chemical hazards</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#1B2A5C'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none text-[#1E88E5]" />
                    <span><strong className="font-black text-[#1B2A5C]">Infinite Repetitions:</strong> Free circuit wiring</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#1B2A5C'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none text-[#1E88E5]" />
                    <span><strong className="font-black text-[#1B2A5C]">Parameter Control:</strong> Adjust gravity &amp; optics</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold leading-normal shadow-2xs"
                    style={{
                      backgroundColor: '#F5F8FC',
                      borderColor: '#DDE5F3',
                      color: '#1B2A5C'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 pointer-events-none text-[#1E88E5]" />
                    <span><strong className="font-black text-[#1B2A5C]">Dynamic Feedback:</strong> Live trajectory plots</span>
                  </div>
                </div>
              </div>

              {/* Sub-Section A: Why students will love it */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E88E5] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1E88E5]">
                    Why students will love it
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Learning science and math through textbooks alone can feel abstract, difficult, and full of memorization. This portal turns every lesson into an interactive digital playground where you can touch, test, and control the laws of nature. You are no longer just reading about how a circuit works or how planets orbit—you are actively wiring components, changing gravity, and watching immediate 60 FPS reactions. It removes the stress of making mistakes because you can reset and experiment as many times as you like. It gives you the freedom to explore at your own speed and truly understand the 'why' behind every concept.
                </p>
              </div>

              {/* Sub-Section B: What students can do */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#1E88E5] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1E88E5]">
                    What students can do
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Run virtual science experiments safely with zero risk of electric shock, chemical spills, or broken equipment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Change physical variables—like voltage, temperature, mass, and angles—and see instantaneous real-time results.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Drag, drop, and connect interactive apparatus including wires, resistors, lenses, mirrors, weights, and pulleys.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Build custom electrical circuits and verify Ohm's and Kirchhoff's laws with functioning digital ammeters and voltmeters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Observe invisible atomic phenomena: zoom into gas molecules, electron energy shells, and chemical phase transitions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Practise mathematics step by step: manipulate fractions, plot parabolas, and explore the trigonometric unit circle dynamically.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Master English Language Arts grammar: interact with verb tense timelines, spatial prepositions, and phonetic sounds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Explore Urdu linguistics: trace Haroof-e-Tahajji letter strokes, hear authentic phonetics, and build vocabulary.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Repeat any experiment infinite times until difficult concepts make complete sense without waiting for lab turns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>Test your knowledge with built-in interactive challenge modes and immediate quantitative feedback.</span>
                  </li>
                </ul>
              </div>

              {/* Sub-Section C: Learn by doing */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#1E88E5] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1E88E5]">
                    Learn by doing
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  True scientific understanding does not come from memorizing definitions—it comes from testing hypotheses firsthand. When you manipulate a variable yourself and observe the resulting curve shift or color change, your brain creates lasting cognitive neural pathways. Testing different scenarios, seeing where predictions fail, and repeating trials independently transforms passive rote learning into authentic conceptual mastery.
                </p>
              </div>

              {/* Sub-Section D: Study and exam help */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#1E88E5] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1E88E5]">
                    Study and exam help
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">High-Impact Exam Revision:</strong> Quickly review practical experiments before board exams to remember apparatus setups and observations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Vivid Visual Memory:</strong> Recall dynamic moving animations and color changes easily when answering descriptive board exam questions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Self-Paced Practice:</strong> Take as much time as you need on tough topics without feeling rushed by classroom bells or peer pressure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Instant Answer Checking:</strong> Verify textbook homework solutions by simulating the exact problem parameters in the virtual lab.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Master Practical SLOs:</strong> Prepare for matric and intermediate board practical viva questions with deep familiarity of apparatus.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Independent Science Projects:</strong> Test ideas for school science exhibitions and STEM fairs using authentic digital data.</span>
                  </li>
                </ul>
              </div>

              {/* Sub-Section E: Safe and free */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1E88E5] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1E88E5]">
                    Safe and free
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">100% Free &amp; Open Access:</strong> Every single simulation is completely free with no subscriptions, paywalls, or hidden costs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Hazard-Free Learning:</strong> Explore dangerous reactions, corrosive acids, and high-voltage circuits in total personal safety.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">No Account or Sign-Up Needed:</strong> Open any lab directly in your browser without entering personal data or creating passwords.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Zero Equipment Barriers:</strong> Conduct elite research-grade investigations without needing expensive physical laboratory kits.</span>
                  </li>
                </ul>
              </div>

              {/* Sub-Section F: Fun challenges for young scientists */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#1E88E5] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-[#1E88E5]">
                    Fun challenges for young scientists
                  </h4>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs">
                    <strong className="text-slate-900 block mb-0.5">Physics Projectile Challenge:</strong>
                    <span>Launch a projectile at 45 degrees, calculate its maximum range, and tweak air resistance to hit a distant target.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs">
                    <strong className="text-slate-900 block mb-0.5">Electronics Circuit Challenge:</strong>
                    <span>Build a complex parallel circuit with three lightbulbs and deduce how voltage distributes across each branch.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs">
                    <strong className="text-slate-900 block mb-0.5">Biology 3D Heart Challenge:</strong>
                    <span>Examine the 3D Human Heart, follow oxygenated blood flow through the aorta, and count the cardiac pulse rhythm.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs">
                    <strong className="text-slate-900 block mb-0.5">Chemistry Titration Challenge:</strong>
                    <span>Titrate hydrochloric acid with sodium hydroxide drop-by-drop and hit the exact neutral pH 7.0 endpoint.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-3xs">
                    <strong className="text-slate-900 block mb-0.5">Mathematics Trigonometry Challenge:</strong>
                    <span>Rotate the trigonometric phasor arm around the unit circle and observe how sine waves peak and valley in real time.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

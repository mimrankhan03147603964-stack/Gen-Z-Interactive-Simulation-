import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  GraduationCap, 
  Users, 
  Sparkles, 
  Lightbulb, 
  Compass 
} from 'lucide-react';
import { getThemeForIndex } from '../data/sequentialPalette';

interface WebsiteFeaturesProps {
  isDarkMode?: boolean;
}

interface FeatureDetailContent {
  whatThisMeans: string;
  whatYouWillFind: string[];
  classesCovered: string;
  howTeachersUse: string[];
  howStudentsBenefit: string[];
  exampleLabs: {
    subject: string;
    title: string;
    desc: string;
  }[];
}

interface FeatureItem {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  renderIcon: () => React.ReactNode;
  details: FeatureDetailContent;
}

export const WebsiteFeatures: React.FC<WebsiteFeaturesProps> = ({ isDarkMode = false }) => {
  const features: FeatureItem[] = [
    {
      title: 'Optimized for Laptops & PCs',
      badge: 'DUAL 4K READY',
      badgeColor: '#0284c7',
      description: 'Our labs run smoothly on laptops, desktop computers, Chromebooks, interactive classroom smart boards and widescreen projectors. The layout adjusts automatically to your screen size, so students get a clear, full view of every simulation without any extra software or installation.',
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="lapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="lapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="deskGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#lapGlow)" />
          <rect x="22" y="8" width="34" height="24" rx="3.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="24.5" y="10.5" width="29" height="19" rx="2" fill="url(#screenGrad)" />
          <path d="M37 32 L41 32 L43 38 L35 38 Z" fill="#475569" stroke="#0ea5e9" strokeWidth="0.8" />
          <rect x="33" y="38" width="12" height="2.5" rx="1" fill="#64748b" />
          <circle cx="39" cy="20" r="5" fill="#ffffff" fillOpacity="0.85" />
          <path d="M28 25 Q34 18 40 22 T50 16" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="8" y="22" width="30" height="20" rx="2.5" fill="url(#lapGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="10.5" y="24.5" width="25" height="15" rx="1.5" fill="#0369a1" />
          <rect x="11.5" y="25.5" width="23" height="13" rx="1" fill="url(#deskGrad)" />
          <line x1="14" y1="29" x2="26" y2="29" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="32.5" x2="31" y2="32.5" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="36" x2="22" y2="36" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M54 42 L41 42 L44 48 L2 48 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
          <rect x="19" y="44" width="8" height="2.5" rx="0.6" fill="#475569" />
          <line x1="12" y1="47.5" x2="34" y2="47.5" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
      details: {
        whatThisMeans:
          'Every virtual lab in this portal is purpose-built for laptop and desktop environments, using hardware-accelerated vector rendering and fluid layouts. Whether running in a school computer lab, on teachers’ laptops, Chromebooks, or interactive touch display panels, the stage scales cleanly without letterboxing or blurry scaling. No external plugins, runtime downloads, or administrative installations are needed; everything opens directly inside modern browsers with comfortable mouse, trackpad, and keyboard controls.',
        whatYouWillFind: [
          'Widescreen 16:9 and 16:10 desktop layouts tailored for 1366×768, 1080p Full HD, and 4K displays',
          'Smooth mouse-wheel zooming, draggable apparatus, and fine slider knobs for variables',
          'Side-by-side control consoles with live numerical gauges, data tables, and dynamic coordinate graphs',
          'Adaptive UI panels that maintain crisp typography, readable labels, and razor-sharp iconography',
          'Lightweight browser execution that runs reliably on school workstations without dedicated graphic cards',
          'Single-click experiment reset switches that immediately restore original initial laboratory conditions',
          'Cross-browser certification across Google Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari'
        ],
        classesCovered:
          'Supports all stages: Primary Elementary (Grades 1-5), Middle School (Grades 6-8), Secondary Matriculation (Grades 9-10), and Higher Secondary Intermediate / FSc (Grades 11-12).',
        howTeachersUse: [
          'Connect the instructor laptop to classroom multimedia projectors or smart boards for whole-class lectures.',
          'Direct students in the computer lab to conduct individualized practical investigations at their own workstations.',
          'Display side-by-side comparative parameter runs to visually prove scientific cause-and-effect laws.',
          'Demonstrate live measurement tables while students record observations in their school practical notebooks.',
          'Share direct simulation URLs via Google Classroom or school LMS for self-paced homework and flipped classrooms.'
        ],
        howStudentsBenefit: [
          'Enjoy spacious, eye-friendly layout sizing that eliminates the eye fatigue and cramped controls of small phone screens.',
          'Develop genuine scientific intuition by physically dragging weights, wires, lenses, and measuring rulers.',
          'Perform instant repetitive trials without waiting for chemical solutions to settle or apparatus to be washed.',
          'Access high-caliber laboratory equipment from any home computer or school library PC without barriers.',
          'Build strong digital literacy through interacting with authentic virtual meters, verniers, and digital readouts.'
        ],
        exampleLabs: [
          {
            subject: 'Computer Science',
            title: 'Logic Gates & Digital Circuit Wiring',
            desc: 'Interactive breadboard wiring of AND, OR, NOT, NAND, and XOR gates with real-time truth table verification.'
          },
          {
            subject: 'Physics',
            title: 'Vernier Caliper & Micrometer Screw Gauge',
            desc: 'High-precision interactive millimeter vernier jaws and micrometer thimble with zero-error calibration.'
          },
          {
            subject: 'Chemistry',
            title: 'Interactive Periodic Table & Bohr Shells',
            desc: 'Dynamic electron energy level visualizer displaying element properties, atomic radius, and valence shells.'
          },
          {
            subject: 'Mathematics',
            title: 'Coordinate Geometry & Function Grapher',
            desc: 'Plot linear equations, parabolas, and trigonometric functions with live slope and intercept sliders.'
          }
        ]
      }
    },
    {
      title: 'Real-Time Physics & Math Engines',
      badge: '60 FPS LIVE',
      badgeColor: '#f59e0b',
      description: 'Experience live simulations powered by real-time engines running at 60 FPS. Watch continuous ray tracing, moving particles, harmonic Keplerian planet orbits and Ohm\'s law circuit calculators respond instantly as you change the values, so difficult ideas become easy to see and understand.',
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="chipGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="goldChip" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#chipGlow)" />
          <path d="M12 16 L22 16 L22 22" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="16" r="2" fill="#fbbf24" />
          <path d="M8 32 L20 32" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="8" cy="32" r="2" fill="#fbbf24" />
          <path d="M14 48 L22 48 L22 42" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="14" cy="48" r="2" fill="#fbbf24" />
          <path d="M52 16 L42 16 L42 22" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="52" cy="16" r="2" fill="#fbbf24" />
          <path d="M56 32 L44 32" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="56" cy="32" r="2" fill="#fbbf24" />
          <path d="M50 48 L42 48 L42 42" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="50" cy="48" r="2" fill="#fbbf24" />
          <rect x="20" y="20" width="24" height="24" rx="4" fill="url(#goldChip)" stroke="#fef08a" strokeWidth="1.5" />
          <rect x="23.5" y="23.5" width="17" height="17" rx="2.5" fill="url(#coreGrad)" stroke="#fbbf24" strokeWidth="1" />
          <path d="M28 32 L32 27 L36 32 L32 37 Z" fill="#fbbf24" />
          <circle cx="32" cy="32" r="2" fill="#ffffff" />
          <rect x="25" y="17" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="31" y="17" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="37" y="17" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="25" y="44" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="31" y="44" width="2" height="3" fill="#fbbf24" rx="0.5" />
          <rect x="37" y="44" width="2" height="3" fill="#fbbf24" rx="0.5" />
        </svg>
      ),
      details: {
        whatThisMeans:
          'Unlike pre-rendered animation clips or static textbook illustrations, our simulation engines calculate physical and mathematical differential equations at sixty frames per second in real time. When a student adjusts voltage, changes the refraction index, alters projectile velocity, or modulates frequency, the system recalculates live physical state vectors instantly. Learners witness continuous, mathematically accurate responses that directly prove scientific equations with rigorous precision.',
        whatYouWillFind: [
          '60 FPS physics engines computing projectile trajectory arcs, friction, and elastic/inelastic collisions',
          'Dynamic geometric ray-tracing optics passing light beams through convex/concave lenses and glass prisms',
          'Kinetic gas molecular simulators with live temperature, pressure, and particle collision frequency readouts',
          'Electric circuit network solvers calculating Ohm’s Law and Kirchhoff’s Laws with live multimeters',
          'Harmonic oscillator wave tanks demonstrating constructive/destructive interference and diffraction patterns',
          'Planetary gravitational mechanics calculating Kepler’s laws with elliptical orbits and orbital velocity vectors',
          'Mathematical trigonometry visualizers linking unit circle angle degrees synchronously to sine and cosine waves'
        ],
        classesCovered:
          'Aligned with Middle School Science (Grades 6-8), Secondary SSC Matric Physics & Maths (Grades 9-10), and Higher Secondary HSSC / FSc Pre-Engineering & Pre-Medical (Grades 11-12).',
        howTeachersUse: [
          'Pose challenging "what-if" hypotheses during lectures (e.g., doubling circuit resistance or altering planetary gravity).',
          'Validate theoretical textbook derivations by contrasting analytical mathematical formulas with live numerical runs.',
          'Pause simulations mid-flight at critical peaks to spotlight instantaneous force vectors, velocity, and acceleration.',
          'Illustrate complex acoustic Doppler shifts and harmonic wave resonance using visual and audio frequencies.',
          'Conduct predictive classroom polls before dragging sliders to assess student conceptual understanding.'
        ],
        howStudentsBenefit: [
          'Transform abstract, intimidating formulas (F = ma, V = IR, PV = nRT) into living, tangible visual phenomena.',
          'Uncover scientific laws naturally through active play, hypothesis testing, and empirical verification.',
          'Safely explore extreme scenarios (near-vacuum pressure, thousand-volt circuits, absolute zero) impossible in school labs.',
          'Receive instant visual reinforcement that eliminates misconceptions and cements long-term memory retention.',
          'Overcome math anxiety by viewing dynamic graphs animate in real-time synchronicity with quantitative numbers.'
        ],
        exampleLabs: [
          {
            subject: 'Physics',
            title: 'Projectile Motion & Ballistics Engine',
            desc: 'Adjust launch angle, muzzle velocity, air resistance, and gravity to track trajectory heights and flight times.'
          },
          {
            subject: 'Physics',
            title: 'Ohm’s Law & Series-Parallel Resistor Circuits',
            desc: 'Interactively adjust power source voltage and resistor ratings while measuring current with live digital ammeters.'
          },
          {
            subject: 'Chemistry',
            title: 'Kinetic Molecular Gas Laws Simulation',
            desc: 'Pump gas particles into an airtight chamber to observe Boyle’s and Charles’s laws with real-time pressure gauges.'
          },
          {
            subject: 'Mathematics',
            title: 'Trigonometric Unit Circle & Wave Synthesizer',
            desc: 'Rotate the unit circle phasor arm to watch sine and cosine waves generate synchronously in real time.'
          }
        ]
      }
    },
    {
      title: 'True 4K Fullscreen Projection',
      badge: 'CINEMA 4K UHD',
      badgeColor: '#a855f7',
      description: 'Open any lab in single-click theater mode to remove browser distractions and fill the whole display in sharp 4K quality. It is perfect for high-impact classroom lectures, science demonstrations and group learning on large screens.',
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="projGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="projBeam" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#e879f9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#c026d3" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#projGlow)" />
          <polygon points="18,32 54,12 54,52" fill="url(#projBeam)" />
          <rect x="8" y="24" width="20" height="16" rx="3.5" fill="#1e1b4b" stroke="#c084fc" strokeWidth="1.5" />
          <ellipse cx="28" cy="32" rx="4" ry="6" fill="url(#lensGrad)" stroke="#e879f9" strokeWidth="1.4" />
          <ellipse cx="29" cy="32" rx="1.8" ry="3" fill="#ffffff" fillOpacity="0.9" />
          <rect x="25" y="28" width="2" height="8" fill="#a855f7" />
          <rect x="38" y="16" width="20" height="32" rx="2" fill="#0f172a" stroke="url(#frameGrad)" strokeWidth="1.8" />
          <text x="48" y="32" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">4K</text>
          <text x="48" y="41" textAnchor="middle" dominantBaseline="middle" fill="#f472b6" fontSize="6" fontWeight="800" fontFamily="system-ui, sans-serif">UHD</text>
        </svg>
      ),
      details: {
        whatThisMeans:
          'Every virtual lab features a dedicated Full Screen mode that leverages the browser Fullscreen API to occupy 100% of display real estate. By stripping away browser address bars, tabs, taskbars, and desktop notifications, students enter an immersive theater environment. High-DPI canvas renderers and SVG vector assets guarantee that vernier tick marks, measurement dials, chemical beakers, and textual notations remain tack-sharp on 65-inch to 85-inch interactive classroom boards.',
        whatYouWillFind: [
          'Instant Full Screen toggle button on every lab with native escape key exit and auto-scaling controls',
          'Lossless 4K Ultra HD vector rendering that never shows pixelation or blur on large classroom monitors',
          'Distraction-free theater presentation mode that conceals browser toolbars, bookmarks, and desktop clutter',
          'High-contrast scientific indicators and enlarged typography easily visible from the back row of large classrooms',
          'Proportional aspect-ratio preservation ensuring circular orbits remain circular and square grids remain square',
          'Touch-optimized UI buttons (Reset, Fullscreen, Parameters, Info) positioned cleanly for classroom touchscreens',
          'Optimized display performance for Promethean, SMART Board, ViewSonic, and Android interactive flat panels'
        ],
        classesCovered:
          'Tailored for all classroom settings: Kindergarten/Primary demonstrations (Grades 1-5), Middle School science labs (Grades 6-8), and High School / College lecture theaters (Grades 9-12).',
        howTeachersUse: [
          'Command total classroom focus by expanding simulations across the main classroom projector screen.',
          'Invite student volunteers up to interactive touch panels to operate virtual instruments with touch pens.',
          'Conduct engaging whole-group prediction challenges and collaborative experiments during live lectures.',
          'Capture clean, professional screen recordings for blended flipped classroom videos without window chrome.',
          'Keep student attention centered purely on scientific inquiry during pre-examination review sessions.'
        ],
        howStudentsBenefit: [
          'Experience a cinema-grade visual lab environment that makes learning science feel captivating and modern.',
          'Read fine measurement increments, meniscus levels, and gauge needles with effortless visual clarity.',
          'Maintain deep cognitive focus without the distraction of browser tabs, social notifications, or background apps.',
          'Participate actively from anywhere in the lecture hall because all data plots and labels are enlarged and crisp.',
          'Enjoy an authentic simulator experience on par with commercial aviation, medical, and engineering simulators.'
        ],
        exampleLabs: [
          {
            subject: 'Biology',
            title: '3D Human Heart & Cardiac Anatomy',
            desc: 'Magnificent full-screen beating 3D heart with cross-section chambers, pumping valves, and dynamic blood flow.'
          },
          {
            subject: 'Earth & Space',
            title: '3D Solar System & Planetary Orbits',
            desc: 'Cinema-grade 4K planetary rotation and orbital resonance simulator with zoomable planetary textures.'
          },
          {
            subject: 'Physics',
            title: 'Wave Interference & Ripple Tank Lab',
            desc: 'Full-display dual-point wave generator showing constructive/destructive crests, troughs, and diffraction.'
          },
          {
            subject: 'Chemistry',
            title: 'Acid-Base Titration & Burette Drop Lab',
            desc: 'Enlarged high-contrast burette meniscus, dropwise acid-base mixing, and instantaneous pH color indicator changes.'
          }
        ]
      }
    },
    {
      title: 'Multidisciplinary Curriculum & English Arts',
      badge: 'STEM + ARTS',
      badgeColor: '#10b981',
      description: 'Our labs are aligned with elementary, secondary and higher-level competencies across Physics, Chemistry, Biology, Earth & Space, Math, Computer Science and English Language Arts. One portal covers many subjects and helps teachers and students learn step by step with the curriculum.',
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="bookGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="pagesLeft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id="pagesRight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#bookGlow)" />
          <path d="M8 44 Q32 49 56 44 L56 46 Q32 51 8 46 Z" fill="#064e3b" />
          <path d="M10 20 Q32 23 32 43 Q10 40 8 43 Z" fill="url(#bookCover)" stroke="#34d399" strokeWidth="1.2" />
          <path d="M54 20 Q32 23 32 43 Q54 40 56 43 Z" fill="url(#bookCover)" stroke="#34d399" strokeWidth="1.2" />
          <path d="M11 19 Q31 22 31 41 Q12 38 10 40 Z" fill="url(#pagesLeft)" stroke="#cbd5e1" strokeWidth="0.8" />
          <path d="M53 19 Q33 22 33 41 Q52 38 54 40 Z" fill="url(#pagesRight)" stroke="#cbd5e1" strokeWidth="0.8" />
          <path d="M32 22 L32 48 L35 44 L38 48 L38 23" fill="#10b981" stroke="#059669" strokeWidth="0.8" />
          <polygon points="20,15 24,15 22,20" fill="#f59e0b" />
          <polygon points="40,15 44,15 42,20" fill="#ec4899" />
          <text x="20" y="32" textAnchor="middle" dominantBaseline="middle" fill="#0f766e" fontSize="9" fontWeight="900" fontFamily="serif">A</text>
          <text x="44" y="28" textAnchor="middle" dominantBaseline="middle" fill="#0f766e" fontSize="9" fontWeight="900" fontFamily="serif">π</text>
          <text x="44" y="37" textAnchor="middle" dominantBaseline="middle" fill="#047857" fontSize="7" fontWeight="900" fontFamily="serif">Ω</text>
        </svg>
      ),
      details: {
        whatThisMeans:
          'This platform eliminates subject boundaries by integrating traditional STEM sciences (Science, Technology, Engineering, Mathematics) with English Language Arts and Urdu Linguistics in one unified digital campus. Directly aligned with the National Curriculum of Pakistan (Session 2026-27) and international Cambridge standards, the portal supports comprehensive cognitive development. Students develop not only analytical scientific comprehension but also master language syntax, phonetics, and academic writing in both national and global languages.',
        whatYouWillFind: [
          'Physics Labs: Mechanics, thermal physics, optics, sound, electrostatics, electromagnetism, and modern atomic models',
          'Chemistry Labs: Atomic structures, periodic trends, chemical bonding, acids & bases, electrochemistry, and stoichiometry',
          'Biology Labs: Cytology, human circulatory system, genetic inheritance, plant photosynthesis, ecology, and enzymes',
          'Mathematics Labs: Arithmetic, fraction visualizers, linear equations, coordinate geometry, calculus, and probability',
          'Earth & Space Labs: Solar system planetary orbits, lunar phases, water cycle, tectonic plates, and atmospheric weather',
          'Computer Science Labs: Logic gate breadboards, binary-decimal conversion, algorithms, and CPU registers',
          'English Language Arts: Interactive verb tenses timeline, spatial prepositions, sentence syntax, and phonics sounds',
          'Urdu & Linguistics: Interactive Haroof-e-Tahajji letter strokes, phonetics, vocabulary building, and grammar parts of speech'
        ],
        classesCovered:
          'Comprehensive sequential curriculum spanning Early Childhood & Elementary (Grades 1-5), Middle School (Grades 6-8), Secondary SSC Matric (Grades 9-10), and Higher Secondary HSSC / FSc Pre-Engineering, Pre-Medical & ICS (Grades 11-12).',
        howTeachersUse: [
          'Design interdisciplinary lesson plans where language mastery directly supports scientific report writing and presentations.',
          'Overcome English language barriers for second-language learners using dynamic visual simulations paired with clear definitions.',
          'Utilize Urdu phonetics and Haroof-e-Tahajji interactive modules in primary grades to develop native language literacy.',
          'Directly align school lesson plans with official National Curriculum of Pakistan Student Learning Outcomes (SLOs).',
          'Provide differentiated assignments where visual learners explore interactive models and advanced learners investigate quantitative parameters.'
        ],
        howStudentsBenefit: [
          'Master complex scientific terminology in authentic context rather than through mechanical rote memorization.',
          'Cultivate balanced brain development by connecting analytical logical reasoning with creative language expression.',
          'Transition seamlessly between primary, middle, and matric stages with a uniform, familiar interface across all subjects.',
          'Strengthen bilingual confidence and communication skills through integrated English and Urdu learning modules.',
          'Secure higher scores on board examinations by pairing conceptual theoretical understanding with vivid mental imagery.'
        ],
        exampleLabs: [
          {
            subject: 'English Language Arts',
            title: 'Interactive Verb Tenses Timeline & Syntax Builder',
            desc: 'Master Past, Present, and Future tenses with interactive timeline scrubbing and dynamic sentence construction.'
          },
          {
            subject: 'Urdu & Linguistics',
            title: 'Haroof-e-Tahajji & Alphabetic Phonics Explorer',
            desc: 'Interactive Urdu letter stroke animations, audio phonetics, and illustrated vocabulary associations.'
          },
          {
            subject: 'Biology',
            title: 'Plant Cell vs Animal Cell Organelle Explorer',
            desc: 'Interactive microscopic zoom on cell walls, chloroplasts, and mitochondria with bilingual descriptive tooltips.'
          },
          {
            subject: 'Chemistry',
            title: 'States of Matter & Phase Transition Chambers',
            desc: 'Observe solid lattice structures, liquid fluidity, and gas dispersal with interactive temperature controls.'
          }
        ]
      }
    }
  ];

  // Carousel state for one-card-at-a-time sliding carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide every 13 seconds continuously in an endless loop
  // The automatic changing NEVER stops: not on hover, mouse move, click, focus, touch, or scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 13000);

    return () => clearInterval(interval);
  }, []);

  // Seamless endless loop: when reaching cloned card 0 (index 4), silently reset to 0
  const handleTransitionEnd = () => {
    if (currentIndex >= features.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) > 40) {
      setIsTransitioning(true);
      if (diff > 0) {
        // Swiped left -> next
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Swiped right -> prev
        setCurrentIndex((prev) => (prev <= 0 ? features.length - 1 : prev - 1));
      }
    }
  };

  // 4 items + 1 clone of first card for seamless endless loop
  const displayItems = [...features, features[0]];

  return (
    <section 
      id="features" 
      className="reveal-up w-full rounded-2xl p-4 sm:p-6 space-y-4 transition-all border shadow-lg"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#DDE5F3',
        boxShadow: '0 8px 24px rgba(27, 42, 92, 0.08)'
      }}
    >
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3.5"
        style={{ borderColor: '#DDE5F3' }}
      >
        <div className="reveal-left">
          <span 
            className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider inline-block mb-1.5 border font-mono"
            style={{
              backgroundColor: '#1546A8',
              color: '#FFFFFF',
              borderColor: '#2D62D1'
            }}
          >
            Digital Laboratory Architecture
          </span>
          <h2 
            className="text-xl sm:text-2xl font-black tracking-tight text-[#1B2A5C] font-heading"
          >
            Professional STEM Educational Website Capabilities
          </h2>
        </div>
        <div 
          className="reveal-right flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 border shadow-2xs"
          style={{
            backgroundColor: '#EEF3F9',
            color: '#1B2A5C',
            borderColor: '#DDE5F3'
          }}
        >
          <ShieldCheck className="w-4 h-4 text-[#1E88E5]" />
          <span>Verified Digital Laboratory Standard</span>
        </div>
      </div>

      {/* One-card-at-a-time sliding carousel - Full width of section */}
      <div 
        className="w-full mx-auto overflow-hidden rounded-2xl relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex w-full items-stretch"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            willChange: 'transform'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayItems.map((feat, idx) => {
            const actualIdx = idx % features.length;
            const theme = getThemeForIndex(actualIdx);

            return (
              <div 
                key={idx}
                className="w-full shrink-0 flex flex-col"
              >
                <div 
                  className="p-6 sm:p-8 md:p-10 rounded-2xl relative flex flex-col justify-between group transition-all duration-200 cursor-default select-none border h-full"
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.borderColor,
                    boxShadow: theme.boxShadow
                  }}
                >
                  <div className="relative z-10 space-y-6">
                    {/* Header with 3D Icon & Feature Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div 
                        className="reveal-zoom w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 p-2.5 sm:p-3 group-hover:scale-105 transition-transform border shadow-xs"
                        style={{
                          backgroundColor: theme.pedestalBg,
                          borderColor: theme.pedestalBorder
                        }}
                      >
                        {feat.renderIcon()}
                      </div>
                      <span 
                        className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-mono font-bold tracking-wide uppercase border shadow-2xs"
                        style={{
                          backgroundColor: theme.badgeBg,
                          color: theme.badgeText,
                          borderColor: theme.badgeBorder
                        }}
                      >
                        {feat.badge}
                      </span>
                    </div>

                    {/* Title and Original Description */}
                    <div>
                      <h3 
                        className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-2.5 leading-snug font-heading"
                        style={{ color: theme.titleColor }}
                      >
                        {feat.title}
                      </h3>
                      <p 
                        className="text-sm sm:text-base md:text-lg font-normal leading-relaxed"
                        style={{ color: theme.textColor }}
                      >
                        {feat.description}
                      </p>
                    </div>

                    {/* Detailed Educational Architecture Breakdown */}
                    <div className="pt-6 border-t border-slate-200/80 space-y-5">
                      {/* Row 1: What this means & Classes and levels covered */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                        <div className="lg:col-span-2 p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: theme.accentColor }} />
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-slate-800">
                              What this means
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {feat.details.whatThisMeans}
                          </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <GraduationCap className="w-4 h-4 shrink-0" style={{ color: theme.accentColor }} />
                              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-slate-800">
                                Classes & Levels Covered
                              </h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                              {feat.details.classesCovered}
                            </p>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-blue-100/70 text-blue-800 border border-blue-200">
                              Primary (1-5)
                            </span>
                            <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-amber-100/70 text-amber-800 border border-amber-200">
                              Middle (6-8)
                            </span>
                            <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-indigo-100/70 text-indigo-800 border border-indigo-200">
                              Matric (9-10)
                            </span>
                            <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                              FSc (11-12)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: What you will find & How teachers use it */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <div className="p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 shrink-0" style={{ color: theme.accentColor }} />
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-slate-800">
                              What you will find in the labs
                            </h4>
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                            {feat.details.whatYouWillFind.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs">
                          <div className="flex items-center gap-2 mb-3">
                            <Users className="w-4 h-4 shrink-0" style={{ color: theme.accentColor }} />
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-slate-800">
                              How teachers can use it in class
                            </h4>
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                            {feat.details.howTeachersUse.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Row 3: How students benefit & Real Example Labs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <div className="p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 shrink-0" style={{ color: theme.accentColor }} />
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-slate-800">
                              How students benefit
                            </h4>
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                            {feat.details.howStudentsBenefit.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-2xs">
                          <div className="flex items-center gap-2 mb-3">
                            <Compass className="w-4 h-4 shrink-0" style={{ color: theme.accentColor }} />
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-slate-800">
                              Examples of labs
                            </h4>
                          </div>
                          <div className="space-y-2.5">
                            {feat.details.exampleLabs.map((lab, i) => (
                              <div key={i} className="p-2.5 sm:p-3 rounded-lg bg-white border border-slate-200/80 shadow-3xs">
                                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                                  <span 
                                    className="text-[10px] sm:text-[11px] font-bold font-mono px-2 py-0.5 rounded text-white"
                                    style={{ backgroundColor: theme.accentColor }}
                                  >
                                    {lab.subject}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-900">{lab.title}</span>
                                </div>
                                <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                                  {lab.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Navigation Indicator Dots & Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
            Capability {((currentIndex % features.length) + 1)} of {features.length}
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-xs font-semibold text-slate-500">
            Auto-advancing continuously every 13 seconds
          </span>
        </div>

        <div className="flex items-center gap-2">
          {features.map((f, i) => {
            const isActive = (currentIndex % features.length) === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(i);
                }}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  isActive ? 'w-8 bg-[#1546A8]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Jump to ${f.title}`}
                title={`${i + 1}. ${f.title}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

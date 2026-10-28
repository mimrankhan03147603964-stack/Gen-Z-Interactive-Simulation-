import React, { useEffect, useRef } from 'react';

type StemObjectType = 
  | 'atom' 
  | 'benzene' 
  | 'water_molecule' 
  | 'dna' 
  | 'math_polyhedron' 
  | 'wave_packet' 
  | 'math_symbols' 
  | 'flask_reaction';

interface StemSimulationObject {
  type: StemObjectType;
  x: number;
  y: number;
  baseX: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayAmp: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  rotation3D: number;
  rotation3DSpeed: number;
  opacity: number;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
  symbolChar?: string;
  subType?: number;
}

const STEM_PALETTES = [
  // Physics Quantum Blue
  { primary: '#2563EB', secondary: '#60A5FA', accent: '#93C5FD', glow: 'rgba(37, 99, 235, 0.35)' },
  // Chemistry Emerald Green
  { primary: '#059669', secondary: '#10B981', accent: '#6EE7B7', glow: 'rgba(16, 185, 129, 0.35)' },
  // Biology Crimson & Coral
  { primary: '#DC2626', secondary: '#F87171', accent: '#FECACA', glow: 'rgba(239, 68, 68, 0.35)' },
  // Mathematics Royal Violet
  { primary: '#7C3AED', secondary: '#A78BFA', accent: '#DDD6FE', glow: 'rgba(124, 58, 237, 0.35)' },
  // Energy Amber & Gold
  { primary: '#D97706', secondary: '#FBBF24', accent: '#FDE68A', glow: 'rgba(217, 119, 6, 0.35)' },
  // Cyber Cyan & Tech
  { primary: '#0891B2', secondary: '#06B6D4', accent: '#67E8F9', glow: 'rgba(8, 145, 178, 0.35)' },
  // Rose & Bio-Genetics
  { primary: '#DB2777', secondary: '#F472B6', accent: '#FBCFE8', glow: 'rgba(219, 39, 119, 0.35)' },
];

const MATH_SYMBOLS = ['π', '∑', '∫', '∞', 'Δ', '√', 'λ', 'θ', 'Ω', 'μ'];

export const ThreeStemBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse movement interaction: slight gentle breeze & 3D tilt for laptop/desktop
    let targetBreezeX = 0;
    let targetBreezeY = 0;
    let breezeX = 0;
    let breezeY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / width) - 0.5;
      const normY = (e.clientY / height) - 0.5;
      targetBreezeX = normX * 18;
      targetBreezeY = normY * 10;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Object types pool for simulation website
    const OBJECT_TYPES: StemObjectType[] = [
      'atom',
      'benzene',
      'water_molecule',
      'dna',
      'math_polyhedron',
      'wave_packet',
      'math_symbols',
      'flask_reaction'
    ];

    // Number of simulation objects scaled for laptops & desktop screens
    const objectCount = Math.max(20, Math.min(36, Math.floor(width / 50)));
    const objects: StemSimulationObject[] = [];

    const createStemObject = (initialY?: number): StemSimulationObject => {
      const type = OBJECT_TYPES[Math.floor(Math.random() * OBJECT_TYPES.length)];
      const palette = STEM_PALETTES[Math.floor(Math.random() * STEM_PALETTES.length)];
      const x = Math.random() * width;
      const size = 26 + Math.random() * 24; // 26px to 50px

      return {
        type,
        x,
        baseX: x,
        y: initialY !== undefined ? initialY : height + Math.random() * (height * 0.5),
        size,
        speedY: 0.45 + Math.random() * 0.65, // Smooth floating ascent
        swaySpeed: 0.012 + Math.random() * 0.016,
        swayAmp: 14 + Math.random() * 22,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        rotation3D: Math.random() * Math.PI * 2,
        rotation3DSpeed: 0.015 + Math.random() * 0.025,
        opacity: 0.45 + Math.random() * 0.35, // High clarity, soft elegance (45% - 80%)
        colorScheme: palette,
        symbolChar: MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)],
        subType: Math.floor(Math.random() * 3),
      };
    };

    // Initialize evenly spread across the initial screen viewport
    for (let i = 0; i < objectCount; i++) {
      objects.push(createStemObject(Math.random() * height * 1.2));
    }

    let time = 0;

    // Helper: Draw 3D Shaded Sphere (Atom/Particle)
    const drawSphere = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      baseColor: string,
      highlightColor: string,
      alpha: number
    ) => {
      context.save();
      const grad = context.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      grad.addColorStop(0, highlightColor);
      grad.addColorStop(0.65, baseColor);
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.85)');

      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = grad;
      context.globalAlpha = alpha;
      context.fill();

      // Specular highlight gloss
      context.beginPath();
      context.arc(cx - radius * 0.3, cy - radius * 0.3, radius * 0.25, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 255, 255, 0.7)';
      context.fill();
      context.restore();
    };

    // Helper: Draw 3D Rutherford-Bohr Atom Model
    const drawAtom = (
      context: CanvasRenderingContext2D,
      obj: StemSimulationObject,
      t: number
    ) => {
      const { size, colorScheme, opacity, rotation3D } = obj;
      const r = size * 0.85;

      context.save();
      // Central glowing nucleus (composite cluster of protons & neutrons)
      drawSphere(context, 0, 0, r * 0.28, colorScheme.primary, colorScheme.accent, opacity);
      drawSphere(context, r * 0.12, -r * 0.1, r * 0.18, colorScheme.secondary, '#FFFFFF', opacity * 0.9);
      drawSphere(context, -r * 0.1, r * 0.12, r * 0.18, '#EF4444', '#FECACA', opacity * 0.9);

      // 3 Orbital Elliptical Rings
      const ringAngles = [0, Math.PI / 3, (2 * Math.PI) / 3];
      ringAngles.forEach((angle, idx) => {
        context.save();
        context.rotate(angle);

        // Orbital path
        context.beginPath();
        context.ellipse(0, 0, r, r * 0.36, 0, 0, Math.PI * 2);
        context.strokeStyle = colorScheme.secondary;
        context.globalAlpha = opacity * 0.55;
        context.lineWidth = 1.5;
        context.stroke();

        // Orbiting electron with glow
        const electronT = rotation3D * (1.2 + idx * 0.4) + idx * 2;
        const ex = Math.cos(electronT) * r;
        const ey = Math.sin(electronT) * (r * 0.36);
        drawSphere(context, ex, ey, r * 0.1, colorScheme.accent, '#FFFFFF', opacity);

        context.restore();
      });

      context.restore();
    };

    // Helper: Draw Organic Chemistry Benzene Ring (C6H6)
    const drawBenzene = (
      context: CanvasRenderingContext2D,
      obj: StemSimulationObject,
      t: number
    ) => {
      const { size, colorScheme, opacity } = obj;
      const r = size * 0.75;
      const vertices: { x: number; y: number }[] = [];

      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        vertices.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r });
      }

      context.save();

      // Outer hexagonal covalent bonds
      context.beginPath();
      vertices.forEach((pt, i) => {
        if (i === 0) context.moveTo(pt.x, pt.y);
        else context.lineTo(pt.x, pt.y);
      });
      context.closePath();
      context.strokeStyle = colorScheme.primary;
      context.lineWidth = 2.2;
      context.globalAlpha = opacity * 0.85;
      context.stroke();

      // Inner delocalized resonance aromatic pi-ring
      context.beginPath();
      context.arc(0, 0, r * 0.55, 0, Math.PI * 2);
      context.strokeStyle = colorScheme.secondary;
      context.lineWidth = 1.6;
      context.setLineDash([4, 4]);
      context.globalAlpha = opacity * 0.7;
      context.stroke();
      context.setLineDash([]);

      // Carbon atoms at vertices + outer Hydrogen bonds
      vertices.forEach((pt, i) => {
        // Carbon atom sphere
        drawSphere(context, pt.x, pt.y, r * 0.16, '#1E293B', '#94A3B8', opacity);

        // Radial Hydrogen bond
        const hx = pt.x * 1.35;
        const hy = pt.y * 1.35;
        context.beginPath();
        context.moveTo(pt.x, pt.y);
        context.lineTo(hx, hy);
        context.strokeStyle = colorScheme.accent;
        context.lineWidth = 1.4;
        context.globalAlpha = opacity * 0.6;
        context.stroke();

        // Hydrogen atom sphere
        drawSphere(context, hx, hy, r * 0.11, colorScheme.secondary, '#FFFFFF', opacity);
      });

      context.restore();
    };

    // Helper: Draw Ball-and-Stick Molecule (Water H2O / Methane CH4)
    const drawMolecule = (
      context: CanvasRenderingContext2D,
      obj: StemSimulationObject,
      t: number
    ) => {
      const { size, colorScheme, opacity, rotation3D, subType } = obj;
      const r = size * 0.8;

      context.save();
      if (subType === 0) {
        // Water Molecule (H2O): Bent geometry 104.5 degrees
        const angle = 104.5 * (Math.PI / 180);
        const h1x = Math.cos(-angle / 2) * r;
        const h1y = Math.sin(-angle / 2) * r;
        const h2x = Math.cos(angle / 2) * r;
        const h2y = Math.sin(angle / 2) * r;

        // Covalent Bond cylinders
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(h1x, h1y);
        context.moveTo(0, 0);
        context.lineTo(h2x, h2y);
        context.strokeStyle = '#94A3B8';
        context.lineWidth = 3.5;
        context.lineCap = 'round';
        context.globalAlpha = opacity * 0.8;
        context.stroke();

        // Oxygen central atom (Red/Vibrant)
        drawSphere(context, 0, 0, r * 0.32, '#EF4444', '#FECACA', opacity);

        // Hydrogen atoms (Cyan/White)
        drawSphere(context, h1x, h1y, r * 0.2, '#06B6D4', '#E0F2FE', opacity);
        drawSphere(context, h2x, h2y, r * 0.2, '#06B6D4', '#E0F2FE', opacity);
      } else {
        // Branched Multi-Atom Molecule (Methane/Ethanol skeleton)
        const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
        angles.forEach((ang) => {
          const px = Math.cos(ang + rotation3D * 0.5) * r;
          const py = Math.sin(ang + rotation3D * 0.5) * r;

          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(px, py);
          context.strokeStyle = '#64748B';
          context.lineWidth = 3;
          context.globalAlpha = opacity * 0.75;
          context.stroke();

          drawSphere(context, px, py, r * 0.18, colorScheme.secondary, '#FFFFFF', opacity);
        });

        // Center carbon
        drawSphere(context, 0, 0, r * 0.3, colorScheme.primary, colorScheme.accent, opacity);
      }
      context.restore();
    };

    // Helper: Draw 3D DNA Double Helix Fragment
    const drawDNA = (
      context: CanvasRenderingContext2D,
      obj: StemSimulationObject,
      t: number
    ) => {
      const { size, opacity, rotation3D } = obj;
      const h = size * 1.8;
      const w = size * 0.6;
      const steps = 7;

      context.save();
      for (let i = 0; i < steps; i++) {
        const progress = i / (steps - 1);
        const y = (progress - 0.5) * h;
        const phase = rotation3D + progress * Math.PI * 2.2;
        const x1 = Math.cos(phase) * (w * 0.5);
        const x2 = -x1;
        const depth = Math.sin(phase);

        // Base-pair rung ladder connector
        context.beginPath();
        context.moveTo(x1, y);
        context.lineTo(0, y);
        context.strokeStyle = '#10B981'; // Emerald (Adenine)
        context.lineWidth = 2.2;
        context.globalAlpha = opacity * (0.6 + depth * 0.3);
        context.stroke();

        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(x2, y);
        context.strokeStyle = '#F59E0B'; // Amber (Thymine)
        context.lineWidth = 2.2;
        context.globalAlpha = opacity * (0.6 - depth * 0.3);
        context.stroke();

        // Sugar-phosphate backbone nodes
        drawSphere(context, x1, y, 3.8, '#2563EB', '#93C5FD', opacity);
        drawSphere(context, x2, y, 3.8, '#EC4899', '#FBCFE8', opacity);
      }
      context.restore();
    };

    // Helper: Draw 3D Wireframe Polyhedron (Octahedron / Math Geometry)
    const drawPolyhedron = (
      context: CanvasRenderingContext2D,
      obj: StemSimulationObject,
      t: number
    ) => {
      const { size, colorScheme, opacity, rotation3D } = obj;
      const r = size * 0.75;
      const rot = rotation3D;

      // 3D vertices of an octahedron rotated along Y and X axes
      const baseVerts = [
        { x: 0, y: -1, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: -1, y: 0, z: 0 },
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 0, z: -1 },
      ];

      // Rotate around Y and X
      const projected = baseVerts.map((v) => {
        // Y rotation
        const cosY = Math.cos(rot);
        const sinY = Math.sin(rot);
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;

        // X rotation
        const cosX = Math.cos(rot * 0.7);
        const sinX = Math.sin(rot * 0.7);
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        return { x: x1 * r, y: y2 * r, z: z2 };
      });

      // Octahedron edges connecting vertices
      const edges = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2]
      ];

      context.save();
      edges.forEach(([i, j]) => {
        context.beginPath();
        context.moveTo(projected[i].x, projected[i].y);
        context.lineTo(projected[j].x, projected[j].y);
        context.strokeStyle = colorScheme.primary;
        context.lineWidth = 1.6;
        context.globalAlpha = opacity * 0.75;
        context.stroke();
      });

      // Glowing vertex markers
      projected.forEach((p) => {
        drawSphere(context, p.x, p.y, 3.2, colorScheme.accent, '#FFFFFF', opacity);
      });
      context.restore();
    };

    // Helper: Draw Physics Wave Packet / Electromagnetic Photon Wave
    const drawWavePacket = (
      context: CanvasRenderingContext2D,
      obj: StemSimulationObject,
      t: number
    ) => {
      const { size, colorScheme, opacity, rotation3D } = obj;
      const w = size * 1.6;
      const points = 24;

      context.save();
      // Electric Field Sine wave
      context.beginPath();
      for (let i = 0; i <= points; i++) {
        const px = (i / points - 0.5) * w;
        // Gaussian envelope modulated wave packet
        const env = Math.exp(-Math.pow(px / (w * 0.35), 2));
        const py = Math.sin((i / points) * Math.PI * 4 + rotation3D * 2) * (size * 0.45) * env;
        if (i === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }
      context.strokeStyle = colorScheme.primary;
      context.lineWidth = 2.4;
      context.globalAlpha = opacity * 0.85;
      context.stroke();

      // Magnetic field orthogonal subtle wave
      context.beginPath();
      for (let i = 0; i <= points; i++) {
        const px = (i / points - 0.5) * w;
        const env = Math.exp(-Math.pow(px / (w * 0.35), 2));
        const pz = Math.cos((i / points) * Math.PI * 4 + rotation3D * 2) * (size * 0.28) * env;
        if (i === 0) context.moveTo(px, pz);
        else context.lineTo(px, pz);
      }
      context.strokeStyle = colorScheme.secondary;
      context.lineWidth = 1.4;
      context.globalAlpha = opacity * 0.55;
      context.stroke();
      context.restore();
    };

    // Helper: Draw Mathematical Symbols with 3D Bevel Aura
    const drawMathSymbol = (
      context: CanvasRenderingContext2D,
      obj: StemSimulationObject,
      t: number
    ) => {
      const { size, colorScheme, opacity, symbolChar } = obj;
      if (!symbolChar) return;

      context.save();
      context.font = `bold ${Math.round(size * 1.1)}px "Cambria Math", "KaTeX_Math", "Times New Roman", serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // Soft glow aura
      context.shadowColor = colorScheme.glow;
      context.shadowBlur = 12;

      // Outer gradient text fill
      context.fillStyle = colorScheme.primary;
      context.globalAlpha = opacity * 0.9;
      context.fillText(symbolChar, 0, 0);

      // Inner highlight
      context.fillStyle = colorScheme.accent;
      context.globalAlpha = opacity * 0.6;
      context.fillText(symbolChar, -1, -1);
      context.restore();
    };

    // Helper: Draw Chemistry Erlenmeyer Flask with Bubbles
    const drawFlask = (
      context: CanvasRenderingContext2D,
      obj: StemSimulationObject,
      t: number
    ) => {
      const { size, colorScheme, opacity, rotation3D } = obj;
      const w = size * 0.8;
      const h = size * 1.1;

      context.save();
      context.beginPath();
      // Lip and neck
      context.moveTo(-w * 0.25, -h * 0.5);
      context.lineTo(w * 0.25, -h * 0.5);
      context.lineTo(w * 0.2, -h * 0.15);
      // Triangular conical body
      context.lineTo(w * 0.55, h * 0.45);
      // Curved bottom
      context.quadraticCurveTo(0, h * 0.55, -w * 0.55, h * 0.45);
      context.lineTo(-w * 0.2, -h * 0.15);
      context.closePath();

      // Liquid fill with dynamic meniscus
      context.fillStyle = colorScheme.glow;
      context.globalAlpha = opacity * 0.35;
      context.fill();

      context.strokeStyle = colorScheme.primary;
      context.lineWidth = 1.8;
      context.globalAlpha = opacity * 0.8;
      context.stroke();

      // Effervescent micro-bubbles
      for (let b = 0; b < 3; b++) {
        const bubbleY = h * 0.35 - ((rotation3D * 12 + b * 14) % (h * 0.45));
        const bubbleX = (Math.sin(rotation3D * 3 + b) * w * 0.2);
        drawSphere(context, bubbleX, bubbleY, 2.5, colorScheme.accent, '#FFFFFF', opacity * 0.8);
      }
      context.restore();
    };

    // Main 60 FPS Animation Render Loop
    const render = () => {
      time += 0.02;

      // Smooth breeze dampening
      breezeX += (targetBreezeX - breezeX) * 0.05;
      breezeY += (targetBreezeY - breezeY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];

        // Float upwards smoothly
        obj.y -= obj.speedY;
        obj.rotation += obj.rotationSpeed;
        obj.rotation3D += obj.rotation3DSpeed;

        // Harmonic horizontal sway
        const sway = Math.sin(time * obj.swaySpeed * 60 + obj.swayPhase) * obj.swayAmp;
        const currentX = obj.baseX + sway + breezeX * (obj.size / 30);
        const currentY = obj.y + breezeY;

        // Reset when float above viewport top
        if (currentY < -obj.size * 2) {
          obj.y = height + obj.size + Math.random() * 80;
          obj.baseX = Math.random() * width;
          obj.x = obj.baseX;
          obj.symbolChar = MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)];
        }

        // Render object at calculated matrix
        ctx.save();
        ctx.translate(currentX, currentY);
        ctx.rotate(obj.rotation);

        switch (obj.type) {
          case 'atom':
            drawAtom(ctx, obj, time);
            break;
          case 'benzene':
            drawBenzene(ctx, obj, time);
            break;
          case 'water_molecule':
            drawMolecule(ctx, obj, time);
            break;
          case 'dna':
            drawDNA(ctx, obj, time);
            break;
          case 'math_polyhedron':
            drawPolyhedron(ctx, obj, time);
            break;
          case 'wave_packet':
            drawWavePacket(ctx, obj, time);
            break;
          case 'math_symbols':
            drawMathSymbol(ctx, obj, time);
            break;
          case 'flask_reaction':
            drawFlask(ctx, obj, time);
            break;
          default:
            drawAtom(ctx, obj, time);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
};

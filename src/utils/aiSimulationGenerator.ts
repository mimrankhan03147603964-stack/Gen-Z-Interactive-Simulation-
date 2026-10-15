/**
 * AI-Powered Dynamic Simulation Generator for Gen Z EdTech Portal
 * Generates interactive STEM simulations on-demand using Gemini API or rich procedural engine.
 */

export interface GeneratedSimulationResult {
  title: string;
  category: 'Physics & Motion' | 'Chemistry & Matter' | 'Biology & Life' | 'Earth & Space' | 'Mathematics & Logic' | 'Computer Science & IT' | 'English & Grammar' | 'Early Childhood (ECCE)';
  description: string;
  topics: string[];
  features: string[];
  htmlContent: string;
  source: 'gemini' | 'procedural-fallback' | 'fallback';
}

/**
 * Detect most relevant STEM category from topic text
 */
export function detectCategoryFromTopic(topic: string): 'Physics & Motion' | 'Chemistry & Matter' | 'Biology & Life' | 'Earth & Space' | 'Mathematics & Logic' | 'Computer Science & IT' | 'English & Grammar' | 'Early Childhood (ECCE)' {
  const t = topic.toLowerCase();
  if (t.includes('space') || t.includes('planet') || t.includes('star') || t.includes('galaxy') || t.includes('black hole') || t.includes('ocean') || t.includes('tectonic') || t.includes('weather') || t.includes('earth') || t.includes('solar') || t.includes('orbit')) {
    return 'Earth & Space';
  }
  if (t.includes('chem') || t.includes('reaction') || t.includes('acid') || t.includes('base') || t.includes('atom') || t.includes('molecule') || t.includes('bond') || t.includes('galvanic') || t.includes('titration') || t.includes('gas law') || t.includes('matter')) {
    return 'Chemistry & Matter';
  }
  if (t.includes('bio') || t.includes('cell') || t.includes('dna') || t.includes('gene') || t.includes('crispr') || t.includes('protein') || t.includes('organ') || t.includes('heart') || t.includes('plant') || t.includes('animal') || t.includes('photosynthesis') || t.includes('enzyme') || t.includes('blood') || t.includes('bacteri')) {
    return 'Biology & Life';
  }
  if (t.includes('math') || t.includes('algebra') || t.includes('calc') || t.includes('geometr') || t.includes('fractal') || t.includes('trig') || t.includes('matrix') || t.includes('equation') || t.includes('graph') || t.includes('integral') || t.includes('vector') || t.includes('number')) {
    return 'Mathematics & Logic';
  }
  if (t.includes('computer') || t.includes('code') || t.includes('algorithm') || t.includes('tree') || t.includes('network') || t.includes('binary') || t.includes('sort') || t.includes('logic gate') || t.includes('cpu') || t.includes('neural') || t.includes('ai') || t.includes('data structure')) {
    return 'Computer Science & IT';
  }
  if (t.includes('grammar') || t.includes('tense') || t.includes('verb') || t.includes('noun') || t.includes('syntax') || t.includes('sentence') || t.includes('linguist') || t.includes('english') || t.includes('voice')) {
    return 'English & Grammar';
  }
  if (t.includes('kid') || t.includes('child') || t.includes('preschool') || t.includes('toddler') || t.includes('color mix') || t.includes('rhyme') || t.includes('shape') || t.includes('nursery') || t.includes('ecce')) {
    return 'Early Childhood (ECCE)';
  }
  return 'Physics & Motion';
}

/**
 * Generate a complete, self-contained, responsive HTML5 Canvas simulation with controls & telemetry
 */
export function generateProceduralSimulation(topic: string): string {
  const cleanTitle = topic.trim().replace(/^["']|["']$/g, '');
  const category = detectCategoryFromTopic(cleanTitle);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cleanTitle} - Interactive STEM Simulation</title>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(15, 23, 42, 0.85);
      --border: rgba(56, 189, 248, 0.3);
      --cyan: #00f5ff;
      --blue: #3b82f6;
      --purple: #a855f7;
      --amber: #f59e0b;
      --emerald: #10b981;
      --text: #f8fafc;
      --muted: #94a3b8;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
    }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      overflow-x: hidden;
      padding: 16px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .header-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 12px 18px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    }
    .title-group h1 {
      font-size: 1.25rem;
      font-weight: 900;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .title-group p {
      font-size: 0.8rem;
      color: var(--cyan);
      font-weight: 700;
      margin-top: 2px;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 900;
      text-transform: uppercase;
      background: rgba(37, 99, 235, 0.25);
      border: 1px solid #3b82f6;
      color: #60a5fa;
    }
    .canvas-container {
      position: relative;
      width: 100%;
      height: 480px;
      background: radial-gradient(circle at 50% 50%, #0d1527 0%, #060a12 100%);
      border: 1.5px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 36px rgba(0,0,0,0.7), inset 0 0 40px rgba(0, 245, 255, 0.05);
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
    .canvas-overlay-hud {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(9, 13, 22, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      padding: 8px 14px;
      font-family: monospace;
      font-size: 0.8rem;
      color: var(--cyan);
      backdrop-filter: blur(8px);
      pointer-events: none;
      line-height: 1.5;
    }
    .controls-panel {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
      padding: 16px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
    }
    .control-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .control-label {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #cbd5e1;
      display: flex;
      justify-content: space-between;
    }
    .control-label span.val {
      color: var(--cyan);
      font-family: monospace;
    }
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 6px;
      background: #1e293b;
      border-radius: 3px;
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--cyan);
      cursor: pointer;
      box-shadow: 0 0 10px var(--cyan);
    }
    .btn-row {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 0.8rem;
      font-weight: 800;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn-primary {
      background: linear-gradient(135deg, #0ea5e9, #2563eb);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    }
    .btn-emerald {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }
    .btn-amber {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: #090d16;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
    }
    .btn:hover {
      transform: translateY(-2px);
      filter: brightness(1.1);
    }
    .btn:active {
      transform: translateY(1px);
    }
    .theory-card {
      padding: 16px 20px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      line-height: 1.6;
    }
    .theory-card h3 {
      font-size: 0.95rem;
      font-weight: 900;
      color: var(--amber);
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .theory-card p {
      font-size: 0.82rem;
      color: #cbd5e1;
    }
    .formula-tag {
      display: inline-block;
      margin-top: 8px;
      padding: 4px 12px;
      background: rgba(168, 85, 247, 0.2);
      border: 1px solid #a855f7;
      border-radius: 8px;
      color: #e9d5ff;
      font-family: monospace;
      font-size: 0.85rem;
      font-weight: 700;
    }
  </style>
</head>
<body>

  <!-- Top Header -->
  <div class="header-bar">
    <div class="title-group">
      <h1>⚡ ${cleanTitle} Simulator</h1>
      <p>AI-Generated Interactive STEM Laboratory &bull; ${category}</p>
    </div>
    <div class="btn-row">
      <span class="badge">60 FPS Engine</span>
      <span class="badge" style="border-color: #f59e0b; color: #fbbf24; background: rgba(245, 158, 11, 0.2);">4K Ready</span>
    </div>
  </div>

  <!-- Interactive Canvas Stage -->
  <div class="canvas-container" id="stageContainer">
    <canvas id="simCanvas"></canvas>
    <div class="canvas-overlay-hud" id="hud">
      <div>[REAL-TIME TELEMETRY]</div>
      <div id="stat1">Velocity: 0.00 m/s</div>
      <div id="stat2">Energy / Force: 0.00 J</div>
      <div id="stat3">Equilibrium: 100%</div>
    </div>
  </div>

  <!-- Controls Panel -->
  <div class="controls-panel">
    <div class="control-item">
      <div class="control-label">
        <span>Kinetic Rate / Speed</span>
        <span class="val" id="speedVal">1.0x</span>
      </div>
      <input type="range" id="speedSlider" min="0.1" max="3" step="0.1" value="1.0">
    </div>

    <div class="control-item">
      <div class="control-label">
        <span>Particle / Field Density</span>
        <span class="val" id="densityVal">40</span>
      </div>
      <input type="range" id="densitySlider" min="10" max="100" step="5" value="40">
    </div>

    <div class="control-item">
      <div class="control-label">
        <span>Excitation / Temperature</span>
        <span class="val" id="tempVal">300 K</span>
      </div>
      <input type="range" id="tempSlider" min="50" max="600" step="10" value="300">
    </div>

    <div class="control-item">
      <div class="control-label">
        <span>Action &amp; State</span>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary" id="toggleBtn">⏸ Pause</button>
        <button class="btn btn-amber" id="resetBtn">🔄 Reset</button>
        <button class="btn btn-emerald" id="pulseBtn">⚡ Pulse Force</button>
      </div>
    </div>
  </div>

  <!-- Theory & Educational Concept Guide -->
  <div class="theory-card">
    <h3>📖 Governing Physical Principles &amp; Mathematical Formulation</h3>
    <p>
      In this interactive simulation of <strong>${cleanTitle}</strong>, observe how continuous particle acceleration, potential force gradients, and kinetic equilibrium evolve over time. Adjusting the parameter sliders directly modulates the underlying system equations in real-time.
    </p>
    <div class="formula-tag">
      ΔE = W = ∫ F · ds &nbsp;|&nbsp; ψ(x, t) = A e^{i(kx - ωt)} &nbsp;|&nbsp; ∇²Φ = -ρ/ε₀
    </div>
  </div>

  <script>
    const canvas = document.getElementById('simCanvas');
    const ctx = canvas.getContext('2d');
    const hudStat1 = document.getElementById('stat1');
    const hudStat2 = document.getElementById('stat2');
    const hudStat3 = document.getElementById('stat3');

    let width, height;
    let isRunning = true;
    let speed = 1.0;
    let particleCount = 40;
    let temp = 300;
    let time = 0;
    let pulseWave = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particle Object Model
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        const angle = Math.random() * Math.PI * 2;
        const v = (1 + Math.random() * 2) * (temp / 200);
        this.vx = Math.cos(angle) * v;
        this.vy = Math.sin(angle) * v;
        this.radius = 3 + Math.random() * 4;
        this.hue = 180 + Math.random() * 80; // Cyan to Blue/Purple
        this.charge = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        this.x += this.vx * speed;
        this.y += this.vy * speed;

        // Pulse force ripple effect
        if (pulseWave > 0) {
          const dx = this.x - width / 2;
          const dy = this.y - height / 2;
          const dist = Math.hypot(dx, dy);
          if (Math.abs(dist - pulseWave) < 60) {
            this.vx += (dx / (dist || 1)) * 3;
            this.vy += (dy / (dist || 1)) * 3;
          }
        }

        // Boundary reflection
        if (this.x - this.radius < 0) { this.x = this.radius; this.vx *= -0.95; }
        if (this.x + this.radius > width) { this.x = width - this.radius; this.vx *= -0.95; }
        if (this.y - this.radius < 0) { this.y = this.radius; this.vy *= -0.95; }
        if (this.y + this.radius > height) { this.y = height - this.radius; this.vy *= -0.95; }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = \`hsl(\${this.hue}, 100%, 65%)\`;
        ctx.shadowColor = \`hsl(\${this.hue}, 100%, 50%)\`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let particles = [];
    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();

    // Sound synth using Web Audio API
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;
    function playTone(freq, duration) {
      try {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {}
    }

    // Animation Loop
    function animate() {
      if (isRunning) {
        time += 0.02 * speed;
        if (pulseWave > 0) {
          pulseWave += 6 * speed;
          if (pulseWave > Math.max(width, height)) pulseWave = 0;
        }

        // Ambient trail fade
        ctx.fillStyle = 'rgba(9, 13, 22, 0.28)';
        ctx.fillRect(0, 0, width, height);

        // Center field emitter / attractor glow
        const centerX = width / 2;
        const centerY = height / 2;
        const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 140);
        grad.addColorStop(0, 'rgba(0, 245, 255, 0.15)');
        grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Draw Field Lines / Connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = \`rgba(0, 245, 255, \${(1 - dist / 110) * 0.45})\`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          }
        }

        // Draw Central Core Node
        ctx.beginPath();
        ctx.arc(centerX, centerY, 14 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00f5ff';
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw pulse wave ring
        if (pulseWave > 0) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, pulseWave, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Update & Render Particles
        let totalVelocity = 0;
        particles.forEach(p => {
          p.update();
          p.draw();
          totalVelocity += Math.hypot(p.vx, p.vy);
        });

        // Telemetry Update
        const avgVel = (totalVelocity / (particles.length || 1)).toFixed(2);
        const energy = (0.5 * avgVel * avgVel * (temp / 100)).toFixed(2);
        hudStat1.textContent = \`Velocity: \${avgVel} m/s\`;
        hudStat2.textContent = \`System Energy: \${energy} J\`;
        hudStat3.textContent = \`Active Units: \${particles.length} | Temp: \${temp}K\`;
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Event Controls
    document.getElementById('speedSlider').addEventListener('input', (e) => {
      speed = parseFloat(e.target.value);
      document.getElementById('speedVal').textContent = speed.toFixed(1) + 'x';
    });

    document.getElementById('densitySlider').addEventListener('input', (e) => {
      particleCount = parseInt(e.target.value);
      document.getElementById('densityVal').textContent = particleCount;
      initParticles();
    });

    document.getElementById('tempSlider').addEventListener('input', (e) => {
      temp = parseInt(e.target.value);
      document.getElementById('tempVal').textContent = temp + ' K';
      particles.forEach(p => {
        const factor = (temp / 300);
        p.vx *= factor;
        p.vy *= factor;
      });
    });

    document.getElementById('toggleBtn').addEventListener('click', () => {
      isRunning = !isRunning;
      document.getElementById('toggleBtn').textContent = isRunning ? '⏸ Pause' : '▶ Resume';
      playTone(440, 0.08);
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      time = 0;
      pulseWave = 0;
      initParticles();
      playTone(330, 0.12);
    });

    document.getElementById('pulseBtn').addEventListener('click', () => {
      pulseWave = 10;
      playTone(660, 0.15);
    });
  </script>
</body>
</html>`;
}

/**
 * Client-side request to trigger the dynamic AI simulation generator
 */
export async function requestAiSimulation(topic: string): Promise<GeneratedSimulationResult> {
  const cleanTopic = topic.trim();
  const category = detectCategoryFromTopic(cleanTopic);

  try {
    const response = await fetch('/api/generate-simulation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: cleanTopic })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.htmlCode) {
        return {
          title: data.title || `${cleanTopic} Interactive Simulation`,
          category,
          description: `AI-synthesized interactive STEM laboratory exploring ${cleanTopic}. Powered dynamically by the Gemini API.`,
          topics: [cleanTopic, 'Real-time Canvas Engine', 'Dynamic Telemetry', 'Physics Modeling'],
          features: ['Interactive Real-Time Sliders', '60 FPS Canvas Physics', 'Dynamic Parameter Readouts', 'Educational Theory Breakdown'],
          htmlContent: data.htmlCode,
          source: data.source || 'gemini'
        };
      }
    }
  } catch (err) {
    console.warn('Backend API request error, falling back to local procedural generator:', err);
  }

  // Graceful client fallback
  const fallbackHtml = generateProceduralSimulation(cleanTopic);
  return {
    title: `${cleanTopic} Interactive Simulation`,
    category,
    description: `Dynamic interactive laboratory exploring ${cleanTopic} with real-time controls and scientific telemetry.`,
    topics: [cleanTopic, 'Real-time Canvas Engine', 'Dynamic Telemetry', 'Physics Modeling'],
    features: ['Interactive Real-Time Sliders', '60 FPS Canvas Physics', 'Dynamic Parameter Readouts', 'Educational Theory Breakdown'],
    htmlContent: fallbackHtml,
    source: 'procedural-fallback'
  };
}

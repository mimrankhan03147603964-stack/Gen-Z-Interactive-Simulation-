import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateProceduralSimulation } from './src/utils/aiSimulationGenerator';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

/**
 * AI Dynamic Simulation Generator API Endpoint
 * Synthesizes an interactive HTML5 simulation canvas & controls on the fly using Gemini API
 */
app.post('/api/generate-simulation', async (req: Request, res: Response) => {
  const { topic } = req.body;
  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ error: 'Topic string is required.' });
  }

  const cleanTopic = topic.trim().slice(0, 150);

  // If no Gemini API key configured, use procedural generator
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    const fallbackHtml = generateProceduralSimulation(cleanTopic);
    return res.json({
      success: true,
      topic: cleanTopic,
      title: `${cleanTopic} Interactive Simulation`,
      htmlCode: fallbackHtml,
      source: 'procedural-fallback'
    });
  }

  const prompt = `You are a world-class STEM professor and creative software engineer building an authentic, interactive HTML5 laboratory for the Gen Z Interactive Simulations platform.

Topic to simulate: "${cleanTopic}"

Build a single-file, 100% self-contained HTML5 simulation document (including all CSS in <style> and all JavaScript in <script> tags).

Requirements:
1. Interactive Visual Canvas / Stage:
   - Provide smooth, continuous 60 FPS animation using requestAnimationFrame (e.g. physics mechanics, particle vectors, wave interference, planetary orbits, chemistry reactions, electrical flow, or biological mechanisms).
   - Cyber-STEM aesthetic: high-contrast dark background (#090d16 or #0f172a), vibrant neon colors (#00f5ff cyan, #3b82f6 electric blue, #10b981 emerald, #fbbf24 amber, #f43f5e rose).
2. Interactive Controls & Parameters:
   - 3 to 4 intuitive range sliders with live numeric value readouts (e.g., speed, mass, charge, frequency, temperature, intensity, wavelength, angle).
   - Action buttons: Play/Pause, Reset, and a special action button (e.g., Pulse Force, Add Molecule, Ionize, Ignite, Mutate, depending on topic).
3. Live Telemetry Readout HUD:
   - Real-time numerical metrics displayed on the HUD (e.g., Velocity, Kinetic Energy, Equilibrium, Frequency, Pressure, pH, etc.).
4. Scientific Theory & Mathematics Section:
   - Educational explanation below the canvas detailing the governing laws, formulas (e.g. F = ma, v = fλ, E = hf), and what happens when variables change.
5. High Quality & Standalone:
   - Zero external CDN scripts or libraries (pure vanilla JS and standard HTML5 Canvas/Web Audio).
   - Must resize cleanly and be completely bug-free.

Output format:
Return ONLY the raw HTML source code starting with <!DOCTYPE html> and ending with </html>. Do not include markdown code fence formatting (do not wrap in \`\`\`html or \`\`\`).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    let htmlCode = response.text || '';
    htmlCode = htmlCode
      .replace(/^```html\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    if (!htmlCode.includes('<html') || !htmlCode.includes('<canvas')) {
      htmlCode = generateProceduralSimulation(cleanTopic);
    }

    return res.json({
      success: true,
      topic: cleanTopic,
      title: `${cleanTopic} Interactive Simulation`,
      htmlCode,
      source: 'gemini'
    });
  } catch (err: any) {
    console.error('Gemini API dynamic generation error:', err);
    // Gracefully fallback to high-fidelity procedural simulation
    const fallbackHtml = generateProceduralSimulation(cleanTopic);
    return res.json({
      success: true,
      topic: cleanTopic,
      title: `${cleanTopic} Interactive Simulation`,
      htmlCode: fallbackHtml,
      source: 'fallback'
    });
  }
});

// Start Server & mount Vite in dev or static in prod
async function startServer() {
  const PORT = process.env.PORT || 3000;

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();

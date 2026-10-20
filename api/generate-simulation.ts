type ApiRequest = {
  method?: string;
  body?: any;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (data: any) => ApiResponse | void;
};
import { GoogleGenAI } from '@google/genai';
import { generateProceduralSimulation } from '../src/utils/aiSimulationGenerator';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body || {};
  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ error: 'Topic string is required.' });
  }

  const cleanTopic = topic.trim().slice(0, 150);

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

  const prompt = `You are an expert STEM educator and creative web developer creating an authentic, interactive HTML5 simulation for the Gen Z Interactive Simulations STEM laboratory portal.

The requested STEM simulation topic is: "${cleanTopic}"

Build a single-file, 100% self-contained HTML5 simulation document (including all CSS in <style> and all JavaScript in <script> tags).

Requirements:
1. Interactive Visual Canvas / Stage:
   - Provide smooth, continuous 60 FPS animation using requestAnimationFrame (e.g. physics mechanics, particle vectors, wave interference, planetary orbits, chemistry reactions, electrical flow, or biological mechanisms).
   - Cyber-STEM aesthetic: high-contrast dark background (#090d16 or #0f172a), vibrant neon colors (#00f5ff cyan, #3b82f6 electric blue, #10b981 emerald, #fbbf24 amber, #f43f5e rose).
2. Live Interactive Controls:
   - Sliders with numeric readouts, play/pause, reset, and dynamic force/parameter adjustments.
3. Telemetry Readouts HUD:
   - Dynamic real-time metrics (e.g., velocity, acceleration, energy, frequency, wavelength, pH).
4. Educational Theory:
   - Governing scientific principles and mathematical formulas explained below canvas.
5. 100% standalone with zero external dependencies.

Return ONLY the raw HTML source code starting with <!DOCTYPE html> and ending with </html>. Do not wrap in markdown quotes or backticks.`;

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
    console.error('Vercel API dynamic generation error:', err);
    const fallbackHtml = generateProceduralSimulation(cleanTopic);
    return res.json({
      success: true,
      topic: cleanTopic,
      title: `${cleanTopic} Interactive Simulation`,
      htmlCode: fallbackHtml,
      source: 'fallback'
    });
  }
}

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Sparkles, Layers, Play, Radio, Camera, Check, AlertCircle } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';

interface HeroBannerProps {
  activeSim: SimulationItem;
  isDarkMode?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ activeSim, isDarkMode = false }) => {
  const [time, setTime] = useState<string>('');
  const [period, setPeriod] = useState<string>('PM');
  const [dateStr, setDateStr] = useState<string>('');
  
  // Custom permanent background state
  const [bgImage, setBgImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('genz_hero_banner_bg') || '/hero-banner-bg.jpg';
    } catch {
      return '/hero-banner-bg.jpg';
    }
  });
  const [hasServerBg, setHasServerBg] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if permanent banner image exists on server or in localStorage
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch('/api/save-banner-bg', { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          if (data.exists) {
            setHasServerBg(true);
            setBgImage('/hero-banner-bg.jpg');
            return;
          }
        }
      } catch {}

      try {
        const local = localStorage.getItem('genz_hero_banner_bg');
        if (local && local.startsWith('data:image')) {
          setBgImage(local);
          // Sync permanently to server
          syncToServer(local);
        }
      } catch {}
    };

    checkServer();
  }, []);

  const syncToServer = async (base64Img: string) => {
    try {
      const res = await fetch('/api/save-banner-bg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Img })
      });
      if (res.ok) {
        setHasServerBg(true);
        setBgImage('/hero-banner-bg.jpg');
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      }
    } catch (err) {
      console.warn('Could not sync to server disk:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) {
        setIsUploading(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_W = 1920;
        let width = img.width;
        let height = img.height;

        if (width > MAX_W) {
          height = Math.round((height * MAX_W) / width);
          width = MAX_W;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.90);
          setBgImage(compressed);
          try {
            localStorage.setItem('genz_hero_banner_bg', compressed);
          } catch {}
          syncToServer(compressed);
        }
        setIsUploading(false);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = String(hours).padStart(2, '0');

      setTime(`${formattedHours}:${minutes}:${seconds}`);
      setPeriod(ampm);

      const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
      const day = String(now.getDate()).padStart(2, '0');
      const month = now.toLocaleDateString('en-US', { month: 'long' });
      const year = now.getFullYear();

      setDateStr(`${weekday} , ${day} ${month} ${year}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="w-full rounded-2xl p-5 sm:p-7 shadow-2xl border relative overflow-hidden transition-all text-white opacity-100 group"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: '#071638',
        backgroundImage: bgImage 
          ? `url(${bgImage})` 
          : 'linear-gradient(135deg, #050f26 0%, #0a1f4d 50%, #030a1c 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        backgroundRepeat: 'no-repeat',
        borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.4)' : 'rgba(56, 189, 248, 0.55)',
        borderWidth: '1.5px',
        borderStyle: 'solid',
        boxShadow: '0 16px 50px 0 rgba(0, 0, 0, 0.55), 0 0 30px rgba(2, 132, 199, 0.25)',
        color: '#ffffff'
      }}
    >
      {/* Hidden File Input for Permanent Background Selection */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange}
      />

      {/* Dark Vignette & Frosted Gradient Overlay (Ensures text, buttons, and clock remain 100% crystal clear) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all"
        style={{
          background: 'linear-gradient(90deg, rgba(3, 10, 28, 0.88) 0%, rgba(5, 16, 44, 0.76) 45%, rgba(6, 18, 48, 0.65) 100%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)'
        }}
      />

      {/* Top Row: Pill Badge on Left + Digital Clock Widget on Right + Quick Photo Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 relative z-10">
        
        {/* Left Pill Badge - Frosted Glass */}
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-md"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(3, 10, 28, 0.85)',
            borderColor: 'rgba(56, 189, 248, 0.6)',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            color: '#ffffff'
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 drop-shadow-xs" />
          <span className="font-black text-white">GEN Z EDTECH SIMULATION PORTAL</span>
          <span 
            className="px-2 py-0.5 rounded text-[10px] font-black shadow-xs"
            style={{ backgroundColor: '#fbbf24', color: '#0f172a' }}
          >
            4K 3D
          </span>
        </div>

        {/* Right Area: Digital Clock Widget + Set Permanent Photo Action */}
        <div className="flex items-center gap-2 flex-wrap ml-auto sm:ml-0">
          
          {/* Quick Permanent Photo Trigger Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: uploadSuccess ? 'rgba(16, 185, 129, 0.9)' : 'rgba(14, 116, 144, 0.85)',
              borderColor: uploadSuccess ? '#34d399' : '#38bdf8',
              borderWidth: '1px',
              borderStyle: 'solid',
              color: '#ffffff'
            }}
            title="Click to select and permanently set Muhammad Imran Khan's photo as this banner background"
          >
            {uploadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>تصویر محفوظ ہو گئی</span>
              </>
            ) : isUploading ? (
              <span>محفوظ ہو رہی ہے...</span>
            ) : (
              <>
                <Camera className="w-3.5 h-3.5 text-cyan-300" />
                <span>تصویر تبدیل کریں (Set Photo)</span>
              </>
            )}
          </button>

          {/* Crisp Frosted Glass Digital Clock Widget */}
          <div 
            className="px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2.5 text-xs"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(3, 10, 28, 0.85)',
              borderColor: 'rgba(56, 189, 248, 0.6)',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              color: '#ffffff'
            }}
          >
            <div 
              className="flex items-center gap-1.5 font-mono font-black text-sm tracking-wider"
              style={{ color: '#fef08a' }}
            >
              <Clock className="w-4 h-4 text-amber-300" />
              <span className="font-extrabold text-amber-200">{time || '00:00:00'}</span>
            </div>

            <span 
              className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase shadow-xs"
              style={{ backgroundColor: '#ffffff', color: '#1e3a8a' }}
            >
              {period}
            </span>

            <span className="text-emerald-400 font-extrabold">|</span>

            <span className="font-extrabold whitespace-nowrap text-xs text-white">
              {dateStr || 'Loading date...'}
            </span>
          </div>

        </div>

      </div>

      {/* Main Headline & Monogram Showcase */}
      <div className="relative z-10 my-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Gen Z EdTech Interactive Simulation
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-100 max-w-2xl leading-relaxed font-bold opacity-100 drop-shadow-sm">
            Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, celestial mechanics, mathematics, and computer science. Switch seamlessly across all 27 modules with single-click direct execution in 4K high fidelity.
          </p>
        </div>

        {/* Official Monogram Emblem Badge with Frosted Glass Styling */}
        <div 
          className="shrink-0 rounded-2xl p-3 border shadow-2xl flex items-center gap-3.5 text-slate-900 dark:text-white"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.92)',
            borderColor: '#38bdf8',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: '0 8px 24px rgba(2, 132, 199, 0.3)'
          }}
        >
          <img 
            src="/genz-edtech-monogram.svg" 
            alt="Gen Z EdTech Interactive Monogram Logo" 
            className="w-24 sm:w-28 h-auto object-contain"
          />
          <div className="hidden sm:block text-left pr-2">
            <span className="block text-[10px] font-mono font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Official Monogram</span>
            <span className="block text-xs font-black text-slate-900 dark:text-white leading-tight">Gen Z EdTech</span>
            <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">Interactive Portal</span>
          </div>
        </div>
      </div>

      {/* Website Action Buttons for Laptop & Desktop */}
      <div className="relative z-10 my-3 flex items-center gap-3 flex-wrap">
        <a
          href="#catalog"
          className="btn-3d px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 text-slate-900 shadow-md cursor-pointer"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(251, 191, 36, 0.95)',
            borderColor: '#fde047',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            color: '#0f172a'
          }}
        >
          <Layers className="w-4 h-4 text-slate-900" />
          <span>Explore All 25 Labs Grid</span>
        </a>
        <a
          href="#stage"
          className="btn-3d px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 text-white shadow-md cursor-pointer"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(5, 150, 105, 0.95)',
            borderColor: '#34d399',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            color: '#ffffff'
          }}
        >
          <Play className="w-4 h-4 fill-current text-white" />
          <span>Interactive Stage [Lab {activeSim.indexNumber}]</span>
        </a>
      </div>

      {/* Continuous Right-to-Left Live Bulletin Ticker with Frosted Glass Styling */}
      <div 
        className="relative z-10 mt-4 rounded-xl text-xs flex items-center overflow-hidden shadow-md"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(3, 10, 28, 0.85)',
          borderColor: 'rgba(56, 189, 248, 0.5)',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          color: '#ffffff'
        }}
      >
        {/* Fixed Left Badge: Live STEM Bulletin */}
        <div 
          className="shrink-0 z-20 px-3.5 py-2.5 flex items-center gap-2 font-black uppercase tracking-wider text-[11px] shadow-lg"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(37, 99, 235, 0.92)',
            backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(29, 78, 216, 0.95) 100%)',
            borderRight: '1.5px solid rgba(96, 165, 250, 0.5)',
            color: '#ffffff'
          }}
        >
          <Radio className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
          <span className="whitespace-nowrap">LIVE STEM BULLETIN</span>
        </div>

        {/* Endless Seamless Marquee Viewport */}
        <div className="flex-1 overflow-hidden relative py-2.5">
          <div className="animate-marquee-infinite flex items-center">
            
            {/* Copy 1 of All Simulations */}
            <div className="flex items-center shrink-0">
              {SIMULATIONS_LIST.map((sim) => (
                <div key={`sim-ticker-1-${sim.id}`} className="flex items-center shrink-0 mr-8">
                  <span 
                    className="inline-block px-1.5 py-0.5 rounded text-[10px] font-black mr-2 shadow-xs"
                    style={{ backgroundColor: sim.accentColor, color: '#ffffff' }}
                  >
                    LAB {sim.indexNumber}
                  </span>
                  <span className="font-extrabold text-amber-300 mr-1.5">
                    {sim.title}
                  </span>
                  <span className="text-slate-200 text-[11px] font-medium mr-2">
                    ({sim.category}) &mdash; {sim.description}
                  </span>
                  <span className="text-cyan-400 font-bold mx-2">★</span>
                </div>
              ))}
            </div>

            {/* Copy 2 of All Simulations */}
            <div className="flex items-center shrink-0">
              {SIMULATIONS_LIST.map((sim) => (
                <div key={`sim-ticker-2-${sim.id}`} className="flex items-center shrink-0 mr-8">
                  <span 
                    className="inline-block px-1.5 py-0.5 rounded text-[10px] font-black mr-2 shadow-xs"
                    style={{ backgroundColor: sim.accentColor, color: '#ffffff' }}
                  >
                    LAB {sim.indexNumber}
                  </span>
                  <span className="font-extrabold text-amber-300 mr-1.5">
                    {sim.title}
                  </span>
                  <span className="text-slate-200 text-[11px] font-medium mr-2">
                    ({sim.category}) &mdash; {sim.description}
                  </span>
                  <span className="text-cyan-400 font-bold mx-2">★</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

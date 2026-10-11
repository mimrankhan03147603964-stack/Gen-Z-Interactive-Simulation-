import React, { useState, useRef, useEffect } from 'react';
import { Phone, Camera, Upload, Trash2, Image as ImageIcon, Sliders, Check, Sparkles } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  // Developer custom background image state with LocalStorage persistence
  const [customBgImage, setCustomBgImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('genz_dev_custom_bg');
    } catch {
      return null;
    }
  });

  const [bgScope, setBgScope] = useState<'card' | 'footer'>(() => {
    try {
      return (localStorage.getItem('genz_dev_bg_scope') as 'card' | 'footer') || 'card';
    } catch {
      return 'card';
    }
  });

  const [glassStrength, setGlassStrength] = useState<'light' | 'medium' | 'deep'>(() => {
    try {
      return (localStorage.getItem('genz_dev_bg_glass') as 'light' | 'medium' | 'deep') || 'medium';
    } catch {
      return 'medium';
    }
  });

  const [isDragging, setIsDragging] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize storage
  const saveImage = (dataUrl: string | null) => {
    setCustomBgImage(dataUrl);
    try {
      if (dataUrl) {
        localStorage.setItem('genz_dev_custom_bg', dataUrl);
      } else {
        localStorage.removeItem('genz_dev_custom_bg');
      }
    } catch (e) {
      console.warn('Storage operation failed:', e);
    }
  };

  const handleScopeChange = (scope: 'card' | 'footer') => {
    setBgScope(scope);
    try {
      localStorage.setItem('genz_dev_bg_scope', scope);
    } catch {}
  };

  const handleGlassChange = (strength: 'light' | 'medium' | 'deep') => {
    setGlassStrength(strength);
    try {
      localStorage.setItem('genz_dev_bg_glass', strength);
    } catch {}
  };

  // Process selected or dropped file with compression canvas
  const handleProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) return;

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          saveImage(compressedDataUrl);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // Clipboard paste support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            handleProcessFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Compute frosted glass backdrop overlay styling based on settings
  const getGlassOverlayStyles = () => {
    if (!customBgImage) {
      return {
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: isDarkMode ? 'rgba(12, 26, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backgroundImage: isDarkMode
          ? 'radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.22) 0%, transparent 75%), linear-gradient(180deg, rgba(15, 33, 76, 0.7) 0%, rgba(6, 14, 34, 0.9) 100%)'
          : 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.18) 0%, transparent 75%), linear-gradient(180deg, rgba(240, 249, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)'
      };
    }

    if (glassStrength === 'light') {
      return {
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.42)' : 'rgba(255, 255, 255, 0.45)',
        backgroundImage: isDarkMode 
          ? 'linear-gradient(180deg, rgba(6, 14, 34, 0.35) 0%, rgba(6, 14, 34, 0.65) 100%)' 
          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.65) 100%)'
      };
    } else if (glassStrength === 'deep') {
      return {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.86)' : 'rgba(255, 255, 255, 0.88)',
        backgroundImage: isDarkMode 
          ? 'linear-gradient(180deg, rgba(15, 33, 76, 0.75) 0%, rgba(6, 14, 34, 0.92) 100%)' 
          : 'linear-gradient(180deg, rgba(240, 249, 255, 0.85) 0%, rgba(255, 255, 255, 0.92) 100%)'
      };
    } else {
      // Medium balanced
      return {
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.68)' : 'rgba(255, 255, 255, 0.72)',
        backgroundImage: isDarkMode 
          ? 'linear-gradient(180deg, rgba(10, 24, 56, 0.55) 0%, rgba(6, 14, 34, 0.82) 100%)' 
          : 'linear-gradient(180deg, rgba(240, 249, 255, 0.65) 0%, rgba(255, 255, 255, 0.8) 100%)'
      };
    }
  };

  const isFullFooterBg = customBgImage && bgScope === 'footer';
  const isCardBg = customBgImage && bgScope === 'card';

  return (
    <footer 
      id="developer"
      className="w-full pt-12 pb-8 px-4 border-t text-center shrink-0 shadow-sm select-none transition-all opacity-100 scroll-mt-20 relative overflow-hidden"
      style={{
        ...(isFullFooterBg ? {
          backgroundImage: `url(${customBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {
          backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.85)' : 'rgba(255, 255, 255, 0.85)'
        }),
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(255, 255, 255, 0.5)',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      {/* Hidden file input for custom background image selection */}
      <input 
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleProcessFile(e.target.files[0]);
          }
        }}
      />

      {/* If full footer background is active, add subtle frosted scrim */}
      {isFullFooterBg && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: glassStrength === 'light' ? 'blur(6px)' : glassStrength === 'deep' ? 'blur(16px)' : 'blur(10px)',
            WebkitBackdropFilter: glassStrength === 'light' ? 'blur(6px)' : glassStrength === 'deep' ? 'blur(16px)' : 'blur(10px)',
            backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.55)' : 'rgba(255, 255, 255, 0.6)'
          }}
        />
      )}

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8 relative z-10">
        
        {/* 1. Header & Brand Title with Official Monogram */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <div 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-2 border shadow-lg overflow-hidden flex items-center justify-center transition-transform hover:scale-105"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(12, 26, 59, 0.8)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: '#38bdf8',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: '0 8px 24px rgba(2, 132, 199, 0.25)'
            }}
          >
            <img 
              src="/genz-edtech-monogram.svg" 
              alt="Gen Z EdTech Interactive Monogram Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1">
            <h2 
              className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase"
              style={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}
            >
              GEN Z EDTECH INTERACTIVE SIMULATION
            </h2>
            <p 
              className="text-sm sm:text-base font-semibold tracking-wide"
              style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
            >
              Digital Laboratory Portal
            </p>
          </div>
        </div>

        {/* 2. Developer Profile Card & Dedicated Showcase with Photo Background */}
        <div 
          className={`w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-5 transition-all shadow-xl relative overflow-hidden group ${
            isDragging ? 'ring-4 ring-cyan-400 scale-[1.01]' : ''
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) {
              handleProcessFile(e.dataTransfer.files[0]);
            }
          }}
          style={{
            ...(isCardBg ? {
              backgroundImage: `url(${customBgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            } : {}),
            border: isDarkMode ? '1.5px solid rgba(56, 189, 248, 0.35)' : '1.5px solid rgba(147, 197, 253, 0.65)',
            boxShadow: isDarkMode 
              ? '0 12px 40px 0 rgba(0, 0, 0, 0.55), 0 0 24px rgba(37, 99, 235, 0.2)' 
              : '0 12px 40px 0 rgba(37, 99, 235, 0.12), 0 0 24px rgba(59, 130, 246, 0.15)'
          }}
        >
          {/* Frosted Glass Overlay scrim covering the entire card */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all"
            style={getGlassOverlayStyles()}
          />

          {/* Drag Overlay Indicator */}
          {isDragging && (
            <div className="absolute inset-0 z-30 bg-sky-500/30 backdrop-blur-sm border-2 border-dashed border-cyan-400 rounded-3xl flex flex-col items-center justify-center gap-2 text-white">
              <Upload className="w-10 h-10 animate-bounce text-cyan-300" />
              <p className="font-black text-lg">تصویر یہاں چھوڑیں (Drop Photo Here)</p>
              <p className="text-xs opacity-90">Set as Developer Section Background</p>
            </div>
          )}

          {/* Subtle Ambient Glow Behind Developer Header */}
          <div 
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full pointer-events-none filter blur-2xl opacity-40 transition-opacity"
            style={{
              backgroundColor: isDarkMode ? '#38bdf8' : '#2563eb'
            }}
          />

          {/* Top Row: Badge & Custom Background Trigger Button */}
          <div className="relative z-10 w-full flex items-center justify-between flex-wrap gap-2">
            {/* Badge: </> DEVELOPED BY */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-black tracking-widest uppercase shadow-sm"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.75)' : 'rgba(219, 234, 254, 0.85)',
                color: isDarkMode ? '#93c5fd' : '#1d4ed8',
                border: isDarkMode ? '1.5px solid #3b82f6' : '1.5px solid #93c5fd',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
              }}
            >
              <span className="font-mono font-black text-cyan-400">&lt;/&gt;</span>
              <span>DEVELOPED BY</span>
            </div>

            {/* Quick Background Image Action Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  backgroundColor: customBgImage 
                    ? (isDarkMode ? 'rgba(16, 185, 129, 0.25)' : 'rgba(209, 250, 229, 0.9)')
                    : (isDarkMode ? 'rgba(56, 189, 248, 0.25)' : 'rgba(224, 242, 254, 0.9)'),
                  color: customBgImage 
                    ? (isDarkMode ? '#6ee7b7' : '#047857')
                    : (isDarkMode ? '#38bdf8' : '#0284c7'),
                  border: customBgImage 
                    ? '1.5px solid #10b981' 
                    : '1.5px solid #38bdf8'
                }}
                title="Select WhatsApp or local image to set as background of this section"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{customBgImage ? 'تصویر تبدیل کریں (Change Photo)' : 'تصویر لگائیں (Set Photo Background)'}</span>
              </button>

              {customBgImage && (
                <button
                  type="button"
                  onClick={() => setShowControls(!showControls)}
                  className="p-1.5 rounded-full transition-all cursor-pointer hover:scale-105"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(241, 245, 249, 0.9)',
                    color: isDarkMode ? '#94a3b8' : '#475569',
                    border: '1px solid rgba(148, 163, 184, 0.3)'
                  }}
                  title="Background Controls"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Expanded Background Controls Panel */}
          {customBgImage && showControls && (
            <div 
              className="relative z-20 w-full p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)',
                border: isDarkMode ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(147, 197, 253, 0.6)'
              }}
            >
              {/* Scope Selection */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-400">دائرہ کار (Scope):</span>
                <button
                  type="button"
                  onClick={() => handleScopeChange('card')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    bgScope === 'card' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : (isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700')
                  }`}
                >
                  کارڈ پر (Card)
                </button>
                <button
                  type="button"
                  onClick={() => handleScopeChange('footer')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    bgScope === 'footer' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : (isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700')
                  }`}
                >
                  پورے فوٹر پر (Full Footer)
                </button>
              </div>

              {/* Glass / Transparency Preset */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-400">شفافیت (Glass):</span>
                {(['light', 'medium', 'deep'] as const).map((strength) => (
                  <button
                    key={strength}
                    type="button"
                    onClick={() => handleGlassChange(strength)}
                    className={`px-2 py-1 rounded-lg font-bold transition-all capitalize ${
                      glassStrength === strength 
                        ? 'bg-cyan-600 text-white shadow-sm' 
                        : (isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700')
                    }`}
                  >
                    {strength === 'light' ? 'ہلکا (Light)' : strength === 'medium' ? 'درمیانہ (Med)' : 'گہرا (Deep)'}
                  </button>
                ))}
              </div>

              {/* Remove Image Button */}
              <button
                type="button"
                onClick={() => saveImage(null)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-rose-500 hover:bg-rose-500/10 font-bold transition-all ml-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>تصویر ہٹائیں (Remove)</span>
              </button>
            </div>
          )}

          {/* Developer Avatar Ring (Shows developer photo if custom image is chosen) */}
          <div className="relative z-10 flex flex-col items-center">
            <div 
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-2 shadow-2xl overflow-hidden group/avatar cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              title="Click to change or select photo"
              style={{
                borderColor: '#38bdf8',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.85)',
                boxShadow: isDarkMode 
                  ? '0 0 25px rgba(56, 189, 248, 0.35), inset 0 0 15px rgba(56, 189, 248, 0.2)' 
                  : '0 0 25px rgba(2, 132, 199, 0.25), inset 0 0 15px rgba(2, 132, 199, 0.15)'
              }}
            >
              {customBgImage ? (
                <img 
                  src={customBgImage} 
                  alt="Developer Muhammad Imran Khan" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/60 to-slate-900/80 text-cyan-400">
                  <Camera className="w-8 h-8 opacity-80" />
                  <span className="text-[9px] font-bold mt-1 tracking-tighter text-cyan-200">PHOTO</span>
                </div>
              )}

              {/* Hover Camera Overlay */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <Upload className="w-5 h-5 text-cyan-300" />
                <span className="text-[9px] font-bold mt-0.5">تبدیل کریں</span>
              </div>
            </div>
          </div>

          {/* Developer Name Banner with Highlighted Backdrop Pill */}
          <div className="relative z-10 text-center space-y-2 w-full">
            <div 
              className="inline-block px-5 sm:px-7 py-2 rounded-2xl border shadow-sm transition-all"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(3, 105, 161, 0.3)' : 'rgba(224, 242, 254, 0.75)',
                borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.55)' : 'rgba(186, 230, 253, 0.95)',
                boxShadow: isDarkMode ? 'inset 0 1px 1px rgba(255, 255, 255, 0.2)' : 'inset 0 1px 1px rgba(255, 255, 255, 0.8)'
              }}
            >
              <h3 
                className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight"
                style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
              >
                Muhammad Imran Khan
              </h3>
            </div>

            {/* Academic Qualification & Specialization Tag */}
            <div>
              <span 
                className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-black font-mono tracking-wide"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(124, 58, 237, 0.35)' : 'rgba(243, 232, 255, 0.95)',
                  color: isDarkMode ? '#c084fc' : '#7e22ce',
                  border: isDarkMode ? '1px solid rgba(168, 85, 247, 0.45)' : '1px solid rgba(216, 180, 254, 0.85)'
                }}
              >
                MSc Computer Science
              </span>
            </div>

            {/* Professional Role Title */}
            <p 
              className="text-xs sm:text-sm md:text-base font-bold tracking-wide pt-1"
              style={{ color: isDarkMode ? '#38bdf8' : '#0284c7' }}
            >
              Software &amp; Web Page Developer
            </p>
          </div>

          {/* Contact Buttons: High contrast frosted glass phone buttons */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
            <a 
              href="tel:03007603964" 
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-mono font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.92)',
                borderColor: '#10b981',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: isDarkMode ? '#34d399' : '#047857',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
              }}
              title="Call 03007603964"
            >
              <Phone className="w-4 h-4 shrink-0 text-emerald-500 fill-emerald-500/20" />
              <span>03007603964</span>
            </a>

            <a 
              href="tel:03147603964" 
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-mono font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.92)',
                borderColor: '#0284c7',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: isDarkMode ? '#38bdf8' : '#0369a1',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)'
              }}
              title="Call 03147603964"
            >
              <Phone className="w-4 h-4 shrink-0 text-sky-500 fill-sky-500/20" />
              <span>03147603964</span>
            </a>
          </div>

          {/* Prompt banner if no custom background has been set yet */}
          {!customBgImage && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative z-10 w-full mt-2 py-2.5 px-4 rounded-xl border border-dashed border-sky-400/60 bg-sky-500/10 hover:bg-sky-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold"
              style={{
                color: isDarkMode ? '#7dd3fc' : '#0369a1'
              }}
            >
              <Upload className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>
                اپنی تصویر کو اس پورے حصے کے بیک گراؤنڈ پر لگانے کے لیے یہاں کلک کریں (Click here to select photo for background)
              </span>
            </div>
          )}
        </div>

        {/* 3. Footer Bottom Bar */}
        <div className="w-full pt-2">
          {/* Subtle divider line */}
          <div 
            className="w-full h-px mb-6"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0' }}
          />

          {/* Copyright Notice */}
          <p 
            className="text-xs sm:text-sm font-medium tracking-normal text-center"
            style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
          >
            © 2026 Gen Z EdTech Interactive Simulation. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { Layers, BookOpen, Atom, Sparkles, ArrowRight } from 'lucide-react';
import { SimulationItem } from '../types';

interface QuickStatsProps {
  activeSim: SimulationItem;
  totalSimulations: number;
  isDarkMode?: boolean;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  activeSim,
  totalSimulations,
  isDarkMode = false
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      
      {/* 3D Stat Card 1: Total Simulations (Vibrant Oceanic Blue) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group btn-3d"
        style={{
          backgroundColor: isDarkMode ? '#081735' : '#eff6ff',
          borderColor: isDarkMode ? '#1d4ed8' : '#bfdbfe',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
          >
            <span 
              className="w-2 h-2 rounded-full shadow-xs" 
              style={{ backgroundColor: '#2563eb' }}
            />
            <span>TOTAL SIMULATIONS</span>
          </div>
          <div 
            className="text-xl sm:text-2xl font-black mt-1 drop-shadow-xs"
            style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
          >
            {totalSimulations} STEM Labs
          </div>
          <div 
            className="text-[11px] font-bold mt-1 flex items-center gap-1"
            style={{ color: isDarkMode ? '#93c5fd' : '#2563eb' }}
          >
            <span>All 14 active & ready</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg icon-tile-3d shrink-0 group-hover:scale-105 transition-transform"
          style={{
            backgroundColor: '#2563eb',
            backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderColor: '#60a5fa',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
          }}
        >
          <Layers className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 2: Current Discipline (Vibrant Royal Purple) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group btn-3d"
        style={{
          backgroundColor: isDarkMode ? '#200d3d' : '#faf5ff',
          borderColor: isDarkMode ? '#6d28d9' : '#e9d5ff',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: isDarkMode ? '#c084fc' : '#7c3aed' }}
          >
            <span 
              className="w-2 h-2 rounded-full shadow-xs" 
              style={{ backgroundColor: '#9333ea' }}
            />
            <span>CURRENT DISCIPLINE</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 truncate max-w-[170px] drop-shadow-xs"
            style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
          >
            {activeSim.category}
          </div>
          <div 
            className="text-[11px] font-bold mt-1 truncate max-w-[170px]"
            style={{ color: isDarkMode ? '#d8b4fe' : '#6b21a8' }}
          >
            {activeSim.subject}
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg icon-tile-3d shrink-0 group-hover:scale-105 transition-transform"
          style={{
            backgroundColor: '#7c3aed',
            backgroundImage: 'linear-gradient(135deg, #9333ea 0%, #6d28d9 100%)',
            borderColor: '#c084fc',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
          }}
        >
          <BookOpen className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 3: Active Module (Vibrant Emerald) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group btn-3d"
        style={{
          backgroundColor: isDarkMode ? '#05291f' : '#ecfdf5',
          borderColor: isDarkMode ? '#047857' : '#a7f3d0',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: isDarkMode ? '#34d399' : '#059669' }}
          >
            <span 
              className="w-2 h-2 rounded-full shadow-xs" 
              style={{ backgroundColor: '#10b981' }}
            />
            <span>ACTIVE MODULE</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 truncate max-w-[170px] drop-shadow-xs"
            style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
          >
            [{activeSim.indexNumber}] {activeSim.title}
          </div>
          <div 
            className="text-[11px] font-bold mt-1 truncate max-w-[170px]"
            style={{ color: isDarkMode ? '#a7f3d0' : '#047857' }}
          >
            {activeSim.gradeLevel}
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg icon-tile-3d shrink-0 group-hover:scale-105 transition-transform"
          style={{
            backgroundColor: '#059669',
            backgroundImage: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            borderColor: '#34d399',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
          }}
        >
          <Atom className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 4: 3D Visual Engine & Status (Vibrant Amber & Gold) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group btn-3d"
        style={{
          backgroundColor: isDarkMode ? '#2a1a04' : '#fffbeb',
          borderColor: isDarkMode ? '#b45309' : '#fde68a',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: isDarkMode ? '#fbbf24' : '#d97706' }}
          >
            <span 
              className="w-2 h-2 rounded-full shadow-xs" 
              style={{ backgroundColor: '#f59e0b' }}
            />
            <span>VISUAL ENGINE</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 flex items-center gap-1.5 drop-shadow-xs"
            style={{ color: isDarkMode ? '#fde68a' : '#92400e' }}
          >
            <Sparkles className="w-4 h-4 shrink-0" style={{ color: '#d97706' }} />
            <span>4K Full HD</span>
          </div>
          <div 
            className="text-[11px] font-bold mt-1"
            style={{ color: isDarkMode ? '#fde68a' : '#b45309' }}
          >
            Live HTML5 / Canvas 60 FPS
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg icon-tile-3d shrink-0 group-hover:scale-105 transition-transform"
          style={{
            backgroundColor: '#d97706',
            backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
            borderColor: '#fbbf24',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
          }}
        >
          <Sparkles className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

    </div>
  );
};

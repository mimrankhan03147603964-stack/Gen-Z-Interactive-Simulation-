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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full opacity-100">
      
      {/* 3D Stat Card 1: Total Simulations (Vibrant Oceanic Blue) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group btn-3d opacity-100"
        style={{
          backgroundColor: isDarkMode ? '#081735' : '#eff6ff',
          borderColor: isDarkMode ? '#2563eb' : '#93c5fd',
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
              className="w-2.5 h-2.5 rounded-full shadow-xs" 
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
            className="text-[11px] font-black mt-1 flex items-center gap-1"
            style={{ color: isDarkMode ? '#93c5fd' : '#1d4ed8' }}
          >
            <span>All {totalSimulations} active &amp; ready</span>
            <ArrowRight className="w-3.5 h-3.5 font-black" />
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
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4), inset 0 1px 1px #ffffff'
          }}
        >
          <Layers className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 2: Current Discipline (Vibrant Royal Purple) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group btn-3d opacity-100"
        style={{
          backgroundColor: isDarkMode ? '#200d3d' : '#faf5ff',
          borderColor: isDarkMode ? '#7c3aed' : '#c084fc',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: isDarkMode ? '#c084fc' : '#6d28d9' }}
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs" 
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
            className="text-[11px] font-black mt-1 truncate max-w-[170px]"
            style={{ color: isDarkMode ? '#e9d5ff' : '#581c87' }}
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
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4), inset 0 1px 1px #ffffff'
          }}
        >
          <BookOpen className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 3: Active Module (Vibrant Emerald) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group btn-3d opacity-100"
        style={{
          backgroundColor: isDarkMode ? '#05291f' : '#ecfdf5',
          borderColor: isDarkMode ? '#059669' : '#6ee7b7',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: isDarkMode ? '#34d399' : '#047857' }}
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs" 
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
            className="text-[11px] font-black mt-1 truncate max-w-[170px]"
            style={{ color: isDarkMode ? '#a7f3d0' : '#065f46' }}
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
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4), inset 0 1px 1px #ffffff'
          }}
        >
          <Atom className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 4: 3D Visual Engine & Status (Vibrant Amber & Gold) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group btn-3d opacity-100"
        style={{
          backgroundColor: isDarkMode ? '#2a1a04' : '#fffbeb',
          borderColor: isDarkMode ? '#d97706' : '#fcd34d',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: isDarkMode ? '#fbbf24' : '#b45309' }}
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs" 
              style={{ backgroundColor: '#f59e0b' }}
            />
            <span>VISUAL ENGINE</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 flex items-center gap-1.5 drop-shadow-xs"
            style={{ color: isDarkMode ? '#fef08a' : '#78350f' }}
          >
            <Sparkles className="w-4 h-4 shrink-0" style={{ color: '#d97706' }} />
            <span>4K Full HD</span>
          </div>
          <div 
            className="text-[11px] font-black mt-1"
            style={{ color: isDarkMode ? '#fef08a' : '#92400e' }}
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
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4), inset 0 1px 1px #ffffff'
          }}
        >
          <Sparkles className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

    </div>
  );
};

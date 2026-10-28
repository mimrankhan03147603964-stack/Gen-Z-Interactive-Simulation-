import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SimulationItem } from '../types';
import { 
  MultiStemAllIcon, 
  MultiEnglishIcon, 
  MultiPhysicsIcon, 
  MultiPrimaryIcon 
} from './ModernStemIcons';

interface QuickStatsProps {
  activeSim?: SimulationItem | null;
  totalSimulations: number;
  isDarkMode?: boolean;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  activeSim,
  totalSimulations,
  isDarkMode = true
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full opacity-100">
      
      {/* Stat Card 1: Total Simulations (Blue Theme) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group opacity-100 bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-0.5"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-[#1E88E5]"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-[#1E88E5]" 
            />
            <span>TOTAL SIMULATIONS</span>
          </div>
          <div 
            className="text-xl sm:text-2xl font-black mt-1 text-[#1565C0]"
          >
            {totalSimulations} STEM Labs
          </div>
          <div 
            className="text-[11px] font-bold mt-1 flex items-center gap-1 text-[#3B4A73]"
          >
            <span>All {totalSimulations} active &amp; ready</span>
            <ArrowRight className="w-3.5 h-3.5 font-black text-[#1E88E5]" />
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform border border-[#1546A8] bg-white p-2"
        >
          <MultiStemAllIcon className="w-7 h-7 drop-shadow-sm" />
        </div>
      </div>

      {/* Stat Card 2: Current Discipline (Dark Blue Theme) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group opacity-100 bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-0.5"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-[#1546A8]"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-[#1546A8]" 
            />
            <span>{activeSim ? 'CURRENT DISCIPLINE' : 'CORE DISCIPLINES'}</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 truncate max-w-[170px] text-[#1565C0]"
          >
            {activeSim ? activeSim.category : '9 Key Subjects'}
          </div>
          <div 
            className="text-[11px] font-bold mt-1 truncate max-w-[170px] text-[#3B4A73]"
          >
            {activeSim ? activeSim.subject : 'Curriculum Aligned'}
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform border border-[#1B2A5C] bg-white p-2"
        >
          <MultiEnglishIcon className="w-7 h-7 drop-shadow-sm" />
        </div>
      </div>

      {/* Stat Card 3: Active Module (Red Theme) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group opacity-100 bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-0.5"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-[#E53935]"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-[#E53935]" 
            />
            <span>{activeSim ? 'ACTIVE MODULE' : 'LAB STATUS'}</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 truncate max-w-[170px] text-[#1565C0]"
          >
            {activeSim ? `[${activeSim.indexNumber}] ${activeSim.title}` : 'On-Demand Loading'}
          </div>
          <div 
            className="text-[11px] font-bold mt-1 truncate max-w-[170px] text-[#3B4A73]"
          >
            {activeSim ? activeSim.gradeLevel : 'Select any Topic Card below'}
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform border border-[#B71C1C] bg-white p-2"
        >
          <MultiPhysicsIcon className="w-7 h-7 drop-shadow-sm" />
        </div>
      </div>

      {/* Stat Card 4: 3D Visual Engine & Status (Gold Theme) */}
      <div 
        className="p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group opacity-100 bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-0.5"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-[#E58E0A]"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-[#F5A623]" 
            />
            <span>VISUAL ENGINE</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 flex items-center gap-1.5 text-[#1565C0]"
          >
            <Sparkles className="w-4 h-4 shrink-0 text-[#F5A623]" />
            <span>4K Full HD</span>
          </div>
          <div 
            className="text-[11px] font-bold mt-1 text-[#3B4A73]"
          >
            Live HTML5 / Canvas 60 FPS
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform border border-[#E58E0A] bg-white p-2"
        >
          <MultiPrimaryIcon className="w-7 h-7 drop-shadow-sm" />
        </div>
      </div>

    </div>
  );
};

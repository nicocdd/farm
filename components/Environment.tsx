
import React from 'react';

export const Tree: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div className="absolute pointer-events-none select-none z-10" style={style}>
    <div className="text-9xl drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] filter saturate-150">🌳</div>
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/10 blur-md rounded-full"></div>
  </div>
);

export const MagicVine: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div className="absolute pointer-events-none select-none z-10" style={style}>
    <div className="text-8xl drop-shadow-[0_20px_20px_rgba(0,0,0,0.2)]">🎋</div>
  </div>
);

export const Mine: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div className="absolute pointer-events-none select-none z-10" style={style}>
    <div className="relative group">
       <div className="text-8xl drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]">🏚️</div>
       <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full border-2 border-amber-900/20 text-xs font-black text-amber-900 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">资源矿场</div>
    </div>
  </div>
);

export const Decoration: React.FC<{ emoji: string, style?: React.CSSProperties }> = ({ emoji, style }) => (
  <div className="absolute pointer-events-none select-none z-10 text-6xl drop-shadow-xl transition-transform hover:scale-110" style={style}>
    {emoji}
  </div>
);

export const Fence: React.FC<{ orientation: 'h' | 'v', style?: React.CSSProperties }> = ({ orientation, style }) => (
  <div 
    className={`absolute pointer-events-none z-0 
      ${orientation === 'h' ? 'w-64 h-8 bg-[url("https://www.transparenttextures.com/patterns/natural-paper.png")] bg-amber-800 border-y-4 border-[#3E1E09] rounded-full' : 'w-8 h-64 bg-amber-800 border-x-4 border-[#3E1E09] rounded-full shadow-lg'}`}
    style={style}
  ></div>
);

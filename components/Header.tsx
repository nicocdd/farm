
import React from 'react';

interface HeaderProps {
  gold: number;
}

const Header: React.FC<HeaderProps> = ({ gold }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-200/50">
            🌱
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight hidden sm:block">MINI FARM</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 rounded-xl shadow-lg shadow-yellow-200/50">
            <span className="text-white drop-shadow-md font-bold text-lg">💰</span>
            <span className="font-mono text-xl font-black text-white drop-shadow-sm">{gold}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

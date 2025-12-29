
import React from 'react';
import { PlayerState, WeatherType } from '../types';

interface TopBarProps {
  player: PlayerState;
  weather: WeatherType;
}

const TopBar: React.FC<TopBarProps> = ({ player, weather }) => {
  const xpPercent = (player.xp / player.maxXp) * 100;
  const energyPercent = (player.energy / player.maxEnergy) * 100;

  const rightIcons = [
    { label: '时光机', icon: '⏰' },
    { label: '成就', icon: '🏆' },
    { label: '图鉴', icon: '📖' },
    { label: '排行榜', icon: '📊' },
    { label: '天气', icon: '🌦️' },
    { label: '设置', icon: '⚙️' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] p-4 pointer-events-none">
      <div className="flex justify-between items-start max-w-[1600px] mx-auto pointer-events-auto">
        
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border-b-[8px] border-[#5D2E0E]/20 p-4 min-w-[380px] shadow-[0_15px_30px_rgba(0,0,0,0.1)] flex items-center gap-4">
           <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl border-4 border-[#8B4513] p-1 overflow-hidden shadow-inner">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`} alt="avatar" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-b from-yellow-300 to-orange-500 text-white text-[12px] font-black px-3 py-0.5 rounded-full border-2 border-white shadow-lg">VIP {player.vip}</div>
           </div>

           <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex justify-between items-end">
                <span className="text-[#3E1E09] font-black text-sm">{player.name}</span>
                <span className="text-[#8B4513] font-bold text-[11px]">等级 {player.level}</span>
              </div>
              
              <div className="relative h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner border border-white/50">
                 <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-500" style={{ width: `${xpPercent}%` }}></div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                 <div className="bg-amber-100/50 rounded-lg px-2 py-1 flex items-center gap-1.5 border border-amber-200 shadow-sm">
                    <span className="text-sm">💰</span>
                    <span className="text-xs font-black text-[#8B4513]">{player.gold}</span>
                 </div>
                 <div className="bg-blue-50/50 rounded-lg px-2 py-1 flex items-center gap-1.5 border border-blue-100 shadow-sm">
                    <span className="text-sm">⚡</span>
                    <span className="text-xs font-black text-blue-700">{player.energy}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex gap-2">
           {rightIcons.map((item, idx) => (
             <button key={idx} className="flex flex-col items-center gap-1 group transition-transform hover:scale-110 active:scale-90">
                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl border-b-4 border-slate-300 flex items-center justify-center text-2xl shadow-lg">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black text-[#3E1E09] bg-white/60 px-2 rounded-full shadow-sm">{item.label}</span>
             </button>
           ))}
        </div>

      </div>
    </div>
  );
};

export default TopBar;

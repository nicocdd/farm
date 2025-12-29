
import React from 'react';

interface BottomDockProps {
  onOpenWarehouse: () => void;
}

const BottomDock: React.FC<BottomDockProps> = ({ onOpenWarehouse }) => {
  const tools = [
    { icon: '⛏️', label: '铲地', color: 'bg-sky-600', action: () => {} },
    { icon: '🎒', label: '背包', color: 'bg-amber-800', action: () => {} },
    { icon: '💧', label: '浇水', color: 'bg-sky-400', action: () => {} },
    { icon: '🧪', label: '除虫', color: 'bg-red-500', action: () => {} },
    { icon: '🌿', label: '除草', color: 'bg-green-600', action: () => {} },
    { icon: '🖐️', label: '收获', color: 'bg-stone-300', action: () => {} },
    { icon: '🏚️', label: '仓库', color: 'bg-amber-900', action: onOpenWarehouse },
    { icon: '🧰', label: '系统', color: 'bg-stone-600', action: () => {} },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 pointer-events-none">
      <div className="flex justify-center items-end max-w-[1400px] mx-auto">
        <div className="pointer-events-auto flex bg-[#5D2E0E]/90 backdrop-blur-md rounded-3xl border-x-[8px] border-t-[8px] border-[#3E1E09] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)] gap-2.5">
          {tools.map((tool, i) => (
            <button 
              key={i} 
              onClick={tool.action}
              className="group flex flex-col items-center gap-1 hover:-translate-y-2 transition-all active:scale-90"
            >
              <div className={`w-14 h-14 ${tool.color} rounded-2xl border-2 border-white/30 shadow-lg flex items-center justify-center text-3xl group-hover:brightness-110`}>
                {tool.icon}
              </div>
              <span className="text-[11px] font-black text-amber-50 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-widest">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomDock;

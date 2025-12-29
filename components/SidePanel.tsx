
import React from 'react';

const SidePanel: React.FC = () => {
  const friends = [
    { name: '隔壁老王', lvl: 42, icon: '👴', status: 'ready' },
    { name: '农场小美', lvl: 35, icon: '👩', status: 'dry' },
    { name: '偷菜高手', lvl: 28, icon: '🥷', status: 'buggy' },
    { name: '新来的邻居', lvl: 12, icon: '🧒', status: 'ok' },
  ];

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[50] hidden xl:block">
      <div className="flex flex-col items-center gap-4 bg-white/70 backdrop-blur-lg rounded-3xl border-b-[8px] border-slate-300 p-5 shadow-2xl">
        <h3 className="font-black text-[#5D2E0E] tracking-widest text-sm uppercase">我的邻居</h3>

        <div className="flex flex-col gap-3">
          {friends.map((f, i) => (
            <div key={i} className="group relative w-56 p-2 rounded-2xl bg-white/50 border border-slate-200 hover:bg-white hover:scale-105 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-xl">
                    {f.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-800">{f.name}</span>
                    <span className="text-[10px] text-slate-500 font-bold">等级 {f.lvl}</span>
                  </div>
                  
                  {f.status === 'ready' && <div className="ml-auto text-xs animate-bounce">🍎</div>}
                  {f.status === 'dry' && <div className="ml-auto text-xs">🏜️</div>}
                  {f.status === 'buggy' && <div className="ml-auto text-xs">🐛</div>}
                </div>
            </div>
          ))}
        </div>

        <button className="w-full py-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl text-white font-black text-xs shadow-lg shadow-green-200 hover:brightness-110 active:scale-95 transition-all">
          添加好友
        </button>
      </div>
    </div>
  );
};

export default SidePanel;

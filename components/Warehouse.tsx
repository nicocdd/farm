
import React from 'react';
import { Crop } from '../types';

interface WarehouseProps {
  isOpen: boolean;
  onClose: () => void;
  crops: Crop[];
  gold: number;
  onSelectSeed: (id: string) => void;
}

const Warehouse: React.FC<WarehouseProps> = ({ isOpen, onClose, crops, gold, onSelectSeed }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[160] animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        <div className="flex flex-col items-center animate-[sway_8s_ease-in-out_infinite]">
          
          {/* 挂绳 */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-20 pointer-events-none">
            <div className="w-2 h-14 bg-[#3E1E09] rounded-full shadow-lg relative after:content-[''] after:absolute after:-top-4 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-6 after:border-4 after:border-[#CD7F32] after:rounded-full"></div>
            <div className="w-2 h-14 bg-[#3E1E09] rounded-full shadow-lg relative after:content-[''] after:absolute after:-top-4 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-6 after:border-4 after:border-[#CD7F32] after:rounded-full"></div>
          </div>

          {/* 标题 */}
          <div className="w-80 h-20 bg-gradient-to-b from-[#78350F] to-[#5D2E0E] rounded-t-3xl border-b-[8px] border-[#3E1E09] shadow-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-3xl drop-shadow-md">🎒</span>
              <h3 className="font-black text-amber-50 tracking-[0.4em] text-lg uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">仓库播种</h3>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 text-amber-100/50 hover:text-white transition-colors text-xl">✕</button>
          </div>

          {/* 列表 */}
          <div className="w-80 bg-[#4a2b16] border-x-[10px] border-[#3E1E09] flex flex-col gap-2 p-4 shadow-inner">
            <div className="max-h-[400px] overflow-y-auto pr-2 flex flex-col gap-3 scrollbar-hide">
              {crops.map((crop) => {
                const canAfford = gold >= crop.buyPrice;
                return (
                  <button
                    key={crop.id}
                    disabled={!canAfford}
                    onClick={() => onSelectSeed(crop.id)}
                    className={`
                      group/item w-full h-24 rounded-2xl border-2 transition-all relative overflow-hidden flex items-center px-3
                      ${canAfford 
                        ? 'bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border-[#FDE68A] hover:scale-[1.03] active:scale-95 shadow-lg' 
                        : 'bg-stone-300 border-stone-400 opacity-60 grayscale cursor-not-allowed'}
                    `}
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-amber-900/10 shadow-inner shrink-0 mr-4">
                      <span className="text-4xl drop-shadow-md group-hover/item:scale-110 transition-transform">{crop.emoji}</span>
                    </div>

                    <div className="flex-1 flex flex-col items-start gap-1">
                      <span className="font-black text-[#5D2E0E] text-base">{crop.name}</span>
                      <div className="flex flex-wrap gap-1">
                        <div className="flex items-center gap-0.5 bg-amber-200/50 px-1.5 rounded-full border border-amber-400/20">
                          <span className="text-[10px]">💰</span>
                          <span className="text-[10px] font-black text-amber-900">{crop.buyPrice}</span>
                        </div>
                        <div className="flex items-center gap-0.5 bg-emerald-200/50 px-1.5 rounded-full border border-emerald-400/20">
                          <span className="text-[10px]">⭐</span>
                          <span className="text-[10px] font-black text-emerald-900">{crop.xp}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button 
              onClick={onClose}
              className="mt-4 w-full py-3 bg-gradient-to-b from-red-500 to-red-800 rounded-xl border-b-4 border-red-950 text-white font-black text-sm tracking-[0.2em] shadow-lg hover:brightness-110 active:translate-y-1 transition-all"
            >
              关 闭
            </button>
          </div>

          {/* 底部装饰 */}
          <div className="w-[105%] h-12 bg-[#3E1E09] rounded-full shadow-2xl border-y-[4px] border-[#5D2E0E] -mt-2 relative z-10">
             <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3/4 h-1 bg-amber-400/20 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sway {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </>
  );
};

export default Warehouse;

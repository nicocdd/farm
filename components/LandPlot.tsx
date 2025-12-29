
import React, { useState, useEffect, useCallback } from 'react';
import { LandState, LandStatus, Crop } from '../types';
import { CROPS } from '../constants';

interface LandPlotProps {
  land: LandState;
  onPlant: () => void;
  onHarvest: (landId: number) => void;
  onAction: (landId: number, action: 'water' | 'weed' | 'pest') => void;
  availableCrops: Crop[];
  gold: number;
}

const LandPlot: React.FC<LandPlotProps> = ({ land, onPlant, onHarvest, onAction, availableCrops, gold }) => {
  const [progress, setProgress] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const currentCrop = land.cropId ? CROPS.find(c => c.id === land.cropId) : null;

  const calculateStatus = useCallback(() => {
    if (land.status === LandStatus.GROWING && land.startTime && currentCrop) {
      const elapsedSeconds = (Date.now() - land.startTime) / 1000;
      const pct = Math.min(100, (elapsedSeconds / currentCrop.growthTime) * 100);
      setProgress(pct);
    }
  }, [land.status, land.startTime, currentCrop]);

  useEffect(() => {
    let interval: number | undefined;
    if (land.status === LandStatus.GROWING) {
      interval = window.setInterval(calculateStatus, 500);
      calculateStatus();
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [land.status, calculateStatus]);

  const isReady = progress >= 100 && land.status === LandStatus.GROWING;

  const handlePlotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (land.status === LandStatus.EMPTY) {
      onPlant();
    } else {
      setShowActionMenu(true);
    }
  };

  return (
    <div className="relative group select-none">
      <div 
        onClick={handlePlotClick}
        className={`
          relative w-36 h-36 rounded-[2.5rem] transition-all duration-300 transform-gpu
          hover:scale-105 active:scale-95 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden
          border-x-[6px] border-[#3E1E09]
          ${land.status === LandStatus.EMPTY 
            ? 'bg-gradient-to-br from-[#5D2E0E] to-[#2D1102] border-b-[20px] border-[#1a0f08]' 
            : 'bg-gradient-to-br from-[#78350F] to-[#3E1E09] border-b-[20px] border-[#2D1102]'}
          ${isReady ? 'border-yellow-500 shadow-[0_0_60px_rgba(234,179,8,0.7)] brightness-110' : ''}
        `}
      >
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>

        <div className="h-full flex flex-col items-center justify-center relative">
          <div className="absolute top-4 flex gap-2 z-10">
            {land.isBuggy && <span className="text-2xl drop-shadow-lg animate-bounce">🐛</span>}
            {land.isWeedy && <span className="text-2xl drop-shadow-lg animate-pulse">🌿</span>}
            {land.isDry && <span className="text-2xl drop-shadow-lg opacity-80">🏜️</span>}
          </div>

          {currentCrop && (
            <div className="relative flex flex-col items-center">
              <div className={`
                text-8xl transition-all duration-700 filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]
                ${isReady ? 'scale-110 animate-[landBounce_1s_infinite]' : 'scale-50 opacity-90 animate-pulse'}
              `}
              style={{ transform: 'translateY(-20px)' }}>
                {currentCrop.emoji}
              </div>
              
              {!isReady && land.status === LandStatus.GROWING && (
                <div className="absolute -bottom-6 w-24 h-4 bg-black/60 rounded-full border-2 border-[#8B4513] overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showActionMenu && (
        <>
          <div className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-[4px]" onClick={() => setShowActionMenu(false)}></div>
          <div className={`
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[160]
            animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]
          `}>
            <div className="bg-[#5D2E0E] rounded-[2.5rem] p-5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-[10px] border-[#3E1E09] flex gap-6 relative">
              {isReady ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); onHarvest(land.id); setShowActionMenu(false); }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center border-4 border-[#FFD700] hover:scale-110 active:translate-y-2 transition-all relative z-10"
                >
                  <span className="text-4xl drop-shadow-lg">🧺</span>
                  <span className="text-[12px] font-black text-white uppercase drop-shadow-md">收割</span>
                </button>
              ) : (
                <div className="flex gap-4 relative z-10">
                  <button onClick={() => onAction(land.id, 'water')} className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#8B4513] to-[#5D2E0E] border-2 border-[#CD7F32] shadow-xl text-3xl hover:brightness-125 transition-all">💧</button>
                  <button onClick={() => onAction(land.id, 'weed')} className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#8B4513] to-[#5D2E0E] border-2 border-[#CD7F32] shadow-xl text-3xl hover:brightness-125 transition-all">🌿</button>
                  <button onClick={() => onAction(land.id, 'pest')} className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#8B4513] to-[#5D2E0E] border-2 border-[#CD7F32] shadow-xl text-3xl hover:brightness-125 transition-all">🧪</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes landBounce {
          0%, 100% { transform: translateY(-20px) scale(1.1); }
          50% { transform: translateY(-35px) scale(1.2); }
        }
        @keyframes popIn {
          from { transform: translate(-50%, -40%) scale(0.8); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default LandPlot;

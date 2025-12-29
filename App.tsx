
import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import BottomDock from './components/BottomDock';
import SidePanel from './components/SidePanel';
import LandPlot from './components/LandPlot';
import Farmhouse from './components/Farmhouse';
import WeatherEffects from './components/WeatherEffects';
import Warehouse from './components/Warehouse';
import { Tree, Decoration, MagicVine, Mine, Fence } from './components/Environment';
import { LandState, LandStatus, PlayerState, WeatherType } from './types';
import { CROPS, INITIAL_GOLD, INITIAL_LAND_COUNT, XP_PER_LEVEL } from './constants';

const STORAGE_KEY_PLAYER = 'dream_manor_v1';
const STORAGE_KEY_LANDS = 'dream_lands_v1';

const App: React.FC = () => {
  const [player, setPlayer] = useState<PlayerState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PLAYER);
    if (saved) return JSON.parse(saved);
    return {
      gold: INITIAL_GOLD,
      silver: 329994,
      gems: 500,
      energy: 145,
      maxEnergy: 200,
      vip: 1,
      level: 1,
      xp: 0,
      maxXp: XP_PER_LEVEL,
      name: '农场主 菲利克斯'
    };
  });

  const [lands, setLands] = useState<LandState[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANDS);
    if (saved) return JSON.parse(saved);
    return Array.from({ length: INITIAL_LAND_COUNT }, (_, i) => ({
      id: i,
      status: LandStatus.EMPTY,
      cropId: null,
      startTime: null,
      isBuggy: false,
      isWeedy: false,
      isDry: false,
    }));
  });

  const [activeSeedId, setActiveSeedId] = useState<string | null>(null);
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
  const [weather, setWeather] = useState<WeatherType>(WeatherType.SUNNY);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PLAYER, JSON.stringify(player));
    localStorage.setItem(STORAGE_KEY_LANDS, JSON.stringify(lands));
  }, [player, lands]);

  const notify = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePlant = (landId: number) => {
    if (!activeSeedId) {
      notify("请先打开仓库选择种子 🎒", 'error');
      setIsWarehouseOpen(true);
      return;
    }
    const crop = CROPS.find(c => c.id === activeSeedId);
    if (!crop || player.gold < crop.buyPrice) {
      notify("金币不足！", 'error');
      return;
    }
    setPlayer(prev => ({ 
      ...prev, 
      gold: prev.gold - crop.buyPrice, 
      energy: Math.max(0, prev.energy - 5) 
    }));
    setLands(prev => prev.map(l => l.id === landId ? { 
      ...l, 
      status: LandStatus.GROWING, 
      cropId: activeSeedId, 
      startTime: Date.now()
    } : l));
    notify(`成功播种：${crop.name} 🌱`);
  };

  const handleHarvest = (landId: number) => {
    const land = lands.find(l => l.id === landId);
    if (!land?.cropId) return;
    const crop = CROPS.find(c => c.id === land.cropId);
    if (!crop) return;
    setPlayer(prev => ({ ...prev, silver: prev.silver + crop.sellPrice * 10 }));
    setLands(prev => prev.map(l => l.id === landId ? { 
      ...l, 
      status: LandStatus.EMPTY, 
      cropId: null, 
      startTime: null 
    } : l));
    notify(`收获成功：${crop.name}！✨`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#e6ce8a] font-sans selection:bg-emerald-200">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7DD3FC] via-[#fdf7e0] to-[#e4c97c]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#d4b465] rounded-t-[50%] blur-3xl opacity-40 translate-y-1/2"></div>
      </div>
      
      <WeatherEffects weather={weather} />
      <TopBar player={player} weather={weather} />
      <SidePanel />
      <BottomDock onOpenWarehouse={() => setIsWarehouseOpen(true)} />

      {activeSeedId && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[90] animate-bounce">
           <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-emerald-500 shadow-xl flex items-center gap-2">
              <span className="text-2xl">{CROPS.find(c => c.id === activeSeedId)?.emoji}</span>
              <span className="text-xs font-black text-emerald-800 tracking-wider">准备播种：{CROPS.find(c => c.id === activeSeedId)?.name}</span>
              <button onClick={() => setActiveSeedId(null)} className="ml-2 text-red-500 font-bold hover:scale-125 transition-transform">✕</button>
           </div>
        </div>
      )}

      <main className="relative z-10 pt-44 pb-48 flex flex-col items-center">
        <div className="relative">
          <Farmhouse />
          <MagicVine style={{ top: '0px', left: '-400px' }} />
          <Mine style={{ top: '-100px', right: '-450px' }} />
          <Tree style={{ top: '-250px', left: '-500px' }} />
          <Decoration emoji="🧺" style={{ bottom: '200px', left: '-350px' }} />
          <Decoration emoji="🚜" style={{ top: '350px', right: '-400px' }} />
          <Fence orientation="h" style={{ top: '300px', left: '-300px' }} />
          <Fence orientation="v" style={{ top: '300px', left: '-300px' }} />

          <div className="perspective-[2500px] flex items-center justify-center p-24">
            <div 
              className="grid grid-cols-4 gap-8 p-12 rounded-[2rem] bg-[#8B4513]/20 backdrop-blur-[1px] border-b-[24px] border-[#3E1E09]/40 shadow-2xl relative"
              style={{ 
                transform: 'rotateX(55deg) rotateZ(-35deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 bg-[#5D2E0E] rounded-[2rem] -z-10 shadow-inner opacity-80"></div>
              {lands.map(land => (
                <div key={land.id} style={{ transform: 'translateZ(10px)' }}>
                  <LandPlot 
                    land={land}
                    gold={player.gold}
                    availableCrops={CROPS}
                    onPlant={() => handlePlant(land.id)}
                    onHarvest={handleHarvest}
                    onAction={() => {}} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Warehouse 
        isOpen={isWarehouseOpen} 
        onClose={() => setIsWarehouseOpen(false)}
        crops={CROPS}
        gold={player.gold}
        onSelectSeed={(id) => {
          setActiveSeedId(id);
          setIsWarehouseOpen(false);
          notify(`种子已选中 ✨`);
        }}
      />

      {notification && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[200] animate-bounce pointer-events-none">
           <div className="px-8 py-3 bg-[#5D2E0E] border-2 border-amber-400 rounded-full shadow-2xl text-amber-50 font-black text-sm">
             {notification.msg}
           </div>
        </div>
      )}
    </div>
  );
};

export default App;

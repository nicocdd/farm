
import React from 'react';

const Farmhouse: React.FC = () => {
  return (
    <div className="absolute top-[-320px] right-[-180px] z-0 pointer-events-none select-none scale-110">
      <div className="relative">
        <div className="w-56 h-48 bg-[#fdf2f2] border-[10px] border-[#5D2E0E] rounded-[3rem] shadow-2xl relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-[#8B4513] rounded-[4rem] border-[8px] border-[#3E1E09] shadow-lg"></div>
          <div className="absolute top-12 left-8 w-12 h-12 bg-sky-100 border-4 border-[#3E1E09] rounded-xl shadow-inner"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-amber-700 border-x-4 border-t-4 border-[#3E1E09] rounded-t-xl"></div>
        </div>
        <div className="absolute -left-12 bottom-4 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full"></div>
      </div>
    </div>
  );
};

export default Farmhouse;

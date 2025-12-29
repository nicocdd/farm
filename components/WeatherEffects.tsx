
import React from 'react';
import { WeatherType } from '../types';

interface WeatherEffectsProps {
  weather: WeatherType;
}

const WeatherEffects: React.FC<WeatherEffectsProps> = ({ weather }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
      {/* Rain Effect */}
      {(weather === WeatherType.RAINY || weather === WeatherType.STORMY) && (
        <div className="absolute inset-0">
          <div className="rain-container">
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i} 
                className="rain-drop" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Stormy Lightning Flash */}
      {weather === WeatherType.STORMY && (
        <div className="absolute inset-0 bg-white opacity-0 animate-[lightning_10s_infinite]" />
      )}

      {/* Fog Effect */}
      {weather === WeatherType.FOGGY && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] animate-pulse transition-opacity duration-[3000ms]" />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .rain-drop {
          position: absolute;
          width: 2px;
          height: 15px;
          background: rgba(255, 255, 255, 0.4);
          top: -20px;
          animation: fall linear infinite;
        }
        @keyframes fall {
          to { transform: translateY(110vh); }
        }
        @keyframes lightning {
          0%, 95%, 98%, 100% { opacity: 0; }
          96%, 99% { opacity: 0.3; }
        }
      `}} />
    </div>
  );
};

export default WeatherEffects;

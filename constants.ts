
import { Crop } from './types';

export const CROPS: Crop[] = [
  {
    id: 'radish',
    name: '白萝卜',
    growthTime: 15, 
    buyPrice: 10,
    sellPrice: 25,
    xp: 5,
    color: 'from-white to-slate-100',
    emoji: '🥕'
  },
  {
    id: 'tomato',
    name: '西红柿',
    growthTime: 45,
    buyPrice: 40,
    sellPrice: 110,
    xp: 12,
    color: 'from-red-400 to-red-600',
    emoji: '🍅'
  },
  {
    id: 'corn',
    name: '玉米',
    growthTime: 90,
    buyPrice: 85,
    sellPrice: 240,
    xp: 25,
    color: 'from-yellow-300 to-yellow-500',
    emoji: '🌽'
  },
  {
    id: 'watermelon',
    name: '大西瓜',
    growthTime: 300,
    buyPrice: 200,
    sellPrice: 750,
    xp: 60,
    color: 'from-green-400 to-green-700',
    emoji: '🍉'
  }
];

export const INITIAL_LAND_COUNT = 12;
export const INITIAL_GOLD = 500;
export const XP_PER_LEVEL = 100;

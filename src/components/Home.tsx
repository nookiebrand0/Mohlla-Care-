import React from 'react';
import { HomeSlider } from './HomeSlider';
import { LayoutGrid, HeartHandshake, Briefcase, Store, Users, Map, Phone, Trophy, Sun, Bike, UserPlus } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const sections = [
    { id: "dashboard", icon: LayoutGrid, label: "Problems", color: "bg-red-500" },
    { id: "services", icon: HeartHandshake, label: "Services", color: "bg-pink-500" },
    { id: "rides", icon: Bike, label: "Rides (Rapido)", color: "bg-green-500" },
    { id: "jobs", icon: Briefcase, label: "Jobs", color: "bg-blue-500" },
    { id: "shopping", icon: Store, label: "Shop", color: "bg-emerald-500" },
    { id: "community", icon: Users, label: "Community", color: "bg-purple-500" },
    { id: "map", icon: Map, label: "Map", color: "bg-orange-500" },
    { id: "directory", icon: Phone, label: "Directory", color: "bg-teal-500" },
    { id: "leaderboard", icon: Trophy, label: "Leaders", color: "bg-yellow-500" },
  ];

  return (
    <div className="w-full pb-10">
      <HomeSlider />

      <div className="mb-6 mt-8">
        <h2 className="text-xl font-bold text-white mb-2">Explore Neighborhood</h2>
        <p className="text-sm text-slate-400">Everything you need, right here.</p>
      </div>

      <div className="mb-6">
        <button onClick={() => onNavigate('directory' as ViewState)} className="w-full bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-6 relative overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform text-left">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <UserPlus className="w-24 h-24 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 relative z-10 uppercase tracking-wide">Local Helper</h2>
          <p className="text-red-100 text-lg mb-4 relative z-10">Emergency or need quick help?</p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold relative z-10 border border-white/30">
            <Phone className="w-5 h-5" />
            <span>+91 98765 43210</span>
          </div>
          <p className="text-xs text-red-100 mt-3 relative z-10">* Click to see all active local helpers</p>
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-6">
        <div className="col-span-3 sm:col-span-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-2xl border border-blue-500/30 flex items-center justify-between shadow-lg">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-400" />
              Sunny, 29°C
            </h3>
            <p className="text-sm text-blue-200 mt-1">Perfect day for community activities!</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-300 font-medium px-2 py-1 bg-blue-500/20 rounded-lg inline-block">AQI: 45 (Good)</div>
          </div>
        </div>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id as ViewState)}
            className="flex flex-col items-center gap-2 group transition-all hover:scale-105"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${section.color} rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:-translate-y-1 group-active:scale-95 border-4 border-white/10`}>
              <section.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md" />
            </div>
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

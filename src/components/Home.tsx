import React from 'react';
import { HomeSlider } from './HomeSlider';
import { LayoutGrid, HeartHandshake, Briefcase, Store, Users, Map, Phone, Trophy } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const sections = [
    { id: "dashboard", icon: LayoutGrid, label: "Problems", color: "bg-red-500" },
    { id: "services", icon: HeartHandshake, label: "Services", color: "bg-pink-500" },
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

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-6">
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

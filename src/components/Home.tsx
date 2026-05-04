import React from 'react';
import { ViewState } from '../types';
import { 
  Search, 
  MapPin, 
  ShoppingCart,
  LayoutGrid, 
  HeartHandshake, 
  Bike, 
  Briefcase, 
  Store, 
  Users, 
  Map as MapIcon, 
  Phone, 
  Trophy,
  ChevronDown
} from 'lucide-react';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const categories = [
    { id: "dashboard", icon: LayoutGrid, label: "Problems", color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
    { id: "services", icon: HeartHandshake, label: "Services", color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10" },
    { id: "rides", icon: Bike, label: "Rapido", color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
    { id: "jobs", icon: Briefcase, label: "Jobs", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { id: "shopping", icon: Store, label: "Shop", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { id: "community", icon: Users, label: "Community", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { id: "directory", icon: Phone, label: "Directory", color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-500/10" },
    { id: "leaderboard", icon: Trophy, label: "Leaders", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
    { id: "map", icon: MapIcon, label: "Map", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
  ];

  return (
    <div className="w-full pb-32 pt-2 bg-white dark:bg-slate-950 min-h-[calc(100vh-140px)] rounded-[32px] overflow-hidden shadow-2xl relative">
      
      {/* Search Bar matching Wolt */}
      <div className="px-5 pt-6 pb-2">
         <div className="bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-full flex items-center px-4 py-3 shadow-inner">
           <Search className="w-5 h-5 text-slate-400 mr-2" strokeWidth={2.5} />
           <input 
              type="text" 
              placeholder="Search in Habibpura..." 
              className="bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder:text-slate-400 w-full font-medium"
           />
         </div>
      </div>

      {/* Top Details (Location + Cart) */}
      <div className="flex items-center justify-between px-5 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-full shadow-sm">
            <MapPin className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mb-0.5">Delivery Location</span>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">Habibpura, Area 3</span>
              <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-full relative cursor-pointer shadow-sm active:scale-95 transition-transform">
          <ShoppingCart className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2.5} />
          <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950">2</span>
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-5 mb-8">
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x -mx-5 px-5">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => onNavigate(cat.id as ViewState)}
              className="flex flex-col items-center gap-2 min-w-[76px] snap-start group"
            >
              <div className={`w-[76px] h-[76px] rounded-[24px] flex flex-col items-center justify-center ${cat.bg} transition-all active:scale-95 shadow-sm border border-slate-100 dark:border-white/5 group-hover:shadow-md`}>
                <cat.icon className={`w-8 h-8 mb-1 ${cat.color} stroke-[2]`} />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap group-hover:text-blue-500 transition-colors">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Banner Carousel */}
      <div className="px-5 mb-10">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x rounded-3xl -mx-5 px-5">
          {/* Banner 1 */}
          <div className="min-w-[90vw] md:min-w-full snap-start relative rounded-3xl overflow-hidden aspect-[21/9] bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg cursor-pointer transform transition-transform active:scale-[0.98]">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end z-10 w-2/3">
              <div className="bg-white text-blue-600 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider w-fit mb-2 shadow-sm">Mohalla+</div>
              <h3 className="text-white text-3xl font-black leading-tight mb-1 drop-shadow-md">2000 Pts off</h3>
              <p className="text-blue-50 text-xs font-bold drop-shadow-sm">Save more during Mohalla+ weeks!</p>
            </div>
            {/* Some graphic/image decoration */}
            <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute right-4 bottom-4 w-28 h-28 bg-white/10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <Store className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Banner 2 */}
          <div className="min-w-[90vw] md:min-w-full snap-start relative rounded-3xl overflow-hidden aspect-[21/9] bg-gradient-to-r from-orange-500 to-red-500 shadow-lg cursor-pointer transform transition-transform active:scale-[0.98]">
            <div className="absolute inset-0 p-5 flex flex-col justify-end z-10 w-2/3">
              <div className="bg-white text-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider w-fit mb-2 shadow-sm">Emergency</div>
              <h3 className="text-white text-3xl font-black leading-tight mb-1 drop-shadow-md">Need Help?</h3>
              <p className="text-orange-50 text-xs font-bold drop-shadow-sm">Local emergency directory at your tap.</p>
            </div>
            <div className="absolute right-4 bottom-4 w-28 h-28 bg-white/10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <Phone className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-slate-800 dark:bg-white transition-all"></div>
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all"></div>
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all"></div>
        </div>
      </div>

      {/* Trending / Highlights Section */}
      <div className="px-0 mb-6">
        <div className="flex items-center justify-between mb-4 px-5">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Mohalla+ Weeks</h2>
          <button className="text-blue-600 dark:text-blue-400 font-bold text-sm bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">See all</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-6 snap-x px-5">
           {/* Card 1 */}
           <div className="min-w-[260px] cursor-pointer snap-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30"></div>
                 {/* Placeholder for real image */}
                 <HeartHandshake className="absolute inset-0 m-auto w-16 h-16 text-blue-300 dark:text-blue-700/50 group-hover:scale-110 transition-transform duration-500" />
                 
                 <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">-20% Pts</div>
                 <div className="absolute top-3 right-3 bg-white dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-slate-600 dark:text-slate-300">
                   <HeartHandshake className="w-4 h-4" />
                 </div>
              </div>
              <div className="p-4">
                 <div className="flex items-start justify-between mb-1">
                   <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Plumbing Fixes</h4>
                   <div className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg flex items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                     20-30 min
                   </div>
                 </div>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 truncate">Expert local plumbers</p>
                 
                 <div className="flex items-center text-xs text-slate-600 dark:text-slate-400 gap-2 font-medium">
                   <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                     <span className="flex items-center text-blue-600 dark:text-blue-400 font-bold">
                       <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                       4.8
                     </span>
                   </div>
                   <span>•</span>
                   <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded font-bold">Mohalla+</span>
                   <span>•</span>
                   <span>1.2 km</span>
                 </div>
              </div>
           </div>

           {/* Card 2 */}
           <div className="min-w-[260px] cursor-pointer snap-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30"></div>
                 <Store className="absolute inset-0 m-auto w-16 h-16 text-emerald-300 dark:text-emerald-700/50 group-hover:scale-110 transition-transform duration-500" />
                 
                 <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">-500 Pts</div>
                 <div className="absolute top-3 right-3 bg-white dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-slate-600 dark:text-slate-300">
                   <Store className="w-4 h-4" />
                 </div>
              </div>
              <div className="p-4">
                 <div className="flex items-start justify-between mb-1">
                   <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Fresh Mart</h4>
                   <div className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg flex items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                     10-15 min
                   </div>
                 </div>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 truncate">Groceries & Daily needs</p>
                 
                 <div className="flex items-center text-xs text-slate-600 dark:text-slate-400 gap-2 font-medium">
                   <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                     <span className="flex items-center text-blue-600 dark:text-blue-400 font-bold">
                       <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                       4.9
                     </span>
                   </div>
                   <span>•</span>
                   <span>0.5 km</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}


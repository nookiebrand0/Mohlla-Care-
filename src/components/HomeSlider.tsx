import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Trophy, Star, Clock, HeartHandshake } from "lucide-react";
import { useStore } from "../store";

export function HomeSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const state = useStore();

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const topUser = [...state.leaderboard].sort((a, b) => b.points - a.points)[0];
  const featuredService = state.womenServices[0];

  return (
    <div className="w-full mb-8 rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl relative">
      <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
        <Clock className="w-4 h-4 text-blue-400" />
        <span className="text-white font-mono text-sm font-bold tracking-wider">
          {time}
        </span>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {/* Slide 1: Welcome & Time */}
          <div className="flex-[0_0_100%] min-w-0 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-900/40 to-slate-900 min-h-[200px]">
            <h2 className="text-3xl font-black text-white mb-2">
              Welcome to Habibpura
            </h2>
            <p className="text-blue-300 font-medium">
              Your local community platform
            </p>
          </div>

          {/* Slide 2: Top Leaderboard */}
          <div className="flex-[0_0_100%] min-w-0 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-yellow-900/40 to-slate-900 min-h-[200px]">
            <Trophy className="w-10 h-10 text-yellow-500 mb-3 drop-shadow-md" />
            <h3 className="text-white font-bold text-xl mb-1">
              Top Contributor
            </h3>
            <div className="text-yellow-400 font-black text-2xl">
              {topUser?.name}
            </div>
            <p className="text-slate-400 text-sm mt-1">
              {topUser?.points} Points • {topUser?.badge}
            </p>
          </div>

          {/* Slide 3: Featured Service */}
          <div className="flex-[0_0_100%] min-w-0 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-purple-900/40 to-slate-900 min-h-[200px]">
            <HeartHandshake className="w-10 h-10 text-purple-400 mb-3" />
            <h3 className="text-white font-bold text-xl mb-1">
              Featured Service
            </h3>
            <div className="text-purple-300 font-black text-2xl">
              {featuredService?.name}
            </div>
            <p className="text-slate-400 text-sm mt-1">
              {featuredService?.serviceType} • {featuredService?.price}
            </p>
          </div>

          {/* Slide 4: Advertisement */}
          <div className="flex-[0_0_100%] min-w-0 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-emerald-900/40 to-slate-900 min-h-[200px]">
            <div className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-black tracking-widest mb-3">
              Sponsored
            </div>
            <h3 className="text-white font-bold text-2xl mb-2">
              Gupta Electronics
            </h3>
            <p className="text-emerald-300 font-medium max-w-[250px] mx-auto text-sm">
              Get 20% off on all AC repairs this summer! Call now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

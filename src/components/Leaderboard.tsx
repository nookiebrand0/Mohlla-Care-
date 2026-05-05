import React, { useState } from "react";
import { motion } from "motion/react";
import { Trophy, ArrowLeft, Star, Crown } from "lucide-react";
import { useStore } from "../store";

export function Leaderboard() {
  const state = useStore();
  const [tab, setTab] = useState<'weekly'|'allTime'>('weekly');

  const sortedLeaderboard = [...state.leaderboard].sort((a, b) => b.points - a.points);
  const podium = [
    sortedLeaderboard[1], // #2
    sortedLeaderboard[0], // #1
    sortedLeaderboard[2], // #3
  ];

  const rest = sortedLeaderboard.slice(3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-[#6558C4] rounded-[32px] overflow-hidden flex flex-col relative text-white font-sans"
    >
      {/* Header */}
      <div className="pt-8 px-6 pb-6 flex flex-col items-center relative z-10">
        <h2 className="text-2xl font-bold tracking-wide">Leaderboard</h2>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#5448A4] mx-6 rounded-full p-1 mb-8 relative z-10 shadow-inner">
        <button 
          onClick={() => setTab('weekly')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all ${tab === 'weekly' ? 'bg-white text-[#6558C4] shadow-md' : 'text-[#C9C4E9]'}`}
        >
          Weekly
        </button>
        <button 
          onClick={() => setTab('allTime')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all ${tab === 'allTime' ? 'bg-white text-[#6558C4] shadow-md' : 'text-[#C9C4E9]'}`}
        >
          All Time
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 z-10 relative">
        {/* Banner */}
        <div className="bg-[#FEA85F]/90 backdrop-blur-sm rounded-2xl p-4 w-full max-w-sm mb-12 shadow-lg flex items-center justify-between">
           <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg">#{sortedLeaderboard.length > 3 ? '4' : '1'}</div>
           <div className="text-white text-sm font-bold flex-1 px-4 leading-tight">
             You are doing better than 60% of other players!
           </div>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center w-full max-w-md h-56 gap-2 sm:gap-4 -mt-4 mb-2">
           {/* Rank 2 */}
           {podium[0] && (
             <div className="flex flex-col items-center w-1/3">
                <div className="relative mb-2">
                   <div className="w-16 h-16 rounded-full bg-slate-300 border-4 border-slate-300 shadow-md flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-[#E5E0FF] text-[#6558C4] flex items-center justify-center font-bold text-xl uppercase">{podium[0].name.charAt(0)}</div>
                   </div>
                   <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#5448A4] text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-white/20 shadow-sm">{podium[0].points} QP</div>
                </div>
                <div className="bg-[#9F94ED] w-full rounded-t-xl h-24 flex flex-col items-center justify-start pt-3 shadow-inner relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/5"></div>
                   <span className="text-white font-black text-4xl opacity-80">2</span>
                </div>
             </div>
           )}

           {/* Rank 1 */}
           {podium[1] && (
             <div className="flex flex-col items-center w-[38%]">
                <Crown className="w-8 h-8 text-[#FFD700] mb-2 drop-shadow-md animate-bounce" />
                <div className="relative mb-2">
                   <div className="w-20 h-20 rounded-full bg-[#FFD700] border-4 border-[#FFD700] shadow-lg flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-[#E5E0FF] text-[#6558C4] flex items-center justify-center font-bold text-2xl uppercase">{podium[1].name.charAt(0)}</div>
                   </div>
                   <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#5448A4] text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-white/20 shadow-sm whitespace-nowrap">{podium[1].points} QP</div>
                </div>
                <div className="bg-[#8A7CE0] w-full rounded-t-xl h-32 flex flex-col items-center justify-start pt-4 shadow-inner relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/5"></div>
                   <span className="text-white font-black text-5xl opacity-90 drop-shadow-sm">1</span>
                </div>
             </div>
           )}

           {/* Rank 3 */}
           {podium[2] && (
             <div className="flex flex-col items-center w-1/3">
                <div className="relative mb-2">
                   <div className="w-16 h-16 rounded-full bg-amber-600 border-4 border-amber-600 shadow-md flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-[#E5E0FF] text-[#6558C4] flex items-center justify-center font-bold text-xl uppercase">{podium[2].name.charAt(0)}</div>
                   </div>
                   <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#5448A4] text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-white/20 shadow-sm">{podium[2].points} QP</div>
                </div>
                <div className="bg-[#9F94ED] w-full rounded-t-xl h-20 flex flex-col items-center justify-start pt-2 shadow-inner relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/5"></div>
                   <span className="text-white font-black text-4xl opacity-80">3</span>
                </div>
             </div>
           )}
        </div>

        {/* List */}
        <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-t-[32px] rounded-b-[24px] pt-8 pb-32 px-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] flex-1 z-20">
           <div className="max-w-md mx-auto space-y-3">
              {rest.map((entry, index) => (
                <div key={entry.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-white/5 cursor-pointer hover:shadow-md transition-shadow">
                   <div className="w-8 text-center text-slate-400 font-bold text-lg">{index + 4}</div>
                   <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center font-bold text-[#6558C4] dark:text-purple-300 shadow-inner">
                      {entry.name.charAt(0)}
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-slate-800 dark:text-white">{entry.name}</h4>
                      <p className="text-xs text-[#6558C4] dark:text-purple-400 font-bold">{entry.points} points</p>
                   </div>
                </div>
              ))}
              {rest.length === 0 && (
                <div className="text-center text-slate-500 py-4 font-medium">No other users yet. Invite your friends!</div>
              )}
           </div>
        </div>
      </div>
    </motion.div>
  );
}

import React from "react";
import { motion } from "motion/react";
import { Trophy, Medal, Star } from "lucide-react";
import { useStore } from "../store";

export function Leaderboard() {
  const state = useStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="mb-8 text-center pt-4">
        <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/30 shadow-lg shadow-yellow-500/20">
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-2">
          Mohalla Heroes
        </h2>
        <p className="text-slate-400 text-lg">
          Celebrating the most helpful people in our neighborhood
        </p>
      </div>

      <div className="max-w-[700px] mx-auto">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8 space-y-4">
            {[...state.leaderboard].sort((a, b) => b.points - a.points).map(
              (entry, index) => (
                <div
                  key={entry.id}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/5 border border-yellow-500/30 shadow-lg shadow-yellow-500/10"
                      : index === 1
                        ? "bg-gradient-to-r from-slate-400/20 to-slate-500/5 border border-slate-400/30"
                        : index === 2
                          ? "bg-gradient-to-r from-amber-700/20 to-orange-800/5 border border-amber-700/30"
                          : "bg-white/5 border border-white/5 hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg ${
                      index === 0
                        ? "bg-yellow-500 text-yellow-900 shadow-md"
                        : index === 1
                          ? "bg-slate-300 text-slate-800 shadow-md"
                          : index === 2
                            ? "bg-amber-600 text-amber-950 shadow-md"
                            : "bg-white/10 text-white"
                    }`}
                  >
                    #{index + 1}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white leading-tight flex items-center gap-2">
                      {entry.name}
                      {index === 0 && (
                        <Medal className="w-4 h-4 text-yellow-500" />
                      )}
                    </h3>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                      {entry.badge}
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end justify-center">
                    <div className="text-2xl font-black text-white leading-none tracking-tight">
                      {entry.points}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-blue-400 font-bold uppercase mt-1">
                      <Star className="w-3 h-3 fill-current" /> pts
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Earn points by helping neighbors, reporting issues, and contributing
          to the community.
        </div>
      </div>
    </motion.div>
  );
}

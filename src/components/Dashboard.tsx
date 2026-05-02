import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Issue, User } from "../types";
import { IssueCard } from "./IssueCard";

interface DashboardProps {
  user: User;
  issues: Issue[];
  onReportNew: () => void;
  onUpvote: (id: string) => void;
}

export function Dashboard({
  user,
  issues,
  onReportNew,
  onUpvote,
}: DashboardProps) {
  const sortedIssues = [...issues].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Local Issues
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            See what's happening in your neighborhood
          </p>
        </div>
      </div>

      <div className="space-y-4 pb-20">
        <AnimatePresence>
          {sortedIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} onUpvote={onUpvote} />
          ))}
          {sortedIssues.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/5 backdrop-blur-md rounded-[32px] border border-dashed border-white/20"
            >
              <div className="text-slate-400 mb-2">No issues reported yet.</div>
              <p className="text-sm text-slate-500">
                Be the first to report a problem in your area.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReportNew}
        className="fixed bottom-28 md:bottom-24 right-4 md:right-10 bg-blue-500 text-white p-4 md:p-5 rounded-2xl shadow-lg shadow-blue-500/40 hover:bg-blue-600 transition-all z-30 flex items-center justify-center border border-white/10"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

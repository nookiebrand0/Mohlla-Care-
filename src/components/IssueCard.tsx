import React from "react";
import { motion } from "motion/react";
import {
  ThumbsUp,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Issue } from "../types";

interface IssueCardProps {
  key?: React.Key;
  issue: Issue;
  onUpvote?: (id: string) => void;
}

export function IssueCard({ issue, onUpvote }: IssueCardProps) {
  const statusColors = {
    reported: "bg-red-500/10 text-red-400 border-red-500/20",
    "in-progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    resolved: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  const statusIcons = {
    reported: <AlertCircle className="w-3.5 h-3.5 mr-1" />,
    "in-progress": <Clock className="w-3.5 h-3.5 mr-1" />,
    resolved: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
  };

  // Basic relative time formatter
  const getRelativeTime = (dateString: string) => {
    const days = Math.floor(
      (new Date().getTime() - new Date(dateString).getTime()) /
        (1000 * 3600 * 24),
    );
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 hover:border-white/20 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {issue.category}
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[issue.status]}`}
        >
          {statusIcons[issue.status]}
          {issue.status.replace("-", " ").toUpperCase()}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
        {issue.title}
      </h3>
      <p className="text-slate-400 text-sm line-clamp-2 mb-5 leading-relaxed">
        {issue.description}
      </p>

      {issue.imageUrl && (
        <div className="mb-5 rounded-xl overflow-hidden h-48 bg-white/5 border border-white/10">
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onUpvote && onUpvote(issue.id)}
            className={`flex items-center text-sm font-medium transition-colors ${
              issue.isUpvoted
                ? "text-blue-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ThumbsUp
              className={`w-4 h-4 mr-2 ${issue.isUpvoted ? "fill-current" : ""}`}
            />
            {issue.upvotes} {issue.upvotes === 1 ? "Support" : "Supports"}
          </button>
        </div>
        <div className="text-xs text-slate-500 font-medium tracking-wide uppercase">
          Reported {getRelativeTime(issue.createdAt)}
        </div>
      </div>
    </motion.div>
  );
}

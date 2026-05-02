import React, { useState } from "react";
import { motion } from "motion/react";
import { useStore, store } from "../store";
import { MessageCircle, Search, Edit3, Send, Clock } from "lucide-react";
import { CommunityPost } from "../types";

interface CommunityForumProps {
  onReward?: () => void;
}

export function CommunityForum({ onReward }: CommunityForumProps) {
  const state = useStore();
  const [newPost, setNewPost] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [search, setSearch] = useState("");

  const filteredPosts = state.communityPosts.filter((post) =>
    post.content.toLowerCase().includes(search.toLowerCase()),
  );

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: CommunityPost = {
      id: `p${Date.now()}`,
      content: newPost,
      isAnonymous,
      authorName: isAnonymous ? undefined : "Current User", // Just mock user
      replies: 0,
      createdAt: new Date().toISOString(),
    };
    store.addCommunityPost(post);
    setNewPost("");
    setIsAnonymous(false);
    onReward?.();
  };

  const getTimeAgo = (isoTime: string) => {
    const min = Math.floor(
      (new Date().getTime() - new Date(isoTime).getTime()) / 60000,
    );
    if (min < 60) return `${min}m ago`;
    const hours = Math.floor(min / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full pb-16"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Women's Community
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          A safe space to ask, share and grow together.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 mb-8 shadow-sm">
        <h3 className="font-semibold text-white flex items-center gap-2 mb-3">
          <Edit3 className="w-4 h-4 text-blue-400" /> Start a discussion
        </h3>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Ask a question, ask for recommendations or share an update..."
          className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder:text-slate-500 min-h-[100px] mb-3 transition-all"
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer group">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-slate-800 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-slate-900"
            />
            <span className="flex items-center gap-1.5 group-hover:text-white transition-colors">
              Post Anonymously
            </span>
          </label>
          <button
            onClick={handlePost}
            disabled={!newPost.trim()}
            className="w-full sm:w-auto bg-blue-500 disabled:bg-blue-500/30 disabled:text-white/50 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Post
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search discussions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-white placeholder:text-slate-500"
        />
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${post.isAnonymous ? "bg-slate-800 text-slate-400" : "bg-blue-500/20 text-blue-400"}`}
                >
                  {post.isAnonymous ? (
                    <span className="font-bold text-xs">?</span>
                  ) : (
                    <span className="font-bold text-xs">
                      {post.authorName?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {post.isAnonymous ? "Anonymous Member" : post.authorName}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {getTimeAgo(post.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-slate-200 text-sm leading-relaxed mb-4">
              {post.content}
            </p>

            <div className="flex items-center gap-4 border-t border-white/5 pt-3">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
                {post.replies > 0 ? `${post.replies} Replies` : "Reply"}
              </button>
            </div>
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <div className="py-16 text-center bg-white/5 rounded-[32px] border border-dashed border-white/20">
            <p className="text-slate-400">No discussions found.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Camera, Send, Loader2 } from "lucide-react";
import { CATEGORIES } from "../constants";
import { Issue, User } from "../types";

interface ReportIssueProps {
  user: User;
  onBack: () => void;
  onSubmit: (
    issue: Omit<Issue, "id" | "createdAt" | "status" | "upvotes">,
  ) => void;
}

export function ReportIssue({ user, onBack, onSubmit }: ReportIssueProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imageSimulated, setImageSimulated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onSubmit({
        title,
        description,
        category,
        reportedBy: user.phone,
        imageUrl: imageSimulated
          ? "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800"
          : undefined,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen text-white pb-12">
      <header className="bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-20 px-4 h-16 flex items-center">
        <div className="max-w-[700px] mx-auto w-full flex items-center">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Report an Issue</h1>
        </div>
      </header>

      <main className="max-w-[700px] mx-auto p-4 py-8">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-6 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      category === cat
                        ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/40"
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="title"
                className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block"
              >
                Issue Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Deep pothole on Main Road"
                className="w-full bg-white/5 border border-white/20 rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide details about the location and severity..."
                rows={4}
                className="w-full bg-white/5 border border-white/20 rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-white placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                Add Photo (Optional)
              </label>
              <button
                type="button"
                onClick={() => setImageSimulated(!imageSimulated)}
                className={`w-full h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                  imageSimulated
                    ? "border-blue-400 bg-blue-500/10 text-blue-400 shadow-inner"
                    : "border-white/20 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/30 hover:text-slate-300"
                }`}
              >
                <Camera className="w-8 h-8 mb-3" />
                <span className="text-sm font-medium tracking-wide">
                  {imageSimulated
                    ? "✓ Mock Image Added"
                    : "Tap to simulate adding a photo"}
                </span>
                {imageSimulated && (
                  <span className="text-xs mt-2 opacity-80">
                    (Click to remove)
                  </span>
                )}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={!title.trim() || !description.trim() || loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/40 transition-all text-lg mt-8 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Submit Report <Send className="w-5 h-5 ml-1" />
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-slate-500 mt-6 tracking-wide">
              By submitting this report, you confirm the issue is genuine and in
              the specified location.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

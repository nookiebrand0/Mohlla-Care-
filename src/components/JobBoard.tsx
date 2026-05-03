import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "../store";
import {
  Briefcase,
  MapPin,
  Building,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

interface JobBoardProps {
  onReward?: () => void;
}

export function JobBoard({ onReward }: JobBoardProps) {
  const [filter, setFilter] = useState("All");
  const [applied, setApplied] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState<string | null>(null);
  const state = useStore();

  const types = ["All", "Part-time", "Work from Home", "Full-time"];

  const dummyJobs: any[] = [
    { id: "j1", title: "Construction Worker", description: "Looking for 5 workers for a new site.", type: "Part-time", company: "Ramesh Singh", salary: "₹500/day", contact: "9876543210" },
    { id: "j2", title: "Plumber Needed", description: "Urgent fix required in Block C.", type: "Part-time", company: "Amit", salary: "₹800/job", contact: "9876543211" },
    { id: "j3", title: "Data Entry", description: "Remote data entry work.", type: "Work from Home", company: "Tech Services", salary: "₹10k/month", contact: "9876543212" },
    { id: "j4", title: "Electrician", description: "House wiring project.", type: "Full-time", company: "Suresh", salary: "₹15k/month", contact: "9876543213" }
  ];

  const currentJobs = state.jobs.length > 0 ? state.jobs : dummyJobs;

  const filtered = currentJobs.filter(
    (j) => filter === "All" || j.type === filter,
  );

  const handleApplyClick = (id: string) => {
    setShowApplyModal(id);
  };

  const submitApplication = (id: string) => {
    setApplied((prev) => ({ ...prev, [id]: true }));
    setShowApplyModal(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full pb-16"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Local Jobs
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Find part-time and work-from-home opportunities nearby.
        </p>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 sm:pb-4 scrollbar-hide shrink-0 mb-6">
        {types.map((t, i) => {
          const customColor = i === 0 ? "#00fc34" : i === 1 ? "#18dc1b" : i === 2 ? "#50ff53" : "#05ff63";
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{ color: customColor }}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                filter === t
                  ? "bg-white/20 border-white/30"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                  {job.type}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Building className="w-3 h-3" /> {job.company}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
              <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                {job.description}
              </p>
              <div className="font-bold text-blue-400 text-sm">
                {job.salary}
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 min-w-[120px]">
              {applied[job.id] ? (
                <div className="flex items-center gap-1 text-green-400 font-semibold text-sm py-2 px-4 bg-green-500/10 rounded-xl border border-green-500/20 w-full sm:w-auto justify-center">
                  <CheckCircle className="w-4 h-4" /> Applied
                </div>
              ) : (
                <button
                  onClick={() => handleApplyClick(job.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white border border-transparent font-semibold py-2 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 text-sm w-full sm:w-auto text-center"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center bg-white/5 rounded-[32px] border border-dashed border-white/20">
            <p className="text-slate-400">No jobs found for this filter.</p>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
      >
        <Briefcase className="w-4 h-4" /> Post a Job
      </button>

      {/* Post modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 p-6 rounded-2xl max-w-sm w-full shadow-2xl relative"
            >
              <h2 className="text-xl font-bold text-white mb-2">Post a Job</h2>
              <p className="text-slate-400 text-sm mb-6">
                Tell the community about a job opportunity or hiring need.
              </p>
              
              <div className="space-y-3 mb-6">
                 <input type="text" placeholder="Job Title" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="text" placeholder="Company / Individual" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
              </div>

              <div className="flex gap-2 justify-end mt-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all flex-1"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                     setShowModal(false);
                     onReward?.();
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-all flex-1"
                >
                  Post Job
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apply modal */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 p-6 rounded-2xl max-w-sm w-full shadow-2xl relative"
            >
              <h2 className="text-xl font-bold text-white mb-2">Apply for Job</h2>
              <p className="text-slate-400 text-sm mb-6">
                Please provide your details below. The employer will contact you.
              </p>
              
              <div className="space-y-3 mb-6">
                 <input type="text" placeholder="Full Name" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none" required />
                 <input type="tel" placeholder="Phone Number" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none" required />
                 <textarea placeholder="Experience or Skills..." rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none"></textarea>
              </div>

              <div className="flex gap-2 justify-end mt-4">
                <button 
                  onClick={() => setShowApplyModal(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all flex-1"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => submitApplication(showApplyModal)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-all flex-1"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

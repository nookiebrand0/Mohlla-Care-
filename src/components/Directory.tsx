import React, { useState } from "react";
import { motion } from "motion/react";
import { Phone, Star, MapPin, Search } from "lucide-react";
import { ServiceContact } from "../types";
import { useStore } from "../store";

interface DirectoryProps {
  onReward?: () => void;
}

export function Directory({ onReward }: DirectoryProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const state = useStore();

  const categories = [
    "All",
    "Hospital",
    "Medical",
    "Plumber",
    "Electrician",
    "Milkman",
    "Tailor",
  ];

  const filteredServices = state.services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || service.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Mohalla Directory
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Important contacts for emergency and daily services
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search hospitals, medical stores, plumbers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder:text-slate-500"
          />
        </div>
        <div className="flex overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-hide shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                filter === cat
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-sm hover:border-white/20 transition-all flex items-start justify-between"
          >
            <div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2 uppercase tracking-wider">
                {service.category}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {service.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-slate-400 mb-3">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium text-slate-300">
                  {service.rating}
                </span>
                <span className="mx-1">•</span>
                <span>Verified</span>
              </div>
            </div>

            <a
              href={`tel:${service.phone.replace(/\s+/g, "")}`}
              onClick={() => onReward?.()}
              className="w-12 h-12 bg-green-500/20 text-green-400 flex items-center justify-center rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-lg shadow-green-500/20"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        ))}
        {filteredServices.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white/5 rounded-[32px] border border-dashed border-white/20">
            <p className="text-slate-400">No services found for your search.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

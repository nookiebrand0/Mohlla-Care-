import React from "react";
import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";

export function LocalMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full flex flex-col"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Mohalla Map
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Explore issues and services near you
          </p>
        </div>
        <button className="hidden sm:flex bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium items-center gap-2 transition-all shadow-lg shadow-blue-500/20">
          <Navigation className="w-4 h-4" /> My Location
        </button>
      </div>

      <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative min-h-[500px] md:min-h-[600px] shadow-2xl p-2 pb-[64px] md:pb-2">
        <div className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-900">
          {/* We use OpenStreetMap via iframe for a functional map look without taking API keys. 
              The filter class makes it fit the dark mode semi-transparent theme. */}
          <iframe
            title="Local Area Map"
            width="100%"
            height="100%"
            loading="lazy"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.20230102539064%2C28.601936302523292%2C77.23457336425783%2C28.6254425790076&amp;layer=mapnik"
            className="filter invert hue-rotate-180 contrast-75 opacity-80"
          ></iframe>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <div className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-blue-500/40 mb-1 border border-white/20 whitespace-nowrap">
              You are here
            </div>
            <MapPin className="w-8 h-8 text-blue-500 drop-shadow-md" />
            <div className="w-3 h-1 bg-black/40 rounded-full blur-[2px] mt-1"></div>
          </div>

          {/* Decorative pins mimicking other users or issues */}
          <div className="absolute top-[30%] left-[60%] flex flex-col items-center pointer-events-none">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 shadow-md"></div>
          </div>
          <div className="absolute top-[60%] left-[30%] flex flex-col items-center pointer-events-none">
            <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-slate-900 shadow-md"></div>
          </div>
          <div className="absolute top-[40%] left-[20%] flex flex-col items-center pointer-events-none">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 shadow-md"></div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 md:hidden">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/40 transition-all flex items-center justify-center gap-2">
            <Navigation className="w-5 h-5" /> Locate Me
          </button>
        </div>
      </div>
    </motion.div>
  );
}

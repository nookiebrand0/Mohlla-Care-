import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "../store";
import { Phone, Star, Scissors, Briefcase } from "lucide-react";

interface ServiceMarketplaceProps {
  onReward?: () => void;
}

export function ServiceMarketplace({ onReward }: ServiceMarketplaceProps) {
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const categories = ["All", "Silai", "Makeup", "Tiffin", "Tuition", "Other"];
  const state = useStore();

  const dummyServices: any[] = [
    { id: "s1", name: "Radha's Silai Center", serviceType: "Silai", rating: 4.8, description: "Expert tailoring and alterations.", price: "Starts ₹50", phone: "9876543201" },
    { id: "s2", name: "Priya Bridal Makeup", serviceType: "Makeup", rating: 4.9, description: "Professional makeup artist for party out.", price: "Starts ₹500", phone: "9876543202" },
    { id: "s3", name: "Home Cooked Tiffin", serviceType: "Tiffin", rating: 4.7, description: "Healthy meals delivered to your door.", price: "₹100/meal", phone: "9876543203" },
    { id: "s4", name: "Math Tutors 10th-12th", serviceType: "Tuition", rating: 4.5, description: "Evening math classes.", price: "₹1000/mo", phone: "9876543204" }
  ];

  const currentServices = state.womenServices.length > 0 ? state.womenServices : dummyServices;

  const filtered = currentServices.filter(
    (s) => filter === "All" || s.serviceType === filter,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full pb-16"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Women Services
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Support local women entrepreneurs. Hire for silai, makeup, tiffin &
          more.
        </p>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 sm:pb-4 scrollbar-hide shrink-0 mb-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((service) => (
          <div
            key={service.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-sm hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wider">
                  <Scissors className="w-3 h-3 mr-1" /> {service.serviceType}
                </div>
                <div className="flex items-center gap-1 text-sm text-yellow-500 font-bold">
                  <Star className="w-4 h-4 fill-current" /> {service.rating}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {service.name}
              </h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">
                  Price
                </div>
                <div className="font-bold text-blue-400">{service.price}</div>
              </div>
              <a
                href={`tel:${service.phone.replace(/\s+/g, "")}`}
                onClick={() => onReward?.()}
                className="flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-xl hover:bg-green-500 hover:text-white transition-all font-semibold text-sm"
              >
                <Phone className="w-4 h-4" /> Contact
              </a>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white/5 rounded-[32px] border border-dashed border-white/20">
            <p className="text-slate-400">
              No services found in this category.
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
      >
        <Briefcase className="w-4 h-4" /> List Your Service
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
              <h2 className="text-xl font-bold text-white mb-2">List Service</h2>
              <p className="text-slate-400 text-sm mb-6">
                Offer your skills to the community.
              </p>
              
              <div className="space-y-3 mb-6">
                 <input type="text" placeholder="Your Name" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="text" placeholder="Service (e.g. Plumber, Tutor)" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="tel" placeholder="Phone Number" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
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
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-all flex-1"
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

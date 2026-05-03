import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bike, MapPin, Search } from 'lucide-react';

import { store } from '../store';

export function Rides() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [rideFound, setRideFound] = useState(false);
  const [currentRideId, setCurrentRideId] = useState<string | null>(null);

  const handleSearch = () => {
    setIsSearching(true);
    const id = Date.now().toString();
    setCurrentRideId(id);
    store.addRide({ id, pickup, dropoff });
    
    setTimeout(() => {
      setIsSearching(false);
      setRideFound(true);
      store.updateRide(id, { status: 'driver_found', driverName: 'Rahul', fare: 35, ETA: '2 mins' });
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-lg mx-auto pb-20">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-b-3xl p-6 pt-12 text-white shadow-xl mb-6">
        <h1 className="text-3xl font-black mb-2 flex items-center gap-2">
          <Bike className="w-8 h-8" /> Local Rides
        </h1>
        <p className="text-green-100">Quick bike rides (Rapido style) in you neighborhood.</p>
      </div>

      <div className="px-4">
        {!rideFound ? (
          <div className="bg-white/10 p-6 rounded-3xl border border-white/20 backdrop-blur-md">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Pickup Location</label>
                <div className="flex items-center gap-2 bg-slate-800/50 p-3 rounded-xl border border-white/10">
                  <MapPin className="text-green-400 w-5 h-5 flex-shrink-0" />
                  <input
                    type="text"
                    className="bg-transparent w-full outline-none text-white placeholder-slate-500"
                    placeholder="Enter pickup point"
                    value={pickup}
                    onChange={e => setPickup(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Drop-off Location</label>
                <div className="flex items-center gap-2 bg-slate-800/50 p-3 rounded-xl border border-white/10">
                  <Search className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <input
                    type="text"
                    className="bg-transparent w-full outline-none text-white placeholder-slate-500"
                    placeholder="Where to?"
                    value={dropoff}
                    onChange={e => setDropoff(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={!pickup || !dropoff || isSearching}
                className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 active:scale-95 mt-4"
              >
                {isSearching ? "Finding a rider..." : "Find Ride"}
              </button>
            </div>
          </div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/10 p-6 rounded-3xl border border-green-500/50 backdrop-blur-md text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Bike className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Rider Found!</h2>
            <p className="text-slate-300 mb-6">Rahul is 2 mins away.</p>
            
            <div className="bg-slate-800/50 rounded-xl p-4 mb-6 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400">Bike</span>
                <span className="text-white font-bold">Hero Splendor</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-slate-400">Total Fare</span>
                <span className="text-green-400 font-bold">₹35</span>
              </div>
            </div>

            <button onClick={() => { 
                setRideFound(false); 
                setPickup(''); 
                setDropoff(''); 
                if (currentRideId) store.updateRide(currentRideId, { status: 'cancelled' });
              }} className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all">
              Cancel Ride
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

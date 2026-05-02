import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Navigation, Loader2, AlertCircle } from "lucide-react";

export function LocalMap() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching location:", error);
        setError("Unable to retrieve your location. Please check permissions.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    // Optionally fetch on mount
    // fetchLocation();

    // Default to a central location if not fetched
    setLocation({ lat: 28.6139, lng: 77.209 }); // Default New Delhi
  }, []);

  // Compute a bounding box approx 2km across
  const delta = 0.015;
  const bbox = location
    ? `${location.lng - delta},${location.lat - delta},${location.lng + delta},${location.lat + delta}`
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full flex flex-col max-w-7xl mx-auto"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Live Map
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
            Discover community activity and issues near you
          </p>
        </div>
        <button
          onClick={fetchLocation}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium w-full sm:w-auto flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Navigation className="w-5 h-5" />
          )}
          Locate Me
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 p-3 rounded-lg border border-red-100 dark:border-red-500/20 text-sm font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden relative min-h-[500px] md:min-h-[600px] shadow-sm p-1.5 md:pb-1.5">
        <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
          {location ? (
            <iframe
              title="Local Area Map"
              width="100%"
              height="100%"
              loading="lazy"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              className="dark:filter dark:invert dark:hue-rotate-180 dark:contrast-75 dark:opacity-80 transition-all duration-700"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${location.lat},${location.lng}`}
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
              <span className="text-slate-500 font-medium">Loading Map...</span>
            </div>
          )}

          {location && (
            <div className="absolute bottom-6 right-6 pointer-events-none">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                  Live GPS Active
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutGrid,
  Map,
  ShoppingBag,
  Trophy,
  Users,
  LogOut,
  Phone,
  User as UserIcon,
  Briefcase,
  HeartHandshake,
  ShieldAlert,
  Store,
  ShieldCheck,
  Coins,
  Home as HomeIcon,
  Sun,
  Moon,
  Sparkles,
  Bot
} from "lucide-react";
import { User, ViewState } from "../types";

interface NavigationContext {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  user: User;
  onLogout: () => void;
}

export const topNavItems = [
  { id: "home" as ViewState, icon: HomeIcon, label: "Home" },
  { id: "dashboard" as ViewState, icon: LayoutGrid, label: "Issues" },
  { id: "jobs" as ViewState, icon: Briefcase, label: "Jobs" },
  { id: "community" as ViewState, icon: Users, label: "Community" },
  { id: "directory" as ViewState, icon: Phone, label: "Directory" },
  { id: "leaderboard" as ViewState, icon: Trophy, label: "Leaders" },
];

export const bottomNavItems = [
  { id: "services" as ViewState, icon: HeartHandshake, label: "Services" },
  { id: "shopping" as ViewState, icon: Store, label: "Shop" },
  { id: "map" as ViewState, icon: Map, label: "Map" },
];

export function AppLayout({
  children,
  currentView,
  setCurrentView,
  user,
  onLogout,
}: NavigationContext & { children: React.ReactNode }) {
  const [sosStage, setSosStage] = useState<"idle" | "confirm" | "activated">("idle");
  const [isDark, setIsDark] = useState(true);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Determine initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (isDarkMode !== isDark) {
      if (isDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const triggerSOS = () => {
    setSosStage("confirm");
  };

  const cancelSOS = () => {
    setSosStage("idle");
    setHoldProgress(0);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  const startHold = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    const startTime = Date.now();
    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 2000) * 100, 100);
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(holdIntervalRef.current!);
        holdIntervalRef.current = null;
        setSosStage("activated");
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200, 100, 500]);
        }
      }
    }, 50);
  };

  const endHold = () => {
    if (sosStage !== "activated" && holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
      setHoldProgress(0);
    }
  };

  return (
    <div className="min-h-screen text-white relative pb-24 pt-[140px] md:pt-[120px] bg-transparent">
      {/* Top Header */}
      <header className="bg-slate-900/60 backdrop-blur-3xl fixed top-0 w-full z-40 border-b border-white/5 pb-4">
        <div className="max-w-[1024px] mx-auto px-4 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white font-bold text-lg md:text-xl tracking-tight shrink-0 mr-4">
            {currentView !== "home" && (
              <button 
                onClick={() => setCurrentView("home")}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/40">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span>
              Mohalla <span className="text-blue-400">Solve</span>
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl font-black text-sm">
              <Coins className="w-4 h-4" /> {user.points || 0}
            </div>
            <button
              onClick={() => setCurrentView('notifications' as any)}
              className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors relative"
              title="Notifications"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={triggerSOS}
              className="flex items-center gap-1 md:gap-2 bg-red-500/20 text-red-500 border border-red-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-xs md:text-sm shadow-lg shadow-red-500/20"
            >
              <ShieldAlert className="w-4 h-4 md:w-5 md:h-5" /> SOS
            </button>
            <button
              onClick={() => setCurrentView("profile")}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all font-bold text-xs md:text-sm border ${
                currentView === "profile"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              <UserIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden md:inline">Profile</span>
            </button>
            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-blue-400 p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
            <button
              onClick={onLogout}
              className="text-slate-400 hover:text-red-400 p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Floating Rounded Navigation Box (Goal Box) */}
        <div className="max-w-[1024px] mx-auto px-2 md:px-4 mt-4">
          <nav className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-1 overflow-x-auto scrollbar-hide px-2 py-2">
            {topNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all whitespace-nowrap shrink-0 border ${
                  currentView === item.id
                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-inner"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-transparent"
                }`}
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-xs md:text-sm">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1024px] mx-auto z-10 relative px-4 sm:px-6">
        {children}
      </main>

      {/* Footer Links */}
      <div className="max-w-[1024px] mx-auto mt-12 mb-28 text-center text-sm font-medium flex items-center justify-center gap-4 text-slate-500 dark:text-slate-400">
        <button onClick={() => setCurrentView("privacy")} className="hover:text-blue-500 transition-colors">Privacy Policy</button>
        <span>&bull;</span>
        <button onClick={() => setCurrentView("terms")} className="hover:text-blue-500 transition-colors">Terms</button>
        <span>&bull;</span>
        <button onClick={() => setCurrentView("ai-help")} className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
          <Sparkles className="w-4 h-4" /> AI Help Center
        </button>
      </div>

      {/* Bottom Floating Navigation (Map, Services, Shop) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[400px]">
        <nav className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-blue-500/10 flex items-center justify-between px-2 py-2">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col md:flex-row items-center justify-center flex-1 gap-1 md:gap-2 py-2 md:py-3 rounded-full transition-all border ${
                currentView === item.id
                  ? "bg-blue-500 text-white shadow-lg border-blue-400/50"
                  : "text-slate-400 hover:bg-white/5 hover:text-white border-transparent"
              }`}
            >
              <item.icon className="w-5 h-5 md:w-5 md:h-5" />
              <span className="font-semibold text-[10px] md:text-sm">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Floating AI Help Center Button */}
      {currentView !== "ai-help" && (
        <button
          onClick={() => setCurrentView("ai-help")}
          className="fixed bottom-[100px] md:bottom-8 right-4 md:right-8 z-50 bg-indigo-500 text-white rounded-full px-4 py-3 shadow-xl shadow-indigo-500/30 flex items-center gap-2 hover:bg-indigo-600 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-indigo-400 border border-white/10 group"
          title="AI Help Center"
        >
          <div className="bg-white/20 p-1 rounded-full">
            <Bot className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="font-bold text-sm md:text-base pr-1">Help Center</span>
        </button>
      )}

      {/* SOS Modal */}
      <AnimatePresence>
        {sosStage !== "idle" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-sm"
          >
            {sosStage === "confirm" ? (
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-slate-900 border border-red-500/30 p-8 rounded-3xl max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                   <button onClick={cancelSOS} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                   </button>
                </div>
                <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Confirm SOS</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
                  Press and hold the button below for 2 seconds to activate the emergency SOS. This will alert local authorities and your connections.
                </p>
                <div className="flex justify-center mb-4">
                  <button
                    onPointerDown={startHold}
                    onPointerUp={endHold}
                    onPointerLeave={endHold}
                    className="relative w-32 h-32 rounded-full border-4 border-red-100 dark:border-red-900 flex items-center justify-center bg-red-50 dark:bg-red-950/50 outline-none select-none touch-none hover:bg-red-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div 
                      className="absolute inset-0 bg-red-500 rounded-full opacity-50 transition-all pointer-events-none"
                      style={{ transform: `scale(${holdProgress / 100})` }}
                    ></div>
                    <span className="relative z-10 font-bold text-red-600 dark:text-red-400 uppercase tracking-widest pointer-events-none">Hold</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-red-600 border-4 border-red-400 p-8 rounded-3xl max-w-sm w-full shadow-2xl text-center relative overflow-hidden animate-pulse"
              >
                <ShieldAlert className="w-24 h-24 text-white mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white mb-2">SOS ALERT SENT</h2>
                <p className="text-red-100 font-bold mb-8 mt-4">
                  Your location has been shared with local authorities and nearby community leaders. 
                  Help is on the way.
                </p>
                <button 
                  onClick={cancelSOS}
                  className="px-6 py-3 w-full bg-white text-red-600 rounded-full font-black uppercase tracking-widest hover:bg-red-100 transition-colors"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

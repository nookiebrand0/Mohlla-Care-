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
  { id: "dashboard" as ViewState, icon: LayoutGrid, label: "Feeds" },
  { id: "leaderboard" as ViewState, icon: Trophy, label: "Ranking" },
  { id: "shopping" as ViewState, icon: Store, label: "Wallet" },
  { id: "profile" as ViewState, icon: UserIcon, label: "Profile" },
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
    <div className="min-h-screen text-slate-900 dark:text-white relative pb-32 bg-slate-50 dark:bg-black md:pt-[24px]">
      {/* Hide default header unless we need it, we rely on individual views for more immersive look */}
      {(currentView === 'home' || currentView === 'dashboard') && (
        <header className="bg-transparent border-none w-full z-40 relative px-4 pt-4 pb-2">
          <div className="max-w-[1024px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white font-bold text-xl tracking-tight shrink-0">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-orange-500 shadow-md">
                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center"><UserIcon className="w-4 h-4 text-slate-500" /></div>}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black leading-tight">Hi, {user.name?.split(' ')[0] || 'User'}!</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Welcome back</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={triggerSOS}
                className="flex items-center justify-center w-9 h-9 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 rounded-full shadow-sm hover:scale-105 transition-transform"
              >
                <ShieldAlert className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('notifications' as any)}
                className="relative flex items-center justify-center w-9 h-9 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full shadow-sm border border-slate-100 dark:border-white/5 hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="max-w-[1024px] mx-auto z-10 relative">
        {children}
      </main>

      {/* Bottom Floating Navigation */ }
      <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
        <div className="w-full max-w-md mx-auto pointer-events-auto relative">
          
          {/* Main Bar with true physical cutout using CSS mask */}
          <div 
            className="absolute bottom-0 w-full h-[70px] bg-white dark:bg-[#1E1F2A] rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
            style={{
              // This creates a circular cutout at the top-center
              WebkitMaskImage: 'radial-gradient(circle at 50% 0px, transparent 40px, black 41px)',
              maskImage: 'radial-gradient(circle at 50% 0px, transparent 40px, black 41px)',
              borderTop: '1px solid rgba(255,255,255,0.05)'
            }}
          >
             {/* Left Section */}
             <div className="absolute top-0 left-0 h-full flex w-[40%] justify-between px-6 items-center">
                <button 
                  onClick={() => setCurrentView("dashboard")} 
                  className={`flex flex-col items-center gap-1 w-12 transition-colors ${currentView === 'dashboard' ? 'text-orange-500' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  <LayoutGrid className="w-6 h-6" strokeWidth={currentView === 'dashboard' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold">Problems</span>
                </button>
                <button 
                  onClick={() => setCurrentView("leaderboard")} 
                  className={`flex flex-col items-center gap-1 w-12 transition-colors ${currentView === 'leaderboard' ? 'text-orange-500' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  <Trophy className="w-6 h-6" strokeWidth={currentView === 'leaderboard' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold">Ranking</span>
                </button>
             </div>

             {/* Right Section */}
             <div className="absolute top-0 right-0 h-full flex w-[40%] justify-between px-6 items-center">
                <button 
                  onClick={() => setCurrentView("shopping")} 
                  className={`flex flex-col items-center gap-1 w-12 transition-colors ${currentView === 'shopping' ? 'text-orange-500' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  <Store className="w-6 h-6" strokeWidth={currentView === 'shopping' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold">Shop</span>
                </button>
                <button 
                  onClick={() => setCurrentView("profile")} 
                  className={`flex flex-col items-center gap-1 w-12 transition-colors ${currentView === 'profile' ? 'text-orange-500' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  <UserIcon className="w-6 h-6" strokeWidth={currentView === 'profile' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold">Profile</span>
                </button>
             </div>
          </div>

          {/* Floating Center Button, perfectly aligned inside the cutout */}
          <button 
            onClick={() => setCurrentView("home")}
            className={`absolute left-1/2 bottom-[30px] -translate-x-1/2 w-[64px] h-[64px] rounded-full flex items-center justify-center transition-transform active:scale-95 z-20 
              shadow-[0_10px_20px_rgba(249,115,22,0.3)]
              ${currentView === 'home' ? 'bg-orange-500 text-white' : 'bg-slate-800 dark:bg-slate-700 text-white'}`}
          >
             <HomeIcon className="w-7 h-7" strokeWidth={2.5} />
          </button>
          
          {/* Invisible spacer to maintain layout flow if needed, though this is absolute */}
          <div className="h-[70px] w-full"></div>
        </div>
      </div>

      {/* Floating AI Help Center Button */}
      {currentView !== "ai-help" && (
        <button
          onClick={() => setCurrentView("ai-help")}
          className="fixed bottom-[90px] right-4 z-40 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full w-12 h-12 shadow-xl flex items-center justify-center hover:scale-105 transition-all outline-none border border-white/10 group"
          title="AI Help Center"
        >
          <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
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

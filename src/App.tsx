/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { ReportIssue } from "./components/ReportIssue";
import { Directory } from "./components/Directory";
import { LocalMap } from "./components/LocalMap";
import { Shopping } from "./components/Shopping";
import { Leaderboard } from "./components/Leaderboard";
import { AppLayout } from "./components/AppLayout";
import { ServiceMarketplace } from "./components/ServiceMarketplace";
import { JobBoard } from "./components/JobBoard";
import { CommunityForum } from "./components/CommunityForum";
import { UserProfile } from "./components/UserProfile";
import { AdminPanel } from "./components/AdminPanel";
import { Home } from "./components/Home";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/Terms";
import { AIHelpCenter } from "./components/AIHelp";
import { User, Issue, ViewState } from "./types";
import { store, useStore } from "./store";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function ModeSelector({
  onSelect,
}: {
  onSelect: (mode: "user" | "admin") => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1590050752104-585c57222f28?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      ></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-3xl max-w-sm w-full space-y-6 shadow-2xl relative z-10"
      >
        <h1 className="text-3xl font-black text-white text-center drop-shadow-md">
          Choose Portal
        </h1>
        <p className="text-orange-100 text-center text-sm mb-6">
          Welcome to Habibpura Connect
        </p>
        <div className="space-y-4">
          <button
            onClick={() => onSelect("user")}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 border border-orange-400/50 rounded-2xl font-bold text-white shadow-lg shadow-orange-500/20 flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-2xl">👤</span>
            <span>User Portal</span>
          </button>
          <button
            onClick={() => onSelect("admin")}
            className="w-full py-4 bg-slate-900/80 hover:bg-slate-800 border border-white/10 rounded-2xl font-bold text-white shadow-lg flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-2xl">🛡️</span>
            <span>Admin Portal</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [appMode, setAppMode] = useState<"user" | "admin" | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>("login");
  const globalState = useStore();
  const [showWelcome, setShowWelcome] = useState(false);
  const [rewardMessage, setRewardMessage] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Find existing user in store or create baser user
        // We'll rely on the subscription to give us updated users, but for now instantiate
        const loggedInUser: User = {
          id: authUser.uid,
          name: authUser.displayName || "User",
          role: "user",
          isVerified: true,
          phone: authUser.phoneNumber || "",
          area: "",
          points: 0,
        };
        setUser(loggedInUser);
        setCurrentView("home");
        
        // Check if phone number is missing
        if (!authUser.phoneNumber) {
          // If we synced correctly from Firestore we'd know from `globalState.users`, 
          // but we'll show the prompt if it's missing in local state. We check `globalState` below.
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Update user once users list is populated if their phone is missing
  useEffect(() => {
    if (user && !authLoading) {
      // Find the robust user object (assuming store syncs it if we fetch it, wait we don't sync users collection in store currently)
      // Actually, if user.phone is empty, let's show the prompt
      if (!user.phone) {
        setShowPhonePrompt(true);
      } else {
        setShowPhonePrompt(false);
      }
    }
  }, [user, authLoading]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim() && user) {
      store.updateUser(user.id, { phone: phoneNumber.trim() });
      setUser({ ...user, phone: phoneNumber.trim() });
      setShowPhonePrompt(false);
      handleRewardPoints(10, "verifying phone number");
    }
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView("home");
    store.createUser(loggedInUser);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
          )
            .then((res) => res.json())
            .then((data) => {
              const area =
                data.address.suburb ||
                data.address.neighbourhood ||
                data.address.city_district ||
                data.address.city ||
                "Found your location";
              setUser((prev) => (prev ? { ...prev, area } : prev));
              // Note: Ideally store.updateUser({ area }) here
            })
            .catch(() => {
              setUser((prev) =>
                prev ? { ...prev, area: "Location Detected" } : prev,
              );
            });
        },
        (error) => {
          console.log("Error getting location", error);
        },
      );
    }

    setTimeout(() => {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 3000);
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("login");
  };

  const handleReportIssue = (
    newIssueData: Omit<Issue, "id" | "createdAt" | "status" | "upvotes">,
  ) => {
    const newIssue: Issue = {
      ...newIssueData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: "reported",
      upvotes: 1,
      isUpvoted: true, // Auto upvote own issue
    };

    store.addIssue(newIssue);
    setCurrentView("dashboard");
  };

  const handleUpvote = (issueId: string) => {
    const issue = globalState.issues.find(i => i.id === issueId);
    if (!issue) return;
    
    const isCurrentlyUpvoted = issue.isUpvoted;
    store.updateIssue(issueId, {
      isUpvoted: !isCurrentlyUpvoted,
      upvotes: issue.upvotes + (isCurrentlyUpvoted ? -1 : 1),
    });
  };

  const handleRewardPoints = (amount: number, reason: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const newPoints = (prev.points || 0) + amount;
      store.updateUser(prev.id, { points: newPoints });
      return { ...prev, points: Math.max(0, newPoints) };
    });
    setRewardMessage(`You earned ${amount} points for ${reason}!`);
    setTimeout(() => setRewardMessage(null), 3000);
  };

  if (!appMode) {
    return <ModeSelector onSelect={setAppMode} />;
  }

  // Admin App
  if (appMode === "admin") {
    return (
      <div className="font-sans text-white bg-slate-900 min-h-screen">
        <header className="bg-slate-950 p-4 border-b border-white/10 flex items-center justify-between">
          <div className="font-bold text-xl flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              🛡️
            </span>
            Admin Portal
          </div>
          <button
            onClick={() => setAppMode(null)}
            className="text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-white/5 text-sm font-semibold"
          >
            Exit Admin
          </button>
        </header>
        <main className="p-4 md:p-8 max-w-[1200px] mx-auto">
          <AdminPanel />
        </main>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <Home onNavigate={setCurrentView} />;
      case "dashboard":
        return (
          <Dashboard
            user={user!}
            issues={globalState.issues}
            onReportNew={() => setCurrentView("report")}
            onUpvote={handleUpvote}
          />
        );
      case "directory":
        return (
          <Directory
            onReward={() => handleRewardPoints(50, "calling a contact")}
          />
        );
      case "map":
        return <LocalMap />;
      case "shopping":
        return <Shopping />;
      case "leaderboard":
        return <Leaderboard />;
      case "services":
        return (
          <ServiceMarketplace
            onReward={() => handleRewardPoints(50, "booking a service")}
          />
        );
      case "jobs":
        return (
          <JobBoard onReward={() => handleRewardPoints(100, "posting a job")} />
        );
      case "community":
        return (
          <CommunityForum
            onReward={() => handleRewardPoints(10, "posting in community")}
          />
        );
      case "profile":
        return <UserProfile user={user!} onLogout={handleLogout} />;
      case "privacy":
        return <PrivacyPolicy />;
      case "terms":
        return <TermsOfService />;
      case "ai-help":
        return <AIHelpCenter />;
      default:
        return null;
    }
  };

  return (
    <div className="font-sans text-white overflow-x-hidden min-h-screen relative app-background">
      {!user ? (
        <>
          <div className="fixed w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -top-40 -left-20 pointer-events-none" />
          <div className="fixed w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] bottom-0 -right-20 pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <LoginScreen onLogin={handleLogin} />
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <AnimatePresence mode="wait">
          {currentView === "report" ? (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full absolute top-0 left-0 min-h-screen z-50 bg-slate-900/90 backdrop-blur-3xl"
            >
              <ReportIssue
                user={user}
                onBack={() => setCurrentView("dashboard")}
                onSubmit={handleReportIssue}
              />
            </motion.div>
          ) : (
            <AppLayout
              currentView={currentView}
              setCurrentView={setCurrentView}
              user={user}
              onLogout={handleLogout}
            >
              <motion.div
                key={currentView}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AppLayout>
          )}
        </AnimatePresence>
      )}

      {/* Styled Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-2xl border border-white/20 text-center min-w-[280px]"
          >
            <h2 className="text-xl font-bold text-white mb-1">
              Welcome to {user?.area || "Habibpura"}!
            </h2>
            <p className="text-orange-100 text-sm">We are glad you are here.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone Number Prompt */}
      <AnimatePresence>
        {showPhonePrompt && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Connect Your Phone</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                Please add your phone number so service providers and helpers can easily contact you. You only need to do this once.
              </p>
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 "
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!phoneNumber.trim()}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                >
                  Verify Number
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reward Toast */}
      <AnimatePresence>
        {rewardMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[150] px-6 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-2xl border border-white/20 text-center w-[90%] max-w-[320px]"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🪙</span>
              <p className="text-white font-bold text-sm">{rewardMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Fingerprint, MapPin, Sparkles } from "lucide-react";
import { User } from "../types";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onLogin({
        id: user.uid,
        name: user.displayName || "Citizen",
        phone: user.phoneNumber || "No phone linked",
        area: "",
        role: "user",
        points: 0,
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to login via Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Left side: Premium Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1705886561214-61614210cdba?q=80&w=2070)",
            backgroundPosition: "top center"
          }}
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-tr from-indigo-900/90 via-indigo-900/40 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 p-16 flex flex-col h-full justify-between w-full">
          <div>
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-6 shadow-2xl">
              <MapPin className="w-8 h-8 text-indigo-400" />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 font-sans"
            >
              Empower your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                local community
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-indigo-100/80 max-w-lg font-medium"
            >
              Connect with neighbors, report issues directly, and build a
              better, safer neighborhood together.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6 mt-12"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex-1 shadow-2xl">
              <div className="text-4xl font-bold text-white mb-2 tracking-tight">
                10k+
              </div>
              <div className="text-indigo-200 text-sm font-medium">
                Active Citizens
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex-1 shadow-2xl">
              <div className="text-4xl font-bold text-white mb-2 tracking-tight">
                95%
              </div>
              <div className="text-indigo-200 text-sm font-medium">
                Issue Resolution
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-white/5 shadow-xl">
              <MapPin className="w-8 h-8 text-indigo-500" />
            </div>
          </div>

          <div className="text-center lg:text-left mb-10 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Welcome back
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Sign in to your account to continue
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group relative w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-slate-700 dark:text-slate-200 font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
            {/* Focus ring */}
            <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-focus:ring-indigo-500 transition-colors pointer-events-none"></div>
          </button>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg text-center border border-red-100 dark:border-red-500/20"
            >
              {error}
            </motion.div>
          )}

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Secure, simple, and standard access.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

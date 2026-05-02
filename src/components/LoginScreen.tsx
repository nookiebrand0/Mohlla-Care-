import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Loader2 } from "lucide-react";
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
        points: 0
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to login via Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="z-10 w-full max-w-[900px] flex flex-col md:flex-row gap-8 items-stretch justify-center">
        {/* Always render recaptcha container but hidden */}
        <div id="recaptcha-container" className="hidden"></div>
        {/* Left Side Info */}
        <div className="flex-1 flex-col justify-center pr-8 hidden md:flex">
          <div className="mb-8">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/40">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Habibpura <span className="text-blue-400">Connect</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed">
              Apne mohalle ki har samasya ka turant samadhan payein. Sadak, pani
              ya bijli — report karein aur status check karein.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
              <div className="text-blue-400 font-bold text-2xl">1,240+</div>
              <div className="text-slate-400 text-sm">Problems Solved</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
              <div className="text-green-400 font-bold text-2xl">45 min</div>
              <div className="text-slate-400 text-sm">Avg. Response</div>
            </div>
          </div>
        </div>

        {/* Right Side Login form */}
        <div className="w-[400px] max-w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-8 md:p-10 flex flex-col justify-center shadow-2xl relative">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-semibold mb-2">Login</h2>
            <p className="text-slate-300">Sign in securely with Google</p>
          </div>

          <div className="w-full">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold py-4 rounded-xl shadow-lg transition-all text-lg mt-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
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
            </button>
            {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
          </div>

          <div className="mt-12 flex justify-center md:justify-start gap-4 text-xs text-slate-500 uppercase tracking-tighter">
            <span className="cursor-pointer hover:text-slate-300 transition-colors">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="cursor-pointer hover:text-slate-300 transition-colors">
              Help Center
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

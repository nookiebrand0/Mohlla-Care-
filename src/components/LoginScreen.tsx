import React, { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Fingerprint, MapPin, User as UserIcon, Lock, Users } from "lucide-react";
import { User } from "../types";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false);

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
        role: user.email === 'nookiebrand0@gmail.com' ? "admin" : "user",
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
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-black w-full overflow-hidden">
      {/* Mobile-sized container simulating the app screen */}
      <div className="w-full max-w-md bg-[#5B75EE] min-h-screen relative flex flex-col items-center shadow-2xl relative overflow-hidden">
        
        {/* Top White Area with curved bottom */}
        <div className="w-full bg-white relative pt-16 pb-24 flex flex-col items-center shadow-sm z-10 hidden-overflow">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 rounded-b-[60px]">
            {/* Background decorations for the white area */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-20 -left-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* 3D Illustration / Icon representing the community */}
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ type: "spring", bounce: 0.5 }}
               className="w-48 h-48 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-full flex flex-col items-center justify-center p-6 mb-4 shadow-inner border border-indigo-50 relative"
            >
               <div className="absolute inset-0 bg-white/20 rounded-full blur-[2px]"></div>
               <Users className="w-24 h-24 text-indigo-500 relative z-10 shrink-0" strokeWidth={1.5} />
               <div className="w-full flex justify-center gap-2 mt-2 relative z-10">
                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                 <div className="w-4 h-4 rounded-full bg-emerald-400"></div>
                 <div className="w-3 h-3 rounded-full bg-rose-400"></div>
               </div>
            </motion.div>
          </div>

          {/* Curved SVG to ensure smooth drop */}
          <svg className="absolute bottom-[-1px] left-0 w-full h-12 text-[#5B75EE]" preserveAspectRatio="none" viewBox="0 0 1440 120" fill="currentColor">
            <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
          </svg>
        </div>

        {/* Content Area */}
        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="flex-1 w-full px-8 pt-8 flex flex-col items-center z-20 relative text-center"
        >
           <h2 className="text-white text-3xl font-bold mb-2 tracking-wide font-sans">
             {isRegister ? 'Register' : 'Welcome Back'}
           </h2>
           <p className="text-indigo-100 text-sm mb-8 font-medium">
             {isRegister ? 'Create your account' : 'Login to your account'}
           </p>

           {/* Form Inputs (UI Only - Google Auth is used behind the scenes) */}
           <div className="w-full space-y-4">
              <div className="w-full bg-[#7B92F2] rounded-full flex items-center px-5 py-3.5 shadow-sm border border-white/10 transition-colors focus-within:bg-[#6c85eb] focus-within:border-white/30">
                 <UserIcon className="w-5 h-5 text-indigo-100 mr-3" />
                 <input 
                    type="text" 
                    placeholder="Username" 
                    className="bg-transparent border-none outline-none text-white placeholder:text-indigo-200/80 w-full font-medium" 
                 />
              </div>

              {isRegister && (
                 <div className="w-full bg-[#7B92F2] rounded-full flex items-center px-5 py-3.5 shadow-sm border border-white/10 transition-colors focus-within:bg-[#6c85eb] focus-within:border-white/30">
                   <div className="w-5 h-5 flex items-center justify-center mr-3">
                     <span className="text-indigo-100 font-bold text-lg">@</span>
                   </div>
                   <input 
                      type="email" 
                      placeholder="Email address" 
                      className="bg-transparent border-none outline-none text-white placeholder:text-indigo-200/80 w-full font-medium" 
                   />
                 </div>
              )}

              <div className="w-full bg-[#7B92F2] rounded-full flex items-center px-5 py-3.5 shadow-sm border border-white/10 transition-colors focus-within:bg-[#6c85eb] focus-within:border-white/30">
                 <Lock className="w-5 h-5 text-indigo-100 mr-3" />
                 <input 
                    type="password" 
                    placeholder="Password" 
                    className="bg-transparent border-none outline-none text-white placeholder:text-indigo-200/80 w-full font-medium" 
                 />
              </div>

              {isRegister && (
                 <div className="w-full bg-[#7B92F2] rounded-full flex items-center px-5 py-3.5 shadow-sm border border-white/10 transition-colors focus-within:bg-[#6c85eb] focus-within:border-white/30">
                   <Lock className="w-5 h-5 text-indigo-100 mr-3" />
                   <input 
                      type="password" 
                      placeholder="Confirm password" 
                      className="bg-transparent border-none outline-none text-white placeholder:text-indigo-200/80 w-full font-medium" 
                   />
                 </div>
              )}

              {!isRegister && (
                <div className="flex items-center justify-between px-2 pt-1 text-xs text-indigo-100">
                   <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                     <input type="checkbox" className="accent-[#1A2C68] w-3.5 h-3.5 rounded-sm" /> 
                     Remember me
                   </label>
                   <a href="#" className="hover:text-white transition-colors">Forgot Password?</a>
                </div>
              )}

              <button 
                 onClick={handleGoogleLogin} 
                 disabled={loading}
                 className="w-full py-4 mt-6 rounded-full bg-[#1A2C68] hover:bg-[#12204c] text-white font-bold tracking-wide flex justify-center items-center shadow-xl shadow-black/10 transition-all active:scale-[0.98]"
              >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isRegister ? 'REGISTER WITH GOOGLE' : 'LOGIN WITH GOOGLE')}
              </button>
           </div>
           
           {error && (
             <div className="mt-4 p-3 bg-red-500/20 text-white text-sm font-medium rounded-xl border border-red-500/30">
               {error}
             </div>
           )}
           
           <div className="mt-6 pb-8 text-indigo-100/90 text-sm">
              {isRegister ? (
                <>Already have an account? <button onClick={() => setIsRegister(false)} className="text-white font-bold cursor-pointer hover:underline">Login</button></>
              ) : (
                <>Don't have an account? <button onClick={() => setIsRegister(true)} className="text-white font-bold cursor-pointer hover:underline">Sign up</button></>
              )}
           </div>
        </motion.div>
      </div>
    </div>
  );
}


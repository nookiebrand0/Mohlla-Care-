import React, { useState } from "react";
import { motion } from "motion/react";
import { User } from "../types";
import {
  User as UserIcon,
  ShieldCheck,
  MapPin,
  Edit3,
  Settings,
  LogOut,
  Check,
  X,
  Share2,
  Copy
} from "lucide-react";

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  onReward?: () => void;
}

export function UserProfile({ user: initialUser, onLogout, onReward }: UserProfileProps) {
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ 
    name: user.name || "", 
    phone: user.phone || "" 
  });

  const handleSave = () => {
    setUser({ ...user, name: editForm.name, phone: editForm.phone });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full pb-16"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Your Profile
        </h2>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center p-1 cursor-pointer" onClick={() => document.getElementById('avatar-upload')?.click()}>
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-900 overflow-hidden relative group">
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-10 h-10 text-white opacity-80" />
              )}
              <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Change</span>
              </div>
            </div>
          </div>
          <input 
            type="file" 
            id="avatar-upload" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                 const reader = new FileReader();
                 reader.onload = (e) => setUser(prev => ({ ...prev, avatar: e.target?.result as string }));
                 reader.readAsDataURL(file);
              }
            }}
          />
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg border-2 border-slate-900 hover:bg-blue-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col items-center w-full max-w-sm gap-3 mt-2 mb-4">
            <input 
              type="text" 
              value={editForm.name} 
              onChange={e => setEditForm({...editForm, name: e.target.value})}
              className="w-full bg-black/50 border border-white/20 text-white rounded-xl px-4 py-3 text-center font-bold text-lg"
              placeholder="Your Name"
            />
            <input 
              type="text" 
              value={editForm.phone} 
              onChange={e => setEditForm({...editForm, phone: e.target.value})}
              className="w-full bg-black/50 border border-white/20 text-blue-400 rounded-xl px-4 py-3 text-center font-semibold"
              placeholder="Phone Number"
            />
            <div className="flex gap-2 w-full mt-2">
              <button 
                onClick={handleSave} 
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-bold transition-all"
              >
                <Check className="w-5 h-5" /> Save
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-bold transition-all"
              >
                <X className="w-5 h-5" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2 mt-2">
              {user.name || "Set Name"}
              <ShieldCheck className="w-5 h-5 text-green-500" />
            </h3>
            <p className="text-slate-400 mt-1">{user.phone}</p>
          </>
        )}

        {!isEditing && (
          <div className="flex items-center gap-2 mt-4 bg-white/5 py-1.5 px-3 rounded-full text-xs font-semibold text-slate-300">
            <MapPin className="w-4 h-4 text-blue-400" />
            {user.area || "Add your area / locality"}
          </div>
        )}

        <div className="w-full mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-3xl font-black text-white">
              {user.points || 0}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">
              Karma Points
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white capitalize">
              {user.role || "User"}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">
              Account Type
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white px-2 mb-4">Refer & Earn</h3>
        <div className="bg-gradient-to-r from-blue-600/80 to-indigo-600/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Share2 className="w-24 h-24 text-white" />
          </div>
          <div className="relative z-10">
            <h4 className="text-white font-bold text-lg mb-1">Invite your neighbors!</h4>
            <p className="text-blue-100 text-sm mb-4">Get 50 points for every person who signs up using your link.</p>
            
            <div className="flex items-center gap-2 mb-4 bg-black/40 p-3 rounded-xl border border-white/10">
              <span className="text-slate-300 font-mono flex-1 select-all" id="referral-code">
                HBBPR-{user.id?.substring(0, 6).toUpperCase() || 'NEW789'}
              </span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`HBBPR-${user.id?.substring(0, 6).toUpperCase() || 'NEW789'}`);
                  alert("Referral code copied!");
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all flex items-center justify-center shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Join Habibpura Community',
                    text: `Use my referral code HBBPR-${user.id?.substring(0, 6).toUpperCase() || 'NEW789'} to get bonus points!`,
                    url: window.location.href,
                  }).then(() => {
                     // Optionally reward them just for sharing
                     if (onReward) onReward();
                  }).catch(console.error);
                } else {
                  // Fallback
                  if (onReward) onReward();
                  alert("Thanks for sharing! (Points awarded)");
                }
              }}
              className="w-full py-3 bg-white hover:bg-slate-100 text-indigo-600 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" /> Share App Link
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white px-2 mb-4">Activity History</h3>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-sm p-2">
          {/* Mock Activity Data - in a real app this would map over filtered store data */}
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Reported Issue: Garbage</div>
              <div className="text-xs text-slate-400">2 days ago • +10 points</div>
            </div>
          </div>
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Called Plumber</div>
              <div className="text-xs text-slate-400">1 week ago</div>
            </div>
          </div>
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Commented on Community</div>
              <div className="text-xs text-slate-400">1 week ago • +20 points</div>
            </div>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Ordered Groceries</div>
              <div className="text-xs text-slate-400">2 weeks ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white px-2 mb-4">Settings</h3>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                <Settings className="w-5 h-5" />
              </div>
              <span className="font-semibold text-white">Toggle Dark Mode</span>
            </div>
          </button>
          
          <div className="h-px bg-white/10 w-full" />
          
          <button
            onClick={() => {
              // Stub for rotation/portrait mode handle just toggles a class or notifies
              alert('Orientation rotation mode changed')
            }}
            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </div>
              <span className="font-semibold text-white">Screen Rotation</span>
            </div>
          </button>

          <div className="h-px bg-white/10 w-full" />
          
          <button
            onClick={onLogout}
            className="w-full p-4 flex items-center justify-between hover:bg-red-500/10 transition-colors group"
          >
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-semibold">Log Out</span>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

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
  Copy,
  Bell,
  Globe,
  Monitor,
  HelpCircle,
  Phone,
  FileText,
  Lock
} from "lucide-react";

import { useStore, store } from "../store";

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  onReward?: () => void;
  onAdminClick?: () => void;
}

export function UserProfile({ user: initialUser, onLogout, onReward, onAdminClick }: UserProfileProps) {
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ 
    name: user.name || "", 
    phone: user.phone || "" 
  });
  
  const state = useStore();
  const userActivities = state.activities?.filter((a: any) => a.userId === user.id).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

  const handleSave = () => {
    store.updateUser(user.id, { name: editForm.name, phone: editForm.phone });
    setUser({ ...user, name: editForm.name, phone: editForm.phone });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-white dark:bg-[#1E1F2A] rounded-[32px] overflow-hidden flex flex-col relative text-slate-900 dark:text-white font-sans"
    >
      {/* Curved Background Header */}
      <div className="absolute top-0 left-0 w-full h-[220px] bg-slate-100 dark:bg-[#2A2B36] rounded-b-[60px] shadow-sm z-0"></div>

      <div className="relative z-10 pt-16 flex flex-col items-center px-6">
         {/* Top Icons */}
         <div className="w-full flex justify-between absolute top-6 px-6">
            <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><Bell className="w-6 h-6" /></button>
            <div className="flex gap-4">
              <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><History className="w-6 h-6" /></button>
              <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><MoreVertical className="w-6 h-6" /></button>
            </div>
         </div>

         {/* Avatar */}
         <div className="relative mb-3 mt-4">
            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-[#1E1F2A] overflow-hidden cursor-pointer" onClick={() => document.getElementById('avatar-upload')?.click()}>
               {user.avatar ? (
                 <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                    <UserIcon className="w-12 h-12 text-orange-500" />
                 </div>
               )}
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
                   reader.onload = (e) => {
                      const avatarStr = e.target?.result as string;
                      setUser(prev => ({ ...prev, avatar: avatarStr }));
                      store.updateUser(user.id, { avatar: avatarStr });
                   };
                   reader.readAsDataURL(file);
                }
              }}
            />
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 bg-white dark:bg-slate-700 text-slate-800 dark:text-white p-1.5 rounded-full shadow-md border-2 border-white dark:border-[#1E1F2A] hover:bg-slate-100 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
         </div>

         {/* Info */}
         {isEditing ? (
           <div className="flex flex-col items-center w-full max-w-sm gap-3 mt-2 mb-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/5">
             <input 
               type="text" 
               value={editForm.name} 
               onChange={e => setEditForm({...editForm, name: e.target.value})}
               className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-center font-bold"
               placeholder="Your Name"
             />
             <input 
               type="text" 
               value={editForm.phone} 
               onChange={e => setEditForm({...editForm, phone: e.target.value})}
               className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 rounded-xl px-4 py-3 text-center"
               placeholder="Phone Number"
             />
             <div className="flex gap-2 w-full mt-2">
               <button 
                 onClick={handleSave} 
                 className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-bold transition-all"
               >
                 Save
               </button>
               <button 
                 onClick={() => setIsEditing(false)} 
                 className="flex-1 flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 hover:dark:bg-slate-600 text-slate-800 dark:text-white px-4 py-3 rounded-xl font-bold transition-all"
               >
                 Cancel
               </button>
             </div>
           </div>
         ) : (
           <div className="text-center mb-6">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center justify-center gap-2">
               {user.name || "Set Name"}
               {user.role === 'admin' && <ShieldCheck className="w-5 h-5 text-green-500" />}
             </h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
               youremail@domain.com | {user.phone || "+01 234 567 89"}
             </p>
           </div>
         )}
      </div>

      <div className="flex-1 px-6 pb-32 relative z-10 w-full max-w-md mx-auto">
         {/* Top Section Settings */}
         <div className="bg-white dark:bg-[#15161C] rounded-[24px] overflow-hidden shadow-sm border border-slate-100 dark:border-white/5 mb-4">
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                 <UserIcon className="w-5 h-5 text-slate-400" />
                 <span className="font-semibold text-sm">Edit profile information</span>
              </div>
            </button>
            <div className="w-[calc(100%-40px)] mx-auto h-[1px] bg-slate-100 dark:bg-white/5"></div>
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                 <Bell className="w-5 h-5 text-slate-400" />
                 <span className="font-semibold text-sm">Notifications</span>
              </div>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">ON</span>
            </button>
            <div className="w-[calc(100%-40px)] mx-auto h-[1px] bg-slate-100 dark:bg-white/5"></div>
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                 <Globe className="w-5 h-5 text-slate-400" />
                 <span className="font-semibold text-sm">Language</span>
              </div>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">English</span>
            </button>
         </div>

         {/* Middle Section Settings */}
         <div className="bg-white dark:bg-[#15161C] rounded-[24px] overflow-hidden shadow-sm border border-slate-100 dark:border-white/5 mb-4">
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                 <Lock className="w-5 h-5 text-slate-400" />
                 <span className="font-semibold text-sm">Security</span>
              </div>
            </button>
            <div className="w-[calc(100%-40px)] mx-auto h-[1px] bg-slate-100 dark:bg-white/5"></div>
            <button 
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                 <Monitor className="w-5 h-5 text-slate-400" />
                 <span className="font-semibold text-sm">Theme</span>
              </div>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-wider hidden dark:inline">Dark mode</span>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-wider dark:hidden">Light mode</span>
            </button>
         </div>

         {/* Bottom Section Settings */}
         <div className="bg-white dark:bg-[#15161C] rounded-[24px] overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                 <HelpCircle className="w-5 h-5 text-slate-400" />
                 <span className="font-semibold text-sm">Help & Support</span>
              </div>
            </button>
            <div className="w-[calc(100%-40px)] mx-auto h-[1px] bg-slate-100 dark:bg-white/5"></div>
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                 <Phone className="w-5 h-5 text-slate-400" />
                 <span className="font-semibold text-sm">Contact us</span>
              </div>
            </button>
            <div className="w-[calc(100%-40px)] mx-auto h-[1px] bg-slate-100 dark:bg-white/5"></div>
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                 <FileText className="w-5 h-5 text-slate-400" />
                 <span className="font-semibold text-sm">Privacy policy</span>
              </div>
            </button>
         </div>

         <div className="mt-8 mb-4 flex justify-center">
            <button 
              onClick={onLogout}
              className="text-red-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-500/10 px-6 py-3 rounded-full transition-colors"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
         </div>
      </div>
    </motion.div>
  );
}

function History({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MoreVertical({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  );
}

import React from "react";
import { motion } from "motion/react";
import { Bell, Heart, ShieldAlert, CheckCircle2 } from "lucide-react";

export function Notifications() {
  const notifications = [
    { id: 1, title: "Issue Resolved", message: "The water leak you reported has been fixed.", time: "2 hours ago", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
    { id: 2, title: "Community Alert", message: "Road closure on Main St due to construction tomorrow.", time: "5 hours ago", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
    { id: 3, title: "New Service Added", message: "A new plumber is available in your neighborhood.", time: "1 day ago", icon: Heart, color: "text-blue-500", bg: "bg-blue-500/10" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto w-full"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-indigo-500" />
          Notifications
        </h2>
      </div>

      <div className="space-y-4">
        {notifications.map(note => (
          <div key={note.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex gap-4 shadow-sm">
            <div className={`w-12 h-12 shrink-0 ${note.bg} rounded-full flex items-center justify-center`}>
              <note.icon className={`w-6 h-6 ${note.color}`} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">{note.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{note.message}</p>
              <span className="text-xs text-slate-500 mt-2 block">{note.time}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

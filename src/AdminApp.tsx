import React, { useState } from 'react';
import { AdminPanel } from './components/AdminPanel';

export function AdminApp() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // A very simple visual password check for the admin area, 
  // since this is a preview and we want to isolate it.
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      setError('');
    } else {
      setError('Invalid admin password');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-white/10">
          <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-white rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 font-medium text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-4 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md active:scale-95"
            >
              Enter Admin Panel
            </button>
          </form>
          <div className="mt-6 text-center">
             <a href="/" className="text-slate-500 font-medium hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400">Back to App</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="w-full bg-slate-900 text-white p-4 shadow-md flex justify-between items-center z-50">
        <div className="font-bold text-lg hidden md:block">Mohalla Solve - Admin Workspace</div>
        <div className="font-bold text-lg md:hidden">Admin</div>
        <div className="flex gap-4">
          <a href="/" className="text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">Go to User App</a>
          <button 
            onClick={() => setIsAdminLoggedIn(false)} 
            className="text-red-400 hover:text-red-300 bg-red-400/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="pt-4 h-[calc(100vh-60px)] overflow-y-auto">
        <AdminPanel />
      </div>
    </div>
  );
}

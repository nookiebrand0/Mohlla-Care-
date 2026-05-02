import React from "react";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <ShieldCheck className="w-8 h-8 text-indigo-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
      </div>
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-white/10 p-6 md:p-8 space-y-6 prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Introduction</h2>
        <p>
          Welcome to our privacy policy. This policy explains how we collect, use,
          and protect your personal information when you use our application.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Data We Collect</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Personal Information:</strong> Name, phone number, physical area code.</li>
          <li><strong>Application Data:</strong> Items you buy, sell, your community posts and reported issues.</li>
          <li><strong>Location Information:</strong> For delivering location-specific services.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. How We Use Your Data</h2>
        <p>
          Your data is solely used to provide our community-driven features, ensure
          seamless transactions between service providers and users, and improve 
          safety through verified profiles.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Data Sharing & Security</h2>
        <p>
          We do not sell your personal data. We share only necessary information 
          (like your name and location) with local service providers and shops you choose to interact with.
        </p>
        
        <p className="text-sm mt-8 border-t border-gray-200 dark:border-white/10 pt-4 text-gray-500 dark:text-slate-400">
          Last updated: May 2026
        </p>
      </div>
    </motion.div>
  );
}

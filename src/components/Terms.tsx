import React from "react";
import { motion } from "motion/react";
import { ScrollText } from "lucide-react";

export function TermsOfService() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <ScrollText className="w-8 h-8 text-indigo-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Terms & Conditions
        </h1>
      </div>
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-white/10 p-6 md:p-8 space-y-6 prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
        <p>
          By accessing and using this application, you accept and agree to be bound by the terms and provisions of this agreement.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. User Accounts</h2>
        <p>
          You are responsible for safeguarding your login credentials. You must be at least 18 years old or operating under parental supervision to act as a service provider.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. User Conduct</h2>
        <p>
          A respectful and safe community is our priority. Users engaging in abusive behavior, fraud, or posting inappropriate content will be permanently banned.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Services & Transactions</h2>
        <p>
          This app acts solely as a connecting platform. We do not guarantee the quality, safety, or legality of the services and items advertised. All agreements are solely between the participating buyer and seller.
        </p>

        <p className="text-sm mt-8 border-t border-gray-200 dark:border-white/10 pt-4 text-gray-500 dark:text-slate-400">
          Last updated: May 2026
        </p>
      </div>
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Warning() {
  return (
    <div className="min-h-screen pt-24 bg-black/90">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-red-500 mb-4">Important Warnings</h1>
          <p className="text-white">Please read these important guidelines and warnings carefully</p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl border border-red-500/20"
          >
            <h2 className="text-2xl font-bold text-red-500 mb-4">Account Usage Guidelines</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">1</span>
                <span>Always disable cloud save and remote play in Steam settings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">2</span>
                <span>If disconnected, use offline mode or Big Picture mode</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">3</span>
                <span>For guarded accounts, wait until unguarded or use a new account</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">4</span>
                <span>Posts will be updated with new accounts for the same game</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl border border-yellow-500/20"
          >
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Technical Limitations</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">!</span>
                <span>Ubisoft, Rockstar, and EA games may have additional protections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">!</span>
                <span>Some games use Denuvo that may prevent access</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">!</span>
                <span>Try again later or use a new account if you encounter issues</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl border border-blue-500/20"
          >
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Account Security</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">🔒</span>
                <span>Never share account credentials with others</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">🔒</span>
                <span>Do not attempt to change account passwords</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">🔒</span>
                <span>Report any issues immediately through proper channels</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl border border-red-500/20"
          >
            <h2 className="text-2xl font-bold text-red-500 mb-4">Legal Disclaimer</h2>
            <p className="text-gray-300">
              We are not responsible for any issues that arise from not following the provided instructions. 
              Users are responsible for following all guidelines and using the service appropriately.
              Any attempt to bypass security measures or misuse accounts will result in immediate termination 
              of access and potential legal consequences.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ImportantInfo() {
  return (
    <div className="min-h-screen pt-24 bg-black">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-4">Important Information</h1>
          <p className="text-white">Please read these important guidelines and warnings carefully</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="glass-effect p-6 rounded-xl border border-red-500/20">
            <div className="flex items-start gap-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-2">Account Usage Guidelines</h3>
                <ul className="space-y-2 text-white">
                  <li>• Disable cloud save and remote play in the steam settings</li>
                  <li>• If the game closes or you get disconnected, enter offline mode on Steam or use Big Picture mode</li>
                  <li>• For guarded accounts, wait until they become unguarded or use a new account</li>
                  <li>• All posts will be updated with new accounts for the same game!</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-yellow-500/20">
            <div className="flex items-start gap-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-yellow-500 mb-2">Technical Limitations</h3>
                <ul className="space-y-2 text-white">
                  <li>• Ubisoft, Rockstar, and EA games may have additional protections</li>
                  <li>• Some games use Denuvo that may prevent access</li>
                  <li>• Try again later or use a new account if you encounter issues</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-red-500/20">
            <div className="flex items-start gap-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-2">Legal Disclaimer</h3>
                <p className="text-white">
                  We are not responsible for any issues that arise from not following the provided instructions. 
                  Users are responsible for following all guidelines and using the service appropriately.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
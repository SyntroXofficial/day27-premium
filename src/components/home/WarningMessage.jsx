import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function WarningMessage() {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-16">
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">🚨 Access Restricted: Log In or Sign Up Required! 🚨</h3>
            <p className="text-gray-300">
              To explore all pages, access premium accounts, and unlock exclusive content, you need to:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>1️⃣ Log In if you're already a member.</li>
              <li>2️⃣ Sign Up to create an account and enjoy everything we offer!</li>
            </ul>
            <p className="text-yellow-400 font-medium">🔒 Your gateway to full access starts here!</p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex gap-4">
                <Link
                  to="/auth"
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 font-semibold rounded-lg border border-yellow-500/50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">
                I am not responsible for anything. Anyone who attempts to bypass any website security measures or related protections will face consequences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
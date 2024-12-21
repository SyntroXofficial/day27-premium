import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import useUserStore from '../../store/userStore';

export default function Profile() {
  const { user } = useAuth();
  const updateUserProfile = useUserStore(state => state.updateUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError('');
      await updateUserProfile(user.id, { profilePic: file });
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-8"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="relative group">
              <label className="cursor-pointer block">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-24 h-24 text-gray-400" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm">
                    {isUploading ? 'Uploading...' : 'Change'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <PencilIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  user.role === 'Owner'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {user.role || 'Member'}
                </span>
                <span className="text-gray-400">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Discord ID
              </label>
              <p className="text-white">{user.discordId}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <p className="text-white">{user.email}</p>
            </div>

            {isEditing && (
              <div className="pt-6 border-t border-gray-700">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
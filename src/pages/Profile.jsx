import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../hooks/useApp';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Modal } from '../components/ui/Modal';
import { MapPin, Briefcase, Calendar, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Profile = () => {
  const { user, updateProfile } = useApp();
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Controlled form state
  const [editForm, setEditForm] = useState({
    name: user.name,
    role: user.role,
    bio: user.bio,
    avatar: user.avatar
  });

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditOpen(false);
  };

  const openEditModal = () => {
    setEditForm({ name: user.name, role: user.role, bio: user.bio, avatar: user.avatar });
    setIsEditOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-20"
    >
      <div className="relative rounded-2xl overflow-hidden h-48 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500">
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      <div className="px-8 flex flex-col md:flex-row gap-6 items-start -mt-16 relative z-10">
        <div className="p-2 bg-dark-950 rounded-full inline-block">
          <Avatar src={user.avatar} size="xl" className="border-4 border-dark-950" />
        </div>
        
        <div className="pt-16 md:pt-20 flex-1 w-full flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-xl text-primary-400 font-medium">{user.role} • Level {user.stats.level}</p>
            {user.bio && <p className="text-gray-300 mt-3">{user.bio}</p>}
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
              <div className="flex items-center gap-1"><Briefcase size={16}/> {user.role}</div>
              <div className="flex items-center gap-1"><MapPin size={16}/> Earth</div>
              <div className="flex items-center gap-1"><Calendar size={16}/> Joined Jan 2026</div>
            </div>
          </div>
          
          <Button variant="secondary" onClick={openEditModal} className="w-full md:w-auto mt-4 md:mt-0">
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award size={20} className="text-accent-400" /> Stats Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-dark-900 rounded-xl">
              <span className="text-gray-400">Total Tasks</span>
              <span className="text-xl font-bold">{user.stats.tasksCompleted}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-900 rounded-xl">
              <span className="text-gray-400">Current Streak</span>
              <span className="text-xl font-bold text-orange-400">{user.stats.streak} Days 🔥</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-900 rounded-xl">
              <span className="text-gray-400">Group Rank</span>
              <span className="text-xl font-bold text-primary-400">#{user.stats.groupRank}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award size={20} className="text-yellow-400" /> Achievements ({user.achievements.length})
          </h2>
          <div className="space-y-4">
            {user.achievements.map((ach) => (
              <div key={ach.id} className="flex items-start gap-4 p-3 bg-dark-900/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-2xl shadow-inner">
                  {ach.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{ach.name}</h3>
                  <p className="text-sm text-gray-400">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Profile">
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
            <input 
              name="name"
              required
              type="text" 
              value={editForm.name} 
              onChange={handleEditChange}
              className="w-full bg-dark-800 border border-white/10 focus:border-primary-500 rounded-xl px-4 py-2 text-sm outline-none text-white" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Role / Track</label>
            <input 
              name="role"
              required
              type="text" 
              value={editForm.role} 
              onChange={handleEditChange}
              className="w-full bg-dark-800 border border-white/10 focus:border-primary-500 rounded-xl px-4 py-2 text-sm outline-none text-white" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Bio</label>
            <textarea 
              name="bio"
              rows={3}
              value={editForm.bio} 
              onChange={handleEditChange}
              className="w-full bg-dark-800 border border-white/10 focus:border-primary-500 rounded-xl px-4 py-2 text-sm outline-none text-white resize-none" 
              placeholder="Tell us about yourself..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Avatar URL (Mock)</label>
            <input 
              name="avatar"
              required
              type="url" 
              value={editForm.avatar} 
              onChange={handleEditChange}
              className="w-full bg-dark-800 border border-white/10 focus:border-primary-500 rounded-xl px-4 py-2 text-sm outline-none text-white" 
            />
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xs text-gray-500">Preview:</span>
              <Avatar src={editForm.avatar} size="sm" />
            </div>
          </div>
          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </form>
      </Modal>

    </motion.div>
  );
};

import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { Avatar } from '../ui/Avatar';
import { motion, AnimatePresence } from 'framer-motion';

export const Topbar = () => {
  const { user, groups, activeGroup, switchGroup } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-16 border-b border-white/5 bg-dark-900/50 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        {/* Context Switcher */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 border border-white/5 transition-colors"
          >
            <span className="text-sm font-bold truncate max-w-[120px]">{activeGroup.name}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-full left-0 mt-2 w-56 bg-dark-900 border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
              >
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Your Groups</div>
                {groups.map(g => (
                  <button
                    key={g.id}
                    onClick={() => { switchGroup(g.id); setDropdownOpen(false); }}
                    className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors text-left"
                  >
                    <span className="text-sm text-gray-200 truncate">{g.name}</span>
                    {g.id === activeGroup.id && <Check size={14} className="text-primary-400 ml-2" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex bg-dark-800 rounded-xl px-3 py-2 items-center w-64 border border-white/5 focus-within:border-primary-500/50 transition-colors">
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search items... (⌘K)" 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full shadow-glow"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-white">{user.name}</div>
            <div className="text-xs text-gray-400">{user.level}</div>
          </div>
          <Avatar src={user.avatar} size="sm" current />
        </div>
      </div>
    </header>
  );
};

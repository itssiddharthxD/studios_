import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { LayoutDashboard, Map, Users, BookOpen, User, Menu, X } from 'lucide-react';

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/roadmap', icon: Map, label: 'Roadmap' },
    { to: '/group', icon: Users, label: 'Group' },
    { to: '/resources', icon: BookOpen, label: 'Resources' },
    { to: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <motion.aside
      initial={{ width: 240 }}
      animate={{ width: expanded ? 240 : 80 }}
      className="hidden md:flex flex-col h-screen bg-dark-900 border-r border-white/5 sticky top-0"
    >
      <div className="p-4 flex items-center justify-between">
        {expanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 shadow-glow flex items-center justify-center">
              <Map size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Studious.</span>
          </motion.div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 ml-auto rounded-lg text-gray-400 hover:text-white hover:bg-dark-800 transition-colors"
        >
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
              isActive
                ? "bg-primary-500/10 text-primary-400 drop-shadow-md"
                : "text-gray-400 hover:text-white hover:bg-dark-800"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary-500/10 rounded-xl border border-primary-500/20"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <link.icon size={22} className="relative z-10" />
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium relative z-10"
                  >
                    {link.label}
                  </motion.span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {expanded && (
        <div className="p-4 m-4 rounded-xl border border-white/5 bg-dark-800/50">
          <div className="text-xs text-gray-400 font-medium mb-1">Group Progress</div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-white">Frontend Pioneers</span>
            <span className="text-xs text-primary-400">68%</span>
          </div>
          <div className="h-1.5 w-full bg-dark-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 rounded-full w-[68%]" />
          </div>
        </div>
      )}
    </motion.aside>
  );
};

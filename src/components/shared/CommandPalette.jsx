import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Map, Users, Settings, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const commands = [
    { id: 1, label: 'Go to Roadmap', icon: Map, route: '/roadmap' },
    { id: 2, label: 'View Group Progress', icon: Users, route: '/group' },
    { id: 3, label: 'Explore Resources', icon: BookOpen, route: '/resources' },
    { id: 4, label: 'Profile Settings', icon: Settings, route: '/profile' }
  ];

  const handleSelect = (route) => {
    navigate(route);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-dark-900 border border-white/10 shadow-2xl rounded-2xl w-full max-w-xl mx-4 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center px-4 py-3 border-b border-white/5">
                <Search size={20} className="text-gray-400" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Type a command or search..." 
                  className="bg-transparent border-none outline-none text-white w-full px-3 text-lg placeholder-gray-500"
                />
                <button 
                  onClick={onClose}
                  className="text-xs bg-dark-800 text-gray-400 px-2 py-1 rounded border border-white/10 uppercase"
                >
                  Esc
                </button>
              </div>
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Suggestions
                </div>
                {commands.map(cmd => (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd.route)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-dark-800 rounded-lg group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                        <cmd.icon size={18} />
                      </div>
                      <span className="font-medium">{cmd.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

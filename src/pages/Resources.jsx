import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../hooks/useApp';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ExternalLink, PlaySquare, FileText, GraduationCap, BookmarkPlus } from 'lucide-react';

export const Resources = () => {
  const { resources } = useApp();

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'YouTube': return <PlaySquare className="text-red-500" size={20} />;
      case 'Docs': return <FileText className="text-blue-400" size={20} />;
      case 'Course': return <GraduationCap className="text-primary-400" size={20} />;
      default: return <ExternalLink className="text-gray-400" size={20} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-8 pb-20"
    >
      <div>
        <h1 className="text-3xl font-bold">Recommended Resources</h1>
        <p className="text-gray-400 mt-2">Curated links to accelerate your learning path.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {resources.map((res, i) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:scale-[1.02] hover:bg-dark-800 transition-all cursor-pointer h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-dark-900 rounded-lg">
                  {getPlatformIcon(res.platform)}
                </div>
                {res.badge && <Badge variant="accent">{res.badge}</Badge>}
              </div>
              
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{res.title}</h3>
              
              <div className="flex items-center gap-2 mt-auto pt-6">
                <Badge variant="default">{res.difficulty}</Badge>
                <Badge variant="default">{res.platform}</Badge>
                <div className="flex-1" />
                <button className="p-2 text-gray-400 hover:text-white bg-dark-900 hover:bg-dark-700 rounded-lg transition-colors">
                  <BookmarkPlus size={18} />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

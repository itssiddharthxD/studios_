import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const ProgressBar = ({ progress, className, height = 'h-2', trackColor = 'bg-dark-700', fillColor = 'bg-primary-500', animated = true }) => {
  return (
    <div className={cn("w-full rounded-full overflow-hidden", trackColor, height, className)}>
      {animated ? (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", fillColor)}
        />
      ) : (
        <div 
          className={cn("h-full rounded-full transition-all duration-500", fillColor)}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
};

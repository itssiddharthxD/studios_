import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ children, className, glow = false }) => {
  return (
    <div className={cn(
      "glass-card p-6",
      glow && "shadow-glow",
      className
    )}>
      {children}
    </div>
  );
};

import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: "bg-dark-700 text-gray-300 border border-white/10",
    success: "bg-green-500/10 text-green-400 border border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    primary: "bg-primary-500/10 text-primary-400 border border-primary-500/20",
    accent: "bg-accent-500/10 text-accent-400 border border-accent-500/20",
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

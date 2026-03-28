import React from 'react';
import { cn } from '../../utils/cn';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseClass = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/50";
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-400 text-white shadow-glow px-4 py-2",
    secondary: "bg-dark-700 hover:bg-dark-600 text-white px-4 py-2",
    ghost: "hover:bg-dark-700 text-gray-300 hover:text-white px-4 py-2",
    gradient: "bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90 text-white px-4 py-2",
    icon: "p-2 hover:bg-dark-700 text-gray-400 hover:text-white rounded-lg"
  };

  return (
    <button className={cn(baseClass, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

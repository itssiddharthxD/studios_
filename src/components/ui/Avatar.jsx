import React from 'react';
import { cn } from '../../utils/cn';

export const Avatar = ({ src, alt, size = 'md', className, current = false }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20"
  };

  return (
    <div className={cn(
      "relative inline-block rounded-full overflow-hidden border-2",
      current ? "border-primary-500 shadow-glow" : "border-dark-700 hover:border-gray-500 transition-colors",
      sizes[size],
      className
    )}>
      <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
    </div>
  );
};

import React from 'react';
import { Crown } from 'lucide-react';

interface CrownIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CrownIcon: React.FC<CrownIconProps> = ({ 
  size = 'sm', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <Crown 
      className={`${sizeClasses[size]} text-yellow-500 ${className}`}
      fill="currentColor"
    />
  );
};

export default CrownIcon;

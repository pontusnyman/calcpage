import React from 'react';

interface AdBannerProps {
  position?: 'top' | 'bottom';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position = 'top', className = '' }) => {
  const stickyClass = position === 'top' 
    ? 'sticky top-24 z-40' 
    : 'sticky bottom-4';
  
  const visibilityClass = position === 'bottom' ? 'lg:hidden' : '';

  return (
    <div className={`max-w-7xl mx-auto my-4 px-4 sm:px-6 lg:px-8 ${visibilityClass} ${className}`}>
      <div className={`bg-gray-200 h-32 rounded-lg flex items-center justify-center ${stickyClass}`}>
        <p className="text-gray-500">Annonsplats</p>
      </div>
    </div>
  );
};

export default AdBanner;


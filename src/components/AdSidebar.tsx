import React from 'react';

interface AdSidebarProps {
  className?: string;
}

const AdSidebar: React.FC<AdSidebarProps> = ({ className = '' }) => {
  return (
    <div className={`hidden lg:block lg:col-span-2 ${className}`}>
      <div className="sticky top-[11rem]">
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Annonsplats</p>
        </div>
      </div>
    </div>
  );
};

export default AdSidebar;


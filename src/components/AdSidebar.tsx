import React, { useEffect, useRef } from 'react';

interface AdSidebarProps {
  className?: string;
  adSlot?: string; // AdSense ad slot ID (e.g., '1234567890')
}

const AdSidebar: React.FC<AdSidebarProps> = ({ className = '', adSlot }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only load ads if user has consented to cookies
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted' && adRef.current && typeof window !== 'undefined') {
      try {
        // Check if AdSense script is loaded
        if ((window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('Error loading AdSense ad:', e);
      }
    }
  }, []);

  // Show placeholder if no consent or no ad slot
  const consent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null;
  const showAd = consent === 'accepted' && adSlot;

  return (
    <div className={`hidden lg:block lg:col-span-2 ${className}`}>
      <div className="sticky top-[11rem]">
        {showAd ? (
          <ins
            ref={adRef}
            className="adsbygoogle block"
            style={{ display: 'block', minHeight: '250px' }}
            data-ad-client="ca-pub-8378245206733631"
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Annonsplats</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSidebar;


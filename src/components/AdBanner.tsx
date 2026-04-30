import React, { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, loadAdSenseScript } from '../lib/adsenseLoader';

interface AdBannerProps {
  position?: 'top' | 'bottom';
  className?: string;
  adSlot?: string; // AdSense ad slot ID (e.g., '1234567890')
}

const AdBanner: React.FC<AdBannerProps> = ({ position = 'top', className = '', adSlot }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const stickyClass = position === 'top' 
    ? 'sticky top-24 z-40' 
    : 'sticky bottom-4';

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent !== 'accepted' || !adRef.current || !adSlot || typeof window === 'undefined') {
      return;
    }
    let cancelled = false;
    loadAdSenseScript()
      .then(() => {
        if (cancelled || !adRef.current) return;
        try {
          ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle =
            (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || []).push({});
        } catch (e) {
          console.error('Error loading AdSense ad:', e);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [adSlot]);

  // Show placeholder if no consent or no ad slot
  const consent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null;
  const showAd = consent === 'accepted' && adSlot;

  return (
    <div className={`max-w-7xl mx-auto my-4 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={`rounded-lg overflow-hidden ${stickyClass}`}>
        {showAd ? (
          <ins
            ref={adRef}
            className="adsbygoogle block"
            style={{ display: 'block', minHeight: '90px' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="bg-gray-200 h-32 flex items-center justify-center">
            <p className="text-gray-500 text-sm">Annonsplats</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdBanner;


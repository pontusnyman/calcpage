import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface UseCalculatorShareOptions {
  params: Record<string, string | number | boolean>;
}

export const useCalculatorShare = ({ params }: UseCalculatorShareOptions) => {
  const location = useLocation();

  const shareUrl = useCallback(() => {
    const shareParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        shareParams.append(key, String(value));
      }
    });

    return `${window.location.origin}${location.pathname}?${shareParams.toString()}`;
  }, [params, location.pathname]);

  const handleShare = useCallback(async () => {
    const url = shareUrl();
    
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (err) {
      console.error('Failed to copy URL:', err);
      return false;
    }
  }, [shareUrl]);

  return {
    shareUrl: shareUrl(),
    handleShare
  };
};


import React from 'react';
import { usePremium } from '../contexts/PremiumContext';
import { Crown } from 'lucide-react';

const PremiumToggle: React.FC = () => {
  const { isPremium, upgradeToPremium, downgradeToFree } = usePremium();

  const togglePremium = () => {
    if (isPremium) {
      downgradeToFree();
    } else {
      upgradeToPremium();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={togglePremium}
        className={`px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-colors ${
          isPremium 
            ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        {isPremium && <Crown className="w-4 h-4" fill="currentColor" />}
        <span className="text-sm font-medium">
          {isPremium ? 'Premium Active' : 'Test Premium'}
        </span>
      </button>
    </div>
  );
};

export default PremiumToggle;

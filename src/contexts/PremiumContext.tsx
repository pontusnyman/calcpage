import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ALL_CALCULATORS } from './FeatureFlagContext';

interface PremiumContextType {
  isPremium: boolean;
  upgradeToPremium: () => void;
  downgradeToFree: () => void;
  isCalculatorPremium: (calculatorId: string) => boolean;
  canAccessCalculator: (calculatorId: string) => boolean;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

interface PremiumProviderProps {
  children: ReactNode;
  initialPremium?: boolean;
}

export const PremiumProvider: React.FC<PremiumProviderProps> = ({ 
  children, 
  initialPremium = false 
}) => {
  const [isPremium, setIsPremium] = useState<boolean>(initialPremium);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  const upgradeToPremium = () => {
    setIsPremium(true);
    setShowUpgradeModal(false);
    // In a real app, this would integrate with payment processing
    console.log('User upgraded to premium!');
  };

  const downgradeToFree = () => {
    setIsPremium(false);
    // In a real app, this would handle subscription cancellation
    console.log('User downgraded to free!');
  };

  const isCalculatorPremium = (calculatorId: string): boolean => {
    const calculator = ALL_CALCULATORS.find(calc => calc.id === calculatorId);
    return calculator?.premium ?? false;
  };

  const canAccessCalculator = (calculatorId: string): boolean => {
    // If calculator is not premium, always allow access
    if (!isCalculatorPremium(calculatorId)) {
      return true;
    }
    // If calculator is premium, check if user has premium access
    return isPremium;
  };

  return (
    <PremiumContext.Provider value={{
      isPremium,
      upgradeToPremium,
      downgradeToFree,
      isCalculatorPremium,
      canAccessCalculator,
      showUpgradeModal,
      setShowUpgradeModal,
    }}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = (): PremiumContextType => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

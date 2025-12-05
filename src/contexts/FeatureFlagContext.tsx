import React, { createContext, useContext, useState, ReactNode } from 'react';

// List of all calculators with their metadata
export interface CalculatorInfo {
  id: string;
  title: string;
  path: string;
  category: string;
  description: string;
  premium?: boolean;
}

export const ALL_CALCULATORS: CalculatorInfo[] = [
  // Economy
  { id: 'compound-interest', title: 'Ränta på ränta kalkylator', path: '/rantakalkylator', category: 'Ekonomi', description: 'Beräkna hur ditt sparande växer med ränta-på-ränta effekten', premium: false },
  { id: 'loan', title: 'Lånekostnadskalkylator', path: '/lanekalkylator', category: 'Ekonomi', description: 'Beräkna månadskostnad och total kostnad för ditt lån', premium: false },
  { id: 'mortgage', title: 'Bolånekalkylator', path: '/bolanekalkylator', category: 'Ekonomi', description: 'Beräkna månadskostnad och amortering för ditt bolån', premium: false },
  { id: 'vat', title: 'Momskalkylator', path: '/momskalkylator', category: 'Ekonomi', description: 'Räkna ut moms enkelt med vår momskalkylator', premium: false },
  { id: 'crypto-profit', title: 'Krypto Vinst/Förlust', path: '/kryptokalkylator', category: 'Ekonomi', description: 'Beräkna vinst eller förlust på dina kryptoinvesteringar', premium: true },
  { id: 'savings-goal', title: 'Sparmålskalkylator', path: '/sparmalskalkylator', category: 'Ekonomi', description: 'Beräkna hur mycket du behöver spara för att nå ditt mål', premium: false },
  { id: 'car-lease', title: 'Leasing vs Köp', path: '/billeasingkalkylator', category: 'Ekonomi', description: 'Jämför kostnaden för att leasa eller köpa en bil', premium: true },
  { id: 'hourly-rate', title: 'Timtaxekalkylator', path: '/timtaxekalkylator', category: 'Ekonomi', description: 'Beräkna din timtaxa baserat på årslön', premium: true },
  { id: 'discount', title: 'Rabattkalkylator', path: '/rabattkalkylator', category: 'Ekonomi', description: 'Beräkna rabatt och slutpris', premium: false },
  { id: 'energy-savings', title: 'Energikalkylator', path: '/energikalkylator', category: 'Ekonomi', description: 'Beräkna energibesparingar och kostnader', premium: true },
  { id: 'meeting-cost', title: 'Möteskostnadskalkylator', path: '/moteskostnadskalkylator', category: 'Ekonomi', description: 'Beräkna kostnaden för möten', premium: true },

  // Health
  { id: 'bmi', title: 'Beräkna ditt BMI värde', path: '/bmikalkylator', category: 'Hälsa', description: 'Fyll i din längd, vikt för att ta reda på ditt BMI värde', premium: false },
  { id: 'bmr', title: 'BMR Kalkylator', path: '/bmrkalkylator', category: 'Hälsa', description: 'Beräkna din basala ämnesomsättning och dagliga kaloriförbrukning', premium: true },
  { id: 'calorie', title: 'Kaloribehovskalkylator', path: '/kalorikalkylator', category: 'Hälsa', description: 'Beräkna ditt dagliga energibehov baserat på din aktivitetsnivå', premium: false },
  { id: 'weight-reduce', title: 'Viktminskningskalkylator', path: '/viktminskningskalkylator', category: 'Hälsa', description: 'Beräkna ditt dagliga kaloriintag för att nå din målvikt', premium: true },
  { id: 'fasting', title: 'Fastekalkylator', path: '/fastekalkylator', category: 'Hälsa', description: 'Håll koll på din fasta och lär dig om kroppens olika faser', premium: true },
  { id: 'ovulation', title: 'Ägglossningskalkylator', path: '/agglossningskalkylator', category: 'Hälsa', description: 'Beräkna din ägglossning och mest fertila period', premium: true },

  // Lifestyle
  { id: 'sleep', title: 'Sömnkalkylator', path: '/sovkalkylator', category: 'Livsstil', description: 'Beräkna optimal sänggående och uppvakningstid baserat på sömnperioder', premium: false },
  { id: 'alcohol', title: 'Alkoholkalkylator', path: '/alkoholkalkylator', category: 'Livsstil', description: 'Beräkna när alkoholen har försvunnit från blodet', premium: false },
  { id: 'countdown', title: 'Nedräkningskalkylator', path: '/nedrakning', category: 'Livsstil', description: 'Räkna ner till viktiga datum och händelser', premium: false },
  { id: 'age', title: 'Ålderskalkylator', path: '/alderkalkylator', category: 'Livsstil', description: 'Beräkna din exakta ålder i år, månader och dagar', premium: false },
  { id: 'jet-lag', title: 'Jet Lag Planerare', path: '/jetlagkalkylator', category: 'Livsstil', description: 'Minimera effekterna av jet lag med en personlig anpassningsplan', premium: true },
  { id: 'caffeine', title: 'Koffeinkalkylator', path: '/koffeinkalkylator', category: 'Livsstil', description: 'Beräkna koffeinintag och utsöndring', premium: true },

  // Training
  { id: 'running-pace', title: 'Tempokalkylator', path: '/tempokalkylator', category: 'Träning', description: 'Beräkna ditt löptempo och hastighet baserat på distans och tid', premium: false },
  { id: 'race-finish', title: 'Måltidsprediktor', path: '/maltidsprediktor', category: 'Träning', description: 'Beräkna din förväntade måltid baserat på tempo och distans', premium: true },
  { id: 'heart-rate-zones', title: 'Pulszoner Kalkylator', path: '/pulszoner', category: 'Träning', description: 'Beräkna dina optimala pulszoner för effektiv träning', premium: true },

  // Cooking
  { id: 'measurement-converter', title: 'Måttomvandlare', path: '/mattomvandlare', category: 'Matlagning', description: 'Konvertera mellan olika svenska mått för vikt och volym', premium: false },
  { id: 'cup-converter', title: 'Amerikansk måttomvandlare', path: '/kopparkalkylator', category: 'Matlagning', description: 'Konvertera mellan amerikanska mått och deciliter för exakta matlagningsrecept', premium: false },

  // Productivity
  { id: 'deadline', title: 'Deadline Kalkylator', path: '/deadlinekalkylator', category: 'Produktivitet', description: 'Beräkna slutdatum baserat på startdatum och arbetsdagar', premium: true }
];

interface FeatureFlags {
  showCalculators: boolean;
  showCalculatorNavigation: boolean;
  showFooterCalculators: boolean;
  calculatorVisibility: { [calculatorId: string]: boolean };
}

interface FeatureFlagContextType {
  featureFlags: FeatureFlags;
  updateFeatureFlag: (key: keyof FeatureFlags, value: boolean) => void;
  toggleFeatureFlag: (key: keyof FeatureFlags) => void;
  updateCalculatorVisibility: (calculatorId: string, visible: boolean) => void;
  toggleCalculatorVisibility: (calculatorId: string) => void;
  isCalculatorVisible: (calculatorId: string) => boolean;
  getVisibleCalculators: () => CalculatorInfo[];
  getVisibleCalculatorsByCategory: (category: string) => CalculatorInfo[];
}

// Helper function to create default calculator visibility (all true)
const createDefaultCalculatorVisibility = (): { [calculatorId: string]: boolean } => {
  const visibility: { [calculatorId: string]: boolean } = {};
  ALL_CALCULATORS.forEach(calc => {
    visibility[calc.id] = true;
  });
  return visibility;
};

const defaultFeatureFlags: FeatureFlags = {
  showCalculators: true,
  showCalculatorNavigation: true,
  showFooterCalculators: true,
  calculatorVisibility: createDefaultCalculatorVisibility(),
};

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

interface FeatureFlagProviderProps {
  children: ReactNode;
  initialFlags?: Partial<FeatureFlags>;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({ 
  children, 
  initialFlags = {} 
}) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({
    ...defaultFeatureFlags,
    ...initialFlags,
    // Ensure calculatorVisibility is properly merged
    calculatorVisibility: {
      ...defaultFeatureFlags.calculatorVisibility,
      ...(initialFlags.calculatorVisibility || {}),
    },
  });

  const updateFeatureFlag = (key: keyof FeatureFlags, value: boolean) => {
    setFeatureFlags(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleFeatureFlag = (key: keyof FeatureFlags) => {
    setFeatureFlags(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const updateCalculatorVisibility = (calculatorId: string, visible: boolean) => {
    setFeatureFlags(prev => ({
      ...prev,
      calculatorVisibility: {
        ...prev.calculatorVisibility,
        [calculatorId]: visible,
      },
    }));
  };

  const toggleCalculatorVisibility = (calculatorId: string) => {
    setFeatureFlags(prev => ({
      ...prev,
      calculatorVisibility: {
        ...prev.calculatorVisibility,
        [calculatorId]: !prev.calculatorVisibility[calculatorId],
      },
    }));
  };

  const isCalculatorVisible = (calculatorId: string): boolean => {
    return featureFlags.calculatorVisibility[calculatorId] ?? true;
  };

  const getVisibleCalculators = (): CalculatorInfo[] => {
    return ALL_CALCULATORS.filter(calc => isCalculatorVisible(calc.id));
  };

  const getVisibleCalculatorsByCategory = (category: string): CalculatorInfo[] => {
    return ALL_CALCULATORS.filter(calc => 
      calc.category === category && isCalculatorVisible(calc.id)
    );
  };

  return (
    <FeatureFlagContext.Provider value={{
      featureFlags,
      updateFeatureFlag,
      toggleFeatureFlag,
      updateCalculatorVisibility,
      toggleCalculatorVisibility,
      isCalculatorVisible,
      getVisibleCalculators,
      getVisibleCalculatorsByCategory,
    }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};

// Hook for checking specific feature flags
export const useFeatureFlag = (flagName: 'showCalculators' | 'showCalculatorNavigation' | 'showFooterCalculators'): boolean => {
  const { featureFlags } = useFeatureFlags();
  return featureFlags[flagName];
};

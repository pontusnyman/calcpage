import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Moon, Beer, Coffee, Scale, Flame, Target, Timer, TrendingUp, Wallet, Home, Percent, Clock, Heart, Activity, ArrowDownUp, Trophy, Calendar, Plane, Bitcoin, PiggyBank, Car, DollarSign, Zap, Users } from 'lucide-react';
import CalculatorCard from './components/CalculatorCard';
import Layout from './components/Layout';
import TopNav from './components/TopNav';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { FeatureFlagProvider, useFeatureFlag, useFeatureFlags } from './contexts/FeatureFlagContext';
import { PremiumProvider, usePremium } from './contexts/PremiumContext';
import CrownIcon from './components/CrownIcon';
import PremiumAccessControl from './components/PremiumAccessControl';
import PremiumToggle from './components/PremiumToggle';
import AdBanner from './components/AdBanner';
import AdSidebar from './components/AdSidebar';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfService from './pages/TermsOfService';

// Calculator imports
import SleepCalculator from './pages/SleepCalculator';
import AlcoholCalculator from './pages/AlcoholCalculator';
import CupCalculator from './pages/CupCalculator';
import BMICalculator from './pages/BMICalculator';
import CalorieCalculator from './pages/CalorieCalculator';
import WeightReduceCalculator from './pages/WeightReduceCalculator';
import RunningPaceCalculator from './pages/RunningPaceCalculator';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator';
import LoanCalculator from './pages/LoanCalculator';
import MortgageCalculator from './pages/MortgageCalculator';
import VATCalculator from './pages/VATCalculator';
import FastingCalculator from './pages/FastingCalculator';
import OvulationCalculator from './pages/OvulationCalculator';
import BMRCalculator from './pages/BMRCalculator';
import MeasurementConverter from './pages/MeasurementConverter';
import RaceFinishPredictor from './pages/RaceFinishPredictor';
import HeartRateZonesCalculator from './pages/HeartRateZonesCalculator';
import DeadlineCalculator from './pages/DeadlineCalculator';
import JetLagCalculator from './pages/JetLagCalculator';
import CountdownCalculator from './pages/CountdownCalculator';
import AgeCalculator from './pages/AgeCalculator';
import CarLeaseCalculator from './pages/CarLeaseCalculator';
import DiscountCalculator from './pages/DiscountCalculator';
import EnergySavingsCalculator from './pages/EnergySavingsCalculator';
import HourlyRateCalculator from './pages/HourlyRateCalculator';
import MeetingCostCalculator from './pages/MeetingCostCalculator';
import SavingsGoalCalculator from './pages/SavingsGoalCalculator';
import CaffeineCalculator from './pages/CaffeineCalculator';
import CryptoProfitCalculator from './pages/CryptoProfitCalculator';

interface Category {
  id: string;
  title: string;
  calculators: Calculator[];
}

interface Calculator {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

// Mapping from calculator ID to the existing calculator structure
const getCalculatorIcon = (calculatorId: string): React.ReactNode => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'compound-interest': <TrendingUp className="w-12 h-12 text-indigo-600" />,
    'loan': <Wallet className="w-12 h-12 text-indigo-600" />,
    'mortgage': <Home className="w-12 h-12 text-indigo-600" />,
    'vat': <Percent className="w-12 h-12 text-indigo-600" />,
    'crypto-profit': <Bitcoin className="w-12 h-12 text-indigo-600" />,
    'savings-goal': <PiggyBank className="w-12 h-12 text-indigo-600" />,
    'car-lease': <Car className="w-12 h-12 text-indigo-600" />,
    'hourly-rate': <DollarSign className="w-12 h-12 text-indigo-600" />,
    'discount': <Percent className="w-12 h-12 text-indigo-600" />,
    'energy-savings': <Zap className="w-12 h-12 text-indigo-600" />,
    'meeting-cost': <Users className="w-12 h-12 text-indigo-600" />,
    'bmi': <Scale className="w-12 h-12 text-indigo-600" />,
    'bmr': <Activity className="w-12 h-12 text-indigo-600" />,
    'calorie': <Flame className="w-12 h-12 text-indigo-600" />,
    'weight-reduce': <Target className="w-12 h-12 text-indigo-600" />,
    'fasting': <Clock className="w-12 h-12 text-indigo-600" />,
    'ovulation': <Heart className="w-12 h-12 text-indigo-600" />,
    'sleep': <Moon className="w-12 h-12 text-indigo-600" />,
    'alcohol': <Beer className="w-12 h-12 text-indigo-600" />,
    'countdown': <Calendar className="w-12 h-12 text-indigo-600" />,
    'age': <Calendar className="w-12 h-12 text-indigo-600" />,
    'jet-lag': <Plane className="w-12 h-12 text-indigo-600" />,
    'caffeine': <Coffee className="w-12 h-12 text-indigo-600" />,
    'running-pace': <Timer className="w-12 h-12 text-indigo-600" />,
    'race-finish': <Trophy className="w-12 h-12 text-indigo-600" />,
    'heart-rate-zones': <Heart className="w-12 h-12 text-indigo-600" />,
    'measurement-converter': <ArrowDownUp className="w-12 h-12 text-indigo-600" />,
    'cup-converter': <Coffee className="w-12 h-12 text-indigo-600" />,
    'deadline': <Calendar className="w-12 h-12 text-indigo-600" />,
  };
  return iconMap[calculatorId] || <Activity className="w-12 h-12 text-indigo-600" />;
};

// Main page component that uses feature flags
const MainPage: React.FC = () => {
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const showCalculators = useFeatureFlag('showCalculators');
  const { getVisibleCalculatorsByCategory } = useFeatureFlags();
  const { isCalculatorPremium } = usePremium();

  // Create categories dynamically based on visible calculators
  const categoryTitles = ['Ekonomi', 'Hälsa', 'Livsstil', 'Träning', 'Matlagning', 'Produktivitet'];
  const categories: Category[] = categoryTitles
    .map(categoryTitle => {
      const visibleCalculators = getVisibleCalculatorsByCategory(categoryTitle);
      if (visibleCalculators.length === 0) return null;
      
      return {
        id: categoryTitle.toLowerCase(),
        title: categoryTitle,
        calculators: visibleCalculators.map(calc => ({
          id: calc.id,
          icon: getCalculatorIcon(calc.id),
          title: calc.title,
          description: calc.description,
          path: calc.path
        }))
      };
    })
    .filter((category): category is Category => category !== null);

  const scrollToCategory = (categoryId: string) => {
    categoryRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <TopNav
          currentPage="home"
          categories={categories}
          onCategoryClick={scrollToCategory}
          showCalculators={showCalculators}
        />

        <AdBanner position="top" adSlot="YOUR_TOP_BANNER_AD_SLOT_ID" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <AdSidebar adSlot="YOUR_SIDEBAR_AD_SLOT_ID" />

            <div className="lg:col-span-8">
              {showCalculators ? (
                <div className="space-y-12 my-8">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      ref={el => categoryRefs.current[category.id] = el}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.calculators.map((calc, index) => {
                          const isPremium = isCalculatorPremium(calc.id);
                          return (
                            <div key={index} className="relative">
                              <CalculatorCard
                                icon={calc.icon}
                                title={calc.title}
                                description={calc.description}
                                path={calc.path}
                              />
                              {isPremium && (
                                <div className="absolute top-3 right-3">
                                  <CrownIcon size="md" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="my-8 text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Kalkylatorer är för närvarande inte tillgängliga
                  </h2>
                  <p className="text-gray-600">
                    Vi arbetar på att förbättra våra kalkylatorer. Kom tillbaka snart!
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <AdBanner position="bottom" adSlot="YOUR_BOTTOM_BANNER_AD_SLOT_ID" />
      </div>
      {/* <Footer /> */}
    </Layout>
  );
};

function App() {
  const initialFeatureFlags = {
    showCalculators: true,
    showCalculatorNavigation: false,
    showFooterCalculators: true,
    calculatorVisibility: {
      'compound-interest': true,
      'blog': true,
      'loan': false,
      'mortgage': false,
      'vat': false,
      'crypto-profit': false,
      'savings-goal': false,
      'car-lease': false,
      'hourly-rate': false,
      'discount': false,
      'energy-savings': false,
      'meeting-cost': false,
      'bmi': false,
      'bmr': false,
      'calorie': false,
      'weight-reduce': false,
      'fasting': false,
      'ovulation': false,
      'sleep': false,
      'alcohol': false,
      'countdown': false,
      'age': false,
      'jet-lag': false,
      'caffeine': false,
      'running-pace': false,
      'race-finish': false,
      'heart-rate-zones': false,
      'measurement-converter': false,
      'cup-converter': false,
      'deadline': false,
    }
  };

  return (
    <FeatureFlagProvider initialFlags={initialFeatureFlags}>
      <PremiumProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/sovkalkylator" element={<SleepCalculator />} />
          <Route path="/alkoholkalkylator" element={<AlcoholCalculator />} />
          <Route path="/kopparkalkylator" element={<CupCalculator />} />
          <Route path="/bmikalkylator" element={<BMICalculator />} />
          <Route path="/kalorikalkylator" element={<CalorieCalculator />} />
          <Route path="/viktminskningskalkylator" element={<PremiumAccessControl calculatorId="weight-reduce"><WeightReduceCalculator /></PremiumAccessControl>} />
          <Route path="/tempokalkylator" element={<RunningPaceCalculator />} />
          <Route path="/rantakalkylator" element={<PremiumAccessControl calculatorId="compound-interest"><CompoundInterestCalculator /></PremiumAccessControl>} />
          <Route path="/lanekalkylator" element={<LoanCalculator />} />
          <Route path="/bolanekalkylator" element={<MortgageCalculator />} />
          <Route path="/momskalkylator" element={<VATCalculator />} />
          <Route path="/fastekalkylator" element={<PremiumAccessControl calculatorId="fasting"><FastingCalculator /></PremiumAccessControl>} />
          <Route path="/agglossningskalkylator" element={<PremiumAccessControl calculatorId="ovulation"><OvulationCalculator /></PremiumAccessControl>} />
          <Route path="/bmrkalkylator" element={<PremiumAccessControl calculatorId="bmr"><BMRCalculator /></PremiumAccessControl>} />
          <Route path="/mattomvandlare" element={<MeasurementConverter />} />
          <Route path="/maltidsprediktor" element={<PremiumAccessControl calculatorId="race-finish"><RaceFinishPredictor /></PremiumAccessControl>} />
          <Route path="/pulszoner" element={<PremiumAccessControl calculatorId="heart-rate-zones"><HeartRateZonesCalculator /></PremiumAccessControl>} />
          <Route path="/deadlinekalkylator" element={<PremiumAccessControl calculatorId="deadline"><DeadlineCalculator /></PremiumAccessControl>} />
          <Route path="/jetlagkalkylator" element={<PremiumAccessControl calculatorId="jet-lag"><JetLagCalculator /></PremiumAccessControl>} />
          <Route path="/nedrakning" element={<CountdownCalculator />} />
          <Route path="/alderkalkylator" element={<AgeCalculator />} />
          <Route path="/billeasingkalkylator" element={<PremiumAccessControl calculatorId="car-lease"><CarLeaseCalculator /></PremiumAccessControl>} />
          <Route path="/rabattkalkylator" element={<DiscountCalculator />} />
          <Route path="/energikalkylator" element={<PremiumAccessControl calculatorId="energy-savings"><EnergySavingsCalculator /></PremiumAccessControl>} />
          <Route path="/timtaxekalkylator" element={<PremiumAccessControl calculatorId="hourly-rate"><HourlyRateCalculator /></PremiumAccessControl>} />
          <Route path="/moteskostnadskalkylator" element={<PremiumAccessControl calculatorId="meeting-cost"><MeetingCostCalculator /></PremiumAccessControl>} />
          <Route path="/sparmalskalkylator" element={<PremiumAccessControl calculatorId="savings-goal"><SavingsGoalCalculator /></PremiumAccessControl>} />
          <Route path="/koffeinkalkylator" element={<PremiumAccessControl calculatorId="caffeine"><CaffeineCalculator /></PremiumAccessControl>} />
          <Route path="/kryptokalkylator" element={<PremiumAccessControl calculatorId="crypto-profit"><CryptoProfitCalculator /></PremiumAccessControl>} />
          <Route path="/integritetspolicy" element={<PrivacyPolicy />} />
          <Route path="/cookiepolicy" element={<CookiePolicy />} />
          <Route path="/anvandarvillkor" element={<TermsOfService />} />
        </Routes>
        <CookieConsent />
        {!import.meta.env.PROD && <PremiumToggle />}
      </PremiumProvider>
    </FeatureFlagProvider>
  );
}

export default App;
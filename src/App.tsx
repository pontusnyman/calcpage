import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Moon, Beer, Coffee, Scale, Flame, Target, Timer, TrendingUp, Wallet, Home, Percent, Clock, Heart, Activity, ArrowDownUp, Trophy, Calendar, Plane, Bitcoin } from 'lucide-react';
import Footer from './components/Footer';
import CalculatorCard from './components/CalculatorCard';
import Layout from './components/Layout';
import Blog from './pages/Blog';

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
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

function App() {
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories: Category[] = [
    {
      id: 'economy',
      title: 'Ekonomi',
      calculators: [
        {
          icon: <TrendingUp className="w-12 h-12 text-indigo-600" />,
          title: "Ränta på ränta kalkylator",
          description: "Beräkna hur ditt sparande växer med ränta-på-ränta effekten",
          path: "/rantakalkylator"
        },
        {
          icon: <Wallet className="w-12 h-12 text-indigo-600" />,
          title: "Lånekostnadskalkylator",
          description: "Beräkna månadskostnad och total kostnad för ditt lån",
          path: "/lanekalkylator"
        },
        {
          icon: <Home className="w-12 h-12 text-indigo-600" />,
          title: "Bolånekalkylator",
          description: "Beräkna månadskostnad och amortering för ditt bolån",
          path: "/bolanekalkylator"
        },
        {
          icon: <Percent className="w-12 h-12 text-indigo-600" />,
          title: "Momskalkylator",
          description: "Räkna ut moms enkelt med vår momskalkylator",
          path: "/momskalkylator"
        },
        {
          icon: <Bitcoin className="w-12 h-12 text-indigo-600" />,
          title: "Krypto Vinst/Förlust",
          description: "Beräkna vinst eller förlust på dina kryptoinvesteringar",
          path: "/kryptokalkylator"
        }
      ]
    },
    {
      id: 'health',
      title: 'Hälsa',
      calculators: [
        {
          icon: <Scale className="w-12 h-12 text-indigo-600" />,
          title: "Beräkna ditt BMI värde",
          description: "Fyll i din längd, vikt för att ta reda på ditt BMI värde.",
          path: "/bmikalkylator"
        },
        {
          icon: <Activity className="w-12 h-12 text-indigo-600" />,
          title: "BMR Kalkylator",
          description: "Beräkna din basala ämnesomsättning och dagliga kaloriförbrukning",
          path: "/bmrkalkylator"
        },
        {
          icon: <Flame className="w-12 h-12 text-indigo-600" />,
          title: "Kaloribehovskalkylator",
          description: "Beräkna ditt dagliga energibehov baserat på din aktivitetsnivå",
          path: "/kalorikalkylator"
        },
        {
          icon: <Target className="w-12 h-12 text-indigo-600" />,
          title: "Viktminskningskalkylator",
          description: "Beräkna ditt dagliga kaloriintag för att nå din målvikt",
          path: "/viktminskningskalkylator"
        },
        {
          icon: <Clock className="w-12 h-12 text-indigo-600" />,
          title: "Fastekalkylator",
          description: "Håll koll på din fasta och lär dig om kroppens olika faser",
          path: "/fastekalkylator"
        },
        {
          icon: <Heart className="w-12 h-12 text-indigo-600" />,
          title: "Ägglossningskalkylator",
          description: "Beräkna din ägglossning och mest fertila period",
          path: "/agglossningskalkylator"
        }
      ]
    },
    {
      id: 'lifestyle',
      title: 'Livsstil',
      calculators: [
        {
          icon: <Moon className="w-12 h-12 text-indigo-600" />,
          title: "Sömnkalkylator",
          description: "Beräkna optimal sänggående och uppvakningstid baserat på sömnperioder",
          path: "/sovkalkylator"
        },
        {
          icon: <Beer className="w-12 h-12 text-indigo-600" />,
          title: "Alkoholkalkylator",
          description: "Beräkna när alkoholen har försvunnit från blodet",
          path: "/alkoholkalkylator"
        },
        {
          icon: <Calendar className="w-12 h-12 text-indigo-600" />,
          title: "Nedräkningskalkylator",
          description: "Räkna ner till viktiga datum och händelser",
          path: "/nedrakning"
        },
        {
          icon: <Calendar className="w-12 h-12 text-indigo-600" />,
          title: "Ålderskalkylator",
          description: "Beräkna din exakta ålder i år, månader och dagar",
          path: "/alderkalkylator"
        },
        {
          icon: <Plane className="w-12 h-12 text-indigo-600" />,
          title: "Jet Lag Planerare",
          description: "Minimera effekterna av jet lag med en personlig anpassningsplan",
          path: "/jetlagkalkylator"
        }
      ]
    },
    {
      id: 'training',
      title: 'Träning',
      calculators: [
        {
          icon: <Timer className="w-12 h-12 text-indigo-600" />,
          title: "Tempokalkylator",
          description: "Beräkna ditt löptempo och hastighet baserat på distans och tid",
          path: "/tempokalkylator"
        },
        {
          icon: <Trophy className="w-12 h-12 text-indigo-600" />,
          title: "Måltidsprediktor",
          description: "Beräkna din förväntade måltid baserat på tempo och distans",
          path: "/maltidsprediktor"
        },
        {
          icon: <Heart className="w-12 h-12 text-indigo-600" />,
          title: "Pulszoner Kalkylator",
          description: "Beräkna dina optimala pulszoner för effektiv träning",
          path: "/pulszoner"
        }
      ]
    },
    {
      id: 'cooking',
      title: 'Matlagning',
      calculators: [
        {
          icon: <ArrowDownUp className="w-12 h-12 text-indigo-600" />,
          title: "Måttomvandlare",
          description: "Konvertera mellan olika svenska mått för vikt och volym",
          path: "/mattomvandlare"
        },
        {
          icon: <Coffee className="w-12 h-12 text-indigo-600" />,
          title: "Amerikansk måttomvandlare",
          description: "Konvertera mellan amerikanska mått och deciliter för exakta matlagningsrecept",
          path: "/kopparkalkylator"
        }
      ]
    },
    {
      id: 'productivity',
      title: 'Produktivitet',
      calculators: [
        {
          icon: <Calendar className="w-12 h-12 text-indigo-600" />,
          title: "Deadline Kalkylator",
          description: "Beräkna slutdatum baserat på startdatum och arbetsdagar",
          path: "/deadlinekalkylator"
        }
      ]
    }
  ];

  const scrollToCategory = (categoryId: string) => {
    categoryRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-50">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Kalkulatorn.se</h1>
                <div className="flex overflow-x-auto pb-2 -mb-2 space-x-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 whitespace-nowrap"
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <div className="max-w-7xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
              <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center sticky top-24 z-40">
                <p className="text-gray-500">Annonsplats</p>
              </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="hidden lg:block lg:col-span-2">
                  <div className="sticky top-[11rem]">
                    <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Annonsplats</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="space-y-12 my-8">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        ref={el => categoryRefs.current[category.id] = el}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {category.calculators.map((calc, index) => (
                            <CalculatorCard
                              key={index}
                              icon={calc.icon}
                              title={calc.title}
                              description={calc.description}
                              path={calc.path}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block lg:col-span-2">
                  <div className="sticky top-[11rem]">
                    <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Annonsplats</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <div className="lg:hidden max-w-7xl mx-auto my-4 px-4 sm:px-6">
              <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center sticky bottom-4">
                <p className="text-gray-500">Annonsplats</p>
              </div>
            </div>
          </div>
        </Layout>
      } />
      <Route path="/blog" element={<Blog />} />
      <Route path="/sovkalkylator" element={<SleepCalculator />} />
      <Route path="/alkoholkalkylator" element={<AlcoholCalculator />} />
      <Route path="/kopparkalkylator" element={<CupCalculator />} />
      <Route path="/bmikalkylator" element={<BMICalculator />} />
      <Route path="/kalorikalkylator" element={<CalorieCalculator />} />
      <Route path="/viktminskningskalkylator" element={<WeightReduceCalculator />} />
      <Route path="/tempokalkylator" element={<RunningPaceCalculator />} />
      <Route path="/rantakalkylator" element={<CompoundInterestCalculator />} />
      <Route path="/lanekalkylator" element={<LoanCalculator />} />
      <Route path="/bolanekalkylator" element={<MortgageCalculator />} />
      <Route path="/momskalkylator" element={<VATCalculator />} />
      <Route path="/fastekalkylator" element={<FastingCalculator />} />
      <Route path="/agglossningskalkylator" element={<OvulationCalculator />} />
      <Route path="/bmrkalkylator" element={<BMRCalculator />} />
      <Route path="/mattomvandlare" element={<MeasurementConverter />} />
      <Route path="/maltidsprediktor" element={<RaceFinishPredictor />} />
      <Route path="/pulszoner" element={<HeartRateZonesCalculator />} />
      <Route path="/deadlinekalkylator" element={<DeadlineCalculator />} />
      <Route path="/jetlagkalkylator" element={<JetLagCalculator />} />
      <Route path="/nedrakning" element={<CountdownCalculator />} />
      <Route path="/alderkalkylator" element={<AgeCalculator />} />
      <Route path="/billeasingkalkylator" element={<CarLeaseCalculator />} />
      <Route path="/rabattkalkylator" element={<DiscountCalculator />} />
      <Route path="/energikalkylator" element={<EnergySavingsCalculator />} />
      <Route path="/timtaxekalkylator" element={<HourlyRateCalculator />} />
      <Route path="/moteskostnadskalkylator" element={<MeetingCostCalculator />} />
      <Route path="/sparmalskalkylator" element={<SavingsGoalCalculator />} />
      <Route path="/koffeinkalkylator" element={<CaffeineCalculator />} />
      <Route path="/kryptokalkylator" element={<CryptoProfitCalculator />} />
    </Routes>
  );
}

export default App;
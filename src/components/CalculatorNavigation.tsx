import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Moon, Beer, Coffee, Scale, Flame, Target, Timer, TrendingUp, 
  Wallet, Home, Percent, Clock, Heart, Activity, ArrowDownUp, 
  Trophy, Calendar, Users, DollarSign, Zap, Car, PiggyBank, Bitcoin 
} from 'lucide-react';

interface Calculator {
  icon: React.ReactNode;
  title: string;
  path: string;
}

const calculators: Calculator[] = [
  {
    icon: <Calendar />,
    title: "Nedräkningskalkylator",
    path: "/nedrakning"
  },
  {
    icon: <Moon />,
    title: "Sömnkalkylator",
    path: "/sovkalkylator"
  },
  {
    icon: <Beer />,
    title: "Alkoholkalkylator",
    path: "/alkoholkalkylator"
  },
  {
    icon: <Scale />,
    title: "BMI Kalkylator",
    path: "/bmikalkylator"
  },
  {
    icon: <Activity />,
    title: "BMR Kalkylator",
    path: "/bmrkalkylator"
  },
  {
    icon: <Flame />,
    title: "Kalorikalkylator",
    path: "/kalorikalkylator"
  },
  {
    icon: <Target />,
    title: "Viktminskningskalkylator",
    path: "/viktminskningskalkylator"
  },
  {
    icon: <Clock />,
    title: "Fastekalkylator",
    path: "/fastekalkylator"
  },
  {
    icon: <Heart />,
    title: "Ägglossningskalkylator",
    path: "/agglossningskalkylator"
  },
  {
    icon: <Coffee />,
    title: "Koffeinkalkylator",
    path: "/koffeinkalkylator"
  },
  {
    icon: <TrendingUp />,
    title: "Ränta på ränta",
    path: "/rantakalkylator"
  },
  {
    icon: <PiggyBank />,
    title: "Sparmålskalkylator",
    path: "/sparmalskalkylator"
  },
  {
    icon: <Wallet />,
    title: "Lånekalkylator",
    path: "/lanekalkylator"
  },
  {
    icon: <Home />,
    title: "Bolånekalkylator",
    path: "/bolanekalkylator"
  },
  {
    icon: <Car />,
    title: "Leasing vs Köp",
    path: "/billeasingkalkylator"
  },
  {
    icon: <Percent />,
    title: "Momskalkylator",
    path: "/momskalkylator"
  },
  {
    icon: <DollarSign />,
    title: "Timtaxekalkylator",
    path: "/timtaxekalkylator"
  },
  {
    icon: <Percent />,
    title: "Rabattkalkylator",
    path: "/rabattkalkylator"
  },
  {
    icon: <Zap />,
    title: "Energikalkylator",
    path: "/energikalkylator"
  },
  {
    icon: <Timer />,
    title: "Tempokalkylator",
    path: "/tempokalkylator"
  },
  {
    icon: <Trophy />,
    title: "Måltidsprediktor",
    path: "/maltidsprediktor"
  },
  {
    icon: <Heart />,
    title: "Pulszoner",
    path: "/pulszoner"
  },
  {
    icon: <ArrowDownUp />,
    title: "Måttomvandlare",
    path: "/mattomvandlare"
  },
  {
    icon: <Coffee />,
    title: "Amerikansk måttomvandlare",
    path: "/amerikanskomvandlare"
  },
  {
    icon: <Calendar />,
    title: "Deadline Kalkylator",
    path: "/deadlinekalkylator"
  },
  {
    icon: <Users />,
    title: "Möteskostnadskalkylator",
    path: "/moteskostnadskalkylator"
  },
  {
    icon: <Calendar />,
    title: "Ålderskalkylator",
    path: "/alderkalkylator"
  },
  {
    icon: <Bitcoin />,
    title: "Krypto Vinst/Förlust",
    path: "/kryptokalkylator"
  }
];

const CalculatorNavigation: React.FC = () => {
  return (
    <div className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Utforska fler kalkylatorer
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {calculators.map((calc) => (
            <Link
              key={calc.path}
              to={calc.path}
              className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-indigo-600 mr-3">
                {calc.icon}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {calc.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorNavigation;
import React, { useState } from 'react';
import { ArrowLeft, Flame, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { calculatorSEO } from '../seo/calculatorSEO';

interface CalorieResult {
  bmr: number;
  tdee: number;
  activityLevel: string;
}

const CalorieCalculator = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'man' | 'woman'>('man');
  const [activityLevel, setActivityLevel] = useState<number>(1.2);
  const [result, setResult] = useState<CalorieResult | null>(null);

  // Get SEO configuration for Calorie Calculator
  const seo = calculatorSEO['/kalorikalkylator'];

  const activityLevels = [
    { value: 1.2, label: 'Lite till ingen träning', description: 'Stillasittande livsstil' },
    { value: 1.375, label: 'Träning 1-3 dagar/vecka', description: 'Lätt aktiv' },
    { value: 1.55, label: 'Träning 4-5 dagar/vecka', description: 'Måttligt aktiv' },
    { value: 1.725, label: 'Träning 6-7 dagar/vecka', description: 'Mycket aktiv' },
    { value: 1.9, label: 'Träning 2 ggr/dag, tung träning', description: 'Extra aktiv' }
  ];

  const calculateCalories = () => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr = gender === 'man' ? bmr + 5 : bmr - 161;
    
    const tdee = bmr * activityLevel;
    
    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      activityLevel: activityLevels.find(level => level.value === activityLevel)?.label || ''
    });
  };

  return (
    <Layout seo={seo}>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tillbaka till kalkylatorer
          </Link>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Flame className="w-12 h-12 text-orange-500 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Kaloribehovskalkylator</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beräkna ditt dagliga energibehov baserat på din kroppssammansättning och aktivitetsnivå
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vikt (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(1, Math.min(300, Number(e.target.value))))}
                  className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Längd (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Math.max(1, Math.min(300, Number(e.target.value))))}
                  className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ålder (år)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Math.max(1, Math.min(120, Number(e.target.value))))}
                  className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kön
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setGender('man')}
                    className={`py-2 px-4 rounded-lg text-center transition-colors ${
                      gender === 'man'
                        ? 'bg-orange-500 text-white'
                        : 'bg-orange-100 text-gray-700 hover:bg-orange-200'
                    }`}
                  >
                    Man
                  </button>
                  <button
                    onClick={() => setGender('woman')}
                    className={`py-2 px-4 rounded-lg text-center transition-colors ${
                      gender === 'woman'
                        ? 'bg-orange-500 text-white'
                        : 'bg-orange-100 text-gray-700 hover:bg-orange-200'
                    }`}
                  >
                    Kvinna
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Aktivitetsnivå
              </label>
              <div className="space-y-4">
                {activityLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setActivityLevel(level.value)}
                    className={`w-full flex items-center p-4 rounded-lg transition-colors ${
                      activityLevel === level.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-orange-50 text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    <Activity className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{level.label}</div>
                      <div className={`text-sm ${activityLevel === level.value ? 'text-orange-100' : 'text-gray-500'}`}>
                        {level.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateCalories}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna kaloribehov
            </button>

            {result && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="text-orange-600 text-sm font-medium mb-1">Basalmetabolism (BMR)</div>
                  <div className="text-3xl font-bold text-gray-900">{result.bmr} kcal</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Energin din kropp behöver i vila
                  </div>
                </div>

                <div className="bg-orange-500 rounded-xl p-6 text-white">
                  <div className="text-orange-100 text-sm font-medium mb-1">Dagligt energibehov (TDEE)</div>
                  <div className="text-3xl font-bold">{result.tdee} kcal</div>
                  <div className="text-sm text-orange-100 mt-2">
                    Baserat på din aktivitetsnivå: {result.activityLevel}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Om kalkylatorn</h2>
            <p className="text-gray-600 mb-4">
              Kalkylatorn använder Mifflin-St Jeor-ekvationen för att beräkna din basalmetabolism (BMR) och 
              multiplicerar sedan detta med en aktivitetsfaktor för att få ditt totala dagliga energibehov (TDEE).
            </p>
            <p className="text-gray-600">
              Detta är en uppskattning och kan variera beroende på individuella faktorer som kroppssammansättning, 
              genetik och specifika träningsrutiner.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalorieCalculator;
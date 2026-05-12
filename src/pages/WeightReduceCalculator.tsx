import { useState } from 'react';
import { ArrowLeft, Scale, Calendar, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { calculatorSEO } from '../seo/calculatorSEO';

interface WeightResult {
  targetWeight: number;
  daysToTarget: number;
  currentCalories: number;
  targetCalories: number;
  dailyDeficit: number;
  totalWeightLoss: number;
  weeklyWeightLoss: number;
}

const DEFAULT_WEIGHT = 100;
const DEFAULT_HEIGHT = 188;
const DEFAULT_AGE = 39;
const DEFAULT_TARGET_WEIGHT = 88;
const DEFAULT_DAYS_TO_TARGET = 100;

const parseClampedNumber = (
  value: string,
  min: number,
  max: number,
  fallback: number
): number => {
  if (value.trim() === '') return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
};

const WeightReduceCalculator = () => {
  const [weight, setWeight] = useState<string>(String(DEFAULT_WEIGHT));
  const [height, setHeight] = useState<string>(String(DEFAULT_HEIGHT));
  const [age, setAge] = useState<string>(String(DEFAULT_AGE));
  const [gender, setGender] = useState<'man' | 'woman'>('man');
  const [targetWeight, setTargetWeight] = useState<string>(String(DEFAULT_TARGET_WEIGHT));
  const [daysToTarget, setDaysToTarget] = useState<string>(String(DEFAULT_DAYS_TO_TARGET));
  const [activityLevel, setActivityLevel] = useState<number>(1.375);
  const [result, setResult] = useState<WeightResult | null>(null);
  const seo = calculatorSEO['/viktminskningskalkylator'];

  const parsedWeight = parseClampedNumber(weight, 1, 300, DEFAULT_WEIGHT);
  const parsedHeight = parseClampedNumber(height, 1, 300, DEFAULT_HEIGHT);
  const parsedAge = parseClampedNumber(age, 1, 120, DEFAULT_AGE);
  const parsedTargetWeight = parseClampedNumber(targetWeight, 1, 300, DEFAULT_TARGET_WEIGHT);
  const parsedDaysToTarget = parseClampedNumber(daysToTarget, 1, Number.MAX_SAFE_INTEGER, DEFAULT_DAYS_TO_TARGET);

  const activityLevels = [
    { value: 1.2, label: 'Lite till ingen träning', description: 'Stillasittande livsstil' },
    { value: 1.375, label: 'Träning 1-3 dagar/vecka', description: 'Lätt aktiv' },
    { value: 1.55, label: 'Träning 4-5 dagar/vecka', description: 'Måttligt aktiv' },
    { value: 1.725, label: 'Träning 6-7 dagar/vecka', description: 'Mycket aktiv' },
    { value: 1.9, label: 'Träning 2 ggr/dag, tung träning', description: 'Extra aktiv' }
  ];

  const calculateWeightLoss = () => {
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge;
    bmr = gender === 'man' ? bmr + 5 : bmr - 161;
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const currentCalories = Math.round(bmr * activityLevel);
    
    // Calculate required daily deficit
    const totalWeightLoss = parsedWeight - parsedTargetWeight; // kg
    const totalCaloriesNeeded = totalWeightLoss * 7700; // 7700 calories per kg of fat
    const dailyDeficit = Math.round(totalCaloriesNeeded / parsedDaysToTarget);
    
    // Calculate target calories
    const targetCalories = Math.round(currentCalories - dailyDeficit);
    const weeklyWeightLoss = (parsedWeight - parsedTargetWeight) / (parsedDaysToTarget / 7);

    setResult({
      targetWeight: parsedTargetWeight,
      daysToTarget: parsedDaysToTarget,
      currentCalories,
      targetCalories,
      dailyDeficit,
      totalWeightLoss,
      weeklyWeightLoss,
    });
  };

  return (
    <Layout seo={seo}>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tillbaka till kalkylatorer
          </Link>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-12 h-12 text-purple-500 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Viktminskningskalkylator</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beräkna ditt dagliga kaloriintag för att nå din målvikt på ett hälsosamt sätt
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nuvarande vikt (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Målvikt (kg)
                </label>
                <input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Längd (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ålder (år)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
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
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-100 text-gray-700 hover:bg-purple-200'
                    }`}
                  >
                    Man
                  </button>
                  <button
                    onClick={() => setGender('woman')}
                    className={`py-2 px-4 rounded-lg text-center transition-colors ${
                      gender === 'woman'
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-100 text-gray-700 hover:bg-purple-200'
                    }`}
                  >
                    Kvinna
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Antal dagar till mål
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={daysToTarget}
                    onChange={(e) => setDaysToTarget(e.target.value)}
                    className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-50 text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    <Scale className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{level.label}</div>
                      <div className={`text-sm ${activityLevel === level.value ? 'text-purple-100' : 'text-gray-500'}`}>
                        {level.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateWeightLoss}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna viktminskning
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 rounded-xl p-6">
                    <div className="text-purple-600 text-sm font-medium mb-1">Nuvarande dagligt kaloriintag</div>
                    <div className="text-3xl font-bold text-gray-900">{result.currentCalories} kcal</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Baserat på din aktivitetsnivå
                    </div>
                  </div>

                  <div className="bg-purple-500 rounded-xl p-6 text-white">
                    <div className="text-purple-100 text-sm font-medium mb-1">Rekommenderat dagligt kaloriintag</div>
                    <div className="text-3xl font-bold">{result.targetCalories} kcal</div>
                    <div className="text-sm text-purple-100 mt-2">
                      För att nå din målvikt på {result.daysToTarget} dagar
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-gray-500 text-sm">Dagligt underskott</div>
                      <div className="text-2xl font-bold text-purple-600">{result.dailyDeficit} kcal</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Total viktminskning</div>
                      <div className="text-2xl font-bold text-purple-600">{result.totalWeightLoss.toFixed(1)} kg</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Genomsnittlig viktminskning/vecka</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {result.weeklyWeightLoss.toFixed(1)} kg
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Om viktminskning</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                En hälsosam viktminskning bör ligga på 0,5-1 kg per vecka. Ett för stort kaloriunderskott 
                kan leda till näringsbrist och andra hälsoproblem.
              </p>
              <p>
                Kom ihåg att kombinera din viktminskning med regelbunden fysisk aktivitet och en 
                balanserad kost för bästa resultat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WeightReduceCalculator;
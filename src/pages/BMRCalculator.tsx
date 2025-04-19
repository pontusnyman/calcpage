import React, { useState } from 'react';
import { ArrowLeft, Activity, Scale, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BMRResult {
  bmr: number;
  dailyCalories: {
    sedentary: number;
    lightActive: number;
    moderatelyActive: number;
    veryActive: number;
    extraActive: number;
  };
}

const BMRCalculator = () => {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'man' | 'woman'>('man');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [result, setResult] = useState<BMRResult | null>(null);

  const activityLevels = [
    { level: 'sedentary', factor: 1.2, title: 'Stillasittande', description: 'Ingen träning' },
    { level: 'lightActive', factor: 1.375, title: 'Lätt aktiv', description: 'Träning 1-3 ggr/vecka' },
    { level: 'moderatelyActive', factor: 1.55, title: 'Måttligt aktiv', description: 'Träning 3-5 ggr/vecka' },
    { level: 'veryActive', factor: 1.725, title: 'Mycket aktiv', description: 'Träning 6-7 ggr/vecka' },
    { level: 'extraActive', factor: 1.9, title: 'Extra aktiv', description: 'Hård träning 2 ggr/dag' }
  ];

  const calculateBMR = () => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr = gender === 'man' ? bmr + 5 : bmr - 161;

    const dailyCalories = {
      sedentary: Math.round(bmr * 1.2),
      lightActive: Math.round(bmr * 1.375),
      moderatelyActive: Math.round(bmr * 1.55),
      veryActive: Math.round(bmr * 1.725),
      extraActive: Math.round(bmr * 1.9)
    };

    setResult({
      bmr: Math.round(bmr),
      dailyCalories
    });
  };

  const healthTips = [
    {
      title: "Regelbunden motion",
      description: "Ökar din basala ämnesomsättning och hjälper till att bygga muskelmassa"
    },
    {
      title: "Tillräckligt med sömn",
      description: "God sömn är viktigt för en optimal ämnesomsättning"
    },
    {
      title: "Proteinrikt kostintag",
      description: "Protein hjälper till att bevara muskelmassa och ökar ämnesomsättningen"
    },
    {
      title: "Stresshantering",
      description: "Kronisk stress kan påverka din ämnesomsättning negativt"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Activity className="w-12 h-12 text-violet-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">BMR Kalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna din basala ämnesomsättning (BMR) och dagliga kaloriförbrukning
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ålder (år)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Math.max(1, Math.min(120, Number(e.target.value))))}
                className="w-full border-2 border-violet-200 rounded-lg px-4 py-2 focus:border-violet-500 focus:ring-violet-500"
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
                      ? 'bg-violet-500 text-white'
                      : 'bg-violet-100 text-gray-700 hover:bg-violet-200'
                  }`}
                >
                  Man
                </button>
                <button
                  onClick={() => setGender('woman')}
                  className={`py-2 px-4 rounded-lg text-center transition-colors ${
                    gender === 'woman'
                      ? 'bg-violet-500 text-white'
                      : 'bg-violet-100 text-gray-700 hover:bg-violet-200'
                  }`}
                >
                  Kvinna
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vikt (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Math.max(1, Math.min(300, Number(e.target.value))))}
                className="w-full border-2 border-violet-200 rounded-lg px-4 py-2 focus:border-violet-500 focus:ring-violet-500"
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
                className="w-full border-2 border-violet-200 rounded-lg px-4 py-2 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
          </div>

          <button
            onClick={calculateBMR}
            className="w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Beräkna BMR
          </button>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="bg-violet-500 rounded-xl p-6 text-white">
                <div className="text-violet-100 text-sm font-medium mb-1">Din basala ämnesomsättning (BMR)</div>
                <div className="text-3xl font-bold">{result.bmr} kcal/dag</div>
                <div className="text-violet-100 mt-2">
                  Detta är din kaloriförbrukning i vila
                </div>
              </div>

              <div className="bg-violet-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dagligt kaloribehov baserat på aktivitetsnivå
                </h3>
                <div className="space-y-4">
                  {activityLevels.map((level) => (
                    <div key={level.level} className="flex justify-between items-center border-b border-violet-100 pb-4 last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium text-gray-900">{level.title}</div>
                        <div className="text-sm text-gray-500">{level.description}</div>
                      </div>
                      <div className="text-xl font-semibold text-violet-600">
                        {result.dailyCalories[level.level]} kcal
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Scale className="w-6 h-6 mr-2 text-violet-600" />
              Tips för hälsosam ämnesomsättning
            </h2>
            <div className="space-y-4">
              {healthTips.map((tip, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <h3 className="font-medium text-gray-900 mb-1">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-violet-600" />
              Om BMR
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Basal metabolisk rate (BMR) är den mängd energi din kropp förbrukar i vila för att 
                upprätthålla livsviktiga funktioner som andning, blodcirkulation och cellförnyelse.
              </p>
              <p>
                Din BMR påverkas av flera faktorer som ålder, kön, vikt, längd och kroppssammansättning. 
                Muskelmassa ökar din BMR medan fettvävnad har en lägre energiförbrukning.
              </p>
              <p>
                För att få en mer komplett bild av ditt dagliga energibehov multipliceras BMR med en 
                aktivitetsfaktor baserad på din fysiska aktivitetsnivå.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMRCalculator;
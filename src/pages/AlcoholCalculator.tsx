import React, { useState } from 'react';
import { ArrowLeft, Beer, Share2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DrinkType {
  name: string;
  icon: string;
  alcohol: number;
  volume: number;
  count: number;
}

interface CalculationResult {
  bac: number;
  soberDateTime: Date;
  totalGramsAlcohol: number;
}

const AlcoholCalculator = () => {
  const [gender, setGender] = useState<'man' | 'woman'>('man');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(75);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [startHour, setStartHour] = useState('13');
  const [startMinute, setStartMinute] = useState('00');
  const [showResults, setShowResults] = useState(false);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [shareButtonText, setShareButtonText] = useState('Dela');
  
  const [drinks, setDrinks] = useState<DrinkType[]>([
    { name: 'STARKÖL', icon: '🍺', alcohol: 5.2, volume: 33, count: 0 },
    { name: 'VIN', icon: '🍷', alcohol: 12, volume: 15, count: 0 },
    { name: 'SPRIT', icon: '🍸', alcohol: 40, volume: 6, count: 0 },
    { name: 'CIDER', icon: '🍾', alcohol: 5.2, volume: 33, count: 0 },
    { name: 'WHISKY', icon: '🥃', alcohol: 40, volume: 6, count: 0 }
  ]);

  const updateDrinkCount = (index: number, newCount: number) => {
    const newDrinks = [...drinks];
    newDrinks[index] = { ...newDrinks[index], count: Math.max(0, newCount) };
    setDrinks(newDrinks);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setAge(Math.min(Math.max(value, 1), 120));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setWeight(Math.min(Math.max(value, 1), 200));
  };

  const calculateTotalAlcoholGrams = () => {
    return drinks.reduce((total, drink) => {
      const gramsPerDrink = drink.volume * 10 * (drink.alcohol / 100) * 0.789;
      return total + (gramsPerDrink * drink.count);
    }, 0);
  };

  const calculateBAC = (totalGramsAlcohol: number): number => {
    const distributionRatio = gender === 'man' ? 0.68 : 0.55;
    return totalGramsAlcohol / (weight * distributionRatio);
  };

  const calculateSoberDateTime = (bac: number): Date => {
    const startDateTime = new Date(startDate);
    startDateTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
    const hoursToSober = bac / 0.15;
    return new Date(startDateTime.getTime() + (hoursToSober * 60 * 60 * 1000));
  };

  const calculateResult = () => {
    const totalGramsAlcohol = calculateTotalAlcoholGrams();
    const bac = calculateBAC(totalGramsAlcohol);
    const soberDateTime = calculateSoberDateTime(bac);

    setCalculationResult({
      bac,
      soberDateTime,
      totalGramsAlcohol
    });
    setShowResults(true);
  };

  const handleShare = async () => {
    if (!calculationResult) return;

    const shareParams = new URLSearchParams({
      g: gender,
      w: weight.toString(),
      a: age.toString(),
      d: startDate,
      h: startHour,
      m: startMinute,
      dr: drinks.map(d => d.count).join(',')
    });

    const shareUrl = `${window.location.origin}/alkoholkalkulator?${shareParams.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareButtonText('Kopierad!');
      setTimeout(() => setShareButtonText('Dela'), 5000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('g')) {
      setGender(params.get('g') as 'man' | 'woman');
      setWeight(parseInt(params.get('w') || '75'));
      setAge(parseInt(params.get('a') || '25'));
      setStartDate(params.get('d') || new Date().toISOString().split('T')[0]);
      setStartHour(params.get('h') || '13');
      setStartMinute(params.get('m') || '00');
      
      const drinkCounts = (params.get('dr') || '').split(',').map(Number);
      setDrinks(drinks.map((drink, i) => ({
        ...drink,
        count: drinkCounts[i] || 0
      })));

      calculateResult();
    }
  }, []);

  if (showResults && calculationResult) {
    const { bac, soberDateTime } = calculationResult;
    const formattedDateTime = soberDateTime.toLocaleString('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');

    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {bac > 0 ? 'Du är inte nykter' : 'Du är nykter'}
            </h1>
            <p className="text-gray-600">
              Baserat på din input har vi beräknat din alkoholnivå och när du beräknas vara nykter
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-violet-500 rounded-full flex items-center justify-center">
                <Beer className="w-16 h-16 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-violet-50 rounded-xl p-6">
                <div className="text-violet-600 text-sm font-medium mb-1">
                  Beräknad promille
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {bac.toFixed(2)}‰
                </div>
              </div>

              <div className="bg-violet-500 rounded-xl p-6 text-white">
                <div className="text-violet-100 text-sm font-medium mb-1">
                  Nykter cirka
                </div>
                <div className="text-3xl font-bold">
                  {formattedDateTime}
                </div>
              </div>
            </div>

            <div className="bg-violet-50 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-violet-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  Du verkar fortfarande vara påverkad. Det är en väldigt god idé att dröja med att köra bil tills åtminstone <span className="font-semibold">{formattedDateTime}</span> eller gärna något längre för att ta höjd för att inte försätta dig eller någon annan i fara genom att köra onykter.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center">Vill du vara helt säker?</h3>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Se vår rekommenderade alkomätare här
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowResults(false)}
                className="flex-1 bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-600 transition-colors"
              >
                Gå tillbaka
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-600 transition-colors flex items-center justify-center"
              >
                <Share2 className="w-5 h-5 mr-2" />
                {shareButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Beer className="w-12 h-12 text-violet-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Alkoholkalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna när alkoholen har försvunnit från blodet
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {drinks.map((drink, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{drink.icon}</span>
                    <div>
                      <h3 className="font-semibold">{drink.name}</h3>
                      <div className="text-sm text-gray-500">
                        <span>ALKOHOL ({drink.alcohol}%) </span>
                        <span className="mx-2">•</span>
                        <span>MÄNGD ({drink.volume} CL)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateDrinkCount(index, drink.count - 1)}
                      className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 hover:bg-violet-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={drink.count}
                      onChange={(e) => updateDrinkCount(index, parseInt(e.target.value) || 0)}
                      className="w-16 text-center border-2 border-violet-200 rounded-md focus:border-violet-500 focus:ring-violet-500"
                    />
                    <button
                      onClick={() => updateDrinkCount(index, drink.count + 1)}
                      className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 hover:bg-violet-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setGender('man')}
                className={`py-3 px-6 rounded-lg text-center transition-colors ${
                  gender === 'man'
                    ? 'bg-violet-500 text-white'
                    : 'bg-violet-100 text-gray-600 hover:bg-violet-200'
                }`}
              >
                Man
              </button>
              <button
                onClick={() => setGender('woman')}
                className={`py-3 px-6 rounded-lg text-center transition-colors ${
                  gender === 'woman'
                    ? 'bg-violet-500 text-white'
                    : 'bg-violet-100 text-gray-600 hover:bg-violet-200'
                }`}
              >
                Kvinna
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ÅLDER
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={handleAgeChange}
                  min="1"
                  max="120"
                  className="w-full border-2 border-violet-200 rounded-lg px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  VIKT (KG)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={handleWeightChange}
                  min="1"
                  max="200"
                  className="w-full border-2 border-violet-200 rounded-lg px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VILKEN DAG BÖRJADE DU DRICKA?
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border-2 border-violet-200 rounded-lg px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TIMME
                </label>
                <select
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="w-full border-2 border-violet-200 rounded-lg px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
                >
                  {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                    <option key={hour} value={hour.toString().padStart(2, '0')}>
                      {hour.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MINUT
                </label>
                <select
                  value={startMinute}
                  onChange={(e) => setStartMinute(e.target.value)}
                  className="w-full border-2 border-violet-200 rounded-lg px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
                >
                  {[0, 15, 30, 45].map(minute => (
                    <option key={minute} value={minute.toString().padStart(2, '0')}>
                      {minute.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={calculateResult}
              className="w-full bg-violet-500 text-white py-3 px-6 rounded-lg hover:bg-violet-600 transition-colors"
            >
              Beräkna resultat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlcoholCalculator;
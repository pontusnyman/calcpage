import React, { useState } from 'react';
import { ArrowLeft, Coffee, AlertTriangle, Info, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Beverage {
  name: string;
  caffeine: number;
  servingSize: string;
  count: number;
}

interface CaffeineResult {
  totalCaffeine: number;
  safeLimit: boolean;
  percentageOfLimit: number;
  remainingAllowance: number;
}

const CaffeineCalculator = () => {
  const [beverages, setBeverages] = useState<Beverage[]>([
    { name: 'Bryggkaffe', caffeine: 95, servingSize: '240ml (1 kopp)', count: 0 },
    { name: 'Espresso', caffeine: 63, servingSize: '30ml (1 shot)', count: 0 },
    { name: 'Cappuccino', caffeine: 63, servingSize: '240ml', count: 0 },
    { name: 'Svart te', caffeine: 47, servingSize: '240ml', count: 0 },
    { name: 'Grönt te', caffeine: 28, servingSize: '240ml', count: 0 },
    { name: 'Cola', caffeine: 34, servingSize: '330ml (1 burk)', count: 0 },
    { name: 'Energidryck', caffeine: 80, servingSize: '250ml (1 burk)', count: 0 },
    { name: 'Choklad', caffeine: 20, servingSize: '50g (1 bit)', count: 0 }
  ]);
  const [result, setResult] = useState<CaffeineResult | null>(null);

  // Safe daily limit for adults (400mg according to FDA)
  const SAFE_LIMIT = 400;

  const updateBeverageCount = (index: number, newCount: number) => {
    const newBeverages = [...beverages];
    newBeverages[index] = { ...newBeverages[index], count: Math.max(0, newCount) };
    setBeverages(newBeverages);
  };

  const calculateCaffeine = () => {
    const totalCaffeine = beverages.reduce((total, beverage) => {
      return total + (beverage.caffeine * beverage.count);
    }, 0);

    setResult({
      totalCaffeine,
      safeLimit: totalCaffeine <= SAFE_LIMIT,
      percentageOfLimit: (totalCaffeine / SAFE_LIMIT) * 100,
      remainingAllowance: Math.max(0, SAFE_LIMIT - totalCaffeine)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Coffee className="w-12 h-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Koffeinkalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna ditt dagliga koffeinintag och se om det ligger inom säkra gränser
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {beverages.map((beverage, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{beverage.name}</h3>
                    <div className="text-sm text-gray-500">
                      <span>{beverage.servingSize}</span>
                      <span className="mx-2">•</span>
                      <span>{beverage.caffeine} mg koffein</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateBeverageCount(index, beverage.count - 1)}
                      className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={beverage.count}
                      onChange={(e) => updateBeverageCount(index, parseInt(e.target.value) || 0)}
                      className="w-16 text-center border-2 border-purple-200 rounded-md focus:border-purple-500 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => updateBeverageCount(index, beverage.count + 1)}
                      className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={calculateCaffeine}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna koffeinintag
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 rounded-xl p-6">
                    <div className="text-purple-600 text-sm font-medium mb-1">Totalt koffeinintag</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {result.totalCaffeine} mg
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {result.percentageOfLimit.toFixed(1)}% av säker daglig gräns
                    </div>
                  </div>

                  <div 
                    className={`${
                      result.safeLimit ? 'bg-green-500' : 'bg-red-500'
                    } rounded-xl p-6 text-white`}
                  >
                    <div className="text-white text-sm font-medium mb-1">Status</div>
                    <div className="text-3xl font-bold">
                      {result.safeLimit ? 'Säker nivå' : 'Över rekommendation'}
                    </div>
                    <div className="text-sm text-white mt-2">
                      {result.safeLimit 
                        ? `${result.remainingAllowance} mg kvar till gränsen`
                        : `${Math.abs(result.remainingAllowance)} mg över gränsen`
                      }
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 text-purple-500 mr-2" />
                    Motsvarar ungefär
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-medium text-gray-900">Koppar kaffe</div>
                      <div className="text-purple-600 font-semibold">
                        {(result.totalCaffeine / 95).toFixed(1)}
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-medium text-gray-900">Espresso shots</div>
                      <div className="text-purple-600 font-semibold">
                        {(result.totalCaffeine / 63).toFixed(1)}
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-medium text-gray-900">Koppar te</div>
                      <div className="text-purple-600 font-semibold">
                        {(result.totalCaffeine / 47).toFixed(1)}
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-medium text-gray-900">Energidrycker</div>
                      <div className="text-purple-600 font-semibold">
                        {(result.totalCaffeine / 80).toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>

                {!result.safeLimit && (
                  <div className="bg-red-50 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-red-900">Varning för högt koffeinintag</h3>
                        <p className="text-red-700 mt-1">
                          Ett för högt koffeinintag kan leda till sömnproblem, ångest, 
                          hjärtklappning och andra hälsoproblem. Överväg att minska ditt intag.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Coffee className="w-6 h-6 mr-2 text-purple-600" />
              Om koffein
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Koffein är ett naturligt förekommande stimulerande ämne som finns i kaffe, 
                te, choklad och många andra livsmedel.
              </p>
              <p>
                För de flesta vuxna anses ett intag på upp till 400 mg koffein per dag 
                vara säkert. Detta motsvarar ungefär 4-5 koppar kaffe.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2 text-purple-600" />
              Tips för koffeinintag
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Undvik koffein sent på dagen</li>
              <li>• Drick vatten mellan koffeinhaltiga drycker</li>
              <li>• Var uppmärksam på dolda koffeinkällor</li>
              <li>• Minska intaget gradvis för att undvika abstinens</li>
              <li>• Lyssna på din kropps signaler</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaffeineCalculator;
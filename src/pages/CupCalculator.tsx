import React, { useState } from 'react';
import { ArrowLeft, Scale, ArrowDownUp, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Measurement {
  name: string;
  value: number;
  unit: string;
  description: string;
}

const CupCalculator = () => {
  const [amount, setAmount] = useState<string>('1');
  const [selectedMeasure, setSelectedMeasure] = useState<string>('cup');
  const [result, setResult] = useState<Measurement | null>(null);

  const measurements: Record<string, Measurement> = {
    cup: { 
      name: 'Cup', 
      value: 2.37, 
      unit: 'dl',
      description: 'Amerikansk standardkopp'
    },
    gallon: { 
      name: 'Gallon', 
      value: 38, 
      unit: 'dl',
      description: 'Amerikansk gallon'
    },
    quart: { 
      name: 'Quart', 
      value: 9.5, 
      unit: 'dl',
      description: 'Amerikansk quart (1/4 gallon)'
    },
    'liquid-pint': { 
      name: 'Liquid Pint', 
      value: 4.73, 
      unit: 'dl',
      description: 'Amerikansk pint för vätskor'
    },
    'dry-pint': { 
      name: 'Dry Pint', 
      value: 5.5, 
      unit: 'dl',
      description: 'Amerikansk pint för torra ingredienser'
    },
    'fluid-ounce': { 
      name: 'Fluid Ounce', 
      value: 0.3, 
      unit: 'dl',
      description: 'Amerikansk fluid ounce'
    },
    tablespoon: { 
      name: 'Tablespoon', 
      value: 0.15, 
      unit: 'dl',
      description: 'Amerikansk matsked'
    },
    teaspoon: { 
      name: 'Teaspoon', 
      value: 0.05, 
      unit: 'dl',
      description: 'Amerikansk tesked'
    }
  };

  const handleCalculate = () => {
    const measure = measurements[selectedMeasure];
    if (!measure) return;

    const value = parseFloat(amount) || 0;
    setResult({
      ...measure,
      value: value * measure.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ArrowDownUp className="w-12 h-12 text-amber-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Måttomvandlare</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Konvertera mellan amerikanska mått och deciliter för enkel matlagning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Välj mått
                </label>
                <select
                  value={selectedMeasure}
                  onChange={(e) => setSelectedMeasure(e.target.value)}
                  className="w-full border-2 border-amber-200 rounded-lg px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
                >
                  {Object.entries(measurements).map(([key, measure]) => (
                    <option key={key} value={key}>
                      {measure.name}
                    </option>
                  ))}
                </select>
                {selectedMeasure && (
                  <p className="mt-2 text-sm text-gray-500">
                    {measurements[selectedMeasure].description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ange mängd
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.1"
                  className="w-full border-2 border-amber-200 rounded-lg px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Konvertera
              </button>

              {result && (
                <div className="mt-8 p-6 bg-amber-50 rounded-xl border-2 border-amber-200">
                  <div className="text-center">
                    <div className="text-amber-600 text-sm font-medium mb-1">Resultat</div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {result.value.toFixed(2)} {result.unit}
                    </div>
                    <p className="text-gray-600">
                      {amount} {result.name} = {result.value.toFixed(2)} {result.unit}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-amber-600" />
                Konverteringstabell
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-4">Amerikanska mått</th>
                      <th className="text-right py-2 px-4">Svenska mått</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(measurements).map((measure) => (
                      <tr key={measure.name} className="border-b border-gray-100">
                        <td className="py-2 px-4">1 {measure.name.toLowerCase()}</td>
                        <td className="text-right py-2 px-4">{measure.value} {measure.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold mb-4">Tips för matlagning</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Använd helst decilitermått för bästa precision</li>
                <li>• För torra ingredienser, strö lätt i måttet utan att packa</li>
                <li>• För vätska, läs av i ögonhöjd för exakt mätning</li>
                <li>• Olika ingredienser kan ha olika densitet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CupCalculator;
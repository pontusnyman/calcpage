import React, { useState } from 'react';
import { ArrowLeft, Scale, ArrowDownUp, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Measurement {
  name: string;
  shortName: string;
  type: 'weight' | 'volume';
  baseValue: number;
  description: string;
}

const MeasurementConverter = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('kg');
  const [toUnit, setToUnit] = useState<string>('g');
  const [result, setResult] = useState<number | null>(null);

  const measurements: Record<string, Measurement> = {
    kg: {
      name: 'Kilogram',
      shortName: 'kg',
      type: 'weight',
      baseValue: 1000,
      description: '1 kg = 1000 gram'
    },
    hg: {
      name: 'Hektogram',
      shortName: 'hg',
      type: 'weight',
      baseValue: 100,
      description: '1 hg = 100 gram'
    },
    g: {
      name: 'Gram',
      shortName: 'g',
      type: 'weight',
      baseValue: 1,
      description: 'Basenhet för vikt'
    },
    l: {
      name: 'Liter',
      shortName: 'l',
      type: 'volume',
      baseValue: 1000,
      description: '1 l = 1000 milliliter'
    },
    dl: {
      name: 'Deciliter',
      shortName: 'dl',
      type: 'volume',
      baseValue: 100,
      description: '1 dl = 100 milliliter'
    },
    cl: {
      name: 'Centiliter',
      shortName: 'cl',
      type: 'volume',
      baseValue: 10,
      description: '1 cl = 10 milliliter'
    },
    ml: {
      name: 'Milliliter',
      shortName: 'ml',
      type: 'volume',
      baseValue: 1,
      description: 'Basenhet för volym'
    },
    msk: {
      name: 'Matsked',
      shortName: 'msk',
      type: 'volume',
      baseValue: 15,
      description: '1 msk = 15 milliliter'
    },
    tsk: {
      name: 'Tesked',
      shortName: 'tsk',
      type: 'volume',
      baseValue: 5,
      description: '1 tsk = 5 milliliter'
    },
    krm: {
      name: 'Kryddmått',
      shortName: 'krm',
      type: 'volume',
      baseValue: 1,
      description: '1 krm = 1 milliliter'
    }
  };

  const commonConversions = [
    { from: '3 msk', to: '0.45 dl' },
    { from: '2 dl strösocker', to: '170 g' },
    { from: '2 dl vetemjöl', to: '120 g' },
    { from: '1 msk smör', to: '15 g' },
    { from: '1 krm', to: '1 ml' }
  ];

  const handleCalculate = () => {
    const fromMeasure = measurements[fromUnit];
    const toMeasure = measurements[toUnit];
    
    if (!fromMeasure || !toMeasure || fromMeasure.type !== toMeasure.type) return;

    const value = parseFloat(amount) || 0;
    const baseValue = value * fromMeasure.baseValue;
    setResult(baseValue / toMeasure.baseValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ArrowDownUp className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Måttomvandlare</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Konvertera mellan olika svenska mått för vikt och volym
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mängd
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.1"
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Från
                  </label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.entries(measurements).map(([key, measure]) => (
                      <option key={key} value={key}>
                        {measure.name} ({measure.shortName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Till
                  </label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.entries(measurements).map(([key, measure]) => (
                      <option key={key} value={key}>
                        {measure.name} ({measure.shortName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Konvertera
              </button>

              {result !== null && (
                <div className="mt-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="text-center">
                    <div className="text-blue-600 text-sm font-medium mb-1">Resultat</div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {result.toFixed(2)} {measurements[toUnit].shortName}
                    </div>
                    <p className="text-gray-600">
                      {amount} {measurements[fromUnit].shortName} = {result.toFixed(2)} {measurements[toUnit].shortName}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-blue-600" />
                Vanliga omvandlingar
              </h2>
              <div className="space-y-3">
                {commonConversions.map((conversion, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">{conversion.from}</span>
                    <span className="text-gray-500">≈</span>
                    <span className="text-gray-700">{conversion.to}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold mb-4">Tips för matlagning</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Använd alltid samma typ av mått (dl-mått eller msk/tsk)</li>
                <li>• Strö torra ingredienser lätt i måttet utan att packa</li>
                <li>• För vätska, läs av i ögonhöjd för exakt mätning</li>
                <li>• Olika ingredienser har olika densitet - använd rätt omvandling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementConverter;
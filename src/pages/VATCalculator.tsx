import React, { useState } from 'react';
import { ArrowLeft, Calculator, Info, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VATResult {
  vatAmount: number;
  priceExclVAT: number;
  priceInclVAT: number;
  vatRate: number;
}

const VATCalculator = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [vatRate, setVatRate] = useState<number>(25);
  const [isInclusive, setIsInclusive] = useState<boolean>(true);
  const [result, setResult] = useState<VATResult | null>(null);

  const vatRates = [
    { value: 25, label: '25%', description: 'Standard momssats' },
    { value: 12, label: '12%', description: 'Livsmedel, hotell & restaurang' },
    { value: 6, label: '6%', description: 'Böcker, tidningar, kultur' },
    { value: 0, label: '0%', description: 'Momsfritt' }
  ];

  const calculateVAT = () => {
    const inputAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    let priceExclVAT: number;
    let priceInclVAT: number;

    if (isInclusive) {
      // Amount includes VAT
      priceInclVAT = inputAmount;
      priceExclVAT = inputAmount / (1 + (vatRate / 100));
    } else {
      // Amount excludes VAT
      priceExclVAT = inputAmount;
      priceInclVAT = inputAmount * (1 + (vatRate / 100));
    }

    const vatAmount = priceInclVAT - priceExclVAT;

    setResult({
      vatAmount,
      priceExclVAT,
      priceInclVAT,
      vatRate
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Percent className="w-12 h-12 text-pink-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Momskalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Räkna ut moms enkelt med vår momskalkylator
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Momssats
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vatRates.map((rate) => (
                  <button
                    key={rate.value}
                    onClick={() => setVatRate(rate.value)}
                    className={`p-4 rounded-lg transition-colors ${
                      vatRate === rate.value
                        ? 'bg-pink-500 text-white'
                        : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                    }`}
                  >
                    <div className="font-medium">{rate.label}</div>
                    <div className={`text-sm ${vatRate === rate.value ? 'text-pink-100' : 'text-gray-500'}`}>
                      {rate.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Belopp ({isInclusive ? 'inklusive' : 'exklusive'} moms)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:ring-pink-500"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">kr</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsInclusive(true)}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  isInclusive
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-100 text-gray-700 hover:bg-pink-200'
                }`}
              >
                Inkl. moms
              </button>
              <button
                onClick={() => setIsInclusive(false)}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  !isInclusive
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-100 text-gray-700 hover:bg-pink-200'
                }`}
              >
                Exkl. moms
              </button>
            </div>

            <button
              onClick={calculateVAT}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna moms
            </button>

            {result && (
              <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-pink-50 rounded-xl p-6">
                    <div className="text-pink-600 text-sm font-medium mb-1">Belopp exkl. moms</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {result.priceExclVAT.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })} kr
                    </div>
                  </div>

                  <div className="bg-pink-500 rounded-xl p-6 text-white">
                    <div className="text-pink-100 text-sm font-medium mb-1">Momsbelopp ({result.vatRate}%)</div>
                    <div className="text-3xl font-bold">
                      {result.vatAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })} kr
                    </div>
                  </div>

                  <div className="bg-pink-50 rounded-xl p-6">
                    <div className="text-pink-600 text-sm font-medium mb-1">Belopp inkl. moms</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {result.priceInclVAT.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })} kr
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-start space-x-4">
            <Info className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Om moms</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Moms, eller mervärdesskatt, är en skatt som läggs på varor och tjänster i Sverige och många andra 
                  länder. Den betalas av slutkonsumenten och samlas in av företag som därefter redovisar momsen 
                  till Skatteverket.
                </p>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Olika momssatser i Sverige:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>25% - Standard momssats för de flesta varor och tjänster</li>
                    <li>12% - Livsmedel, restaurang- och hotelltjänster</li>
                    <li>6% - Böcker, tidningar, kollektivtrafik, kultur</li>
                    <li>0% - Momsfria varor och tjänster</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VATCalculator;
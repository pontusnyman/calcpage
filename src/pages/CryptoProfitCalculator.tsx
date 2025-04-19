import React, { useState } from 'react';
import { ArrowLeft, Bitcoin, Calculator, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CryptoResult {
  profitLoss: number;
  percentageChange: number;
  initialInvestment: number;
  currentValue: number;
  isProfit: boolean;
}

type Currency = 'KR' | 'USD' | 'EUR';

interface CurrencyConfig {
  symbol: string;
  name: string;
}

const currencies: Record<Currency, CurrencyConfig> = {
  KR: { symbol: 'kr', name: 'Svenska kronor' },
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' }
};

const CryptoProfitCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(30000);
  const [currentPrice, setCurrentPrice] = useState<number>(40000);
  const [quantity, setQuantity] = useState<number>(1);
  const [currency, setCurrency] = useState<Currency>('KR');
  const [result, setResult] = useState<CryptoResult | null>(null);

  const calculateProfit = () => {
    const initialInvestment = purchasePrice * quantity;
    const currentValue = currentPrice * quantity;
    const profitLoss = currentValue - initialInvestment;
    const percentageChange = ((currentValue - initialInvestment) / initialInvestment) * 100;

    setResult({
      profitLoss,
      percentageChange,
      initialInvestment,
      currentValue,
      isProfit: profitLoss >= 0
    });
  };

  const formatCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat(currency === 'KR' ? 'sv-SE' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bitcoin className="w-12 h-12 text-orange-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Krypto Vinst/Förlust Kalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna vinst eller förlust på dina kryptoinvesteringar
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valuta
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(Object.keys(currencies) as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`py-2 px-4 rounded-lg text-center transition-colors ${
                      currency === curr
                        ? 'bg-orange-500 text-white'
                        : 'bg-orange-100 text-gray-700 hover:bg-orange-200'
                    }`}
                  >
                    {curr} ({currencies[curr].symbol})
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inköpspris ({currencies[currency].symbol})
              </label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nuvarande pris ({currencies[currency].symbol})
              </label>
              <input
                type="number"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Antal enheter
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
                step="0.000001"
                className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <button
              onClick={calculateProfit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna vinst/förlust
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`${result.isProfit ? 'bg-green-500' : 'bg-red-500'} rounded-xl p-6 text-white`}>
                    <div className="text-white/90 text-sm font-medium mb-1">Vinst/Förlust</div>
                    <div className="text-3xl font-bold flex items-center">
                      {result.isProfit ? <TrendingUp className="w-6 h-6 mr-2" /> : <TrendingDown className="w-6 h-6 mr-2" />}
                      {formatCurrency(Math.abs(result.profitLoss))}
                    </div>
                    <div className="text-white/90 mt-2">
                      {result.percentageChange.toFixed(2)}%
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-6">
                    <div className="text-orange-600 text-sm font-medium mb-1">Nuvarande värde</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {formatCurrency(result.currentValue)}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Från {formatCurrency(result.initialInvestment)}
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 text-orange-500 mr-2" />
                    Sammanfattning
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="font-medium text-gray-900">Investerat belopp</div>
                      <div className="text-orange-600 font-semibold">
                        {formatCurrency(result.initialInvestment)}
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="font-medium text-gray-900">Genomsnittspris</div>
                      <div className="text-orange-600 font-semibold">
                        {formatCurrency(purchasePrice)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Om kryptoinvesteringar</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Kryptovalutor är mycket volatila investeringar och deras värde kan både öka och minska 
              dramatiskt på kort tid. Det är viktigt att aldrig investera mer än du har råd att förlora.
            </p>
            <p>
              Denna kalkylator är endast ett verktyg för att beräkna potentiell vinst eller förlust. 
              Den tar inte hänsyn till transaktionsavgifter eller skatter som kan påverka din faktiska avkastning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoProfitCalculator;
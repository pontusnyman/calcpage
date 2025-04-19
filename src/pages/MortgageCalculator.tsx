import React, { useState } from 'react';
import { ArrowLeft, Home, Calculator, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MortgageResult {
  housePrice: number;
  downPayment: number;
  loanAmount: number;
  loanToValue: number;
  monthlyInterest: number;
  monthlyAmortization: number;
  monthlyTotal: number;
  yearlyInterestDeduction: number;
  monthlyAfterDeduction: number;
}

const MortgageCalculator = () => {
  const [housePrice, setHousePrice] = useState<number>(2000000);
  const [downPayment, setDownPayment] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [amortizationRate, setAmortizationRate] = useState<number>(2);
  const [includeDeduction, setIncludeDeduction] = useState<boolean>(true);
  const [result, setResult] = useState<MortgageResult | null>(null);

  const calculateMortgage = () => {
    const loanAmount = housePrice - downPayment;
    const loanToValue = (loanAmount / housePrice) * 100;

    // Monthly calculations
    const monthlyInterestRate = interestRate / 100 / 12;
    const monthlyInterest = loanAmount * monthlyInterestRate;
    const monthlyAmortization = (loanAmount * (amortizationRate / 100)) / 12;
    const monthlyTotal = monthlyInterest + monthlyAmortization;

    // Interest deduction (30% up to 100,000 SEK yearly interest, 21% above)
    const yearlyInterest = monthlyInterest * 12;
    let yearlyInterestDeduction = 0;

    if (includeDeduction) {
      if (yearlyInterest <= 100000) {
        yearlyInterestDeduction = yearlyInterest * 0.3;
      } else {
        yearlyInterestDeduction = (100000 * 0.3) + ((yearlyInterest - 100000) * 0.21);
      }
    }

    const monthlyAfterDeduction = monthlyTotal - (yearlyInterestDeduction / 12);

    setResult({
      housePrice,
      downPayment,
      loanAmount,
      loanToValue,
      monthlyInterest,
      monthlyAmortization,
      monthlyTotal,
      yearlyInterestDeduction,
      monthlyAfterDeduction
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Home className="w-12 h-12 text-emerald-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Bolånekalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna månadskostnad och amortering för ditt bolån
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bostadens pris (kr)
              </label>
              <input
                type="number"
                value={housePrice}
                onChange={(e) => setHousePrice(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-emerald-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontantinsats (kr)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-emerald-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                {((downPayment / housePrice) * 100).toFixed(1)}% av bostadens värde
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ränta (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                step="0.1"
                className="w-full border-2 border-emerald-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amortering (% per år)
              </label>
              <input
                type="number"
                value={amortizationRate}
                onChange={(e) => setAmortizationRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                step="0.1"
                className="w-full border-2 border-emerald-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeDeduction}
                onChange={(e) => setIncludeDeduction(e.target.checked)}
                className="rounded border-emerald-300 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-gray-700">Inkludera ränteavdrag (30% upp till 100 000 kr/år)</span>
            </label>
          </div>

          <button
            onClick={calculateMortgage}
            className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Beräkna bolånekostnad
          </button>

          {result && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 rounded-xl p-6">
                  <div className="text-emerald-600 text-sm font-medium mb-1">Lånebelopp</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {result.loanAmount.toLocaleString()} kr
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Belåningsgrad: {result.loanToValue.toFixed(1)}%
                  </div>
                </div>

                <div className="bg-emerald-500 rounded-xl p-6 text-white">
                  <div className="text-emerald-100 text-sm font-medium mb-1">
                    Månadskostnad efter avdrag
                  </div>
                  <div className="text-3xl font-bold">
                    {Math.round(result.monthlyAfterDeduction).toLocaleString()} kr
                  </div>
                  <div className="text-sm text-emerald-100 mt-1">
                    Inkl. amortering och ränteavdrag
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6">
                  <div className="text-emerald-600 text-sm font-medium mb-1">Årligt ränteavdrag</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {Math.round(result.yearlyInterestDeduction).toLocaleString()} kr
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-emerald-600" />
                  Kostnadsfördelning per månad
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-emerald-100 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Ränta</div>
                    <div className="text-xl font-semibold text-gray-900">
                      {Math.round(result.monthlyInterest).toLocaleString()} kr
                    </div>
                  </div>
                  <div className="bg-white border-2 border-emerald-100 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Amortering</div>
                    <div className="text-xl font-semibold text-gray-900">
                      {Math.round(result.monthlyAmortization).toLocaleString()} kr
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-start space-x-4">
            <Info className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Om bolån och amortering</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Bolån är ett lån med bostaden som säkerhet. I Sverige måste du ha minst 15% i kontantinsats 
                  av bostadens värde. Resten kan finansieras med bolån.
                </p>
                <p>
                  Amorteringskrav gäller för nya bolån:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>2% årlig amortering vid belåningsgrad över 70%</li>
                  <li>1% årlig amortering vid belåningsgrad mellan 50-70%</li>
                  <li>Ingen tvingande amortering under 50% belåningsgrad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
import React, { useState } from 'react';
import { ArrowLeft, Car, Calculator, DollarSign, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LeaseOption {
  monthlyPayment: number;
  totalCost: number;
  downPayment: number;
  residualValue: number;
}

interface BuyOption {
  monthlyPayment: number;
  totalCost: number;
  downPayment: number;
  equityValue: number;
}

interface ComparisonResult {
  lease: LeaseOption;
  buy: BuyOption;
  difference: number;
  recommendedOption: 'lease' | 'buy';
  reasons: string[];
}

const CarLeaseCalculator = () => {
  const [carPrice, setCarPrice] = useState<number>(400000);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState<number>(20);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(4.5);
  const [leaseInterestRate, setLeaseInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(60); // months
  const [leaseTerm, setLeaseTerm] = useState<number>(36); // months
  const [residualPercentage, setResidualPercentage] = useState<number>(55);
  const [annualMileage, setAnnualMileage] = useState<number>(1500);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const calculateComparison = () => {
    // Calculate lease option
    const leaseDownPayment = (carPrice * downPaymentPercentage) / 100;
    const residualValue = (carPrice * residualPercentage) / 100;
    const leaseDepreciation = carPrice - residualValue;
    const leaseMonthlyRate = leaseInterestRate / 1200; // Convert APR to monthly rate
    const leaseMonthlyPayment = (
      (leaseDepreciation - leaseDownPayment) +
      ((leaseDepreciation - leaseDownPayment + residualValue) * leaseMonthlyRate * leaseTerm)
    ) / leaseTerm;
    const leaseTotalCost = (leaseMonthlyPayment * leaseTerm) + leaseDownPayment;

    // Calculate buy option
    const buyDownPayment = (carPrice * downPaymentPercentage) / 100;
    const loanAmount = carPrice - buyDownPayment;
    const buyMonthlyRate = loanInterestRate / 1200;
    const buyMonthlyPayment = (
      loanAmount * buyMonthlyRate * Math.pow(1 + buyMonthlyRate, loanTerm)
    ) / (Math.pow(1 + buyMonthlyRate, loanTerm) - 1);
    const buyTotalCost = (buyMonthlyPayment * loanTerm) + buyDownPayment;

    // Estimate car value after lease term (for buy option comparison)
    const yearlyDepreciation = 15; // Average yearly depreciation rate
    const yearsOwned = leaseTerm / 12;
    const estimatedValue = carPrice * Math.pow(1 - yearlyDepreciation / 100, yearsOwned);

    // Determine recommendation
    const costDifference = buyTotalCost - leaseTotalCost;
    const recommendedOption = costDifference > 10000 ? 'lease' : 'buy';

    // Generate reasons
    const reasons = [];
    if (annualMileage > 2000) {
      reasons.push('Hög årlig körsträcka gör köp mer fördelaktigt');
    } else {
      reasons.push('Låg årlig körsträcka passar bra för leasing');
    }
    if (loanInterestRate > leaseInterestRate + 1) {
      reasons.push('Lägre ränta på leasing gör det mer attraktivt');
    }
    if (residualPercentage > 50) {
      reasons.push('Högt restvärde gör leasing mer fördelaktigt');
    }
    reasons.push(recommendedOption === 'lease' 
      ? 'Lägre totalkostnad med leasing under given period'
      : 'Långsiktigt mer ekonomiskt att äga bilen');

    setResult({
      lease: {
        monthlyPayment: leaseMonthlyPayment,
        totalCost: leaseTotalCost,
        downPayment: leaseDownPayment,
        residualValue
      },
      buy: {
        monthlyPayment: buyMonthlyPayment,
        totalCost: buyTotalCost,
        downPayment: buyDownPayment,
        equityValue: estimatedValue
      },
      difference: Math.abs(costDifference),
      recommendedOption,
      reasons
    });
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
            <Car className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Leasing vs Köp Kalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jämför kostnaderna mellan att leasa eller köpa en bil
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bilens pris (kr)
              </label>
              <input
                type="number"
                value={carPrice}
                onChange={(e) => setCarPrice(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kontantinsats (%)
                </label>
                <input
                  type="number"
                  value={downPaymentPercentage}
                  onChange={(e) => setDownPaymentPercentage(Math.max(0, Math.min(100, Number(e.target.value))))}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Årlig körsträcka (mil)
                </label>
                <input
                  type="number"
                  value={annualMileage}
                  onChange={(e) => setAnnualMileage(Math.max(0, Number(e.target.value)))}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Låneränta (%)
                </label>
                <input
                  type="number"
                  value={loanInterestRate}
                  onChange={(e) => setLoanInterestRate(Math.max(0, Number(e.target.value)))}
                  step="0.1"
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leasingränta (%)
                </label>
                <input
                  type="number"
                  value={leaseInterestRate}
                  onChange={(e) => setLeaseInterestRate(Math.max(0, Number(e.target.value)))}
                  step="0.1"
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lånetid (månader)
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  {[36, 48, 60, 72, 84].map(months => (
                    <option key={months} value={months}>{months} månader</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leasingperiod (månader)
                </label>
                <select
                  value={leaseTerm}
                  onChange={(e) => setLeaseTerm(Number(e.target.value))}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  {[24, 36, 48].map(months => (
                    <option key={months} value={months}>{months} månader</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restvärde (% av nypris)
              </label>
              <input
                type="number"
                value={residualPercentage}
                onChange={(e) => setResidualPercentage(Math.max(0, Math.min(100, Number(e.target.value))))}
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={calculateComparison}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Jämför alternativ
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Leasing</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-gray-500">Månadskostnad</div>
                        <div className="text-xl font-bold text-gray-900">
                          {Math.round(result.lease.monthlyPayment)} kr
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Kontantinsats</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {Math.round(result.lease.downPayment)} kr
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Restvärde</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {Math.round(result.lease.residualValue)} kr
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Total kostnad</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {Math.round(result.lease.totalCost)} kr
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Köp</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-gray-500">Månadskostnad</div>
                        <div className="text-xl font-bold text-gray-900">
                          {Math.round(result.buy.monthlyPayment)} kr
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Kontantinsats</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {Math.round(result.buy.downPayment)} kr
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Uppskattat värde efter period</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {Math.round(result.buy.equityValue)} kr
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Total kostnad</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {Math.round(result.buy.totalCost)} kr
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">Rekommendation</h3>
                  <div className="space-y-4">
                    <p className="text-xl font-bold">
                      {result.recommendedOption === 'lease' ? 'Leasing rekommenderas' : 'Köp rekommenderas'}
                    </p>
                    <div className="text-sm space-y-2">
                      {result.reasons.map((reason, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-2" />
                          {reason}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm">
                      Kostnadsskillnad: {Math.round(result.difference).toLocaleString()} kr
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
              Fördelar med leasing
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Fast månadskostnad</li>
              <li>• Inget restvärdesrisk</li>
              <li>• Enklare att byta bil</li>
              <li>• Mindre kontantinsats</li>
              <li>• Service ofta inkluderad</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2 text-blue-600" />
              Fördelar med köp
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Bygger upp eget kapital</li>
              <li>• Ingen körsträckebegränsning</li>
              <li>• Möjlighet till andrahandsvärde</li>
              <li>• Frihet att modifiera bilen</li>
              <li>• Ofta billigare i längden</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLeaseCalculator;
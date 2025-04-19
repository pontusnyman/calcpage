import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Calculator, Clock, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RateResult {
  hourlyRate: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  effectiveHourlyRate: number;
  billableHoursPerYear: number;
}

const HourlyRateCalculator = () => {
  const [yearlyIncome, setYearlyIncome] = useState<number>(500000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(10000);
  const [workingHours, setWorkingHours] = useState<number>(40);
  const [vacationWeeks, setVacationWeeks] = useState<number>(5);
  const [billablePercentage, setBillablePercentage] = useState<number>(70);
  const [result, setResult] = useState<RateResult | null>(null);

  const calculateRate = () => {
    // Calculate billable hours
    const weeksPerYear = 52 - vacationWeeks;
    const totalHoursPerYear = weeksPerYear * workingHours;
    const billableHoursPerYear = totalHoursPerYear * (billablePercentage / 100);

    // Calculate required yearly revenue
    const yearlyExpenses = monthlyExpenses * 12;
    const yearlyRevenue = yearlyIncome + yearlyExpenses;

    // Calculate rates
    const hourlyRate = Math.ceil(yearlyRevenue / billableHoursPerYear);
    const monthlyRevenue = yearlyRevenue / 12;
    const effectiveHourlyRate = yearlyRevenue / totalHoursPerYear;

    setResult({
      hourlyRate,
      monthlyRevenue,
      yearlyRevenue,
      effectiveHourlyRate,
      billableHoursPerYear
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="w-12 h-12 text-teal-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Timtaxekalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna din optimala timtaxa som frilansare baserat på önskad inkomst och utgifter
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Önskad årsinkomst efter skatt (kr)
              </label>
              <input
                type="number"
                value={yearlyIncome}
                onChange={(e) => setYearlyIncome(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Månatliga utgifter (kr)
              </label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Inkludera alla företagsutgifter, försäkringar, etc.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arbetstimmar per vecka
                </label>
                <input
                  type="number"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(Math.max(1, Math.min(168, Number(e.target.value))))}
                  className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semesterveckor per år
                </label>
                <input
                  type="number"
                  value={vacationWeeks}
                  onChange={(e) => setVacationWeeks(Math.max(0, Math.min(52, Number(e.target.value))))}
                  className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Andel fakturerbara timmar (%)
              </label>
              <input
                type="number"
                value={billablePercentage}
                onChange={(e) => setBillablePercentage(Math.max(1, Math.min(100, Number(e.target.value))))}
                className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Tid som kan faktureras till kunder (resten går till administration, marknadsföring, etc.)
              </p>
            </div>

            <button
              onClick={calculateRate}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna timtaxa
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-teal-500 rounded-xl p-6 text-white">
                    <div className="text-teal-100 text-sm font-medium mb-1">Rekommenderad timtaxa</div>
                    <div className="text-3xl font-bold">{result.hourlyRate} kr/h</div>
                    <div className="text-sm text-teal-100 mt-2">
                      Exkl. moms
                    </div>
                  </div>

                  <div className="bg-teal-50 rounded-xl p-6">
                    <div className="text-teal-600 text-sm font-medium mb-1">Effektiv timtaxa</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {Math.round(result.effectiveHourlyRate)} kr/h
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Inkl. icke-fakturerbara timmar
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-teal-600 text-sm font-medium mb-1">Årlig omsättning</div>
                      <div className="text-xl font-bold text-gray-900">
                        {Math.round(result.yearlyRevenue).toLocaleString()} kr
                      </div>
                    </div>
                    <div>
                      <div className="text-teal-600 text-sm font-medium mb-1">Månatlig omsättning</div>
                      <div className="text-xl font-bold text-gray-900">
                        {Math.round(result.monthlyRevenue).toLocaleString()} kr
                      </div>
                    </div>
                    <div>
                      <div className="text-teal-600 text-sm font-medium mb-1">Fakturerbara timmar/år</div>
                      <div className="text-xl font-bold text-gray-900">
                        {Math.round(result.billableHoursPerYear)}h
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 text-teal-500 mr-2" />
                    Timtaxa med moms
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-teal-50 rounded-lg">
                      <div className="font-medium text-gray-900">25% moms</div>
                      <div className="text-teal-600 font-semibold">
                        {Math.round(result.hourlyRate * 1.25)} kr/h
                      </div>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg">
                      <div className="font-medium text-gray-900">12% moms</div>
                      <div className="text-teal-600 font-semibold">
                        {Math.round(result.hourlyRate * 1.12)} kr/h
                      </div>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg">
                      <div className="font-medium text-gray-900">6% moms</div>
                      <div className="text-teal-600 font-semibold">
                        {Math.round(result.hourlyRate * 1.06)} kr/h
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-teal-600" />
              Tips för prissättning
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Undersök marknadspriser i din bransch</li>
              <li>• Räkna med marginal för oförutsedda utgifter</li>
              <li>• Inkludera tid för kompetensutveckling</li>
              <li>• Ta hänsyn till säsongsvariationer</li>
              <li>• Värdera din erfarenhet och expertis</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2 text-teal-600" />
              Att tänka på
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Din timtaxa bör täcka både direkta och indirekta kostnader samt ge utrymme för 
                investeringar och tillväxt.
              </p>
              <p>
                Kom ihåg att räkna med tid för administration, marknadsföring och andra 
                icke-fakturerbara aktiviteter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyRateCalculator;
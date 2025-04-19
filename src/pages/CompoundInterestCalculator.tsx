import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, Calculator, Table } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface CompoundResult {
  finalAmount: number;
  totalInterest: number;
  totalContributions: number;
  yearlyData: {
    year: number;
    balance: number;
    contributions: number;
    interest: number;
  }[];
}

const CompoundInterestCalculator = () => {
  const [initialAmount, setInitialAmount] = useState<number>(30000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(900);
  const [years, setYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [result, setResult] = useState<CompoundResult | null>(null);

  const calculateCompoundInterest = () => {
    let balance = initialAmount;
    const yearlyData = [];
    const monthlyRate = interestRate / 100 / 12;
    let totalContributions = initialAmount;

    for (let year = 0; year <= years; year++) {
      const yearStart = balance;
      for (let month = 0; month < 12; month++) {
        if (year > 0) { // Don't add monthly contributions for year 0
          balance += monthlyContribution;
          totalContributions += monthlyContribution;
        }
        balance *= (1 + monthlyRate);
      }
      
      yearlyData.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        interest: Math.round(balance - totalContributions)
      });
    }

    setResult({
      finalAmount: Math.round(balance),
      totalInterest: Math.round(balance - totalContributions),
      totalContributions: Math.round(totalContributions),
      yearlyData
    });
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [initialAmount, monthlyContribution, years, interestRate]);

  const chartData = {
    labels: result?.yearlyData.map(data => `${data.year} år`) || [],
    datasets: [
      {
        fill: true,
        label: 'Balans',
        data: result?.yearlyData.map(data => data.balance) || [],
        borderColor: 'rgb(45, 212, 191)',
        backgroundColor: 'rgba(45, 212, 191, 0.2)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toLocaleString()} kr`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return value.toLocaleString() + ' kr';
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-12 h-12 text-teal-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Ränta på ränta kalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna ränta-på-ränta effekten för dina investeringar över tid
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Startkapital (kr)
                  </label>
                  <input
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Månadssparande (kr/mån)
                  </label>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                    className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sparhorisont (år)
                  </label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Math.max(1, Math.min(50, Number(e.target.value))))}
                    className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Årlig avkastning (%)
                  </label>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                    step="0.1"
                    className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {result && (
              <div className="bg-teal-500 rounded-2xl shadow-xl p-8 mt-6 text-white">
                <h2 className="text-xl font-semibold mb-4">Resultat</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-teal-100 text-sm">Slutsumma efter {years} år</div>
                    <div className="text-3xl font-bold">{result.finalAmount.toLocaleString()} kr</div>
                  </div>
                  <div>
                    <div className="text-teal-100 text-sm">Total avkastning</div>
                    <div className="text-2xl font-semibold">{result.totalInterest.toLocaleString()} kr</div>
                  </div>
                  <div>
                    <div className="text-teal-100 text-sm">Totalt sparat belopp</div>
                    <div className="text-2xl font-semibold">{result.totalContributions.toLocaleString()} kr</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-8">
            {result && (
              <>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Calculator className="w-6 h-6 mr-2 text-teal-600" />
                    Utveckling över tid
                  </h2>
                  <div className="h-[400px]">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Table className="w-6 h-6 mr-2 text-teal-600" />
                    Årlig utveckling
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4">År</th>
                          <th className="text-right py-3 px-4">Balans</th>
                          <th className="text-right py-3 px-4">Insatt</th>
                          <th className="text-right py-3 px-4">Avkastning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyData.map((data) => (
                          <tr key={data.year} className="border-b border-gray-100">
                            <td className="py-3 px-4">{data.year}</td>
                            <td className="text-right py-3 px-4">{data.balance.toLocaleString()} kr</td>
                            <td className="text-right py-3 px-4">{data.contributions.toLocaleString()} kr</td>
                            <td className="text-right py-3 px-4">{data.interest.toLocaleString()} kr</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
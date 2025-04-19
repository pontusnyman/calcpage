import React, { useState } from 'react';
import { ArrowLeft, PiggyBank, Calculator, Share2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SavingsResult {
  monthlyContribution: number;
  totalContributions: number;
  totalInterest: number;
  finalAmount: number;
  monthlyData: {
    month: number;
    balance: number;
    contributions: number;
    interest: number;
  }[];
}

const SavingsGoalCalculator = () => {
  const [targetAmount, setTargetAmount] = useState<number>(100000);
  const [timeMonths, setTimeMonths] = useState<number>(24);
  const [interestRate, setInterestRate] = useState<number>(2);
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [result, setResult] = useState<SavingsResult | null>(null);
  const [shareButtonText, setShareButtonText] = useState('Dela');

  const calculateSavings = () => {
    const monthlyRate = interestRate / 100 / 12;
    let monthlyContribution = 0;
    
    // Calculate required monthly contribution using PMT formula
    if (monthlyRate === 0) {
      monthlyContribution = (targetAmount - initialAmount) / timeMonths;
    } else {
      monthlyContribution = (
        (targetAmount - initialAmount * Math.pow(1 + monthlyRate, timeMonths)) *
        monthlyRate /
        (Math.pow(1 + monthlyRate, timeMonths) - 1)
      );
    }

    // Generate monthly data
    const monthlyData = [];
    let balance = initialAmount;
    let totalContributions = initialAmount;
    
    for (let month = 1; month <= timeMonths; month++) {
      const interest = balance * monthlyRate;
      balance += monthlyContribution + interest;
      totalContributions += monthlyContribution;
      
      monthlyData.push({
        month,
        balance,
        contributions: totalContributions,
        interest: balance - totalContributions
      });
    }

    setResult({
      monthlyContribution,
      totalContributions,
      totalInterest: balance - totalContributions,
      finalAmount: balance,
      monthlyData
    });
  };

  const handleShare = async () => {
    const shareParams = new URLSearchParams({
      target: targetAmount.toString(),
      time: timeMonths.toString(),
      rate: interestRate.toString(),
      initial: initialAmount.toString()
    });

    const shareUrl = `${window.location.origin}/sparmalskalkylator?${shareParams.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareButtonText('Kopierad!');
      setTimeout(() => setShareButtonText('Dela'), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const commonTimeframes = [
    { months: 12, label: '1 år' },
    { months: 24, label: '2 år' },
    { months: 36, label: '3 år' },
    { months: 60, label: '5 år' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <PiggyBank className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Sparmålskalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna hur mycket du behöver spara varje månad för att nå ditt sparmål
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sparmål (kr)
              </label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Startkapital (kr)
              </label>
              <input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spartid (månader)
              </label>
              <input
                type="number"
                value={timeMonths}
                onChange={(e) => setTimeMonths(Math.max(1, Number(e.target.value)))}
                className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-green-500"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {commonTimeframes.map((timeframe) => (
                  <button
                    key={timeframe.months}
                    onClick={() => setTimeMonths(timeframe.months)}
                    className={`p-2 rounded-lg text-center transition-colors ${
                      timeMonths === timeframe.months
                        ? 'bg-green-500 text-white'
                        : 'bg-green-50 text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    {timeframe.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Årlig ränta (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                step="0.1"
                className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateSavings}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Beräkna månadssparande
              </button>

              <button
                onClick={handleShare}
                className="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center"
              >
                <Share2 className="w-5 h-5 mr-2" />
                {shareButtonText}
              </button>
            </div>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="text-green-600 text-sm font-medium mb-1">Månadssparande</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {Math.round(result.monthlyContribution)} kr
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      För att nå ditt mål på {targetAmount.toLocaleString()} kr
                    </div>
                  </div>

                  <div className="bg-green-500 rounded-xl p-6 text-white">
                    <div className="text-green-100 text-sm font-medium mb-1">Slutbelopp</div>
                    <div className="text-3xl font-bold">
                      {Math.round(result.finalAmount).toLocaleString()} kr
                    </div>
                    <div className="text-sm text-green-100 mt-2">
                      Efter {timeMonths} månader
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-green-600 text-sm font-medium mb-1">Totalt sparat</div>
                      <div className="text-xl font-bold text-gray-900">
                        {Math.round(result.totalContributions).toLocaleString()} kr
                      </div>
                    </div>
                    <div>
                      <div className="text-green-600 text-sm font-medium mb-1">Total ränta</div>
                      <div className="text-xl font-bold text-gray-900">
                        {Math.round(result.totalInterest).toLocaleString()} kr
                      </div>
                    </div>
                    <div>
                      <div className="text-green-600 text-sm font-medium mb-1">Effektiv årsränta</div>
                      <div className="text-xl font-bold text-gray-900">
                        {((Math.pow(result.finalAmount / initialAmount, 12 / timeMonths) - 1) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 text-green-500 mr-2" />
                    Milstolpar
                  </h3>
                  <div className="space-y-4">
                    {[25, 50, 75, 100].map(percentage => {
                      const milestone = result.monthlyData.find(
                        data => (data.balance / targetAmount) * 100 >= percentage
                      );
                      if (milestone) {
                        return (
                          <div key={percentage} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div className="font-medium text-gray-900">{percentage}% av målet</div>
                            <div className="text-green-600">
                              {milestone.month} månader
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
              Tips för framgångsrikt sparande
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Sätt upp realistiska sparmål</li>
              <li>• Automatisera ditt sparande</li>
              <li>• Spara i början av månaden</li>
              <li>• Diversifiera ditt sparande</li>
              <li>• Följ upp och justera regelbundet</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4">Om ränta-på-ränta effekten</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Ränta-på-ränta innebär att du får ränta inte bara på ditt insatta kapital, 
                utan även på tidigare intjänad ränta.
              </p>
              <p>
                Ju längre spartid och högre ränta, desto större blir effekten av 
                ränta-på-ränta på ditt sparande.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalCalculator;
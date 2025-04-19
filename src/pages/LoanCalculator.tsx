import React, { useState } from 'react';
import { ArrowLeft, Wallet, AlertTriangle, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoanResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  yearlyPayments: {
    year: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }[];
}

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(130000);
  const [years, setYears] = useState<number>(9);
  const [interestRate, setInterestRate] = useState<number>(8.44);
  const [result, setResult] = useState<LoanResult | null>(null);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    
    // Calculate monthly payment using the loan payment formula
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;

    // Calculate yearly amortization schedule
    let remainingBalance = loanAmount;
    const yearlyPayments = [];

    for (let year = 1; year <= years; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        remainingBalance -= principalPayment;
      }

      yearlyPayments.push({
        year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }

    setResult({
      monthlyPayment,
      totalAmount,
      totalInterest,
      yearlyPayments
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wallet className="w-12 h-12 text-rose-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Lånekostnadskalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna din månadskostnad och totala kostnad för ditt lån
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lånebelopp (kr)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-rose-200 rounded-lg px-4 py-2 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lånetid (år)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="w-full border-2 border-rose-200 rounded-lg px-4 py-2 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ränta (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                step="0.01"
                className="w-full border-2 border-rose-200 rounded-lg px-4 py-2 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>
          </div>

          <button
            onClick={calculateLoan}
            className="w-full mt-6 bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Beräkna lånekostnad
          </button>

          {result && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-rose-50 rounded-xl p-6">
                  <div className="text-rose-600 text-sm font-medium mb-1">Månadskostnad</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {Math.round(result.monthlyPayment).toLocaleString()} kr
                  </div>
                </div>

                <div className="bg-rose-500 rounded-xl p-6 text-white">
                  <div className="text-rose-100 text-sm font-medium mb-1">Total kostnad</div>
                  <div className="text-3xl font-bold">
                    {Math.round(result.totalAmount).toLocaleString()} kr
                  </div>
                </div>

                <div className="bg-rose-50 rounded-xl p-6">
                  <div className="text-rose-600 text-sm font-medium mb-1">Total ränta</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {Math.round(result.totalInterest).toLocaleString()} kr
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-rose-600" />
                  Amorteringsplan
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">År</th>
                        <th className="text-right py-3 px-4">Amortering</th>
                        <th className="text-right py-3 px-4">Räntekostnad</th>
                        <th className="text-right py-3 px-4">Kvar att betala</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyPayments.map((payment) => (
                        <tr key={payment.year} className="border-b border-gray-100">
                          <td className="py-3 px-4">{payment.year}</td>
                          <td className="text-right py-3 px-4">
                            {Math.round(payment.principal).toLocaleString()} kr
                          </td>
                          <td className="text-right py-3 px-4">
                            {Math.round(payment.interest).toLocaleString()} kr
                          </td>
                          <td className="text-right py-3 px-4">
                            {Math.round(payment.remainingBalance).toLocaleString()} kr
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Att låna kostar pengar!</h3>
              <p className="text-gray-600">
                Om du inte kan betala tillbaka skulden i tid riskerar du en betalningsanmärkning. 
                Det kan leda till svårigheter att få hyra bostad, teckna abonnemang och få nya lån. 
                För stöd, vänd dig till budget- och skuldrådgivningen i din kommun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
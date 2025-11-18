import { useState, useEffect } from 'react';
import { ArrowLeft, Wallet, AlertTriangle, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCalculatorShare } from '../hooks/useCalculatorShare';
import ShareButton from '../components/ShareButton';
import AdBanner from '../components/AdBanner';
import { getUrlParams, getNumberParam } from '../utils/urlParams';

interface LoanResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  yearlyPayments: {
    year: number;
    principal: number;
    interest: number;
    fees: number;
    remainingBalance: number;
  }[];
}

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(130000);
  const [loanAmountDisplay, setLoanAmountDisplay] = useState<string>('130 000');
  const [years, setYears] = useState<number>(9);
  const [interestRate, setInterestRate] = useState<number>(8.44);
  const [setupFee, setSetupFee] = useState<number>(0);
  const [annualFee, setAnnualFee] = useState<number>(0);
  const [result, setResult] = useState<LoanResult | null>(null);

  // Format number with Swedish formatting (spaces as thousand separators)
  const formatSwedishNumber = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('sv-SE').replace(/,/g, ' ');
  };

  // Parse formatted string back to number
  const parseSwedishNumber = (str: string): number => {
    // Remove all spaces and parse
    const cleaned = str.replace(/\s/g, '');
    return Number(cleaned) || 0;
  };

  // Format number string with spaces as thousands separators
  const formatNumberString = (str: string): string => {
    // Remove all non-digits
    const digitsOnly = str.replace(/\D/g, '');
    if (!digitsOnly) return '';
    
    // Add spaces as thousand separators from right to left
    return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Share functionality
  const { handleShare } = useCalculatorShare({
    params: {
      loanAmount: loanAmount,
      years: years,
      interestRate: interestRate,
      setupFee: setupFee,
      annualFee: annualFee
    }
  });

  const calculateLoanWithValues = (
    amount: number,
    loanYears: number,
    rate: number,
    fee: number,
    monthlyFee: number
  ) => {
    // Validate inputs
    const validLoanAmount = isNaN(amount) || amount <= 0 ? 130000 : amount;
    const validYears = isNaN(loanYears) || loanYears <= 0 ? 9 : loanYears;
    const validInterestRate = isNaN(rate) || rate < 0 ? 8.44 : rate;
    const validSetupFee = isNaN(fee) || fee < 0 ? 0 : fee;
    const validAnnualFee = isNaN(monthlyFee) || monthlyFee < 0 ? 0 : monthlyFee;

    const monthlyRate = validInterestRate / 100 / 12;
    const numberOfPayments = validYears * 12;
    
    // Calculate monthly payment using the loan payment formula
    const monthlyPayment = (validLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const baseTotalAmount = monthlyPayment * numberOfPayments;
    const totalFees = validSetupFee + (validAnnualFee * numberOfPayments);
    const totalAmount = baseTotalAmount + totalFees;
    const totalInterest = baseTotalAmount - validLoanAmount;

    // Calculate yearly amortization schedule
    let remainingBalance = validLoanAmount;
    const yearlyPayments = [];

    for (let year = 1; year <= validYears; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        remainingBalance -= principalPayment;
      }

      // Calculate fees for this year
      const yearlyFees = validAnnualFee * 12; // Monthly fee * 12 months
      const feesForYear = year === 1 ? validSetupFee + yearlyFees : yearlyFees;

      yearlyPayments.push({
        year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        fees: feesForYear,
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

  const calculateLoan = () => {
    calculateLoanWithValues(loanAmount, years, interestRate, setupFee, annualFee);
  };

  // Parse URL parameters on mount and auto-calculate
  useEffect(() => {
    const params = getUrlParams();
    if (params.has('loanAmount')) {
      const parsedLoanAmount = getNumberParam(params, 'loanAmount', 130000);
      const parsedYears = getNumberParam(params, 'years', 9);
      const parsedInterestRate = getNumberParam(params, 'interestRate', 8.44);
      const parsedSetupFee = getNumberParam(params, 'setupFee', 0);
      const parsedAnnualFee = getNumberParam(params, 'annualFee', 0);
      
      setLoanAmount(parsedLoanAmount);
      setLoanAmountDisplay(formatSwedishNumber(parsedLoanAmount));
      setYears(parsedYears);
      setInterestRate(parsedInterestRate);
      setSetupFee(parsedSetupFee);
      setAnnualFee(parsedAnnualFee);
      
      // Auto-calculate with parsed values directly
      calculateLoanWithValues(parsedLoanAmount, parsedYears, parsedInterestRate, parsedSetupFee, parsedAnnualFee);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                type="text"
                value={loanAmountDisplay}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Format with spaces as user types
                  const formatted = formatNumberString(inputValue);
                  setLoanAmountDisplay(formatted);
                  // Parse and update the actual number value
                  const parsed = parseSwedishNumber(formatted);
                  setLoanAmount(parsed);
                }}
                onBlur={(e) => {
                  // Ensure proper formatting on blur
                  const parsed = parseSwedishNumber(e.target.value);
                  setLoanAmount(parsed);
                  if (parsed === 0) {
                    setLoanAmountDisplay('');
                  } else {
                    setLoanAmountDisplay(formatSwedishNumber(parsed));
                  }
                }}
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
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setYears(isNaN(value) ? 1 : Math.max(1, Math.min(30, value)));
                }}
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
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setInterestRate(isNaN(value) ? 0 : Math.max(0, Math.min(100, value)));
                }}
                step="0.01"
                className="w-full border-2 border-rose-200 rounded-lg px-4 py-2 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uppläggningsavgift (kr)
              </label>
              <input
                type="number"
                value={setupFee === 0 ? '' : setupFee}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === '' || inputValue === '-') {
                    setSetupFee(0);
                  } else {
                    const value = Number(inputValue);
                    if (!isNaN(value)) {
                      setSetupFee(Math.max(0, value));
                    }
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === '0') {
                    setSetupFee(0);
                  }
                }}
                className="w-full border-2 border-rose-200 rounded-lg px-4 py-2 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aviavgift (kr/månad)
              </label>
              <input
                type="number"
                value={annualFee === 0 ? '' : annualFee}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === '' || inputValue === '-') {
                    setAnnualFee(0);
                  } else {
                    const value = Number(inputValue);
                    if (!isNaN(value)) {
                      setAnnualFee(Math.max(0, value));
                    }
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === '0') {
                    setAnnualFee(0);
                  }
                }}
                className="w-full border-2 border-rose-200 rounded-lg px-4 py-2 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={calculateLoan}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna lånekostnad
            </button>
            <ShareButton onShare={handleShare} color="rose" />
          </div>

          {result && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-rose-50 rounded-xl p-6">
                  <div className="text-rose-600 text-sm font-medium mb-1">Månadskostnad</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {Math.round(result.monthlyPayment).toLocaleString('sv-SE')} kr
                  </div>
                </div>

                <div className="bg-rose-500 rounded-xl p-6 text-white">
                  <div className="text-rose-100 text-sm font-medium mb-1">Total kostnad</div>
                  <div className="text-3xl font-bold">
                    {Math.round(result.totalAmount).toLocaleString('sv-SE')} kr
                  </div>
                </div>

                <div className="bg-rose-50 rounded-xl p-6">
                  <div className="text-rose-600 text-sm font-medium mb-1">Total ränta</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {Math.round(result.totalInterest).toLocaleString('sv-SE')} kr
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
                        <th className="text-right py-3 px-4">Avgifter</th>
                        <th className="text-right py-3 px-4">Kvar att betala</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyPayments.map((payment) => (
                        <tr key={payment.year} className="border-b border-gray-100">
                          <td className="py-3 px-4">{payment.year}</td>
                          <td className="text-right py-3 px-4">
                            {Math.round(payment.principal).toLocaleString('sv-SE')} kr
                          </td>
                          <td className="text-right py-3 px-4">
                            {Math.round(payment.interest).toLocaleString('sv-SE')} kr
                          </td>
                          <td className="text-right py-3 px-4">
                            {Math.round(payment.fees).toLocaleString('sv-SE')} kr
                          </td>
                          <td className="text-right py-3 px-4">
                            {Math.round(payment.remainingBalance).toLocaleString('sv-SE')} kr
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8">
                  <AdBanner position="bottom" />
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
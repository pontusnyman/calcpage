import React, { useState } from 'react';
import { ArrowLeft, Clock, Users, DollarSign, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MeetingResult {
  totalCost: number;
  hourlyTeamCost: number;
  minuteCost: number;
  workingDaysEquivalent: number;
}

const MeetingCostCalculator = () => {
  const [duration, setDuration] = useState<number>(60);
  const [participants, setParticipants] = useState<number>(5);
  const [hourlyWage, setHourlyWage] = useState<number>(400);
  const [result, setResult] = useState<MeetingResult | null>(null);

  const calculateMeetingCost = () => {
    const hourlyTeamCost = participants * hourlyWage;
    const minuteCost = hourlyTeamCost / 60;
    const totalCost = (duration * minuteCost);
    const workingDaysEquivalent = (duration / 60) * participants / 8; // assuming 8-hour workday

    setResult({
      totalCost,
      hourlyTeamCost,
      minuteCost,
      workingDaysEquivalent
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Möteskostnadskalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna den faktiska kostnaden för möten baserat på deltagarnas tid och lön
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Möteslängd (minuter)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                min="1"
                className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Antal deltagare
              </label>
              <input
                type="number"
                value={participants}
                onChange={(e) => setParticipants(Math.max(1, Number(e.target.value)))}
                min="1"
                className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genomsnittlig timlön (kr)
              </label>
              <input
                type="number"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <button
              onClick={calculateMeetingCost}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna möteskostnad
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="text-green-600 text-sm font-medium mb-1">Total möteskostnad</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {Math.round(result.totalCost).toLocaleString()} kr
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {Math.round(result.minuteCost)} kr per minut
                    </div>
                  </div>

                  <div className="bg-green-500 rounded-xl p-6 text-white">
                    <div className="text-green-100 text-sm font-medium mb-1">Teamets timkostnad</div>
                    <div className="text-3xl font-bold">
                      {Math.round(result.hourlyTeamCost).toLocaleString()} kr
                    </div>
                    <div className="text-sm text-green-100 mt-2">
                      För {participants} deltagare
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-green-600 text-sm font-medium mb-1">Arbetsdagar motsvarande</div>
                  <div className="text-xl font-bold text-gray-900">
                    {result.workingDaysEquivalent.toFixed(1)} arbetsdagar
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Total investerad arbetstid
                  </div>
                </div>

                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 text-green-500 mr-2" />
                    Alternativa möten
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-gray-900">15 min standup</div>
                      <div className="text-green-600 font-semibold">
                        {Math.round(result.minuteCost * 15).toLocaleString()} kr
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-gray-900">30 min avstämning</div>
                      <div className="text-green-600 font-semibold">
                        {Math.round(result.minuteCost * 30).toLocaleString()} kr
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-600" />
                Tips för effektiva möten
              </h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Ha en tydlig agenda</li>
                <li>• Bjud endast in nödvändiga deltagare</li>
                <li>• Sätt en tidsgräns och håll den</li>
                <li>• Dokumentera beslut och åtgärdspunkter</li>
                <li>• Följ upp på tidigare beslut</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Visste du att...</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Studier visar att upp till 50% av mötestiden kan vara ineffektiv på grund av 
                  dålig planering eller onödigt långa diskussioner.
                </p>
                <p>
                  Genom att effektivisera möten kan organisationer spara betydande resurser 
                  och öka produktiviteten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCostCalculator;
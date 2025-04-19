import React, { useState } from 'react';
import { ArrowLeft, Plane, Clock, Sun, Moon, Coffee, Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JetLagResult {
  timeDifference: number;
  adjustmentDays: number;
  recommendations: {
    beforeTravel: string[];
    duringFlight: string[];
    afterArrival: string[];
  };
  sleepSchedule: {
    day: number;
    sleepTime: string;
    wakeTime: string;
  }[];
}

const JetLagCalculator = () => {
  const [departureCity, setDepartureCity] = useState<string>('');
  const [arrivalCity, setArrivalCity] = useState<string>('');
  const [departureTime, setDepartureTime] = useState<string>('12:00');
  const [flightDuration, setFlightDuration] = useState<number>(8);
  const [result, setResult] = useState<JetLagResult | null>(null);

  // Common time zones for major cities (UTC offset in hours)
  const cities = {
    'Stockholm': 2,
    'New York': -4,
    'Los Angeles': -7,
    'London': 1,
    'Tokyo': 9,
    'Sydney': 10,
    'Dubai': 4,
    'Singapore': 8,
    'Bangkok': 7,
    'Paris': 2
  };

  const calculateJetLag = () => {
    const departureOffset = cities[departureCity as keyof typeof cities] || 0;
    const arrivalOffset = cities[arrivalCity as keyof typeof cities] || 0;
    const timeDifference = arrivalOffset - departureOffset;
    
    // Calculate adjustment days (roughly 1 day per hour of time difference)
    const adjustmentDays = Math.ceil(Math.abs(timeDifference) * 0.8);

    // Generate sleep schedule
    const sleepSchedule = [];
    const [departureHour] = departureTime.split(':').map(Number);
    
    for (let day = 1; day <= adjustmentDays; day++) {
      const adjustment = (timeDifference / adjustmentDays) * day;
      let newSleepTime = (22 + adjustment) % 24;
      let newWakeTime = (6 + adjustment) % 24;

      sleepSchedule.push({
        day,
        sleepTime: `${Math.floor(newSleepTime).toString().padStart(2, '0')}:00`,
        wakeTime: `${Math.floor(newWakeTime).toString().padStart(2, '0')}:00`
      });
    }

    const recommendations = {
      beforeTravel: [
        'Börja anpassa din dygnsrytm några dagar innan resan',
        'Se till att vara utvilad innan avresa',
        'Undvik alkohol dagen före resan',
        'Drick mycket vatten för att vara hydrerad'
      ],
      duringFlight: [
        'Ställ om klockan till destinationens tid direkt vid avresa',
        'Rör på dig regelbundet under flygresan',
        'Drick mycket vatten, undvik alkohol och koffein',
        'Använd ögonmask och öronproppar vid vila'
      ],
      afterArrival: [
        'Försök hålla dig vaken till lokal kvällstid',
        'Spendera tid utomhus i dagsljus',
        'Ät måltider enligt lokal tid',
        'Undvik långa tupplurar under dagen'
      ]
    };

    setResult({
      timeDifference,
      adjustmentDays,
      recommendations,
      sleepSchedule
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-12 h-12 text-slate-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Jet Lag Planerare</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Planera din resa och minimera effekterna av jet lag med en personlig anpassningsplan
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avresestad
                </label>
                <select
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-slate-500 focus:ring-slate-500"
                >
                  <option value="">Välj stad</option>
                  {Object.keys(cities).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinationsstad
                </label>
                <select
                  value={arrivalCity}
                  onChange={(e) => setArrivalCity(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-slate-500 focus:ring-slate-500"
                >
                  <option value="">Välj stad</option>
                  {Object.keys(cities).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avgångstid
                </label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-slate-500 focus:ring-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flygtid (timmar)
                </label>
                <input
                  type="number"
                  value={flightDuration}
                  onChange={(e) => setFlightDuration(Math.max(1, Number(e.target.value)))}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-slate-500 focus:ring-slate-500"
                />
              </div>
            </div>

            <button
              onClick={calculateJetLag}
              className="w-full bg-slate-500 hover:bg-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna anpassningsplan
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="text-slate-600 text-sm font-medium mb-1">Tidsskillnad</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {Math.abs(result.timeDifference)} timmar
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {result.timeDifference > 0 ? 'Framåt' : 'Bakåt'} i tiden
                    </div>
                  </div>

                  <div className="bg-slate-500 rounded-xl p-6 text-white">
                    <div className="text-slate-100 text-sm font-medium mb-1">Anpassningstid</div>
                    <div className="text-3xl font-bold">
                      {result.adjustmentDays} dagar
                    </div>
                    <div className="text-sm text-slate-100 mt-2">
                      Rekommenderad tid för anpassning
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-slate-500" />
                    Sömnschema för anpassning
                  </h3>
                  <div className="space-y-4">
                    {result.sleepSchedule.map((schedule) => (
                      <div key={schedule.day} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-slate-500 text-white rounded-full flex items-center justify-center mr-3">
                            {schedule.day}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Dag {schedule.day}</div>
                            <div className="text-sm text-gray-500">
                              Sov {schedule.sleepTime} - {schedule.wakeTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Sun className="w-5 h-5 mr-2 text-slate-500" />
                      Före resan
                    </h3>
                    <ul className="space-y-2">
                      {result.recommendations.beforeTravel.map((rec, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-slate-500 rounded-full mr-2" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Plane className="w-5 h-5 mr-2 text-slate-500" />
                      Under flygresan
                    </h3>
                    <ul className="space-y-2">
                      {result.recommendations.duringFlight.map((rec, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-slate-500 rounded-full mr-2" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Moon className="w-5 h-5 mr-2 text-slate-500" />
                      Efter ankomst
                    </h3>
                    <ul className="space-y-2">
                      {result.recommendations.afterArrival.map((rec, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-slate-500 rounded-full mr-2" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Coffee className="w-6 h-6 mr-2 text-slate-600" />
              Tips för att hantera jet lag
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Anpassa måltider till destinationens tid</li>
              <li>• Exponera dig för dagsljus vid rätt tidpunkt</li>
              <li>• Undvik långa tupplurar</li>
              <li>• Håll dig aktiv under dagen</li>
              <li>• Var konsekvent med din nya dygnsrytm</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Hotel className="w-6 h-6 mr-2 text-slate-600" />
              Bra att veta
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Det tar normalt en dag per tidszonsförändring att helt anpassa sig till 
                den nya tidszonen.
              </p>
              <p>
                Resor österut upplevs ofta som svårare att anpassa sig till än 
                resor västerut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JetLagCalculator;
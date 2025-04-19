import React, { useState } from 'react';
import { Moon, Clock, ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const SleepCalculator = () => {
  const [selectedHour, setSelectedHour] = useState(isReverse => isReverse ? 21 : 7);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [bedtimes, setBedtimes] = useState<Array<{time: string, cycles: number}>>([]);
  const [targetWakeTime, setTargetWakeTime] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const minuteOptions = [0, 15, 30, 45];

  const calculateBedtime = () => {
    const wakeTime = new Date();
    wakeTime.setHours(selectedHour, selectedMinute, 0);

    const sleepCycles = [6, 5];
    const bedTimeOptions = sleepCycles.map(cycles => {
      const bedTime = new Date(wakeTime);
      const totalMinutes = (cycles * 90) + 15;
      bedTime.setMinutes(bedTime.getMinutes() - totalMinutes);
      return {
        time: `${bedTime.getHours().toString().padStart(2, '0')}:${bedTime.getMinutes().toString().padStart(2, '0')}`,
        cycles: cycles
      };
    });

    setBedtimes(bedTimeOptions);
    setTargetWakeTime(`${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`);
    setShowResults(true);
  };

  const calculateWakeTime = () => {
    const bedTime = new Date();
    bedTime.setHours(selectedHour, selectedMinute, 0);

    const sleepCycles = [5, 6];
    const wakeTimeOptions = sleepCycles.map(cycles => {
      const wakeTime = new Date(bedTime);
      const totalMinutes = (cycles * 90) + 15;
      wakeTime.setMinutes(wakeTime.getMinutes() + totalMinutes);
      return {
        time: `${wakeTime.getHours().toString().padStart(2, '0')}:${wakeTime.getMinutes().toString().padStart(2, '0')}`,
        cycles: cycles
      };
    });

    setBedtimes(wakeTimeOptions);
    setTargetWakeTime(`${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resultat</h1>
            <p className="text-xl text-gray-600">
              Det tar i genomsnitt 15 minuter att somna. 
              {isReverse 
                ? ` Om du går och lägger dig kl ${targetWakeTime}, bör du vakna vid någon av följande tidpunkter:`
                : ` För att vakna utvilad kl ${targetWakeTime}, bör du gå och lägga dig vid någon av följande tidpunkter:`
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {bedtimes.map((time, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-indigo-600 text-sm font-medium mb-1">
                      {isReverse ? 'Rekommenderad väckningstid' : 'Rekommenderad sängdags'}
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {time.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-indigo-400 text-sm font-medium mb-1">
                      {isReverse ? 'Sängdags' : 'Väckningstid'}
                    </div>
                    <div className="text-2xl font-semibold text-gray-700">
                      {targetWakeTime}
                    </div>
                  </div>
                </div>
                <div className="text-gray-600">
                  {((time.cycles * 90) / 60).toFixed(1)} timmar sömn ({time.cycles} sömnperioder)
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-start space-x-4">
              <Info className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Om sömnperioder</h3>
                <p className="text-gray-600">
                  En god natts sömn består av 5-6 kompletta sömnperioder. Varje period är cirka 90 minuter lång 
                  och innehåller olika stadier av sömn, från lätt sömn till djup sömn och drömsömn (REM).
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setShowResults(false);
              setIsReverse(false);
              setSelectedHour(7);
              setSelectedMinute(0);
            }}
            className="mt-8 bg-indigo-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tillbaka
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Moon className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Sömnkalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna den perfekta tiden att gå och lägga sig eller vakna baserat på sömnperioder.
            Varje sömnperiod tar ungefär 90 minuter.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => {
                setIsReverse(false);
                setSelectedHour(7);
                setSelectedMinute(0);
              }}
              className={`px-6 py-3 rounded-lg transition-colors ${
                !isReverse 
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-100 text-gray-600 hover:bg-indigo-200'
              }`}
            >
              När vill du vakna?
            </button>
            <button
              onClick={() => {
                setIsReverse(true);
                setSelectedHour(21);
                setSelectedMinute(0);
              }}
              className={`px-6 py-3 rounded-lg transition-colors ${
                isReverse 
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-100 text-gray-600 hover:bg-indigo-200'
              }`}
            >
              När vill du sova?
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
            {isReverse ? 'När vill du gå och lägga dig?' : 'När vill du vakna?'}
          </h2>
          
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="relative">
              <select
                value={selectedHour}
                onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                className="w-24 border-2 border-indigo-200 rounded-lg px-4 py-2 appearance-none text-center focus:border-indigo-500 focus:ring-indigo-500"
              >
                {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                  <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>
                ))}
              </select>
              <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
            </div>
            <span className="text-2xl text-gray-700">:</span>
            <select
              value={selectedMinute}
              onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
              className="w-24 border-2 border-indigo-200 rounded-lg px-4 py-2 appearance-none text-center focus:border-indigo-500 focus:ring-indigo-500"
            >
              {minuteOptions.map(minute => (
                <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>

          <button
            onClick={isReverse ? calculateWakeTime : calculateBedtime}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {isReverse ? (
              <>
                <Clock className="w-5 h-5 mr-2" />
                Beräkna väckningstider
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 mr-2" />
                Beräkna sängdags
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-start space-x-4">
            <Info className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tips för bättre sömn</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Håll regelbundna sömntider</li>
                <li>• Undvik skärmar 1-2 timmar före läggdags</li>
                <li>• Se till att sovrummet är mörkt och svalt</li>
                <li>• Undvik koffein sent på dagen</li>
                <li>• Motionera regelbundet, men inte för nära sänggående</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepCalculator;
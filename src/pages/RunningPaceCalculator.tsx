import React, { useState } from 'react';
import { ArrowLeft, Timer, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaceResult {
  paceMinutes: number;
  paceSeconds: number;
  totalSeconds: number;
  speedKmh: number;
}

const RunningPaceCalculator = () => {
  const [distance, setDistance] = useState<number>(5);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [result, setResult] = useState<PaceResult | null>(null);

  const calculatePace = () => {
    // Convert all time to seconds
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    
    // Calculate pace (time per kilometer)
    const secondsPerKm = totalSeconds / distance;
    const paceMinutes = Math.floor(secondsPerKm / 60);
    const paceSeconds = Math.round(secondsPerKm % 60);
    
    // Calculate speed in km/h
    const speedKmh = (distance / totalSeconds) * 3600;

    setResult({
      paceMinutes,
      paceSeconds,
      totalSeconds: secondsPerKm,
      speedKmh
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-cyan-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Timer className="w-12 h-12 text-cyan-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Tempokalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna ditt löptempo och hastighet baserat på distans och tid
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distans (km)
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Math.max(0.1, Number(e.target.value)))}
                step="0.1"
                className="w-full border-2 border-cyan-200 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tid
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Timmar</label>
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, Math.min(99, Number(e.target.value))))}
                    min="0"
                    max="99"
                    className="w-full border-2 border-cyan-200 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Minuter</label>
                  <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
                    min="0"
                    max="59"
                    className="w-full border-2 border-cyan-200 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Sekunder</label>
                  <input
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
                    min="0"
                    max="59"
                    className="w-full border-2 border-cyan-200 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={calculatePace}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna tempo
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-cyan-50 rounded-xl p-6">
                    <div className="text-cyan-600 text-sm font-medium mb-1">Tempo per kilometer</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {result.paceMinutes}:{result.paceSeconds.toString().padStart(2, '0')} /km
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Genomsnittligt tempo
                    </div>
                  </div>

                  <div className="bg-cyan-500 rounded-xl p-6 text-white">
                    <div className="text-cyan-100 text-sm font-medium mb-1">Hastighet</div>
                    <div className="text-3xl font-bold">{result.speedKmh.toFixed(1)} km/h</div>
                    <div className="text-sm text-cyan-100 mt-2">
                      Genomsnittlig hastighet
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-cyan-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vanliga löpdistanser med denna hastighet</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[5, 10, 21.1, 42.2].map(dist => {
                      const time = (dist * result.totalSeconds);
                      const h = Math.floor(time / 3600);
                      const m = Math.floor((time % 3600) / 60);
                      const s = Math.round(time % 60);
                      return (
                        <div key={dist} className="flex items-center p-3 bg-cyan-50 rounded-lg">
                          <Trophy className="w-5 h-5 text-cyan-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {dist === 21.1 ? 'Halvmaraton' : dist === 42.2 ? 'Maraton' : `${dist}K`}
                            </div>
                            <div className="text-sm text-gray-500">
                              {h > 0 ? `${h}:` : ''}{m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips för löpning</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Ett jämnt tempo är ofta nyckeln till en framgångsrik löpning. Försök hålla ett konstant
              tempo istället för att variera hastigheten för mycket.
            </p>
            <p>
              För nybörjare rekommenderas att börja med kortare distanser och gradvis öka både
              distans och hastighet över tid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunningPaceCalculator;
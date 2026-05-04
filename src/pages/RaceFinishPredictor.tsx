import { useEffect, useState } from 'react';
import { ArrowLeft, Trophy, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCalculatorShare } from '../hooks/useCalculatorShare';
import ShareButton from '../components/ShareButton';
import { getNumberParam, getUrlParams } from '../utils/urlParams';

interface RaceResult {
  finishTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  pacePerKm: {
    minutes: number;
    seconds: number;
  };
  distanceKm: number;
  speedKmh: number;
}

const RaceFinishPredictor = () => {
  const [targetPaceMinutesInput, setTargetPaceMinutesInput] = useState<string>('4');
  const [targetPaceSecondsInput, setTargetPaceSecondsInput] = useState<string>('30');
  const [distanceInput, setDistanceInput] = useState<string>('21.1');
  const [result, setResult] = useState<RaceResult | null>(null);

  const { handleShare } = useCalculatorShare({
    params: {
      targetPaceMinutes: targetPaceMinutesInput,
      targetPaceSeconds: targetPaceSecondsInput,
      distance: distanceInput,
    },
  });

  const commonDistances = [
    { name: '5K', distance: 5 },
    { name: '10K', distance: 10 },
    { name: 'Halvmaraton', distance: 21.1 },
    { name: 'Maraton', distance: 42.2 }
  ];

  const buildRaceResult = (paceMinutes: number, paceSeconds: number, runDistance: number): RaceResult => {
    const paceInSeconds = (paceMinutes * 60) + paceSeconds;
    const totalSeconds = paceInSeconds * runDistance;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    const speedKmh = (3600 / paceInSeconds);

    return {
      finishTime: { hours, minutes, seconds },
      pacePerKm: {
        minutes: paceMinutes,
        seconds: paceSeconds
      },
      distanceKm: runDistance,
      speedKmh
    };
  };

  const parsePaceInput = (value: string): number | null => {
    if (value === '') return null;
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return null;
    return Math.max(0, Math.min(59, Math.floor(parsed)));
  };

  const parseDistanceInput = (value: string): number | null => {
    if (value === '') return null;
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return null;
    return Math.max(0.1, parsed);
  };

  const calculateFinishTime = () => {
    const paceMinutes = parsePaceInput(targetPaceMinutesInput);
    const paceSeconds = parsePaceInput(targetPaceSecondsInput);
    const runDistance = parseDistanceInput(distanceInput);

    if (paceMinutes === null || paceSeconds === null || runDistance === null) {
      setResult(null);
      return;
    }

    setTargetPaceMinutesInput(String(paceMinutes));
    setTargetPaceSecondsInput(String(paceSeconds));
    setDistanceInput(String(runDistance));
    setResult(buildRaceResult(paceMinutes, paceSeconds, runDistance));
  };

  useEffect(() => {
    const params = getUrlParams();
    if (!params.has('targetPaceMinutes') && !params.has('targetPaceSeconds') && !params.has('distance')) return;

    const paceMinutes = Math.max(0, Math.min(59, Math.floor(getNumberParam(params, 'targetPaceMinutes', 4))));
    const paceSeconds = Math.max(0, Math.min(59, Math.floor(getNumberParam(params, 'targetPaceSeconds', 30))));
    const runDistance = Math.max(0.1, getNumberParam(params, 'distance', 21.1));

    setTargetPaceMinutesInput(String(paceMinutes));
    setTargetPaceSecondsInput(String(paceSeconds));
    setDistanceInput(String(runDistance));
    setResult(buildRaceResult(paceMinutes, paceSeconds, runDistance));
  }, []);

  const formatTime = (time: { hours: number; minutes: number; seconds: number }): string => {
    return `${time.hours > 0 ? `${time.hours}:` : ''}${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-amber-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Löparkalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna din förväntade sluttid baserat på tempo och distans
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Löptempo (min/km)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Minuter</label>
                  <input
                    type="number"
                    value={targetPaceMinutesInput}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      if (nextValue === '') {
                        setTargetPaceMinutesInput('');
                        return;
                      }

                      const parsed = Number(nextValue);
                      if (Number.isNaN(parsed)) return;
                      setTargetPaceMinutesInput(String(Math.max(0, Math.min(59, Math.floor(parsed)))));
                    }}
                    min="0"
                    max="59"
                    className="w-full border-2 border-amber-200 rounded-lg px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Sekunder</label>
                  <input
                    type="number"
                    value={targetPaceSecondsInput}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      if (nextValue === '') {
                        setTargetPaceSecondsInput('');
                        return;
                      }

                      const parsed = Number(nextValue);
                      if (Number.isNaN(parsed)) return;
                      setTargetPaceSecondsInput(String(Math.max(0, Math.min(59, Math.floor(parsed)))));
                    }}
                    min="0"
                    max="59"
                    className="w-full border-2 border-amber-200 rounded-lg px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distans (km)
              </label>
              <input
                type="number"
                value={distanceInput}
                onChange={(e) => {
                  const nextValue = e.target.value;
                  if (nextValue === '') {
                    setDistanceInput('');
                    return;
                  }

                  const parsed = Number(nextValue);
                  if (Number.isNaN(parsed)) return;
                  setDistanceInput(String(Math.max(0.1, parsed)));
                }}
                step="0.1"
                className="w-full border-2 border-amber-200 rounded-lg px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {commonDistances.map((dist) => (
                <button
                  key={dist.name}
                  onClick={() => setDistanceInput(String(dist.distance))}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    Number(distanceInput) === dist.distance
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-50 text-gray-700 hover:bg-amber-100'
                  }`}
                >
                  {dist.name}
                </button>
              ))}
            </div>

            <button
              onClick={calculateFinishTime}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna sluttid
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-amber-50 rounded-xl p-6">
                    <div className="text-amber-600 text-sm font-medium mb-1">Löptempo</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {result.pacePerKm.minutes}:{result.pacePerKm.seconds.toString().padStart(2, '0')} /km
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {result.speedKmh.toFixed(1)} km/h
                    </div>
                  </div>

                  <div className="bg-amber-500 rounded-xl p-6 text-white">
                    <div className="text-amber-100 text-sm font-medium mb-1">Förväntad sluttid</div>
                    <div className="text-3xl font-bold">
                      {formatTime(result.finishTime)}
                    </div>
                    <div className="text-sm text-amber-100 mt-2">
                      För {result.distanceKm} km
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-amber-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mellantider</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[5, 10, 15, 20].map(km => {
                      if (km <= result.distanceKm) {
                        const splitSeconds = km * ((result.pacePerKm.minutes * 60) + result.pacePerKm.seconds);
                        const splitHours = Math.floor(splitSeconds / 3600);
                        const splitMinutes = Math.floor((splitSeconds % 3600) / 60);
                        const splitSecondsRem = Math.round(splitSeconds % 60);
                        
                        return (
                          <div key={km} className="flex items-center p-3 bg-amber-50 rounded-lg">
                            <Medal className="w-5 h-5 text-amber-500 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{km}K</div>
                              <div className="text-sm text-gray-500">
                                {formatTime({ hours: splitHours, minutes: splitMinutes, seconds: splitSecondsRem })}
                              </div>
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
            <ShareButton onShare={handleShare} color="amber" className="mt-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Tips för löpning</h2>
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

export default RaceFinishPredictor;
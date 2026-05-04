import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCalculatorShare } from '../hooks/useCalculatorShare';
import ShareButton from '../components/ShareButton';
import { getUrlParams, getStringParam, getNumberParam } from '../utils/urlParams';

const FAST_DURATION_OPTIONS = [12, 16, 18, 24, 36, 48, 72, 96] as const;
const START_MINUTE_OPTIONS = ['00', '15', '30', '45'] as const;

interface FastingStage {
  hours: number;
  title: string;
  description: string;
  processes: string[];
}

const FASTING_STAGES: FastingStage[] = [
  {
    hours: 12,
    title: 'Ketogenesis börjar',
    description: 'Din kropp börjar övergå från glukos till ketoner som energikälla',
    processes: [
      'Insulinnivåerna sjunker',
      'Glykogenlagren börjar tömmas',
      'Fettförbränningen ökar',
      'Autofagi-processen påbörjas',
    ],
  },
  {
    hours: 18,
    title: 'Ketoner ökar',
    description: 'Ketonnivåerna i blodet stiger markant',
    processes: [
      'Ökad fettförbränning',
      'Förbättrad mental skärpa',
      'Minskad inflammation',
      'HGH (tillväxthormon) börjar öka',
    ],
  },
  {
    hours: 24,
    title: 'Autofagi accelererar',
    description: 'Cellernas självrenande process är i full gång',
    processes: [
      'Maximal autofagi',
      'Immunsystemet börjar förnya sig',
      'Insulinkänsligheten förbättras',
      'Betydande minskning av inflammation',
    ],
  },
  {
    hours: 36,
    title: 'Optimal ketosläge',
    description: 'Kroppen är nu fullt anpassad till fettförbränning',
    processes: [
      'Maximal ketonnivå uppnås',
      'HGH-nivåer ökar med upp till 300%',
      'Betydande cellulärt reparationsarbete',
      'BDNF (hjärnans tillväxtfaktor) ökar',
    ],
  },
  {
    hours: 48,
    title: 'Immunförnyelse',
    description: 'Immunsystemet genomgår betydande förnyelse',
    processes: [
      'Stamcellsaktivering',
      'Immunsystemet börjar förnya sig',
      'Maximal fettförbränning',
      'Insulinkänsligheten på topp',
    ],
  },
  {
    hours: 72,
    title: 'Stamcellsaktivering',
    description: 'Omfattande cellförnyelse och reparation',
    processes: [
      'Maximal stamcellsproduktion',
      'Omfattande vävnadsreparation',
      'Betydande minskning av inflammation',
      'Optimerad hormonbalans',
    ],
  },
  {
    hours: 96,
    title: 'Maximal cellförnyelse',
    description: 'Kroppen genomgår omfattande cellförnyelse',
    processes: [
      'Maximal cellförnyelse',
      'Omfattande vävnadsreparation',
      'Immunsystemet helt förnyat',
      'Optimal hormonbalans uppnådd',
    ],
  },
];

const FastingCalculator = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [startHour, setStartHour] = useState(new Date().getHours().toString().padStart(2, '0'));
  const [startMinute, setStartMinute] = useState('00');
  const [duration, setDuration] = useState(16);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<FastingStage | null>(null);
  const [elapsedFasting, setElapsedFasting] = useState('0h 0m');

  const { handleShare } = useCalculatorShare({
    params: {
      startDate,
      startHour,
      startMinute,
      duration,
    },
  });

  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const params = getUrlParams();
    if (!params.has('startDate')) return;

    const date = getStringParam(params, 'startDate', '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setStartDate(date);
    }

    const hourNum = getNumberParam(params, 'startHour', new Date().getHours());
    setStartHour(Math.max(0, Math.min(23, hourNum)).toString().padStart(2, '0'));

    const minuteRaw = getStringParam(params, 'startMinute', '00');
    setStartMinute(
      START_MINUTE_OPTIONS.includes(minuteRaw as (typeof START_MINUTE_OPTIONS)[number])
        ? minuteRaw
        : '00'
    );

    const dur = getNumberParam(params, 'duration', 16);
    setDuration(
      FAST_DURATION_OPTIONS.includes(dur as (typeof FAST_DURATION_OPTIONS)[number]) ? dur : 16
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(`${startDate}T${startHour}:${startMinute}`);
      const now = new Date();
      const endTime = new Date(start.getTime() + duration * 60 * 60 * 1000);
      const nowMs = now.getTime();
      const startMs = start.getTime();
      const endMs = endTime.getTime();

      const endTimeString = endTime.toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      setEndDateTime(endTimeString);

      const cappedElapsedMs =
        nowMs >= endMs
          ? duration * 60 * 60 * 1000
          : Math.max(0, nowMs - startMs);
      const dispH = Math.floor(cappedElapsedMs / (1000 * 60 * 60));
      const dispM = Math.floor((cappedElapsedMs % (1000 * 60 * 60)) / (1000 * 60));
      setElapsedFasting(`${dispH}h ${dispM}m`);

      if (nowMs >= endMs) {
        setTimeLeft('Fastan är avslutad!');
        setProgress(100);
        const elapsedHours = duration;
        const completedStage = [...FASTING_STAGES]
          .reverse()
          .find(stage => elapsedHours >= stage.hours);
        setCurrentStage(completedStage || null);
        return;
      }

      const diff = endMs - nowMs;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${hours}h ${minutes}m`);

      const elapsedHours = (nowMs - startMs) / (1000 * 60 * 60);
      setProgress((elapsedHours / duration) * 100);

      const activeStage = [...FASTING_STAGES]
        .reverse()
        .find(stage => elapsedHours >= stage.hours);

      setCurrentStage(activeStage || null);
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, startHour, startMinute, duration]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Timer className="w-12 h-12 text-teal-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Fasta kalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Håll koll på din fasta och lär dig om kroppens olika faser under fasteperioden
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Startdatum
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starttid (timme)
                </label>
                <select
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                >
                  {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                    <option key={hour} value={hour.toString().padStart(2, '0')}>
                      {hour.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starttid (minut)
                </label>
                <select
                  value={startMinute}
                  onChange={(e) => setStartMinute(e.target.value)}
                  className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                >
                  {[0, 15, 30, 45].map(minute => (
                    <option key={minute} value={minute.toString().padStart(2, '0')}>
                      {minute.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fastalängd (timmar)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full border-2 border-teal-200 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
              >
                {FAST_DURATION_OPTIONS.map(hours => (
                  <option key={hours} value={hours}>
                    {hours} timmar
                  </option>
                ))}
              </select>
            </div>

            <ShareButton onShare={handleShare} color="teal" className="mt-6" />

            <div className="bg-teal-50 rounded-xl p-6">
              <div className="text-teal-600 text-sm font-medium mb-1">Fastat i</div>
              <div className="text-3xl font-bold text-gray-900 tabular-nums">{elapsedFasting}</div>
            </div>

            <div className="bg-teal-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-teal-600 text-sm font-medium mb-1">Tid kvar</div>
                  <div className="text-3xl font-bold text-gray-900">{timeLeft}</div>
                </div>
                <div className="text-right">
                  <div className="text-teal-600 text-sm font-medium mb-1">Slutdatum</div>
                  <div className="text-xl font-bold text-gray-900">{endDateTime}</div>
                </div>
              </div>
              <div className="w-full bg-teal-200 rounded-full h-2">
                <div 
                  className="bg-teal-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>

            {currentStage && (
              <div className="bg-teal-500 text-white rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">{currentStage.title}</h3>
                <p className="text-teal-100 mb-4">{currentStage.description}</p>
                <ul className="space-y-2">
                  {currentStage.processes.map((process, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-teal-200 rounded-full mr-2" />
                      {process}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-teal-600" />
            Fastans olika faser
          </h2>
          
          <div className="space-y-6">
            {FASTING_STAGES.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full mr-4 flex-shrink-0">
                    <span className="text-teal-600 font-semibold">{stage.hours}h</span>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-6 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{stage.title}</h3>
                    <p className="text-gray-600 mb-4">{stage.description}</p>
                    <ul className="space-y-2">
                      {stage.processes.map((process, processIndex) => (
                        <li key={processIndex} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mr-2" />
                          {process}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {index < FASTING_STAGES.length - 1 && (
                  <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-teal-100" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastingCalculator;
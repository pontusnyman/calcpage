import React, { useState } from 'react';
import { ArrowLeft, Calendar, Heart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OvulationResult {
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  nextPeriodDate: Date;
}

const OvulationCalculator = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [result, setResult] = useState<OvulationResult | null>(null);

  const calculateOvulation = () => {
    const periodDate = new Date(lastPeriodDate);
    
    // Calculate ovulation date (typically 14 days before next period)
    const ovulationDate = new Date(periodDate);
    ovulationDate.setDate(periodDate.getDate() + cycleLength - 14);
    
    // Calculate fertile window (5 days before and 1 day after ovulation)
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(ovulationDate.getDate() - 5);
    
    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(ovulationDate.getDate() + 1);
    
    // Calculate next period
    const nextPeriodDate = new Date(periodDate);
    nextPeriodDate.setDate(periodDate.getDate() + cycleLength);

    setResult({
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      nextPeriodDate
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('sv-SE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const symptoms = [
    {
      title: "Förändringar i flytningar",
      description: "Ökad mängd och klarare konsistens, liknar äggvita"
    },
    {
      title: "Kroppstemperatur",
      description: "En liten ökning i basaltemperatur efter ägglossning"
    },
    {
      title: "Bröstömhet",
      description: "Ökad känslighet i brösten"
    },
    {
      title: "Buksmärta",
      description: "Mild smärta eller kramper i ena sidan av buken"
    },
    {
      title: "Humörförändringar",
      description: "Känslomässiga svängningar på grund av hormonförändringar"
    }
  ];

  const fertilityTips = [
    "Ha samlag regelbundet under den fertila perioden",
    "Undvik stress och försök att hålla en hälsosam livsstil",
    "Ät en balanserad kost rik på vitaminer och mineraler",
    "Motionera regelbundet men undvik överdriven träning",
    "Använd en basaltemperaturmätare för att spåra ägglossning"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-emerald-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Ägglossningskalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna din ägglossning genom att ange första dagen av din senaste mens
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Första dagen av din senaste mens
              </label>
              <input
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                className="w-full border-2 border-emerald-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Menstruationscykel (dagar)
              </label>
              <input
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(Math.max(21, Math.min(35, parseInt(e.target.value))))}
                min="21"
                max="35"
                className="w-full border-2 border-emerald-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                En normal menscykel är vanligtvis mellan 21 och 35 dagar
              </p>
            </div>

            <button
              onClick={calculateOvulation}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna ägglossning
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50 rounded-xl p-6">
                    <div className="text-emerald-600 text-sm font-medium mb-1">Ägglossning</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatDate(result.ovulationDate)}
                    </div>
                  </div>

                  <div className="bg-emerald-500 rounded-xl p-6 text-white">
                    <div className="text-emerald-100 text-sm font-medium mb-1">Nästa mens</div>
                    <div className="text-xl font-bold">
                      {formatDate(result.nextPeriodDate)}
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Fertil period</h3>
                  <p className="text-gray-600">
                    Din mest fertila period är från{' '}
                    <span className="font-semibold">{formatDate(result.fertileWindowStart)}</span>
                    {' '}till{' '}
                    <span className="font-semibold">{formatDate(result.fertileWindowEnd)}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-emerald-600" />
              Symtom på ägglossning
            </h2>
            <div className="space-y-4">
              {symptoms.map((symptom, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <h3 className="font-medium text-gray-900 mb-1">{symptom.title}</h3>
                  <p className="text-gray-600">{symptom.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-emerald-600" />
              Tips för ökad fertilitet
            </h2>
            <ul className="space-y-3">
              {fertilityTips.map((tip, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Om ägglossning</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Ägglossning är processen där ett ägg släpps från en av äggstockarna och är redo att befruktas. Den inträffar 
              vanligtvis en gång per menscykel och markerar den mest fertila perioden. För att bli gravid krävs att spermier når 
              ägget under eller strax efter denna process.
            </p>
            <p>
              Ett befruktat ägg kan överleva i 24 timmar efter ägglossningen, medan spermier kan överleva i kvinnans kropp i 
              upp till 5 dagar. Detta gör dagarna som leder fram till ägglossningen lika viktiga för att bli gravid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvulationCalculator;
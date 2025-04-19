import React, { useState } from 'react';
import { ArrowLeft, Heart, Activity, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Zone {
  name: string;
  description: string;
  minHR: number;
  maxHR: number;
  color: string;
  benefits: string[];
}

interface HRZonesResult {
  maxHR: number;
  zones: Zone[];
}

const HeartRateZonesCalculator = () => {
  const [age, setAge] = useState<number>(30);
  const [restingHR, setRestingHR] = useState<number>(60);
  const [calculationMethod, setCalculationMethod] = useState<'age' | 'hrr'>('age');
  const [result, setResult] = useState<HRZonesResult | null>(null);

  const calculateZones = () => {
    let maxHR: number;
    let zones: Zone[];

    if (calculationMethod === 'age') {
      // Using age-based formula (220 - age)
      maxHR = 220 - age;

      zones = [
        {
          name: 'Zon 1 - Uppvärmning',
          description: '50-60% av maxpuls',
          minHR: Math.round(maxHR * 0.5),
          maxHR: Math.round(maxHR * 0.6),
          color: 'bg-indigo-100',
          benefits: [
            'Återhämtning och uppvärmning',
            'Förbättrar grundkondition',
            'Minskar stress',
            'Perfekt för nybörjare'
          ]
        },
        {
          name: 'Zon 2 - Fettförbränning',
          description: '60-70% av maxpuls',
          minHR: Math.round(maxHR * 0.6),
          maxHR: Math.round(maxHR * 0.7),
          color: 'bg-indigo-200',
          benefits: [
            'Optimal fettförbränning',
            'Förbättrar uthållighet',
            'Bygger aerob grund',
            'Lätt att bibehålla längre tid'
          ]
        },
        {
          name: 'Zon 3 - Aerob',
          description: '70-80% av maxpuls',
          minHR: Math.round(maxHR * 0.7),
          maxHR: Math.round(maxHR * 0.8),
          color: 'bg-indigo-300',
          benefits: [
            'Förbättrar aerob kapacitet',
            'Ökar uthållighet',
            'Effektiv träning',
            'Bygger mental styrka'
          ]
        },
        {
          name: 'Zon 4 - Anaerob',
          description: '80-90% av maxpuls',
          minHR: Math.round(maxHR * 0.8),
          maxHR: Math.round(maxHR * 0.9),
          color: 'bg-indigo-400',
          benefits: [
            'Ökar maximal prestationsförmåga',
            'Förbättrar tempotolerans',
            'Höjer mjölksyratröskeln',
            'Intensiv träning'
          ]
        },
        {
          name: 'Zon 5 - Maximal',
          description: '90-100% av maxpuls',
          minHR: Math.round(maxHR * 0.9),
          maxHR: Math.round(maxHR),
          color: 'bg-indigo-500',
          benefits: [
            'Maximal prestationsförmåga',
            'Förbättrar sprintförmåga',
            'Ökar explosivitet',
            'Mycket intensiv träning'
          ]
        }
      ];
    } else {
      // Using Heart Rate Reserve (Karvonen) method
      maxHR = 220 - age;
      const hrr = maxHR - restingHR;

      zones = [
        {
          name: 'Zon 1 - Uppvärmning',
          description: '50-60% av HRR',
          minHR: Math.round(restingHR + (hrr * 0.5)),
          maxHR: Math.round(restingHR + (hrr * 0.6)),
          color: 'bg-indigo-100',
          benefits: [
            'Återhämtning och uppvärmning',
            'Förbättrar grundkondition',
            'Minskar stress',
            'Perfekt för nybörjare'
          ]
        },
        {
          name: 'Zon 2 - Fettförbränning',
          description: '60-70% av HRR',
          minHR: Math.round(restingHR + (hrr * 0.6)),
          maxHR: Math.round(restingHR + (hrr * 0.7)),
          color: 'bg-indigo-200',
          benefits: [
            'Optimal fettförbränning',
            'Förbättrar uthållighet',
            'Bygger aerob grund',
            'Lätt att bibehålla längre tid'
          ]
        },
        {
          name: 'Zon 3 - Aerob',
          description: '70-80% av HRR',
          minHR: Math.round(restingHR + (hrr * 0.7)),
          maxHR: Math.round(restingHR + (hrr * 0.8)),
          color: 'bg-indigo-300',
          benefits: [
            'Förbättrar aerob kapacitet',
            'Ökar uthållighet',
            'Effektiv träning',
            'Bygger mental styrka'
          ]
        },
        {
          name: 'Zon 4 - Anaerob',
          description: '80-90% av HRR',
          minHR: Math.round(restingHR + (hrr * 0.8)),
          maxHR: Math.round(restingHR + (hrr * 0.9)),
          color: 'bg-indigo-400',
          benefits: [
            'Ökar maximal prestationsförmåga',
            'Förbättrar tempotolerans',
            'Höjer mjölksyratröskeln',
            'Intensiv träning'
          ]
        },
        {
          name: 'Zon 5 - Maximal',
          description: '90-100% av HRR',
          minHR: Math.round(restingHR + (hrr * 0.9)),
          maxHR: maxHR,
          color: 'bg-indigo-500',
          benefits: [
            'Maximal prestationsförmåga',
            'Förbättrar sprintförmåga',
            'Ökar explosivitet',
            'Mycket intensiv träning'
          ]
        }
      ];
    }

    setResult({ maxHR, zones });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Pulszoner Kalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna dina optimala pulszoner för effektiv träning
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beräkningsmetod
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCalculationMethod('age')}
                  className={`py-3 px-4 rounded-lg text-center transition-colors ${
                    calculationMethod === 'age'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-indigo-100 text-gray-700 hover:bg-indigo-200'
                  }`}
                >
                  Åldersbaserad
                </button>
                <button
                  onClick={() => setCalculationMethod('hrr')}
                  className={`py-3 px-4 rounded-lg text-center transition-colors ${
                    calculationMethod === 'hrr'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-indigo-100 text-gray-700 hover:bg-indigo-200'
                  }`}
                >
                  Vilopuls (HRR)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ålder
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Math.max(1, Math.min(120, Number(e.target.value))))}
                className="w-full border-2 border-indigo-200 rounded-lg px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {calculationMethod === 'hrr' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vilopuls (slag/min)
                </label>
                <input
                  type="number"
                  value={restingHR}
                  onChange={(e) => setRestingHR(Math.max(30, Math.min(120, Number(e.target.value))))}
                  className="w-full border-2 border-indigo-200 rounded-lg px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )}

            <button
              onClick={calculateZones}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna pulszoner
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="bg-indigo-500 rounded-xl p-6 text-white">
                  <div className="text-indigo-100 text-sm font-medium mb-1">Maxpuls</div>
                  <div className="text-3xl font-bold">{result.maxHR} slag/min</div>
                  <div className="text-indigo-100 mt-2">
                    Beräknad med {calculationMethod === 'age' ? 'åldersbaserad metod' : 'HRR-metod'}
                  </div>
                </div>

                <div className="space-y-4">
                  {result.zones.map((zone, index) => (
                    <div key={index} className={`${zone.color} rounded-xl p-6`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{zone.name}</h3>
                          <p className="text-gray-600">{zone.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-indigo-600">
                            {zone.minHR}-{zone.maxHR}
                          </div>
                          <div className="text-sm text-gray-500">slag/min</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {zone.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-indigo-600" />
              Träning i olika zoner
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Effektiv träning innebär att variera intensiteten mellan olika pulszoner. Varje zon har 
                sina specifika fördelar och bidrar till olika aspekter av din träning.
              </p>
              <p>
                För bästa resultat, kombinera träning i olika zoner och anpassa efter dina träningsmål. 
                Nybörjare bör fokusera mer på de lägre zonerna för att bygga en bra grund.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-indigo-600" />
              Tips för pulsbaserad träning
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
                Använd pulsklocka för noggrann mätning
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
                Värm upp ordentligt innan intensiv träning
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
                Lyssna på din kropp och anpassa intensiteten
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
                Variera träningen mellan olika zoner
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartRateZonesCalculator;
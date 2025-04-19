import React, { useState } from 'react';
import { ArrowLeft, Zap, Calculator, Share2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ApplianceUsage {
  watts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  quantity: number;
}

interface EnergyResult {
  monthlyKwh: number;
  yearlyKwh: number;
  monthlyCost: number;
  yearlyCost: number;
  co2Emissions: number;
}

const EnergySavingsCalculator = () => {
  const [pricePerKwh, setPricePerKwh] = useState<number>(2.5);
  const [usage, setUsage] = useState<ApplianceUsage>({
    watts: 5,
    hoursPerDay: 24,
    daysPerMonth: 30,
    quantity: 1
  });
  const [result, setResult] = useState<EnergyResult | null>(null);
  const [shareButtonText, setShareButtonText] = useState('Dela');

  const commonAppliances = [
    { name: 'Kylskåp', watts: 150 },
    { name: 'TV', watts: 100 },
    { name: 'Dator', watts: 200 },
    { name: 'LED-lampa', watts: 10 },
    { name: 'Tvättmaskin', watts: 500 },
    { name: 'Diskmaskin', watts: 1500 },
    { name: 'Spis', watts: 2000 },
    { name: 'Luftvärmepump', watts: 1000 }
  ];

  const calculateEnergy = () => {
    // Calculate kWh per month
    const hoursPerMonth = usage.hoursPerDay * usage.daysPerMonth;
    const monthlyKwh = (usage.watts * hoursPerMonth * usage.quantity) / 1000;
    const yearlyKwh = monthlyKwh * 12;

    // Calculate costs
    const monthlyCost = monthlyKwh * pricePerKwh;
    const yearlyCost = monthlyCost * 12;

    // Calculate CO2 emissions (using Swedish average of 13g CO2/kWh)
    const co2Emissions = yearlyKwh * 0.013;

    setResult({
      monthlyKwh,
      yearlyKwh,
      monthlyCost,
      yearlyCost,
      co2Emissions
    });
  };

  const handleShare = async () => {
    const shareParams = new URLSearchParams({
      w: usage.watts.toString(),
      h: usage.hoursPerDay.toString(),
      d: usage.daysPerMonth.toString(),
      q: usage.quantity.toString(),
      p: pricePerKwh.toString()
    });

    const shareUrl = `${window.location.origin}/energikalkylator?${shareParams.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareButtonText('Kopierad!');
      setTimeout(() => setShareButtonText('Dela'), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
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
            <Zap className="w-12 h-12 text-cyan-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Energikalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna energiförbrukning och kostnader för dina elektriska apparater
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Elpris (kr/kWh)
              </label>
              <input
                type="number"
                value={pricePerKwh}
                onChange={(e) => setPricePerKwh(Math.max(0, Number(e.target.value)))}
                step="0.01"
                className="w-full border-2 border-cyan-200 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Effekt (watt)
              </label>
              <input
                type="number"
                value={usage.watts}
                onChange={(e) => setUsage({ ...usage, watts: Math.max(0, Number(e.target.value)) })}
                className="w-full border-2 border-cyan-200 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {commonAppliances.map(appliance => (
                <button
                  key={appliance.name}
                  onClick={() => setUsage({ ...usage, watts: appliance.watts })}
                  className={`p-2 rounded-lg text-center transition-colors ${
                    usage.watts === appliance.watts
                      ? 'bg-cyan-500 text-white'
                      : 'bg-cyan-50 text-gray-700 hover:bg-cyan-100'
                  }`}
                >
                  <div className="font-medium">{appliance.name}</div>
                  <div className="text-sm">{appliance.watts}W</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timmar per dag
                </label>
                <input
                  type="number"
                  value={usage.hoursPerDay}
                  onChange={(e) => setUsage({ ...usage, hoursPerDay: Math.max(0, Math.min(24, Number(e.target.value))) })}
                  className="w-full border-2 border-cyan-200 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dagar per månad
                </label>
                <input
                  type="number"
                  value={usage.daysPerMonth}
                  onChange={(e) => setUsage({ ...usage, daysPerMonth: Math.max(0, Math.min(31, Number(e.target.value))) })}
                  className="w-full border-2 border-cyan-200 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Antal enheter
                </label>
                <input
                  type="number"
                  value={usage.quantity}
                  onChange={(e) => setUsage({ ...usage, quantity: Math.max(1, Number(e.target.value)) })}
                  className="w-full border-2 border-cyan-200 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
            </div>

            <button
              onClick={calculateEnergy}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna energiförbrukning
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-cyan-50 rounded-xl p-6">
                    <div className="text-cyan-600 text-sm font-medium mb-1">Månadskostnad</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {Math.round(result.monthlyCost)} kr
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {result.monthlyKwh.toFixed(1)} kWh per månad
                    </div>
                  </div>

                  <div className="bg-cyan-500 rounded-xl p-6 text-white">
                    <div className="text-cyan-100 text-sm font-medium mb-1">Årskostnad</div>
                    <div className="text-3xl font-bold">
                      {Math.round(result.yearlyCost)} kr
                    </div>
                    <div className="text-sm text-cyan-100 mt-2">
                      {result.yearlyKwh.toFixed(1)} kWh per år
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-50 rounded-xl p-6">
                  <div className="text-cyan-600 text-sm font-medium mb-1">CO₂-utsläpp</div>
                  <div className="text-xl font-bold text-gray-900">
                    {result.co2Emissions.toFixed(2)} kg CO₂ per år
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Baserat på svensk elmix
                  </div>
                </div>

                <div className="bg-white border-2 border-cyan-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 text-cyan-500 mr-2" />
                    Jämförelse med energieffektiva alternativ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <div className="font-medium text-gray-900">50% lägre effekt</div>
                      <div className="text-cyan-600 font-semibold">
                        Sparar {Math.round(result.yearlyCost * 0.5)} kr/år
                      </div>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <div className="font-medium text-gray-900">75% lägre effekt</div>
                      <div className="text-cyan-600 font-semibold">
                        Sparar {Math.round(result.yearlyCost * 0.75)} kr/år
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  {shareButtonText}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-cyan-600" />
              Tips för energibesparing
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Byt till LED-lampor</li>
              <li>• Stäng av apparater helt istället för standby</li>
              <li>• Använd timer på elektronik</li>
              <li>• Välj energieffektiva vitvaror (A+++)</li>
              <li>• Underhåll och rengör apparater regelbundet</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2 text-cyan-600" />
              Om energiförbrukning
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Energiförbrukningen mäts i kilowattimmar (kWh). En kilowattimme är den energi 
                som går åt när en apparat på 1000 watt används i en timme.
              </p>
              <p>
                Svensk el har ett av världens lägsta CO₂-utsläpp tack vare hög andel 
                vattenkraft och kärnkraft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergySavingsCalculator;
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Share2, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthday: Date;
  daysUntilBirthday: number;
}

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>(
    new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [result, setResult] = useState<AgeResult | null>(null);
  const [shareButtonText, setShareButtonText] = useState('Dela');

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Adjust for negative months or days
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birth.getDate());
      days = Math.floor((today.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24));
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate total days
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      nextBirthday,
      daysUntilBirthday
    });
  };

  const handleShare = async () => {
    const shareParams = new URLSearchParams({
      bd: birthDate
    });

    const shareUrl = `${window.location.origin}/alderkalkylator?${shareParams.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareButtonText('Kopierad!');
      setTimeout(() => setShareButtonText('Dela'), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('sv-SE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Ålderskalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna din exakta ålder i år, månader och dagar
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Födelsedatum
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <button
              onClick={calculateAge}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna ålder
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-purple-50 rounded-xl p-6">
                    <div className="text-purple-600 text-sm font-medium mb-1">År</div>
                    <div className="text-3xl font-bold text-gray-900">{result.years}</div>
                  </div>

                  <div className="bg-purple-500 rounded-xl p-6 text-white">
                    <div className="text-purple-100 text-sm font-medium mb-1">Månader</div>
                    <div className="text-3xl font-bold">{result.months}</div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6">
                    <div className="text-purple-600 text-sm font-medium mb-1">Dagar</div>
                    <div className="text-3xl font-bold text-gray-900">{result.days}</div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-purple-600 text-sm font-medium mb-1">Totalt antal dagar</div>
                      <div className="text-2xl font-bold text-gray-900">{result.totalDays.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-purple-600 text-sm font-medium mb-1">Nästa födelsedag</div>
                      <div className="text-lg font-bold text-gray-900">Om {result.daysUntilBirthday} dagar</div>
                      <div className="text-sm text-gray-500">{formatDate(result.nextBirthday)}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 text-purple-500 mr-2" />
                    Andra milstolpar
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-medium text-gray-900">10,000 dagar</div>
                      <div className="text-purple-600">
                        {result.totalDays >= 10000 ? 'Uppnått!' : `Om ${10000 - result.totalDays} dagar`}
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-medium text-gray-900">20,000 dagar</div>
                      <div className="text-purple-600">
                        {result.totalDays >= 20000 ? 'Uppnått!' : `Om ${20000 - result.totalDays} dagar`}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  {shareButtonText}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Om åldersberäkning</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Åldersberäkningen tar hänsyn till skottår och variationer i månadernas längd för att ge 
              dig en exakt ålder ned till dagen.
            </p>
            <p>
              Din nästa födelsedag beräknas automatiskt, och du kan se hur många dagar det är kvar 
              tills du får fira igen!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
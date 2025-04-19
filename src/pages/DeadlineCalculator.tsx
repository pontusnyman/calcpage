import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Share2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeadlineResult {
  dueDate: Date;
  workingDays: number;
  totalDays: number;
  excludedDays: number;
}

const DeadlineCalculator = () => {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState<number>(10);
  const [includeWeekends, setIncludeWeekends] = useState<boolean>(false);
  const [result, setResult] = useState<DeadlineResult | null>(null);
  const [shareButtonText, setShareButtonText] = useState('Dela');

  useEffect(() => {
    // Parse URL parameters on component mount
    const params = new URLSearchParams(window.location.search);
    if (params.has('start')) {
      setStartDate(params.get('start') || new Date().toISOString().split('T')[0]);
      setDuration(parseInt(params.get('duration') || '10'));
      setIncludeWeekends(params.get('weekends') === 'true');
      calculateDeadline();
    }
  }, []);

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const calculateDeadline = () => {
    const start = new Date(startDate);
    let daysToAdd = duration;
    let currentDate = new Date(start);
    let excludedDays = 0;

    if (!includeWeekends) {
      while (daysToAdd > 0) {
        currentDate = addDays(currentDate, 1);
        if (!isWeekend(currentDate)) {
          daysToAdd--;
        } else {
          excludedDays++;
        }
      }
    } else {
      currentDate = addDays(start, duration);
    }

    setResult({
      dueDate: currentDate,
      workingDays: duration,
      totalDays: duration + excludedDays,
      excludedDays
    });
  };

  const handleShare = async () => {
    const shareParams = new URLSearchParams({
      start: startDate,
      duration: duration.toString(),
      weekends: includeWeekends.toString()
    });

    const shareUrl = `${window.location.origin}/deadlinekalkylator?${shareParams.toString()}`;

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-slate-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Deadline Kalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna slutdatum baserat på startdatum och arbetsdagar
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
                className="w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Antal arbetsdagar
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                min="1"
                className="w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="weekends"
                checked={includeWeekends}
                onChange={(e) => setIncludeWeekends(e.target.checked)}
                className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
              />
              <label htmlFor="weekends" className="ml-2 block text-sm text-gray-700">
                Inkludera helger i beräkningen
              </label>
            </div>

            <button
              onClick={calculateDeadline}
              className="w-full bg-slate-500 hover:bg-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna deadline
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="text-slate-600 text-sm font-medium mb-1">Startdatum</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatDate(new Date(startDate))}
                    </div>
                  </div>

                  <div className="bg-slate-500 rounded-xl p-6 text-white">
                    <div className="text-slate-100 text-sm font-medium mb-1">Deadline</div>
                    <div className="text-xl font-bold">
                      {formatDate(result.dueDate)}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-slate-600 text-sm font-medium">Arbetsdagar</div>
                      <div className="text-2xl font-bold text-gray-900">{result.workingDays}</div>
                    </div>
                    <div>
                      <div className="text-slate-600 text-sm font-medium">Helgdagar</div>
                      <div className="text-2xl font-bold text-gray-900">{result.excludedDays}</div>
                    </div>
                    <div>
                      <div className="text-slate-600 text-sm font-medium">Totalt antal dagar</div>
                      <div className="text-2xl font-bold text-gray-900">{result.totalDays}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  {shareButtonText}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-start space-x-4">
            <Info className="w-6 h-6 text-slate-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Om deadline-beräkning</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Deadline-kalkylatorn hjälper dig att beräkna slutdatum för projekt eller uppgifter 
                  baserat på startdatum och antal arbetsdagar.
                </p>
                <p>
                  Du kan välja att inkludera eller exkludera helger i beräkningen, och dela resultatet 
                  med andra genom en unik länk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeadlineCalculator;
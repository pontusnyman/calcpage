import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Share2, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  percentageComplete: number;
}

interface SavedDate {
  title: string;
  date: string;
  emoji: string;
}

const CountdownCalculator = () => {
  const [targetDate, setTargetDate] = useState<string>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [eventTitle, setEventTitle] = useState<string>('Semester');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('🏖️');
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [shareButtonText, setShareButtonText] = useState('Dela');
  const [savedDates, setSavedDates] = useState<SavedDate[]>([]);

  const emojis = ['🏖️', '👶', '🎓', '🎂', '💍', '✈️', '🎄', '🎉', '❤️', '🏠'];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Calculate total days and percentage
        const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
        const originalDifference = target.getTime() - new Date(Date.now()).getTime();
        const totalOriginalDays = Math.ceil(originalDifference / (1000 * 60 * 60 * 24));
        const percentageComplete = ((totalOriginalDays - totalDays) / totalOriginalDays) * 100;

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
          totalDays,
          percentageComplete
        });
      } else {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
          percentageComplete: 100
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleShare = async () => {
    const shareParams = new URLSearchParams({
      date: targetDate,
      title: eventTitle,
      emoji: selectedEmoji
    });

    const shareUrl = `${window.location.origin}/nedrakning?${shareParams.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareButtonText('Kopierad!');
      setTimeout(() => setShareButtonText('Dela'), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const saveDate = () => {
    const newDate: SavedDate = {
      title: eventTitle,
      date: targetDate,
      emoji: selectedEmoji
    };
    setSavedDates([...savedDates, newDate]);
  };

  const loadSavedDate = (saved: SavedDate) => {
    setEventTitle(saved.title);
    setTargetDate(saved.date);
    setSelectedEmoji(saved.emoji);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-pink-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Nedräkningskalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Räkna ner till viktiga datum som semester, förlossning eller andra speciella tillfällen
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Händelse
              </label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="T.ex. Semester, Förlossning, Bröllop"
                className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Datum
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Välj emoji
              </label>
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-2xl p-2 rounded-lg ${
                      selectedEmoji === emoji
                        ? 'bg-pink-500 text-white'
                        : 'bg-pink-50 hover:bg-pink-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Share2 className="w-5 h-5 mr-2" />
                {shareButtonText}
              </button>

              <button
                onClick={saveDate}
                className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Spara datum
              </button>
            </div>

            {timeRemaining && (
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">{selectedEmoji}</div>
                  <h2 className="text-2xl font-bold text-gray-900">{eventTitle}</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-gray-900">{timeRemaining.days}</div>
                    <div className="text-sm text-gray-500">Dagar</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-gray-900">{timeRemaining.hours}</div>
                    <div className="text-sm text-gray-500">Timmar</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-gray-900">{timeRemaining.minutes}</div>
                    <div className="text-sm text-gray-500">Minuter</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-gray-900">{timeRemaining.seconds}</div>
                    <div className="text-sm text-gray-500">Sekunder</div>
                  </div>
                </div>

                <div className="bg-pink-500 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-pink-100">Förfluten tid</div>
                    <div className="font-bold">{Math.round(timeRemaining.percentageComplete)}%</div>
                  </div>
                  <div className="w-full bg-pink-300 rounded-full h-2.5">
                    <div
                      className="bg-white h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${timeRemaining.percentageComplete}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-pink-600">Totalt antal dagar kvar</div>
                      <div className="text-2xl font-bold text-gray-900">{timeRemaining.totalDays}</div>
                    </div>
                    <Clock className="w-8 h-8 text-pink-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {savedDates.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4">Sparade datum</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedDates.map((saved, index) => (
                <button
                  key={index}
                  onClick={() => loadSavedDate(saved)}
                  className="flex items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <span className="text-2xl mr-3">{saved.emoji}</span>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{saved.title}</div>
                    <div className="text-sm text-gray-500">{new Date(saved.date).toLocaleDateString()}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4">Tips</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Spara flera datum för att hålla koll på olika händelser</li>
              <li>• Dela nedräkningen med vänner och familj</li>
              <li>• Använd emojis för att göra nedräkningen mer personlig</li>
              <li>• Följ förloppet med förloppsindikatorn</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4">Vanliga nedräkningar</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Populära händelser att räkna ner till inkluderar semestrar, födelsedagar, 
                bröllop, examensdag och förlossningar.
              </p>
              <p>
                Du kan spara flera datum och enkelt växla mellan dem för att hålla koll 
                på alla dina viktiga händelser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownCalculator;
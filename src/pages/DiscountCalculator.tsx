import React, { useState } from 'react';
import { ArrowLeft, Calculator, Percent, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DiscountResult {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  savingsPercentage: number;
}

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState<number>(1000);
  const [discountType, setDiscountType] = useState<'percentage' | 'amount'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [result, setResult] = useState<DiscountResult | null>(null);
  const [shareButtonText, setShareButtonText] = useState('Dela');

  const calculateDiscount = () => {
    let discountAmount: number;
    
    if (discountType === 'percentage') {
      discountAmount = (originalPrice * discountValue) / 100;
    } else {
      discountAmount = discountValue;
    }

    const finalPrice = originalPrice - discountAmount;
    const savingsPercentage = (discountAmount / originalPrice) * 100;

    setResult({
      originalPrice,
      discountAmount,
      finalPrice,
      savingsPercentage
    });
  };

  const handleShare = async () => {
    const shareParams = new URLSearchParams({
      p: originalPrice.toString(),
      t: discountType,
      v: discountValue.toString()
    });

    const shareUrl = `${window.location.origin}/rabattkalkylator?${shareParams.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareButtonText('Kopierad!');
      setTimeout(() => setShareButtonText('Dela'), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const commonDiscounts = [10, 20, 25, 30, 50, 70];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till kalkylatorer
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Percent className="w-12 h-12 text-yellow-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Rabattkalkylator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beräkna slutpris efter rabatt och se hur mycket du sparar
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordinarie pris (kr)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-yellow-200 rounded-lg px-4 py-2 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rabatttyp
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDiscountType('percentage')}
                  className={`py-2 px-4 rounded-lg text-center transition-colors ${
                    discountType === 'percentage'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-yellow-100 text-gray-700 hover:bg-yellow-200'
                  }`}
                >
                  Procent (%)
                </button>
                <button
                  onClick={() => setDiscountType('amount')}
                  className={`py-2 px-4 rounded-lg text-center transition-colors ${
                    discountType === 'amount'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-yellow-100 text-gray-700 hover:bg-yellow-200'
                  }`}
                >
                  Belopp (kr)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {discountType === 'percentage' ? 'Rabatt (%)' : 'Rabatt (kr)'}
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(Math.max(0, Number(e.target.value)))}
                className="w-full border-2 border-yellow-200 rounded-lg px-4 py-2 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            {discountType === 'percentage' && (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {commonDiscounts.map(discount => (
                  <button
                    key={discount}
                    onClick={() => setDiscountValue(discount)}
                    className={`p-2 rounded-lg text-center transition-colors ${
                      discountValue === discount
                        ? 'bg-yellow-500 text-white'
                        : 'bg-yellow-50 text-gray-700 hover:bg-yellow-100'
                    }`}
                  >
                    {discount}%
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={calculateDiscount}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Beräkna rabatt
            </button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <div className="text-yellow-600 text-sm font-medium mb-1">Du sparar</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {Math.round(result.discountAmount).toLocaleString()} kr
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {result.savingsPercentage.toFixed(1)}% rabatt
                    </div>
                  </div>

                  <div className="bg-yellow-500 rounded-xl p-6 text-white">
                    <div className="text-yellow-100 text-sm font-medium mb-1">Slutpris</div>
                    <div className="text-3xl font-bold">
                      {Math.round(result.finalPrice).toLocaleString()} kr
                    </div>
                    <div className="text-sm text-yellow-100 mt-2">
                      Ordinarie pris: {result.originalPrice.toLocaleString()} kr
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-yellow-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 text-yellow-500 mr-2" />
                    Andra belopp med samma rabatt
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[500, 1000, 2000, 5000].map(price => {
                      const discount = discountType === 'percentage'
                        ? (price * discountValue) / 100
                        : discountValue;
                      return (
                        <div key={price} className="p-4 bg-yellow-50 rounded-lg">
                          <div className="font-medium text-gray-900">{price} kr</div>
                          <div className="text-yellow-600 font-semibold">
                            {Math.round(price - discount)} kr
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
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
            <h2 className="text-xl font-semibold mb-4">Tips för smart shopping</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Jämför priser mellan olika butiker</li>
              <li>• Håll koll på säsongsreor</li>
              <li>• Registrera dig för nyhetsbrev</li>
              <li>• Använd rabattkoder</li>
              <li>• Kolla prisutvecklingen över tid</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4">Vanliga rabatter</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                De vanligaste rabatterna i Sverige ligger mellan 20-30%. Under större 
                reor kan rabatterna gå upp till 50-70%.
              </p>
              <p>
                Kom ihåg att en bra affär inte bara handlar om rabatten, utan också 
                om produktens faktiska värde och kvalitet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCalculator;
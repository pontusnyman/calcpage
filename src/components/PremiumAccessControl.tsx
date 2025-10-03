import React from 'react';
import { usePremium } from '../contexts/PremiumContext';
import { Crown, X } from 'lucide-react';

interface PremiumAccessControlProps {
  calculatorId: string;
  children: React.ReactNode;
}

const PremiumAccessControl: React.FC<PremiumAccessControlProps> = ({ 
  calculatorId, 
  children 
}) => {
  const { 
    isCalculatorPremium, 
    canAccessCalculator, 
    showUpgradeModal, 
    setShowUpgradeModal 
  } = usePremium();

  const isPremiumCalculator = isCalculatorPremium(calculatorId);
  const hasAccess = canAccessCalculator(calculatorId);

  // If it's not a premium calculator or user has access, show the content
  if (!isPremiumCalculator || hasAccess) {
    return <>{children}</>;
  }

  // Show premium upgrade prompt
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="currentColor" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Premium Kalkylator
          </h2>
          <p className="text-gray-600">
            Denna kalkylator är endast tillgänglig för Premium-användare.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Premium-fördelar:
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Tillgång till alla premium-kalkylatorer</li>
              <li>• Avancerade funktioner och beräkningar</li>
              <li>• Ingen reklam</li>
              <li>• Prioriterad support</li>
            </ul>
          </div>

          <button
            onClick={() => setShowUpgradeModal(true)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Uppgradera till Premium
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
          >
            Tillbaka
          </button>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Uppgradera till Premium
              </h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-2" fill="currentColor" />
                <p className="text-gray-600">
                  Få tillgång till alla premium-kalkylatorer och funktioner
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Premium inkluderar:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Alla premium-kalkylatorer</li>
                  <li>• Avancerade beräkningar</li>
                  <li>• Ingen reklam</li>
                  <li>• Prioriterad support</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">9 kr/månad</div>
                <div className="text-sm text-gray-500">eller 99 kr/år</div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    // In a real app, this would integrate with payment processing
                    console.log('Monthly subscription selected');
                    setShowUpgradeModal(false);
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Välj månadsabonnemang
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would integrate with payment processing
                    console.log('Yearly subscription selected');
                    setShowUpgradeModal(false);
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Välj årsabonnemang (spara 20%)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumAccessControl;

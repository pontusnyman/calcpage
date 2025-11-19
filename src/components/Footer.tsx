import React from 'react';
import { Link } from 'react-router-dom';
import { useFeatureFlag } from '../contexts/FeatureFlagContext';

const Footer: React.FC = () => {
  const showFooterCalculators = useFeatureFlag('showFooterCalculators');

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Om oss</h3>
            <p className="mt-4 text-base text-gray-500">
              Kalkylatorn.se erbjuder gratis onlinekalkylatorer för olika vardagliga beräkningar och omvandlingar.
            </p>
          </div>
          {showFooterCalculators && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resurser</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">
                    Blogg
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
                    Alla kalkylatorer
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Kontakt</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:kontakt@kalkylatorn.com" className="text-base text-gray-500 hover:text-gray-900">
                  kontakt@kalkylatorn.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link to="/integritetspolicy" className="text-sm text-gray-400 hover:text-gray-600">
              Integritetspolicy
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link to="/cookiepolicy" className="text-sm text-gray-400 hover:text-gray-600">
              Cookie Policy
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link to="/anvandarvillkor" className="text-sm text-gray-400 hover:text-gray-600">
              Användarvillkor
            </Link>
          </div>
          <p className="text-base text-gray-400 text-center mt-4">
            © {new Date().getFullYear()} Kalkulatorn.se. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
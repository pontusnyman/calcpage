import React from 'react';
import DeferredAnalytics from './DeferredAnalytics';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import CalculatorNavigation from './CalculatorNavigation';
import SEO from './SEO';
import FeatureFlagControls from './FeatureFlagControls';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { ALL_CALCULATORS, useFeatureFlags } from '../contexts/FeatureFlagContext';
import {
  BLOG_POST_LINKS,
  getRelatedBlogPostIdsForCalculator,
  getRelatedBlogPostsForCalculator,
  getRelatedCalculatorPathsForBlogPost,
} from '../seo/contentRelations';

interface LayoutProps {
  children: React.ReactNode;
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    type?: 'website' | 'article';
    imageUrl?: string;
    schema?: object;
  };
}

const relatedSectionThemeByCalculatorId: Record<string, string> = {
  'compound-interest': 'bg-gradient-to-b from-teal-50 to-teal-100',
  loan: 'bg-gradient-to-b from-rose-50 to-rose-100',
  mortgage: 'bg-gradient-to-b from-emerald-50 to-emerald-100',
  vat: 'bg-gradient-to-b from-pink-50 to-pink-100',
  'crypto-profit': 'bg-gradient-to-b from-orange-50 to-orange-100',
  'savings-goal': 'bg-gradient-to-b from-green-50 to-green-100',
  'car-lease': 'bg-gradient-to-b from-blue-50 to-blue-100',
  'hourly-rate': 'bg-gradient-to-b from-teal-50 to-teal-100',
  discount: 'bg-gradient-to-b from-yellow-50 to-yellow-100',
  'energy-savings': 'bg-gradient-to-b from-cyan-50 to-cyan-100',
  'meeting-cost': 'bg-gradient-to-b from-green-50 to-green-100',
  bmi: 'bg-gradient-to-b from-blue-50 to-blue-100',
  bmr: 'bg-gradient-to-b from-violet-50 to-violet-100',
  calorie: 'bg-gradient-to-b from-orange-50 to-orange-100',
  'weight-reduce': 'bg-gradient-to-b from-purple-50 to-purple-100',
  fasting: 'bg-gradient-to-b from-teal-50 to-teal-100',
  ovulation: 'bg-gradient-to-b from-emerald-50 to-emerald-100',
  sleep: 'bg-gradient-to-b from-indigo-50 to-indigo-100',
  alcohol: 'bg-gradient-to-b from-violet-50 to-violet-100',
  countdown: 'bg-gradient-to-b from-pink-50 to-pink-100',
  age: 'bg-gradient-to-b from-purple-50 to-purple-100',
  'jet-lag': 'bg-gradient-to-b from-slate-50 to-slate-100',
  caffeine: 'bg-gradient-to-b from-purple-50 to-purple-100',
  'running-pace': 'bg-gradient-to-b from-cyan-50 to-cyan-100',
  'race-finish': 'bg-gradient-to-b from-amber-50 to-amber-100',
  'heart-rate-zones': 'bg-gradient-to-b from-indigo-50 to-indigo-100',
  'measurement-converter': 'bg-gradient-to-b from-blue-50 to-blue-100',
  'cup-converter': 'bg-gradient-to-b from-amber-50 to-amber-100',
  deadline: 'bg-gradient-to-b from-slate-50 to-slate-100',
};

const Layout: React.FC<LayoutProps> = ({ children, seo }) => {
  const location = useLocation();
  const { getVisibleCalculators } = useFeatureFlags();
  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname === '/blog';
  
  // Add scroll to top functionality
  useScrollToTop();

  // Default SEO values for homepage
  const defaultSEO = {
    title: isHomePage ? 'Gratis onlinekalkylatorer' : 'Kalkylatorn.com',
    description: 'Upptäck våra gratis onlinekalkylatorer för ekonomi, hälsa, träning och vardagliga beräkningar. Enkla och användarvänliga verktyg för smartare beslut.',
    canonicalUrl: `https://www.kalkylatorn.com${location.pathname}`,
    type: 'website' as const,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kalkylatorn.com",
      "url": "https://www.kalkylatorn.com",
      "description": "Gratis onlinekalkylatorer för vardagliga beräkningar"
    }
  };

  // Merge seo props with defaults, ensuring required fields are present
  const seoProps = {
    ...defaultSEO,
    ...seo,
    title: seo?.title || defaultSEO.title,
    description: seo?.description || defaultSEO.description
  };

  const visibleCalculators = getVisibleCalculators();
  const currentCalculator =
    visibleCalculators.find((calculator) => calculator.path === location.pathname) ||
    ALL_CALCULATORS.find((calculator) => calculator.path === location.pathname);

  const relationPriorityCalculatorPaths = currentCalculator
    ? Array.from(
        new Set(
          getRelatedBlogPostIdsForCalculator(currentCalculator.path).flatMap((blogId) =>
            getRelatedCalculatorPathsForBlogPost(blogId)
          )
        )
      ).filter((path) => path !== currentCalculator.path)
    : [];

  const relatedCalculators = currentCalculator
    ? [
        ...relationPriorityCalculatorPaths
          .map((path) => visibleCalculators.find((calculator) => calculator.path === path))
          .filter((calculator): calculator is (typeof visibleCalculators)[number] => Boolean(calculator)),
        ...visibleCalculators.filter(
          (calculator) =>
            calculator.path !== currentCalculator.path &&
            !relationPriorityCalculatorPaths.includes(calculator.path) &&
            calculator.category === currentCalculator.category
        ),
        ...visibleCalculators.filter(
          (calculator) =>
            calculator.path !== currentCalculator.path &&
            !relationPriorityCalculatorPaths.includes(calculator.path) &&
            calculator.category !== currentCalculator.category
        ),
      ].slice(0, 4)
    : [];

  const relatedPosts = currentCalculator
    ? [
        ...getRelatedBlogPostsForCalculator(currentCalculator.path),
        ...BLOG_POST_LINKS.filter(
          (post) =>
            !getRelatedBlogPostIdsForCalculator(currentCalculator.path).includes(post.id) &&
            post.category === currentCalculator.category
        ),
      ].slice(0, 3)
    : [];

  const relatedSectionTheme = currentCalculator
    ? relatedSectionThemeByCalculatorId[currentCalculator.id] || 'bg-gray-50'
    : 'bg-gray-50';
  const currentCalculatorName = currentCalculator?.title.toLowerCase() || 'denna kalkylator';
  const showRelatedSection = Boolean(
    currentCalculator && (relatedCalculators.length > 0 || relatedPosts.length > 0)
  );

  return (
    <>
      <SEO {...seoProps} />
      {/* flex + gap avoids margin collapse between page content and footer (cards sat ~1px above footer with margin alone) */}
      <div className={`flex flex-col ${showRelatedSection ? 'gap-0' : 'gap-16 md:gap-24'}`}>
        {children}
        <div className="flex flex-col">
          {showRelatedSection && (
            <section className={`pt-2 pb-8 ${relatedSectionTheme}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-6">
                  {relatedCalculators.length > 0 && (
                    <>
                      <h2 className="text-xl font-semibold text-gray-900">Relaterade kalkylatorer</h2>
                      <p className="mt-2 text-sm text-gray-600">
                        Utforska fler verktyg som passar tillsammans med {currentCalculatorName}.
                      </p>
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {relatedCalculators.map((calculator) => (
                          <Link
                            key={calculator.id}
                            to={calculator.path}
                            className="rounded-lg border border-indigo-200 bg-white/90 px-4 py-3 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                          >
                            {calculator.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  {relatedPosts.length > 0 && (
                    <div className={relatedCalculators.length > 0 ? 'mt-8' : ''}>
                      <h3 className="text-lg font-semibold text-gray-900">Relaterade inlägg</h3>
                      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                        {relatedPosts.map((post) => (
                          <Link
                            key={post.id}
                            to={post.link}
                            className="rounded-lg border border-white/80 bg-white/80 p-4 transition-colors hover:bg-white"
                          >
                            <p className="text-xs font-medium text-indigo-700">{post.category}</p>
                            <p className="mt-1 text-sm font-semibold text-gray-900">{post.title}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          {!isHomePage && !isBlogPage && <CalculatorNavigation />}
          <Footer />
        </div>
      </div>
      {!import.meta.env.PROD && <FeatureFlagControls />}
      <DeferredAnalytics path={location.pathname + location.search} route={location.pathname} />
    </>
  );
};

export default Layout;
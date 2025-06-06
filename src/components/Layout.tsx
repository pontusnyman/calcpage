import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import CalculatorNavigation from './CalculatorNavigation';
import SEO from './SEO';
import { useScrollToTop } from '../hooks/useScrollToTop';

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

const Layout: React.FC<LayoutProps> = ({ children, seo }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname === '/blog';
  
  // Add scroll to top functionality
  useScrollToTop();

  // Default SEO values for homepage
  const defaultSEO = {
    title: isHomePage ? 'Gratis onlinekalkylatorer' : 'Kalkulatorn.se',
    description: 'Upptäck våra gratis onlinekalkylatorer för ekonomi, hälsa, träning och vardagliga beräkningar. Enkla och användarvänliga verktyg för smartare beslut.',
    canonicalUrl: `https://kalkulatorn.se${location.pathname}`,
    type: 'website' as const,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kalkulatorn.se",
      "url": "https://kalkulatorn.se",
      "description": "Gratis onlinekalkylatorer för vardagliga beräkningar"
    }
  };

  return (
    <>
      <SEO {...(seo || defaultSEO)} />
      {children}
      {!isHomePage && !isBlogPage && <CalculatorNavigation />}
      <Footer />
    </>
  );
};

export default Layout;
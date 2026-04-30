import { useEffect, useState, type ComponentType } from 'react';

type AnalyticsProps = { path: string; route: string };

const DeferredAnalytics = ({ path, route }: AnalyticsProps) => {
  const [AnalyticsCmp, setAnalyticsCmp] = useState<ComponentType<AnalyticsProps> | null>(null);

  useEffect(() => {
    const load = () => {
      void import('@vercel/analytics/react').then((m) => {
        setAnalyticsCmp(() => m.Analytics);
      });
    };
    const ric = window.requestIdleCallback;
    if (typeof ric === 'function') {
      ric(load, { timeout: 2500 });
    } else {
      window.setTimeout(load, 1);
    }
  }, []);

  if (!AnalyticsCmp) return null;
  return <AnalyticsCmp path={path} route={route} />;
};

export default DeferredAnalytics;

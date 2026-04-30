import { useEffect, type FC } from 'react';
import { scheduleAdSenseWhenAccepted } from '../lib/adsenseLoader';

const AdSenseBootstrap: FC = () => {
  useEffect(() => {
    scheduleAdSenseWhenAccepted();
  }, []);
  return null;
};

export default AdSenseBootstrap;

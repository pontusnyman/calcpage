/** AdSense publisher ID — keep in sync with <ins data-ad-client> */
export const ADSENSE_CLIENT = 'ca-pub-8378245206733631';

const SCRIPT_SELECTOR = 'script[data-adsense-loader]';

export function loadAdSenseScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }
  const existing = document.querySelector<HTMLScriptElement>(SCRIPT_SELECTOR);
  if (existing) {
    return existing.dataset.loaded === '1'
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', () => reject(new Error('AdSense script failed')), {
            once: true,
          });
        });
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.dataset.adsenseLoader = '1';
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    s.onload = () => {
      s.dataset.loaded = '1';
      resolve();
    };
    s.onerror = () => reject(new Error('AdSense script failed'));
    document.head.appendChild(s);
  });
}

/** After full page load + idle time — keeps main thread freer during LCP. */
export function scheduleAdSenseWhenAccepted(): void {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem('cookieConsent') !== 'accepted') return;

  const run = () => {
    loadAdSenseScript().catch(() => {});
  };

  const schedule = () => {
    const ric = (
      window as typeof window & {
        requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
      }
    ).requestIdleCallback;
    if (typeof ric === 'function') {
      ric(run, { timeout: 4000 });
    } else {
      setTimeout(run, 0);
    }
  };

  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }
}

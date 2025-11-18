/**
 * Utility function to parse URL search parameters
 * @returns URLSearchParams object for the current window location
 */
export const getUrlParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search);
};

/**
 * Get a string parameter from URL
 */
export const getStringParam = (params: URLSearchParams, key: string, defaultValue: string = ''): string => {
  return params.get(key) || defaultValue;
};

/**
 * Get a number parameter from URL
 */
export const getNumberParam = (params: URLSearchParams, key: string, defaultValue: number = 0): number => {
  const value = params.get(key);
  if (!value) return defaultValue;
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Get a boolean parameter from URL
 */
export const getBooleanParam = (params: URLSearchParams, key: string, defaultValue: boolean = false): boolean => {
  const value = params.get(key);
  if (!value) return defaultValue;
  return value === 'true';
};


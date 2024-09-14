import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

/**
 * Retrieves a configuration variable from the Next.js public runtime configuration.
 *
 * This utility function allows you to access configuration variables defined in the public runtime
 * configuration of your Next.js application.
 *
 * @example
 * ```typescript
 * const apiUrl = getConfigVariable('API_URL');
 * ```
 *
 * @param {string} key - The key of the configuration variable to retrieve.
 * @param {boolean} isServer - Optional. Indicates whether the configuration variable is for the server runtime.
 * @returns {string} - The value of the configuration variable, or an empty string if not found.
 */

const getConfigVariable = (key: string, isServer?: boolean): string => {
  if (isServer) {
    return serverRuntimeConfig?.[key] || '';
  }

  return publicRuntimeConfig?.[key] || '';
};

export default getConfigVariable;

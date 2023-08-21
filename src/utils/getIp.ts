import { ipListForLocalhost } from '@/constants';

/**
 * Get the appropriate IP address for the request, considering localhost scenarios.
 *
 * This function determines whether the provided remote address is a localhost address.
 * If it is, the function randomly selects an IP address from the list of IP addresses
 * reserved for localhost. Otherwise, it returns the original remote address.
 *
 * @example
 * ```typescript
 * const ipAddress = getIp(req.socket.remoteAddress);
 * ```
 *
 * @param {string} remoteAddress - The remote address of the request sender.
 * @returns {string} - The determined IP address for the request.
 */

const getIp = (remoteAddress: string): string => {
  const ipForLocalhost = ipListForLocalhost[Math.floor(Math.random() * ipListForLocalhost.length)];
  const isLocalhost = remoteAddress === '::1' || remoteAddress === '127.0.0.1';

  return isLocalhost ? ipForLocalhost : remoteAddress;
};

export default getIp;

import { LOCALHOST_ADDRESSES, IP_LIST_FOR_LOCALHOST } from '@/constants';

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
  const isLocalhost = LOCALHOST_ADDRESSES.includes(remoteAddress);

  if (isLocalhost) {
    const randomIndex = Math.floor(Math.random() * IP_LIST_FOR_LOCALHOST.length);
    return IP_LIST_FOR_LOCALHOST[randomIndex];
  }

  return remoteAddress;
};

export default getIp;

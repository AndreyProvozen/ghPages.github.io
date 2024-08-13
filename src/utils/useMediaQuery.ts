import { useState, useEffect } from 'react';

import { type SCREEN_SIZES } from '@/constants';

/**
 * A custom React hook that allows you to check if a given media query matches the current screen size.
 *
 * @example
 * ```jsx
 * const isMobile = useMediaQuery('(SCREEN_SIZES.TABLET_BELOW)');
 * if (isMobile) {
 *   // Do something for mobile screens
 * } else {
 *   // Do something for larger screens
 * }
 * ```
 *
 * @param {SCREEN_SIZES} query - A media query string representing a screen size from the SCREEN_SIZES enum.
 * @returns {boolean} `true` if the media query matches the screen size, otherwise `false`.
 */

const useMediaQuery = (query: SCREEN_SIZES): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;

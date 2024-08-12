import { type MutableRefObject, useEffect, useRef, useState } from 'react';

interface ReturnedProps {
  elementRef: MutableRefObject<any>;
  isVisible: boolean;
}

/**
 * A custom React hook that allows you to check if a given element is visible in the viewport.
 *
 * @example
 * ```jsx
 * const { elementRef, isVisible } = useIntersectionObserver({
 * options: {
 * rootMargin: '0px',
 * threshold: 0.5,
 * },
 * });
 *
 * <div ref={elementRef}>
 * {isVisible? 'Visible!' : 'Not visible!'}
 * </div>
 * ```
 *
 * @param {IntersectionObserverInit} options - An object containing options for the IntersectionObserver.
 * @returns {Object} An object containing the `elementRef` and `isVisible` properties.
 **/

const useIntersectionObserver = (options: IntersectionObserverInit = {}): ReturnedProps => {
  const elementRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (!hasIntersected) {
      const observer = new IntersectionObserver(([{isIntersecting}]) => {
        setIsVisible(isIntersecting);

        if (isIntersecting) setHasIntersected(true);
      }, options);

      const currentElement = elementRef.current;

      if (currentElement) observer.observe(currentElement);

      return () => {
        if (currentElement) observer.unobserve(currentElement);
      };
    }
  }, [options, hasIntersected]);

  return { elementRef, isVisible };
};

export default useIntersectionObserver;

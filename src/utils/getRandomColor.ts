import chroma from 'chroma-js';

type ReturnProps = { color: string; colorWithOpacity: string };

/**
 * Generates a random color with optional opacity.
 *
 * @example
 * ```typescript
 * const color = getRandomColor(0.5); // Generates a random color with 50% opacity
 * ```
 *
 * @param {number} opacity - The opacity value ranging from 0 to 1.
 * @returns {ReturnProps} - The generated random color in hex format. If opacity is provided, an object containing both the color and the color with opacity is returned.
 */

const getRandomColor = (opacity: number): ReturnProps => {
  const color = chroma.random().saturate(2).hex();
  if (!opacity) return { color, colorWithOpacity: '' };

  const colorWithOpacity = chroma(color).alpha(opacity).hex();
  return { color, colorWithOpacity };
};

export default getRandomColor;

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
  const randomHex = () => {
    const component = Math.floor(Math.random() * 256);
    return component.toString(16).padStart(2, '0');
  };

  const color = `#${randomHex()}${randomHex()}${randomHex()}`;

  if (!opacity) return { color, colorWithOpacity: '' };

  const opacityHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');

  const colorWithOpacity = `${color}${opacityHex}`;

  return { color, colorWithOpacity };
};

export default getRandomColor;

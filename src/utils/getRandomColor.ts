import chroma from 'chroma-js';

const getRandomColor = (opacity: number) => {
  const color = chroma.random().saturate(2).hex();
  if (!opacity) return color;

  const colorWithOpacity = chroma(color).alpha(opacity).hex();
  return { color, colorWithOpacity };
};

export default getRandomColor;

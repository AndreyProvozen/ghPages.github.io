import chroma from 'chroma-js';

const getRandomColor = (opacity: number) => {
  const color = chroma.random().saturate(2).hex();

  if (opacity) {
    const colorWithOpacity = chroma(color).alpha(opacity).hex();
    return { color, colorWithOpacity };
  }

  return chroma.random().saturate(2).hex();
};

export default getRandomColor;

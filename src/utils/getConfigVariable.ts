import getConfig from 'next/config';

const getConfigVariable = (key: string) => {
  const { publicRuntimeConfig } = getConfig();

  return publicRuntimeConfig[key] || '';
};

export default getConfigVariable;

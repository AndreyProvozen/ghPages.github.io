import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const getConfigVariable = (key: string) => publicRuntimeConfig[key] || '';

export default getConfigVariable;

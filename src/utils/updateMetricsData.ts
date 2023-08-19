import { UAParser } from 'ua-parser-js';

import { ipListForLocalhost, metricsProps } from '@/constants';

import customFetch from './customFetch';

const updateMetrics = (metrics: Record<string, number>, field: string) => {
  if (field in metrics) return { ...metrics, [field]: metrics[field] + 1 };

  return { ...metrics, [field]: 1 };
};
const getIpForLocalhost = () => ipListForLocalhost[Math.floor(Math.random() * ipListForLocalhost.length)];

const setMetricsData = async (metrics: metricsProps[], req) => {
  const parser = new UAParser(req.headers['user-agent']);
  const acceptLanguage = req.headers['accept-language'] || '';

  const languageCode = acceptLanguage.split(',')[0]?.split('-')[0].trim().toUpperCase() || 'Unknown';
  const ip = req.socket.remoteAddress === '127.0.0.1' ? getIpForLocalhost() : req.socket.remoteAddress;

  const { name: browserName } = parser.getBrowser();
  const { name: OSName } = parser.getOS();
  const { type: deviceType } = parser.getDevice();

  const { country } = await customFetch(`http://ip-api.com/json/${ip}?fields=message,country`);

  const metricFields = [
    { title: 'Browsers clicks', data: browserName },
    { title: 'System clicks', data: OSName },
    { title: 'Languages clicks', data: languageCode },
    { title: 'Devices clicks', data: deviceType === undefined ? 'Desktop' : deviceType },
    { title: 'Country clicks', data: country },
  ];

  metricFields.forEach(({ title, data }) => {
    const existingMetric = metrics.find(metric => metric.title === title);
    if (existingMetric) {
      existingMetric.data = updateMetrics(existingMetric.data, data);
    } else {
      metrics.push({ title, data: { [data]: 1 } });
    }
  });
};

export default setMetricsData;

import { UAParser } from 'ua-parser-js';

import { metricsProps } from '@/constants';

const updateMetrics = (metrics: Array<Record<string, number>>, field: string) => {
  if (field in metrics) {
    return { ...metrics, [field]: metrics[field] + 1 };
  }

  return { ...metrics, [field]: 1 };
};

const setMetricsData = async (metrics: metricsProps[], req) => {
  const parser = new UAParser(req.headers['user-agent']);
  const acceptLanguage = req.headers['accept-language'] || '';

  const languageCode = acceptLanguage.split(',')[0]?.split('-')[0].trim().toUpperCase() || 'Unknown';
  const ip = req.socket.remoteAddress === '127.0.0.1' ? '161.184.29.248' : req.socket.remoteAddress;

  const { name: browserName } = parser.getBrowser();
  const { name: OSName } = parser.getOS();
  const { type: deviceType } = parser.getDevice();

  const ipDataResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,continent,country`);

  const { country, continent } = await ipDataResponse.json();

  const metricFields = [
    { title: 'Browsers clicks', data: browserName },
    { title: 'System clicks', data: OSName },
    { title: 'Languages clicks', data: languageCode },
    { title: 'Devices clicks', data: deviceType === undefined ? 'Desktop' : deviceType },
    { title: 'Country clicks', data: country },
    { title: 'continent', data: continent },
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

//161.184.29.248--Edmonton
//185.237.74.247--Kyiv
//195.140.184.24--Munich

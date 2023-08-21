import { getCookie, setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

import { UrlsModel } from '@/models';
import connectMongodb from '@/utils/connectMongodb';
import updateMetricsData from '@/utils/updateMetricsData';

const RedirectToFullLink = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  await connectMongodb();

  const { shortPath } = req.query;
  const data = await UrlsModel.findOne({ code: shortPath }).exec();

  if (data) {
    await updateMetricsData(data.metrics, req.headers, req.socket.remoteAddress);

    data.clicked++;

    await data.save();

    res.setHeader('Cache-Control', 'no-cache, max-age=0');
    return res.redirect(301, data.url);
  }

  const cookieLinksList = getCookie('link-data', { req, res }) as string;
  const parsedLinksList = cookieLinksList ? JSON.parse(cookieLinksList) : [];
  const currentLink = parsedLinksList.find(item => item.code === shortPath);

  if (!currentLink) return res.status(404).send('Not Found');

  currentLink.clicked++;
  setCookie('link-data', JSON.stringify(parsedLinksList), { req, res });
  res.setHeader('Cache-Control', 'no-cache, max-age=0');

  return res.redirect(301, currentLink.url);
};

export default RedirectToFullLink;

import { getCookie, setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

import Urls, { IUrl } from '@/models/Urls';
import connectMongodb from '@/utils/connectMongodb';
import setMetricsData from '@/utils/updateMetricsData';

export default async function handleRedirect(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(400).send('Bad Request');
  }

  await connectMongodb();

  const { shortPath } = req.query;
  const data: IUrl | null = await Urls.findOne({ code: shortPath }).exec();

  if (data) {
    await setMetricsData(data.metrics, req);

    data.clicked++;

    await data.save();

    res.setHeader('Cache-Control', 'no-cache, max-age=0');
    return res.redirect(301, data.url);
  }

  const cookieLinksList = getCookie('link-data', { req, res }) as string;

  if (cookieLinksList) {
    const parsedLinksList = JSON.parse(cookieLinksList);
    const currentLink = parsedLinksList.find(item => item.code === shortPath);

    if (currentLink) {
      currentLink.clicked++;
      setCookie('link-data', JSON.stringify(parsedLinksList), { req, res });

      res.setHeader('Cache-Control', 'no-cache, max-age=0');
      return res.redirect(301, currentLink.url);
    }
  }
  return res.status(404).send('Not Found');
}

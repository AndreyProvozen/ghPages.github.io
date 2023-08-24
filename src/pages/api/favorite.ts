import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import Urls from '@/models/Urls';
import connectMongodb from '@/utils/connectMongodb';

const FavoriteLinksList = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  try {
    await connectMongodb();

    const cookieFavoriteList = JSON.parse((getCookie('favorite', { req, res }) as string) || '[]');

    const [linksList, count] = await Promise.all([
      Urls.find({ code: cookieFavoriteList }).select('url clicked code'),
      Urls.countDocuments({ code: cookieFavoriteList }),
    ]);

    return res.status(200).json({ linksList, count });
  } catch ({ message }) {
    return res.status(500).send(message);
  }
};

export default FavoriteLinksList;

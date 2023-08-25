import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { UrlsModel } from '@/models';
import connectMongodb from '@/utils/connectMongodb';

import { authConfig } from './auth/[...nextauth]';

const SearchLinksList = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).json('Method Not Allowed');

  try {
    await connectMongodb();

    const session = await getServerSession(req, res, authConfig);

    const { searchString, favorite } = req.query;

    if (favorite === 'true' && searchString) {
      const cookieFavoriteList = JSON.parse((getCookie('favorite', { req, res }) as string) || '[]');
      const searchTerm = String(searchString).trim();

      const userLinksList = await UrlsModel.find({ code: { $in: session.user.userLinks } })
        .select('url clicked code')
        .lean();

      const linksList = userLinksList.filter(
        ({ code }) => cookieFavoriteList.includes(code) && code.includes(searchTerm)
      );

      return res.status(200).json({ linksList, count: linksList.length });
    }

    if (favorite === 'true') {
      const cookieFavoriteList = JSON.parse((getCookie('favorite', { req, res }) as string) || '[]');
      const [linksList, count] = await Promise.all([
        UrlsModel.find({ code: { $in: cookieFavoriteList } })
          .select('url clicked code')
          .lean(),
        UrlsModel.countDocuments({ code: { $in: cookieFavoriteList } }),
      ]);

      return res.status(200).json({ linksList, count });
    }

    if (searchString) {
      const searchTerm = String(searchString).trim();

      if (searchTerm.length === 0) return res.status(400).json('Search term is empty');
      const userLinksList = await UrlsModel.find({ code: { $in: session.user.userLinks } })
        .select('url clicked code')
        .lean();

      const linksList = userLinksList.filter(({ code }) => code.includes(searchTerm));
      const count = linksList.length;

      return res.status(200).json({ linksList, count });
    }

    return res.status(400).json('Invalid query parameters');
  } catch ({ message }) {
    return res.status(500).send(message);
  }
};

export default SearchLinksList;

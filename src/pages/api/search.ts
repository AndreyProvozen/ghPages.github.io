import { NextApiRequest, NextApiResponse } from 'next';

import { UrlsModel } from '@/models';
import connectMongodb from '@/utils/connectMongodb';

const SearchLinksList = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  try {
    await connectMongodb();

    const { search } = req.query;
    const searchTerm = String(search).trim();

    if (searchTerm.length === 0) return res.status(400).json({ error: 'Search term is empty' });

    const searchedList = await UrlsModel.find({ code: { $regex: searchTerm, $options: 'i' } })
      .select('url clicked code')
      .lean();

    const count = searchedList.length;

    return res.status(200).json({ linksList: searchedList, count });
  } catch ({ message }) {
    return res.status(500).send(message);
  }
};

export default SearchLinksList;

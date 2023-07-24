import { NextApiRequest, NextApiResponse } from 'next';

import Urls from '@/models/Urls';
import connectMongodb from '@/utils/connectMongodb';

const SearchLinksList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongodb();
    if (req.method === 'GET') {
      const { search } = req.query;
      const searchTerm = String(search).trim();

      if (searchTerm.length === 0) {
        return res.status(400).json({ error: 'Search term is empty' });
      }

      const searchedList = await Urls.find({ code: { $regex: searchTerm, $options: 'i' } }).select('url clicked code');

      const count = searchedList.length;

      return res.status(200).json({ urlsList: searchedList, count });
    }

    return res.status(500).send('error');
  } catch ({ message }) {
    return res.status(500).send(message);
  }
};

export default SearchLinksList;

import type { NextApiRequest, NextApiResponse } from 'next';
import Urls from '@/models/urls';
import connectMongodb from '@/utils/connectMongodb';

const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const BaseLink = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, limit } = req.query;
    await connectMongodb();

    if (req.method === 'GET') {
      const count = await Urls.countDocuments();
      const urlsList = await Urls.find().limit(Number(limit) || 5);
      return res.status(200).json({ count, urlsList });
    }

    if (req.method === 'POST') {
      const { url } = req.body;
      if (!urlRegex.test(url)) {
        return res.status(400).json('Please provide a valid url');
      }

      const existingUrl = await Urls.findOne({ url });
      if (existingUrl) {
        return res.status(409).json('Please provide a valid url');
      }

      const newUrl = await Urls.create({ url });
      return res.status(200).json(newUrl);
    }

    if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json('Please provide an id parameter');
      }

      const deletedUrl = await Urls.findOneAndDelete({ _id: id });
      if (!deletedUrl) {
        return res.status(404).json('URL not found');
      }

      return res.status(200).json(deletedUrl);
    }

    return res.status(404).send('Not Found');
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const GetLinkFullData = async (code: string) => {
  await connectMongodb();
  const existingUrl = await Urls.findOne({ code });
  if (code) {
    return JSON.stringify(existingUrl);
  }
  return null;
};

export default BaseLink;

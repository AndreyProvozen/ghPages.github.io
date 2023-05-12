import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { setCookie, getCookie } from 'cookies-next';
import Urls from '@/models/Urls';
import connectMongodb from '@/utils/connectMongodb';

const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const getLinksData = async (req, res) => {
  const { limit, session } = req.query;

  if (session === 'true') {
    const count = await Urls.countDocuments();
    const urlsList = await Urls.find()
      .select('url clicked code')
      .limit(Number(limit) || 5);
    return res.status(200).json({ urlsList, count });
  }

  const cookieLinksList = (getCookie('link-data', { req, res }) as string) || '[]';
  const parsedLinksList = JSON.parse(cookieLinksList);

  return res.status(200).json({ urlsList: parsedLinksList, count: parsedLinksList.length });
};

const deleteLinksData = async (req, res) => {
  const { code, session } = req.query;
  if (session === 'true') {
    const deletedUrl = await Urls.findOneAndDelete({ code });

    if (!deletedUrl) {
      return res.status(404).json({ error: 'URL has already been deleted' });
    }

    return res.status(200).json(code);
  }
  const cookieLinksList = (getCookie('link-data', { req, res }) as string) || '[]';
  const parsedLinksList = JSON.parse(cookieLinksList);

  setCookie(
    'link-data',
    parsedLinksList.filter(item => item.code !== code),
    { req, res }
  );

  return res.status(200).json(code);
};

const postLinksData = async (req, res) => {
  const { url } = req.body;
  const { session } = req.query;

  if (!urlRegex.test(url)) {
    return res.status(400).json({ error: 'Please provide a valid url' });
  }

  if (session === 'true') {
    const existingUrl = await Urls.findOne({ url });

    if (existingUrl) {
      return res.status(409).json({ error: 'URL already exists' });
    }

    const newUrl = await Urls.create({ url });
    return res.status(200).json(newUrl);
  }

  const newLinkData = { url, clicked: 0, code: nanoid(7), isCookies: true };
  const getLinksFromCookie = JSON.parse((getCookie('link-data', { req, res }) as string) || '[]');

  if (getLinksFromCookie.some(({ url: cookieUrl }) => cookieUrl === url)) {
    return res.status(409).json({ error: 'URL already exists' });
  }

  const newLinksData = [...Object.values(getLinksFromCookie), newLinkData];
  setCookie('link-data', newLinksData, { req, res });

  return res.status(200).json(newLinkData);
};

const BaseLink = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongodb();

    switch (req.method) {
      case 'GET':
        await getLinksData(req, res);
        break;
      case 'POST':
        await postLinksData(req, res);
        break;
      case 'DELETE':
        await deleteLinksData(req, res);
        break;
      default:
        res.status(405).send('Method Not Allowed');
    }
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

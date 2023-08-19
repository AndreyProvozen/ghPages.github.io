import { setCookie, getCookie } from 'cookies-next';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';

import { UrlsModel, UserModel } from '@/models';
import connectMongodb from '@/utils/connectMongodb';

const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const getLinksData = async (req, res) => {
  const { limit = 5, userEmail, page } = req.query;
  UserModel;
  const getLinksByPage = parseInt(page, 10) ? page * limit : 0;

  if (userEmail !== 'undefined') {
    const userData = await UserModel.findOne({ email: userEmail });
    const urlsList = await UrlsModel.find({ code: userData.userLinks })
      .select('url clicked code')
      .skip(getLinksByPage)
      .limit(limit);

    const count = await UrlsModel.find({ code: userData.userLinks }).countDocuments();
    return res.status(200).json({ urlsList, count });
  }
  const cookieLinksList = JSON.parse((getCookie('link-data', { req, res }) as string) || '[]');

  return res.status(200).json({ urlsList: cookieLinksList, count: cookieLinksList.length });
};

const deleteLinksData = async (req, res) => {
  const { code, userEmail } = req.query;

  if (userEmail !== 'undefined') {
    await UserModel.findOneAndUpdate({ email: userEmail }, { $pull: { userLinks: code } }, { new: true });
    const deletedUrl = await UrlsModel.findOneAndDelete({ code });

    if (!deletedUrl) {
      return res.status(404).json({ error: 'URL has already been deleted' });
    }

    return res.status(200).json(code);
  }
  const cookieLinksList = JSON.parse((getCookie('link-data', { req, res }) as string) || '[]');

  const newList = cookieLinksList.filter(item => item.code !== code);

  setCookie('link-data', newList, { req, res });

  return res.status(200).json(code);
};

const postLinksData = async (req, res) => {
  const { url, userEmail } = req.body;

  if (!urlRegex.test(url)) {
    return res.status(400).json({ error: 'Please provide a valid url' });
  }

  if (userEmail !== undefined) {
    const existingUrl = await UrlsModel.findOne({ url });

    if (existingUrl) {
      return res.status(409).json({ error: 'URL already exists' });
    }

    const newUrl = await UrlsModel.create({ url });
    const userData = await UserModel.findOne({ email: userEmail });

    userData.userLinks = [...userData.userLinks, newUrl.code];

    await userData.save();

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
  } catch ({ message }) {
    return res.status(500).send(message);
  }
};

export const GetLinkFullData = async (code: string) => {
  await connectMongodb();
  const existingUrl = await UrlsModel.findOne({ code });
  if (code) {
    return JSON.stringify(existingUrl);
  }
  return null;
};

export default BaseLink;

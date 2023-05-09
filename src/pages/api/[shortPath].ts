import type { NextApiRequest, NextApiResponse } from 'next';
import UAParser from 'ua-parser-js';
import connectMongodb from '@/utils/connectMongodb';
import Urls, { IUrl } from '@/models/urls';

export default async function handleRedirect(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(400).send('Bad Request');
  }

  await connectMongodb();

  const { shortPath } = req.query;
  const data: IUrl | null = await Urls.findOne({ code: shortPath }).exec();

  if (data) {
    const parser = new UAParser(req.headers['user-agent']);
    const { name: browserName } = parser.getBrowser();
    const { name: OSName } = parser.getOS();
    const { type: deviceType } = parser.getDevice();
    const { architecture: CPUArchitecture } = parser.getCPU();

    data.browserName = browserName;
    data.OSName = OSName;
    data.CPUArchitecture = CPUArchitecture;
    data.deviceType = deviceType === undefined ? 'personal computer' : deviceType;
    data.clicked++;

    await data.save();

    res.setHeader('Cache-Control', 'no-cache, max-age=0');
    res.redirect(301, data.url);
  }

  return res.status(404).send('Not Found');
}

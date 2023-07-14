/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Entered the serverless function', req);
  console.log('Entered the serverless function', res);

  return { dummy: 'data' };
}

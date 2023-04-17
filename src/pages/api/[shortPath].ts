import type { NextApiRequest, NextApiResponse } from "next";
import connectMongodb from "@/utils/connectMongodb";
import Urls from "@/models/urls";

export default async function handleRedirect(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).send("Bad Request");
  }

  await connectMongodb();
  const { shortPath } = req.query;
  const data = await Urls.findOne({ code: shortPath });

  return data ? res.redirect(301, data.url) : res.status(404).send("Not Found");
}

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
  if (data) {
    data.clicked += 1;
    data.markModified("clicked");
    await data.save();
    res.setHeader("Cache-Control", "no-cache, max-age=0");
    res.redirect(301, data.url);
  }
  return res.status(404).send("Not Found");
}

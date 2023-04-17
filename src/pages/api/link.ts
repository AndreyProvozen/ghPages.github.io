import Urls from "@/models/urls";
import connectMongodb from "@/utils/connectMongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

export default async function handlePostGetNewLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(404).send("Not Found");
  }

  try {
    await connectMongodb();
    if (req.method === "GET") {
      const urlsList = await Urls.find();
      return res.status(200).json(urlsList);
    }

    const { url } = req.body;
    if (!urlRegex.test(url)) {
      return res.status(400).json("Please provide a valid url");
    }

    const newUrl = await Urls.create({ url });
    return res.status(200).json(newUrl);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

import { FormEvent, useEffect, useState } from "react";
import type { linkData } from "@/interface";
import Image from "next/image";
import Header from "@/components/Header";
import LinkDataBlock from "@/components/LinkDataBlock";
import QualitiesList from "@/components/QualitiesList";
import Accordion from "@/components/Accordion";

const Home = () => {
  const [longLink, setLongLink] = useState("");
  const [data, setData] = useState<linkData[]>([]);
  const questions = [
    {
      title: "What is a URL shortener?",
      description:
        "A URL shortener, also known as a link shortener, seems like a simple tool, but it is a service that can have a dramatic impact on your marketing efforts.",
    },
    {
      title: "Benefits of a short URL",
      description:
        "How many people can even remember a long web address, especially if it has tons of characters and symbols? A short URL can make your link more memorable. Not only does it allow people to easily recall and share your link with others, it can also dramatically improve traffic to your content.",
    },
    {
      title: "What is a QR Code?",
      description:
        "Quick response or QR, is a type of barcode that can store a multitude of information. The obvious difference between a QR Code and Barcode is its appearance. A QR Code is always in the shape of a square and contains smaller, even blocks similar to Tetris. A Barcode, on the other hand, has vertical bars in different thicknesses and is often accompanied by a serial number.",
    },
  ];
  useEffect(() => {
    fetch("api/link")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("api/link", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: longLink }),
    });
    setLongLink("");
    const content = await response.json();

    if (content) {
      setData([content, ...data]);
    }
  };

  return (
    <>
      <div className="h-screen bg-blackMain px-5">
        <Header />
        <div className="container max-w-screen-md text-center mx-auto text-lg bg-home-bg-image h-full">
          <h1 className="mt-12 text-5xl">Link Shortener</h1>
          <p className="max-w-lg mx-auto my-5">
            Free URL Shortener for transforming long, ugly links into nice,
            memorable and trackable short URLs
          </p>
          <form
            onSubmit={handleOnSubmit}
            className="relative mb-4 flex w-full flex-wrap items-stretch"
          >
            <input
              type="search"
              value={longLink}
              onChange={(e) => setLongLink(e.target.value)}
              placeholder="Paste the URL to be shortened"
              className="relative m-0 flex-auto rounded-l px-3 py-[0.25rem] text-blackMain"
            />
            <button
              type="submit"
              className="relative flex items-center rounded-r text-whiteMain hover:bg-lightPinkMain bg-pinkMain px-6 py-2.5 active:bg-darkPinkMain "
            >
              generate link
            </button>
          </form>
          {Boolean(data.length) && <LinkDataBlock data={data} />}
          <div className="absolute bottom-0 left-1/2">
            <Image src="./mouse.svg" width={30} height={30} alt="" />
            <Image src="./arrow.svg" width={30} height={30} alt="" />
          </div>
        </div>
      </div>
      <div className="container max-w-screen-md mx-auto text-blackMain text-center">
        <QualitiesList />
        <div className="my-10">
          <p className="text-4xl font-bold mb-5">Frequently Asked Questions</p>
          {questions.map((question) => (
            <Accordion data={question} key={question.title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

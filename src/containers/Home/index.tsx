import { FormEvent, useEffect, useState } from "react";
import type { linkData } from "@/interface";
import Image from "next/image";
import Header from "@/components/Header";
import LinkDataBlock from "@/components/LinkDataBlock";
import QualitiesList from "@/components/QualitiesList";
import Accordion from "@/components/Accordion";
import Footer from "@/components/Footer";
import InfoBlock from "@/components/InfoBlock";

const Home = () => {
  const [longLink, setLongLink] = useState("");
  const [data, setData] = useState<linkData[]>([]);
  const questions = [
    {
      title: "What is a URL shortener?",
      description:
        "<div><p>A URL shortener is a tool that takes a long URL (uniform resource locator) and creates a shorter, more compact version of it. The shortened URL redirects to the original URL when accessed. URL shorteners are often used for social media posts, messaging, and email where character count is limited or to make URLs more visually appealing.</p></br><p>URL shortening services typically provide users with a unique shortened URL that they can share instead of the longer original URL. Some URL shorteners also provide analytics to track clicks and other data about the shortened URLs.</p></br><p>Most URL shorteners use a 301 redirect, which is a permanent redirect, to forward users from the shortened URL to the original URL. This means that any SEO (search engine optimization) benefits associated with the original URL are passed to the shortened URL.</p></div>",
    },
    {
      title: "Benefits of a short URL",
      description:
        "<p>How many people can even remember a long web address, especially if it has tons of characters and symbols? A short URL can make your link more memorable. Not only does it allow people to easily recall and share your link with others, it can also dramatically improve traffic to your content.</p>",
    },
    {
      title: "What is a QR Code?",
      description:
        "<p>Quick response or QR, is a type of barcode that can store a multitude of information. The obvious difference between a QR Code and Barcode is its appearance. A QR Code is always in the shape of a square and contains smaller, even blocks similar to Tetris. A Barcode, on the other hand, has vertical bars in different thicknesses and is often accompanied by a serial number.</p>",
    },
    {
      title: "What can a QR Code do?",
      description:
        "<p>Because of its versatility, a QR Code can be programmed to do a multitude of things. It can be split into two formats: Dynamic and Static. A Dynamic QR Code is useful for businesses or nonprofits in their marketing strategy because of its advantages. Though it needs a subscription to work, it is a small price to pay compared to the benefits it offers. Dynamic QR Code solutions are editable, which means if you made a mistake and only noticed it after the QR Codes are printed, you can easily log in to the dashboard and fix them without changing the appearance of the already printed Codes.</p>",
    },
  ];

  useEffect(() => {
    fetch("api/link")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("api/link", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: longLink }),
    })
      .then((res) => {
        setLongLink("");
        return res.ok && res.json();
      })
      .then((content) => content && setData([content, ...data]));
  };

  return (
    <>
      <div
        className="h-screen px-5 bg-cover bg-center"
        style={{ backgroundImage: 'url("/homeBg.avif")' }}
      >
        <Header />
        <div className="container max-w-screen-lg text-center mx-auto text-lg h-full">
          <h1 className="mt-12 text-5xl text-whiteMain">Link Shortener</h1>
          <p className="max-w-lg mx-auto my-5 text-whiteMain">
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
              className="relative m-0 flex-auto rounded-l px-3 py-[0.25rem]"
            />
            <button
              type="submit"
              className="relative flex items-center rounded-r text-whiteMain hover:bg-lightPinkMain bg-pinkMain px-6 py-2.5 active:bg-darkPinkMain"
            >
              generate link
            </button>
          </form>
          {Boolean(data.length) && <LinkDataBlock data={data} />}
          <div className="absolute bottom-0 left-1/2 animate-bounce">
            <Image src="./mouse.svg" width={30} height={30} alt="" />
            <Image src="./arrow.svg" width={30} height={30} alt="" />
          </div>
        </div>
      </div>
      <div className="container max-w-screen-lg mx-auto text-center px-5 my-8">
        <QualitiesList />
      </div>
      <InfoBlock />
      <div className="container max-w-screen-lg mx-auto px-5 my-10">
        <p className="text-4xl font-bold mb-5 text-center">
          Frequently Asked Questions
        </p>
        {questions.map((question) => (
          <Accordion data={question} key={question.title} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;

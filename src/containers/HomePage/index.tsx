import { FormEvent, useEffect, useState } from "react";
import { flashMessageType, linkData } from "@/interface";
import Header from "@/components/Header";
import LinkDataBlock from "@/components/LinkDataBlock";
import QualitiesList from "@/components/QualitiesList";
import Accordion from "@/components/Accordion";
import Footer from "@/components/Footer";
import InfoBlock from "@/components/InfoBlock";
import LinksList from "@/components/Skeletons/LinksList";
import SearchBlock from "@/components/SearchBlock";
import Image from "next/image";
import { useFlashMessage } from "@/utils/FlashMessage";

const Home = () => {
  const [longLink, setLongLink] = useState("");
  const [data, setData] = useState<linkData[]>([]);
  const flashMessage = useFlashMessage();
  const [count, setCount] = useState();

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
      .then((res) => {
        setCount(res.count);
        setData(res.urlsList);
      });
  }, []);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      .then((content) => {
        if (content) {
          const newArray =
            data.length > 4
              ? [content, ...data].slice(0, -1)
              : [content, ...data];

          setData(newArray);
          flashMessage.addFlashMessage(
            "Shortened link successfully added",
            flashMessageType.SUCCESSFUL
          );
        }
      });
  };

  return (
    <>
      <div className="relative pb-5 min-h-screen px-5">
        <Image
          src="/homeBg.avif"
          alt="Home background"
          priority
          fill
          className="object-cover object-center z-[-1]"
        />
        <Header />
        <div className="container max-w-screen-lg text-center mx-auto text-lg h-full">
          <h1 className="mt-7 text-5xl text-white">Link Shortener</h1>
          <p className="max-w-lg mx-auto my-5 text-white">
            Free URL Shortener for transforming long, ugly links into nice,
            memorable and trackable short URLs
          </p>
          <SearchBlock
            onSubmit={handleOnSubmit}
            value={longLink}
            setValue={setLongLink}
          />
          {data.length ? (
            <LinkDataBlock data={data} setLinks={setData} />
          ) : (
            count !== 0 && <LinksList />
          )}
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

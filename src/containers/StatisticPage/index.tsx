import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoBlock from "@/components/InfoBlock";
import SearchBlock from "@/components/SearchBlock";
import TextWithImage from "@/components/TextWithImage";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import contentImage1 from "@/icons/contentImage1.jpg";
import contentImage2 from "@/icons/contentImage2.jpg";
const Statistic = () => {
  const [link, setLink] = useState("");
  const [exampleLink, setExampleLink] = useState("");

  useEffect(() => {
    setExampleLink(`${window.location.origin}/api/wXk_Mot`);
  }, []);

  const handleOnSubmit = () => {
    // eslint-disable-next-line no-console
    console.log(link);
  };
  return (
    <>
      <div className="relative px-5 bg-cover bg-center max-h-max text-white ">
        <Header />
        <Image
          src="/statisticHeroImage.avif"
          alt="Home background"
          priority
          fill
          className="object-cover object-center z-[-1]"
        />
        <div className="container max-w-screen-desktop-small text-center mx-auto">
          <h1 className=" text-5xl py-5">Statistic Page</h1>
          <p className="text-center text-xl pb-5">
            View detailed statistics for your shortened links with our Link
            Shortener&apos;s statistics page. Track clicks, locations, and
            referral sources to gain insights on your link&apos;s performance.
          </p>
          <SearchBlock
            onSubmit={handleOnSubmit}
            value={link}
            containerClasses="mb-5"
            setValue={setLink}
            btnText="get statistic"
            placeholder="Enter here your shortened URL"
          />
          <p className="pb-14">
            Example link:{" "}
            <Link href={exampleLink} className="text-lightPink hover:text-pink">
              {exampleLink}
            </Link>
            <p>(copy and paste the link to see his statistics)</p>
          </p>
        </div>
      </div>
      <TextWithImage
        linkData={{
          src: contentImage2.src,
          alt: "",
        }}
        containerClasses="my-5"
        title="Link Performance"
        listData={[
          "View click-through rates and link performance metrics",
          "Monitor link performance over time",
          "View statistics on user demographics and devices used to access your links",
          "Identify your top-performing links and focus your marketing efforts accordingly",
        ]}
        text="<div><p>Track how well your links are performing! View detailed statistics on how many times your links have been clicked, where your clicks are coming from, and what devices are being used. With this information, you can gain valuable insights into your audience and optimize your marketing efforts.</p><br/><p>Key Features:</p></div>"
      />
      <InfoBlock
        btnData={{
          text: "Shortened link",
          href: "/",
        }}
        title="There was no shortened link created here"
      />
      <TextWithImage
        linkData={{
          src: contentImage1.src,
          alt: "",
        }}
        imageFirst={true}
        title="User Engagement"
        containerClasses="my-5"
        text="<p>You can analyze the number of clicks, unique visitors, and conversion rates to understand how well your links are performing in terms of user engagement. You can also view the top referrers, sources, and campaigns that are driving traffic to your links. This information helps you to identify which channels are working well and which need improvement, allowing you to make data-driven decisions to improve your link engagement.</p>"
      />
      <Footer />
    </>
  );
};

export default Statistic;

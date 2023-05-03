import Header from "@/components/Header";
import Image from "next/image";

const Statistic = () => {
  return (
    <>
      <div className="relative px-5 bg-cover bg-center max-h-[500px] text-white">
        <Header />
        <Image
          src="/statisticHeroImage.avif"
          alt="Home background"
          priority
          fill
          className="object-cover object-center z-[-1]"
        />
        <div className="container max-w-screen-lg text-center mx-auto">
          <h1 className=" text-5xl py-5">Statistic Page</h1>
          <p className="text-center text-xl pb-20">
            View detailed statistics for your shortened links with our Link
            Shortener&apos;s statistics page. Track clicks, locations, and
            referral sources to gain insights on your link&apos;s performance.
            Monitor your campaigns and optimize your marketing strategy for
            maximum engagement and results.
          </p>
        </div>
      </div>
      <div>dsakdskadkkds</div>
    </>
  );
};

export default Statistic;

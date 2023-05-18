import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import InfoBlock from '@/components/InfoBlock';
import SearchBlock from '@/components/SearchBlock';

const Table = dynamic(() => import('@/atoms/Table'), { ssr: false });

const Statistic = () => {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [exampleLink, setExampleLink] = useState('');

  useEffect(() => {
    setExampleLink(`${window.location.origin}/api/wXk_Mot`);
  }, []);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getLinkCode = link.split('/');
    router.push(`${router.asPath}/${getLinkCode[getLinkCode.length - 1]}`);
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
            View detailed statistics for your shortened links with our Link Shortener&apos;s statistics page. Track
            clicks, locations, and referral sources to gain insights on your link&apos;s performance.
          </p>
          <SearchBlock
            onSubmit={handleOnSubmit}
            value={link}
            containerClasses="mb-5 text-black"
            setValue={setLink}
            btnText="get statistic"
            placeholder="Enter here your shortened URL"
          />
          <div className="pb-14">
            Example link:{' '}
            <Link href={exampleLink} target="_blank" className="text-lightPink hover:text-pink">
              {exampleLink}
            </Link>
            <p>(copy and paste the link to see his statistics)</p>
          </div>
        </div>
      </div>
      <Table />
      <InfoBlock
        btnData={{
          text: 'Shortened link',
          href: '/',
        }}
        title="There was no shortened link created here"
      />
      <Footer />
    </>
  );
};

export default Statistic;

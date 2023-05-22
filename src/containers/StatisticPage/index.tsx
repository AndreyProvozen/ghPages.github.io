import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Table from '@/atoms/Table';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { linkData } from '@/constants';
import customFetch from '@/utils/customFetch';

const Statistic = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [linksList, setLinksList] = useState<linkData[]>([]);
  const [count, setCount] = useState(0);
  const [perPage] = useState(5);

  useEffect(() => {
    customFetch(`api/link?userEmail=${encodeURIComponent(session?.user?.email)}&page=${router.query.page || 0}`).then(
      res => {
        setLinksList(res.urlsList);
        setCount(res.count);
      }
    );
  }, [router.query?.page]);

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
        <div className="container max-w-screen-desktop-small text-center mx-auto pb-20  ">
          <h1 className=" text-5xl py-5">Statistic Page</h1>
          <p className="text-center text-xl">
            View detailed statistics for your shortened links with our Link Shortener&apos;s statistics page. Track
            clicks, locations, and referral sources to gain insights on your link&apos;s performance.
          </p>
        </div>
      </div>
      <div className="max-w-screen-desktop mx-auto w-full px-5">
        <h2 className="text-4xl font-bold my-5 text-center">All user Links</h2>
        <Table linksList={linksList} paginationData={{ perPage,  count }} />
      </div>

      <Footer />
    </>
  );
};

export default Statistic;

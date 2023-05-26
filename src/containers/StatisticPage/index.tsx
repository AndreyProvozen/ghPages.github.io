import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import FilterBlockSkeleton from '@/atoms/Skeleton/FilterBlock';
import LinksListSkeleton from '@/atoms/Skeleton/LinksList';
import PaginationSkeleton from '@/atoms/Skeleton/Pagination';
import Header from '@/components/Header';
import LinkDataBlock from '@/components/LinkDataBlock';
import { linkData } from '@/constants';
import customFetch from '@/utils/customFetch';

const Statistic = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [linksList, setLinksList] = useState<linkData[]>([]);
  const [count, setCount] = useState();
  const [perPage] = useState(10);

  useEffect(() => {
    customFetch(
      `api/link?limit=${perPage}&&userEmail=${encodeURIComponent(session?.user?.email)}&page=${router.query.page || 0}`
    ).then(res => {
      setLinksList(res.urlsList);
      setCount(res.count);
    });
  }, [router.query?.page]);

  return (
    <>
      <div className="relative px-5 bg-cover bg-center max-h-max text-white ">
        <Header />
        <Image
          src="/images/statisticHeroImage.avif"
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
        {linksList?.length ? (
          <LinkDataBlock linksList={linksList} count={count} perPage={perPage} setLinksList={setLinksList} />
        ) : count === 0 ? (
          <div className="text-center">
            <Image src={'/images/laptop.png'} alt="" width={200} height={200} className="mx-auto" />

            <h2 className="text-2xl font-bold my-6 mx-auto max-w-xl">
              You currently do not have any links in your collection.
            </h2>
            <Link
              href="/"
              className="text-2xl text-white rounded-md hover:bg-lightPink bg-pink px-6 py-2.5 active:bg-darkPink"
            >
              Create new link
            </Link>
          </div>
        ) : (
          <>
            <FilterBlockSkeleton />
            <LinksListSkeleton quantity={5} />
            <PaginationSkeleton />
          </>
        )}
      </div>
    </>
  );
};

export default Statistic;

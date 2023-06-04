import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import FilterBlockSkeleton from '@/atoms/Skeleton/FilterBlock';
import LinksListSkeleton from '@/atoms/Skeleton/LinksList';
import PaginationSkeleton from '@/atoms/Skeleton/Pagination';
import HeroBlock from '@/components/HeroBlock';
import LinkDataBlock from '@/components/LinkDataBlock';
import { linkDataProps } from '@/constants';
import customFetch from '@/utils/customFetch';

const LinksList = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showFavoriteList, setShowFavoriteList] = useState(router?.query?.search === 'favorite');
  const [linksList, setLinksList] = useState<linkDataProps[]>([]);
  const [count, setCount] = useState();
  const [perPage] = useState(10);

  useEffect(() => {
    if (showFavoriteList) {
      customFetch(`api/favorite?userEmail=${encodeURIComponent(session?.user?.email)}`).then(res => {
        setLinksList(res.urlsList);
        setCount(res.count);
      });
    } else {
      customFetch(
        `api/link?limit=${perPage}&&userEmail=${encodeURIComponent(session?.user?.email)}&page=${
          router.query.page || 0
        }`
      ).then(res => {
        setLinksList(res.urlsList);
        setCount(res.count);
      });
    }
  }, [router.query, showFavoriteList]);

  return (
    <>
      <HeroBlock
        backgroundImage={{ src: '/images/statisticHeroImage.avif', alt: 'Links list page background' }}
        title="Links List Page"
        subTitle="Explore a comprehensive list of your links and effortlessly manage them all on the Links List Page. With
        this powerful tool, you can stay organized, keep track of your important URLs, and optimize your online
        presence."
      />
      <div className="max-w-screen-desktop mx-auto w-full px-5 my-10">
        {linksList?.length ? (
          <LinkDataBlock
            linksList={linksList}
            count={count}
            perPage={perPage}
            setLinksList={setLinksList}
            setShowFavoriteList={setShowFavoriteList}
            showFavoriteList={showFavoriteList}
            linkContainerClasses="border-b border-gray"
            showFiltersAndPagination={true}
          />
        ) : count === 0 ? (
          <div className="text-center">
            <Image src="/images/laptop.png" alt="" width={200} height={200} className="mx-auto" />

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

export default LinksList;

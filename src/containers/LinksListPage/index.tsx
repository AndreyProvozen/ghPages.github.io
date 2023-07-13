import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import FilterBlockSkeleton from '@/atoms/Skeleton/FilterBlockSkeleton';
import LinksListSkeleton from '@/atoms/Skeleton/LinksListSkeleton';
import PaginationSkeleton from '@/atoms/Skeleton/PaginationSkeleton';
import HeroBlock from '@/components/HeroBlock';
import LinkDataBlock from '@/components/LinkDataBlock';
import FiltersBlock from '@/components/LinkDataBlock/FiltersBlock';
import NotFoundSection from '@/components/NotFoundSection';
import { linkDataProps } from '@/constants';
import customFetch from '@/utils/customFetch';

const LinksList = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [linksList, setLinksList] = useState<linkDataProps[]>([]);
  const [count, setCount] = useState();
  const [perPage] = useState(10);

  useEffect(() => {
    if (router?.query?.search === 'favorite') {
      customFetch(`api/favorite?userEmail=${encodeURIComponent(session?.user?.email)}`).then(res => {
        setLinksList(res.urlsList);
        setCount(res.count);
      });
    } else if (router?.query?.searchString) {
      customFetch(`api/search?search=${router.query.searchString}`).then(res => {
        setLinksList(res.searchedList);
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
  }, [router.query]);

  return (
    <>
      <HeroBlock
        bgSrc="/images/statisticHeroImage.avif"
        bgAlt="Links list page background"
        title="Links List Page"
        subTitle="Explore a comprehensive list of your links and effortlessly manage them all on the Links List Page. With
        this powerful tool, you can stay organized, keep track of your important URLs, and optimize your online
        presence."
      />
      <div className="max-w-screen-desktop mx-auto w-full px-5 my-10">
        <FiltersBlock />
        {linksList?.length ? (
          <LinkDataBlock
            linksList={linksList}
            count={count}
            perPage={perPage}
            setLinksList={setLinksList}
            linkContainerClasses="border-b border-gray"
            showFiltersAndPagination={true}
          />
        ) : count === 0 ? (
          <NotFoundSection
            title="You currently do not have any links in your collection."
            href="/"
            linkClassName="text-2xl text-white rounded-md hover:bg-lightPink bg-pink px-6 py-2.5 active:bg-darkPink"
            linkText="Create new link"
          />
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

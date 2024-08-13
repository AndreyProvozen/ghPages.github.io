import { useRouter } from 'next/router';
import { useState, useMemo, type FC } from 'react';

import FiltersBlock from '@/components/FiltersBlock';
import HeroBlock from '@/components/HeroBlock';
import LinkDataBlock from '@/components/LinkDataBlock';
import NotFoundSection from '@/components/NotFoundSection';
import LinksListSkeleton from '@/components/Skeleton/LinksListSkeleton';
import PaginationSkeleton from '@/components/Skeleton/PaginationSkeleton';
import { useGetLinksQuery } from '@/store/api/links.api';
import { useFetchLinksBySearchStringQuery } from '@/store/api/search.api';

const LinksList: FC = () => {
  const { query } = useRouter();

  const favorite = useMemo(() => query?.search === 'favorite', [query]);
  const searchString = useMemo(() => query?.searchString as string, [query]);
  const skip = useMemo(() => !favorite && !searchString, [searchString, favorite]);

  const sortedLinkData = useFetchLinksBySearchStringQuery(
    { favorite, searchString },
    { refetchOnMountOrArgChange: true, skip }
  );

  const linkData = useGetLinksQuery({ perPage: 10 }, { skip: !skip });
  const linksQuery = skip ? linkData : sortedLinkData;

  const { data, isLoading } = linksQuery;

  const [perPage] = useState(9);

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
        {isLoading ? (
          <>
            <LinksListSkeleton quantity={5} />
            <PaginationSkeleton />
          </>
        ) : data.count === 0 ? (
          <NotFoundSection
            title="You currently do not have any links in your collection."
            href="/"
            linkClassName="text-2xl text-white rounded-md hover:bg-lightPink bg-pink px-6 py-2.5 active:bg-darkPink"
            linkText="Create new link"
          />
        ) : (
          <LinkDataBlock
            linksList={data.linksList}
            count={data.count}
            perPage={perPage}
            linkContainerClasses="border-b border-gray"
            showFiltersAndPagination={true}
          />
        )}
      </div>
    </>
  );
};

export default LinksList;

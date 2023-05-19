import { useState } from 'react';
import Link from 'next/link';
import ThreeDots from '@/icons/svg/ThreeDots';
import SearchBlock from '@/components/SearchBlock';
import Heart from '@/icons/svg/Heart';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { ScreenSize } from '@/constants';
import Pagination from '../Pagination';
import TableLinksSkeleton from '../Skeleton/TableLinksList';

const Table = ({ linksList, paginationData }) => {
  const { perPage, currentPage, setCurrentPage, count } = paginationData;
  const totalPage = Math.ceil(count / perPage);

  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);

  const [link, setLink] = useState('');
  const [isFavoriteLinks, setIsFavoriteLinks] = useState(false);

  return (
    <div className="my-10">
      <div className="flex justify-between w-full items-start border-b border-gray">
        <button
          className={`border ${
            isFavoriteLinks ? 'border-pink bg-lightPink/20' : 'border-gray'
          }  px-3 py-2.5 rounded flex items-center ml-3`}
          onClick={() => setIsFavoriteLinks(prev => !prev)}
        >
          <Heart width={20} height={20} className={`${isFavoriteLinks ? 'fill-pink' : 'fill-gray'}`} />
          <p className="ml-2">Favorite</p>
        </button>
        <SearchBlock
          onSubmit={() => null}
          value={link}
          containerClasses="mb-5 text-black w-1/2"
          setValue={setLink}
          placeholder="Search"
        />
      </div>

      {linksList.length ? (
        <div>
          <>
            {linksList.map(({ url, code, clicked }, i) => {
              const shortLink = `${window.location.origin}/api/${code}`;
              return (
                <div key={i} className="flex justify-between items-center  border-b border-gray p-5">
                  <div className="flex flex-col w-full max-w-md">
                    <Link
                      href={`/statistic/${code}`}
                      className="text-darkPink hover:text-pink cursor-pointer line-clamp-1 break-all"
                    >
                      {shortLink}
                    </Link>
                    <p className="max-w-sm text-black/60 line-clamp-1 break-all text-sm">{url}</p>
                  </div>
                  {!isMobile && <div className="ml-10">{clicked}</div>}
                  <ThreeDots
                    className="fill-darkPink hover:fill-pink rotate-90 cursor-pointer ml-10"
                    width={35}
                    height={35}
                    aria-label="Open link settings"
                  />
                </div>
              );
            })}
          </>
          <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />{' '}
        </div>
      ) : (
        <TableLinksSkeleton />
      )}
    </div>
  );
};

export default Table;

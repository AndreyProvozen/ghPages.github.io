import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import SettingsDropDown from '@/components/LinkDataBlock/SettingsDropDown';
import DeleteLinkModal from '@/components/Modal';
import SearchBlock from '@/components/SearchBlock';
import { ScreenSize, linkData } from '@/constants';
import laptop from '@/icons/laptop.png';
import Heart from '@/icons/svg/Heart';
import { useMediaQuery } from '@/utils/useMediaQuery';

import Pagination from '../Pagination';
import TableLinksSkeleton from '../Skeleton/LinksList';

interface Props {
  linksList: linkData[];
  setLinksList: Dispatch<SetStateAction<linkData[]>>;
  count?: number;
  perPage?: number;
  isHomePageList: boolean;
}

const Table: FC<Props> = ({ linksList, count, perPage, setLinksList, isHomePageList }) => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);

  const [link, setLink] = useState('');
  const [isFavoriteLinks, setIsFavoriteLinks] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedLink, setDeletedLink] = useState<linkData | undefined>(undefined);

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
            {linksList.map((linkData, i) => {
              const shortLink = `${window.location.origin}/api/${linkData.code}`;
              return (
                <div key={i} className="flex justify-between items-center  border-b border-gray p-5">
                  <div className="flex flex-col w-full max-w-md">
                    <Link
                      href={`/statistic/${linkData.code}`}
                      className="text-darkPink hover:text-pink cursor-pointer line-clamp-1 break-all"
                    >
                      {shortLink}
                    </Link>
                    <p className="max-w-sm text-black/60 line-clamp-1 break-all text-sm">{linkData.url}</p>
                  </div>
                  {!isMobile && <div className="pl-5">{linkData.clicked}</div>}
                  <SettingsDropDown data={linkData} setIsModalOpen={setIsModalOpen} setDeletedLink={setDeletedLink} />
                </div>
              );
            })}
          </>
          {!isHomePageList && <Pagination count={count} perPage={perPage} />}
        </div>
      ) : count !== 0 ? (
        <TableLinksSkeleton />
      ) : (
        <div className="text-center">
          <Image src={laptop.src} alt="" width={200} height={200} className="mx-auto" />

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
      )}
      {isModalOpen && (
        <DeleteLinkModal
          key={deletedLink?.code}
          setIsModalOpen={setIsModalOpen}
          deletedLink={deletedLink}
          setLinksList={setLinksList}
        />
      )}
    </div>
  );
};

export default Table;

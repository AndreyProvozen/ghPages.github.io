import Link from 'next/link';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import Pagination from '@/atoms/Pagination';
import DeleteLinkModal from '@/components/Modal/DeleteLink';
import { ScreenSize, linkData } from '@/constants';
import { useMediaQuery } from '@/utils/useMediaQuery';

import FiltersBlock from './FiltersBlock';
import SettingsDropDown from './SettingsDropDown';

interface Props {
  linksList: linkData[];
  setLinksList: Dispatch<SetStateAction<linkData[]>>;
  count?: number;
  perPage?: number;
  isHomePageList?: boolean;
}

const LinkDataBlock: FC<Props> = ({ linksList, count, perPage, setLinksList, isHomePageList }) => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedLink, setDeletedLink] = useState<linkData | undefined>(undefined);

  const linkContainerClasses = isHomePageList ? 'bg-white rounded-md mb-5' : 'border-b border-gray ';

  return (
    <div className="my-10">
      {!isHomePageList && <FiltersBlock />}
      <div className="text-start">
        {linksList.map((linkData, i) => (
          <div key={i} className={`flex items-center justify-between p-5 ${linkContainerClasses}`}>
            <div className="flex flex-col w-full max-w-md">
              <Link
                href={`${
                  isHomePageList ? `${window.location.origin}/api/${linkData.code}` : `/statistic/${linkData.code}`
                }`}
                className="text-darkPink hover:text-pink cursor-pointer line-clamp-1 break-all"
              >
                {window.location.origin}/api/{linkData.code}
              </Link>
              <p className="max-w-sm text-black/60 line-clamp-1 break-all text-sm">{linkData.url}</p>
            </div>
            {!isMobile && <div className="pl-5">{linkData.clicked}</div>}
            <SettingsDropDown
              data={linkData}
              setIsModalOpen={setIsDeleteModalOpen}
              setIsDeleteModalOpen={setDeletedLink}
            />
          </div>
        ))}
        {!isHomePageList && <Pagination count={count} perPage={perPage} />}
      </div>
      {isDeleteModalOpen && (
        <DeleteLinkModal
          key={deletedLink?.code}
          setIsModalOpen={setIsDeleteModalOpen}
          deletedLink={deletedLink}
          setLinksList={setLinksList}
        />
      )}
    </div>
  );
};

export default LinkDataBlock;

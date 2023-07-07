import { getCookie, setCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import Pagination from '@/atoms/Pagination';
import { ScreenSize, flashMessageType, linkDataProps } from '@/constants';
import Heart from '@/icons/svg/Heart';
import { useFlashMessage } from '@/utils/FlashMessage';
import { useMediaQuery } from '@/utils/useMediaQuery';

import SettingsDropDown from './SettingsDropDown';

const DeleteLinkModal = dynamic(() => import('@/components/Modals/DeleteLink'), { ssr: false });

interface Props {
  linksList: linkDataProps[];
  setLinksList: Dispatch<SetStateAction<linkDataProps[]>>;
  count?: number;
  perPage?: number;
  linkContainerClasses?: string;
  showFiltersAndPagination?: boolean;
}

const LinkDataBlock: FC<Props> = ({
  linksList,
  count,
  perPage,
  setLinksList,
  linkContainerClasses,
  showFiltersAndPagination,
}) => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);
  const { addFlashMessage } = useFlashMessage();

  const [favoriteList, setFavoriteList] = useState<string[]>(JSON.parse((getCookie('favorite') as string) || '[]'));
  const [deletedLink, setDeletedLink] = useState<linkDataProps | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setCookie('favorite', favoriteList);
  }, [favoriteList]);

  const toggleFavorite = (isFavoriteLink: boolean, code: string) => {
    if (isFavoriteLink) {
      setFavoriteList(favoriteList.filter(item => item !== code));
      addFlashMessage('The link has been removed from the favorites list', flashMessageType.SUCCESSFUL);
      return null;
    }
    setFavoriteList([...favoriteList, code]);
    addFlashMessage('Link has been added to the favorites list', flashMessageType.SUCCESSFUL);
  };

  return (
    <>
      <div className="text-start">
        {linksList.map((linkData, i) => {
          const isFavoriteLink = favoriteList.includes(linkData.code);
          return (
            <div
              //  animate__fadeInDown
              key={i}
              className={`flex items-center justify-between p-5 ${linkContainerClasses}`}
            >
              <div className="flex flex-col w-full max-w-md">
                <Link
                  target={!showFiltersAndPagination ? '_blank' : '_self'}
                  href={`${
                    !showFiltersAndPagination
                      ? `${window.location.origin}/api/${linkData.code}`
                      : `/links/${linkData.code}`
                  }`}
                  className="text-darkPink hover:text-pink cursor-pointer line-clamp-1 break-all"
                >
                  {window.location.origin}/api/{linkData.code}
                </Link>
                <p className="max-w-sm text-black/60 line-clamp-1 break-all text-sm">{linkData.url}</p>
              </div>
              {!isMobile && (
                <>
                  <div className="pr-10 pl-5">{linkData.clicked}</div>{' '}
                  <Heart
                    width={24}
                    onClick={() => toggleFavorite(isFavoriteLink, linkData.code)}
                    className={`${
                      !isFavoriteLink ? 'fill-none' : 'fill-darkRed'
                    } ml-auto cursor-pointer stroke-2 stroke-darkRed`}
                  />
                </>
              )}
              <SettingsDropDown
                data={linkData}
                setIsModalOpen={setIsDeleteModalOpen}
                setIsDeleteModalOpen={setDeletedLink}
              />
            </div>
          );
        })}
        {showFiltersAndPagination && count > perPage && <Pagination count={count} perPage={perPage} />}
      </div>
      {isDeleteModalOpen && (
        <DeleteLinkModal
          key={deletedLink?.code}
          setIsModalOpen={setIsDeleteModalOpen}
          deletedLink={deletedLink}
          setLinksList={setLinksList}
        />
      )}
    </>
  );
};

export default LinkDataBlock;

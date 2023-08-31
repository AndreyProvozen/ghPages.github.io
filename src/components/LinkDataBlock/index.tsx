import { getCookie, setCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { ScreenSize, flashMessageType, linkDataProps } from '@/constants';
import Heart from '@/icons/Heart';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import getConfigVariable from '@/utils/getConfigVariable';
import useMediaQuery from '@/utils/useMediaQuery';

import SettingsDropDown from './SettingsDropDown';

const DeleteLinkModal = dynamic(() => import('@/atoms/Modals/DeleteLink'), { ssr: false });
const Pagination = dynamic(() => import('@/atoms/Pagination'), { ssr: false });

interface Props {
  linksList: linkDataProps[];
  count?: number;
  perPage?: number;
  linkContainerClasses?: string;
  showFiltersAndPagination?: boolean;
}

const API_HOST = getConfigVariable('API_HOST');

const LinkDataBlock: FC<Props> = ({ linksList, count, perPage, linkContainerClasses, showFiltersAndPagination }) => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);
  const dispatch = useAppDispatch();

  const [favoriteList, setFavoriteList] = useState<string[]>(JSON.parse((getCookie('favorite') as string) || '[]'));
  const [deletedLink, setDeletedLink] = useState<linkDataProps | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setCookie('favorite', favoriteList);
  }, [favoriteList]);

  const toggleFavorite = (isFavoriteLink: boolean, code: string) => {
    if (isFavoriteLink) {
      setFavoriteList(favoriteList.filter(item => item !== code));
      dispatch(
        addNewFlashMessage({
          message: 'The link has been removed from the favorites list',
          type: flashMessageType.SUCCESSFUL,
        })
      );
      return null;
    }
    setFavoriteList([...favoriteList, code]);
    dispatch(
      addNewFlashMessage({ message: 'Link has been added to the favorites list', type: flashMessageType.SUCCESSFUL })
    );
  };

  return (
    <>
      <div className="text-start">
        {linksList.map((linkData, i) => {
          const isFavoriteLink = favoriteList.includes(linkData.code);

          return (
            <div key={linkData.code + i} className={`flex items-center justify-between p-5 ${linkContainerClasses}`}>
              <div className="flex flex-col w-full max-w-md">
                <Link
                  target={!showFiltersAndPagination ? '_blank' : '_self'}
                  href={`${!showFiltersAndPagination ? `${API_HOST}/${linkData.code}` : `/links/${linkData.code}`}`}
                  className="text-darkPink hover:text-pink cursor-pointer line-clamp-1 break-all"
                >
                  {API_HOST}/{linkData.code}
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
        <DeleteLinkModal key={deletedLink?.code} setIsModalOpen={setIsDeleteModalOpen} deletedLink={deletedLink} />
      )}
    </>
  );
};

export default LinkDataBlock;

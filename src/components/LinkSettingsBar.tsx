import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

import { ScreenSize, flashMessageType } from '@/constants';
import ClipBoard from '@/icons/svg/ClipBoard';
import Heart from '@/icons/svg/Heart';
import Trash from '@/icons/svg/Trash';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import getConfigVariable from '@/utils/getConfigVariable';
import { useMediaQuery } from '@/utils/useMediaQuery';

import DeleteLinkModal from './Modals/DeleteLink';

const API_HOST = getConfigVariable('API_HOST');

const LinkSettingsBar = ({ link }) => {
  const dispatch = useAppDispatch();
  const isSmallMobile = useMediaQuery(ScreenSize.MOBILE_BELOW);

  const [favoriteList, setFavoriteList] = useState<string[]>(JSON.parse((getCookie('favorite') as string) || '[]'));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isFavoriteLink = useMemo(() => favoriteList.includes(link.code), [link, favoriteList]);

  useEffect(() => {
    setCookie('favorite', favoriteList);
  }, [favoriteList]);

  const barData = useMemo(
    () => [
      {
        fieldTitle: !isSmallMobile && 'Copy',
        fieldFunction: () => {
          navigator.clipboard.writeText(`${API_HOST}/${link.code}`);
          dispatch(addNewFlashMessage({ message: 'Link copied successfully', type: flashMessageType.SUCCESSFUL }));
        },
        fieldImage: <ClipBoard fill="black" />,
      },
      {
        fieldTitle: !isSmallMobile && 'Edit',
        fieldFunction: () => null,
        fieldImage: <Image src="/svg/edit.svg" width={24} height={24} alt="" />,
      },
      {
        fieldTitle: !isSmallMobile && 'Delete',
        fieldFunction: () => setIsDeleteModalOpen(true),
        fieldImage: <Trash fill="black" />,
      },
      {
        fieldFunction: () => {
          if (isFavoriteLink) {
            setFavoriteList(favoriteList.filter(item => item !== link.code));
            dispatch(
              addNewFlashMessage({
                message: 'The link has been removed from the favorites list',
                type: flashMessageType.SUCCESSFUL,
              })
            );
            return null;
          }
          setFavoriteList([...favoriteList, link.code]);
          dispatch(
            addNewFlashMessage({
              message: 'Link has been added to the favorites list',
              type: flashMessageType.SUCCESSFUL,
            })
          );
        },
        fieldImage: (
          <Heart
            width={24}
            fill={isFavoriteLink ? 'red' : 'none'}
            stroke={isFavoriteLink ? 'red' : 'black'}
            strokeWidth="2"
          />
        ),
      },
    ],
    [isSmallMobile, link, favoriteList]
  );
  return (
    <>
      <div className="flex justify-between mt-5 gap-2 items-center max-tablet:flex-col-reverse">
        <div className="flex gap-3">
          <div className="border bg-lightOrange/20 border-lightOrange rounded-lg flex items-center px-3 ">
            Total clicks:
            <p className="bg-lightOrange font-bold p-2 ml-2">{link.clicked}</p>
          </div>
          <p className="border bg-darkGreen/20 border-darkGreen font-bold rounded-lg flex items-center px-3 p-2">
            {new Date(link.createdAt).toDateString()}
          </p>
        </div>
        <div className="flex justify-end gap-3  items-center">
          {barData.map(({ fieldTitle, fieldFunction, fieldImage }, i) => {
            return (
              <button
                key={fieldTitle + i}
                onClick={fieldFunction}
                className="flex border rounded-lg p-2 hover:border-lightPink border-gray  hover:bg-pink/10"
              >
                {fieldImage}
                {fieldTitle && <span className="ml-1">{fieldTitle}</span>}
              </button>
            );
          })}
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteLinkModal setIsModalOpen={setIsDeleteModalOpen} deletedLink={link} isStatisticPage={true} />
      )}
    </>
  );
};

export default LinkSettingsBar;

import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { flashMessageType } from '@/constants';
import ClipBoard from '@/icons/svg/ClipBoard';
import Heart from '@/icons/svg/Heart';
import Trash from '@/icons/svg/Trash';
import { useFlashMessage } from '@/utils/FlashMessage';

import DeleteLinkModal from '../Modal/DeleteLink';

const LinkSettingsBar = ({ link, setLink }) => {
  const flashMessage = useFlashMessage();

  const [favoriteList, setFavoriteList] = useState<string[]>(JSON.parse((getCookie('favorite') as string) || '[]'));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isFavoriteLink = favoriteList.includes(link.code);

  useEffect(() => {
    setCookie('favorite', favoriteList);
  }, [favoriteList]);

  const barData = [
    {
      fieldTitle: 'Copy',
      fieldFunction: () => {
        navigator.clipboard.writeText(`${window.location.origin}/api/${link.code}`);
        flashMessage.addFlashMessage('Link copied successfully', flashMessageType.SUCCESSFUL);
      },
      fieldImage: <ClipBoard fill="black" />,
    },
    {
      fieldTitle: 'Edit',
      fieldFunction: () => null,
      fieldImage: <Image src="/svg/edit.svg" width={24} height={24} alt="" />,
    },
    {
      fieldTitle: 'Delete',
      fieldFunction: () => setIsDeleteModalOpen(true),
      fieldImage: <Trash fill="black" />,
    },
    {
      fieldFunction: () => {
        if (isFavoriteLink) {
          setFavoriteList(favoriteList.filter(item => item !== link.code));
          flashMessage.addFlashMessage(
            'The link has been removed from the favorites list',
            flashMessageType.SUCCESSFUL
          );
          return null;
        }
        setFavoriteList([...favoriteList, link.code]);
        flashMessage.addFlashMessage('Link has been added to the favorites list', flashMessageType.SUCCESSFUL);
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
  ];
  return (
    <>
      <div className="flex justify-end gap-5 mt-5 items-center">
        {barData.map(({ fieldTitle, fieldFunction, fieldImage }) => {
          return (
            <button
              key={fieldTitle}
              onClick={fieldFunction}
              className="flex border rounded-lg p-2 hover:border-lightPink border-gray  hover:bg-pink/10"
            >
              {fieldImage}
              {fieldTitle && <span className="ml-1">{fieldTitle}</span>}
            </button>
          );
        })}
      </div>
      {isDeleteModalOpen && (
        <DeleteLinkModal
          setIsModalOpen={setIsDeleteModalOpen}
          deletedLink={link}
          setLinksList={setLink}
          isStatisticPage={true}
        />
      )}
    </>
  );
};

export default LinkSettingsBar;

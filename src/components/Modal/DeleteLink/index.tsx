import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Dispatch, FC, SetStateAction } from 'react';

import { linkDataProps } from '@/constants';
import customFetch from '@/utils/customFetch';

import ModalWrapper from '../ModalWrapper';

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setLinksList: Dispatch<SetStateAction<linkDataProps[]>>;
  deletedLink?: linkDataProps;
  isStatisticPage?: boolean;
}

const DeleteLinkModal: FC<Props> = ({ setIsModalOpen, deletedLink, setLinksList, isStatisticPage }) => {
  const { data: session } = useSession();
  const shortLink = `${window.location.origin}/api/${deletedLink?.code}`;
  const router = useRouter();

  const updateLinksList = (deletedLinkCode: string) => {
    if (isStatisticPage) {
      return router.push('/links');
    }
    setLinksList(prev => prev.filter(item => item.code !== deletedLinkCode));
    setIsModalOpen(false);
  };

  const handleDeleteLink = () => {
    const url = `${window.location.origin}/api/link?code=${deletedLink?.code}&userEmail=${encodeURIComponent(
      session?.user?.email
    )}`;

    customFetch(url, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    }).then(deletedLinkCode => {
      return updateLinksList(deletedLinkCode);
    });
  };

  return (
    <ModalWrapper title="Delete link" setIsModalOpen={setIsModalOpen}>
      <div className="py-4 px-8">
        <p>You really want to delete this link?</p>
        <Link target="_blank" href={shortLink} className="text-darkPink hover:text-pink">
          {shortLink}
        </Link>
      </div>
      <div className="flex justify-between border-t-2 border-t-gray">
        <button
          className="hover:bg-darkRed px-4 py-2 w-1/2 border-r-2 border-r-gray rounded-bl-lg"
          onClick={() => setIsModalOpen(false)}
        >
          No
        </button>
        <button className="hover:bg-darkGreen px-4 py-2 w-1/2 rounded-br-lg" onClick={handleDeleteLink}>
          Yes
        </button>
      </div>
    </ModalWrapper>
  );
};
export default DeleteLinkModal;

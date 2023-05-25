import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Dispatch, FC, SetStateAction } from 'react';

import { linkData } from '@/constants';
import customFetch from '@/utils/customFetch';

import ModalWrapper from '../ModalWrapper';

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setLinksList: Dispatch<SetStateAction<linkData[]>>;
  deletedLink?: linkData;
}

const DeleteLinkModal: FC<Props> = ({ setIsModalOpen, deletedLink, setLinksList }) => {
  const { data: session } = useSession();
  const shortLink = `${window.location.origin}/api/${deletedLink?.code}`;

  const handleDeleteLink = () => {
    customFetch(`api/link?code=${deletedLink?.code}&userEmail=${encodeURIComponent(session?.user?.email)}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    }).then(deletedLinkCode => setLinksList(prev => prev.filter(item => item.code !== deletedLinkCode)));
    setIsModalOpen(false);
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

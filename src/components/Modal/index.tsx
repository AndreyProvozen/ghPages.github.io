import Link from 'next/link';
import { Dispatch, FC, SetStateAction, MouseEvent } from 'react';
import { useSession } from 'next-auth/react';
import Close from '@/icons/svg/Close';
import { linkData } from '@/interface';
import customFetch from '@/utils/customFetch';

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setLinksList: Dispatch<SetStateAction<linkData[]>>;
  deletedLink?: linkData;
}

const DeleteLinkModal: FC<ModalProps> = ({ setIsModalOpen, deletedLink, setLinksList }) => {
  const { data: session } = useSession();
  const shortLink = `${window.location.origin}/api/${deletedLink?.code}`;

  const handleDeleteLink = () => {
    customFetch(`api/link?code=${deletedLink?.code}&session=${Boolean(session?.user?.email)}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    }).then(deletedLinkCode => setLinksList(prev => prev.filter(item => item.code !== deletedLinkCode)));
    setIsModalOpen(false);
  };

  const handleModalClick = (e: MouseEvent) => e.target === e.currentTarget && setIsModalOpen(false);

  return (
    <div
      onClick={handleModalClick}
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black z-50 bg-opacity-75"
    >
      <div className="bg-white rounded-lg">
        <div className="border-b-2 border-b-gray py-2 flex justify-between">
          <b className="text-xl mx-auto">Delete link</b>
          <button onClick={() => setIsModalOpen(false)}>
            <Close fill="black" width="20px" height="20px" className="mr-2" />
          </button>
        </div>

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
      </div>
    </div>
  );
};
export default DeleteLinkModal;

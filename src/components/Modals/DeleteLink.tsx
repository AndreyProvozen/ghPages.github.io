import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Dispatch, FC, SetStateAction, useMemo } from 'react';

import { linkDataProps } from '@/constants';
import { deleteLink } from '@/store/slices/links.slice';
import { useAppDispatch } from '@/store/storeHooks';
import getConfigVariable from '@/utils/getConfigVariable';

import ModalWrapper from './ModalWrapper';

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  deletedLink?: linkDataProps;
  isStatisticPage?: boolean;
}

const API_HOST = getConfigVariable('API_HOST');

const DeleteLinkModal: FC<Props> = ({ setIsModalOpen, deletedLink, isStatisticPage }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const shortLink = useMemo(() => `${API_HOST}/${deletedLink?.code}`, [deletedLink?.code]);

  const endpointUrl = useMemo(
    () => `${API_HOST}/link?code=${deletedLink?.code}&userEmail=${encodeURIComponent(session?.user?.email)}`,
    [deletedLink?.code, session?.user]
  );

  const handleDeleteLink = async () => {
    await dispatch(deleteLink(endpointUrl));

    if (isStatisticPage) return push('/links');

    setIsModalOpen(false);
  };

  return (
    <ModalWrapper title="Delete link" setIsModalOpen={setIsModalOpen} onConfirm={handleDeleteLink}>
      <div className="py-4 px-8">
        <p>You really want to delete this link?</p>
        <Link target="_blank" href={shortLink} className="text-darkPink hover:text-pink">
          {shortLink}
        </Link>
      </div>
    </ModalWrapper>
  );
};
export default DeleteLinkModal;

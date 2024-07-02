import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Dispatch, FC, SetStateAction, useMemo } from 'react';

import { flashMessageType, type linkDataProps } from '@/constants';
import { useDeleteLinkMutation } from '@/store/api/links.api';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import getConfigVariable from '@/utils/getConfigVariable';

import ModalWrapper from '../../atoms/ModalWrapper/ModalWrapper';

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
  const [deleteLink] = useDeleteLinkMutation();

  const shortLink = useMemo(() => `${API_HOST}/${deletedLink?.code}`, [deletedLink?.code]);

  const handleDeleteLink = async () => {
    const response = await deleteLink({ code: deletedLink?.code, userEmail: session?.user?.email });
    // fix me error type
    dispatch(
      addNewFlashMessage(
        'error' in response && 'data' in response.error
          ? { message: response.error.data as string, type: flashMessageType.ERROR }
          : { message: 'Shortened link successfully added', type: flashMessageType.SUCCESSFUL }
      )
    );

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

import { signOut } from 'next-auth/react';
import { Dispatch, FC, SetStateAction } from 'react';

import ModalWrapper from './ModalWrapper';

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ConfirmSignOut: FC<Props> = ({ setIsModalOpen }) => (
  <ModalWrapper setIsModalOpen={setIsModalOpen} title="Sign out" onConfirm={() => signOut()}>
    <div className="py-4 px-8 text-black">
      <p className="text-black">You really want to sign out?</p>
    </div>
  </ModalWrapper>
);

export default ConfirmSignOut;

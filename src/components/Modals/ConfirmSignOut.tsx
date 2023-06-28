import { signOut } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';

import ModalWrapper from './ModalWrapper';

const ConfirmSignOut = ({ setIsSignOutModalOpen }: { setIsSignOutModalOpen: Dispatch<SetStateAction<boolean>> }) => (
  <ModalWrapper setIsModalOpen={setIsSignOutModalOpen} title="Sign out" onConfirm={() => signOut()}>
    <div className="py-4 px-8 text-black">
      <p className="text-black">You really want to sign out?</p>
    </div>
  </ModalWrapper>
);

export default ConfirmSignOut;

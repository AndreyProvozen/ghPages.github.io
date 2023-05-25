import { signOut } from 'next-auth/react';
import React from 'react';

import ModalWrapper from '../ModalWrapper';

const ConfirmSignOut = ({ setIsSignOutModalOpen }) => {
  return (
    <ModalWrapper setIsModalOpen={setIsSignOutModalOpen} title="Sign out">
      <div className="py-4 px-8 text-black">
        <p className="text-black">You really want to sign out?</p>
      </div>
      <div className="flex justify-between border-t-2 border-t-gray">
        <button
          className="hover:bg-darkRed px-4 py-2 w-1/2 border-r-2 border-r-gray rounded-bl-lg text-black"
          onClick={() => setIsSignOutModalOpen(false)}
        >
          No
        </button>
        <button className="hover:bg-darkGreen px-4 py-2 w-1/2 rounded-br-lg text-black" onClick={() => signOut()}>
          Yes
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmSignOut;

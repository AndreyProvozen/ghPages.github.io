import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import Close from '@/icons/svg/Close';

interface Props {
  title: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const ModalWrapper: FC<Props> = ({ setIsModalOpen, title, children }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [setIsModalOpen]);

  const handleModalClick = e => e.target === e.currentTarget && setIsModalOpen(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleModalClick}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleModalClick(e);
        }
      }}
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black z-50 bg-opacity-75"
    >
      <div className="animate__animated animate__fadeInDown overflow-y-auto bg-white rounded-lg">
        <div className="border-b-2 border-b-gray py-2 flex justify-between">
          <b className="text-xl mx-auto text-black">{title}</b>
          <button onClick={() => setIsModalOpen(false)}>
            <Close fill="black" width="20px" height="20px" className="mr-2" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;

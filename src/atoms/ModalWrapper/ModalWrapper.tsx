import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef } from 'react';

import Close from '@/icons/Close';

import { MODAL_WRAPPER_TEST_IDS } from './testIds';

interface Props {
  title: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  onConfirm: () => void;
}

const ModalWrapper: FC<Props> = ({ setIsModalOpen, title, children, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [setIsModalOpen]);

  const closeModal = (isConfirm: boolean) => {
    if (modalRef.current) {
      modalRef.current.classList.add('animate__zoomOut');
      setTimeout(() => {
        isConfirm ? onConfirm() : setIsModalOpen(false);
      }, 500);
    }
  };

  return (
    // fix me
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      data-testid={MODAL_WRAPPER_TEST_IDS.ROOT}
      onClick={() => closeModal(false)}
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black z-50 bg-opacity-75"
    >
      <div
        ref={modalRef}
        className="animate__animated animate__zoomIn animate__faster overflow-y-auto bg-white rounded-lg"
      >
        <div className="border-b-2 border-b-gray py-2 flex justify-between">
          <b className="text-xl mx-auto text-black">{title}</b>
          <button data-testid={MODAL_WRAPPER_TEST_IDS.CLOSE_BUTTON} onClick={() => closeModal(false)}>
            <Close fill="black" width="20px" height="20px" className="mr-2" />
          </button>
        </div>
        {children}
        <div className="flex justify-between border-t-2 border-t-gray text-black">
          <button
            className="hover:bg-darkRed px-4 py-2 w-1/2 border-r-2 border-r-gray rounded-bl-lg"
            onClick={() => closeModal(false)}
          >
            No
          </button>
          <button className="hover:bg-darkGreen px-4 py-2 w-1/2 rounded-br-lg" onClick={() => closeModal(true)}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;

import { useEffect, useRef, RefCallback } from 'react';

import type { flashMessageType } from '@/constants';
import Close from '@/icons/Close';
import { removeFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';

export interface FlashMessage {
  message: string;
  type: flashMessageType;
}

const FlashMessage = () => {
  const dispatch = useAppDispatch();
  const flashMessages = useAppSelector(state => state.flashMessages);

  const timerRef = useRef<NodeJS.Timeout>();
  const animationRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (flashMessages.length > 0) {
      timerRef.current = setTimeout(() => {
        animationRefs.current.forEach((ref, index) => {
          if (!ref) return;

          if (index === 0) return ref.classList.add('animate__zoomOut');

          ref.style.display = 'none';
        });

        setTimeout(() => {
          if (flashMessages.length > 0) {
            dispatch(removeFlashMessage(0));
          }
        }, 300);
      }, 3000);
    }

    return () => clearTimeout(timerRef.current);
  }, [flashMessages]);

  const handleRef: RefCallback<HTMLDivElement> = element => {
    if (element) animationRefs.current.push(element);
  };

  return (
    <div className="fixed w-full bottom-8 z-50 text-white">
      <div className="mx-auto grid gap-3 w-full max-w-md">
        {flashMessages.map(({ type, message }, index) => (
          <div
            key={`${message}-${index}`}
            ref={handleRef}
            className="flex justify-between p-4 rounded-lg animate__animated animate__zoomIn animate__faster"
            style={{ backgroundColor: type }}
          >
            <p>{message}</p>
            <button onClick={() => dispatch(removeFlashMessage(index))}>
              <Close />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashMessage;

import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

import type { flashMessageType } from '@/constants';
import Close from '@/icons/svg/Close';

interface FlashMessage {
  message: string;
  type: flashMessageType;
}

interface FlashMessageContextProps {
  addFlashMessage: (message: string, type: flashMessageType) => void;
}

const FlashMessageContext = createContext<FlashMessageContextProps>({
  addFlashMessage: () => null,
});

const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [flashMessages, setFlashMessages] = useState<FlashMessage[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();
  const animationRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (flashMessages.length > 0) {
      timerRef.current = setTimeout(() => {
        animationRefs.current.forEach((ref, index) => {
          if (!ref) return;

          if (index === 0) {
            return ref.classList.add('animate__zoomOut');
          }
          ref.style.display = 'none';
        });

        setTimeout(() => {
          setFlashMessages(prevMessages => prevMessages.slice(1));
        }, 300);
      }, 3000);
    }

    return () => clearTimeout(timerRef.current);
  }, [flashMessages]);

  const addFlashMessage = (message: string, type: flashMessageType) => {
    setFlashMessages(prev => [...prev, { message, type }].slice(-5));
  };

  const removeFlashMessage = (index: number) => {
    setFlashMessages(prev => prev.filter((_, i) => i !== index));
  };

  const renderFlashMessages = () => (
    <div className="fixed w-full bottom-8 z-50 text-white">
      <div className="mx-auto grid gap-3 w-full max-w-md">
        {flashMessages.map(({ type, message }, index) => (
          <div
            key={index}
            ref={el => (animationRefs.current[index] = el)}
            className="flex justify-between p-4 rounded-lg animate__animated animate__zoomIn animate__faster"
            style={{ backgroundColor: type }}
          >
            <p>{message}</p>
            <button onClick={() => removeFlashMessage(index)}>
              <Close />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <FlashMessageContext.Provider value={{ addFlashMessage }}>
      {children}
      {renderFlashMessages()}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => useContext(FlashMessageContext);

export default FlashMessageProvider;

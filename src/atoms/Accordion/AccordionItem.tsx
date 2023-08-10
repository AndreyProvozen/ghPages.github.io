import { FC } from 'react';

import Chevron from '@/icons/svg/Chevron';
import ClassNames from '@/utils/classNames';

interface Props {
  title: string;
  description: string;
  isOpened: boolean;
  onClick: () => void;
}

const AccordionItem: FC<Props> = ({ title, description, isOpened, onClick }) => (
  <div>
    <button className="p-2 cursor-pointer flex justify-between border-b-2 w-full hover:bg-lightPink" onClick={onClick}>
      <h3 className="font-bold text-lg">{title}</h3>
      <Chevron
        width="30px"
        height="30px"
        className={ClassNames('transform transition ease-out duration-300', { 'rotate-180': isOpened })}
      />
    </button>
    <div
      className={`transition-max-height ease-in-out duration-300 overflow-hidden ${
        isOpened ? 'max-h-[1000px]' : 'max-h-0'
      }`}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </div>
);

export default AccordionItem;

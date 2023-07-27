import Link from 'next/link';
import { FC, useState } from 'react';

import Chevron from '@/icons/svg/Chevron';
import Close from '@/icons/svg/Close';

import type { MenuProps } from '../components/Header/MobileHeader';

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
  menu: MenuProps[];
}

const Drover: FC<Props> = ({ isOpen, handleToggle, menu }) => {
  const [level, setLevel] = useState(1);
  const [currentMenu, setCurrentMenu] = useState([menu]);

  const selectLevel = (nextLevel: number, menu: MenuProps[]) => {
    setLevel(nextLevel);
    setCurrentMenu(l => {
      l[level] = menu;
      return l;
    });
  };

  const backToPrevLevel = () => {
    setLevel(level - 1);
    setCurrentMenu(prevLevel => prevLevel.slice(0, level - 1));
  };

  const renderDroverHeader = () => (
    <div className="flex justify-between items-center p-4 border-b">
      {level > 1 ? (
        <button onClick={backToPrevLevel} className="font-bold text-2xl">
          back
        </button>
      ) : (
        <h2 className="font-bold text-2xl">Menu</h2>
      )}
      <button className="text-gray-500 focus:outline-none" onClick={handleToggle} aria-label="Close button">
        <Close />
      </button>
    </div>
  );

  return (
    <div className="relative text-white">
      <div
        className={`${
          isOpen ? 'right-0' : 'right-full'
        } fixed z-40 top-0 w-full h-screen bg-lightBlack ease-in-out transition-all duration-500`}
      >
        {renderDroverHeader()}
        <div
          className="px-4 py-8 flex ease-in-out transition-all duration-500"
          style={{
            transform: `translateX(calc(-100% * ${level - 1} + 16px * ${level - 1}))`,
          }}
        >
          {currentMenu.map((item, index) => (
            <div key={index} style={{ minWidth: 'calc(100% + 16px)' }}>
              {item.map((m, i) => (
                <div key={m.name + i}>
                  {m.children && (
                    <button className="flex font-bold text-xl" onClick={() => selectLevel(level + 1, m.children)}>
                      {m.name}
                      <Chevron fill="white" className="rotate-[270deg]" width="30px" height="30px" />
                    </button>
                  )}
                  {m.link && (
                    <Link className="font-bold text-xl" href={m.link}>
                      {m.name}
                    </Link>
                  )}
                  {m.handleFunction && (
                    <button className="font-bold text-xl" onClick={m.handleFunction}>
                      {m.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drover;

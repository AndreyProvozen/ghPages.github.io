import { FC, useState } from 'react';

import DroverContent from './DroverContent';
import DroverHeader from './DroverHeader';
import type { MenuProps } from '../../components/Header/MobileHeader';

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

  return (
    <div className="relative text-white">
      <div
        className={`${
          isOpen ? 'right-0' : 'right-full'
        } fixed z-40 top-0 w-full h-screen bg-lightBlack ease-in-out transition-all duration-500`}
      >
        <DroverHeader level={level} handleToggle={handleToggle} backToPrevLevel={backToPrevLevel} />
        <DroverContent selectLevel={selectLevel} currentMenu={currentMenu} level={level} />
      </div>
    </div>
  );
};

export default Drover;

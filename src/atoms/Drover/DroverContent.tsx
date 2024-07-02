import Link from 'next/link';
import { FC } from 'react';

import type { MenuProps } from '@/components/Header/MobileHeader';
import Chevron from '@/icons/Chevron';

interface Props {
  currentMenu: MenuProps[][];
  level: number;
  selectLevel: (nextLevel: number, menu: MenuProps[]) => void;
}

const DroverContent: FC<Props> = ({ currentMenu, level, selectLevel }) => (
  <div
    className="px-4 py-8 flex ease-in-out transition-all duration-500"
    style={{ transform: `translateX(calc(-100% * ${level - 1} + 16px * ${level - 1}))` }}
  >
    {currentMenu.map((levelMenu, index) => (
      <div key={index} style={{ minWidth: 'calc(100% + 16px)' }}>
        {levelMenu.map(menuItem => (
          <div key={menuItem.name}>
            {menuItem.children && (
              <button className="flex font-bold text-xl" onClick={() => selectLevel(level + 1, menuItem.children)}>
                {menuItem.name}
                <Chevron fill="white" className="rotate-[270deg]" width="30px" height="30px" />
              </button>
            )}
            {menuItem.link && (
              <Link className="font-bold text-xl" href={menuItem.link}>
                {menuItem.name}
              </Link>
            )}
            {menuItem.handleFunction && (
              <button className="font-bold text-xl" onClick={menuItem.handleFunction}>
                {menuItem.name}
              </button>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default DroverContent;

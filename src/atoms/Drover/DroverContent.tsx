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
);

export default DroverContent;

import React, { FC, useState } from 'react';
import { signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Menu from '@/icons/svg/Menu';

export interface MenuProps {
  name: string;
  link?: string;
  handleFunction?: () => void;
  children?: MenuProps[];
}

interface MobileHeaderProps {
  textBlack?: boolean;
  session: any;
}

const Drover = dynamic(() => import('@/atoms/Drover'), { ssr: false });

const MobileHeader: FC<MobileHeaderProps> = ({ textBlack, session }) => {
  const [isOpenDrover, setIsOpenDrover] = useState(false);
  const handleToggle = () => {
    setIsOpenDrover(!isOpenDrover);
  };

  const menuMobile: MenuProps[] = [
    { name: 'Home', link: '/' },
    {
      name: 'Statistic',
      link: '/statistic',
    },
    session
      ? {
          name: 'My profile',
          children: [
            { name: 'Favorite links', link: '/' },
            {
              name: 'Sign out',
              handleFunction: signOut,
            },
          ],
        }
      : { name: 'Sign in', link: '/auth' },
  ];
  return (
    <div>
      <Menu onClick={handleToggle} cursor="pointer" className={`${textBlack ? 'fill-black' : 'fill-white'}`} />
      <Drover isOpen={isOpenDrover} handleToggle={handleToggle} menu={menuMobile} />
    </div>
  );
};

export default MobileHeader;

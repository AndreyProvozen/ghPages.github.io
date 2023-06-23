import dynamic from 'next/dynamic';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { FC, useState } from 'react';

import Menu from '@/icons/svg/Menu';

export interface MenuProps {
  name: string;
  link?: string;
  handleFunction?: () => void;
  children?: MenuProps[];
}

interface Props {
  textBlack?: boolean;
  session: Session | null;
}

const Drover = dynamic(() => import('@/atoms/Drover'), { ssr: false });

const MobileHeader: FC<Props> = ({ textBlack, session }) => {
  const [isOpenDrover, setIsOpenDrover] = useState(false);

  const handleToggle = () => {
    setIsOpenDrover(!isOpenDrover);
  };

  const menuMobile: MenuProps[] = [
    { name: 'Home', link: '/' },
    {
      name: 'Links',
      link: '/links',
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

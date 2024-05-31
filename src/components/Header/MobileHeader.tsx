import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { FC, useState } from 'react';

import Menu from '@/icons/Menu';

export interface MenuProps {
  name: string;
  link?: string;
  handleFunction?: () => void;
  children?: MenuProps[];
}

interface Props {
  textBlack?: boolean;
}

const Drover = dynamic(() => import('@/atoms/Drover'), { ssr: false });

const MobileHeader: FC<Props> = ({ textBlack }) => {
  const { push } = useRouter();
  const { data: session } = useSession();

  const [isOpenDrover, setIsOpenDrover] = useState(false);

  const handleToggle = () => setIsOpenDrover(!isOpenDrover);

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
            {
              name: 'Favorite links',
              handleFunction: () => push(`${window.location.origin}/links?search=favorite`),
            },
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

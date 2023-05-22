import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

import { ScreenSize } from '@/constants';
import { useMediaQuery } from '@/utils/useMediaQuery';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

interface Props {
  textBlack?: boolean;
  containerClasses?: string;
}

const Header: FC<Props> = ({ textBlack, containerClasses = '' }) => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery(ScreenSize.TABLET_BELOW);

  return (
    <div className={`${textBlack ? 'text-black border-b-2 border-gray' : 'text-white'} ${containerClasses} py-5`}>
      <header className="container max-w-screen-desktop mx-auto flex justify-between items-center text-xl">
        <Link href="/" className="text-3xl font-extrabold max-mobile-small:text-2xl">
          Link Shortener
        </Link>
        {isMobile ? <MobileHeader textBlack={textBlack} session={session} /> : <DesktopHeader session={session} />}
      </header>
    </div>
  );
};

export default Header;

import Link from 'next/link';
import { FC, useMemo } from 'react';

import { ScreenSize } from '@/constants';
import useMediaQuery from '@/utils/useMediaQuery';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

interface Props {
  textBlack?: boolean;
  containerClasses?: string;
}

const Header: FC<Props> = ({ textBlack, containerClasses = '' }) => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_BELOW);

  const HeaderComponent = useMemo(() => (isMobile ? MobileHeader : DesktopHeader), [isMobile]);

  return (
    <header className={`${textBlack ? 'text-black border-b-2 border-gray' : 'text-white'} ${containerClasses} py-5`}>
      <div className="container max-w-screen-desktop mx-auto flex justify-between items-center text-xl">
        <Link href="/" className="text-3xl font-extrabold max-mobile-small:text-2xl" translate="no">
          Link Shortener
        </Link>
        <HeaderComponent textBlack={textBlack} />
      </div>
    </header>
  );
};

export default Header;

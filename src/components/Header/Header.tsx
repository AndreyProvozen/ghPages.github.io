import dynamic from 'next/dynamic';
import Link from 'next/link';
import { type FC, useMemo } from 'react';

import { SCREEN_SIZES } from '@/constants';
import {useMediaQuery} from '@/utils';

const DesktopHeader = dynamic(() => import('./DesktopHeader'), { ssr: false });
const MobileHeader = dynamic(() => import('./MobileHeader'), { ssr: false });

interface Props {
  textBlack?: boolean;
  containerClasses?: string;
}

const Header: FC<Props> = ({ textBlack, containerClasses = '' }) => {
  const isMobile = useMediaQuery(SCREEN_SIZES.TABLET_BELOW);

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

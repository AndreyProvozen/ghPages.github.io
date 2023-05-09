import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { ScreenSize } from '@/interface';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

interface HeaderProps {
  textBlack?: boolean;
  containerClasses?: string;
}

const Header: FC<HeaderProps> = ({ textBlack, containerClasses = '' }) => {
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

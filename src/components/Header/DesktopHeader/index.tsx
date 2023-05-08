import Dropdown from '@/components/Dropdown';
import Heart from '@/icons/svg/Heart';
import LogOut from '@/icons/svg/LogOut';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const DesktopHeader = ({ session }: any) => {
  const favoriteLinks = () => {
    // eslint-disable-next-line no-console
    console.log('favoriteLinks');
  };

  const dropdownData = session
    ? [
        {
          customField: (
            <div className="flex items-center">
              <Image
                className="flex-shrink-0 rounded-full overflow-hidden mr-2"
                src={session.user?.image || ''}
                width={48}
                height={48}
                alt=""
              />
              <div className="overflow-hidden">
                <p className="text-ellipsis overflow-hidden">{session.user?.name}</p>
                <p className="text-ellipsis overflow-hidden">{session.user?.email}</p>
              </div>
            </div>
          ),
        },
        {
          fieldTitle: 'Favorite links',
          fieldFunction: favoriteLinks,
          fieldImage: <Heart fill="white" />,
        },
        {
          fieldTitle: 'Sign out',
          fieldFunction: signOut,
          fieldImage: <LogOut />,
        },
      ]
    : [];

  const menuDesktop = [
    { name: 'Home', link: '/' },
    { name: 'Statistic', link: '/statistic' },
    session
      ? {
          component: (
            <Dropdown
              dropdownData={dropdownData}
              placeholder={
                <div className="flex mx-3">
                  <Image className="rounded-full mr-2" src={session.user?.image || ''} width={30} height={30} alt="" />
                  <p className="text-2xl">My profile</p>
                </div>
              }
            />
          ),
        }
      : { name: ' Sign in', link: '/auth' },
  ];
  return (
    <nav className="flex">
      {menuDesktop.map((item, i) => (
        <div key={i}>
          {item.link && (
            <Link href={item.link} className="mx-3 text-2xl">
              {item.name}
            </Link>
          )}
          {item?.component}
        </div>
      ))}
    </nav>
  );
};

export default DesktopHeader;

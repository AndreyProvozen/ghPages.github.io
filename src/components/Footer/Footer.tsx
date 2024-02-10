import Link from 'next/link';

import { GitHub, Instagram, Steam } from '@/icons';

import CredentialsSection from './CredentialsSection';

export const linksData = [
  {
    icon: <GitHub fill="white" />,
    href: 'https://github.com/AndreyProvozen',
    ariaLabel: 'Link to GitHub',
  },
  { icon: <Instagram />, href: '/', ariaLabel: 'Link to Instagram' },
  { icon: <Steam />, href: '', ariaLabel: 'Link to Steam' },
];

const Footer = ({ containerClasses = '' }) => (
  <div className={`bg-lightBlack text-white ${containerClasses}`}>
    <div className="container max-mobile:flex-col-reverse max-w-screen-desktop flex justify-between px-5 items-center py-5 mx-auto">
      <p className="text-3xl font-extrabold" translate="no">
        Link Shortener
      </p>
      <div className="flex">
        {linksData.map(({ icon, href, ariaLabel }, index) => (
          <Link
            target="_blank"
            href={href}
            className="mr-3 hover:[&>svg]:fill-lightPink"
            key={`${href}-${index}`}
            aria-label={ariaLabel}
          >
            {icon}
          </Link>
        ))}
      </div>
    </div>
    <CredentialsSection />
  </div>
);

export default Footer;

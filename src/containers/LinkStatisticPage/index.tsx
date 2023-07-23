import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import ChartBlock from '@/components/ChartBlock';
import Footer from '@/components/Footer';
import HeroBlock from '@/components/HeroBlock';
import LinkSettingsBar from '@/components/LinkSettingsBar';
import NotFoundSection from '@/components/NotFoundSection';
import { FullLinkDataProps } from '@/constants';
import getConfigVariable from '@/utils/getConfigVariable';

const API_HOST = getConfigVariable('API_HOST');

const LinkStatistic = ({ data }) => {
  const [link, setLink] = useState<FullLinkDataProps | undefined>(undefined);

  const shortLink = useMemo(() => `${API_HOST}/${link?.code}`, [link]);

  useEffect(() => {
    setLink(JSON.parse(data));
  }, []);

  return (
    <>
      <HeroBlock
        bgSrc="/images/infoBlockBg.avif"
        bgAlt="Link page background"
        title="Link Page"
        subTitle="View detailed statistics for your shortened links with our Link Shortener's statistics page. Track
            clicks, locations, and referral sources to gain insights on your link's performance."
      />
      {link && (
        <div className="container max-w-screen-desktop-small mx-auto px-5">
          <div className="bg-gray/10 w-full max-tablet:text-center rounded-lg border border-gray p-5 my-8 hover:border-pink hover:shadow-lg">
            <div className="pb-5 border-b border-gray text-lg font-bold truncate">{link.url}</div>
            <Link
              href={shortLink}
              className="mt-5 text-lg cursor-pointer block border-b border-gray pb-5  truncate text-darkPink hover:text-pink"
            >
              {shortLink}
            </Link>
            <LinkSettingsBar link={link} />
          </div>
          {link.metrics.length ? (
            <ChartBlock metrics={link.metrics} />
          ) : (
            <NotFoundSection
              title="No one has followed this link before you. Be the first to know the statistics"
              href={shortLink}
              linkText={shortLink}
              linkClassName="mt-5 text-lg cursor-pointer truncate text-darkPink hover:text-pink"
            />
          )}
        </div>
      )}
      <Footer containerClasses="mt-10" />
    </>
  );
};

export default LinkStatistic;

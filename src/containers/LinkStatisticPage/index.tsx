import { useEffect, useState } from 'react';

import ChartBlock from '@/components/ChartBlock';
import Footer from '@/components/Footer';
import HeroBlock from '@/components/HeroBlock';
import LinkSettingsBar from '@/components/LinkSettingsBar';
import { FullLinkDataProps } from '@/constants';

const LinkStatistic = ({ data }) => {
  const [link, setLink] = useState<FullLinkDataProps | undefined>(undefined);

  useEffect(() => {
    setLink(JSON.parse(data));
  }, []);

  return (
    <>
      <HeroBlock
        backgroundImage={{ src: '/images/infoBlockBg.avif', alt: 'Link page background' }}
        title="Link Page"
        subTitle="View detailed statistics for your shortened links with our Link Shortener's statistics page. Track
            clicks, locations, and referral sources to gain insights on your link's performance."
      />
      {link && (
        <div className="container max-w-screen-desktop-small mx-auto px-5">
          <div className="bg-gray/10 w-full rounded-lg border border-gray p-5 my-8 hover:border-pink hover:shadow-lg">
            <div className="flex justify-between items-center pb-5 border-b border-gray">
              <div className="text-lg font-bold text-center">{link.url}</div>
              <div className="border rounded-lg p-2 bg-darkGreen/20 border-darkGreen">
                {new Date(link.createdAt).toDateString()}
              </div>
            </div>
            <div className="flex justify-between mt-5 items-center border-b border-gray pb-5">
              <div className="text-lg cursor-pointer text-darkPink hover:text-pink">{`${window.location.origin}/api/${link.code}`}</div>
              <div className="border rounded-lg p-2 bg-lightOrange/20 border-lightOrange">
                Total clicks {link.clicked}
              </div>
            </div>
            <LinkSettingsBar link={link} setLink={setLink} />
          </div>
          <ChartBlock metrics={link.metrics} />
        </div>
      )}
      <Footer containerClasses="mt-10" />
    </>
  );
};

export default LinkStatistic;

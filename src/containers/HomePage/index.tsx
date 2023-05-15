import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { flashMessageType, linkData } from '@/interface';
import Header from '@/components/Header';
import LinkDataBlock from '@/components/LinkDataBlock';
import QualitiesList from '@/components/QualitiesList';
import Footer from '@/components/Footer';
import InfoBlock from '@/components/InfoBlock';
import LinksList from '@/atoms/Skeleton/LinksList';
import SearchBlock from '@/components/SearchBlock';
import { useFlashMessage } from '@/utils/FlashMessage';
import customFetch from '@/utils/customFetch';
import Accordion from '@/atoms/Accordion';
import { questions } from 'mock';
import TextWithImage from '@/components/TextWithImage';
import contentImage1 from '@/icons/contentImage1.avif';
import contentImage2 from '@/icons/contentImage2.avif';
import contentImage3 from '@/icons/contentImage3.avif';
import contentImage4 from '@/icons/contentImage4.avif';

const TextWithImageData = [
  {
    title: 'Link Performance',
    listData: [
      'View click-through rates and link performance metrics',
      'Monitor link performance over time',
      'View statistics on user demographics and devices used to access your links',
      'Identify your top-performing links and focus your marketing efforts accordingly',
    ],
    linkData: { src: contentImage2.src, alt: '' },
    text: '<p>Track the performance of your links and gain valuable insights into your audience. View detailed statistics on click-through rates, link performance metrics, and user demographics. Monitor how your links are performing over time and identify your top-performing links. With this information, you can optimize your marketing efforts and make data-driven decisions for better results.</p>',
  },
  {
    title: 'User Engagement',
    listData: [
      'Analyze clicks, unique visitors, and conversion rates to understand user engagement',
      'View top referrers, sources, and campaigns driving traffic to your links',
      'Identify channels for improvement and make data-driven decisions to enhance link engagement',
      'Analyze geographic location of link clicks to tailor your marketing efforts',
    ],
    linkData: {
      src: contentImage1.src,
      alt: '',
    },
    text: '<p>Understand the engagement of your users with your links. Analyze the number of clicks, unique visitors, and conversion rates to gain insights into user engagement. Explore top referrers, sources, and campaigns that drive traffic to your links. Identify areas for improvement and make data-driven decisions to enhance link engagement. Analyze the geographic location of link clicks to better understand your audience and tailor your marketing efforts to specific regions.</p>',
  },
  {
    title: 'Link Customization',
    listData: [
      'Customize link appearance with branding elements',
      'Create branded short links with custom domains',
      'Choose link thumbnails and preview images for a visually appealing presentation',
      'Create custom slugs for easy sharing and memorability',
    ],
    linkData: {
      src: contentImage3.src,
      alt: '',
    },
    text: '<p>Elevate your brand presence with customized links. Add branding elements such as logos, colors, and fonts to customize the appearance of your links. Create branded short links by adding custom domains, giving them a professional and recognizable touch. Enhance the visual appeal of your links by choosing link thumbnails and preview images that resonate with your audience. Create custom slugs, which are unique and memorable link URLs, making it easier for users to remember and share your links.</p>',
  },
  {
    title: 'Campaign Tracking',
    listData: [
      'Track link performance in different marketing campaigns',
      'Assign unique tags or labels to categorize and organize links',
      'Analyze campaign-specific metrics like click-through rates, conversion rates, and revenue',
      'Make informed decisions based on campaign performance',
    ],
    linkData: {
      src: contentImage4.src,
      alt: '',
    },
    text: '<p>Efficiently track the success of your marketing campaigns with campaign tracking. Assign unique tags or labels to categorize and organize your links based on different campaigns. Analyze campaign-specific metrics such as click-through rates, conversion rates, and revenue. Make informed decisions about your marketing strategies based on the performance of your campaigns. Optimize your campaigns for better results and achieve your marketing goals.</p>',
  },
];

const Home = () => {
  const { data: session } = useSession();
  const flashMessage = useFlashMessage();
  const [longLink, setLongLink] = useState('');
  const [linksList, setLinksList] = useState<linkData[]>([]);
  const [count, setCount] = useState();

  useEffect(() => {
    // Fix me
    customFetch(`api/link?userEmail=${encodeURIComponent(session?.user?.email)}`).then(res => {
      setLinksList(res.urlsList);
      setCount(res.count);
    });
  }, []);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customFetch(`api/link`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url: longLink, userEmail: session?.user?.email }),
    })
      .then(res => {
        setLongLink('');
        if (typeof res === 'string') {
          throw new Error(res);
        }
        return res;
      })
      .then(content => {
        if (content) {
          const newArray = linksList.length > 4 ? [content, ...linksList].slice(0, -1) : [content, ...linksList];

          setLinksList(newArray);
          flashMessage.addFlashMessage('Shortened link successfully added', flashMessageType.SUCCESSFUL);
        }
      })
      .catch(error => {
        flashMessage.addFlashMessage(error.message, flashMessageType.ERROR);
      });
  };

  return (
    <>
      <div className="relative pb-5 min-h-screen px-5">
        <Image src="/homeBg.avif" alt="Home background" priority fill className="object-cover object-center z-[-1]" />
        <Header />
        <div className="container max-w-screen-desktop-small text-center mx-auto text-lg h-full">
          <h1 className="mt-7 text-5xl text-white">Link Shortener</h1>
          <p className="max-w-lg mx-auto my-5 text-white">
            Free URL Shortener for transforming long, ugly links into nice, memorable and trackable short URLs
          </p>
          <SearchBlock
            onSubmit={handleOnSubmit}
            value={longLink}
            setValue={setLongLink}
            btnText="generate link"
            containerClasses="mb-14"
            placeholder="Paste the URL to be shortened"
          />
          {linksList?.length ? (
            <LinkDataBlock data={linksList} setLinks={setLinksList} />
          ) : (
            count !== 0 && <LinksList />
          )}
        </div>
      </div>
      <div className="container max-w-screen-desktop-small mx-auto text-center px-5 my-8">
        <QualitiesList />
      </div>
      <InfoBlock
        btnData={{ text: 'Get link statistics', href: '/statistic' }}
        title="Already there are abbreviated links"
      />

      {TextWithImageData.map(({ listData, linkData, text, title }, i) => (
        <TextWithImage
          key={i + title}
          linkData={linkData}
          imageFirst={i % 2 !== 0}
          title={title}
          containerClasses="my-10"
          listData={listData}
          text={text}
        />
      ))}
      <InfoBlock btnData={{ text: 'Sign up', href: '/auth' }} title="Sign up to see full link statistic" />
      <div className="container max-w-screen-desktop mx-auto px-5 my-10">
        <p className="text-4xl font-bold mb-5 text-center">Frequently Asked Questions</p>
        <Accordion questions={questions} />
      </div>
      <Footer />
    </>
  );
};

export default Home;

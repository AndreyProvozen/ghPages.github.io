import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';

import Accordion from '@/atoms/Accordion';
import LinksListSkeleton from '@/atoms/Skeleton/LinksListSkeleton';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import InfoBlock from '@/components/InfoBlock';
import LinkDataBlock from '@/components/LinkDataBlock';
import QualityBlock from '@/components/QualityBlock';
import SearchBlock from '@/components/SearchBlock';
import TextWithImage from '@/components/TextWithImage';
import { addNewLink, fetchLinksList } from '@/store/slices/links.slice';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import ClassNames from '@/utils/ClassNames';
import { TextWithImageData, questions } from 'mock';

const Home = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { count, linksList } = useAppSelector(state => state.links);

  const [longLink, setLongLink] = useState('');

  useEffect(() => {
    dispatch(fetchLinksList({ userEmail: session?.user?.email, perPage: 5 }));
  }, [dispatch]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addNewLink({ url: longLink, userEmail: session?.user?.email }));
    setLongLink('');
  };

  return (
    <>
      <div className="relative pb-5 min-h-screen px-5">
        <Image
          src="/images/homeBg.avif"
          alt="Home background"
          priority
          fill
          className="object-cover object-center z-[-1]"
        />
        <Header />
        <div className="container max-w-screen-desktop-small text-center mx-auto text-lg h-full">
          <InView threshold={0.3} triggerOnce initialInView={true}>
            {({ inView, ref }) => (
              <div
                ref={ref}
                className={ClassNames(
                  { invisible: !inView },
                  { 'animate__fadeInDown animate__animated': inView },
                  'mt-7 my-5 text-white'
                )}
              >
                <h1 className="text-5xl">Link Shortener</h1>
                <p className="max-w-lg mx-auto">
                  Free URL Shortener for transforming long, ugly links into nice, memorable and trackable short URLs
                </p>
              </div>
            )}
          </InView>
          <SearchBlock
            onSubmit={handleOnSubmit}
            value={longLink}
            setValue={setLongLink}
            btnText="generate link"
            containerClasses="mb-14 w-full"
            placeholder="Paste the URL to be shortened"
          />
          {linksList?.length ? (
            <LinkDataBlock linksList={linksList} linkContainerClasses="bg-white rounded-md mb-5" />
          ) : (
            count !== 0 && <LinksListSkeleton isHomePageList={true} />
          )}
        </div>
      </div>
      <QualityBlock containerClasses="container max-w-screen-desktop mx-auto text-center px-5 my-8" />
      <InfoBlock btnHref="/links" btnText="Get link statistics" title="Already there are abbreviated links" />
      {TextWithImageData.map(({ listData, linkData, text, title }, i) => (
        <TextWithImage
          key={i + title}
          linkData={linkData}
          imageFirst={i % 2 !== 0}
          title={title}
          containerClasses="my-10"
          featuresListData={listData}
          text={text}
        />
      ))}
      <InfoBlock btnHref="/auth" btnText="Sign up" title="Sign up to see full link statistic" />
      <div className="container max-w-screen-desktop mx-auto px-5 my-10">
        <p className="text-4xl font-bold mb-5 text-center">Frequently Asked Questions</p>
        <Accordion questions={questions} />
      </div>
      <Footer />
    </>
  );
};

export default Home;

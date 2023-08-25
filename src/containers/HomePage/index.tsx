import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { InView } from 'react-intersection-observer';

import Accordion from '@/atoms/Accordion';
import { LinksListSkeleton } from '@/atoms/Skeleton';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import InfoBlock from '@/components/InfoBlock';
import LinkDataBlock from '@/components/LinkDataBlock';
import QualityBlock from '@/components/QualityBlock';
import TextWithImage from '@/components/TextWithImage';
import { flashMessageType } from '@/constants';
import { useAddNewLinkMutation, useGetLinksQuery } from '@/store/api/links.api';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import ClassNames from '@/utils/classNames';
import { TextWithImageData, questions } from 'mock';

const Home = () => {
  const dispatch = useAppDispatch();
  const [longLink, setLongLink] = useState('');

  const { data: linkData, isLoading } = useGetLinksQuery({ perPage: 5 });
  const [addNewLink] = useAddNewLinkMutation();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await addNewLink({ url: longLink });
    setLongLink('');
    // fix me error type
    dispatch(
      addNewFlashMessage(
        'error' in response && 'data' in response.error
          ? { message: response.error.data as string, type: flashMessageType.ERROR }
          : { message: 'Shortened link successfully added', type: flashMessageType.SUCCESSFUL }
      )
    );
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
          <form
            onSubmit={handleOnSubmit}
            className={`mb-14 w-full relative flex flex-wrap items-stretch max-tablet-small:block`}
          >
            <input
              type="search"
              value={longLink}
              onChange={e => setLongLink(e.target.value)}
              placeholder="Paste the URL to be shortened"
              className="rounded-r bg-white border-[1px] border-gray flex-auto relative m-0 rounded-l px-3 py-2.5 max-tablet-small:w-full max-tablet-small:rounded-r focus:outline-none focus:border-pink"
            />
            <button
              type="submit"
              className="text-white text-2xl bg-pink rounded-r text-center px-6 py-2.5 hover:bg-lightPink active:bg-darkPink max-tablet-small:w-full max-tablet-small:rounded-l max-tablet-small:mt-4"
            >
              generate link
            </button>
          </form>

          {isLoading ? (
            <LinksListSkeleton isHomePageList={true} />
          ) : (
            <LinkDataBlock linksList={linkData?.linksList || []} linkContainerClasses="bg-white rounded-md mb-5" />
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

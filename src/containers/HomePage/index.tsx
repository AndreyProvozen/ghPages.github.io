import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { flashMessageType, linkData } from '@/constants';
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
import { TextWithImageData, questions } from 'mock';
import TextWithImage from '@/components/TextWithImage';

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
            containerClasses="mb-14 w-full"
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

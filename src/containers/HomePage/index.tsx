import { FormEvent, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
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

const Accordion = dynamic(() => import('@/atoms/Accordion'), { ssr: false });

const Home = ({ session, questions, urlsListData }) => {
  const [longLink, setLongLink] = useState('');
  const [data, setData] = useState<linkData[]>(urlsListData.urlsList);
  const flashMessage = useFlashMessage();
  const [count] = useState(urlsListData.count);

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
          const newArray = data.length > 4 ? [content, ...data].slice(0, -1) : [content, ...data];

          setData(newArray);
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
          {data?.length ? <LinkDataBlock data={data} setLinks={setData} /> : count !== 0 && <LinksList />}
        </div>
      </div>
      <div className="container max-w-screen-desktop-small mx-auto text-center px-5 my-8">
        <QualitiesList />
      </div>
      <InfoBlock
        btnData={{ text: 'Get link statistics', href: '/statistic' }}
        title="Already there are abbreviated links"
      />
      <div className="container max-w-screen-desktop-small mx-auto px-5 my-10">
        <p className="text-4xl font-bold mb-5 text-center">Frequently Asked Questions</p>
        <Accordion questions={questions} />
      </div>
      <Footer />
    </>
  );
};

export default Home;

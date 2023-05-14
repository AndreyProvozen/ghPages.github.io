import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Home from '@/containers/HomePage';
import customFetch from '@/utils/customFetch';

const HomePage = ({ session, urlsListData }) => {
  const questions = [
    {
      title: 'What is a URL shortener?',
      description:
        '<div><p>A URL shortener is a tool that takes a long URL (uniform resource locator) and creates a shorter, more compact version of it. The shortened URL redirects to the original URL when accessed. URL shorteners are often used for social media posts, messaging, and email where character count is limited or to make URLs more visually appealing.</p></br><p>URL shortening services typically provide users with a unique shortened URL that they can share instead of the longer original URL. Some URL shorteners also provide analytics to track clicks and other data about the shortened URLs.</p></br><p>Most URL shorteners use a 301 redirect, which is a permanent redirect, to forward users from the shortened URL to the original URL. This means that any SEO (search engine optimization) benefits associated with the original URL are passed to the shortened URL.</p></div>',
    },
    {
      title: 'Benefits of a short URL',
      description:
        '<p>How many people can even remember a long web address, especially if it has tons of characters and symbols? A short URL can make your link more memorable. Not only does it allow people to easily recall and share your link with others, it can also dramatically improve traffic to your content.</p>',
    },
    {
      title: 'What is a QR Code?',
      description:
        '<p>Quick response or QR, is a type of barcode that can store a multitude of information. The obvious difference between a QR Code and Barcode is its appearance. A QR Code is always in the shape of a square and contains smaller, even blocks similar to Tetris. A Barcode, on the other hand, has vertical bars in different thicknesses and is often accompanied by a serial number.</p>',
    },
    {
      title: 'What can a QR Code do?',
      description:
        '<p>Because of its versatility, a QR Code can be programmed to do a multitude of things. It can be split into two formats: Dynamic and Static. A Dynamic QR Code is useful for businesses or nonprofits in their marketing strategy because of its advantages. Though it needs a subscription to work, it is a small price to pay compared to the benefits it offers. Dynamic QR Code solutions are editable, which means if you made a mistake and only noticed it after the QR Codes are printed, you can easily log in to the dashboard and fix them without changing the appearance of the already printed Codes.</p>',
    },
  ];
  
  return (
    <>
      <Head>
        <title>Link Shortener home</title>
        <meta
          name="description"
          content=" Create short, custom links with ease using our Link Shortener. Boost your online presence and track link clicks with our advanced analytics. Try it now for free!"
        />
      </Head>
      <Home session={session} questions={questions} urlsListData={urlsListData} />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const baseUrl = `http://${context.req.headers['x-forwarded-host']}`;
  const urlsListData = await customFetch(`${baseUrl}/api/link?session=${Boolean(session?.user?.email)}`);

  return { props: { session, urlsListData } };
}

export default HomePage;

import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/Header/Header';

const ErrorPage = ({ statusCode }) => (
  <div className="relative min-h-screen flex flex-col justify-center items-center px-5">
    <Header containerClasses="top-0 absolute w-full px-5" />
    <Image
      src="/images/errorBg.avif"
      alt="Home background"
      priority
      fill
      className="object-cover object-center z-[-1]"
    />
    <div className="bg-white rounded-lg w-full max-w-md text-center mx-3 py-7 animate__zoomIn animate__faster animate__animated">
      <p className="text-[10rem] max-mobile:text-[8rem] leading-none font-bold">{statusCode}</p>
      <p className="text-2xl font-bold max-mobile:text-base">OPPS! PAGE NOT FOUND</p>
      <p className="text-2xl mb-5 max-mobile:text-base">
        {statusCode.toString()[0] === '4' ? 'An error occurred on the client' : 'An error occurred on the server'}
      </p>
      <Link
        href="/"
        className="text-white mt-2 text-2xl rounded-md hover:bg-lightPink bg-pink px-6 py-2.5 active:bg-darkPink"
      >
        GO TO HOME
      </Link>
    </div>
  </div>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;

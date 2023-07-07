import Image from 'next/image';
import React, { FC } from 'react';
import { InView } from 'react-intersection-observer';

import ClassNames from '@/utils/ClassNames';

import Header from './Header';

interface Props {
  backgroundImage: {
    src: string;
    alt: string;
  };
  title: string;
  subTitle: string;
}

const HeroBlock: FC<Props> = ({ backgroundImage, title, subTitle }) => {
  const { src, alt } = backgroundImage;
  return (
    <div className="relative px-5 bg-cover bg-center max-h-max text-white">
      <Header />
      <Image src={src} alt={alt} priority fill className="object-cover object-center z-[-1]" />
      <InView threshold={0.3} triggerOnce initialInView={true}>
        {({ inView, ref }) => (
          <div
            ref={ref}
            className={ClassNames(
              'container max-w-screen-desktop-small text-center mx-auto pb-20',
              {
                'animate__zoomIn animate__faster animate__animated': inView,
              },
              { invisible: !inView }
            )}
          >
            <h1 className=" text-5xl py-5">{title}</h1>
            <p className="text-center text-xl">{subTitle}</p>
          </div>
        )}
      </InView>
    </div>
  );
};

export default HeroBlock;

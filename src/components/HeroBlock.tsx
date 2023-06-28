import Image from 'next/image';
import React, { FC } from 'react';

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
      <div className="container max-w-screen-desktop-small text-center mx-auto pb-20">
        <h1 className=" text-5xl py-5">{title}</h1>
        <p className="text-center text-xl">{subTitle}</p>
      </div>
    </div>
  );
};

export default HeroBlock;

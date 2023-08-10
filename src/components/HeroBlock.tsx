import Image from 'next/image';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

import ClassNames from '@/utils/classNames';

import Header from './Header';

interface Props {
  bgSrc: string;
  bgAlt: string;
  title: string;
  subTitle: string;
}

const HeroBlock: FC<Props> = ({ bgSrc, bgAlt, title, subTitle }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    initialInView: true,
  });

  return (
    <div className="relative px-5 bg-cover bg-center max-h-max text-white">
      <Header />
      <Image src={bgSrc} alt={bgAlt} priority fill className="object-cover object-center z-[-1]" />
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
        <h1 className="text-5xl py-5">{title}</h1>
        <p className="text-center text-xl">{subTitle}</p>
      </div>
    </div>
  );
};

export default HeroBlock;

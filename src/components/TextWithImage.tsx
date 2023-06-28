import Image from 'next/image';
import { FC } from 'react';
import { InView } from 'react-intersection-observer';

import Star from '@/icons/svg/Star';
import ClassNames from '@/utils/ClassNames';

interface Props {
  linkData: { src: string; alt: string };
  text: string;
  title: string;
  imageFirst?: boolean;
  containerClasses?: string;
  listData?: string[];
}

const TextWithImage: FC<Props> = ({ linkData, text, imageFirst, title, listData, containerClasses = '' }) => {
  const imageTransition = `${imageFirst ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`;
  const textTransition = `${imageFirst ? 'animate__fadeInLeft' : 'animate__fadeInRight'}`;
  return (
    <InView threshold={0.3} triggerOnce initialInView={true}>
      {({ inView, ref }) => (
        <div
          ref={ref}
          className={ClassNames(
            { 'flex-row-reverse': imageFirst },
            { invisible: !inView },

            'flex justify-between max-w-screen-desktop px-5 mx-auto max-desktop-small:block overflow-hidden',
            containerClasses
          )}
        >
          <Image
            src={linkData.src}
            alt={linkData.alt}
            height={400}
            width={500}
            className={ClassNames('px-5 max-desktop-small:mx-auto animate__animated', { [imageTransition]: inView })}
          />
          <div
            className={ClassNames('pt-5 max-w-[700px] max-desktop-small:mx-auto animate__animated', {
              [textTransition]: inView,
            })}
          >
            <h2 className="text-2xl font-bold mx-auto text-center mb-2">{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <div>
              {Boolean(listData) &&
                listData?.map((title, i) => (
                  <div className="flex mt-5" key={i}>
                    <Star className="shrink-0 mr-2 fill-lightOrange" /> {title}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </InView>
  );
};

export default TextWithImage;

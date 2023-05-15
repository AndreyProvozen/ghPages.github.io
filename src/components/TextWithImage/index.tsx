import Image from 'next/image';
import { FC } from 'react';
import Star from '@/icons/svg/Star';

interface Props {
  linkData: { src: string; alt: string };
  text: string;
  title: string;
  imageFirst?: boolean;
  containerClasses?: string;
  listData?: string[];
}

const TextWithImage: FC<Props> = ({ linkData, text, imageFirst, title, listData, containerClasses = '' }) => {
  return (
    <div
      className={`flex justify-between max-w-screen-desktop px-5 mx-auto max-desktop-small:block ${
        imageFirst ? '' : 'flex-row-reverse'
      } ${containerClasses}`}
    >
      <Image
        src={linkData.src}
        alt={linkData.alt}
        height={400}
        width={500}
        className="px-5 max-desktop-small:mx-auto"
      />
      <div className="pt-5 max-w-[700px] max-desktop-small:mx-auto">
        <h2 className="text-2xl font-bold mx-auto text-center mb-2">{title}</h2>{' '}
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
  );
};

export default TextWithImage;

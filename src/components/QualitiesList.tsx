import Image from 'next/image';

import { ScreenSize } from '@/constants';
import BarChart from '@/icons/svg/BarChart';
import Heart from '@/icons/svg/Heart';
import ClassNames from '@/utils/ClassNames';
import { useMediaQuery } from '@/utils/useMediaQuery';

const qualitiesList = [
  {
    image: <BarChart />,
    title: 'Statistics',
    subTitle: 'Check the amount of clicks that your shortened URL received',
    gridClasses: 'col-span-2 col-start-2',
  },
  {
    image: <Heart width={100} height={100} fill="none" strokeWidth="2" stroke="red" />,
    title: 'Easy',
    subTitle: 'Link Shortener is easy and fast, enter the long link to get your shortened link',
    gridClasses: 'col-span-2 col-start-4',
  },
  {
    image: <Image src={'/images/devices.png'} width={100} height={100} alt="" />,
    title: 'Devices',
    subTitle: 'Compatible with smartphones, tablets, and desktop',
    gridClasses: 'col-span-2 row-start-2',
  },
  {
    image: <Image src={'/svg/lock.svg'} width={100} height={100} alt="" />,
    title: 'Security',
    subTitle: 'Your data is securely stored and protected',
    gridClasses: 'col-span-2 col-start-3 row-start-2',
  },
  {
    image: <BarChart />,
    title: 'Analytics',
    subTitle: 'Track and analyze the performance of your shortened URLs',
    gridClasses: 'col-span-2 col-start-5 row-start-2',
  },
  {
    image: <Image src={'/svg/edit.svg'} width={100} height={100} alt="" />,
    title: 'Customization',
    subTitle: 'Personalize your shortened URLs with custom aliases or tags',
    gridClasses: 'col-span-2 col-start-3 row-start-3',
  },
];

const QualitiesList = ({ containerClasses = '' }) => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_BELOW);
  return (
    <div className={containerClasses}>
      <h2 className="text-4xl font-bold mb-5">Our qualities</h2>
      <div className="grid grid-cols-6 justify-items-center max-tablet:grid-cols-2 max-mobile:grid-cols-1 gap-4">
        {qualitiesList.map(({ image, title, subTitle, gridClasses }) => (
          <div
            className={ClassNames('flex flex-col items-center max-w-xs mx-3', { [gridClasses]: !isMobile })}
            key={title + subTitle}
          >
            {image}
            <p className="text-2xl font-bold">{title}</p>
            <p className="max-w-xs">{subTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualitiesList;

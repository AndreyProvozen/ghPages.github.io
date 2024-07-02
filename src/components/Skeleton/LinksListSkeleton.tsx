import { ScreenSize } from '@/constants';
import useMediaQuery from '@/utils/useMediaQuery';

const TableLink = ({ isHomePageList }) => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);
  const linkContainerClasses = isHomePageList ? 'bg-white rounded-md mb-5' : 'border-b border-gray';

  return (
    <div className={`w-full p-5 flex justify-between items-center ${linkContainerClasses}`}>
      <div className="max-w-xs w-full">
        <div className="max-w-[288px] h-6 animate-pulse bg-lightPink rounded-md mb-1" />
        <div className="max-w-[176px] h-5 mr-5 animate-pulse bg-gray rounded-md" />
      </div>
      {!isMobile && <div className="w-9 shrink-0 h-7 ml-5 animate-pulse bg-gray rounded-md" />}
      <div className="w-4 shrink-0 h-7 ml-5 animate-pulse bg-lightPink rounded-md" />
    </div>
  );
};

const LinksListSkeleton = ({ isHomePageList = false, quantity = 3 }) => (
  <>
    {Array(quantity)
      .fill(1)
      .map((_, i) => (
        <TableLink key={i} isHomePageList={isHomePageList} />
      ))}
  </>
);

export default LinksListSkeleton;

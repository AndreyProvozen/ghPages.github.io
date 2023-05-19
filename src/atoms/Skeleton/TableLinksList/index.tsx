import { ScreenSize } from '@/constants';
import { useMediaQuery } from '@/utils/useMediaQuery';

const TableLink = () => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);
  return (
    <div className="w-full border-b p-5 border-gray flex justify-between py-5 items-center">
      <div className="max-w-[320px] w-full">
        <div className="w-72 h-6 animate-pulse bg-lightPink rounded-md mb-1" />
        <div className="w-48 h-5 mr-5 animate-pulse bg-gray rounded-md" />
      </div>
      {!isMobile && <div className="w-9 shrink-0 h-7 ml-5 animate-pulse bg-gray rounded-md" />}
      <div className="w-8 shrink-0 h-4 ml-5 animate-pulse bg-lightPink rounded-md" />
    </div>
  );
};

const TableLinksSkeleton = () => (
  <>
    {Array(4)
      .fill(1)
      .map((_, i) => (
        <TableLink key={i} />
      ))}
    <div className="flex justify-center my-5 px-5">
      <div className="w-20 h-11 bg-gray animate-pulse rounded-md" />
      <div className="w-28 h-11 bg-gray mx-5 animate-pulse rounded-md" />
      <div className="w-20 h-11 bg-gray animate-pulse rounded-md" />
    </div>
  </>
);

export default TableLinksSkeleton;

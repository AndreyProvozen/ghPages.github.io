import { ScreenSize } from "@/interface";
import { useMediaQuery } from "@/utils/useMediaQuery";

const LinkSkeleton = () => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);
  return (
    <div className="w-full h-16 bg-white rounded-md mb-5 flex justify-between p-5">
      <div className="max-w-[320px] h-7 mr-5 w-full animate-pulse bg-gray rounded-md" />
      <div className="w-24 h-7 animate-pulse bg-lightPink rounded-md" />
      {!isMobile && (
        <div className="w-8 h-7 animate-pulse bg-gray rounded-md" />
      )}
      <div className="w-5 shrink-0 h-7 ml-5 animate-pulse bg-lightPink rounded-md" />
    </div>
  );
};

const LinksList = () => (
  <>
    {Array(3)
      .fill(1)
      .map((_, i) => (
        <LinkSkeleton key={i} />
      ))}
  </>
);

export default LinksList;

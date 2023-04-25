const LinkSkeleton = () => (
  <div className="w-full h-16 bg-whiteMain rounded-md mb-5 flex justify-between p-5">
    <div className="max-w-[320px] h-7 w-full animate-pulse bg-grayMain rounded-md" />
    <div className="w-24 h-7  animate-pulse bg-lightPinkMain rounded-md" />
    <div className="w-8 h-7  animate-pulse bg-grayMain rounded-md" />
    <div className="w-10 h-7  animate-pulse bg-lightPinkMain rounded-md" />
  </div>
);

const LinksList = () => <>{Array(5).fill(<LinkSkeleton />)}</>;

export default LinksList;

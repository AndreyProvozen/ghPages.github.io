const LinksList = () => (
  <div>
    {Array(5)
      .fill(1)
      .map((_, i) => (
        <div
          className="w-full h-16 bg-whiteMain rounded-md mb-5 flex justify-between p-5"
          key={i}
        >
          <div className="max-w-[320px] h-7 w-full animate-pulse bg-grayMain rounded-md" />
          <div className="w-24 h-7  animate-pulse bg-lightPinkMain rounded-md" />
          <div className="w-8 h-7  animate-pulse bg-grayMain rounded-md" />
          <div className="w-10 h-7  animate-pulse bg-lightPinkMain rounded-md" />
        </div>
      ))}
  </div>
);

export default LinksList;

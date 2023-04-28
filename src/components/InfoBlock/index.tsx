import Link from "next/link";
import React from "react";

const InfoBlock = () => {
  return (
    <div className="bg-lightBlack text-center py-20 px-3 text-white">
      <div className="text-3xl font-bold mb-10">
        Already there are abbreviated links
      </div>
      <Link
        href="/statistic"
        className="text-2xl rounded-md hover:bg-lightPink bg-pink px-6 py-2.5 active:bg-darkPink"
      >
        Get link statistics
      </Link>
    </div>
  );
};

export default InfoBlock;

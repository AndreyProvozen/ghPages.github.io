import Link from "next/link";
import React from "react";

const InfoBlock = () => {
  return (
    <div className="bg-blackMain text-center py-20 px-3 text-whiteMain">
      <div className="text-3xl font-bold mb-10">
        Already there are abbreviated links
      </div>
      <Link
        href="/statistic"
        className="text-2xl rounded-md hover:bg-lightPinkMain bg-pinkMain px-6 py-2.5 active:bg-darkPinkMain"
      >
        Get link statistics
      </Link>
    </div>
  );
};

export default InfoBlock;

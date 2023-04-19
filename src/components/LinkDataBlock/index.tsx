import { linkData } from "@/interface";
import Link from "next/link";
import React, { FC } from "react";

interface LinkDataBlockProps {
  data: linkData[];
}

const LinkDataBlock: FC<LinkDataBlockProps> = ({ data }) => {
  return (
    <div>
      {data.map((item, i) => (
        <div
          className="flex justify-between p-5 mb-5 bg-whiteMain rounded-md"
          key={i}
        >
          <div className="text-blackMain line-clamp-1 break-all max-w-xs">
            {item.url}
          </div>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={`/api/${item.code}`}
            className="text-darkPinkMain"
          >
            {item.code}
          </Link>
          <div key={i} className="text-blackMain">
            {item.clicked}
          </div>
          <button
            className="text-darkPinkMain"
            onClick={() =>
              navigator.clipboard.writeText(
                `http://localhost:3000/api/${item.code}`
              )
            }
          >
            Copy
          </button>
        </div>
      ))}
    </div>
  );
};

export default LinkDataBlock;

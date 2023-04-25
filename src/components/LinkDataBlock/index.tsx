import { linkData } from "@/interface";
import Link from "next/link";
import { FC, memo } from "react";

interface LinkDataBlockProps {
  data: linkData[];
}

const LinkDataBlock: FC<LinkDataBlockProps> = memo(({ data }) => {
  return (
    <div>
      {data.map(({ url, code, clicked }) => (
        <div
          className="flex justify-between p-4 mb-5 bg-whiteMain rounded-md "
          key={code}
        >
          <div className="line-clamp-1 break-all max-w-xs max-md:max-w-[15rem]">
            {url}
          </div>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={`/api/${code}`}
            className="text-darkPinkMain hover:text-pinkMain"
          >
            {code}
          </Link>
          <p>{clicked}</p>
          <button
            className="text-darkPinkMain hover:text-pinkMain"
            onClick={() =>
              navigator.clipboard.writeText(`http://localhost:3000/api/${code}`)
            }
          >
            Copy
          </button>
        </div>
      ))}
    </div>
  );
});

LinkDataBlock.displayName = "LinkDataBlock";

export default LinkDataBlock;

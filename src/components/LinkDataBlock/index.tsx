import ThreeDots from "@/icons/svg/ThreeDots";
import { linkData } from "@/interface";
import Link from "next/link";
import { FC, memo } from "react";
import Dropdown from "../Dropdown";

interface LinkDataBlockProps {
  data: linkData[];
}

const SettingsDropDown = ({ data }: { data: linkData }) => {
  const settingsFields = [
    {
      field: (
        <button
          className="text-whiteMain"
          onClick={() =>
            navigator.clipboard.writeText(
              `http://localhost:3000/api/${data.code}`
            )
          }
        >
          Copy
        </button>
      ),
    },
    {
      field: (
        <button
          className=""
          onClick={() =>
            navigator.clipboard.writeText(
              `http://localhost:3000/api/${data.code}`
            )
          }
        >
          Delete
        </button>
      ),
    },
    {
      field: (
        <Link href={`/statistic`} className="block">
          Statistic
        </Link>
      ),
    },
  ];
  return <Dropdown placeholder={<ThreeDots />} dropdownData={settingsFields} />;
};

const LinkDataBlock: FC<LinkDataBlockProps> = memo(({ data }) => {
  return (
    <div>
      {data.map((data) => (
        <div
          className="flex justify-between p-4 mb-5 bg-whiteMain rounded-md "
          key={data.code}
        >
          <div className="line-clamp-1 break-all max-w-xs max-md:max-w-[15rem]">
            {data.url}
          </div>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={`/api/${data.code}`}
            className="text-darkPinkMain hover:text-pinkMain"
          >
            {data.code}
          </Link>
          <p>{data.clicked}</p>
          <SettingsDropDown data={data} />
        </div>
      ))}
    </div>
  );
});

LinkDataBlock.displayName = "LinkDataBlock";

export default LinkDataBlock;

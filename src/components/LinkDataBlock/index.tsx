import ThreeDots from "@/icons/svg/ThreeDots";
import { linkData } from "@/interface";
import Link from "next/link";
import { FC, memo } from "react";
import Dropdown from "../Dropdown";
import { useRouter } from "next/router";
import ClipBoard from "@/icons/svg/ClipBoard";
import Trash from "@/icons/svg/Trash";
import BarChart from "@/icons/svg/BarChart";

interface LinkDataBlockProps {
  data: linkData[];
}

const SettingsDropDown = ({ data }: { data: linkData }) => {
  const router = useRouter();
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/api/${data.code}`);
  };
  const handleDeleteLink = () => {
    const a = 1;
  };
  const handleRedirect = () => {
    router.push("/statistic");
  };

  const settingsFields = [
    {
      fieldTitle: "Copy",
      fieldFunction: handleCopyLink,
      fieldImage: <ClipBoard />,
    },
    {
      fieldTitle: " Delete",
      fieldFunction: handleDeleteLink,
      fieldImage: <Trash />,
    },
    {
      fieldTitle: "Statistic",
      fieldFunction: handleRedirect,
      fieldImage: <BarChart width="25px" height="25px" fill="white" />,
    },
  ];

  return (
    <Dropdown
      placeholder={
        <ThreeDots className="fill-darkPinkMain hover:fill-pinkMain" />
      }
      dropdownData={settingsFields}
      popoverClass="w-60"
    />
  );
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
          <p className="max-sm:hidden"> {data.clicked}</p>
          <SettingsDropDown data={data} />
        </div>
      ))}
    </div>
  );
});

LinkDataBlock.displayName = "LinkDataBlock";

export default LinkDataBlock;

import { ScreenSize, linkData } from "@/interface";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, memo, useState } from "react";
import SettingsDropDown from "./SettingsDropDown";
import { useMediaQuery } from "@/utils/useMediaQuery";
import DeleteLinkModal from "../Modal";

interface LinkDataBlockProps {
  data: linkData[];
  setLinks: Dispatch<SetStateAction<linkData[]>>;
}

const LinkDataBlock: FC<LinkDataBlockProps> = memo(({ data, setLinks }) => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedLink, setDeletedLink] = useState<linkData | undefined>(
    undefined
  );

  return (
    <div>
      {data.map((data) => (
        <div
          className="flex justify-between p-4 mb-5 bg-white rounded-md "
          key={data.code}
        >
          <div className="line-clamp-1 break-all max-w-xs max-md:max-w-[15rem]">
            {data.url}
          </div>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={`/api/${data.code}`}
            className="text-darkPink mx-5 hover:text-pink"
          >
            {data.code}
          </Link>
          {!isMobile && <p> {data.clicked}</p>}
          <SettingsDropDown
            data={data}
            setIsModalOpen={setIsModalOpen}
            setDeletedLink={setDeletedLink}
          />
        </div>
      ))}
      {isModalOpen && (
        <DeleteLinkModal
          setIsModalOpen={setIsModalOpen}
          deletedLink={deletedLink}
          setLinksList={setLinks}
        />
      )}
    </div>
  );
});

LinkDataBlock.displayName = "LinkDataBlock";

export default LinkDataBlock;

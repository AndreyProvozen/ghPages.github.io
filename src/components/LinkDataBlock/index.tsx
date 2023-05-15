import Link from 'next/link';
import { Dispatch, FC, SetStateAction, memo, useState } from 'react';
import dynamic from 'next/dynamic';
import { ScreenSize, linkData } from '@/interface';
import { useMediaQuery } from '@/utils/useMediaQuery';
import SettingsDropDown from './SettingsDropDown';

const DeleteLinkModal = dynamic(() => import('../Modal'), { ssr: false });

interface Props {
  data: linkData[];
  setLinks: Dispatch<SetStateAction<linkData[]>>;
}

const LinkDataBlock: FC<Props> = memo(({ data, setLinks }) => {
  const isMobile = useMediaQuery(ScreenSize.TABLET_SMALL_BELOW);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedLink, setDeletedLink] = useState<linkData | undefined>(undefined);

  return (
    <>
      {data.map(linkData => (
        <div className="flex justify-between p-4 mb-5 bg-white rounded-md items-center" key={linkData.code}>
          <div className="line-clamp-1 flex-1 break-all max-w-xs text-start">{linkData.url}</div>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={`/api/${linkData.code}`}
            className="text-darkPink mx-5 whitespace-nowrap hover:text-pink flex-1"
          >
            {linkData.code}
          </Link>
          {!isMobile && <p className="flex-1"> {linkData.clicked}</p>}
          <SettingsDropDown data={linkData} setIsModalOpen={setIsModalOpen} setDeletedLink={setDeletedLink} />
        </div>
      ))}
      {isModalOpen && (
        <DeleteLinkModal
          key={deletedLink?.code}
          setIsModalOpen={setIsModalOpen}
          deletedLink={deletedLink}
          setLinksList={setLinks}
        />
      )}
    </>
  );
});

LinkDataBlock.displayName = 'LinkDataBlock';

export default LinkDataBlock;

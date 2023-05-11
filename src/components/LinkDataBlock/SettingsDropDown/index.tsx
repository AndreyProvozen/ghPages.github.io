import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction } from 'react';
import Dropdown from '@/atoms/Dropdown';
import BarChart from '@/icons/svg/BarChart';
import ClipBoard from '@/icons/svg/ClipBoard';
import ThreeDots from '@/icons/svg/ThreeDots';
import Trash from '@/icons/svg/Trash';
import { flashMessageType, linkData } from '@/interface';
import { useFlashMessage } from '@/utils/FlashMessage';

interface SettingsDropDownProps {
  data: linkData;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setDeletedLink: Dispatch<SetStateAction<undefined | linkData>>;
}

const SettingsDropDown: FC<SettingsDropDownProps> = ({ data, setIsModalOpen, setDeletedLink }) => {
  const router = useRouter();
  const flashMessage = useFlashMessage();

  const settingsFields = [
    {
      fieldTitle: 'Copy',
      fieldFunction: () => {
        navigator.clipboard.writeText(`${window.location.origin}/api/${data.code}`);
        flashMessage.addFlashMessage('Link copied successfully', flashMessageType.SUCCESSFUL);
      },
      fieldImage: <ClipBoard />,
    },
    {
      fieldTitle: ' Delete',
      fieldFunction: () => {
        setDeletedLink(data);
        setIsModalOpen(true);
      },
      fieldImage: <Trash />,
    },
    {
      fieldTitle: 'Statistic',
      fieldFunction: () => {
        router.push(`/statistic/${data.code}`);
      },
      fieldImage: <BarChart width="25px" height="25px" fill="white" />,
    },
  ];

  return (
    <Dropdown
      placeholder={<ThreeDots className="fill-darkPink hover:fill-pink" aria-label="Open link settings" />}
      dropdownData={settingsFields}
      popoverClass="w-60"
    />
  );
};
export default SettingsDropDown;

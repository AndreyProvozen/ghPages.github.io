import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useMemo } from 'react';

import { Dropdown } from '@/atoms';
import { flashMessageType, linkDataProps } from '@/constants';
import BarChart from '@/icons/svg/BarChart';
import ClipBoard from '@/icons/svg/ClipBoard';
import ThreeDots from '@/icons/svg/ThreeDots';
import Trash from '@/icons/svg/Trash';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import getConfigVariable from '@/utils/getConfigVariable';

interface Props {
  data: linkDataProps;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<undefined | linkDataProps>>;
}
const API_HOST = getConfigVariable('API_HOST');

const SettingsDropDown: FC<Props> = ({ data, setIsModalOpen, setIsDeleteModalOpen }) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const settingsFields = useMemo(
    () => [
      {
        fieldTitle: 'Copy',
        fieldFunction: () => {
          navigator.clipboard.writeText(`${API_HOST}/${data.code}`);
          dispatch(addNewFlashMessage({ message: 'Link copied successfully', type: flashMessageType.SUCCESSFUL }));
        },
        fieldImage: <ClipBoard />,
      },
      {
        fieldTitle: 'Statistic',
        fieldFunction: () => push(`/links/${data.code}`),
        fieldImage: <BarChart width="25px" height="25px" fill="white" />,
      },
      {
        fieldTitle: ' Delete',
        fieldFunction: () => {
          setIsDeleteModalOpen(data);
          setIsModalOpen(true);
        },
        fieldImage: <Trash />,
      },
    ],
    [data]
  );

  return (
    <Dropdown
      placeholder={<ThreeDots className="fill-darkPink hover:fill-pink ml-5" aria-label="Open link settings" />}
      dropdownData={settingsFields}
      listContainerClasses="right-0 w-60"
    />
  );
};
export default SettingsDropDown;

import { useRouter } from 'next/router';
import { type Dispatch, type FC, type SetStateAction, useMemo } from 'react';

import { Dropdown } from '@/atoms';
import { FLASH_MESSAGE_TYPE, type LinkDataProps } from '@/constants';
import { BarChart, ClipBoard, ThreeDots, Trash } from '@/icons';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import { getConfigVariable } from '@/utils';

interface Props {
  data: LinkDataProps;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<undefined | LinkDataProps>>;
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
          dispatch(addNewFlashMessage({ message: 'Link copied successfully', type: FLASH_MESSAGE_TYPE.SUCCESSFUL }));
        },
        fieldImage: <ClipBoard />,
      },
      {
        fieldTitle: 'Statistic',
        fieldFunction: () => push(`/links/${data.code}`),
        fieldImage: <BarChart width="25px" height="25px" fill="white" />,
      },
      {
        fieldTitle: 'Delete',
        fieldFunction: () => {
          setIsDeleteModalOpen(data);
          setIsModalOpen(true);
        },
        fieldImage: <Trash />,
      },
    ],
    [data, dispatch, push, setIsDeleteModalOpen, setIsModalOpen]
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

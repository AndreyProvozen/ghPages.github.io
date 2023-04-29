import Dropdown from "@/components/Dropdown";
import BarChart from "@/icons/svg/BarChart";
import ClipBoard from "@/icons/svg/ClipBoard";
import ThreeDots from "@/icons/svg/ThreeDots";
import Trash from "@/icons/svg/Trash";
import { flashMessageType, linkData } from "@/interface";
import { useFlashMessage } from "@/utils/FlashMessage";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction } from "react";

interface SettingsDropDownProps {
  data: linkData;
  setLinks: Dispatch<SetStateAction<linkData[]>>;
}

const SettingsDropDown: FC<SettingsDropDownProps> = ({ data, setLinks }) => {
  const router = useRouter();
  const flashMessage = useFlashMessage();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/api/${data.code}`);
    flashMessage.addFlashMessage(
      "Link copied successfully",
      flashMessageType.SUCCESSFUL
    );
  };

  const handleDeleteLink = () => {
    fetch(`api/link?id=${data._id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        return res.ok && res.json();
      })
      .then((res) =>
        setLinks((prev) => prev.filter(({ _id }) => _id !== res._id))
      );
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
      placeholder={<ThreeDots className="fill-darkPink hover:fill-pink" />}
      dropdownData={settingsFields}
      popoverClass="w-60"
    />
  );
};
export default SettingsDropDown;

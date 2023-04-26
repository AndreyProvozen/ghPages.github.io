import devicesIcon from "@/icons/devices.png";
import BarChart from "@/icons/svg/BarChart";
import Heart from "@/icons/svg/Heart";

import Image from "next/image";

const QualitiesList = () => {
  const qualitiesList = [
    {
      image: <BarChart />,
      title: "Statistics",
      subTitle: "Check the amount of clicks that your shortened URL received",
      alt: "",
    },
    {
      image: <Heart />,
      title: "Easy",
      subTitle:
        "Link Shortener is easy and fast, enter the long link to get your shortened link",
      alt: "",
    },
    {
      image: <Image src={devicesIcon} width={100} height={100} alt="" />,
      title: "Devices",
      subTitle: "Compatible with smartphones, tablets and desktop",
      alt: "",
    },
  ];

  return (
    <>
      <h3 className="text-4xl font-bold mb-5">Our qualities</h3>
      <div className="flex justify-center max-sm:flex-col max-sm:items-center">
        {qualitiesList.map(({ image, title, subTitle }, i) => {
          return (
            <div className="flex flex-col items-center max-w-xs mx-3 " key={i}>
              <div className="w-25 h-25"> {image}</div>
              <p className="text-2xl font-bold">{title}</p>
              <p>{subTitle}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QualitiesList;

import Image from "next/image";
import devicesIcon from "../../../public/devices.png";
import barChartIcon from "../../../public/barChart.svg";
import heartIcon from "../../../public/heart.svg";

const QualitiesList = () => {
  const qualitiesList = [
    {
      src: barChartIcon,
      title: "Statistics",
      subTitle: "Check the amount of clicks that your shortened URL received",
      alt: "",
    },
    {
      src: heartIcon,
      title: "Easy",
      subTitle:
        "Link Shortener is easy and fast, enter the long link to get your shortened link",
      alt: "",
    },
    {
      src: devicesIcon,
      title: "Devices",
      subTitle: "Compatible with smartphones, tablets and desktop",
      alt: "",
    },
  ];

  return (
    <>
      <h3 className="text-4xl font-bold mb-5">Our qualities</h3>
      <div className="flex justify-center max-sm:flex-col max-sm:items-center">
        {qualitiesList.map((quality, i) => {
          return (
            <div className="flex flex-col items-center max-w-xs mx-3" key={i}>
              <Image
                src={quality.src}
                width={100}
                height={100}
                alt={quality.alt}
              />
              <p className="text-2xl font-bold">{quality.title}</p>
              <p>{quality.subTitle}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QualitiesList;

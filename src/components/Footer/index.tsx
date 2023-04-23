import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const linksData = [
    { src: "./github.svg", href: "https://github.com/AndreyProvozen", alt: "" },
    { src: "./instagram.svg", href: "", alt: "" },
    { src: "./steam.svg", href: "", alt: "" },
  ];
  return (
    <div className="bg-darkGrayMain text-whiteMain">
      <div className="container flex justify-between px-5 items-center py-5 mx-auto">
        <p className="text-3xl font-extrabold">Link Shortener</p>
        <div className="flex">
          {linksData.map((data) => (
            <Link
              target="_blank"
              href={data.href}
              className="mr-3"
              key={data.src}
            >
              <Image src={data.src} width={30} height={30} alt={data.alt} />
            </Link>
          ))}
        </div>
      </div>
      <div className="container py-5 mx-auto">
        <Link
          target="_blank"
          className="block"
          href="https://www.freepik.com/free-photo/3d-grunge-room-interior-with-spotlight-smoky-atmosphere-background_6038271.htm"
        >
          Image by kjpargeter on Freepik
        </Link>
        <Link
          target="_blank"
          className="block"
          href="https://www.freepik.com/free-photo/digital-presentation-related-performance-business-using-graph_13463608.htm#query=statistic&position=17&from_view=search&track=robertav1_2_sidr"
        >
          Image by rawpixel.com on Freepik
        </Link>
        <Link
          target="_blank"
          href="https://icons8.com/icon/12923/multiple-devices"
        >
          Multiple Devices icon by Icons8
        </Link>
      </div>
    </div>
  );
};

export default Footer;

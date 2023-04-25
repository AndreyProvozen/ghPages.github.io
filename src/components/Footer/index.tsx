import Image from "next/image";
import Link from "next/link";

const linksData = [
  {
    src: "/github.svg",
    href: "https://github.com/AndreyProvozen",
    alt: "GitHub",
  },
  { src: "/instagram.svg", href: "", alt: "Instagram" },
  { src: "/steam.svg", href: "", alt: "Steam" },
];

const credits = [
  {
    href: "https://www.freepik.com/free-photo/3d-grunge-room-interior-with-spotlight-smoky-atmosphere-background_6038271.htm",
    text: "Image by kjpargeter on Freepik",
  },
  {
    href: "https://www.freepik.com/free-photo/digital-presentation-related-performance-business-using-graph_13463608.htm#query=statistic&position=17&from_view=search&track=robertav1_2_sidr",
    text: "Image by rawpixel.com on Freepik",
  },
  {
    href: "https://icons8.com/icon/12923/multiple-devices",
    text: "Multiple Devices icon by Icons8",
  },
];

const Footer = () => (
  <div className="bg-darkGrayMain text-whiteMain">
    <div className="container max-w-screen-xl flex justify-between px-5 items-center py-5 mx-auto">
      <p className="text-3xl font-extrabold">Link Shortener</p>
      <div className="flex">
        {linksData.map(({ src, href, alt }) => (
          <Link target="_blank" href={href} className="mr-3" key={src}>
            <Image src={src} width={30} height={30} alt={alt} />
          </Link>
        ))}
      </div>
    </div>
    <div className="container py-5 mx-auto">
      {credits.map(({ href, text }) => (
        <Link target="_blank" className="block mb-2" href={href} key={href}>
          {text}
        </Link>
      ))}
    </div>
  </div>
);

export default Footer;

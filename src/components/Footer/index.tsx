import GitHub from "@/icons/svg/GitHub";
import Instagram from "@/icons/svg/Instagram";
import Steam from "@/icons/svg/Steam";
import Link from "next/link";

const linksData = [
  {
    icon: <GitHub fill="white" />,
    href: "https://github.com/AndreyProvozen",
  },
  { icon: <Instagram />, href: "" },
  { icon: <Steam />, href: "" },
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

const Footer = ({ containerClasses = "" }) => (
  <div className={`bg-darkGrayMain text-whiteMain ${containerClasses}`}>
    <div className="container max-w-screen-xl flex justify-between px-5 items-center py-5 mx-auto">
      <p className="text-3xl font-extrabold">Link Shortener</p>
      <div className="flex">
        {linksData.map(({ icon, href }) => (
          <Link target="_blank" href={href} className="mr-3" key={href}>
            {icon}
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

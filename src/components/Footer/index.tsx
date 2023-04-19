import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const linksData = [
    { src: "./github.svg", href: "", alt: "" },
    { src: "./instagram.svg", href: "", alt: "" },
    { src: "./steam.svg", href: "", alt: "" },
  ];
  return (
    <div className="bg-blackMain">
      <div className="container flex justify-between px-5 items-center py-5 mx-auto">
        <p className="text-3xl font-extrabold">Link Shortener</p>
        <div className="flex">
          {linksData.map((data) => (
            <Link href={data.href} className="mr-3" key={data.src}>
              <Image src={data.src} width={30} height={30} alt={data.alt} />
            </Link>
          ))}
        </div>
      </div>
      <>
        <Link href="https://www.freepik.com/free-photo/3d-grunge-room-interior-with-spotlight-smoky-atmosphere-background_6038271.htm">
          Image by kjpargeter on Freepik
        </Link>
      </>
    </div>
  );
};

export default Footer;

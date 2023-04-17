import Image from "next/image";
import Link from "next/link";

const Header = () => (
  <div className="text-whiteMain mt-5">
    <header className="container mx-auto flex justify-between items-center text-xl">
      <p className="text-3xl">Link Shortener</p>
      <div className="flex">
        <Image src="./sun.svg" width={16} height={16} alt="theme" priority />
        <Link href="https://github.com/AndreyProvozen" className="mx-3">
          GitHub
        </Link>
      </div>
    </header>
  </div>
);

export default Header;

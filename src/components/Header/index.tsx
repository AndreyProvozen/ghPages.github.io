import Image from "next/image";
import Link from "next/link";

const Header = () => (
  <div className="text-whiteMain pt-5">
    <header className="container mx-auto flex justify-between items-center text-xl">
      <p className="text-3xl font-extrabold">Link Shortener</p>
      <div className="flex">
        <Link
          href="https://github.com/AndreyProvozen"
          target="_blank"
          className="mx-3"
        >
          GitHub
        </Link>
      </div>
    </header>
  </div>
);

export default Header;

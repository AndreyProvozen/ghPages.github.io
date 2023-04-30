import Close from "@/icons/svg/Close";
import Link from "next/link";
import { FC } from "react";

interface DroverProps {
  isOpen: boolean;
  handleToggle: () => void;
  session: any;
}

const Drover: FC<DroverProps> = ({ isOpen, handleToggle, session }) => {
  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Statistic", link: "/" },
    session
      ? { title: "My profile", link: "/" }
      : { title: "Sign in", link: "/auth" },
  ];
  return (
    <div className="relative text-white">
      <div
        className={`${
          isOpen ? "right-0" : "right-full"
        } fixed z-40 top-0 w-full h-screen bg-lightBlack ease-in-out transition-all  duration-500`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-2xl">Menu</h2>
          <button
            className="text-gray-500 focus:outline-none"
            onClick={handleToggle}
            aria-label="Close button"
          >
            <Close />
          </button>
        </div>
        <div className="px-4 py-8 flex flex-col">
          {navLinks.map(({ title, link }) => (
            <Link href={link} key={title} onClick={handleToggle}>
              {title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drover;

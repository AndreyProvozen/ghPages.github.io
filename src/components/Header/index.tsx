import Image from "next/image";

const Header = () => {
  return (
    <div className="text-whiteMain mt-5">
      <header className="container mx-auto flex justify-between items-center text-xl">
        <p className="text-3xl">Link Shortener</p>
        <div className="flex">
          <Image src="./sun.svg" width={16} height={16} alt="theme" priority />
          <div className="mx-3">GitHub</div>
          <div>language</div>
        </div>
      </header>
    </div>
  );
};

export default Header;

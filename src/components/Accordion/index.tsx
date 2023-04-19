import Image from "next/image";
import { FC, useState } from "react";

interface AccordionProps {
  data: {
    title: string;
    description: string;
  };
}

const Accordion: FC<AccordionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="p-2 cursor-pointer flex justify-between border-b-2 hover:bg-lightPinkMain"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-lg">{data.title}</h3>
        <Image
          src="./chevron.svg"
          className={`transform transition ease-out duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          width={30}
          height={30}
          alt=""
        />
      </div>
      <div
        className={`transition-max-height ease-in-out duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </div>
  );
};

export default Accordion;

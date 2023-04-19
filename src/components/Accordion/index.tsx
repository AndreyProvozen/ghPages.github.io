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
        className="py-2 cursor-pointer flex justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-lg">{data.title}</h3>
        <Image src="./chevron.svg" width={20} height={20} alt="" />
      </div>
      {isOpen && (
        <div className="py-2">
          <p>{data.description}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;

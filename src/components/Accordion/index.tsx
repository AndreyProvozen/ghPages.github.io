import { FC, memo, useState } from "react";
import Chevron from "@/icons/svg/Chevron";

interface AccordionProps {
  data: {
    title: string;
    description: string;
  };
}

const Accordion: FC<AccordionProps> = memo(({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="p-2 cursor-pointer flex justify-between border-b-2 w-full hover:bg-lightPinkMain"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-lg">{data.title}</h3>
        <Chevron
          width="30px"
          height="30px"
          className={`transform transition ease-out duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-max-height ease-in-out duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </div>
  );
});

Accordion.displayName = "Accordion";

export default Accordion;

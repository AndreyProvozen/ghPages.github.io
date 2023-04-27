import { FC, ReactElement, useState } from "react";

interface DropdownProps {
  dropdownData: { field: ReactElement }[];
  placeholder: ReactElement;
}

const Dropdown: FC<DropdownProps> = ({ dropdownData = [], placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative text-whiteMain">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex"
      >
        {placeholder}
      </button>
      {isOpen && (
        <div className="absolute rounded-lg bg-darkGrayMain px-4 pt-4 mt-4 w-72 right-0 z-10">
          {dropdownData.map(({ field }, i) => (
            <div
              className={`block py-4 border-b-2 border-pinkMain [&>*]:w-full [&>*]:text-start  
                ${i === 0 ? "first:pt-0" : ""} ${
                i === dropdownData.length - 1 ? "last:border-0" : ""
              }`}
              key={i}
            >
              {field}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

import { FC, ReactElement, useEffect, useRef, useState } from "react";

interface DropdownProps {
  dropdownData: {
    fieldTitle?: string;
    fieldFunction?: () => void;
    fieldImage?: ReactElement;
    customField?: ReactElement;
  }[];
  placeholder: ReactElement;
  popoverClass?: string;
}

const Dropdown: FC<DropdownProps> = ({
  dropdownData = [],
  placeholder,
  popoverClass = "w-72",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleFunction = (fieldFunction = () => {}) => {
    fieldFunction();
    setIsOpen(false);
  };

  return (
    <div className="relative text-white" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex"
      >
        {placeholder}
      </button>
      {isOpen && (
        <div
          className={`${popoverClass} absolute rounded-lg bg-lightBlack px-4 pt-4 mt-4 right-0 z-10`}
        >
          {dropdownData.map(
            ({ fieldTitle, fieldFunction, fieldImage, customField }, i) => (
              <>
                {customField ? (
                  customField
                ) : (
                  <button
                    className={`group flex items-center border-b-2 border-pink py-4 w-full text-start ${
                      i === 0 ? "first:pt-0" : ""
                    } ${i === dropdownData.length - 1 ? "last:border-0" : ""}`}
                    key={i}
                    onClick={() => handleFunction(fieldFunction)}
                  >
                    {Boolean(fieldImage) && (
                      <div className="mr-3 group-hover:[&>svg]:fill-lightPink [&>svg]:w-6 [&>svg]:h-6">
                        {fieldImage}
                      </div>
                    )}
                    <div className="text-xl group-hover:text-lightPink">
                      {fieldTitle}
                    </div>
                  </button>
                )}
              </>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

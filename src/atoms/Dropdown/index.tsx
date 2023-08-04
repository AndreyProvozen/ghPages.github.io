import { FC, ReactElement, useEffect, useRef, useState } from 'react';

import DropdownList, { DropdownDataProps } from './DropdownList';

interface Props {
  dropdownData: DropdownDataProps[];
  placeholder: ReactElement;
  listContainerClasses?: string;
}

const Dropdown: FC<Props> = ({ dropdownData = [], placeholder, listContainerClasses = 'right-0 w-72' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative text-white" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex">
        {placeholder}
      </button>
      {isOpen && (
        <DropdownList dropdownData={dropdownData} listContainerClasses={listContainerClasses} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default Dropdown;

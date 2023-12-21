import { FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import DropdownPopUp, { DropdownDataProps } from './DropdownPopUp';
import { DROPDOWN_TEST_IDS } from './testIds';

interface Props {
  dropdownData: DropdownDataProps[];
  placeholder: ReactElement;
  listContainerClasses?: string;
}

const Dropdown: FC<Props> = ({ dropdownData = [], placeholder, listContainerClasses = 'right-0 w-72' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => setIsOpen(prevState => !prevState);

  return (
    <div className="relative text-white" ref={dropdownRef}>
      <button data-testid={DROPDOWN_TEST_IDS.TOGGLE_BUTTON} onClick={toggleDropdown} className="cursor-pointer flex">
        {placeholder}
      </button>
      {isOpen && (
        <DropdownPopUp dropdownData={dropdownData} listContainerClasses={listContainerClasses} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default Dropdown;

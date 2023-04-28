import React, { FC } from "react";

interface SearchBlockProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  setValue: (value: string) => void;
}

const SearchBlock: FC<SearchBlockProps> = ({ onSubmit, value, setValue }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="relative mb-14 flex w-full flex-wrap items-stretch max-sm:block"
    >
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste the URL to be shortened"
        className="bg-white placeholder:text-black relative m-0 flex-auto rounded-l px-3 py-[0.6rem] max-sm:w-full max-sm:rounded-r focus:outline-none"
      />
      <button
        type="submit"
        className="text-white bg-pink rounded-r text-center px-6 py-2.5 max-sm:w-full max-sm:mt-4 hover:bg-lightPink active:bg-darkPink"
      >
        generate link
      </button>
    </form>
  );
};

export default SearchBlock;

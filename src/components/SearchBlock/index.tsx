import { FC, FormEvent } from 'react';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  value: string;
  setValue: (value: string) => void;
  btnText: string;
  placeholder?: string;
  containerClasses?: string;
}

const SearchBlock: FC<Props> = ({ onSubmit, value, setValue, btnText, placeholder = '', containerClasses = '' }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`relative flex w-full flex-wrap items-stretch max-tablet-small:block ${containerClasses}`}
    >
      <input
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        className="bg-white border-[1px] border-gray flex-auto placeholder:text-black relative m-0 rounded-l px-3 py-2.5 max-tablet-small:w-full max-tablet-small:rounded-r focus:outline-none focus:border-pink"
      />
      <button
        type="submit"
        className="text-white text-2xl bg-pink rounded-r text-center px-6 py-2.5 hover:bg-lightPink active:bg-darkPink max-tablet-small:w-full max-tablet-small:rounded-l max-tablet-small:mt-4"
      >
        {btnText}
      </button>
    </form>
  );
};

export default SearchBlock;

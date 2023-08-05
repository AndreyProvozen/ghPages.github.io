import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import SearchBlock from '@/components/SearchBlock';
import Heart from '@/icons/svg/Heart';

const FiltersBlock = () => {
  const { query, push, pathname } = useRouter();

  const [link, setLink] = useState(query?.searchString || '');

  const showFavoriteList = useMemo(() => query?.search === 'favorite', [query?.search]);

  useEffect(() => {
    if (query.search) return;

    if (link) {
      const timeoutId = setTimeout(() => {
        push(`?searchString=${link}`);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }

    push(pathname);
  }, [link]);

  const updateQuery = () => (showFavoriteList ? push(pathname) : push('?search=favorite'));

  return (
    <div className="flex justify-between w-full items-start border-b border-gray">
      <button
        className={`border ${
          showFavoriteList ? 'border-pink bg-lightPink/20' : 'border-gray'
        }  px-3 py-2.5 rounded flex items-center ml-3`}
        onClick={updateQuery}
      >
        <Heart width={20} height={20} className={`${showFavoriteList ? 'fill-pink' : 'fill-gray'}`} />
        <p className="ml-2">Favorite</p>
      </button>
      <SearchBlock
        onSubmit={() => null}
        value={String(link)}
        containerClasses="mb-5 text-black w-1/2"
        setValue={setLink}
        placeholder="Enter symbols after the last slash in the URL"
      />
    </div>
  );
};

export default FiltersBlock;

import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import Heart from '@/icons/svg/Heart';

const FiltersBlock = () => {
  const { query, push, pathname } = useRouter();

  const [link, setLink] = useState(query?.searchString || '');

  const showFavoriteList = useMemo(() => query?.search === 'favorite', [query?.search]);

  useEffect(() => {
    if (link) {
      const timeoutId = setTimeout(() => {
        push(`?searchString=${link}${query.search ? '&search=favorite' : ''}`);
      }, 800);

      return () => clearTimeout(timeoutId);
    }

    if (showFavoriteList) {
      push('?search=favorite');
      return;
    }

    push(pathname);
  }, [link]);

  const updateQuery = () =>
    showFavoriteList ? push(pathname) : push(`?search=favorite${query?.search ? `&searchString=${link}` : ''}`);

  return (
    <div className="flex justify-between w-full items-start border-b border-gray mb-5 gap-5">
      <button
        className={`border ${
          showFavoriteList ? 'border-pink bg-lightPink/20' : 'border-gray'
        }  px-3 py-2.5 rounded flex items-center ml-3`}
        onClick={updateQuery}
      >
        <Heart width={20} height={20} className={`${showFavoriteList ? 'fill-pink' : 'fill-gray'}`} />
        <p className="ml-2">Favorite</p>
      </button>
      <input
        type="search"
        value={link}
        onChange={e => setLink(e.target.value)}
        placeholder="Enter symbols after the last slash in the URL"
        className={
          'mb-5 px-3 py-2.5 relative max-w-sm w-full border-[1px] border-gray rounded focus:outline-none focus:border-pink'
        }
      />
    </div>
  );
};

export default FiltersBlock;

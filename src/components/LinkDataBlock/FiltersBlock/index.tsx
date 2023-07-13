import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import SearchBlock from '@/components/SearchBlock';
import Heart from '@/icons/svg/Heart';

const FiltersBlock = () => {
  const router = useRouter();

  const [link, setLink] = useState(router.query?.searchString || '');

  const showFavoriteList = useMemo(() => router.query?.search === 'favorite', [router.query?.search]);

  useEffect(() => {
    if (link) {
      const timeoutId = setTimeout(() => {
        router.push(`?searchString=${link}`);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
    router.push(router.pathname);
  }, [link]);

  const updateQuery = () => {
    if (showFavoriteList) {
      router.push(router.pathname);
    } else {
      router.push('?search=favorite');
    }
  };

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

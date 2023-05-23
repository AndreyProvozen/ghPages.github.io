import React, { useState } from 'react';

import SearchBlock from '@/components/SearchBlock';
import Heart from '@/icons/svg/Heart';

const FiltersBlock = () => {
  const [link, setLink] = useState('');
  const [isFavoriteLinks, setIsFavoriteLinks] = useState(false);
  return (
    <div className="flex justify-between w-full items-start border-b border-gray">
      <button
        className={`border ${
          isFavoriteLinks ? 'border-pink bg-lightPink/20' : 'border-gray'
        }  px-3 py-2.5 rounded flex items-center ml-3`}
        onClick={() => setIsFavoriteLinks(prev => !prev)}
      >
        <Heart width={20} height={20} className={`${isFavoriteLinks ? 'fill-pink' : 'fill-gray'}`} />
        <p className="ml-2">Favorite</p>
      </button>
      <SearchBlock
        onSubmit={() => null}
        value={link}
        containerClasses="mb-5 text-black w-1/2"
        setValue={setLink}
        placeholder="Search"
      />
    </div>
  );
};

export default FiltersBlock;

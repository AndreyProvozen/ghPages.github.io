import React from 'react';

const FilterBlockSkeleton = () => (
  <div className="flex justify-between mt-10 px-5 border-b border-gray">
    <div className="w-28 h-11 bg-gray animate-pulse rounded-md mb-5 flex-shrink-0" />
    <div className=" ml-3 w-[500px] h-11 bg-gray animate-pulse rounded-md" />
  </div>
);

export default FilterBlockSkeleton;

import { useRouter } from 'next/router';
import { FC, useCallback, useMemo } from 'react';

import Chevron from '@/icons/svg/Chevron';
import ClassNames from '@/utils/ClassNames';

interface Props {
  perPage: number;
  count: number;
}

const Pagination: FC<Props> = ({ perPage, count }) => {
  const { query, push } = useRouter();

  const currentPage = parseInt(query?.page as string, 10) || 0;
  const totalPage = Math.ceil(count / perPage);

  const disabledForPrev = useMemo(() => currentPage === 0, [currentPage]);
  const disabledForNext = useMemo(() => currentPage === totalPage - 1, [currentPage, totalPage]);

  const updatePage = page => {
    push({ query: { ...query, page } }, undefined, { shallow: true });
  };

  const nextPage = useCallback(() => {
    if (currentPage < totalPage - 1) {
      updatePage(currentPage + 1);
    }
  }, [totalPage, currentPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      updatePage(currentPage - 1);
    }
  }, [currentPage]);

  return (
    <div className="flex justify-center my-4">
      <button onClick={prevPage} className="flex" disabled={disabledForPrev}>
        <Chevron className={ClassNames('rotate-90', { 'fill-gray': disabledForPrev })} width={30} height={30} />
        <b className={ClassNames('text-xl', { 'text-gray': disabledForPrev })}>Prev</b>
      </button>
      <b className="text-xl mx-5"> {`Page ${currentPage + 1} of ${totalPage}`}</b>
      <button className="flex" onClick={nextPage} disabled={disabledForNext}>
        <b className={ClassNames('text-xl', { 'text-gray': disabledForNext })}>Next</b>
        <Chevron className={ClassNames('-rotate-90', { 'fill-gray': disabledForNext })} width={30} height={30} />
      </button>
    </div>
  );
};

export default Pagination;

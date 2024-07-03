import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';

import Chevron from '@/icons/Chevron';
import classNames from '@/utils/classNames';

import { PAGINATION_TEST_IDS } from './testIds';

interface Props {
  perPage: number;
  count: number;
}

const Pagination: FC<Props> = ({ perPage, count }) => {
  const { query, push } = useRouter();

  const currentPage = parseInt(query?.page as string, 10) || 0;
  const totalPage = Math.ceil(count / perPage);

  const disabledForPrev = currentPage === 0;
  const disabledForNext = currentPage === totalPage - 1;

  const pageCounter = `Page ${currentPage + 1} of ${totalPage}`;

  const updatePage = (page: number) => {
    push({ query: { ...query, page } }, undefined, { shallow: true });
  };

  const nextPage = useCallback(() => {
    if (!disabledForNext) updatePage(currentPage + 1);
  }, [totalPage, currentPage]);

  const prevPage = useCallback(() => {
    if (!disabledForPrev) updatePage(currentPage - 1);
  }, [currentPage]);

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={prevPage}
        data-testid={PAGINATION_TEST_IDS.PREV_BUTTON}
        className="flex"
        disabled={disabledForPrev}
      >
        <Chevron className={classNames('rotate-90', { 'fill-gray': disabledForPrev })} width={30} height={30} />
        <b className={classNames('text-xl', { 'text-gray': disabledForPrev })}>Prev</b>
      </button>
      <b className="text-xl mx-5"> {pageCounter}</b>
      <button
        className="flex"
        onClick={nextPage}
        data-testid={PAGINATION_TEST_IDS.NEXT_BUTTON}
        disabled={disabledForNext}
      >
        <b className={classNames('text-xl', { 'text-gray': disabledForNext })}>Next</b>
        <Chevron className={classNames('-rotate-90', { 'fill-gray': disabledForNext })} width={30} height={30} />
      </button>
    </div>
  );
};

export default Pagination;

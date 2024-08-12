import { useRouter } from 'next/router';
import { type FC, useCallback, useMemo } from 'react';

import Chevron from '@/icons/Chevron';
import classNames from '@/utils/classNames';

import { PAGINATION_TEST_IDS } from './testIds';

interface Props {
  perPage: number;
  count: number;
}

const Pagination: FC<Props> = ({ perPage, count }) => {
  const { query, push } = useRouter();

  const currentPage = useMemo(() => parseInt(query?.page as string, 10) || 0, [query]);
  const totalPage = useMemo(() => Math.ceil(count / perPage), [count, perPage]);

  const disabledForPrev = useMemo(() => currentPage === 0, [currentPage]);
  const disabledForNext = useMemo(() => currentPage === totalPage - 1, [currentPage, totalPage]);

  const pageCounter = useMemo(() => `Page ${currentPage + 1} of ${totalPage}`, [currentPage, totalPage]);

  const updatePage = useCallback(
    (page: number) => {
      push({ query: { ...query, page } }, undefined, { shallow: true });
    },
    [push, query]
  );

  const nextPage = useCallback(() => {
    if (!disabledForNext) updatePage(currentPage + 1);
  }, [disabledForNext, updatePage, currentPage]);

  const prevPage = useCallback(() => {
    if (!disabledForPrev) updatePage(currentPage - 1);
  }, [currentPage, disabledForPrev, updatePage]);

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
      <b className="text-xl mx-5">{pageCounter}</b>
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

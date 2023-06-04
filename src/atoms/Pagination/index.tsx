import { useRouter } from 'next/router';
import { FC } from 'react';

import Chevron from '@/icons/svg/Chevron';
import ClassNames from '@/utils/ClassNames';

interface Props {
  perPage: number;
  count: number;
}

const Pagination: FC<Props> = ({ perPage, count }) => {
  const router = useRouter();

  const currentPage = parseInt(router.query?.page as string, 10) || 0;
  const totalPage = Math.ceil(count / perPage);

  const disabledForPrev = currentPage === 0;
  const disabledForNext = currentPage === totalPage - 1;

  const updatePage = page => {
    router.push({ query: { ...router.query, page } }, undefined, { shallow: true });
  };

  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      updatePage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      updatePage(currentPage - 1);
    }
  };

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

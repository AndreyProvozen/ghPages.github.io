import { useRouter } from 'next/router';

import Chevron from '@/icons/svg/Chevron';

const Pagination = ({ paginationData }) => {
  const router = useRouter();

  const { count, perPage } = paginationData;

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
        <Chevron className={`rotate-90 ${disabledForPrev ? 'fill-gray' : ''}`} width={30} height={30} />
        <b className={`text-xl ${disabledForPrev ? 'text-gray' : ''}`}>Prev</b>
      </button>
      <b className="text-xl mx-5"> {`Page ${currentPage + 1} of ${totalPage}`}</b>
      <button className="flex" onClick={nextPage} disabled={disabledForNext}>
        <b className={`text-xl ${disabledForNext ? 'text-gray' : ''}`}>Next</b>
        <Chevron className={`-rotate-90 ${disabledForNext ? 'fill-gray' : ''}`} width={30} height={30} />
      </button>
    </div>
  );
};

export default Pagination;

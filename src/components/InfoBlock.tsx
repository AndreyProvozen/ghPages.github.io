import Link from 'next/link';
import { FC } from 'react';

interface Props {
  btnHref: string;
  btnText: string;
  title: string;
}

const InfoBlock: FC<Props> = ({ btnHref, btnText, title }) => (
  <div className="bg-lightBlack text-center py-20 px-3 text-white">
    <div className="text-3xl font-bold mb-10">{title}</div>
    <Link href={btnHref} className="text-2xl rounded-md hover:bg-lightPink bg-pink px-6 py-2.5 active:bg-darkPink">
      {btnText}
    </Link>
  </div>
);

export default InfoBlock;

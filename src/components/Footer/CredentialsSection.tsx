import Link from 'next/link';

import { credits } from '@/constants/mock';

const CredentialsSection = () => (
  <div className="container py-5 mx-auto">
    {credits.map(({ href, text }) => (
      <Link target="_blank" className="block mb-2" href={href} key={href}>
        {text}
      </Link>
    ))}
  </div>
);

export default CredentialsSection;

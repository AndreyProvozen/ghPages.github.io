import Image from 'next/image';
import { signIn } from 'next-auth/react';

import { Header } from '@/components';

const PROVIDERS_LIST = [
  { image: '/svg/google.svg', text: 'Continue with Google', provider: 'google' },
  { image: '/svg/gitHub.svg', text: 'Continue with GitHub', provider: 'github' },
];

const Auth = () => (
  <div className="min-h-screen flex flex-col justify-between">
    <Header textBlack containerClasses="px-5" />
    <div className="text-center px-5 pb-20 my-auto">
      <h1 className="text-5xl my-8">Sign in or register</h1>
      {PROVIDERS_LIST.map(({ image, provider, text }) => (
        <button
          key={text}
          className="hover:bg-gray flex mx-auto border mb-5 p-4 border-gray rounded-xl w-full max-w-[350px]"
          onClick={() => signIn(provider)}
        >
          <Image width={24} height={24} src={image} alt={`${text} image`} />
          <p className="mx-auto text-darkPink">{text}</p>
        </button>
      ))}
    </div>
  </div>
);

export default Auth;

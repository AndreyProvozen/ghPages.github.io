import { signIn, getSession, GetSessionParams } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Google from '@/icons/svg/Google';
import GitHub from '@/icons/svg/GitHub';
import Email from '@/icons/svg/Email';

const Auth = () => {
  const authWith = [
    {
      image: <Google />,
      text: 'Continue with Google',
      provider: 'google',
    },
    {
      image: <GitHub />,
      text: 'Continue with GitHub',
      provider: 'github',
    },
    {
      image: <Email />,
      text: 'Continue with Email',
      provider: 'email',
    },
  ];
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header textBlack={true} containerClasses="px-5" />
      <div className="text-center px-5 pb-20">
        <h1 className="text-5xl my-8 ">Sign in or register</h1>
        {authWith.map(({ image, provider, text }, i) => (
          <button
            key={i}
            className="hover:bg-gray flex mx-auto border mb-5 p-4 border-gray rounded-xl w-full max-w-[350px]"
            onClick={() => signIn(provider)}
          >
            <div className="w-6 h-6">{image}</div>
            <p className="mx-auto text-darkPink">{text}</p>
          </button>
        ))}
      </div>
      <Footer containerClasses="w-full" />
    </div>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default Auth;

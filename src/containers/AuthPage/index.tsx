import React from "react";
import { signIn, getSession } from "next-auth/react";
import Image from "next/image";
import Header from "@/components/Header";

const Auth = () => {
  const authWith = [
    {
      src: "./google.svg",
      text: "Continue with Google",
      alt: "",
      provider: "google",
    },
    {
      src: "./gitHub.svg",
      text: "Continue with GitHub",
      alt: "",
      provider: "github",
    },
    {
      src: "./email.svg",
      text: "Continue with Email",
      alt: "",
      provider: "email",
    },
  ];
  return (
    <div className="text-center ">
      <Header textBlack={true} />
      <h1 className="text-5xl my-8">Sign in or register</h1>
      {authWith.map((item, i) => (
        <button
          key={i}
          className="hover:bg-grayMain flex mx-auto border mb-5 p-4 border-grayMain rounded-xl w-full max-w-[350px]"
          onClick={() => signIn(item.provider)}
        >
          <Image
            className="mr-2"
            src={item.src}
            width={24}
            height={24}
            alt={item.alt}
          />
          <p className="mx-auto text-darkPinkMain">{item.text}</p>
        </button>
      ))}
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default Auth;

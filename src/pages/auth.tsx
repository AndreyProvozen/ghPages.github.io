import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Header from "@/components/Header";
const Auth = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div>Welcome,{session.user?.email}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  const authWith = [
    { src: "./google.svg", text: "Continue with Google", alt: "" },
    { src: "./facebook.svg", text: "Continue with Facebook", alt: "" },
    { src: "./email.svg", text: "Continue with Email", alt: "" },
  ];
  return (
    <div className="text-center ">
      <Header textBlack={true} />
      <h1 className="text-5xl mb-8">Sign in or register</h1>
      {authWith.map(({ src, text }, i) => (
        <button
          key={i}
          className="hover:bg-grayMain flex mx-auto border mb-5 p-4 border-grayMain rounded-xl w-full max-w-[350px]"
          onClick={() => signIn()}
        >
          <Image className="mr-2" src={src} width={24} height={24} alt="" />
          <p className="mx-auto text-darkPinkMain">{text}</p>
        </button>
      ))}
    </div>
  );
};

export default Auth;

import Auth from "@/containers/AuthPage";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Auth Page</title>
      </Head>
      <Auth />
    </>
  );
};

export default HomePage;

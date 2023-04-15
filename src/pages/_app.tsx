import CircleBackground from "@/components/CircleBackground";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CircleBackground>
      <Header />
      <Component {...pageProps} />
    </CircleBackground>
  );
}

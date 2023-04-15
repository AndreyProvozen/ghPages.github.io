import CircleBackground from "@/components/CircleBackground";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body
        style={{
          backgroundColor: "#020205",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

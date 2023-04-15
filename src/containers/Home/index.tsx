import { useState } from "react";

const Home = () => {
  const [longLink, setLongLink] = useState("");
  console.log(longLink);

  return (
    <div className="container text-center mx-auto text-lg">
      <div className="mt-12 text-5xl">Link Shortener</div>
      <div className="max-w-lg mx-auto my-5">
        Free URL Shortener for transforming long, ugly links into nice,
        memorable and trackable short URLs
      </div>
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          value={longLink}
          onChange={(e) => setLongLink(e.target.value)}
          placeholder="Paste the URL to be shortened"
          className="relative m-0 flex-auto rounded-l px-3 py-[0.25rem] text-blackMain"
        />
        <button className="relative flex items-center rounded-r text-whiteMain hover:bg-lightPinkMain bg-pinkMain px-6 py-2.5 active:bg-darkPinkMain ">
          generate link
        </button>
      </div>
    </div>
  );
};

export default Home;

import type { linkData } from "@/interface";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const Home = () => {
  const [longLink, setLongLink] = useState("");
  const [data, setData] = useState<linkData[]>([]);

  useEffect(() => {
    fetch("api/link")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("api/link", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: longLink }),
    });
    setLongLink("");
    const content = await response.json();

    if (content) {
      setData([content, ...data]);
    }
  };

  return (
    <div className="container text-center mx-auto text-lg max-w-screen-md bg-home-bg-image">
      <div className="mt-12 text-5xl">Link Shortener</div>
      <div className="max-w-lg mx-auto my-5">
        Free URL Shortener for transforming long, ugly links into nice,
        memorable and trackable short URLs
      </div>
      <form
        onSubmit={handleOnSubmit}
        className="relative mb-4 flex w-full flex-wrap items-stretch"
      >
        <input
          type="search"
          value={longLink}
          onChange={(e) => setLongLink(e.target.value)}
          placeholder="Paste the URL to be shortened"
          className="relative m-0 flex-auto rounded-l px-3 py-[0.25rem] text-blackMain"
        />
        <button
          type="submit"
          className="relative flex items-center rounded-r text-whiteMain hover:bg-lightPinkMain bg-pinkMain px-6 py-2.5 active:bg-darkPinkMain "
        >
          generate link
        </button>
      </form>
      <div>
        {Boolean(data.length) &&
          data.map((item, i) => (
            <div
              className="flex justify-between p-5 mb-5 bg-whiteMain rounded-md"
              key={i}
            >
              <div className="text-blackMain line-clamp-1 break-all max-w-xs">
                {item.url}
              </div>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={`/api/${item.code}`}
                className="text-darkPinkMain"
              >
                {item.code}
              </Link>
              <div key={i} className="text-blackMain">
                {item.clicked}
              </div>
              <button
                className="text-darkPinkMain"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `http://localhost:3000/api/${item.code}`
                  )
                }
              >
                Copy
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

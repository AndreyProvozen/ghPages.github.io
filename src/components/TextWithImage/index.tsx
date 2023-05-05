import Star from "@/icons/svg/Star";
import Image from "next/image";
import React, { FC } from "react";

interface TextWithImageProps {
  linkData: { src: string; alt: string };
  text: string;
  title: string;
  imageFirst?: boolean;
  containerClasses?: string;
  listData?: string[];
}

const TextWithImage: FC<TextWithImageProps> = ({
  linkData,
  text,
  imageFirst,
  title,
  listData,
  containerClasses = "",
}) => {
  return (
    <>
      <div
        className={`flex justify-between px-5 ${
          imageFirst ? "flex-row-reverse" : ""
        } ${containerClasses}`}
      >
        <div>
          <h3 className="text-2xl font-bold mx-auto text-center">{title}</h3>{" "}
          <div dangerouslySetInnerHTML={{ __html: text }} />
          <div>
            {Boolean(listData) &&
              listData?.map((title, i) => (
                <div className="flex mt-5" key={i}>
                  <Star className="shrink-0 mr-3 fill-lightOrange" /> {title}
                </div>
              ))}
          </div>
        </div>
        <Image
          src={linkData.src}
          alt={linkData.alt}
          height={400}
          width={500}
          className="px-5"
        />
      </div>
    </>
  );
};

export default TextWithImage;

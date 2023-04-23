import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = ({ textBlack }: { textBlack?: boolean }) => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className={`text-${textBlack ? "blackMain" : "whiteMain"} pt-5`}>
      <header className="container mx-auto flex justify-between items-center text-xl">
        <p className="text-3xl font-extrabold">Link Shortener</p>
        <div className="flex">
          {session ? (
            <div className="flex ">
              <Image
                className="rounded-full mr-2"
                src={session.user?.image || ""}
                width={30}
                height={30}
                alt=""
              />
              <p>My profile</p>
            </div>
          ) : (
            <Link href="/auth" className="mx-3">
              Sign in
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;

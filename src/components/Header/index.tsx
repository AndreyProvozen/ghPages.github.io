import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "../Dropdown";

const Header = ({ textBlack }: { textBlack?: boolean }) => {
  const { data: session } = useSession();
  const dropdownData = session
    ? [
        {
          field: (
            <div className="flex items-center">
              <Image
                className="flex-shrink-0 rounded-full overflow-hidden mr-2"
                src={session.user?.image || ""}
                width={48}
                height={48}
                alt=""
              />
              <div className="overflow-hidden">
                <p className="text-ellipsis overflow-hidden">
                  {session.user?.name}
                </p>
                <p className="text-ellipsis overflow-hidden">
                  {session.user?.email}
                </p>
              </div>
            </div>
          ),
        },
        { field: <div className="flex items-center">2 field</div> },
        {
          field: (
            <button className="flex items-center" onClick={() => signOut()}>
              Sign out
            </button>
          ),
        },
      ]
    : [];

  return (
    <div
      className={`${
        textBlack
          ? "text-blackMain border-b-2 border-grayMain"
          : "text-whiteMain"
      } py-5`}
    >
      <header className="container max-w-screen-xl mx-auto flex justify-between items-center text-xl">
        <Link href="/" className="text-3xl font-extrabold">
          Link Shortener
        </Link>
        <div className="flex">
          <Link href="/" className="mx-3">
            Home
          </Link>

          <Link href="/statistic" className="mx-3">
            Statistic
          </Link>
          {session ? (
            <Dropdown
              dropdownData={dropdownData}
              placeholder={
                <div className="flex mx-3">
                  <Image
                    className="rounded-full mr-2"
                    src={session.user?.image || ""}
                    width={30}
                    height={30}
                    alt=""
                  />
                  <p>My profile</p>
                </div>
              }
            />
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

import { signOut, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import IconHoverEffect from "./IconHoverEffect";
import { VscAccount, VscHome, VscSignOut, VscSignIn } from "react-icons/vsc";
export function SideNav() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <IconHoverEffect>
            <Link href="/">
              <span className="flex items-center gap-4">
                <VscHome className="h-7 w-7" />
                <span className="hidden text-lg md:inline">Home</span>
              </span>
            </Link>
          </IconHoverEffect>
        </li>
        {user != null && (
          <li>
            <IconHoverEffect>
              <Link href={`/profiles/${user.id}`}>
                <span className="flex items-center gap-4">
                  <VscAccount className="h-7 w-7 fill-green-700" />
                  <span className="hidden text-lg text-green-700 md:inline">
                    Profile
                  </span>
                </span>
              </Link>
            </IconHoverEffect>
          </li>
        )}
        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscSignIn className="h-7 w-7 fill-green-700"></VscSignIn>
                  <span className="hidden text-lg text-green-700 md:inline">
                    Log In
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscSignOut className="h-7 w-7 fill-red-700"></VscSignOut>
                  <span className="hidden text-lg text-red-700 md:inline">
                    Log out
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

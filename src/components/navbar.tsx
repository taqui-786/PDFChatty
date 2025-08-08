import { Button } from "@/components/ui/button";

import { ArrowUpRight} from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { validateRequest } from "@/lib/db/auth";
import HeaderUserMenu from "./HeaderUserMenu";
import { NavMenu } from "./nav-menu";

const Navbar = async () => {
  const data = await validateRequest();
  const user = data.user;
  return (
    <div className="bg-background h-16 border-b px-6 w-full">
      <nav className="mx-auto flex h-full max-w-screen-xl items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/">
            <Logo size="36" />
          </Link>
        </div>
 <div className="hidden md:flex">
          <NavMenu />
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <HeaderUserMenu
              email={user.email}
              avatarUrl={user.user_metadata?.avatar_url || ""}
              fullname={user.user_metadata?.full_name || ""}
            />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/signup">
                <Button>
                  Sign Up <ArrowUpRight />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="secondary" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

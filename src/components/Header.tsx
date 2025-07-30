import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { createClient } from "@/lib/db/supabaseServer";
import HeaderUserMenu from "./HeaderUserMenu";

async function Header() {
  const data = (await createClient()).auth.getUser();
  const user = (await data).data.user;
  
  return (
    <header className="h-14 border-b w-full flex items-center justify-between px-6">
      <Link href="/">
        <Logo size="28" />
      </Link>

      {user ? (
        <HeaderUserMenu email={user.email} avatarUrl={user.user_metadata?.avatar_url || ""} fullname={user.user_metadata?.full_name || ""} />
      ) : (
        <Link
          href="/auth/signup"
          className={`${buttonVariants({ variant: "default", size: "sm" })}`}
        >
          Sign in
        </Link>
      )}
    </header>
  );
}

export default Header;

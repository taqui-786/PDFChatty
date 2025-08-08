import React from "react";
import SigninForm from "./components/SigninForm";
import Link from "next/link";
import SigninWithGoogle from "./components/SigninWithGoogle";
import Logo from "@/components/Logo";
import { Separator } from "@/components/ui/separator";

function page() {
  return (
    <div className=" flex flex-1 size-full items-center justify-center">
      <div className="sm:bg-card mx-auto w-full max-w-lg px-10 py-14 sm:rounded-2xl sm:border">
        <div className=" scale-200 mx-auto w-fit">
          <Logo size="24" onlyLogo={true} />
        </div>

        <h1 className="mt-4 text-center text-2xl font-semibold">
          Login to PDFlow
        </h1>

        <div className="mt-10">
          <SigninWithGoogle />

          <div className="my-6 flex items-center justify-center gap-2 overflow-hidden">
            <Separator />
            <span className="text-muted-foreground text-sm">OR</span>
            <Separator />
          </div>

          <SigninForm />
        </div>

        <Link
          href="#"
          className="text-muted-foreground mt-6 block text-center text-sm"
        >
          Forgot your password?
        </Link>

        <p className="mt-6 text-center text-sm">
          New to Pdflow?{" "}
          <Link href="/auth/signup" className="text-muted-foreground hover:text-primary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
    
  );
}

export default page;

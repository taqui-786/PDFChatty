import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import SigninWithGoogle from "../signin/components/SigninWithGoogle";
import SignupForm from "./components/SIgnupForm";
import { Separator } from "@/components/ui/separator";

async function page() {
  
  return (
    <div className=" flex flex-1 size-full items-center justify-center">
      <div className="sm:bg-card mx-auto w-full max-w-lg px-10 py-14 sm:rounded-2xl sm:border">
        <div className=" scale-200 mx-auto w-fit">
          <Logo size="24" onlyLogo={true} />
        </div>

        <h1 className="mt-4 text-center text-2xl font-semibold">
          Welcome Back
        </h1>

        <div className="mt-10">
          <SigninWithGoogle />

          <div className="my-6 flex items-center justify-center gap-2 overflow-hidden">
            <Separator />
            <span className="text-muted-foreground text-sm">OR</span>
            <Separator />
          </div>

          <SignupForm />
        </div>

        <Link
          href="#"
          className="text-muted-foreground mt-6 block text-center text-sm"
        >
          Forgot your password?
        </Link>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-muted-foreground hover:text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>

    // <div className="relative flex flex-1 h-full flex-col items-center justify-center">
    //   <div className="lg:p-8">
    //     <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    //       <div className="flex flex-col space-y-2 text-center items-center">
    //         <Logo size="62" onlyLogo={true} />
    //         <h1 className="text-2xl font-semibold tracking-tight">
    //           Welcome back
    //         </h1>
    //         <p className="text-sm text-muted-foreground">
    //           Enter your email to sign in to your account
    //         </p>
    //       </div>

    //       <div className="grid gap-6">
    //         <SignupForm />
    //         <div className="relative">
    //           <div className="absolute inset-0 flex items-center">
    //             <span className="w-full border-t" />
    //           </div>
    //           <div className="relative flex justify-center text-xs uppercase">
    //             <span className="bg-background px-2 text-muted-foreground">
    //               Or continue with
    //             </span>
    //           </div>
    //         </div>
    //         <SigninWithGoogle />
    //       </div>
    //       {/* Additional Links */}
    //     <div className="text-center">
    //       <p className="text-sm text-muted-foreground">
    //         Already have an account?{" "}
    //         <Link
    //           href="/auth/signin"
    //           className="text-primary hover:underline font-medium"
    //         >
    //           Sign in
    //         </Link>
    //       </p>
    //     </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default page;

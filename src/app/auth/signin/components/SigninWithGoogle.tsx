"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/db/auth";
import React from "react";
import { toast } from "sonner";

function SigninWithGoogle() {
  const [loading, setLoading] = React.useState(false);
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
    const response = await signInWithGoogle();
      if (response.error) {
        console.error("Google Sign-In Error:", response.error);
        toast.error("Failed to sign in with Google. Please try again.");
      } else {

      }
    } catch (error) {
      console.error("Unexpected Error:", error);
     
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <Button variant="outline" className="w-full" disabled={loading} onClick={handleGoogleSignIn}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Google className="mr-2 size-5" />
          Sign In with Google
        </>
      )}
    </Button>
  );
}

export default SigninWithGoogle;

function Google({ ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="#EA4335"
        d="M5.27 9.76A7.08 7.08 0 0 1 16.42 6.5L19.9 3A11.97 11.97 0 0 0 1.24 6.65z"
      ></path>
      <path
        fill="#34A853"
        d="M16.04 18.01A7.4 7.4 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.82l-4.04 3.06A11.96 11.96 0 0 0 12 24a11.4 11.4 0 0 0 7.83-3z"
      ></path>
      <path
        fill="#4A90E2"
        d="M19.83 21c2.2-2.05 3.62-5.1 3.62-9 0-.7-.1-1.47-.27-2.18H12v4.63h6.44a5.4 5.4 0 0 1-2.4 3.56l3.8 2.99Z"
      ></path>
      <path
        fill="#FBBC05"
        d="M5.28 14.27a7.12 7.12 0 0 1-.01-4.5L1.24 6.64A11.9 11.9 0 0 0 0 12c0 1.92.44 3.73 1.24 5.33z"
      ></path>
    </svg>
  );
}

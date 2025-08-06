"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabaseServer";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cache } from "react";
import { Session, User } from "@supabase/supabase-js";

export async function createUser(
  fullname: string,
  email: string,
  password: string
) {
  try {
    const supabase = await createClient();
    const payload = {
      email,
      password,
      options: {
        data: {
          full_name: fullname,
          display_name: fullname,
        },
      },
    };
    const { data, error } = await supabase.auth.signUp(payload);
    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: (error as Error).message };
  }
}

//  signout function
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/signin");
}
// Signin
export async function signInUser(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in:", error);
    return { success: false, error: error.message, code: error.code };
  }

  return { success: true, user: data.user };
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const protectedRoutes = ["/chat"];

  // Routes that authenticated users should not access
  const authRoutes = ["/auth/signin", "/auth/signup", "/auth/confirm", "/"];

  if (!user) {
    // User is not logged in
    const isProtectedRoute = protectedRoutes.some(
      (route) =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith(route + "/")
    );

    if (isProtectedRoute) {
      // Redirect to login for protected routes
      const url = request.nextUrl.clone();
      url.pathname = "/auth/signin"; // or wherever your login page is
      return NextResponse.redirect(url);
    }
  } else {
    // User is logged in
    const isAuthRoute = authRoutes.some(
      (route) =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith(route + "/")
    );

    if (isAuthRoute) {
      // Redirect logged-in users away from auth pages
      const url = request.nextUrl.clone();
      url.pathname = "/chat"; // or wherever you want to redirect them
      return NextResponse.redirect(url);
    }
  }
  return supabaseResponse;
}

//  Signin with Google
export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/callback`,
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    return { success: false, error: error.message };
  }
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
  return { success: true, data };
}

export const validateRequest = cache(
  async (): Promise<{ user: User } | { user: null }> => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return {user: data?.user };
  }
);
export const createPdfChat = async (pdfName: string, pdfSize: string, pdfUrl:string) => {
  try {
    
  
  const supabase = await createClient();
  const session = await validateRequest();
  const userId = session?.user?.id;
  const { data, error } = await supabase
    .from("chats")
    .insert({
      userid: userId,
      pdfname: pdfName,
      pdfsize: pdfSize,
      pdfurl: pdfUrl,
    })
    .select()
    .single();
  if (error) {
    console.error("Error creating chat:", error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
} catch (error) {
  console.log(error);
  return { success: false, error: (error as Error).message };
    
  }
};

export const getUserChats = async () => {
  try {
      const session = await validateRequest();
     const userId = session?.user?.id;
     const supabase = await createClient();
     console.log(userId);
     
     const { data } = await supabase
       .from("chats")
       .select("*").eq("userid", userId)
       .order("createdat", { ascending: false });

       return { success: true, data };
  } catch (error) {
     return { success: false, error: (error as Error).message };
  }
}
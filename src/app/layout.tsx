import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Provider from "./Provider";
import { useSession } from "@supabase/auth-helpers-react";
import Header from "@/components/Header";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Navbar from "@/components/navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDFlow – Chat, Summarize, and Extract PDFs Effortlessly",
  description:
    "PDFlow is your AI-powered document assistant. Upload any PDF and instantly get summaries, key points, named entities, and even chat with your documents using a beautiful flow-based interface.",
  keywords: [
    "PDFlow",
    "PDF summarizer",
    "chat with PDF",
    "AI PDF tool",
    "document parser",
    "PDF Q&A",
    "flow-based UI",
    "PDF assistant",
    "Next.js PDF app"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>

        <main className="min-h-dvh bg-background flex flex-col items-center justify-center relative overflow-y-auto">
          {/* <Header /> */}
          <Navbar />
          {children}
        </main>
        </ReactQueryProvider>
        <Toaster richColors position="bottom-right" />
      </body>
      {/* </Provider> */}
    </html>
  );
}

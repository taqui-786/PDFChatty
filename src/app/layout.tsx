import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import ReactQueryProvider from "@/components/ReactQueryProvider";
import Navbar from "@/components/navbar";
import { portfolioConfig } from "./page";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: portfolioConfig.title,
  description:portfolioConfig.description,
  keywords: [
    "PDFlow",
    "PDF summarizer",
    "chat with PDF",
    "AI PDF tool",
    "document parser",
    "PDF Q&A",
    "flow-based UI",
    "PDF assistant",
    "Next.js PDF app",
    "PDF extraction",
    "intelligent document analysis",
    "PDF AI chat",
    "document summarization",
    "named entity recognition PDF",
    "interactive PDF",
    "AI document processing",
    "free PDF AI",
    "PDF workflow",
    "document insights",
    "AI-powered research",
    "study tool PDF",
    "business document AI",
    "legal PDF AI",
    "academic PDF AI",
    "data extraction from PDF",
    "smart PDF reader",
    "document understanding AI",
    "PDF analysis tool",
    "chat with documents online",
    "summarize articles AI",
    "extract data AI",
    "PDF question answering",
    "AI for researchers",
    "document management AI",
    "paperless office AI",
    "digital assistant PDF",
    "knowledge extraction PDF",
    "semantic search PDF",
    "document automation",
    "AI productivity tool",
    "efficient PDF handling",
    "quick PDF insights",
    "AI-driven document review",
    "interactive document experience",
    "flowchart PDF AI",
    "visual document analysis",
    "AI for reports",
    "AI for contracts",
    "AI for manuals",
    "AI for textbooks",
    "AI for research papers",
    "AI for legal documents",
    "AI for financial reports",
    "AI for technical documents",
    "AI for medical documents",
    "AI for academic papers",
    "AI for business documents",
    "AI for personal documents",
    "AI for creative writing",
    "AI for data analysis",
    "AI for content creation",
    "AI for learning",
    "AI for education",
    "AI for professionals",
    "AI for students",
    "AI for small business",
    "AI for enterprises",
    "AI for developers",
    "AI for designers",
    "AI for marketers",
    "AI for sales",
    "AI for customer service",
    "AI for HR",
    "AI for finance",
    "AI for operations",
    "AI for product management",
    "AI for project management",
    "AI for quality assurance",
    "AI for research and development",
    
  ],
    openGraph: {
    type: "website",
    locale: "en_US",
    url: 'https://pdflow-free.vercel.app',
    title: portfolioConfig.title,
    description: portfolioConfig.description,
    images: [`https://pdflow-free.vercel.app/hero_section_img.png`],
    siteName: 'PDFlow',
  },
    twitter: {
    card: "summary_large_image",
    title: portfolioConfig.title,
    description: portfolioConfig.description,
    images: [`https://pdflow-free.vercel.app/hero_section_img.png`],
    creator: '"https://twitter.com/Taquiimam14"',
  },
  icons: {
    icon: "/favicon.ico",
  },
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

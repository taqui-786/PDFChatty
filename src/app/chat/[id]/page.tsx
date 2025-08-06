import FlowChart from '@/app/flow/components/FlowChart';
import PDFChatbot from '@/components/ChatBox';
import { validateRequest } from '@/lib/db/auth';
import { createClient } from '@/lib/db/supabaseServer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'


interface PageProps {
  params: Promise<{ id: string }>;
}


 const getPost = async(chatId:string, loggedInUserId:string) => { 
    const supabase = await createClient();
  const {data} = await supabase.from("chats").select("*").eq("id", chatId).eq("userid", loggedInUserId).single();
  
  if(!data) return notFound();

  return data;
 }

 export async function generateMetadata({ params }:  PageProps): Promise<Metadata> {
  const {user} = await validateRequest();
  if(!user) return {};
  const chat = await getPost((await params).id, user.id);
  if (!chat) {
    return {
      title: "Chat not found",
      description: "The chat you are looking for does not exist.",
    };
  }
  return {
    title: `Chat with ${chat.pdfname}`,
    description: 'Chat with your PDF document',
  

 }
 }

async function  page({params}:PageProps) {
    const {user} = await validateRequest();
  if (!user) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }
  const chatId = (await params).id;
  const chat = await getPost(chatId, user.id);
  
  return (
         <main className="h-full flex-1">
           <Suspense
             fallback={
               <div className="flex items-center justify-center h-full">
                 Loading...
               </div>
             }
           >
             <FlowChart chat={chat} />
           </Suspense>
         </main>
  )
}

export default page
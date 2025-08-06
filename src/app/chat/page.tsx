
import UploadDocument from "@/app/chat/components/UploadDocument";
import DocHistory from "./components/DocHistory";
import { getUserChats } from "@/lib/db/auth";



export default async function  Page() {
  const res = await getUserChats()
  
  return (
    <main className="h-dvh w-full flex items-center justify-center bg-background">
      <div className="p-4 w-full max-w-3xl">
        {/* Upload Section */}
        <UploadDocument />

        {/* Document History Section */}
        <DocHistory chats={res.data || []} />
      </div>
    </main>
  );
}

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import PDFChatbot from '@/components/ChatBox'
function ChatDailog({pdfId}:{pdfId:string}) {
  return (
   <Dialog>
  <DialogTrigger asChild><Button className='cursor-pointer'>Open Chat</Button></DialogTrigger>
  <DialogContent className='p-0'>
    <DialogHeader className='p-4'>
      <DialogTitle>Chat with your document</DialogTitle>
      
    </DialogHeader>
    <PDFChatbot chatsPdfId={pdfId} />
  </DialogContent>
</Dialog>
  )
}

export default ChatDailog
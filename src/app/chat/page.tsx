import UploadDocument from '@/components/UploadDocument'
import { createClient } from '@/lib/db/supabaseServer';
import React from 'react'

async function page () {
  const data = (await createClient()).auth.getUser();
  const user = (await data).data.user;
  
  return (
    <main className="h-dvh flex items-center justify-center">
        <UploadDocument/>
    </main>
  )
}

export default page
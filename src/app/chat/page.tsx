import UploadDocument from '@/components/UploadDocument'
import { createClient } from '@/lib/db/supabaseServer';
import React from 'react'

async function page () {
    const supabase = await createClient();
  const test = await  supabase.from('user').select('*')
  console.log(test);
  
  return (
    <main className="h-dvh flex items-center justify-center">
        <UploadDocument/>
    </main>
  )
}

export default page
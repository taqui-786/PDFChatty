import { supabaseClient } from '@/lib/db/supabaseClient';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'


export default function Provider({
  children,
  mySession
}: Readonly<{
  children: React.ReactNode;
  mySession: Session | null;
}>)  {

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={mySession}
    >
    {children}
    </SessionContextProvider>
  )
}
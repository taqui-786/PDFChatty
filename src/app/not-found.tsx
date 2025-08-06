import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex-1 h-full flex items-center justify-center flex-col gap-4'>
      <h2>No Chat Page Exist</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}